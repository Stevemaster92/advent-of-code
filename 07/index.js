const helpers = require("../helpers");

const crabs = helpers
    .read()
    .split(",")
    .map((f) => +f);

// Problem 1
// const dist = calcMinDistance((a, b) => Math.abs(a - b));

// Problem 2
const dist = calcMinDistance((a, b) => {
    const abs = Math.abs(a - b);

    return ((abs + 1) * abs) / 2;
});

console.log(dist);

// Helper functions
// Calculate distances between each pair of crabs.
function calcMinDistance(stepFun) {
    const dist = {};
    let min = Number.MAX_VALUE;

    for (let i = 0; i < crabs.length; i++) {
        const current = crabs[i];

        // Avoid calculating distance twice.
        if (dist[current]) continue;

        dist[current] = 0;
        for (let j = 0; j < crabs.length; j++) {
            dist[current] += stepFun(current, crabs[j]);
        }

        min = Math.min(min, dist[current]);
    }

    return min;
}
