const helpers = require("../helpers");

const lines = helpers.readLines();

// Create heatmap.
const heatmap = [];
lines.forEach((line) => {
    heatmap.push(line.split("").map((p) => +p));
});

const lowPoints = findLowPoints();

// Problem 1
// Sum the risk levels (= low point value + 1).
// console.log(lowPoints.reduce((pre, cur) => pre + cur.val + 1, 0));

// Problem 2
// Create basin for each low point.
let basins = new Array(lowPoints.length);
lowPoints.forEach((point, i) => {
    basins[i] = [];
    createBasin(point.i, point.j, basins[i]);
});

// Sort basins by size in descending order.
basins = basins.sort((a, b) => b.length - a.length);

// Multiply sizes of the three largest basins.
console.log(basins[0].length * basins[1].length * basins[2].length);

// Helper functions
function findLowPoints() {
    const lowPoints = [];
    for (let i = 0; i < heatmap.length; i++) {
        const row = heatmap[i];

        for (let j = 0; j < row.length; j++) {
            const point = row[j];

            // Up
            if (i > 0 && heatmap[i - 1][j] <= point) continue;
            // Down
            if (i < heatmap.length - 1 && heatmap[i + 1][j] <= point) continue;
            // Left
            if (j > 0 && heatmap[i][j - 1] <= point) continue;
            // Right
            if (j < row.length - 1 && heatmap[i][j + 1] <= point) continue;

            lowPoints.push({ i, j, val: point });
        }
    }

    return lowPoints;
}

function createBasin(i, j, basin) {
    const point = heatmap[i][j];

    // Up
    if (i > 0 && heatmap[i - 1][j] !== 9 && heatmap[i - 1][j] > point) {
        createBasin(i - 1, j, basin);
    }
    // Down
    if (i < heatmap.length - 1 && heatmap[i + 1][j] !== 9 && heatmap[i + 1][j] > point) {
        createBasin(i + 1, j, basin);
    }
    // Left
    if (j > 0 && heatmap[i][j - 1] !== 9 && heatmap[i][j - 1] > point) {
        createBasin(i, j - 1, basin);
    }
    // Right
    if (j < heatmap[i].length - 1 && heatmap[i][j + 1] !== 9 && heatmap[i][j + 1] > point) {
        createBasin(i, j + 1, basin);
    }

    // Avoid duplicates.
    if (!basin.find((p) => p.i == i && p.j == j)) {
        basin.push({ i, j, val: point });
    }
}
