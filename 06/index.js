const helpers = require("../helpers");

const lanternfish = helpers
    .read()
    .split(",")
    .map((f) => +f);

// Problem 1
// const numberOfFish = populate(lanternfish, 80);

// Problem 2
const numberOfFish = populate(lanternfish, 256);

console.log(numberOfFish);

// Helper functions
function populate(arr, days) {
    let length = arr.length;

    for (let d = days; d > 0; d--) {
        const zeros = arr.reduce((pre, cur, i) => {
            if (cur === 0) {
                pre++;
                arr[i] = 6;
            } else {
                arr[i]--;
            }

            return pre;
        }, 0);

        if (zeros > 0) {
            const nextGen = Array(zeros).fill(9);
            length += populate(nextGen, d);
        }
    }

    return length;
}
