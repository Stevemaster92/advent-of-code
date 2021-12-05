const helpers = require("../helpers");

const lines = helpers.readLines();
const vents = createVents();
const diagram = {};

// Problem 1
// vents.forEach((vent) => {
//     if (isVertical(vent)) {
//         // Vertical lines.
//         const min = Math.min(vent.y1, vent.y2);
//         const max = Math.max(vent.y1, vent.y2);

//         for (let i = min; i <= max; i++) {
//             markDiagram(vent.x1, i);
//         }
//     } else if (isHorizontal(vent)) {
//         // Horizontal lines.
//         const min = Math.min(vent.x1, vent.x2);
//         const max = Math.max(vent.x1, vent.x2);

//         for (let i = min; i <= max; i++) {
//             markDiagram(i, vent.y1);
//         }
//     }
// });

// Problem 2
vents.forEach((vent) => {
    if (isVertical(vent)) {
        // Vertical lines.
        const min = Math.min(vent.y1, vent.y2);
        const max = Math.max(vent.y1, vent.y2);

        for (let i = min; i <= max; i++) {
            markDiagram(vent.x1, i);
        }
    } else if (isHorizontal(vent)) {
        // Horizontal lines.
        const min = Math.min(vent.x1, vent.x2);
        const max = Math.max(vent.x1, vent.x2);

        for (let i = min; i <= max; i++) {
            markDiagram(i, vent.y1);
        }
    } else {
        // Diagonal lines.
        const step = {
            x: vent.x1 < vent.x2 ? 1 : -1,
            y: vent.y1 < vent.y2 ? 1 : -1,
        };

        for (let x = vent.x1, y = vent.y1; x != vent.x2 + step.x && y != vent.y2 + step.y; x += step.x, y += step.y) {
            markDiagram(x, y);
        }
    }
});

console.log(getNumberOfDangerousAreas());

// Helper functions
function createVents() {
    const vents = [];

    lines.forEach((line) => {
        const segments = line.split(" -> ");
        const start = segments[0].split(",");
        const end = segments[1].split(",");

        vents.push({
            x1: +start[0],
            y1: +start[1],
            x2: +end[0],
            y2: +end[1],
        });
    });

    return vents;
}

function isVertical(vent) {
    return vent.x1 === vent.x2;
}

function isHorizontal(vent) {
    return vent.y1 === vent.y2;
}

function markDiagram(x, y) {
    if (!diagram[`${x},${y}`]) diagram[`${x},${y}`] = 1;
    else diagram[`${x},${y}`] += 1;
}

function getNumberOfDangerousAreas() {
    return Object.keys(diagram).reduce((pre, key) => (diagram[key] >= 2 ? ++pre : pre), 0);
}
