const math = require('mathjs');
const {forEach} = require("mathjs");

function isNumeric(arr) {
    return arr.every(Number);
}

function isChar(arr) {
    return arr.every(String);
}

function find(arr) {

    let arr_new = [];
    for (let i = 0; i < math.size(arr); i++) {
        if (arr[i] !== 0) {

            arr_new.concat(arr[i]);


        }
        else return arr_new
    }

}

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

const I =function intersectionHull(...params) {

    let TOL;
    if (isNumeric(params[[0]])) {
        TOL = params[[0]];
        params[0] = [];
    } else {
        TOL = [];
    }


    let N = math.max(math.size(params));
    let idxType = [find(forEach(params, ischar())), N + 1];

    let L = math.size(idxType) - 1;
    let S;
    S[L].type = [];
    S[L].args = [[]];
    S[L].A = [];
    S[L].b = [];
    S[L].Aeq = [];
    S[L].beq = [];

    for (let i = 0; i < L; i++) {
        let j = idxType[i];
        let k = idxType[i + 1];
        S[i].type = params[[j]];
        S[i].args = params[math.range(j + 1, k - 1, true)];

        if (arrayIsEmpty(S[i].args)) {
            Error('Syntax error - arguments missing');
        }

        let lcon = [[], [], [], []];

        switch (S[i].type) {
            case 'vert':
                [lcon[[math.range(1, 4, true)]]] = vert2lcon(math.reshape(S[i].args));
                break;
            case 'lcon':
                lcon[math.range(1, k - j - 1,true)] = S[i].args;
                break;
            case 'qlcon':
                lcon[math.range(1, k - j - 1,true)] = S[i].args[math.range(2, end, true)];
                break;
            default :
        }
        [S[i].A, S[i].b, S[i].Aeq, S[i].beq] = deal(math.reshape(lcon));
        //write up deal function in JS
    }

    A = S.concat(A);
    b = S.concat(b);
    Aeq = S.concat(Aeq);
    beq = S.concat(beq);
    [V, nr, nre] = lcon2vert(A, b, Aeq, beq, TOL);

    I.vert = V;
    I.lcon = [math.column(A, nr), math.column(b, nr), math.column(Aeq, nre), math.column(beq, nre)];
}



