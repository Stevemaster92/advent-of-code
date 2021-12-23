const helpers = require("../helpers");

const lines = helpers.readLines();

// Determine folds and size of matrix.
const folds = [];
let maxX, maxY;
let parseFolds = false;
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
let mat = Array(maxY)
    .fill()
    .map(() => Array(maxX).fill(0));

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === "") break;

    const [x, y] = line.split(",");
    mat[+y][+x] = 1;
}

// Problem 1
// Fold the paper once and count dots.
// const folded = fold(mat, folds[0]);
// console.log(folded.flat().reduce((pre, cur) => (cur === 1 ? pre + 1 : pre)));

// Problem 2
// Fold the paper accordingly and print matrix.
const folded = folds.reduce(fold, mat);
helpers.printMatrix(folded);

// Helper functions
function fold(mat, fold) {
    const m = mat.length;
    const n = mat[0].length;

    if (fold.axis === "x") {
        // Reverse columns.
        const rev = mat.map((row) => row.slice().reverse());
        foldMatrix(mat, rev, m, fold.value);

        // Cut off matrix along the x-fold.
        return mat.map((row) => row.slice(0, fold.value));
    } else {
        // Reverse rows.
        const rev = mat.slice(fold.value + 1, m).reverse();
        foldMatrix(mat, rev, fold.value, n);

        // Cut off matrix along the y-fold.
        return mat.slice(0, fold.value);
    }
}

/**
 * Folds matrix b over matrix a.
 * @param {any[][]} a Matrix to fold over.
 * @param {any[][]} b Matrix which is fold over.
 * @param {number} m Number of rows.
 * @param {number} n Number of columns.
 */
function foldMatrix(a, b, m, n) {
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (a[i][j] === 1 || b[i][j] === 1) {
                a[i][j] = 1;
            }
        }
    }
}
