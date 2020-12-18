const { dirxml } = require("console");
const fs = require("fs");

const getDir = (y, x, tx, ty, room) => {
    return 0;
};

const myFunc = (lines) => {
    var x = 0;
    var y = 0;
    var wx = 10;
    var wy = 1;
    var d = 0;

    lines.forEach((l) => {
        var c = l.charAt(0);
        var num = +l.substring(1);
        if (c == "L" || c == "R") {
            if (c == "L") {
                num *= -1;
            }
            d = (num + 360) % 360;
            if (d == 90) {
                [wx, wy] = [wy, -wx];
            } else if (d == 180) {
                [wx, wy] = [-wx, -wy];
            } else if (d == 270) {
                [wx, wy] = [-wy, wx];
            }
        } else if (c == "F") {
            // map = ["E", "S", "W", "N"];
            // c = map[d / 90];
            x += wx * num;
            y += wy * num;
        } else if (c == "E") {
            wx += num;
        } else if (c == "W") {
            wx -= num;
        } else if (c == "N") {
            wy += num;
        } else if (c == "S") {
            wy -= num;
        }
        // console.log(x + ", " + y);
        // console.log(wx + ", " + wy);
        // console.log("-------");
    });

    console.log(Math.abs(x) + Math.abs(y));
};

fs.readFile("in12.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
    console.log("answer " + x);
});
