const math = require('mathjs')

function GramSchmidt(A) {
    let [m,n]= math.size(A);
    let v;
    let R;
    let Q;
    for (let j = 0; j < n; j++) {
        let v = math.column(A, j);
        for (let i = 0; i < j - 1; i++) {
            let r = R[i][j];
            r = math.transpose(math.column(Q, i)) * math.column(A, j);
            v = v - r* math.column(Q, i);
        }
        R[j][j] = math.norm(v);
        let q = math.column(Q,j);
        q = v/R[j][j];

    }
    return [Q,R];
}
