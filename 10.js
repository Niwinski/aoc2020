const fs = require("fs");

const addTo = (num, lines) => {};
const myFunc = (lines) => {
    nums = [];
    lines.forEach((x) => {
        nums.push(+x);
    });
    nums.push(0);
    nums = nums.sort(function (a, b) {
        return a - b;
    });
    nums.push(nums[nums.length - 1] + 3);
    console.log(nums);
    d = Array(5).fill(0);
    d[1] = 1;
    d[3] = 1;
    run = 1;
    sum = 1;

    const combos = [0, 1, 1, 2, 4, 7];

    for (var i = 1; i < nums.length; i++) {
        const gap = nums[i] - nums[i - 1];
        if (gap > 1) {
            sum *= combos[run];
            run = 0;
        }
        run++;
    }
    console.log(sum);
};

fs.readFile("in10.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
    console.log("answer " + x);
});
