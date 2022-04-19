const math = require('mathjs')
const {range} = require("mathjs");
const qp = require('quadprog-js');

//To check if an array is empty using javascript
function arrayIsEmpty(array) {
    //If it's not an array, return FALSE.
    if (!Array.isArray(array)) {
        return false;
    }
    //If it is an array, check its length property
    if (array.length === 0) {
        //Return TRUE if the array is empty
        return true;
    }
    //Otherwise, return FALSE.
    return false;
}


class Elastoplastic {
    constructor(D, m, n, dimV, dimU, L, pistonsH, pistonsV, a, em, ep, imDOrt, uBasis, vBasis, uP, vP, uOrt, vOrt, msp) {
        this.D = D;
        this.m = m;
        this.n = n;
        this.dimV = dimV;
        this.dimU = dimU;
        this.L = L;
        this.pistonsH = pistonsH;
        this.pistonsV = pistonsV;
        this.a = a;
        this.em = em;
        this.ep = ep;
        this.imDOrt = imDOrt;
        this.uBasis = uBasis;
        this.vBasis = vBasis;
        this.uP = uP;
        this.vP = vP;
        this.uOrt = uOrt;
        this.vOrt = vOrt;
        this.msp = msp;
    }
}

let obj = {
    Elastoplastic(D, L, a, sm, sp) {
        obj.setGeometry(D, L);
        obj.setAV(a);
        obj.setBoundsMSP(math.inv(math.diag(obj.a)) * sm, math.inv(math.diag(obj.a)) * sp)
    },

    setGeometry(obj, D, L) {
        obj.D = D;
        obj.m = math.size(D)[0];
        obj.n = math.size(D)[1];
        obj.L = L;
        obj.imDOrt = (...);//need to write up function for ker(A)

        //important definition:
        obj.uOrt = [obj.imDort, obj.L];
        obj.uBasis = (...);//use function for Ker(A)
        obj.dimU = math.size(obj.uBasis)[1];
        obj.dimV = obj.m - math.size(obj.uBasis)[1];
    },

    setAV(obj, a) {
        obj.a = a;
        let A = math.diag(obj.a);
        let uno = math.ones(math.size(A)[0]);
        let invA = math.diag(math.dotDivide(uno, obj.a));
        obj.vOrt = math.transpose(A * obj.uBasis);

        let M = [obj.vOrt, obj.imDOrt, obj.L];
        let q = math.size(obj.L)[0];
        let B = [math.zeros(math.size(obj.vOrt)[0] + math.size(obj.imDOrt)[0], q), math.identity(q)];
        obj.pistonsH = M\B;//doublecheck how to do this in JS

        [obj.vBasis,R] = GramSchmidt(math.concat(obj.pistonsH, invA*math.transpose(obj.imDOrt),0));

        obj.pistonsV=math.zeros(math.size(obj.vBasis)[1],math.size(obj.L)[0]);

        let coordsMatr=math.inv(math.concat(obj.uBasis,obj.vBasis,0));

        obj.uP=math.row(coordsMatr,math.range(0,math.size(obj.uBasis)[1]));

        //



    },

    verifyUV(obj,eps) {
        let t1=obj.uOrt*obj.uBasis;
        let t2=obj.vOrt*obj.vBasis;
        let t3=math.transpose(obj.uBasis)*math.diag(obj.a)*obj.vBasis;
        let t4=obj.vP*obj.vBasis-math.identity(math.size(obj.vBasis)[1]);
        let t5=obj.uOrt*(obj.vBasis*obj.vP-math.identity(obj.m));

        if (math.norm(t1)>eps){
            Error('');
        }

        if (math.norm(t2)>eps){
            Error('');
        }

        if (math.norm(t3)>eps){
            Error('');
        }

        if (math.norm(t4)>eps){
            Error('');
        }

        if (math.norm(t5)>eps){
            Error('');
        }

    },

    setBoundsMSP(obj,em,ep){
        obj.em=em;
        obj.ep=ep;
        obj.msp=MSPbp(diag(obj.a),obj.em,obj.ep,obj.vOrt);

    },

    gByL(obj,l){
        let gVcoords=obj.pistonsV*l;
        let g=obj.vBasis*gVcoords;
        return [g,gVcoords]
    },

    hByCoords(obj,coords){
        let h=obj.uBasis*coords;
        return h
    },

    forceByH(obj,h){
        let f=-math.transpose(obj.D)*math.diag(obj.a)*h;
        return f
    },

    getOffset(obj,l,hCoords){
        let offset;
        if (arrayIsEmpty(l)) {
            offset = obj.hByCoords(hCoords);
        }
        else if(arrayIsEmpty(hCoords)){
            offset=-obj.gByL(l);
        }
        else {
            offset=obj.hByCoords(hCoords)-obj.gByL(l);
        }
    },

    getElastic(obj,hCoords,l,y,t){
        let offset = obj.getOffset(l,hCoords);
        let y1=obj.msp.catchup(y,t,offset);
        let e1=y1-offset;
        return [y1,e1];
    },

    getNormalCone(obj,e,tol){
        let Neq=[];
        let Nneq=[];

        for (let i=0; i<obj.m; i++){
            if (math.abs(e[i]-obj.em[i])<tol){
                Nneq=[Nneq, math.zeros(1,obj.m)];
                let last=Nneq.pop();
                Nneq[last][i]=1;
            }
            else if(math.abs(e[i]-obj.ep[i])<tol){
                Nneq=[Nneq, math.zeros(1,obj.m)];
                let last=Nneq.pop();
                Nneq[last][i]=-1;
            }
            else {
                Neq=[Neq, math.zeros(1,obj.m)];
                let last=Neq.pop();
                Neq[last][i]=1;
            }

        }

    },

    // getPlastic(obj,e1,p,l,method,tol){

   // }

    verify(obj,t,e,p,prevP,l,hCoords,tol){
        if (~(arrayIsEmpty(obj.vOrt))){
            let quasistaticBalance=obj.vOrt*(e+obj.hByCoords(hCoords));
            if (math.norm(quasistaticBalance,1)>tol){
                Error('')
            }


        }

        if (~(arrayIsEmpty(obj.imDOrt))){
            let geometricConstraint=obj.imDOrt*(e+p);
            if (math.norm(geometricConstraint,1)>tol){
                Error('')
            }


        }

        if (~(arrayIsEmpty(obj.L))){
            let pistonConstraint=obj.L*(e+p)-l;
            if (math.norm(pistonConstraint,1)>tol){
                Error('')
            }


        }

        if (~(arrayIsEmpty(Neq))){
            let pInNeq=Neq*(p-prevP);
            if (math.norm(pInNeq,1)>tol){
                Error('')
            }


        }

        if (~(arrayIsEmpty(Nneq))){
            let pInNneq=Nneq*(p-prevP);
            if (math.norm(pInNneq,1)>tol){
                Error('')
            }


        }


    },

    solveElastic(obj,T,e0,hCoords,l){
        let y=e0+obj.getOffset(l(0),hCoords(0));
        let szT=math.size(T)[1];
        let Y=[y, math.zeros(obj.m,szT-1)];
        let E=[e0, math.zeros(obj.m,szT-1)];

        for (let i=1; i<szT;i++){
            [y,e] = obj.getElastic(hCoords(T(i),l(T(i))));
            let y = math.column(Y,i);
            let e = math.column(E,i);
        }

        return [Y,E]
    },

    solvePlastic(obj,T,E,p,l,method,tol){
        let szT=math.size(T)[1];
        let P=[p, math.zeros(obj.m,szT-1)];
        let X=[math.column(E,i)+p, math.zeros(obj.m,szT-1)];

        for (let i=1; i<szT;i++){
            let p = obj.getPlastic(math.column(E,i),p,l(T(i)),method,tol);
            let b = math.column(Y,i);
            let e = math.column(E,i);
        }

        return [Y,E]
    },

}
