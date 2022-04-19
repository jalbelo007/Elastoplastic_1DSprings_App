const math = require('mathjs')

function getPolygon(basis,ort,em,ep){
    let boundaries=[em,ep];
    let P=[];

    let v1;
    let v2;
    let M;
    let b;
    let x;
    let ind;
    for (let k = 0; k < 3; k++) {
        ind = math.range(0,3,false);
        ind[k] = [];

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                v1 = [0, 0, 0];
                v1[ind[0]] = 1;
                v2 = [0, 0, 0];
                v2[ind[1]] = 1;
                M = math.concat(ort, v1, v2, 0);
                if (math.det(M) > 10 * eps) {
                    b = math.concat(boundaries[ind[0][i]], boundaries[ind[0][j]], 0);
                    x = math.lusolve(M, b);
                }
                if ((x[k] >= boundaries[k][0]) && (x[k] <= boundaries[k][1])) {
                    P = [P, x];
                }

            }
        }
    }

    let sz=math.size(P);
    let n=sz[1];

    let Psorted;
    let I;
    let mrow;
    if (n < 4) {
        Psorted = P;
    } else {
        Psorted = math.zeros(3, n);
        I = sortVertices(P, math.transpose(basis));
        for (let i = 0; i < n; i++) {
            mrow =  math.row(Psorted,i);
            mrow = math.row(P, I[i]);
        }

    }
}