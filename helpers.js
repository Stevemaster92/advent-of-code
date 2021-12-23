const fs = require("fs");

function read(path = "./input.txt") {
    return fs.readFileSync(path, "utf-8");
}

function readLines(path = "./input.txt") {
    return read(path).split("\n");
}

function printArray(arr) {
    console.log(arr.join(" "));
}

function printMatrix(mat) {
    mat.forEach(printArray);
}

module.exports = { read, readLines, printArray, printMatrix };
