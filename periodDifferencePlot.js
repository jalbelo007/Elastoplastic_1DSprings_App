const math =require('mathjs');

function periodDifferencePlot(T,X,framePeriod,startingFrame) {
    let Y = math.zeros(math.size(X)[0],math.size(X)[1]-framePeriod);
    for (let i = 0; i < math.size(X)[1]-framePeriod; i++) {
        let Yc = math.column(Y,i);
        Yc =math.column(X,i+framePeriod)+(-1)*math.column(X,i);
    }
}
