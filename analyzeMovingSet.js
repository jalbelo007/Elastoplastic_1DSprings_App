const math = require('mathjs')

function analyzeMovingSet(problem,l,hCoords) {

    let dimV=math.size(problem.vBasis)[1];
    let offset=problem.getOffset(l,hCoords);

    let A=[problem.vBasis, -problem.vBasis];
    let b=[problem.ep+offset, -problem.em-offset];

    let vert=lcon2vert(A,b,[],[]);
    let nv=math.size(vert)[0];

    let r;
    let r1;
    if (nv > 0) {
        let Ain;
        [Ain, bin, Aeq, beq] = vert2lconv(vert);
        let intmax;
        r = intmax;
        for (let i = 0; i < math.size(Ain)[0]; i++) {
            r1 = math.min(r, reqRank(Ain, [], dimV, i));
        }
    }

    else
        {
            Ain = [NaN];
            r = NaN;
        }

    return [Ain,r,nv]
}

function reqRank(Ain,M,depths,currInd){
    let M1=[M,math.row(Ain,currInd)];
    let depths1=depths-1
    let r;
    let Ml;
    if (depths1 > 0) {
        let intmax;
        r = intmax;
        for (let i = currInd + 1; i < math.size(Ain)[0]; i++) {
            r = math.min(r, reqRank(Ain, M1, depths1, i));
        }
        Ml = NaN;
    } else {
        r = rank(M, 1e-9);
        Ml = M;
    }
    return [r,Ml]
}