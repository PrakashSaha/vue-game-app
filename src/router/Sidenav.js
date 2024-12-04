import { createWebHistory, createRouter } from 'vue-router'
import { 
  getAuth,
  onAuthStateChanged,} from "firebase/auth"
import { auth } from "../firebase";

import Home from '../views/Home.vue'
import Results from '../views/Results.vue'
import Login from '../views/auth/Login.vue'
import Registration from '../views/auth/Register.vue'

// Import your game-specific components
import Quiz from '../views/games/Quiz.vue';
import CardFlip from '../views/games/Card-Flip.vue';
import TicTacToe from '../views/games/Tic-Tac-Toe.vue';
import RockPaperScissors from '../views/games/Rock-Paper.vue';


const routes = [
  { 
    path: '/', 
    component: Home,
    meta: { requiresAuth: true }, 
},{ 
    path: '/results', 
    component: Results 
},{ 
    path: '/login', 
    component: Login 
},{ 
    path: '/register', 
    component: Registration 
},{ 
  path: '/games/quiz', 
  component: Quiz,
  meta: { requiresAuth: true },
},{ 
  path: '/games/card-flip', 
  component: CardFlip,
  meta: { requiresAuth: true },
},{ 
  path: '/games/tictac', 
  component: TicTacToe,
  meta: { requiresAuth: true }, 
},{ 
  path: '/games/rockpaper', 
  component: RockPaperScissors,
  meta: { requiresAuth: true }, 
}
]

const Sidenav = createRouter({
  history: createWebHistory(),
  routes,
})

// Function to get the current authenticated user
const getCurrentUser = () =>{
  return new Promise ((res, rej) =>{
    const auth = getAuth();
      const removeListener = auth.onAuthStateChanged(
          (user) => {
              removeListener();
              res(user);
          },
          (error) => rej(error)
      )
  });
};

// Navigation Guard
Sidenav.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    try {
      const user = await getCurrentUser();
      if (user) {
        next(); // User is authenticated, proceed to the route
      } else {
        alert("You don't have access!");
        next("/registration"); // Redirect to registration if not authenticated
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      next("/registration"); // Redirect to registration as a fallback
    }
  } else {
    next(); // Route does not require authentication, proceed
  }
});
export default Sidenav;