const fs = require("fs");

const myFunc = (lines) => {
    var high = 0;
    all = Array(128 * 8).fill(0);

    lines.forEach((e) => {
        id = 0;
        for (i = 0; i < 7; i++) {
            id += e.charAt(i) == "B" ? Math.pow(2, 6 - i) : 0;
        }
        id *= 8;
        x = 4;
        for (i = 7; i < 10; i++) {
            id += e.charAt(i) == "R" ? x : 0;
            x /= 2;
        }
        high = Math.max(high, id);
        all[id] = 1;
    });
    //return high;  // for part1

    var i = 1;
    while (i++ < 128 * 8) {
        if (all[i] == 0 && all[i - 1] + all[i + 1] == 2) {
            return i;
        }
    }
};

fs.readFile("in5.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
    console.log("answer " + x);
});
