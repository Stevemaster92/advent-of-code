const helpers = require("../helpers");

const lines = helpers.readLines();

// Create array of octopuses.
const octos = [];
lines.forEach((line) => {
    octos.push(line.split("").map((octo) => +octo));
});

let flashes = 0;

// Problem 1
// for (let step = 0; step < 100; step++) {
//     checkOctos();
// }

// console.log(flashes);

// Problem 2
let step = 0;
while (!allFlashed()) {
    checkOctos();
    step++;
}

console.log(step);

// Helper functions
function checkOctos() {
    // Increase each energy level by 1.
    for (let i = 0; i < octos.length; i++) {
        for (let j = 0; j < octos.length; j++) {
            octos[i][j]++;
        }
    }

    // Flash octopuses with energy level > 9.
    for (let i = 0; i < octos.length; i++) {
        for (let j = 0; j < octos.length; j++) {
            if (octos[i][j] > 9) {
                flashArea(i, j);
            }
        }
    }
}

function flashArea(i, j) {
    octos[i][j] = 0;
    flashes++;

    if (i > 0) {
        // Top
        flash(i - 1, j);
        // Top-left
        if (j > 0) flash(i - 1, j - 1);
        // Top-right
        if (j < octos.length - 1) flash(i - 1, j + 1);
    }
    if (i < octos.length - 1) {
        // Bottom
        flash(i + 1, j);
        // Bottom-left
        if (j > 0) flash(i + 1, j - 1);
        // Bottom-right
        if (j < octos.length - 1) flash(i + 1, j + 1);
    }
    // Left
    if (j > 0) flash(i, j - 1);
    // Right
    if (j < octos.length - 1) flash(i, j + 1);
}

function flash(i, j) {
    // Octopus has already flashed.
    if (octos[i][j] === 0) return;

    octos[i][j]++;

    // Flash adjacent octopuses.
    if (octos[i][j] > 9) flashArea(i, j);
}

function allFlashed() {
    for (let i = 0; i < octos.length; i++) {
        for (let j = 0; j < octos.length; j++) {
            if (octos[i][j] !== 0) return false;
        }
    }

    return true;
}

function printOctos() {
    octos.forEach((row) => console.log(row.join("")));
}
