const fs = require("fs");

const myFunc = (lines) => {
    var sum = 0;

    var counts = {};
    var people = 0;
    lines.forEach((e) => {
        if (e.length == 0) {
            // new card.
            Object.keys(counts).forEach((k) => {
                if (counts[k] == people) {
                    sum++;
                }
            });
            people = 0;
            counts = {};
        } else {
            people++;
            for (i = 0; i < e.length; i++) {
                if (!counts[e.charAt(i)]) {
                    counts[e.charAt(i)] = 0;
                }
                counts[e.charAt(i)] += 1;
            }
        }
    });
    return sum;
};

fs.readFile("in6.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
    console.log("answer " + x);
});
