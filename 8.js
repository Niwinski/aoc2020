const { countReset } = require("console");
const fs = require("fs");

const terminate = (lines) => {
    var acc = 0;
    var i = 0;
    var used = Array(lines.length).fill(0);

    while (!used[i]) {
        used[i] = 1;
        const p = lines[i].split(/ /);
        if (p[0] == "acc") {
            acc += +p[1];
            i++;
        } else if (p[0] == "jmp") {
            i += +p[1];
        } else {
            i++;
        }
        if (i >= lines.length) {
            return acc;
        }
    }
    return -1;
};

const myFunc = (lines) => {
    var i = 0;
    for (var i = 0; i < lines.length; i++) {
        const old = lines[i];
        if (old.startsWith("nop")) {
            lines[i] = lines[i].replace("nop", "jmp");
        } else if (old.startsWith("jmp")) {
            lines[i] = lines[i].replace("jmp", "nop");
        }
        const a = terminate(lines);
        if (a > 0) {
            return a;
        }
        lines[i] = old;
    }
    return -1;
};

fs.readFile("in8.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
    console.log("answer " + x);
});
