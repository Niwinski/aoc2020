const fs = require("fs");

const validatePassport = (paspt) => {
    const must = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];
    matches = 0;
    must.forEach((i) => {
        if (paspt[i]) {
            matches++;
        }
    });
    if (matches == 7) {
        // part two validation
        var b = +paspt["byr"];
        if (b < 1920 || b > 2002) {
            return 0;
        }

        b = +paspt["iyr"];
        if (b < 2010 || b > 2020) {
            return 0;
        }

        b = +paspt["eyr"];
        if (b < 2020 || b > 2030) {
            return 0;
        }

        var s = paspt["hgt"];
        b = parseInt(s, 10);
        if (s.endsWith("in")) {
            if (b < 59 || b > 76) {
                //console.log(s);
                return 0;
            }
        } else if (s.endsWith("cm")) {
            if (b < 150 || b > 193) {
                //console.log(s);
                return 0;
            }
        } else {
            return 0;
        }
        s = paspt["hcl"];
        if (!s.match(/#[0-9a-f]{6}/)) {
            //console.log(s);
            return 0;
        }
        console.log(s);

        s = paspt["ecl"];
        ok = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        if (!ok.includes(s)) {
            //console.log(s + "|");
            return 0;
        }

        s = paspt["pid"];
        if (!s.match(/^[0-9]{9}$/)) {
            return 0;
        }
    } else {
        return 0;
    }
    //console.log(paspt);
    return 1;
};

const getValid = (lines, dx, dy) => {
    var sum = 0;

    curPassport = {};
    lines.forEach((l) => {
        p = l.split(/[ :]/);
        //console.log(p);
        if (p.length == 1) {
            sum += validatePassport(curPassport);
            curPassport = {};
        } else {
            for (i = 0; i < p.length; i += 2) {
                curPassport[p[i]] = p[i + 1];
            }
        }
    });
    return sum;
};

fs.readFile("in4.txt", "utf8", function (err, data) {
    if (err) throw err;

    var valid = 0;

    lines = data.split(/[\n\r]{1,2}/);
    var p = 1;
    //console.log(lines);
    x = getValid(lines);
    console.log("valid " + x);
});
