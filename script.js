
var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var quizTimer = document.getElementById('timer');
var start = document.getElementById('start');
var saveButton = document.getElementById('save_button');
var endButton = document.getElementById('end-button');
var activeChange = document.querySelectorAll(".activeChange");
var msgDiv = document.querySelectorAll("#message");
var initials = document.querySelectorAll("#initials");
var displayInitials = document.querySelectorAll("#dis-initials");
var timeCount = 60;
let currentOne = 0;
let numAmount = 0;

// Questions array 
var questions = [{

    question: "What are variables an example of?",
    answers: {
        A: "Programming identifiers",
        B: "The speed variable",
        C: "How colors can vary from screen to screen"
    },

    correct: "A"
},
{
    question: "What does HTML stand for?",
    answers: {
        A: "Highlighted text made longer",
        B: "Hidden text marking length",
        C: "Hypertext markup language"
    },
    correct: "C"
},
{
    question: "What three things define an object?",
    answers: {
        A: "Properties, attributes, and methods",
        B: "Programming, attributes, and methods",
        C: "Properties, alterations, and methods"
    },
    correct: "A"
},
{
    question: "In a program, what does a loop do?",
    answers: {
        A: "It attaches your CSS sheet to an HTML file through a series of loops",
        B: "It loops through all your code looking for spelling errors",
        C: "A loop performs instructions until a condition is met"
    },
    correct: "C"
}

];

// Timer function

function theTimer() {


    var timeIt = setInterval(function () {

        if (timeCount > 1) {
            quizTimer.textContent = timeCount + ' seconds remaining';
            timeCount--;

        }

        else if (timeCount === 1) {
            quizTimer.textContent = timeCount + ' seconds remaining';
        }
        else {
            quizTimer.textContent = '';
            clearInterval(timeIt);

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
                    `<label> 
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

    console.log("bob");

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

// Function for pagination

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


function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);

}

// Functions for player saving initials and score
function savedInitials() {
    var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("numAmount");
    if (!initials || !score) {
        return;
    }
    displayInitials.textContent = initials;
    displayInitials.textContent = score;
}

saveButton.addEventListener("click", function (event) {
    event.preventDefault();

    var playerName = document.querySelector("#initials").value;

    if (playerName === "") {
        displayMessage("error", "Initials can not be blank");
    } else {
        displayMessage("success", initials + numAmount);

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




