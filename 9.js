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
const doesSum = (lines, index, num) => {
    var ret = 0;
    var nums = {};
    for (var i = 0; i < 25; i++) {
        nums[lines[index + i]] = 1;
    }
    Object.keys(nums).forEach((k) => {
        var rem = num - k;
        if (nums[rem] && rem != k) {
            ret = true;
        }
    });
    return ret;
};

const addTo = (num, lines) => {
    for (var i = 0; i < lines.length; i++) {
        var sum = lines[i];
        var j = i + 1;
        while (sum < num) {
            sum += lines[j];
            j++;
        }
        //console.log(i + " " + j + " " + sum);
        if (sum == num) {
            console.log(i);
            console.log(j);
            console.log(lines.slice(i, j));
        }
    }
};
const myFunc = (lines) => {
    nums = [];
    lines.forEach((x) => {
        nums.push(+x);
    });

    addTo(393911906, nums);
    //addTo(127, nums);
    return;
    for (var i = 25; i < nums.length; i++) {
        if (!doesSum(lines, i - 25, nums[i])) {
            console.log("nope " + nums[i]);
        }
    }
};

fs.readFile("in9.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
    console.log("answer " + x);
});

var numm = 16773507 + 42568378;
console.log("out " + numm);
