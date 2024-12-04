// stores/quizStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref([
  {
    index: 1,
    question: "What is the capital of France?",
    options: [
      { text: "Berlin", isCorrect: false },
      { text: "Madrid", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Rome", isCorrect: false },
    ],
  },
  {
    index: 2,
    question: "Which planet is known as the Red Planet?",
    options: [
      { text: "Earth", isCorrect: false },
      { text: "Mars", isCorrect: true },
      { text: "Jupiter", isCorrect: false },
      { text: "Venus", isCorrect: false },
    ],
  },
  {
    index: 3,
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      { text: "Charles Dickens", isCorrect: false },
      { text: "William Shakespeare", isCorrect: true },
      { text: "Mark Twain", isCorrect: false },
      { text: "Jane Austen", isCorrect: false },
    ],
  },
  {
    index: 4,
    question: "What is the largest mammal on Earth?",
    options: [
      { text: "Elephant", isCorrect: false },
      { text: "Blue Whale", isCorrect: true },
      { text: "Giraffe", isCorrect: false },
      { text: "Hippopotamus", isCorrect: false },
    ],
  },
  {
    index: 5,
    question: "Which element has the chemical symbol 'O'?",
    options: [
      { text: "Oxygen", isCorrect: true },
      { text: "Gold", isCorrect: false },
      { text: "Osmium", isCorrect: false },
      { text: "Hydrogen", isCorrect: false },
    ],
  },
  {
    index: 6,
    question: "What is the square root of 64?",
    options: [
      { text: "6", isCorrect: false },
      { text: "8", isCorrect: true },
      { text: "10", isCorrect: false },
      { text: "12", isCorrect: false },
    ],
  },
  {
    index: 7,
    question: "What is the fastest land animal?",
    options: [
      { text: "Lion", isCorrect: false },
      { text: "Cheetah", isCorrect: true },
      { text: "Horse", isCorrect: false },
      { text: "Leopard", isCorrect: false },
    ],
  },
  {
    index: 8,
    question: "Who painted the Mona Lisa?",
    options: [
      { text: "Vincent van Gogh", isCorrect: false },
      { text: "Leonardo da Vinci", isCorrect: true },
      { text: "Pablo Picasso", isCorrect: false },
      { text: "Claude Monet", isCorrect: false },
    ],
  },
  {
    index: 9,
    question: "Which gas do plants primarily use during photosynthesis?",
    options: [
      { text: "Oxygen", isCorrect: false },
      { text: "Carbon Dioxide", isCorrect: true },
      { text: "Nitrogen", isCorrect: false },
      { text: "Hydrogen", isCorrect: false },
    ],
  },
  {
    index: 10,
    question: "What is the largest continent by area?",
    options: [
      { text: "Africa", isCorrect: false },
      { text: "Asia", isCorrect: true },
      { text: "North America", isCorrect: false },
      { text: "Europe", isCorrect: false },
    ],
  },
]);

  const selectedAnswers = ref({});
  const currentQuestionIndex = ref(0);
  const quizResults = ref(null);
  const timer = ref(30);
  let timerInterval = null;

  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

  const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1);

  const shuffleQuestions = () => {
    questions.value.sort(() => Math.random() - 0.5).forEach(q => {
      q.options.sort(() => Math.random() - 0.5);
    });
  };

  const startTimer = () => {
    timer.value = 30;
    timerInterval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        stopTimer();
        submitQuiz();
      }
    }, 1000);
  };

  const stopTimer = () => clearInterval(timerInterval);

  const selectAnswer = (optionIndex) => {
    selectedAnswers.value[currentQuestionIndex.value] = optionIndex;
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    stopTimer();
    const results = questions.value.map((question, questionIndex) => {
      const selectedOptionIndex = selectedAnswers.value[questionIndex];
      const selectedOption = question.options[selectedOptionIndex] || { text: "No answer" };
      return {
        question: question.question,
        selectedAnswer: selectedOption.text,
        isCorrect: selectedOption.isCorrect || false,
      };
    });

    quizResults.value = {
      results,
      correctAnswers: results.filter(r => r.isCorrect).length,
      totalQuestions: questions.value.length,
    };

    const storedResults = JSON.parse(localStorage.getItem('quizScores')) || [];
    storedResults.push({
      results,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('quizScores', JSON.stringify(storedResults));
  };

  const reloadGame = () => {
    selectedAnswers.value = {};
    currentQuestionIndex.value = 0;
    quizResults.value = null;
    shuffleQuestions();
    startTimer();
  };

  return {
    questions,
    selectedAnswers,
    currentQuestionIndex,
    quizResults,
    timer,
    shuffleQuestions,
    startTimer,
    stopTimer,
    selectAnswer,
    goToNextQuestion,
    submitQuiz,
    reloadGame,
    currentQuestion,
    isLastQuestion,
  };
});
