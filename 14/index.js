const helpers = require("../helpers");

const lines = helpers.readLines();

let template = lines[0];
const rules = {};
for (let i = 2; i < lines.length; i++) {
    const [left, right] = lines[i].split(" -> ");
    rules[left] = right;
}

const arr = template.split("");
for (let step = 0; step < 15; step++) {
    for (let i = 0; i < arr.length; i++) {
        const pair = arr[i] + arr[i + 1];

        if (rules[pair]) {
            arr.splice(i, 2, arr[i], rules[pair], arr[i + 1]);
            i++;
        }
    }
}

const counts = Object.values(
    arr.reduce((pre, cur) => {
        pre[cur] = pre[cur] + 1 || 1;

        return pre;
    }, {}),
);

console.log(Math.max(...counts) - Math.min(...counts));
