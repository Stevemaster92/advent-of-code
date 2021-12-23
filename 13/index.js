const math = require("mathjs");
const helpers = require("../helpers");

const lines = helpers.readLines();

let parseFolds = false;
const folds = [];
let maxX, maxY;

// Determine folds and size of matrix.
for (let i = 0; i < lines.length || (!maxX && !maxY); i++) {
    const line = lines[i];

    if (line === "") {
        parseFolds = true;
    } else if (parseFolds) {
        const [axis, value] = line.substring("fold along ".length).split("=");

        if (axis === "x" && !maxX) maxX = +value * 2 + 1;
        else if (axis === "y" && !maxY) maxY = +value * 2 + 1;

        folds.push({ axis, value: +value });
    }
}

// Initialize matrix with dots (1 = dot).
let matrix = math.zeros(maxY, maxX);
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") break;

    const [x, y] = line.split(",");
    matrix.subset(math.index(+y, +x), 1);
}

// Problem 1
// Fold the paper once.
// const folded = fold(matrix, folds[0]);
// // Count dots (= value > 0).
// console.log(
//     math
//         .flatten(folded)
//         .toArray()
//         .reduce((pre, cur) => (cur > 0 ? pre + 1 : pre)),
// );

// Problem 2
// Fold the paper accordingly.
const folded = folds.reduce(fold, matrix);
// Pretty print matrix.
folded
    .map((value) => (value > 0 ? "#" : value))
    .toArray()
    .forEach((row) => console.log(row.join(" ")));

// Helper functions
function fold(mat, fold) {
    const [m, n] = math.size(mat);

    let a, b, c;
    if (fold.axis === "x") {
        a = math.subset(mat, math.index(math.range(0, m.value), math.range(0, fold.value)));
        b = math.subset(mat, math.index(math.range(0, m.value), math.range(fold.value + 1, n.value)));
        c = b.toArray().map((row) => row.reverse());
    } else {
        a = math.subset(mat, math.index(math.range(0, fold.value), math.range(0, n.value)));
        b = math.subset(mat, math.index(math.range(fold.value + 1, m.value), math.range(0, n.value)));
        c = b.toArray().reverse();
    }

    return math.add(a, math.matrix(c));
}
