const helpers = require("../helpers");

const crabs = helpers
    .read()
    .split(",")
    .map((f) => +f);

const dist = {};
let minDist = Number.MAX_VALUE;

// Calculate distances between each pair of crabs.
for (let i = 0; i < crabs.length; i++) {
    const current = crabs[i];

    // Avoid calculating distance twice.
    if (dist[current]) continue;

    dist[current] = 0;
    for (let j = 0; j < crabs.length; j++) {
        // Problem 1
        // dist[current] += Math.abs(current - crabs[j]);
        // Problem 2
        const abs = Math.abs(current - crabs[j]);
        dist[current] += ((abs + 1) * abs) / 2;
    }

    minDist = Math.min(minDist, dist[current]);
}

console.log(minDist);
