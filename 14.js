const fs = require("fs");

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

String.prototype.replaceAt = function (index, replacement) {
    return (
        this.substr(0, index) +
        replacement +
        this.substr(index + replacement.length)
    );
};
all_nums = {};

const writeTo = (val, addr, mask) => {
    for (var i = 0; i < mask.length; i++) {
        if (mask[i] == "X") {
            writeTo(val, addr, mask.replaceAt(i, "0"));
            writeTo(val, addr, mask.replaceAt(i, "1"));
            break;
        }
    }
    if (mask.indexOf("X") == -1) {
        myNum = 0;
        pp = 1;
        for (var x = mask.length - 1; x >= 0; x--) {
            var c = +mask[x];
            if (c == 1) {
                myNum += 1 * pp;
            } else {
                myNum += pp & addr;
            }
            pp *= 2;
        }
        all_nums[myNum] = val;
    }
};

const myFunc = (lines) => {
    var sum = 0;

    // mask = 1X100X0X00XX1X011X1000001X0110X01110
    // mem[32333] = 1744
    // mem[56029] = 299
    // mem[25784] = 31286
    var mask = "";
    for (var i = 0; i < lines.length; i++) {
        const p = lines[i].replace(" ", "").split(/= /);
        if (p[0] == "mask") {
            mask = p[1];
        } else if (p[0].charAt(1) == "e") {
            if ([p[0]] == "mem[11544]") {
                const bp = 7;
            }
            var addr = +p[0].replace("mem[", "").replace("]", "");
            const val = +p[1];
            myNum = 0;
            pp = 1;
            for (var x = mask.length - 1; x >= 0; x--) {
                if (mask[x] != "X") {
                    myNum += pp & addr;
                }
                pp *= 2;
            }
            writeTo(val, myNum, mask);
        }
    }
    Object.keys(all_nums).forEach((k) => {
        sum += all_nums[k];
    });
    console.log(sum);
};

fs.readFile("in14.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
});
