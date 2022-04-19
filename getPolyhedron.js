const math = require('mathjs')
const hull = require('hull.js')

function getPolyhedron(vBasis,em,ep) {
    let n = math.size(em)[0];
    let boxConstr = [math.identity(n),-math.identity(n)];
    let b = [ep,-em];
    let vert = lcon2vert(boxConstr*vBasis,b);
    let chullpoints = [math.column(vert,1),math.column(vert,2),math.column(vert,3)];
    [facesCells,maxFaceSize]=detriangulate(vert,hull(chullpoints));

    let nFaces = math.size(facesCells)[1];
    let faces=math.zeros(facesCells,2);

    for (let j=0;nFaces<j;j++){
        let F = faces[j][math.range(1,math.size(facesCells[[j]])[1])];
        F = facesCells[[j]];
        for (let k=(math.size(facesCells[[j]])[1])+1;maxFaceSize<k;k++){
            faces[j][k]=NaN;
        }


    }

}