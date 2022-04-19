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

const [paramsout]= function qlcon2vert(x0,...paramsin){
    if (paramsin.length <= 3) {
        paramsin[math.range(3,6,true)]=[[],[],[],0];
    }

    x0=math.reshape(x0);
    [A,b,Aeq,beq]=deal(paramsin[[math.range(1,4,true)]]);

    b=b-A*x0;

    if (~arrayIsEmpty(beq)){
        let g = math.reshape(beq);
        g = math.zeros(math.size(beq));
    }

    paramsin[[2]]=b;
    paramsin[[4]]=beq;

    [paramsout[[math.range(1,math.max(paramsout.length,1))]]]=lcon2vert(math.reshape(paramsin));

    V=paramsout[[1]];

    //V=bsxfun();
}