const fs = require("fs");

function readLines(path = "./input.txt") {
    const input = fs.readFileSync(path, "utf-8");

    return input.split("\n");
}

module.exports = { readLines };
