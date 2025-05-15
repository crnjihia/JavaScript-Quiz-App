// Quiz data
const quizQuestions = [
  {
      question: "What does DOM stand for?",
      options: [
          "Document Object Model",
          "Display Object Management",
          "Digital Ordinance Model",
          "Desktop Object Mode"
      ],
      correctAnswer: 0
  },
  {
      question: "Which of the following is NOT a JavaScript data type?",
      options: [
          "String",
          "Boolean",
          "Character",
          "Number"
      ],
      correctAnswer: 2
  },
  {
      question: "What is the correct way to write a JavaScript array?",
      options: [
          "var colors = 'red', 'green', 'blue'",
          "var colors = (1:'red', 2:'green', 3:'blue')",
          "var colors = ['red', 'green', 'blue']",
          "var colors = {red, green, blue}"
      ],
      correctAnswer: 2
  },
  {
      question: "Which method adds a new element to the end of an array?",
      options: [
          "push()",
          "append()",
          "add()",
          "insert()"
      ],
      correctAnswer: 0
  },
  {
      question: "How do you write 'Hello World' in an alert box?",
      options: [
          "msg('Hello World')",
          "alert('Hello World')",
          "msgBox('Hello World')",
          "alertBox('Hello World')"
      ],
      correctAnswer: 1
  }
];

// DOM Elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const completeContainer = document.getElementById('complete-container');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Initialize quiz
function initQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = score;
  showQuestion(currentQuestionIndex);
  questionContainer.style.display = 'block';
  completeContainer.style.display = 'none';
  updateProgressBar();
}

// Show question and options
function showQuestion(index) {
  const question = quizQuestions[index];
  questionElement.textContent = `${index + 1}. ${question.question}`;
  
  // Clear options and feedback
  optionsElement.innerHTML = '';
  feedbackElement.style.display = 'none';
  answered = false;
  nextButton.disabled = true;
  
  // Create option elements
  question.options.forEach((option, i) => {
      const optionElement = document.createElement('label');
      optionElement.className = 'option';
      
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = i;
      radio.id = `option${i}`;
      radio.addEventListener('change', () => selectOption(i));
      
      const optionText = document.createTextNode(option);
      
      optionElement.appendChild(radio);
      optionElement.appendChild(optionText);
      optionsElement.appendChild(optionElement);
  });
}

// Handle option selection
function selectOption(selectedIndex) {
  if (answered) return;
  
  const question = quizQuestions[currentQuestionIndex];
  answered = true;
  
  // Check if answer is correct
  const isCorrect = selectedIndex === question.correctAnswer;
  
  // Update score
  if (isCorrect) {
      score++;
      scoreElement.textContent = score;
      feedbackElement.textContent = 'Correct!';
      feedbackElement.className = 'feedback correct';
  } else {
      feedbackElement.textContent = `Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`;
      feedbackElement.className = 'feedback incorrect';
  }
  
  feedbackElement.style.display = 'block';
  nextButton.disabled = false;
  
  // Highlight correct and incorrect answers
  const options = document.querySelectorAll('.option');
  options.forEach((option, i) => {
      if (i === question.correctAnswer) {
          option.style.backgroundColor = '#d4edda';
          option.style.borderColor = '#c3e6cb';
      } else if (i === selectedIndex && i !== question.correctAnswer) {
          option.style.backgroundColor = '#f8d7da';
          option.style.borderColor = '#f5c6cb';
      }
  });
}

// Go to next question
function nextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < quizQuestions.length) {
      showQuestion(currentQuestionIndex);
      updateProgressBar();
  } else {
      completeQuiz();
  }
}

// Complete the quiz
function completeQuiz() {
  questionContainer.style.display = 'none';
  completeContainer.style.display = 'block';
  finalScoreElement.textContent = `Your score: ${score} out of ${quizQuestions.length}`;
  progressBar.style.width = '100%';
}

// Update progress bar
function updateProgressBar() {
  const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Event listeners
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', initQuiz);

// Start the quiz
initQuiz();