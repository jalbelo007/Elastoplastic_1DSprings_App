const math = require('mathjs')
//const {matrix} = require("mathjs");

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



function separateBounds(A,b,Aeq,beq,tol) {
    if (Aeq && typeof Aeq !== 'undefined'){Aeq = [];
    }
    if (beq && typeof beq !== 'undefined'){beq = [];
    }
    if ((tol && typeof tol !== 'undefined')||(arrayIsEmpty(tol)===true)){
        tol=1;
    }
    else if ((tol<0)||(tol>1)){
        Error('Tolerance parameter must satisfy 0<=tol<=1');
    }

    let Na=NaN;
    let Nb=NaN;
    if ((arrayIsEmpty(A))^(arrayIsEmpty(b))){
        Error('If A is empty then b must also be empty and vice versa');
    }
    else if (~arrayIsEmpty(A)){
        Na=math.size(A)[1];
    }
    else if (arrayIsEmpty(A)){
        A=[];
        b=[];
    }

    if ((arrayIsEmpty(Aeq))^(arrayIsEmpty(beq))){
        Error('If Aeq is empty then beq must also be empty and vice versa');
    }
    else if (~arrayIsEmpty(Aeq)){
        Na=math.size(A)[1];
    }
    else if (arrayIsEmpty(Aeq)){
        Aeq=[];
        beq=[];
    }


    if (~(isNaN(Na))&&~(isNaN(Nb))){
        if (!(Na === Nb)){
            Error('If bothA and Aeq are both non-empty, they must have the same number of columns');
        }
        else if ((isNaN(Na))&&(isNaN(Nb))){
            lb=[];
            ub=[];
            return
        }

    }

    let N = math.max(Na,Nb);
    let b1 = math.reshape(b,-1);
    let beq1 = math.reshape(beq,-1);

    if (math.size(A)[0]!==math.size(b)){
        Error ('Incompatible inequality matrix data sizes: size(A,1) != lenght(b)');
    }

    if (math.size(Aeq)[0]!==math.size(beq)){
        Error ('Incompatible equality matrix data sizes: size(Aeq,1) != lenght(beq)');
    }





}


function extract(A,b,tol) {
    let lsubs =[];
    let usubs =[];
    let lvals = [];
    let uvals = [];
    let rows = [];

    if (arrayIsEmpty(A)){
        return;
    }

    let b1 = math.reshape(b,-1);
    let absA = math.abs(A);




}