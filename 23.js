"use strict";
const fs = require("fs");

const play = (me, you, game) => {};

var checks = 0;
class Node {
    constructor(val) {
        this.val = val;
        this.next = undefined;
    }

    sever() {
        const goThree = this.next.next.next;
        const ret = this.next;
        this.next = goThree.next;
        goThree.next = undefined;
        return ret;
    }

    insert(chain) {
        var last = chain;
        while (last.next) {
            last = last.next;
        }
        last.next = this.next;
        this.next = chain;
    }

    find(num) {
        const start = this;
        var cur = this;
        do {
            if (cur.val == num) {
                return cur;
            }
            cur = cur.next;
            checks++;
        } while (cur != this && cur);
        return undefined;
    }

    print() {
        const start = this;
        var cur = this;
        var s = "";
        do {
            s += cur.val;
            cur = cur.next;
        } while (cur != this);
        console.log(s);
    }
}

const maxTimes = 10000000;
const maxNum = 1000000;
var lookup = Array(maxNum + 1);

const myFunc = (lines) => {
    var i = 0;
    var head = undefined;
    var last = head;
    const str = "469217538";
    for (i = 1; i <= maxNum; i++) {
        var num = i;
        if (i <= str.length) {
            num = +str.charAt(i - 1);
        }
        var cur = new Node(num);
        lookup[num] = cur;
        if (last) {
            last.next = cur;
        } else {
            head = cur;
        }
        last = cur;
    }
    last.next = head;

    var cur = head;
    i = 0;
    while (i < maxTimes) {
        var num = cur.val;
        //        head.print();
        //        console.log(num);
        const pickedUp = cur.sever();
        do {
            num = ((num + maxNum - 2) % maxNum) + 1; // get one less
            var missing = pickedUp.find(num);
        } while (missing);

        var newone = lookup[num];
        newone.insert(pickedUp);
        cur = cur.next;
        i++;
        if (i % 100000 == 0) {
            console.log(i, checks);
        }
    }
    var one = cur.find(1);
    //   one.print();
    console.log(one);
    console.log(one.next);
    console.log(one.next.next);
    console.log(one.next.val * one.next.next.val);

    //    cur.print();
    console.log(i);
};

fs.readFile("src/in23.txt", "utf8", function (err, data) {
    if (err) throw err;

    const lines = data.split(/[\n\r]{1,2}/);
    const x = myFunc(lines);
});
