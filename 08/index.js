const helpers = require("../helpers");

const lines = helpers.readLines();

// Problem 1
let countUniques = 0;
lines.forEach((line) => {
    const [, output] = line.split(" | ");
    countUniques += output
        .split(" ")
        .reduce(
            (pre, cur) => (cur.length === 2 || cur.length === 3 || cur.length === 4 || cur.length === 7 ? ++pre : pre),
            0,
        );
});

console.log(countUniques);
