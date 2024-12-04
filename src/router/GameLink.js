import { createMemoryHistory, createRouter } from 'vue-router';

// Import your game-specific components
import Quiz from '../views/games/Quiz.vue';
import Puzzle from '../views/games/Card-Flip.vue';
import TicTacToe from '../views/games/Tic-Tac-Toe.vue';
import RockPaperScissors from '../views/games/Rock-Paper.vue';

const routes = [
  { 
    path: '/games/quiz', 
    component: Quiz 
  }, 
  { 
    path: '/games/puzzle', 
    component: Puzzle 
  }, 
  { 
    path: '/games/tictac', 
    component: TicTacToe 
  }, 
  { 
    path: '/games/rockpaper', 
    component: RockPaperScissors 
  }
];

const Games = createRouter({
  history: createMemoryHistory(), // Consider using createWebHistory() for browser support
  routes,
});

export default Games;
