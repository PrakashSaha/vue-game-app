<template>
  <div class="container">
    <h1>Memory Card Game</h1>
    <div class="board">
      <Card v-for="(card, index) in cardStore.cards" :key="card.id" :card="card" :index="index" />
    </div>
    <button @click="resetGame" class="reset-btn">Reset Game</button>

    <div v-if="cardStore.attempts > 0" class="attempts">
      <p>Attempts: {{ cardStore.attempts }}</p>
    </div>

    <div v-if="cardStore.isGameComplete()" class="success-message">
      <p>Congratulations! You've matched all the cards in {{ cardStore.attempts }} attempts.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCardStore } from '../../stores/CardStore';
import Card from '../../components/card.vue';

const cardStore = useCardStore();

// Initialize the cards when the component mounts
onMounted(() => {
  cardStore.initializeCards();
});

// Reset the game
function resetGame() {
  cardStore.resetGame();
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
  }
.board {
  display: grid;
  border: 3px solid #ffd700;
  padding: 20px;
  grid-template-columns: repeat(6, 1fr); /* 6 cards per row */
  gap: 10px; /* Space between cards */
  margin-top: 20px;
  justify-items: center; /* Center the cards horizontally */
}

/* Make the reset button look nice */
.reset-btn {
  margin-top: 20px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

/* Styling for attempts counter */
.attempts {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}

/* Success message when the game is complete */
.success-message {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: green;
}
</style>
