"use strict";
const fs = require("fs");
var guid = 1;

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

const dirToIndex = ["ne", "e", "se", "sw", "w", "nw"];
var possiblyFlipped = {};
const myFunc = (lines) => {
    var sum = 0;

    // make a big grid
    var center = new Node(undefined, 0);
    const origin = center;

    var cur = center;

    for (var y = 0; y < 1000; y++) {
        cur = center;
        while (cur.nei[0]) {
            cur = cur.nei[0];
        }
        for (var x = 0; x < 1000; x++) {
            const dir = x % 2 ? 2 : 0;
            if (!cur.nei[dir]) {
                cur.nei[dir] = new Node(cur, dir);
            }
            cur = cur.nei[dir];
        }
    }

    cur = center;
    for (var x = 0; x < 500; x++) {
        cur = cur.nei[0];
    }
    for (var x = 0; x < 250; x++) {
        cur = cur.nei[1];
    }
    center = cur;
    var i = 0;
    while (i < lines.length) {
        var cur = center;
        var x = 0;
        while (x < lines[i].length) {
            var c = lines[i].charAt(x);
            if (c == "n" || c == "s") {
                x++;
                c += lines[i].charAt(x);
            }
            x++;
            const dir = dirToIndex.indexOf(c);
            if (!cur.nei[dir]) {
                cur.nei[dir] = new Node(cur, dir);
            }
            cur = cur.nei[dir];
        }
        // we stopped flip the tile.
        cur.color = !cur.color;
        sum += cur.color ? 1 : -1;
        i++;
    }

    // go through all of the tiles
    for (var d = 0; d < 101; d++) {
        var tiles = 0;
        cur = origin;
        var listToFlip = [];
        do {
            var nextline = cur.nei[0];
            do {
                // process tile
                const nn = cur.getBlackNei();
                if (
                    (cur.color && (nn == 0 || nn > 2)) ||
                    (!cur.color && nn == 2)
                ) {
                    listToFlip.push(cur);
                }
                if (cur.color) {
                    tiles++;
                }
                cur = cur.nei[1];
            } while (cur);
            cur = nextline;
        } while (nextline);

        // flip
        listToFlip.forEach((x) => {
            x.color = !x.color;
        });
        console.log(d, tiles);
    }
    // var sum = 0;
    // Object.keys(possiblyFlipped).forEach((e) => {
    //     if (possiblyFlipped[e].color) {
    //         sum++;
    //     }
    // });
    //    cur.print();
    console.log(guid, tiles);
};

fs.readFile("src/in24.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
