const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");
const numbers = lines[0].split(",").map((n) => +n);

const boards = createBoards();

// Problem 1
// const winner = findWinner();

// Problem 2
const winner = findWinner(true);

console.log(getUnmarkedSum(winner.board) * winner.call);

// Helper functions
function createBoards() {
    const boards = [];
    let boardIndex = 0;

    for (let i = 2; i < lines.length; i++) {
        if (lines[i] === "\r") {
            boardIndex++;
            continue;
        }

        boards[boardIndex] = boards[boardIndex] || [];
        boards[boardIndex].push(
            lines[i]
                .trim()
                .replace(/(\s+)\1+/g, "$1") // Eliminate consecutive whitespaces
                .split(" ")
                .map((n) => +n),
        );
    }

    return boards;
}

function isBingo(board) {
    for (let i = 0; i < board.length; i++) {
        if (
            (board[i][0] == -1 && board[i][1] == -1 && board[i][2] == -1 && board[i][3] == -1 && board[i][4] == -1) ||
            (board[0][i] == -1 && board[1][i] == -1 && board[2][i] == -1 && board[3][i] == -1 && board[4][i] == -1)
        )
            return true;
    }

    return false;
}

function findWinner(lastToWin = false) {
    let winner;

    for (let n = 0; n < numbers.length; n++) {
        const num = numbers[n];

        for (let b = 0; b < boards.length; b++) {
            const board = boards[b];

            // For last winner, go to next board if the current one has already won.
            if (lastToWin && isBingo(board)) continue;

            markBoard(board, num);

            if (isBingo(board)) {
                if (lastToWin) {
                    // For last winner, update the last winning board.
                    winner = { board, call: num };
                } else {
                    // Otherwise, return the first winning board.
                    return { board, call: num };
                }
            }
        }
    }

    return winner;
}

function markBoard(board, num) {
    for (let i = 0; i < board.length; i++) {
        const row = board[i];

        for (let j = 0; j < row.length; j++) {
            if (num === row[j]) {
                row[j] = -1;
                return;
            }
        }
    }
}

function getUnmarkedSum(board) {
    let sum = 0;

    for (let i = 0; i < board.length; i++) {
        const row = board[i];

        for (let j = 0; j < row.length; j++) {
            if (row[j] !== -1) sum += row[j];
        }
    }

    return sum;
}
