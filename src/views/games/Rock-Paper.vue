<template>
  <div class="game-container">
    <h1>Rock, Paper, Scissors - Best of 3</h1>

    <!-- Player's choice buttons -->
    <div class="choices">
      <button @click="makeChoice('rock')" :disabled="isGameOver">Rock</button>
      <button @click="makeChoice('paper')" :disabled="isGameOver">Paper</button>
      <button @click="makeChoice('scissors')" :disabled="isGameOver">Scissors</button>
    </div>

    <!-- Display player's choice -->
    <div v-if="gameStore.playerChoice" class="choice-display">
      <p>Your choice: {{ gameStore.playerChoice }}</p>
    </div>

    <!-- Display computer's choice -->
    <div v-if="gameStore.computerChoice" class="choice-display">
      <p>Computer's choice: {{ gameStore.computerChoice }}</p>
    </div>

    <!-- Display result -->
    <div v-if="gameStore.result" class="result">
      <p>{{ gameStore.result }}</p>
    </div>

    <!-- Display scores -->
    <div v-if="gameStore.rounds > 0" class="score">
      <p>Player Wins: {{ gameStore.playerWins }}</p>
      <p>Computer Wins: {{ gameStore.computerWins }}</p>
      <p>Draws: {{ draws }}</p>
      <p>Rounds Played: {{ gameStore.rounds }} / 3</p>
    </div>

    <!-- Reset button -->
    <button v-if="isGameOver" @click="resetGame()">Play Again</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '../../stores/RockPaperScissors';

const gameStore = useGameStore();

// Access store properties and methods
const { makeChoice, resetGame } = gameStore;

// Computed properties
const isGameOver = computed(() => {
  return (
    gameStore.rounds >= gameStore.maxRounds ||
    gameStore.playerWins === 2 ||
    gameStore.computerWins === 2 ||
    draws.value === 2 // Use `draws.value` to access the computed property
  );
});


// Compute draws (total rounds - player wins - computer wins)
const draws = computed(() => gameStore.rounds - gameStore.playerWins - gameStore.computerWins);

// // Handle reset button click
// function handleReset() {
//   resetGame(); // Calls the store's reset function
// }
</script>


  
  <style scoped>
  .game-container {
    text-align: center;
    margin-top: 50px;
  }
  
  .choices button {
    padding: 15px 25px;
    margin: 10px;
    font-size: 18px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #4CAF50;
    color: white;
  }
  
  .choices button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .choices button:hover {
    background-color: #45a049;
  }
  
  .choice-display {
    margin-top: 20px;
    font-size: 18px;
  }
  
  .result {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
    color: green;
  }
  
  .score {
    margin-top: 20px;
    font-size: 18px;
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
  