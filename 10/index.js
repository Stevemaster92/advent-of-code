const helpers = require("../helpers");

const lines = helpers.readLines();

const lookupTableSyntax = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
const lookupTableAutocomplete = { ")": 1, "]": 2, "}": 3, ">": 4 };
let sum = 0;
const sums = [];

lines.forEach((line) => {
    // Problem 1
    // const invalid = checkSyntax(line.split(""));
    // if (invalid) {
    //     sum += lookupTableSyntax[invalid];
    // }

    // Problem 2
    const incomplete = checkSyntax(line.split(""), true);
    if (Array.isArray(incomplete)) {
        sums.push(incomplete.reduce((pre, cur) => 5 * pre + lookupTableAutocomplete[cur], 0));
    }
});

// Problem 1
// console.log(sum);

// Problem 2
console.log(sums.sort((a, b) => a - b)[Math.floor(sums.length / 2)]);

// Helper functions
function checkSyntax(chars, autocomplete = false) {
    const stack = [];

    // Problem 1
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        if (char === "(" || char === "[" || char === "{" || char === "<") {
            stack.push(char);
        } else {
            const last = stack.pop();

            if (
                !last ||
                (char === ")" && last !== "(") ||
                (char === "]" && last !== "[") ||
                (char === "}" && last !== "{") ||
                (char === ">" && last !== "<")
            ) {
                // Wrong closing character.
                return char;
            }
        }
    }

    // Problem 2
    if (autocomplete) {
        let autocompleted = [];
        while (stack.length > 0) {
            const last = stack.pop();

            if (last === "(") autocompleted.push(")");
            else if (last === "[") autocompleted.push("]");
            else if (last === "{") autocompleted.push("}");
            else autocompleted.push(">");
        }

        return autocompleted;
    }
}
