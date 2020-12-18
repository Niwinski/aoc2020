const { dirxml } = require("console");
const fs = require("fs");

const getDir = (y, x, tx, ty, room) => {
    return 0;
};

const myFunc = (lines) => {
    early = +lines[0];
    ids = lines[1].split(/,/);

    var ts = 0;
    var suc = false;
    var bb = 1;
    var nid = [];
    var nts = [];
    const num = ids.length;
    for (i = 0; i < num; i++) {
        if (ids[i] == "x") {
            continue;
        }
        nid.push(+ids[i]);
        nts.push(i);
    }
    const nnum = nid.length;
    console.log(nid);
    console.log(nts);
    var last_ts = 0;
    var best_i = 0;
    while (!suc) {
        ts += bb;
        for (i = 0; i < nnum; i++) {
            if ((ts + nts[i]) % nid[i] != 0) {
                //console.log("fail on " + ids[i]);
                break;
            }
        }
        //console.log(i);
        if (i == nnum) {
            suc = true;
        } else {
            if (i >= best_i) {
                best_i = i;
                d = ts - last_ts;
                bb = d;
                last_ts = ts;
                console.log("setting bb to " + bb);
            }
        }
        if (ts % 10000000 == 0) {
            console.log(ts);
        }
    }
    console.log(ts);
};

fs.readFile("in13.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
    console.log("answer " + x);
});
