const math = require('mathjs')


function periodic(t,Tby2) {
    let t1;
    t1 = math.mod(t, Tby2);
    let p;
    if (math.mod(t, 2 * Tby2) < Tby2) {
        p = t1 / Tby2
    } else {
        p = 1 - t1 / Tby2;
    }
    return p
}
