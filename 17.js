"use strict";
const fs = require("fs");

const maxSize = 22;
var world = Array(maxSize).fill(".");

const print = (z) => {
    for (var x = 0; x < maxSize; x++) {
        console.log(world[z][x][y].join(""));
    }
    console.log("-------  " + z + "  --------");
};

const getNeighbors = (z, x, y, w) => {
    var sum = 0;
    var c = 0;
    for (var i = z - 1; i < z + 2; i++) {
        for (var j = x - 1; j < x + 2; j++) {
            for (var k = y - 1; k < y + 2; k++) {
                for (var l = w - 1; l < w + 2; l++) {
                    if (
                        i >= 0 &&
                        j >= 0 &&
                        k >= 0 &&
                        l >= 0 &&
                        i < maxSize &&
                        j < maxSize &&
                        k < maxSize &&
                        l < maxSize
                    ) {
                        c++;

                        if (!(i == z && j == x && k == y && l == w)) {
                            if (world[i][j][k][l] == "#") {
                                sum++;
                            }
                        }
                    }
                }
            }
        }
    }
    return sum;
};

const myFunc = (lines) => {
    for (var x = 0; x < maxSize; x++) {
        world[x] = Array(maxSize).fill(".");
        for (var y = 0; y < maxSize; y++) {
            world[x][y] = Array(maxSize).fill(".");
            for (var w = 0; w < maxSize; w++) {
                world[x][y][w] = Array(maxSize).fill(".");
            }
        }
    }
    const mid = maxSize / 2 - 1;

    for (var x = 0; x < lines.length; x++) {
        for (var y = 0; y < lines[x].length; y++) {
            world[mid][mid][mid + x][mid + y] = lines[x].charAt(y);
        }
    }

    // run the logic.
    for (var turn = 1; turn <= 6; turn++) {
        var on = [];
        var off = [];

        for (var z = 0; z < maxSize; z++) {
            for (var x = 0; x < maxSize; x++) {
                for (var y = 0; y < maxSize; y++) {
                    for (var w = 0; w < maxSize; w++) {
                        const n = getNeighbors(z, x, y, w);
                        if (world[z][x][y][w] == "#") {
                            if (n < 2 || n > 3) {
                                off.push([z, x, y, w]);
                            }
                        } else {
                            if (n == 3) {
                                on.push([z, x, y, w]);
                            }
                        }
                    }
                }
            }
        }
        on.forEach((item) => {
            world[item[0]][item[1]][item[2]][item[3]] = "#";
        });
        off.forEach((item) => {
            world[item[0]][item[1]][item[2]][item[3]] = ".";
        });
    }

    var sum = 0;
    for (var z = 0; z < maxSize; z++) {
        for (var x = 0; x < maxSize; x++) {
            for (var y = 0; y < maxSize; y++) {
                for (var w = 0; w < maxSize; w++) {
                    if (world[z][x][y][w] == "#") {
                        sum++;
                    }
                }
            }
        }
    }

    //print(mid);
    // figure out which columns are valid.
    //    for (var i=0;i< valid)
    //    console.log(newNum);
    console.log(sum);
};

fs.readFile("in17.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
