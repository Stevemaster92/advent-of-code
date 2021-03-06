const helpers = require("../helpers");

const commands = helpers.readLines();
let horizontalPosition = 0;
let depth = 0;

// Problem 1
// commands.forEach((cmd) => {
//     const [dir, units] = cmd.split(" ");

//     if (dir === "forward") {
//         horizontalPosition += Number(units);
//     } else if (dir === "down") {
//         depth += Number(units);
//     } else if (dir === "up") {
//         depth -= Number(units);
//     }
// });

// Problem 2
let aim = 0;

commands.forEach((cmd) => {
    const [dir, units] = cmd.split(" ");

    if (dir === "forward") {
        horizontalPosition += Number(units);
        depth += aim * units;
    } else if (dir === "down") {
        aim += Number(units);
    } else if (dir === "up") {
        aim -= Number(units);
    }
});

console.log(horizontalPosition * depth);
