var selectedNumber = null;
var selectedSpace = null;
var placeSpace = false;
var deleteSpace = false;
var generatedBoard = null;
var clone = [];
var solvedBoard = null;

// var lives = 0;


// Set up number divs (bottom row)
// Ex. <div id="1" class="number"></div>
//     <div id="2" class="number"></div>




// BOARDS FOR TESTING

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











  // SUDOKU SOLVER

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
  if (board == null) {
    return null;
  }

  // if board is solvable, return it, otherwise return null
  if (solve(board)){
      return solve(board);
  } else {
      return null;
  }
}













// CHECKER - Checks if the board is solved

function checkIfSolved() {

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {

      // If board does not match solution, return false
      if (document.getElementById(r.toString() + "-" + c.toString()).innerText != solvedBoard[r][c]) {
        return false;
      }
    }
  }

  return true;
}












// APP SETUP FUNCTIONS

window.onload = function() {
  setNumbers();
  setBoard(sudoku1);
  setDelete();
  setReset();
}

// Sets the panel for choosing numbers
function setNumbers() {
  for (let num = 1; num < 10; num++) {
    var number = document.createElement("div");
    number.id = num;
    number.innerText = num;
    number.classList.add("number");
    number.addEventListener("click", selectNumber);
    document.getElementById("numbers").appendChild(number);
  }
}

// Sets the sodoku board
// Spaces have ID: row-col ex. 3-4 for row 3, column 4.
// Rows and columns are from 0-8.
function setBoard(board) {

  generatedBoard = board;

  // clone board into global variable "clone"
  generatedBoard.map(function(arr) {
    clone.push(arr.slice());
  });

  solvedBoard = solveSudoku(clone);

  for(let r = 0; r < 9; r++) {
    for(let c = 0; c < 9; c++) {
      var space = document.createElement("div");
      space.id = r.toString() + "-" + c.toString();
      space.classList.add("space");

      if (r == 2 || r == 5) {
        space.classList.add("horizontalGap");
      }

      if (c == 2 || c == 5) {
        space.classList.add("verticalGap");
      }

      // Leaves space blank unless there is a value.
      if (board[r][c] != ".") {
        space.innerText = board[r][c];
        space.classList.add("defaultSpace");
      }

      space.addEventListener("click", selectSpace);
      document.getElementById("board").appendChild(space);
    }
  }
}

// Sets the delete button
function setDelete() {
  var delete_button = document.createElement("div");
  delete_button.id = "delete_button";
  delete_button.innerText = "Delete";
  delete_button.classList.add("delete_button");
  delete_button.addEventListener("click", selectDelete);
  document.getElementById("delete_container").appendChild(delete_button);
}

// Sets the reset board button
function setReset() {
  var reset_button = document.createElement("div");
  reset_button.id = "reset_button";
  reset_button.innerText = "Reset";
  reset_button.classList.add("reset_button");
  reset_button.addEventListener("mousedown", resetBoard);
  reset_button.addEventListener("mouseup", release);
  document.getElementById("menu").appendChild(reset_button);
}








// SPACE PLACEMENT AND DELETION FUNCTIONALITY

// Allows user to select numbers in the bottom bar
function selectNumber() {
  
  if (deleteSpace == true) {
    document.getElementById("delete_button").classList.remove("deleteSelected");
    deleteSpace = false;
    if (selectedSpace) {
      selectedSpace.classList.remove("selectedSpace");
      selectedSpace.classList.remove("placedSpace");
      selectedSpace = null;
    }
  }

  if (!selectedNumber) {
    selectedNumber = this;
    selectedNumber.classList.add("selectedNumber");
    placeSpace = true;
  } else if (selectedNumber == this) {
    selectedNumber.classList.remove("selectedNumber");
    selectedNumber = null;
    placeSpace = false;
  } else {
    selectedNumber.classList.remove("selectedNumber");
    selectedNumber = this;
    selectedNumber.classList.add("selectedNumber");
    placeSpace = true;
  }
}

// Allows user to select the delete button
function selectDelete() {

  if (selectedSpace != "" && selectedSpace != null) {
    selectedSpace.classList.remove("selectedSpace");
    selectedSpace.classList.add("placedSpace");
    selectedSpace = null;
  }

  if (selectedNumber) {
    selectedNumber.classList.remove("selectedNumber");
    placeSpace = false;
    selectedNumber = null;
  }

  if (deleteSpace) {
    this.classList.remove("deleteSelected");
    deleteSpace = false;
  } else {
    this.classList.add("deleteSelected");
    deleteSpace = true;
  }
}

// Determines what happens when a space is selected
function selectSpace() {
  if (placeSpace) {
    fillSpace(this);
  } else if (deleteSpace) {
    deleteSelectedSpace(this);
  } else {
    selectedSpace.classList.remove("selectedSpace");
    selectedSpace = null;
  }
}

// Fills the space with the selected number
function fillSpace(space) {

  if (space.classList.contains("defaultSpace")) {
    selectedSpace.classList.remove("selectedSpace");
    selectedSpace.classList.add("placedSpace");
    selectedSpace = null;
    return;
  }

  if (space.innerText != "") {
    selectedSpace.classList.remove("selectedSpace");
    selectedSpace.classList.add("placedSpace");
    selectedSpace = null;
    return;
  }

  if (!selectedSpace) {                  // if there is no selected space
    selectedSpace = space;
    selectedSpace.classList.add("selectedSpace");
    selectedSpace.innerText = selectedNumber.innerText;
  } else {                               // if we select a new space when there is a selected space
    selectedSpace.classList.remove("selectedSpace");
    selectedSpace.classList.add("placedSpace");
    selectedSpace = null;
    selectedSpace = space;
    selectedSpace.classList.add("selectedSpace");
    selectedSpace.innerText = selectedNumber.innerText;
  }

  if (checkIfSolved()) {
    setTimeout(function() { alert("Board is solved!"); }, 300);
  }
}

// Deletes the selected space
function deleteSelectedSpace(space) {

  if (space.classList.contains("defaultSpace") || space.innerText == "") {
    selectedSpace.classList.remove("selectedSpace");
    selectedSpace.classList.remove("placedSpace");
    selectedSpace = null;
    return;
  }

  if (selectedSpace) {
    selectedSpace.classList.remove("selectedSpace");
  }

  selectedSpace = space;
  selectedSpace.classList.add("selectedSpace");
  selectedSpace.classList.remove("placedSpace");
  selectedSpace.innerText = "";
}












// MENU BUTTONS FUNCTIONALITY

// Resets all the spaces on the board and adds highlight to button
function resetBoard() {
  this.classList.add("resetSelected");

  if (selectedNumber) {
    selectedNumber.classList.remove("selectedNumber");
    selectedNumber = null;
    placeSpace = false;
  }

  if (deleteSpace) {
    document.getElementById("delete_button").classList.remove("deleteSelected");
    deleteSpace = false;
  }

  if (selectedSpace) {
    selectedSpace.classList.remove("selectedSpace");
    selectedSpace.classList.remove("placedSpace");
    selectedSpace = null;
    placeSpace = false;
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {

      let space = document.getElementById(r.toString() + "-" + c.toString())

      if (space.innerText != "" && !space.classList.contains("defaultSpace")) {
        space.innerText = "";
        space.classList.remove("selectedSpace");
        space.classList.remove("placedSpace");
      }
    }
  }

}

// When reset button is release, remove highlist
function release() {
  this.classList.remove("resetSelected");
}








// TESTING SOLVER

// document.write('<p>' + test[i] + '<p>');

// for (let i = 0; i < 9; i++){
//   document.write('<p>' + test[i] + '<p>');
// }
