import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    playerChoice: null,
    computerChoice: null,
    result: null,
    playerWins: 0,
    computerWins: 0,
    rounds: 0,
    maxRounds: 3,  // Best of 3
  }),
  actions: {
    getComputerChoice() {
      const choices = ['rock', 'paper', 'scissors'];
      const randomIndex = Math.floor(Math.random() * 3);
      return choices[randomIndex];
    },

    determineWinner(player, computer) {
      if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
      ) {
        return 'You win!';
      } else if(player === computer){
        return 'It\'s a draw!';
      }else{
        return 'You lose!';
      }
    },

    makeChoice(choice) {
      if (this.rounds >= this.maxRounds) return; // Stop the game after max rounds
    
      this.playerChoice = choice;
      this.computerChoice = this.getComputerChoice();
      const winner = this.determineWinner(this.playerChoice, this.computerChoice);
      this.result = winner === 'draw' ? 'It\'s a draw!' : winner;
      
      this.rounds++;
    
      if (winner === 'You win!') {
        this.playerWins++;
      } else if (winner === 'You lose!') {
        this.computerWins++;
      }
    
      // Check if someone has won 2 rounds
      if (this.playerWins === 2) {
        this.result = 'You win the best of 3!';
      } else if (this.computerWins === 2) {
        this.result = 'Computer wins the best of 3!';
      }
    },    

    resetGame() {
      this.playerChoice = null;
      this.computerChoice = null;
      this.result = null;
      this.playerWins = 0;
      this.computerWins = 0;
      this.rounds = 0;
    }
  }
});
