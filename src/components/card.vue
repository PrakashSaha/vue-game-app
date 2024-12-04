<template>
    <div class="card" :class="{'flipped': isFlipped, 'matched': isMatched}" @click="handleCardClick">
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">{{ card.value }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCardStore } from '../stores/cardStore';
  import { computed } from 'vue';
  
  const props = defineProps({
    card: Object,
    index: Number,
  });
  
  const cardStore = useCardStore();
  
  const isFlipped = computed(() => cardStore.cards[props.index].flipped);
  const isMatched = computed(() => cardStore.cards[props.index].matched);
  
  function handleCardClick() {
    cardStore.flipCard(props.index);
  }
  </script>
  
  <style scoped>
  .card {
    width: 100px;
    height: 150px;
    margin: 10px;
    display: inline-block;
    perspective: 1000px; /* Makes the 3D effect visible */
    cursor: pointer;
  }
  
  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s; /* Card flip animation */
  }
  
  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden; /* Hides the back side when flipped */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    border-radius: 8px;
    background-color: lightblue;
  }
  
  .card-back {
    transform: rotateY(180deg);
  }
  
  .card.flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card.matched {
    background-color: #90EE90; /* Green for matched cards */
  }
  </style>
  