const fs = require("fs");

const trees = (lines, dx, dy) => {
    const width = lines[0].length;
    var sum = 0;
    var pos = 0;

    for (i = 0; i < lines.length; i += dy) {
        sum += lines[i].charAt(pos) == "#" ? 1 : 0;
        //console.log(l.charAt(pos) + ", " + width + "," + pos);
        pos = (pos + dx) % width;
    }
    return sum;
};
fs.readFile("in3.txt", "utf8", function (err, data) {
    if (err) throw err;

    var valid = 0;

    lines = data.split(/[\n\r]+/);
    var p = 1;
    console.log(lines[0]);
    //   console.log(lines[0] + width);
    num = trees(lines, 1, 1);
    p *= num;
    console.log("trees " + num + " p: " + p);

    num = trees(lines, 3, 1);
    p *= num;
    console.log("trees " + num + " p: " + p);

    num = trees(lines, 5, 1);
    p *= num;
    console.log("trees " + num + " p: " + p);

    num = trees(lines, 7, 1);
    p *= num;
    console.log("trees " + num + "  p: " + p);

    num = trees(lines, 1, 2);
    p *= num;
    console.log("trees " + num + "  p: " + p);
});
