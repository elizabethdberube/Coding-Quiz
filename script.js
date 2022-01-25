
var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var highScores = document.getElementById('high-scores');
var quizTimer = document.getElementById('timer');
var start = document.getElementById('start');
var saveButton = document.getElementById('save_button');
var activeChange = document.querySelectorAll(".activeChange");
var msgDiv = document.querySelector("#message");
var initials = document.querySelector("#initials");
var storedScores;
var storedInitials;
var timeCount = 60;
let currentOne = 0;
let numAmount = 0;

var theScores = [];
var theInitials = [];

// Questions array 
var questions = [{

    question: "What are variables used for in JavaScript Programs?",
    answers: {
        A: "Storing numbers, dates, or other values",
        B: "The speed variable",
        C: "How colors can vary from screen to screen"
    },

    correct: "A"
},
{
    question: "Why do JavaScript and Java have similar name?",
    answers: {
        A: "JavaScript is a stripped-down version of Java",
        B: "JavaScript's syntax is loosely based on Java's",
        C: "Both of the creators really liked coffee"
    },
    correct: "B"
},
{
    question: "What is the correct JavaScript syntax to write \"Hello World\"?",
    answers: {
        A: "System.out.println(\"Hello World\")",
        B: "println (\"Hello World\")",
        C: "document.write(\"Hello World\")"
    },
    correct: "C"
},
{
    question: "Is it possible to nest functions in JavaScript?",
    answers: {
        A: "True",
        B: "False"
    },
    correct: "A"
},
{
    question: "Which of the following variables takes precedence over the others if the names are the same?",
    answers: {
        A: "Global variable",
        B: "The local variable",
        C: "None of the above"
    },
    correct: "B"
}

];

// Timer function

function theTimer() {


    setInterval(function () {

        if (timeCount > 0) {
            quizTimer.textContent = timeCount + ' seconds remaining';
            timeCount--;

        }

        else if (timeCount === 0) {
            quizTimer.textContent = timeCount + ' seconds remaining';
            showScores();
        }

    }, 1000);

}


// Loop and radio buttons
function setupCodeQuiz() {

    var output = [];

    questions.forEach(
        (theQuestion, questionAmount) => {

            var answers = [];

            for (letter in theQuestion.answers)



                answers.push(
                    `<label class="block"> 
              <input type="radio" name="question${questionAmount}" value="${letter}">
              ${letter} :
              ${theQuestion.answers[letter]}
              </label>`
                );


            output.push(
                `<div class="change"> <div class="question"> ${theQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>
        </div>`
            );
        }

    );

    quizBox.innerHTML = output.join('');

    for (element of document.querySelectorAll('.change input')) {

        element.addEventListener("click", theResults)
    };
}

// Function for scoring 

function theResults() {
    var answersBox = quizBox.querySelectorAll('.answers');
    var questionAmount = currentOne;
    var theQuestion = questions[currentOne];
    var answerBox = answersBox[questionAmount];
    var select = `input[name=question${questionAmount}]:checked`;
    var userInput = (answerBox.querySelector(select) || {}).value;



    if (userInput === theQuestion.correct) {

        numAmount++;

        answersBox[questionAmount];
    }
    // if (theQuestion == 4) {
    //  theScores.push(numAmount);
    //    localStorage.setItem("myScore", JSON.stringify(theScores));

    //  }

    else {
        answersBox[questionAmount];

        timeCount -= 10;

    }

    answersBox[questionAmount].style.color = '';
    resultsBox.innerHTML = `${numAmount} out of ${questions.length} correct`;
    showSlide(currentOne + 1);
}




// Function for displaying array

function showSlide(n) {

    var changes = document.querySelectorAll(".change");
    console.log(changes);
    console.log(n);

    if (n >= questions.length) {
        showScores();
        return;
    }
    if (currentOne >= 0) {
        changes[currentOne].classList.remove('activeChange');
    };
    changes[n].classList.add('activeChange');
    currentOne = n;
};


// Turns elements into block
function showScores() {
    document.getElementById("victoryscreen").style.display = 'block';
    timeCount = 0;

};

// Functions for player saving initials and score
function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);

}

function savedInitials() {
    storedInitials = JSON.parse(localStorage.getItem("myInitials"));
    storedScores = JSON.parse(localStorage.getItem("myScore"));

    if (!storedInitials || !storedScores) {
        return;
    }
    textContent = storedInitials;

}

saveButton.addEventListener("click", function (event) {
    event.preventDefault();

    var playerName = document.querySelector("#initials").value;

    if (playerName === "") {
        displayMessage("error", "Initials can not be blank");
    } else {
        theInitials.push(playerName);
        localStorage.setItem("myInitials", JSON.stringify(theInitials));
        theScores.push(numAmount);
        localStorage.setItem("myScore", JSON.stringify(theScores))
        displayMessage("success", playerName + " " + "your score is: " + numAmount);


        savedInitials();
    }
});

window.onload = function playersHighScores() {
    highScores.innerHTML = '';

    for (var i = 0; i < theInitials.length; i++) {
        highScores.innerHTML += theInitials[i] + "your score is " + theScores[i];

    }
    console.log(theInitials, theScores);
}





setupCodeQuiz();

//Items are in array and local storage. 
//HAve start button reappear at end then when you hit start it clears and starts

start.addEventListener("click", function () {
    showSlide(0);
    theTimer();
    document.getElementById("start").style.display = 'none';
});




