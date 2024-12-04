<template>
    <div class="container">
      <header class="header">
        <h1>Quiz Application</h1>
      </header>
  
      <div v-if="!quizStore.quizResults && quizStore.currentQuestion">
        <p class="timer">Time Remaining: {{ quizStore.timer }} seconds</p>
  
        <div class="question-area">
          <p class="question-text">{{ quizStore.currentQuestion.question }}</p>
        </div>
  
        <div class="answers">
          <button
            v-for="(option, index) in quizStore.currentQuestion.options"
            :key="index"
            :class="{ selected: quizStore.selectedAnswers[quizStore.currentQuestionIndex] === index }"
            @click="quizStore.selectAnswer(index)"
          >
            {{ option.text }}
          </button>
        </div>
  
        <!-- Control buttons -->
        <button v-if="!quizStore.isTimerRunning" @click="quizStore.resumeTimer">Resume Timer</button>
        <button v-if="quizStore.isTimerRunning" @click="quizStore.pauseTimer">Pause Timer</button>
  
        <button class="nav-button" @click="quizStore.goToNextQuestion">
          {{ quizStore.isLastQuestion ? 'Submit' : 'Next' }}
        </button>
      </div>
  
      <div v-else-if="quizStore.quizResults">
        <h3>Quiz Results</h3>
        <p>{{ quizStore.quizResults.correctAnswers }} / {{ quizStore.quizResults.totalQuestions }}</p>
  
        <div
          v-for="(result, index) in quizStore.quizResults.results"
          :key="index"
          :class="{ correct: result.isCorrect, incorrect: !result.isCorrect }"
        >
          <p>{{ result.question }}</p>
          <p>Selected: {{ result.selectedAnswer }} ({{ result.isCorrect ? 'Correct' : 'Wrong' }})</p>
        </div>
  
        <button @click="quizStore.reloadGame">Reload Game</button>
      </div>
  
      <div v-else>
        <p>Loading questions...</p>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { onMounted } from 'vue';
  import { useQuizStore } from '../../stores/quizStore';
  
  const quizStore = useQuizStore();
  
  // Make sure questions are loaded before accessing them
  onMounted(() => {
    quizStore.shuffleQuestions(); // Shuffle and load questions if needed
    quizStore.startTimer();
  });
  </script>
  
  <style scoped>
  /* Your existing styles */
  </style>
  

  <style scoped>
  /* Container and Layout */
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
  
  .header h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    color: #333;
  }
  
  /* Timer */
  .timer {
    font-size: 1.2rem;
    color: #ff4500;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  /* Question Area */
  .question-area {
    margin: 20px 0;
    padding: 20px;
    border: 3px solid #ffd700;
    border-radius: 15px;
    background: rgba(255, 215, 0, 0.2);
    width: 100%;
    max-width: 600px;
  }
  
  .question-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  
  /* Answer Options */
  .answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
    width: 100%;
  }
  
  .answers button {
    background-color: #001f54;
    color: #fff;
    border: 2px solid #ffd700;
    padding: 15px;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .answers button:hover {
    background-color: #ffd700;
    color: #001f54;
  }
  
  .nav-button {
  margin-top: 20px;
  background-color: #ff4500;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #ff6347;
}

  .answers button.selected {
    background-color: #1eff00;
    color: white;
  }
  
  /* Navigation Button */
  button:last-of-type {
    margin-top: 20px;
    background-color: #ff4500;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  
  
  /* Results Section */
  .correct {
    border-left: 5px solid #1eff00;
    padding: 10px;
    margin-bottom: 10px;
    background-color: rgba(30, 255, 0, 0.1);
    border-radius: 10px;
  }
  
  .incorrect {
    border-left: 5px solid #ff4500;
    padding: 10px;
    margin-bottom: 10px;
    background-color: rgba(255, 69, 0, 0.1);
    border-radius: 10px;
  }
  
  .result p {
    font-size: 1rem;
    color: #333;
  }
  
  /* Strong Styling */
  strong {
    color: green;
  }
  
  strong p {
    margin-top: 10px;
  }
  </style>
  