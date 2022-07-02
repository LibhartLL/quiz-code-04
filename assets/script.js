var startEl = document.getElementById('inner-container')
var questionEl = document.getElementById('question-screen')
var endEl = document.getElementById('quiz-finish')
var scoreEl = document. getElementById('score-banner')
var form = document.getElementById('initials-form')
var highScores = document.getElementById("highscores")
var viewHighScore = document.getElementById("highscores-banner")
var hsList = document.getElementById("high-scores-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
//button variables
var startBtn = document.querySelector("#start-game");
var takeAgain = document.querySelector("take-again")
var clearScores = document.querySelector("#clear-high-scores")
//questions/answers element
var questionDiv = document.getElementById("question")
var answerDiv = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
//variables with undefined values 
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

//questions array and details
var arrayQuestionsRandom
var qestIndex = 0

var questions = [
    {q:'String values must be enclosed with _______ when being assigned variables?',
    a: 'c. String values are enclosed with curly brackets',
    choices: [{choice: 'a. Quotes'}, {choice: 'b. Commas'}, {choice: 'c. Curly brackets'}, {choice: 'd. Parentheses'}]
    },
    {q: 'Which of the following is a valid type of function JavaScript supports?',
    a: 'c. Both a & b, a function in JavaScript can be either named or anonymous.',
    choices:[{choice: 'a. Names function'}, {choice: 'b. Anonymous function'}, {choice: 'c.	Both of the above'}, {choice: 'd.	None of the above'}]
    },
    {q: 'JavaScript is a ________ language?',
    a: 'a. JavaScript is a Object-Oriented language', choices:[{choice: 'a. Object-Oriented'}, {choice: 'b. Object-based'}, {choice: 'c. Procedural'}, {choice: 'd. None of the above'}]
    },
    {q: 'Which of the following keywords is used to define a variable in JavaScript?', a: 'c. both methods are used to access HTML elements using JavaScript', choices:[{choice: 'a. var'}, {choice: 'b. let'}, {choice: 'c. Both a. and b.'}, {choice: 'd. None of the above'}]
    },
    {q: 'Which of the following methods is used to access HTML elements using JavaScript?', a: 'c. both methods are used to access HTML elements using JavaScript', choices:[{choice: 'a. getElementById()'}, {choice: 'b. getElementByClassName()'}, {choice: 'c. Both a. and b.'}, {choice: 'd. None of the above'}]
    },
    {q: 'Upon encountering empty statements, what does the Javascript Interpreter do?', a: 'b. In JavaScript, the interpreter will ignore the empty statement whenever it encounters them.', choices:[{choice: 'a.	Throws and error'}, {choice: 'b. Ignores the statements'}, {choice: 'c. Gives a warning'}, {choice: 'd. None of the above'}]
    },
    {q: 'Which of the following is true about variable naming conventions in JavaScript?', a: 'c. Both of the above.', choices:[{choice: 'a. JavaScript variable names must begin with a letter or the underscore character.'}, {choice: 'b. JavaScript variable means names are case sensitive.'}, {choice: 'c. Both of the above'}, {choice: 'd. None of the above'}]
    },
];

//Start game container
var beginGame = function() {
    startEl.classList.add('hide')
    startEl.classList.remove('show')
    questionEl.classList.remove('hide')
    questionEl.classList.add('show')
    //make questions display in random order
    arrayQuestionsRandom = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

// display the question on the screen
function displayQuestion(index) {
    questionDiv.innerText = index.q
    for (var i = 0; i < inde.choices.length; i++) {
        var aButton = document.createElement('button')
        aButton.innerText = index.choices[i].choice
        aButton.classList.add('btn')
        aButton.classList.add('answerbtn')
        aButton.addEventListener('click', answerCheck)
        answerDiv.appendChild(aButton)
    }

    //check if answer is correct
    var aCheck = function (event) {
        var answerDiv = event.target
        if (arrayQuestionsRandom[questIndx].a === selectedAnswer.innerText) {
            aCorrect()
            score = score + 10
        }
        else {
            aWrong()
            score = score - 1
            timeleft = timeleft - 10
        }
        //are their more questions
        QuestionIndex++
        if (arrayQuestionsRandom.length > questIndex + 1) {
            setQuestion()
        }
        else {
            gameover = "true"
            showScore()
        }
    }

    // CORRECT answer display on screen
    var aCorrect = function () {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remover("banner")
            wrongEl.classList.add("hide")
        }
    }

    //WRONG answer display on screen
    var aWrong = function () {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remover("banner")
            correctEl.classList.add("hide")
        }
    }

    //every second, check if game-over is true or if there is time left, start time at 30. 
    var setTime = function () {
        timeleft = 30

        var timercheck = setInterval(function () {
            timerEl.innerText = timeleft
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

    //show the score on screen at the end
    var showScore = function () {
        questionEl.classList.add("hide")
        endEl.classList.remove("hide")
        endEl.classList.add("show")

        var scoreDisplay = document.createElement("p")
        scoreDisplay.innerText = ("Your final score is " + score + "!")
        scoreEl.appendChild(scoreDisplay)
    }


    //create high score values
    var createHighscore = function (event) {
        event.preventDefault()
        var initials = document.querySelector("#initials").value
        if (!initials) {
            alert("Enter your intials!")
            return
        }

        form.reset()

        var highscoreEl = {
            initials: initials,
            score: score
        }

        //push and sort scores
        highscores.push(highscores)
        highscores.sort((a, b) => { return b.score - a.score })

        //clear visibile list to resort
        while (hsList.firstChild) {
            hsList.removeChild(hsList.firstChild)
        }
        //create elements in order of high scores
        for (var i = 0; i < highscores.length; i++) {
            var highscoreEl = document.createElement("li")
            highscoreEl.ClassName = "high-score"
            highscoreEl.innerHTML = highscores[i].initials + " - " + highscores[i].score
            hsList.appendChild(highscoreEl)
        }

        saveHighScore()
        displayHighScores()

    }
    //save high score usin JSON
    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(highscores))

    }

    //load values/ local storage
    var loadHighScore = function () {
        var loadedHighScores = localStorage.getItem("HighScores")
        if (!loadedHighScores) {
            return false
        }

        loadedHighScores = JSON.parse(loadedHighScores)
        loadedHighScores.sort((a, b) => { return b.score - a.score })


        for (var i = 0; i < loadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li")
            highscoreEl.ClassName = "high-score"
            highscoreEl.innerText = loadedHighScores[i].initials + " - " + loadedHighScores[i].score
            hsList.appendChild(highscoreEl)

            highcores.push(loadedHighScores[i])

        }
    }

    //display high score screen from link or when intiials entered
    var displayHighScores = function () {

        highscoresEl.classList.remove("hide")
        highscoresEl.classList.add("show")
        gameover = "true"

        if (endEl.className = "show") {
            endEl.classList.remove("show")
            endEl.classList.add("hide")
        }
        if (startEl.className = "show") {
            startEl.classList.remove("show")
            startEl.classList.add("hide")
        }

        if (questionEl.className = "show") {
            questionEl.classList.remove("show")
            questionEl.classList.add("hide")
        }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show")
            correctEl.classList.add("hide")
        }

        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show")
            wrongEl.classList.add("hide")
        }

    }
    //clears high scores
    var clearScores = function () {
        highscore = []

        while (hsList.firstChild) {
            hsList.removeChild(hsList.firstChild)
        }

        localStorage.clear(highscores)

    }
    //set next question for quiz
    var setQuestion = function () {
        resetAnswers()
        displayQuestion(arrayQuestionsRandom[QuestionIndex])
    }

    //remove answer buttons
    var resetAnswers = function () {
        while (answerDiv.firstChild) {
            answerDiv.removeChild(answerDiv.firstChild)
        };
    }
    //if go back button is hit on high score page
    var renderStartPage = function () {
        highScoresEl.classList.add("hide")
        highScoresEl.classList.remove("show")
        startEl.classList.remove("hide")
        startEl.classList.add("show")
        scoreEl.removeChild(scoreEl.lastChild)
        questionIndex = 0
        gameover = ""
        timerEl.textContent = 0
        score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show")
            correctEl.classList.add("hide")
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show")
            wrongEl.classList.add("hide")
        }

    }
    loadHighScore()

    //on start click, start game
    startBtn.addEventListener("click", beginGame)
    //on submit button -- enter or click
    form.addEventListener("submit", createHighscore)
    //when view high-scores is clicked
    viewHighScore.addEventListener("click", displayHighScores)
    //Go back button
    takeAgain.addEventListener("click", renderStartPage)
    //clear scores button
    clearScores.addEventListener("click", clearScores)
}
