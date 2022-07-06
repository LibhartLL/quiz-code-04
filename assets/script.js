var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var ViewHighScoreEl = document.getElementById("view-high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
//buttons
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")
//questions/answers element
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

//High Score Array
var HighScores = [];

 //assign array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0



const newLocal = 'c. both a and b are correct';
// The array of questions for our quiz game.
var questions = [
  { q: 'String values must be enclosed with _______ when being assigned variables?', 
    a: 'c. Curly Brackets', 
    choices: [{choice: 'a. Quotes'}, {choice: 'b. Commas'}, {choice: 'c. Curly Brackets'}, {choice: 'd. Parenthesis'}]
  },
  { q: 'Arrays in Javascript can be used to store __________.', 
    a: 'd. all of the above', 
    choices: [{choice: 'a. Numbers'}, {choice: 'b. Booleans'}, {choice: 'c. Strings'}, {choice: 'd. all of the above'}]
  },
  { q: 'JavaScript is a _______ language?', 
    a: 'a. Object-Oriented', 
    choices: [{choice: 'a. Object-Oriented'}, {choice: 'b. Object-Based'}, {choice: 'c. Procedural'}, {choice: 'd. None of the above'}]
  },
  { q: 'Inside which HTML element do we put the javascript?', 
    a: 'c. <script>', 
    choices: [{choice: 'a. <h1>'}, {choice: 'b. <js>'}, {choice: 'c. <script>'}, {choice: 'd. <head>'}]
  },
  { q: 'In the code -- setinterval(time(),1000) -- what is time()?', 
    a: 'a. callback function', 
    choices: [{choice: 'a. callback function'}, {choice: 'b. undefined'}, {choice: 'c. variable'}, {choice: 'd. all of the above'}]
  },
  { q: 'What syntax would call a function?', 
    a: 'd. function()', 
    choices: [{choice: 'a. var function'}, {choice: 'b. function'}, {choice: 'c. call function'}, {choice: 'd. function()'}]
  },
  { q: 'When did javascript first appear?', 
    a: 'a. 1995', 
    choices: [{choice: 'a. 1995'}, {choice: 'b. Roaring twenties'}, {choice: 'c. 2005'}, {choice: 'd. 2000'}]
  },
  { q: 'What does DOM stand for?', 
    a: 'b. Document Object Module', 
    choices: [{choice: 'a. Do Overnight Modules'}, {choice: 'b. Document Object Module'}, {choice: 'c. Divas Obviously Model'}, {choice: 'd. Do Overnight Math'}]
  },
  { q: 'What is getItem commonly used for?', 
    a: 'b. local storage', 
    choices: [{choice: 'a. adding drama'}, {choice: 'b. local storage'}, {choice: 'c. online shopping'}, {choice: 'd. naming a variable'}]
  },
  { q: 'Which of the following is true about variable naming conventions in JavaScript?', 
    a: 'c. Both a and b', 
    choices: [{choice: 'a.	JavaScript variable names must begin with a letter or the underscore character.'}, {choice: 'b.	JavaScript variable means names are case sensitive.'}, {choice: 'c. Both a and b'}, {choice: 'd. None of the above'}]
  },
];

  //if go back button is hit on high score page
var renderStartPage = function () {
  containerHighScoresEl.classList.add("hide")
  containerHighScoresEl.classList.remove("show")
  containerStartEl.classList.remove("hide")
  containerStartEl.classList.add("show")
  containerScoreEl.removeChild(containerScoreEl.lastChild)
  QuestionIndex = 0
  gameover = ""
  timerEl.textContent = 0 
  score = 0

  if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide")
  }
  if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
  }
}

//every second, check if game-over is true, or if there is time left. Start time at 30. 
var setTime = function () {
  timeleft = 90;

var timercheck = setInterval(function() {
  timerEl.innerText = timeleft;
  timeleft--

  if (gameover) {
      clearInterval(timercheck)
  }
 
  if (timeleft < 0) {
      showScore()
      timerEl.innerText = 0
      clearInterval(timercheck)
  }

  }, 1000)
}

var startGame = function() {
  //add classes to show/hide start and quiz screen
  containerStartEl.classList.add('hide');
  containerStartEl.classList.remove('show');
  containerQuestionEl.classList.remove('hide');
  containerQuestionEl.classList.add('show');
  //Shuffle the questions so they show in random order
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

//set next question for quiz
var setQuestion = function() {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function() {
  while (answerbuttonsEl.firstChild) {
      answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
  };
};

//display question information (including answer buttons)
var displayQuestion = function(index) {
  questionEl.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
      var answerbutton = document.createElement('button')
      answerbutton.innerText = index.choices[i].choice
      answerbutton.classList.add('btn')
      answerbutton.classList.add('answerbtn')
      answerbutton.addEventListener("click", answerCheck)
      answerbuttonsEl.appendChild(answerbutton)
      }
  };
//display correct! on screen
var answerCorrect = function() {
  if (correctEl.className = "hide") {
      correctEl.classList.remove("hide")
      correctEl.classList.add("banner")
      wrongEl.classList.remove("banner")
      wrongEl.classList.add("hide")
      }
  }  
//display wrong! on screen
var answerWrong = function() {
  if (wrongEl.className = "hide") {
      wrongEl.classList.remove("hide")
      wrongEl.classList.add("banner")
      correctEl.classList.remove("banner")
      correctEl.classList.add("hide")
  }
}

//check if answer is correct    
var answerCheck = function(event) {
  var selectedanswer = event.target
      if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
          answerCorrect()
          score = score + 10
      }

      else {
        answerWrong()
        score = score - 10;
        timeleft = timeleft -10;
    };

  //go to next question, check if there is more questions
    QuestionIndex++
      if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
          setQuestion()
      }   
      else {
         gameover = "true";
         showScore();
          }
}

  //Display total score screen at end of game
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = (`Your final score is ${score}!`);
  containerScoreEl.appendChild(scoreDisplay);
}       

//create high score values
function createHighScore(event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

  formInitials.reset();

  var HighScore = {
    initials: initials,
    score: score
  };

  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => { return b.score - a.score; });

  //clear visibile list to resort
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }
  //create elements in order of high scores
  for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
  }

  saveHighScore();
  displayHighScores();

}
//save high score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))
      
}

//load values/ called on page load
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores")
      if (!LoadedHighScores) {
      return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => {return b.score-a.score})


  for (var i = 0; i < LoadedHighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);

      HighScores.push(LoadedHighScores[i]);
      
  }
}  

//display high score screen from link or when intiials entered
var displayHighScores = function() {

  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("show");
  gameover = "true"

  if (containerEndEl.className = "show") {
      containerEndEl.classList.remove("show");
      containerEndEl.classList.add("hide");
      }
  if (containerStartEl.className = "show") {
      containerStartEl.classList.remove("show");
      containerStartEl.classList.add("hide");
      }
      
  if (containerQuestionEl.className = "show") {
      containerQuestionEl.classList.remove("show");
      containerQuestionEl.classList.add("hide");
      }

  if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide");
  }

  if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
      }
  
}
//clears high scores
var clearScores = function () {
  HighScores = [];

  while (listHighScoreEl.firstChild) {
      listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }

  localStorage.clear(HighScores);

} 

loadHighScore()
  
//on start click, start game
btnStartEl.addEventListener("click", startGame)
//on submit button -- enter or click
formInitials.addEventListener("submit", createHighScore)
//when view high-scores is clicked
ViewHighScoreEl.addEventListener("click", displayHighScores)
//Go back button
btnGoBackEl.addEventListener("click", renderStartPage)
//clear scores button
btnClearScoresEl.addEventListener("click", clearScores)