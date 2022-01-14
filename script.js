
var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var quizTimer = document.getElementById('timer');
var start = document.getElementById('start');
var changes = document.querySelectorAll(".change");
var activeChange = document.querySelectorAll(".active-change");
var timeCount = 120;
let currentOne = 0;

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

function theTimer() {


    var timeIt = setInterval(function () {

        if (timeCount > 1) {
            quizTimer.textContent = timeCount + 'seconds remaining';
            timeCount--;

        }

        else if (timeCount === 1) {
            quizTimer.textContent = timeCount + 'seconds remaining';
        }
        else {
            quizTimer.textContent = '';
            clearInterval(timeIt);


        }
    }, 1000);
}



function codeQuiz() {

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
                `<div class="change"> <div class="question"> ${theQuestion.questions} </div>
        <div class="answers"> ${answers.join('')} </div>
        </div>`
            );
        }

    );

    quizBox.innerHTML = output.join('');
}



function theResults() {
    var answersBox = quizBox.querySelectorAll('.answers');
    let numAmount = 0;

    questions.forEach((theQuestion, questionAmount) => {
        var answerBox = answersBox[questionAmount];
        var select = `input[name=question${questionAmount}]:checked`;
        var userInput = (answerBox.querySelector(select) || {}).value;

        if (userInput === theQuestion.correct) {

            numAmount++;

            answersBox[questionAmount].style.color = '#e7f709';

        }
        else {
            answersBox[questionAmount].style.color = 'red';
            timeCount - 10;
        }
    });

    resultsBox.innerHTML = `${numAmount} out of ${questions.length}`;

}


function theSlide(n) {

    changes[n].classList.add('activeChange');
    currentOne = n;
    if (currentOne >= 0) {
        changes[currentOne].classList.remove('activeChange');

    };
}



codeQuiz();


start.addEventListener("click", function () {
    theSlide(0), theTimer(), theResults();
});




