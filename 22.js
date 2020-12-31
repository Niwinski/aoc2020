"use strict";
const fs = require("fs");

const play = (me, you, game) => {
    var hands = [[...me], [...you]];
    var round = 1;
    var hadIt = {};
    while (hands[0].length && hands[1].length) {
        console.log("round ", round, "game ", game);
        //console.log(hands[0], hands[1]);
        if (hadIt[hands[0].toString()]) {
            return [0, hands[0]];
        }

        hadIt[hands[0].toString()] = 1;

        var m = hands[0].splice(0, 1)[0];
        var c = hands[1].splice(0, 1)[0];
        var win = 1;
        if (m > c) {
            win = 0;
        }

        if (m <= hands[0].length && c <= hands[1].length) {
            // console.log("recurse");
            var win = play(
                hands[0].slice(0, m),
                hands[1].slice(0, c),
                game++
            )[0];
        }
        //console.log(m, c, " win ", win);
        if (win == 0) {
            hands[0].push(m);
            hands[0].push(c);
        } else {
            hands[1].push(c);
            hands[1].push(m);
        }
        round++;
    }
    return hands[1].length ? [1, hands[1]] : [0, hands[0]];
};

const myFunc = (lines) => {
    console.log(
        "==============================================================================="
    );
    console.log(
        "==============================================================================="
    );
    console.log(
        "==============================================================================="
    );
    console.log(
        "==============================================================================="
    );
    console.log(
        "==============================================================================="
    );

    var i = 0;
    i++;
    var hands = Array(2);
    hands[0] = [];
    hands[1] = [];
    var h = 0;
    while (i < lines.length) {
        if (lines[i].length < 1) {
            // second player.
            h++;
            i++;
            i++;
        }
        hands[h].push(+lines[i]);
        i++;
    }

    const winner = play(hands[0], hands[1], 1);
    // while (hands[0].length && hands[1].length) {
    //     var m = hands[0].splice(0, 1)[0];
    //     var c = hands[1].splice(0, 1)[0];
    //     if (m > hands[0].length && c > hands[1].length) {

    //         console.log("recurse");
    //     }
    //     if (m > c) {
    //         hands[0].push(m);
    //         hands[0].push(c);
    //     } else {
    //         hands[1].push(c);
    //         hands[1].push(m);
    //     }
    // }

    console.log(winner);
    var score = 0;
    var mult = winner[1].length;
    winner[1].forEach((element) => {
        score += mult * element;
        mult--;
    });
    console.log(score);
};

fs.readFile("web-server/src/in22.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
