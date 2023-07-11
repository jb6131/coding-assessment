// Quiz questions and answers
var questions = [
  {
    question: "Commonly used data types do NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: 2
  },
  {
    question: "The condition in an if / else statement is enclosed with ______.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: 2
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: 3
  },
  {
    question: "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: 2
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: 3
  }
];

// Other variables
var quizContainer = document.getElementById("quiz-container");
var startContainer = document.getElementById("start-container");
var resultContainer = document.getElementById("result-container");
var scoreContainer = document.getElementById("score-container");
var leaderboardContainer = document.getElementById("leaderboard-container");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var timeLeftElement = document.getElementById("time-left");
var startButton = document.getElementById("start-button");
var saveButton = document.getElementById("save-button");
var leaderboardButton = document.getElementById("leaderboard-button");
var restartButton = document.getElementById("restart-button");
var clearButton = document.getElementById("clear-button");
var initialsInput = document.getElementById("initials");
var leaderboardList = document.getElementById("leaderboard-list");
var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;
var timerInterval;
var leaderboard = [];

// Start button click event listener
startButton.addEventListener("click", startQuiz);

// Answer choice click event listener
choicesElement.addEventListener("click", checkAnswer);

// Save button click event listener
saveButton.addEventListener("click", saveScore);

// Leaderboard button click event listener
leaderboardButton.addEventListener("click", showLeaderboard);

// Restart button click event listener
restartButton.addEventListener("click", restartQuiz);

// Reset button click event listener
clearButton.addEventListener("click", clearLeaderboard);

// Function to start the quiz
function startQuiz() {
  startButton.parentNode.style.display = "none";
  quizContainer.style.display = "block";
  timeLeftElement.textContent = timeLeft; // Set initial time
  startTimer();
  showQuestion();
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeLeft = 0; // Set timeLeft to 0 if it goes negative
      timeLeftElement.textContent = 0; // Display 0 if timeLeft is negative
      endQuiz();
    } else {
      timeLeft--;
      timeLeftElement.textContent = timeLeft; // Display timeLeft as is
    }
  }, 1000);
}

// Function to display the current question and choices
function showQuestion() {
  var question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  choicesElement.innerHTML = "";

  for (var i = 0; i < question.choices.length; i++) {
    var choice = document.createElement("li");
    choice.textContent = question.choices[i];
    choice.setAttribute("data-index", i);
    choice.classList.add("choice");
    choicesElement.appendChild(choice);
  }

  choicesElement.style.listStyle = "none";
  choicesElement.style.padding = "0";
  choicesElement.style.margin = "0";
}

// Function to check the selected answer
function checkAnswer(event) {
  var selectedChoice = event.target;
  var selectedAnswer = parseInt(selectedChoice.getAttribute("data-index"));

  if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
    resultContainer.textContent = "Correct!";
  } else {
    timeLeft -= 10;

    if (timeLeft <= 0) {
      timeLeft = 0; // Set timeLeft to 0 if it goes negative
      endQuiz();
      return; // Immediately end the quiz if time reaches zero
    }

    resultContainer.textContent = "Wrong!";
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  scoreContainer.style.display = "block";
  var scoreElement = document.getElementById("score");
  scoreElement.textContent = "Your Score: " + timeLeft; // Update score display
}

// Function to save the score
function saveScore() {
  var initials = initialsInput.value;

  // Add the score and initials to the leaderboard
  leaderboard.push({ initials, timeLeft });

  // Sort the leaderboard in descending order based on scores
  leaderboard.sort((a, b) => b.timeLeft - a.timeLeft);

  // Update the leaderboard display
  updateLeaderboard();

  // Reset the quiz
  currentQuestionIndex = 0;
  timeLeft = 60;
  initialsInput.value = "";
  scoreContainer.style.display = "none";
  leaderboardContainer.style.display = "block";
}

// Function to update the leaderboard display
function updateLeaderboard() {
  leaderboardList.innerHTML = "";

  for (var i = 0; i < leaderboard.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = `${leaderboard[i].initials}: ${leaderboard[i].timeLeft}`;
    leaderboardList.appendChild(listItem);
  }
}

// Function to show the leaderboard
function showLeaderboard() {
  leaderboardContainer.style.display = "block";
  quizContainer.style.display = "none";
  scoreContainer.style.display = "none";
  startContainer.style.display = "none";
  clearInterval(timerInterval);
}


// Function to restart the quiz
function restartQuiz() {
  leaderboardContainer.style.display = "none";
  quizContainer.style.display = "none";
  scoreContainer.style.display = "none";
  startButton.parentNode.style.display = "block";
  currentQuestionIndex = 0;
  timeLeft = 60;
  resultContainer.textContent = "";
  initialsInput.value = "";
  clearInterval(timerInterval);
  timeLeftElement.textContent = timeLeft;
}


// Function to reset the leaderboard
function clearLeaderboard() {
  leaderboard = [];
  leaderboardList.innerHTML = "";
}
