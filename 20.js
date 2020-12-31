"use strict";
const { timeLog, timeEnd } = require("console");
const fs = require("fs");

var edges = {};
var tiles = [];

const getTop = (tile) => {
    const lookup = [
        tile.norm[0],
        tile.flip[3],
        tile.flip[2],
        tile.norm[1],
        tile.flip[0],
        tile.flip[1],
        tile.norm[2],
        tile.norm[3],
    ];
    return lookup[tile.mirror * 4 + tile.rot];
};
const getLeft = (tile) => {
    const lookup = [
        tile.norm[3],
        tile.norm[2],
        tile.flip[1],
        tile.flip[0],
        tile.norm[1],
        tile.flip[2],
        tile.flip[3],
        tile.norm[0],
    ];
    return lookup[tile.mirror * 4 + tile.rot];
};
const getRight = (tile) => {
    const lookup = [
        tile.norm[1],
        tile.norm[0],
        tile.flip[3],
        tile.flip[2],
        tile.norm[3],
        tile.flip[0],
        tile.flip[1],
        tile.norm[2],
    ];
    return lookup[tile.mirror * 4 + tile.rot];
};
const getBottom = (tile) => {
    const lookup = [
        tile.norm[2],
        tile.flip[1],
        tile.flip[0],
        tile.norm[3],
        tile.flip[2],
        tile.flip[3],
        tile.norm[0],
        tile.norm[1],
    ];
    return lookup[tile.mirror * 4 + tile.rot];
};
const flipTile = (tile) => {
    if (tile.mirror) {
        tile.mirror = 0;
    } else {
        tile.mirror = 1;
    }
};
const rotateTile = (tile) => {
    tile.rot = (tile.rot + 1) % 4;
};
const findTile = (top, left) => {
    return tiles.find((tile) => {
        if (top == left) {
            const first = tile.norm.indexOf(top);
            const second = tile.norm.indexOf(top, first + 1);
            return first >= 0 && second >= 0;
        } else {
            const ret =
                (tile.norm.indexOf(top) >= 0 || tile.flip.indexOf(top) >= 0) &&
                (tile.norm.indexOf(left) >= 0 || tile.flip.indexOf(left) >= 0);
            return ret;
        }
    });
};

const orient = (tile, top, left) => {
    var done = false;
    var t = 1;
    if (top == 348) {
        t = t;
    }
    while (!done) {
        const tt = getTop(tile);
        const ll = getLeft(tile);

        if (tt == top && ll == left) {
            done = true;
        } else {
            if (t % 4 == 0) {
                rotateTile(tile);
                flipTile(tile);
            } else {
                rotateTile(tile);
            }
        }
        t++;
    }
};
const myFunc = (lines) => {
    var i = 0;
    while (i < lines.length) {
        var tile = {};
        tile.num = +lines[i].split(/[ :]/)[1];
        var temp = Array(10);
        //console.log("reading " + tile.num);
        i++;
        for (var x = 0; x < 10; x++) {
            temp[x] = lines[i + x];
        }
        i += 11;

        // get the four numbers
        var s = Array(4).fill("");
        for (var x = 0; x < 10; x++) {
            s[0] += temp[0][x] == "#" ? "1" : "0";
            s[2] += temp[9][x] == "#" ? "1" : "0";
            s[1] += temp[x][0] == "#" ? "1" : "0";
            s[3] += temp[x][9] == "#" ? "1" : "0";
        }
        tile.norm = Array(4);
        tile.flip = Array(4);
        tile.rot = 0;
        tile.mirror = 0;
        for (var x = 0; x < 4; x++) {
            var n = parseInt(s[x], 2);
            tile.norm[x] = n;
            if (!edges[n]) {
                edges[n] = 0;
            }
            edges[n]++;
            n = parseInt(s[x].split("").reverse().join(""), 2);
            tile.flip[x] = n;
            if (!edges[n]) {
                edges[n] = 0;
            }
            edges[n]++;
        }
        // var ff = tile.flip[1];
        // tile.flip[1] = tile.flip[3];
        // tile.flip[3] = ff;
        tiles.push(tile);
    }

    // Object.keys(edges).forEach((k) => {
    //     if (edges[k] > 2) {
    //         console.log(k, edges[k]);
    //     }
    // });
    var sum = 1;
    var cornerTile;
    for (var i = 0; i < tiles.length; i++) {
        var nonMatch = 0;
        for (var x = 0; x < 4; x++) {
            if (edges[tiles[i].norm[x]] == 1) {
                tiles[i].norm[x] = -1;
                nonMatch++;
            }
            if (edges[tiles[i].flip[x]] == 1) {
                tiles[i].flip[x] = -1;
                nonMatch++;
            }
        }
        if (nonMatch > 2) {
            if (!cornerTile) {
                cornerTile = tiles[i];
            }
            console.log(tiles[i].num, tiles[i].norm, tiles[i].flip, nonMatch);
            sum *= tiles[i].num;
        }
    }

    var tt = findTile(-1, -1);

    const width = 3; //12

    var cur = cornerTile; // i is the first tile
    var done = false;
    var x = 0;
    var y = 0;
    var map = Array(width);

    // orient the tile.
    console.log(cur);
    //    orient(cur, -1, -1);
    console.log(cur);

    // console.log(findTile(-1, -1));
    var old = cur;
    for (var y = 0; y < width; y++) {
        map[y] = Array(width);
        for (var x = 0; x < width; x++) {
            console.log(x, y);
            var top = -1;
            var left = -1;
            if (x > 0) {
                left = getRight(map[y][x - 1]);
            }
            if (y > 0) {
                top = getBottom(map[y - 1][x]);
            }
            var tt = findTile(top, left);
            orient(tt, top, left);
            map[y][x] = tt;
            tiles.splice(tiles.indexOf(tt), 1);
        }
    }
    console.log(map);

    console.log(sum);
};

fs.readFile("in20.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
