const fs = require("fs");
console.log("OK1: ");

const findPairs = (nums, total) => {
    val = -1;
    Object.keys(nums).find((n) => {
        const rem = total - n;
        if (nums[rem] == 1) {
            val = n;
            return true;
        }
        return false;
    });
    return val;
};
fs.readFile("input.txt", "utf8", function (err, data) {
    if (err) throw err;

    nums = {};

    lines = data.split(/\n/);
    lines.forEach((element) => {
        nums[parseInt(element, 10)] = 1;
    });

    // two numbers
    x = findPairs(nums, 2020);
    console.log(2020 - x + ", ", x);

    Object.keys(nums).find((n) => {
        const rem = 2020 - n;

        const x = findPairs(nums, rem);
        if (x > 0) {
            console.log(n + ", ", rem - x, ", ", x);
            console.log(n * (rem - x) * x);
            return true;
        }
        return false;
    });
});
