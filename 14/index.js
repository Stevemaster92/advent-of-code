const helpers = require("../helpers");

const lines = helpers.readLines();

let template = lines[0];
const rules = {};
for (let i = 2; i < lines.length; i++) {
    const [left, right] = lines[i].split(" -> ");
    rules[left] = right;
}

for (let step = 0; step < 10; step++) {
    const str = template;
    let next = "";

    for (let i = 0; i < str.length; i++) {
        const pair = str[i] + str[i + 1];

        if (rules[pair]) {
            next += str[i] + rules[pair];
        }
    }

    template = next + template[template.length - 1];
}

const counts = {};
for (let i = 0; i < template.length; i++) {
    counts[template[i]] = counts[template[i]] + 1 || 1;
}

const values = Object.values(counts);

console.log(Math.max(...values) - Math.min(...values));
