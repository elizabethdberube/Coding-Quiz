
var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var quizTimer = document.getElementById('timer');
var start = document.getElementById('start');
var changes = document.querySelectorAll(".change");
var activeChange = document.querySelectorAll(".active-change");
let currentOne = 0;

var questions = [{

    question: "question?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },

    correct: "c"
},
{
    question: "question?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },
    correct: "c"
},
{
    question: "question?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },
    correct: "c"
},
{
    question: "question?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },
    correct: "c"
},
{
    question: "question?",
    answers: {
        a: "answer",
        b: "answer",
        c: "answer"
    },
    correct: "c"
},

];




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




console.log(codeQuiz);
console.log(theResults);

codeQuiz();

start.addEventListener("click", function () {
    theSlide(0);
});

submit.addEventListener('click', theResults);


