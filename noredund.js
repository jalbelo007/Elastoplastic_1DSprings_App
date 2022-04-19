const math = require('mathjs')

function allAreTrue(arr) {
    return arr.every(Boolean);
}

function noredund(A,b) {
    let An = math.transpose(A)*A;
    let c = math.lusolve(An,b);

    if (~allAreTrue(An*c<b)){

    }

}