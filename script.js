// HTML Elements API's...
var quiz = document.getElementById("quiz");
var start = document.getElementById("start");
var startQuizPage = document.getElementById("startQuizPage");
var result = document.getElementById("result");
var timer = document.getElementById("timer");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscorePage = document.getElementById("highscorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscoreInitials");
var endGame = document.getElementById("endGame");
var submitScore = document.getElementById("submitScore");
var highscoreDisplay = document.getElementById("highscoreDisplay");
var finalScore = document.getElementById("finalScore");
var gameover = document.getElementById("gameover");

//Question Element API's...
var question = document.getElementById("question");
var choiceA = document.getElementById("a");
var choiceB = document.getElementById("b");
var choiceC = document.getElementById("c");
var choiceD = document.getElementById("d");

// Quiz Questions...
var questions = [{
    question: "What does HTML stand for?",
    choiceA: "Hypertext Markup Language",
    choiceB: "HyperDocument File Formatting",
    choiceC: "Hypertext Matching Language",
    choiceD: "Hyper Texting Markup Language",
    correctAnswer: "a"},
  {
    question: "What does CSS describe...?",
    choiceA: "how HTML reacts on mobile devices and desktops",
    choiceB: "when it is time for the webpage to reactive to a response",
    choiceC: "how HTML elements are to be displayed on webpages",
    choiceD: "how HTML is developed for programming desktops",
    correctAnswer: "c"},
   {
    question: "Which choice below is a Javascript HTML method?",
    choiceA: "script.js",
    choiceB: "innerHTML",
    choiceC: "DivElById()",
    choiceD: "getElementById()",
    correctAnswer: "d"},
    {
    question: "What is a HTML semantic tag?",
    choiceA: "div",
    choiceB: "src",
    choiceC: "main",
    choiceD: "let",
    correctAnswer: "c"},
    {
    question: "What is bootstrap?",
    choiceA: "Open source CSS framework",
    choiceB: "HTML workspace for developers",
    choiceC: "A container used in Visual Studio",
    choiceD: "A method to reset CSS and HTML",
    correctAnswer: "a"},  
    {
    question: "Why is it importance of Github?",
    choiceA: "Github is best used for progrmming Kodi",
    choiceB: "Github is a extenstion of youtube for coders",
    choiceC: "Allows your work to be seen by recruiters",
    choiceD: "Great for watching others play games",
    correctAnswer: "c"},

    ];

//Other Variables...
var lastQuestion = questions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval = 0;
var score = 0;
var correct;

//Function generates the question to display to the user...
function renderQuizQuestion(){
    gameover.style.display = "none";
    if (currentQuestionIndex === lastQuestion){
        return showScore();
    } 
    var currentQuestion = questions[currentQuestionIndex];
    question.innerHTML = "<p>" + currentQuestion.question + "</p>";
    choiceA.innerHTML = currentQuestion.choiceA;
    choiceB.innerHTML = currentQuestion.choiceB;
    choiceC.innerHTML = currentQuestion.choiceC;
    choiceD.innerHTML = currentQuestion.choiceD;
};

//Function that start the quiz, timer and hides the start button. Next, the questions...
function startQuiz(){
    gameover.style.display = "none";
    startQuizPage.style.display = "none";
    renderQuizQuestion();

//Function timer for user to know the time elapsed and amount of time remaining to complete the quiz... 
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000); // 1000ms = 1s
    quiz.style.display = "block";
}
//Function that displays the score page at the end of the questionaire when completed or time elapses...
function showScore(){
    quiz.style.display = "none"
    gameover.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScore.innerHTML = "You got " + score + " out of " + questions.length + " correct!";
}

//Event to submit score...
submitScore.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        //alert to inform user initials cannot be blank...
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameover.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscorePage.style.display = "block";
        endGame.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplay.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplay.appendChild(newScoreSpan);
    }
}

//Fuction to display high score page...
function showHighscore(){
    startQuizPage.style.display = "none"
    gameover.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscorePage.style.display = "block";
    endGame.style.display = "flex";

    generateHighscores();
}

//Function clear high cores [Local Storage clear]...
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplay.textContent = "";
}

//Function to replay the quiz...
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameover.style.display = "none";
    startQuizPage.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

//Function that checks the answer to the question displayed in the quiz...
function checkAnswer(answer){
    correct = questions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== lastQuestion){
        score++;
        alert("Awesome!!! That Is Correct!");
        currentQuestionIndex++;
        renderQuizQuestion();
        //alert that displays if the question correct...
    }else if (answer !== correct && currentQuestionIndex !== lastQuestion){
        alert("That Is Incorrect. You'll get the next one!")
        currentQuestionIndex++;
        renderQuizQuestion();
        //alert that displays if the question is incorrect...
    }else{
        showScore();
    }
}

// Event for user to start the quiz or questionaire...
start.addEventListener("click",startQuiz);