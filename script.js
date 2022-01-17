
var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var quizTimer = document.getElementById('timer');
var start = document.getElementById('start');
var saveButton = document.getElementById('save_button');
var activeChange = document.querySelectorAll(".activeChange");
var msgDiv = document.querySelector("#message");
var initials = document.querySelector("#initials");

var timeCount = 60;
let currentOne = 0;
let numAmount = 0;

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

    else {
        answersBox[questionAmount];

        timeCount -= 10;

    }

    localStorage.setItem("numAmount", numAmount);
    resultsBox.innerHTML = `${numAmount} out of ${questions.length} correct`;

    answersBox[questionAmount].style.color = '';
    showSlide(currentOne + 1);
};

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



// Turn elements into block
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
    var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("numAmount");

    if (!initials || !score) {
        return;
    }
    textContent = initials;

}

saveButton.addEventListener("click", function (event) {
    event.preventDefault();

    var playerName = document.querySelector("#initials").value;

    if (playerName === "") {
        displayMessage("error", "Initials can not be blank");
    } else {
        displayMessage("success", initials.value + " " + "your score is: " + numAmount);

        localStorage.setItem("initials", initials);
        localStorage.setItem("initials", numAmount);
        savedInitials();
    }
});




setupCodeQuiz();

start.addEventListener("click", function () {
    showSlide(0);
    theTimer();
    document.getElementById("start").style.display = 'none';
});




