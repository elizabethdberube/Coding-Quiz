
var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var quizTimer = document.getElementById('timer');
var start = document.getElementById('start');

var activeChange = document.querySelectorAll(".activeChange");
var timeCount = 120;
let currentOne = 0;

// Questions array 
var questions = [{

    question: "What are variables an example of?",
    answers: {
        A: "How colors can vary from screen to screen",
        B: "The speed variable",
        C: "Programming identifiers"
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



    }
    else {

        timeCount -= 10;
    }


    resultsBox.innerHTML = `${numAmount} out of ${questions.length} correct`;
    answersBox[questionAmount].style.color = '';
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




