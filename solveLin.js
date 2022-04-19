const math = require('mathjs')
//const {concat} = require("mathjs")
//const A=math.matrix();
//const b=Array();

function solveLin(A,b){
    const tol = 1e-13;
    const str1 = 'Linear system failed! Error magnitude: ';
    let x = math.lusolve(A,b);
    let errNorm=math.norm(A*x-b,1);
    let str2 = errNorm.toString();
    let result;

    if (errNorm>tol){
    result= console.log(str1.concat('',str2));}
    else {result= x;}
    return result
}

console.log('test the motherfucker bitch')
const v = math.matrix([1, 4, 9])
print(v) // [1, 4, 9]
console.log('xxx')
const N = math.identity([3, 3])
print(N) // [[1, 1, 1], [1, 1, 1]]
//print(N.math.size()) // [2, 3]
console.log('fuck the police')
const y = solveLin(N,v)
print(math.flatten(y))

/**
 * Helper function to output a value in the console. Value will be formatted.
 * @param {*} value
 */
function print (value) {
    const precision = 14
    console.log(math.format(value, precision))
}