const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");
const measurements = input.split("\n").map((m) => +m);

let increases = 0;

// Problem 1
// for (let i = 1; i < measurements.length; i++) {
//     if (measurements[i] > measurements[i - 1]) {
//         increases++;
//     }
// }

// Problem 2
for (let i = 0; i < measurements.length - 3; i++) {
    const windowA = measurements[i] + measurements[i + 1] + measurements[i + 2];
    const windowB = measurements[i + 1] + measurements[i + 2] + measurements[i + 3];

    if (windowB > windowA) {
        increases++;
    }
}

console.log(increases);
