const math = require('mathjs')
//const {not} = require("mathjs");


function piecewiseLinPer(t,T,A) {
let t1 = math.mod(t+0.25*T,T);
//let increasing:boolean
let increasing = Boolean(t1<T/2);
//let  increasing =t1<T/2;
let theta = math.zeros(math.abs(t));
if (increasing){theta=(2/T)*t1;}
    else{theta=(T-t1)*2/T;}
    return 2*A*theta-A
   // theta(increasing)=(2/T)*t1(increasing);
   // theta(!increasing)=(T-t1(!increasing)).*2/T;
}