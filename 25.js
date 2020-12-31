"use strict";
const fs = require("fs");

class Node {
    constructor(cur, dir) {
        this.nei = Array(6).fill(undefined);
        this.color = false;
        this.id = guid++;
        if (!cur) {
            return;
        }
        // link it
        cur.nei[dir] = this;
        const rev_dir = (dir + 3) % 6;
        this.nei[rev_dir] = cur;

        // check neighbors for links.
        const left = (dir - 1 + 6) % 6;
        if (cur.nei[left]) {
            cur.nei[left].nei[(dir + 1) % 6] = this;
            this.nei[(rev_dir + 1) % 6] = cur.nei[left];
        }
        const right = (dir + 1) % 6;
        if (cur.nei[right]) {
            cur.nei[right].nei[(dir - 1 + 6) % 6] = this;
            this.nei[(rev_dir - 1 + 6) % 6] = cur.nei[right];
        }
    }

    getBlackNei() {
        var sum = 0;
        for (var i = 0; i < 6; i++) {
            if (this.nei[i] && this.nei[i].color) {
                sum++;
            }
        }
        return sum;
    }
}
const myFunc = (lines) => {
    var sum = 0;

    var pub = 5764801;
    //3418282
    //8719412
    var init = 7;
    var loop = 8987376;
    var sn = 7;
    sn = 8719412;
    var s = 1;
    var i = 0;
    var done = 0;
    //    for (var i = 0; i < loop; i++) {
    while (true) {
        s *= sn;
        s = s % 20201227;
        if (loop - 1 == i) {
            console.log(i + 1, s, sn);
            break;
        }
        if (false) {
            if (s == 3418282 || s == 8719412) {
                console.log(i + 1, s, sn);
                done++;
                if (done > 1) {
                    break;
                }
            }
        }
        i++;
    }
    var i = 0;
    while (i < lines.length) {
        i++;
    }

    console.log(sum);
};

fs.readFile("in25.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
