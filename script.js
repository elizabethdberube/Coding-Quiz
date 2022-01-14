
var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var quizTimer = document.getElementById('timer');
var start = document.getElementById('start');

var activeChange = document.querySelectorAll(".activeChange");
var timeCount = 120;
let currentOne = 0;

// Array 
var questions = [{

    question: "question 1?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },

    correct: "c"
},
{
    question: "question 2?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },
    correct: "c"
},
{
    question: "question 3?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },
    correct: "c"
},
{
    question: "question 4?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },
    correct: "c"
},
{
    question: "question 5?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },
    correct: "c"
},

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


// loop and radio buttons
function setupCodeQuiz() {

    var output = [];

    questions.forEach(
        (theQuestion, questionAmount) => {

            var answers = [];

            for (letter in theQuestion.answers) {

                answers.push(
                    `<label> 
              <input type="radio" name="question${questionAmount}" value="${letter}">
              ${letter} :
              ${theQuestion.answers[letter]}
              </label>`
                );
            }

            output.push(
                `<div class="change"> <div class="question"> ${theQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>
        </div>`
            );
        }

    );

    quizBox.innerHTML = output.join('');

    for (element of document.querySelectorAll('.change')) {

        element.addEventListener("click", theResults)
    };
}

// Function for scoring 

function theResults() {
    var answersBox = quizBox.querySelectorAll('.answers');
    let numAmount = 0;
    var questionAmount = currentOne;

    var theQuestion = questions[currentOne];
    var answerBox = answersBox[questionAmount];
    var select = `input[name=question${questionAmount}]:checked`;
    var userInput = (answerBox.querySelector(select) || {}).value;

    if (userInput === theQuestion.correct) {

        numAmount++;

        answersBox[questionAmount].style.color = '#07f54e';

    }
    else {
        answersBox[questionAmount].style.color = 'red';
        timeCount -= 10;
    }


    resultsBox.innerHTML = `${numAmount} out of ${questions.length} correct`;
    showSlide(currentOne + 1);
}

// Function for pagination

function showSlide(n) {
    var changes = document.querySelectorAll(".change");
    console.log(changes);
    console.log(n);

    if (n == questions.length) {
        showScores();
        return;
    }
    if (currentOne >= 0) {
        changes[currentOne].classList.remove('activeChange');
    };
    changes[n].classList.add('activeChange');
    currentOne = n;




}



setupCodeQuiz();

start.addEventListener("click", function () {
    showSlide(0);
    theTimer();

});




