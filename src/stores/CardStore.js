import { defineStore } from 'pinia';

export const useCardStore = defineStore('card', {
  state: () => ({
    cards: [],  // To store the cards and their state
    flippedIndices: [],  // To track flipped card indices
    matchedIndices: [],  // To store indices of matched cards
    attempts: 0,  // Track the number of attempts
  }),

  actions: {
    // Initialize cards
    initializeCards() {
      const cardValues = ['A', 'B', 'C', 'D', 'E', 'F'];
      let cards = [];
      // Duplicate the values and shuffle them
      cardValues.forEach(value => {
        cards.push({ value, id: `${value}-1`, flipped: false, matched: false });
        cards.push({ value, id: `${value}-2`, flipped: false, matched: false });
      });

      // Shuffle the cards
      cards = cards.sort(() => Math.random() - 0.5);
      this.cards = cards;
      this.attempts = 0;  // Reset attempts when new game starts
    },

    // Flip a card
    flipCard(index) {
      const card = this.cards[index];
      if (card.flipped || card.matched) return;

      card.flipped = true;
      this.flippedIndices.push(index);

      if (this.flippedIndices.length === 2) {
        this.attempts++;
        this.checkMatch();
      }
    },

    // Check if two flipped cards match
    checkMatch() {
      const [firstIndex, secondIndex] = this.flippedIndices;
      const firstCard = this.cards[firstIndex];
      const secondCard = this.cards[secondIndex];

      if (firstCard.value === secondCard.value) {
        this.cards[firstIndex].matched = true;
        this.cards[secondIndex].matched = true;
      } else {
        setTimeout(() => {
          this.cards[firstIndex].flipped = false;
          this.cards[secondIndex].flipped = false;
        }, 1000);
      }

      this.flippedIndices = [];
    },

    // Check if the game is complete
    isGameComplete() {
      return this.matchedIndices.length === this.cards.length;
    },

    // Reset the game
    resetGame() {
      this.initializeCards();
      this.flippedIndices = [];
      this.matchedIndices = [];
    },
  },
});
