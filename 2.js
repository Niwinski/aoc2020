const fs = require("fs");

const checkLine_firstPart = (line) => {
    p = line.split(/[-: ]/);

    const min = parseInt(p[0], 10);
    const max = parseInt(p[1], 10);
    const ch = p[2];
    count = 0;
    const word = p[4];

    word.split("").forEach((c) => {
        if (c == ch) {
            count++;
        }
    });

    ret = count >= min && count <= max ? 1 : 0;
    if (ret == 0) {
        // console.log(p);
        // console.log(p[4] + " has " + count + " [" + ch + "]");
    }
    return ret;
};
const checkLine = (line) => {
    p = line.split(/[-: ]/);

    const a = parseInt(p[0], 10) - 1;
    const b = parseInt(p[1], 10) - 1;
    const ch = p[2];
    count = 0;
    const word = p[4];

    count += word[a] == ch ? 1 : 0;
    count += word[b] == ch ? 1 : 0;

    ret = count == 1 ? 1 : 0;
    return ret;
};
fs.readFile("in2.txt", "utf8", function (err, data) {
    if (err) throw err;

    var valid = 0;

    lines = data.split(/[\n\r]+/);
    lines.forEach((l) => {
        valid += checkLine(l);
    });
    console.log("Valid " + valid);
});
