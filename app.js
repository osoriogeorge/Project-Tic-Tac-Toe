class Player {
  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
  }
}

class GameBoard {
  constructor() {
    this.board = ["", "", "", "", "", "", "", "", ""];
  }

  markSquare(index, mark) {
    this.board[index] = mark;
  }

  isSquareEmpty(index) {
    return this.board[index] === "";
  }

  getWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return this.board[a];
      }
    }
    return null;
  }

  isFull() {
    return this.board.every((square) => square !== "");
  }

  reset() {
    this.board = ["", "", "", "", "", "", "", "", ""];
  }
}

class Game {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.currentPlayer = null;
    this.gameBoard = new GameBoard();
    this.gameActive = false;
    this.squares = null;
    this.displayWinner = document.querySelector(".display-winner");
  }

  start() {
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;

    if (!player1Name || !player2Name) {
      alert("Please enter names for both players.");
      return;
    }

    this.player1 = new Player(player1Name, "X");
    this.player2 = new Player(player2Name, "O");
    this.currentPlayer = this.player1;
    this.gameBoard.reset();
    this.gameActive = true;
    this.displayWinner.textContent = "";
    this.createBoard();
  }

  createBoard() {
    const gameBoardDiv = document.querySelector(".game-board");
    gameBoardDiv.innerHTML = "";

    this.squares = [];

    for (let i = 0; i < 9; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.index = i;
      square.addEventListener("click", () => this.handleSquareClick(i));
      gameBoardDiv.appendChild(square);
      this.squares.push(square);
    }
  }

  handleSquareClick(index) {
    if (this.gameBoard.isSquareEmpty(index) && this.gameActive) {
      this.gameBoard.markSquare(index, this.currentPlayer.mark);
      this.squares[index].textContent = this.currentPlayer.mark;

      const winner = this.gameBoard.getWinner();
      if (winner) {
        this.displayWinner.textContent = `${this.currentPlayer.name} wins!`;
        this.gameActive = false;
      } else if (this.gameBoard.isFull()) {
        this.displayWinner.textContent = "It's a tie!";
        this.gameActive = false;
      } else {
        this.currentPlayer =
          this.currentPlayer === this.player1 ? this.player2 : this.player1;
      }
    }
  }

  reset() {
    this.gameBoard.reset();
    this.currentPlayer = this.player1;
    this.gameActive = true;
    this.displayWinner.textContent = "";
    if (this.squares) {
      // Check if squares exist before looping
      this.squares.forEach((square) => (square.textContent = ""));
    }
  }
}

const game = new Game();

const startBtn = document.querySelector(".start-game-btn");
const resetBtn = document.querySelector(".reset-game-btn");

startBtn.addEventListener("click", () => game.start());
resetBtn.addEventListener("click", () => game.reset());
