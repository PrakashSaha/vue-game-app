<template>
    <div class="game-container">
      <h1>Tic-Tac-Toe</h1>
  
      <!-- Display current player -->
      <div v-if="!gameStore.gameOver" class="status">
        <p>Current Player: {{ gameStore.currentPlayer }}</p>
      </div>
  
      <!-- Display winner or draw -->
      <div v-if="gameStore.gameOver" class="status">
        <p v-if="gameStore.winner === 'Draw'">It's a Draw!</p>
        <p v-else>{{ gameStore.winner }} Wins!</p>
      </div>
  
      <!-- Game Board -->
      <div class="board">
        <div
          v-for="(cell, index) in gameStore.board"
          :key="index"
          class="cell"
          :class="{ 'filled': cell }"
          @click="makeMove(index)"
        >
          {{ cell }}
        </div>
      </div>
  
      <!-- Reset Button -->
      <button v-if="gameStore.gameOver" @click="resetGame">Play Again</button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useTicTacToeStore } from '../../stores/TicTacToe';
  
  const gameStore = useTicTacToeStore();
  
  // Computed properties to access store values
  const isGameOver = computed(() => gameStore.gameOver);
  const currentPlayer = computed(() => gameStore.currentPlayer);
  
  // Methods to interact with the store
  function makeMove(index) {
    gameStore.makeMove(index);
  }
  
  function resetGame() {
    gameStore.resetGame();
  }
  </script>
  
  <style scoped>
  .game-container {
    text-align: center;
    margin-top: 50px;
  }
  
  .status {
    font-size: 24px;
    margin: 20px;
  }
  
  .board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }
  
  .cell {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    cursor: pointer;
    border: 2px solid #333;
    background-color: #f0f0f0;
  }
  
  .cell.filled {
    background-color: #e0e0e0;
    pointer-events: none;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  