const fs = require("fs");

const getDir = (y, x, tx, ty, room) => {
    dy = y;
    dx = x;
    const maxX = room[0].length - 1;
    const maxY = room.length - 1;
    do {
        dy += ty;
        dx += tx;
        if (dy < 0 || dx < 0 || dx > maxX || dy > maxY) {
            return 0;
        }
        if (room[dy][dx] != ".") {
            break;
        }
    } while (1);

    if (room[dy][dx] == "#") {
        return 1;
    }
    return 0;
};
const getOccupied = (y, x, room) => {
    if (room[y][x] == ".") {
        return -1;
    }
    var sum = 0;
    sum += getDir(y, x, 1, 0, room);
    sum += getDir(y, x, 1, 1, room);
    sum += getDir(y, x, 1, -1, room);
    sum += getDir(y, x, -1, 0, room);
    sum += getDir(y, x, -1, 1, room);
    sum += getDir(y, x, -1, -1, room);
    sum += getDir(y, x, 0, 1, room);
    sum += getDir(y, x, 0, -1, room);
    return sum;
};

const myFunc = (lines) => {
    var new_room = [];
    for (var i = 0; i < lines.length; i++) {
        new_room.push(Array.from(lines[i]));
    }

    //    var new_room = JSON.parse(JSON.stringify(room));

    var count = 0;
    do {
        count++;
        var room = JSON.parse(JSON.stringify(new_room));
        for (var y = 0; y < room.length; y++) {
            for (var x = 0; x < room[0].length; x++) {
                const num = getOccupied(y, x, room);
                const seat = room[y][x];
                if (seat == "L" && num == 0) {
                    new_room[y][x] = "#";
                } else if (seat == "#" && num >= 5) {
                    new_room[y][x] = "L";
                }
            }
        }
        console.log(count);
    } while (JSON.stringify(room) != JSON.stringify(new_room));

    sum = 0;
    for (var y = 0; y < room.length; y++) {
        for (var x = 0; x < room[0].length; x++) {
            if (room[y][x] == "#") {
                sum++;
            }
        }
    }
    console.log(sum);
};

fs.readFile("in11.txt", "utf8", function (err, data) {
    if (err) throw err;

    lines = data.split(/[\n\r]{1,2}/);
    x = myFunc(lines);
    console.log("answer " + x);
});
