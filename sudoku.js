var selectedNum = null;
var selectedTile = null;

var lives = 0;







// SUDOKU SOLVER

function solveSudoku(board){

    const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8"];

    // Returns coords of next empty space, if none available, return False
    function findEmptySpace(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] == ".") {
                    return (row, col);
                }
            }
        }
        return null;
    }

    function verifySpace(board, row, col, digit){

        // Check Row
        board[row].forEach(function(element){
            if (element == digit) {
                return False
            }
        });

        // Check Column
        for (let r = 0; r < 9; r++) {
            if (board[r][col] == digit){
                return False
            }
        }

        // Check Box
        var startRow = row - (row % 3);
        var startCol = col - (col % 3);

        for (let r = startRow; r < (startRow + 3); r++){
            for (let c = startCol; r < (startCol + 3); r++) {
                if (board[r][c] == digit){
                    return False
                }
            }
        }

        // Space is valid
        return True
    }

    function solve(board){
        
        // if board is solved, return it
        if (!findEmptySpace(board)){
            return board;
        }

        var space = findEmptySpace(board);
        var row = space[0];
        var col = space[1];

        DIGITS.forEach(function(digit){
            if (verifySpace(board, row, col, digit)){
                board[row][col] = digit;

                if (solve(board)){
                    return True;
                }

                board[row][col] = ".";
            }
        });

        // board is unsolvable
        return null;
    }

    // if board is solvable, return it, otherwise return null
    if (solve(board)){
        return solve(board);
    } else {
        return null;
    }


}

