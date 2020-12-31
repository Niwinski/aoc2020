"use strict";
const fs = require("fs");

const parseLine = (l) => {};

var rules = Array(1000).fill(0);

var sut = [];

const recurse = (r) => {
    return 1;
};
var exists = {};

const expand = (rule) => {
    var i = 0;
    while (i < rule.length) {
        if (rule[i] == "a" || rule[i] == "b") {
            i++;
        } else {
            var nr = rules[+rule[i]];
            //console.log(rule[i]);
            if (!nr) {
                nr = nr;
            }

            const si = nr.indexOf("|");
            if (si >= 0) {
                var newRule = [...rule];

                rule.splice(i, 1, ...nr.slice(0, si));
                newRule.splice(i, 1, ...nr.slice(si + 1));
                for (var t = 0; t < rule.length; t++) {
                    if (rule[t] == "|") {
                        nr = nr;
                    }
                }
                for (var t = 0; t < newRule.length; t++) {
                    if (newRule[t] == "|") {
                        nr = nr;
                    }
                }
                if (!exists[newRule]) {
                    exists[newRule] = 1;
                    sut.push(newRule);
                } else {
                    nr = nr;
                }
            } else {
                for (var t = 0; t < nr.length; t++) {
                    if (nr[t] == "|") {
                        nr = nr;
                    }
                }
                rule.splice(i, 1, ...nr);
            }
        }
    }
};

const myFunc = (lines) => {
    var i = 0;
    while (lines[i].length > 0) {
        //        console.log(lines[i]);

        var p = lines[i].replace(/"/g, "").split(/:/);
        rules[+p[0]] = p[1].substr(1).split(/ /);
        i++;
    }
    console.log(rules.slice(0, 20));

    sut.push([57, 30]);
    sut.push([101, 20]);

    //    expland(rules[0].split(/ /));
    console.log(sut);
    var okay = {};
    var fourtytwo = {};

    for (var x = 0; x < sut.length; x++) {
        //console.log(sut[x]);
        expand(sut[x]);
        sut[x] = sut[x].join("");
        //console.log(sut[x]);
        if (x % 10000 == 0) {
            console.log(x, sut.length);
        }
        fourtytwo[sut[x]] = 1;
    }
    var thirtyOne = {};
    sut = [];
    sut.push([2, 20]);
    sut.push([82, 30]);
    for (var x = 0; x < sut.length; x++) {
        //console.log(sut[x]);
        expand(sut[x]);
        sut[x] = sut[x].join("");
        //console.log(sut[x]);
        if (x % 10000 == 0) {
            console.log(x, sut.length);
        }
        thirtyOne[sut[x]] = 1;
    }

    console.log(Object.keys(fourtytwo).length);
    console.log(Object.keys(thirtyOne).length);

    var sum = 0;
    var tried = 0;
    i++;
    while (i < lines.length) {
        p = lines[i].match(/.{1,8}/g);
        const max = p.length;
        var ok = true;
        var x = 0;
        tried++;
        while (x < max - 1 && ok) {
            if (!fourtytwo[p[x]]) {
                break;
            }
            x++;
        }
        ok = x > max / 2;
        while (x < max && ok) {
            if (!thirtyOne[p[x]]) {
                ok = false;
            }
            x++;
        }
        if (ok) {
            sum++;
        }
        i++;
    }
    console.log(sum);
    console.log(tried);
    // now to create the different rules
};

fs.readFile("in19.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
