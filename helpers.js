const fs = require("fs");

function read(path = "./input.txt") {
    return fs.readFileSync(path, "utf-8");
}

function readLines(path = "./input.txt") {
    return read(path).split("\n");
}

module.exports = { read, readLines };
