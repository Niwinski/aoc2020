"use strict";
const fs = require("fs");

const evalSimple = (l) => {
    // l is a list of either numbers or operators, only valid operators are + and *
    // return the sum
    var sum = 0;
    const part1 = false;

    if (part1) {
        sum = +l[0];
        for (var x = 1; x < l.length; x += 2) {
            if (l[x] == "*") {
                sum *= +l[x + 1];
            } else {
                sum += +l[x + 1];
            }
        }
    } else {
        // do addition first.
        var i = 1; // + can't be the first or last so we can save cycles (a bit like ordering a diet coke with a supersized big mac considering the splice in the loop)
        while (i < l.length - 1) {
            if (l[i] == "+") {
                l[i - 1] = +l[i - 1] + +l[i + 1];
                l.splice(i, 2);
            } else if (l[i] == "*") {
                l.splice(i, 1); // remove it too so only numbers are left.
            } else i++;
        }

        sum = +l[0];
        for (var i = 1; i < l.length; i++) {
            sum *= l[i];
        }
    }
    return sum;
};

const parseLine = (l) => {
    var tokens = [];
    var bracketLevel = 0;
    var start = 0;
    var i = 0;

    while (i < l.length) {
        if (l[i] == " ") {
            // do nothing for spaces
        } else if (l[i] == "(") {
            start = i + 1;
            bracketLevel = 1;
            while (i < l.length) {
                i++;
                if (l[i] == "(") {
                    bracketLevel++;
                } else if (l[i] == ")") {
                    bracketLevel--;
                    if (bracketLevel == 0) {
                        break;
                    }
                }
            }
            // strip out the part that's in brackets and eval that recursively.
            tokens.push(parseLine(l.substring(start, i)));
        } else {
            // this is a number or an operator
            tokens.push(l[i]);
        }
        i++;
    }
    // once we're here we've colapsed all of the () and now just have a list of numbers and operators
    return evalSimple(tokens);
};

const myFunc = (lines) => {
    var sum = 0;
    lines.forEach((l) => {
        sum += parseLine(l, 0);
    });
    console.log("Sum = " + sum);
};

fs.readFile("in18.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
