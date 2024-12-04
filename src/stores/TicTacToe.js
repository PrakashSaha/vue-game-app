import { defineStore } from 'pinia';

export const useTicTacToeStore = defineStore('ticTacToe', {
  state: () => ({
    board: Array(9).fill(null), // 3x3 board
    currentPlayer: 'X', // Player 1 starts with X
    winner: null, // To store the winner ('X' or 'O')
    gameOver: false, // Whether the game is over or not
  }),

  actions: {
    makeMove(index) {
      // If the cell is already filled or the game is over, return
      if (this.board[index] || this.gameOver) return;

      // Set the current player's move
      this.board[index] = this.currentPlayer;

      // Check for a winner
      this.checkWinner();

      // Change the current player
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },

    checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6], // Diagonal
      ];

      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          this.winner = this.board[a];
          this.gameOver = true;
          return;
        }
      }

      // Check for a draw (if all cells are filled)
      if (!this.board.includes(null)) {
        this.gameOver = true;
        this.winner = 'Draw';
      }
    },

    resetGame() {
      // Reset the board and game state
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.winner = null;
      this.gameOver = false;
    }
  }
});
