"use strict";

const { groupCollapsed } = require("console");
const fs = require("fs");

const myFunc = (lines) => {
    var i = 0;

    var cat = {};
    var valid = Array(1000).fill(false);
    // ranges
    while (lines[i]) {
        var thisCat = Array(1000).fill(false);

        const p = lines[i].split(/:/)[1].split(/ /);
        //console.log(p);
        for (var x = 1; x < 4; x += 2) {
            const n = p[x].split(/-/);
            for (var j = +n[0]; j <= +n[1]; j++) {
                valid[j] = true;
                thisCat[j] = true;
            }
        }
        cat[i] = thisCat;
        i++;
    }
    const maxCat = i;
    //console.log(valid);
    i++;
    i++;
    var myT = lines[i];
    i += 3;

    var good = [];
    var sum = 0;
    // rest of nums
    while (lines[i]) {
        const nums = lines[i].split(/,/);
        var validTix = true;
        nums.forEach((e) => {
            if (!valid[e]) {
                sum += +e;
                validTix = false;
            }
        });
        if (validTix) {
            good.push(nums);
            //console.log(nums);
        }
        i++;
    }
    var catOrder = [];
    var availColumns = [];
    //while (catOrder.length < maxCat - 1) {
    for (var i = 0; i < maxCat; i++) {
        const vv = cat[i];
        availColumns.push([]);
        for (var y = 0; y < good[0].length; y++) {
            var bad = false;
            for (var g = 0; g < good.length; g++) {
                if (!vv[good[g][y]]) {
                    // this column won't fit.
                    bad = true;
                    g = good.length;
                }
            }
            if (!bad) {
                availColumns[i].push(y);
            }
        }
        //console.log(availColumns);
        //console.log(availColumns.length);
        //  }
    }
    var done = Array(maxCat).fill(0);
    var found = 0;
    while (found < maxCat - 1) {
        for (var i = 0; i < maxCat; i++) {
            if (availColumns[i].length == 1) {
                var col = availColumns[i][0];
                done[col] = i;
                for (var y = 0; y < maxCat; y++) {
                    var idx = availColumns[y].indexOf(col);
                    if (idx > -1) {
                        availColumns[y].splice(idx, 1);
                    }
                }
                found++;
            }
        }
    }
    console.log(done);
    // figure out which columns are valid.
    //    for (var i=0;i< valid)
    //    console.log(newNum);
    console.log(sum);
};

// 5,  11, 17, 19, 14, 13,  0,  1, 10,  4, 15,  8,  9, 18,  7,  3, 16,  6,  2, 12
// 109,137,131,157,191,103,127,53,107, 151,61,  59,139,83,101,149, 89,193,113, 97

fs.readFile("in16.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
