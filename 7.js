const { countReset } = require("console");
const fs = require("fs");
const { array } = require("yargs");
colors = {};
possible = {};
bits = {}; // color -> line

const findR = (c) => {
    var sum = 0;
    if (!colors[c]) {
        //console.log("End for " + c);
        return 0;
    }
    sum += colors[c].length;
    //console.log("checking " + c + "  " + colors[c]);
    colors[c].forEach((k) => {
        //console.log("check " + k + " found " + sum);
        possible[k] = 1;
        sum += findR(k);
    });
    return sum;
};

const countR = (c) => {
    var sum = 0;
    //console.log(bits["shinygold"]);
    console.log("check  " + c + " (" + bits[c]);

    if (!bits[c]) {
        console.log("End for " + c);
        return 1;
    }

    for (var i = 0; i < bits[c].length; i += 4) {
        cnt = parseInt(bits[c][i], 10);
        console.log(c + "  " + i);
        sum += cnt * countR(bits[c][i + 1] + bits[c][i + 2]);
        console.log(c + " adding " + bits[c][i + 1] + " for " + sum);
    }
    console.log(c + " had " + sum);

    return 1 + sum;
};

const myFunc = (lines) => {
    var sum = 0;

    lines.forEach((e) => {
        //dim olive bags contain 3 posh silver bags, 5 dotted beige bags, 5 light lime bags.

        var p = e.split(/ bags contain /);
        var parent = p[0].split(/ /);

        var bags = p[1].split(/ /);
        // console.log(p[1] + " -> ", bags.length / 4);
        if (bags.length > 3) {
            const c = parent[0] + parent[1];
            bits[c] = bags;
            for (i = 0; i < bags.length; i += 4) {
                const targetC = bags[i + 1] + bags[i + 2];
                if (!colors[targetC]) {
                    colors[targetC] = [];
                }
                colors[targetC].push(c);
                //console.log("add " + targetC + " for " + c);
            }
            //console.log(bits[c]);
        }
    });

    return countR("shinygold");
    // sum = findR("shinygold");
    // console.log(Object.keys(possible));
    // return Object.keys(possible).length;
};

fs.readFile("in7.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
    console.log("answer " + x);
});
