const math = require('mathjs')
//const {matrix} = require("mathjs");

const common = function intersection(first, second)
{
    first = new Set(first);
    second = new Set(second);
    return [...first].filter(item => second.has(item));
}

//var first = [ 1, 2, 3 ];
//var second = [ 2, 3, 4, 5 ];

//let common = intersection(first, second);
//console.log("Common elements are: " + common);

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


function normalize(x=math.matrix()){
    return x/math.norm(x);}


//let vert = math.matrix();
//let faces = math.matrix();

const nf = function newFace(i,vert,faces,trNormals)
{
    nf.normal = math.row(trNormals,i);
    nf.vert= math.row(faces,i);
    let v1=normalize(math.row(vert,math.subset(faces,math.index(i,1)))-math.row(vert,math.subset(faces,math.index(i,0))));
    nf.basis = [v1,math.cross(nf.normal,v1)];

    }



function detriangulate(vert,faces) {
    let tol=1e-14;
    let nTriangles = math.size(faces)[0];
    let trNormals=math.zeros(nTriangles,3);
    for (let i = 0; i < nTriangles; i++) {
        let trN = math.row(trNormals,i);
        let ar0=math.row(vert,math.subset(faces,math.index(i,0)));
        let ar1=math.row(vert,math.subset(faces,math.index(i,1)));
        let ar2=math.row(vert,math.subset(faces,math.index(i,2)));
        let v=ar1+(-1)*ar0;
        let w=ar2+(-1)*ar0;
        trN = normalize(math.cross(v,w));
// normalize(math.cross(math.row(vert,math.subset(faces,math.index(i,1)-
    }

    var group(0) = nf(0,vert,faces,trNormals);
    let nFaces = 1;

    for (let i=1; i < nTriangles; i++){
        let faceFound = false;
        for (let j=0; j < nFaces;j++){
            if (math.abs(math.abs(math.dot(group(j).normal,math.row(trNormals,i))-1))<tol &&...
            ~arrayIsEmpty(common(math.row(faces,i),group(j).vert)))
            {
                let faceFound = true;
                let group(j).vert = [group(j).vert, math.row(faces,i)];
                break;
            }
        }
        if (~faceFound){
            let nFaces=nFaces+1;
            let group(nFaces)=newFace(i,vert,faces,trNormals);
        }

    }

let maxFaceSize = 3;


    for (let j=0; j<nFaces; j++){
        let l=math.size(group(j).vert,2);
        let v=math.zeros(3,l);
        for (let i=0; i<l; i++){
            let vc = math.column(v,i);
            vc = math.transpose(math.row(vert,group(j).vert(i)));
        }
        let sortedVert=sortVertices(v,group(j).basis);
        let k = newFaces[j];
        k = [[group(j).vert(math.reshape(sortedVert))]];

    }


}

