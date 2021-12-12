const helpers = require("../helpers");

const lines = helpers.readLines("./test.txt");

const adjEdges = {};
lines.forEach((edge) => {
    const [v1, v2] = edge.split("-");

    // Undirected graph.
    adjEdges[v1] = adjEdges[v1] || [];
    adjEdges[v1].push(v2);
    adjEdges[v2] = adjEdges[v2] || [];
    adjEdges[v2].push(v1);
});

// Problem 1
let numberOfPaths = 0;
dfs("start", "end", {}, []);

console.log(numberOfPaths);

// Helper functions
function dfs(current, dest, visited, path) {
    if (current === dest) {
        numberOfPaths++;
        // console.log(path);
        return;
    }

    // Mark only small caves including 'start' and 'end' as visited.
    if (current.match(/[a-z]+/g)) {
        visited[current] = true;
    }

    // Iterate over all direct edges
    for (let i = 0; i < adjEdges[current].length; i++) {
        const next = adjEdges[current][i];

        if (!visited[next]) {
            path.push(next);
            dfs(next, dest, visited, path);
            path.splice(path.indexOf(next), 1);
        }
    }

    // Unmark cave.
    visited[current] = false;
}
