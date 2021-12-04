const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

let gamma = "",
    epsilon = "";
const rowLength = lines[0].length - 1; // without \n or \r

// Problem 1
// for (let i = 0; i < rowLength; i++) {
//     let ones = 0,
//         zeros = 0;
//     for (let j = 0; j < lines.length; j++) {
//         lines[j][i] === "0" ? zeros++ : ones++;
//     }

//     if (zeros > ones) {
//         gamma += "0";
//         epsilon += "1";
//     } else {
//         gamma += "1";
//         epsilon += "0";
//     }
// }

// console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

// Problem 2
function extract(isOxygen = true) {
    let arr = Array.from(lines);

    for (let i = 0; i < rowLength; i++) {
        let ones = [],
            zeros = [];
        for (let j = 0; j < arr.length; j++) {
            arr[j][i] === "0" ? zeros.push(arr[j]) : ones.push(arr[j]);
        }

        if (zeros.length <= ones.length) {
            arr = isOxygen ? ones : zeros;
        } else {
            arr = isOxygen ? zeros : ones;
        }

        if (arr.length === 1) break;
    }

    return arr[0];
}

let oxygen = extract();
let co2 = extract(false);

console.log(parseInt(oxygen, 2) * parseInt(co2, 2));
