const math = require('mathjs')
//const {size} = require("mathjs")


//function sortVertices(V, basis) {
//    return undefined;
//}

function sortVertices(V,basis)
{
    let center = math.mean(V, 2);
    let n = math.size(V)[1];
    let Q=math.zeros(1, n);
    let x1;
    let x2;
    for (let i = 0; i < n; i++) {
        x1 = math.row(basis, 0) * (math.column(V, i) - center);
        x2 = math.row(basis, 1) * (math.column(V, i) - center);
        Q[i] = math.atan2(x2, x1);
    }

return math.sort(Q,'asc')
}
