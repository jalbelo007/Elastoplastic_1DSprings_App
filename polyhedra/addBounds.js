const math = require('mathjs')

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

function addBounds(A0,b0,Aeq0,beq0,lb,ub) {
    if (arguments.length<5){
        Error('At least 5 arguments required')
    }
    if (math.size(A0)[0] !== math.size(b0)){
        Error('Incompatible inequality matrix data sizes: size(A,1) ~= length(b)')

    }
    if (math.size(Aeq0)[0] !== math.size(beq0)){
        Error('Incompatible equality matrix data sizes: size(Aeq,1) ~= length(beq)')

    }
    if (lb && typeof lb !== 'undefined'){lb = [];
    }
    if (ub && typeof ub !== 'undefined'){ub = [];
    }

    let N;
    if (~arrayIsEmpty(lb)) {
        N = math.size(lb);
    }
    else if (~arrayIsEmpty(ub)){
        N=math.size(ub);
    }
    else {
        Error('Either lb or ub must be nonempty.');
    }

    if (arrayIsEmpty(lb)) {
        lb = -lb.fill(0,N);
    }
    if (arrayIsEmpty(ub)){
        ub= ub.fill(0,N);
    }
    if (math.size(lb)!==math.size(ub)) {
        Error('Arguments lb and ub must be either [] or the same lengths');
    }

    let b1 = math.reshape(b,-1);
    let beq1 = math.reshape(beq,-1);

}
