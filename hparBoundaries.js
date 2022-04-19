const math = require('mathjs')


function hparBoundaries(pr) {
    let trA=math.trace(pr.a);
    let hmin = math.sqrt(3) * (pr.a * (math.concat(pr.ep[0], -pr.em[1], pr.ep[2], 0))) / trA;
    let hmax = math.sqrt(3) * (pr.a * (math.concat(pr.em[0], -pr.ep[1], pr.em[2], 0))) / trA;

    let m1=math.max([pr.a*(math.concat(pr.em[0], -pr.em[1],pr.ep[2],0)),...
    pr.a*(math.concat(pr.ep[0], -pr.ep[1],pr.ep[2],0)),...
    pr.a*(math.concat(pr.ep[0], -pr.em[1],pr.em[2],0))]);

    let m2=math.min([pr.a*(math.concat(pr.ep[0], -pr.ep[1],pr.em[2],0)),...
    pr.a*(math.concat(pr.em[0], -pr.em[1],pr.em[2],0)),...
    pr.a*(math.concat(pr.em[0], -pr.ep[1],pr.ep[2],0))]);

    let hmaxSimplex=-math.sqrt(3)*m1/trA;
    let hminSimplex=-math.sqrt(3)*m2/trA;

    return [hmin, hmaxSimplex,hminSimplex,hmax];
}