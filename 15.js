"use strict";

const fs = require("fs");

const myFunc = (lines) => {
    var turn = 1;
    const start = lines[0].split(/,/);

    //var pool = [] = ;
    var pool = Array(30000000).fill(0);
    var lastNum = 0;
    start.forEach((n) => {
        lastNum = +n;
        pool[lastNum] = turn;
        turn++;
    });
    var newNum = 0;
    lastNum = 0;
    while (turn < 30000000) {
        newNum = pool[lastNum];
        if (newNum) {
            newNum = turn - pool[lastNum];
        }
        //        newNum = pool[lastNum];
        pool[lastNum] = turn;
        lastNum = newNum;
        turn++;
        if (turn % 300000 == 0) {
            console.log(turn);
        }
        if (turn > 29999990) {
            console.log(newNum);
        }
    }
    console.log(newNum);
    //    console.log(sum);
};

fs.readFile("in15.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
