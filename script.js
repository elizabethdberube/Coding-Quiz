
var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var submit = document.getElementById('submit');


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
                `<div class="question"> ${theQuestion.questions} </div>
        <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );


    quizBox.innerHTML = output.join('');
}

submit.addEventListener('click', theResults);

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
console.log(codeQuiz);
console.log(theResults);

codeQuiz();





