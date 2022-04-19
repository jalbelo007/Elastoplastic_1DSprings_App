const math = require('mathjs')

function getPolygon2(vBasis,em,ep){
    let n=math.size(em)[0];
    let boxConstr=math.concat(math.identity(n),-math.identity(n),0);
    let b=math.concat(ep,-em,0);
    let vert1=lcon2vert(boxConstr*vBasis,b);
    let ind=sortVertices(math.transpose(vert1),math.concat([1,0],[0,1],0));
    let k=math.size(ind)[1];
    let vert=math.zeros(k)[1];
    let mrow;
    for (let i = 0; i < k; i++) {
        mrow = math.row(vert, i);
        mrow = math.row(vert1, ind[i]);
    }
}