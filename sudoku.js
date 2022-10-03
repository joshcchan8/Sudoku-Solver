// var selectedNum = null;
// var selectedTile = null;

// var lives = 0;


// Set up number divs (bottom row)
// Ex. <div id="1" class="number"></div>
//     <div id="2" class="number"></div>

window.onload = function() {
  setNumbers();
}

function setNumbers() {
  for (let num = 1; num < 10; num++) {
    var number = document.create("div");
    number.id = num;
    number.classList.add("number");
    number.innerHTML = num;
    document.getElementById("numbers").appendChild(number);
  }
}



























// Boards and Answers for Testing

var sudoku1 = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]];

var sudoku1Answer = [
    ["5","3","4","6","7","8","9","1","2"],
    ["6","7","2","1","9","5","3","4","8"],
    ["1","9","8","3","4","2","5","6","7"],
    ["8","5","9","7","6","1","4","2","3"],
    ["4","2","6","8","5","3","7","9","1"],
    ["7","1","3","9","2","4","8","5","6"],
    ["9","6","1","5","3","7","2","8","4"],
    ["2","8","7","4","1","9","6","3","5"],
    ["3","4","5","2","8","6","1","7","9"]];


// SUDOKU SOLVER FUNCTIONS

// Returns coords of next empty space, if none available, return False
function findEmptySpace(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == ".") {
        return [row, col];
      }
    }
  }
  return null;
};

// Verifies that sapce is valid for enterring current digit
function verifySpace(board, row, col, digit){

  // Check Row
  for (let space = 0; space < 9; space++){
    if (board[row][space] == digit){
      return false
    }
  };

  board[row].forEach(function(element){
    if (element == digit) {
      return false
    }
  });

  // Check Column
  for (let r = 0; r < 9; r++){
    if (board[r][col] == digit){
      return false
    }
  }

  // Check Box
  var startRow = row - (row % 3);
  var startCol = col - (col % 3);

  for (let r = startRow; r < (startRow + 3); r++){
    for (let c = startCol; c < (startCol + 3); c++) {
      if (board[r][c] == digit){
        return false
      }
    }
  }

  // Space is valid
  return true
};

// Solves the given
function solve(board){
        
  // if board is solved, return it
  if (findEmptySpace(board) == null){
    return board;
  }

  var space = findEmptySpace(board);
  var row = space[0];
  var col = space[1];

  const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (let i = 0; i < 9; i++){
    if (verifySpace(board, row, col, DIGITS[i])){
      board[row][col] = DIGITS[i];

      if (solve(board)){
        return true;
      }

      board[row][col] = ".";
    }
  }

  // board is unsolvable
  return null;
}

function solveSudoku(board){

    // if board is solvable, return it, otherwise return null
    if (solve(board)){
        return solve(board);
    } else {
        return null;
    }
}

function changeBoardToObject(board) {
    return board;
}


// TESTING SOLVER

// Verifies sudoku matches answer
function verifySudokuAnswer(sudoku, answer) {
    return solveSudoku(sudoku) === changeBoardToObject(answer);
}

// Array containing result (solved board)
var test = solveSudoku(sudoku1);

// document.write('<p>' + test[i] + '<p>');

// for (let i = 0; i < 9; i++){
//   document.write('<p>' + test[i] + '<p>');
// }
