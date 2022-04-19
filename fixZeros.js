const math = require('mathjs')

function fixZeros(M) {
    [m,n]=math.size(M);
    let M1=M;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n ; j++) {if (math.abs(M1[i][j])<1e-14){M1[i][j]=0;}

        }
    }
    return M1
}