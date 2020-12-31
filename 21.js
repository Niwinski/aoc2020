"use strict";
const { timeLog } = require("console");
const fs = require("fs");

var all_alergs = {};
var all_ing = {};

function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        return arr.splice(index, 1);
    }
    return arr;
}

const myFunc = (lines) => {
    var i = 0;

    while (i < lines.length) {
        var p = lines[i].split(/ \(contains /);
        var ingreds = p[0].split(/ /);
        var alerg = p[1].replace(")", "");
        if (alerg.indexOf(",")) {
            alerg = alerg.split(/, /);
        } else {
            alerg - [alerg];
        }

        ingreds.forEach((k) => {
            if (!all_ing[k]) {
                all_ing[k] = 0;
            }
            all_ing[k]++;
        });

        alerg.forEach((k) => {
            if (!all_alergs[k]) {
                all_alergs[k] = ingreds;
            } else {
                // remove non common ingredients.
                var common = [];
                ingreds.forEach((e) => {
                    if (all_alergs[k].indexOf(e) >= 0) {
                        common.push(e);
                    }
                });
                all_alergs[k] = common;
            }
        });
        i++;
    }

    // sort by count (first one should only have one allergen)
    var all = Object.keys(all_alergs).map((k) => {
        return [k, all_alergs[k]];
    });
    all.sort((f, s) => {
        return s[1] - f[1];
    });

    for (i = 0; i < all.length; i++) {
        if (all[i][1].length == 1) {
            var done = true;
            var val = all[i][1][0];
            // found a unique remove all the others.
            for (var x = 0; x < all.length; x++) {
                if (x != i) {
                    var index = all[x][1].indexOf(val);
                    if (index > -1) {
                        all[x][1].splice(index, 1);
                        done = false;
                    }
                }
            }
            if (!done) {
                i = 0;
            }
        }
    }
    // console.log(sum);
    // console.log(tiles.length);
    console.log(all_alergs);
    console.log(all_ing);
    var sum = 0;

    // get a list of all the alergens.
    var listOAllergens = Object.keys(all_alergs).map((k) => {
        return all_alergs[k][0];
    });
    console.log(listOAllergens);
    Object.keys(all_ing).forEach((k) => {
        if (listOAllergens.indexOf(k) < 0) {
            sum += all_ing[k];
        }
    });
    console.log(sum);
    // now to create the different rules
    var allergens = Object.keys(all_alergs).map((k) => {
        return [k, all_alergs[k]];
    });
    allergens.sort();
    var a = "";
    allergens.forEach((e) => {
        a += e[1][0] + ",";
    });
    console.log(a);
};

fs.readFile("in21.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
