<template>
    <div class="gamesDisplay">
      <GameCards 
      v-for="(game, index) in games" 
      :key="index" 
      :game-data="game"  
      />
    </div>
  </template>
  
  <script setup>
  import GameCards from "../components/GameCards.vue";
  import quizpic from "../assets/quiz.webp" 
  import puzzel from "../assets/puzzel.jpg"
  import tictac from "../assets/tictac.webp"
  import rockpaper from "../assets/rock-paper-sicior.jpg"
  const games = [{ 

        imageSrc: quizpic, 
        gameName: "Quiz",
        link: '/games/quiz', 
    },{ 
        imageSrc: puzzel, 
        gameName: "Card Flip",
        link: '/games/card-flip', 
    },{ 
        imageSrc: tictac, 
        gameName: "Tic Tac Toe",
        link: '/games/tictac', 
    },{ 
        imageSrc: rockpaper, 
        gameName: "Rock Paper",
        link: '/games/rockpaper', 
    },
];
  </script>
  
  <style scoped>
  
  .gamesDisplay {
    display: flex;
    flex-wrap: wrap; /* Allows wrapping of cards to the next line */
    gap: 16px; /* Adds spacing between cards */
    justify-content: center; /* Centers the items horizontally */
    align-items: center; /* Centers the items vertically within the row */
    min-height: 100vh; /* Optional: Ensures full height for proper alignment */
  }
  
 
  </style>
  