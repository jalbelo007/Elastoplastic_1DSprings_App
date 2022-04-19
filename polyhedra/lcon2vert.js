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


function lcon2vert(A,b,Aeq,beq,TOL,checkbounds) {
    nre=[];
    nr=[];

if (arguments.length<5 || arrayIsEmpty(TOL)){
TOL=1e-10;}
if (arguments.length<6){checkbounds=true;
}

switch (arguments.length) {
    case 0:Error('At least 1 input argument required');break;
    case 1:b=[];Aeq=[];beq=[];break;
    case 2:Aeq=[];beq=[];break;
    case 3:beq=[];Error('Since argument Aeq specified, beq must also be specified');break;
}
    let b1 = math.reshape(b,-1);
    let beq1 = math.reshape(beq,-1);

    if ((arrayIsEmpty(A))^(arrayIsEmpty(b))){
        Error('Since argument A specified, b must also be specified');
    }

    if ((arrayIsEmpty(Aeq))^(arrayIsEmpty(beq))){
        Error('Since argument Aeq specified, beq must also be specified');
    }

    let nn = math.max(math.size(A)[1] * ~arrayIsEmpty(A), math.size(Aeq)[1] * ~arrayIsEmpty(Aeq));

    // (){

  //  }

}