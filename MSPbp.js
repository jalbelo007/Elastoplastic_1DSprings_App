const math = require('mathjs')
const {range} = require("mathjs");
const qp = require('quadprog-js');

class MSPbp {
    constructor(H, lb, ub, Aeq) {
        this.H = H;
        this.lb = lb;
        this.ub = ub;
        this.Aeq = Aeq;

    }
}

//let x1;
//let x1;
let obj = {
    MSPbp(H, lb, ub, Aeq) {
        obj.H = H;
        obj.lb = lb;
        obj.ub = ub;
        obj.Aeq = Aeq;
    },
   let x1 = catchup(obj, x, t, c){
            let k = math.size(obj.Aeq);
            let Abig = math.concat(obj.Aeq, -math.identity(k), math.identity(k), 0);
            let bbig = math.concat(math.zeros(k[0], 1), (-1) * (obj.lb + c), obj.ub + c, 0);
            //let x1;
            let exitflag;
            //let x1;
            //let x1;
            [x1, val, exitflag] = qp(obj.H, obj.H * x, Abig, bbig, meq = k, factorized = false);
            if (~(exitflag === 1)) {
                //error message goes here

            }

        }
}