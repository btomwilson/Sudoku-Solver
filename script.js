document.addEventListener('DOMContentLoaded', function () {
    const sudokuBoard = document.getElementById('sudoku-board');
    const solveBtn = document.getElementById('solve-btn');
    const clearBtn = document.getElementById('clear-btn');

    const EMPTY_CELL = 0;
    const sudokuSize = 9;
    let board = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    // Function to initialize the Sudoku board
    function initializeBoard() {
        sudokuBoard.innerHTML = '';
        for (let i = 0; i < sudokuSize; i++) {
            for (let j = 0; j < sudokuSize; j++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.value = board[i][j] === EMPTY_CELL ? '' : board[i][j];
                input.readOnly = board[i][j] !== EMPTY_CELL;
                sudokuBoard.appendChild(input);
            }
        }
    }

    // Function to solve the Sudoku puzzle using backtracking algorithm
    function solveSudoku() {
        const emptyCell = findEmptyCell();
        if (!emptyCell) {
            return true; // Puzzle solved
        }
        const [row, col] = emptyCell;
        for (let num = 1; num <= sudokuSize; num++) {
            if (isSafe(row, col, num)) {
                board[row][col] = num;
                if (solveSudoku()) {
                    return true;
                }
                board[row][col] = EMPTY_CELL; // Backtrack
            }
        }
        return false; // No solution found
    }

    // Function to find an empty cell in the Sudoku board
    function findEmptyCell() {
        for (let i = 0; i < sudokuSize; i++) {
            for (let j = 0; j < sudokuSize; j++) {
                if (board[i][j] === EMPTY_CELL) {
                    return [i, j];
                }
            }
        }
        return null; // No empty cell found
    }

    // Function to check if it's safe to place a number in a cell
    function isSafe(row, col, num) {
        return (
            isRowSafe(row, num) &&
            isColSafe(col, num) &&
            isBoxSafe(row - row % 3, col - col % 3, num)
        );
    }

    function isRowSafe(row, num) {
        for (let col = 0; col < sudokuSize; col++) {
            if (board[row][col] === num) {
                return false;
            }
        }
        return true;
    }

    function isColSafe(col, num) {
        for (let row = 0; row < sudokuSize; row++) {
            if (board[row][col] === num) {
                return false;
            }
        }
        return true;
    }

    function isBoxSafe(boxStartRow, boxStartCol, num) {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row + boxStartRow][col + boxStartCol] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    // Event listener for Solve button click
    solveBtn.addEventListener('click', function () {
        if (solveSudoku()) {
            initializeBoard();
        } else {
            alert('No solution exists for this Sudoku puzzle!');
        }
    });

    // Event listener for Clear button click
    clearBtn.addEventListener('click', function () {
        initializeBoard();
    });

    // Initialize the Sudoku board on page load
    initializeBoard();
});
