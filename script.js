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
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: [
            "let",
            "var",
            "const",
            "constant"
        ],
        correctAnswer: 2
    },
    {
        question: "What will `typeof null` return in JavaScript?",
        options: [
            "'null'",
            "'object'",
            "'undefined'",
            "'boolean'"
        ],
        correctAnswer: 1
    },
    {
        question: "How do you write a comment in JavaScript?",
        options: [
            "# This is a comment",
            "<!-- This is a comment -->",
            "// This is a comment",
            "** This is a comment **"
        ],
        correctAnswer: 2
    },
    {
        question: "Which operator is used to compare both value and type?",
        options: [
            "==",
            "===",
            "!=",
            "!=="
        ],
        correctAnswer: 1
    },
    {
        question: "Which method is used to select an element by ID?",
        options: [
            "getElementsByClassName()",
            "querySelectorAll()",
            "getElementById()",
            "getElementsByTagName()"
        ],
        correctAnswer: 2
    }
];

// DOM Elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');
const startContainer = document.getElementById('start-container');
const questionContainer = document.getElementById('question-container');
const completeContainer = document.getElementById('complete-container');
const finalScoreElement = document.getElementById('final-score');
const performanceMessage = document.getElementById('performance-message');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');
const startButton = document.getElementById('start-btn');
const quizFooter = document.getElementById('quiz-footer');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let shuffledQuestions = [];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Initialize quiz
function initQuiz() {
    // Shuffle questions
    shuffledQuestions = shuffleArray(quizQuestions);
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    
    // Show start screen
    startContainer.style.display = 'block';
    questionContainer.style.display = 'none';
    completeContainer.style.display = 'none';
    quizFooter.style.display = 'none';
    
    // Reset progress bar
    progressBar.style.width = '0%';
}

// Start the quiz
function startQuiz() {
    startContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    quizFooter.style.display = 'flex';
    showQuestion(0);
    updateProgressBar();
}

// Show question and options
function showQuestion(index) {
    const question = shuffledQuestions[index];
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
    
    const question = shuffledQuestions[currentQuestionIndex];
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
            option.style.backgroundColor = '#1e3a2c';
            option.style.borderColor = '#2e7d50';
            option.style.color = '#a3f7b5';
        } else if (i === selectedIndex && i !== question.correctAnswer) {
            option.style.backgroundColor = '#3a1e1e';
            option.style.borderColor = '#a33a3a';
            option.style.color = '#f7a3a3';
        }
    });
}

// Go to next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < shuffledQuestions.length) {
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
    quizFooter.style.display = 'none';
    
    // Calculate percentage score
    const percentage = (score / shuffledQuestions.length) * 100;
    finalScoreElement.textContent = `Your score: ${score} out of ${shuffledQuestions.length} (${percentage}%)`;
    
    // Set performance message based on score
    if (percentage >= 90) {
        performanceMessage.textContent = "Outstanding! You're a JavaScript master!";
    } else if (percentage >= 70) {
        performanceMessage.textContent = "Great job! You have solid JavaScript knowledge.";
    } else if (percentage >= 50) {
        performanceMessage.textContent = "Good effort! Keep practicing to improve your JavaScript skills.";
    } else {
        performanceMessage.textContent = "Keep learning! With more practice, you'll get better at JavaScript.";
    }
    
    progressBar.style.width = '100%';
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Event listeners
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', initQuiz);
startButton.addEventListener('click', startQuiz);

// Start the quiz
initQuiz();
