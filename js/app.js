/*********************** Model **********************/

var questions = [
    {
        question: "Which team does Aaron Hadlow ride for?",
        choices: ['Best', 'North', 'Slingshot', 'Cabrinah'],
        correct: 1
    },
    {
        question: "Who jumped off Richard Bransons house?",
        choices: ['Nick Jacobsen', 'Aaron Hadlow', 'Sam Light', 'Jesse Richman'],
        correct: 0
    },
    {
        question: "Which team does Eric Rienstra ride for?",
        choices: ['Best', 'North', 'Slingshot', 'Cabrinah'],
        correct: 2
    }
]

function correctAnswerForQuestion(question) {
    return questions[question].correct
}

var score = 0;
var questionNumber = 0;


/*********************** View ***********************/

function hideIntroShowQuiz() {
    $('.introBox').hide();
    $('.resultsBox').hide();
    $('.questionBox').show();
    setupQuestion();
}

function hideQuizShowResults() {
    $('.questionBox').hide();
    $('.introBox').hide();
    $('.resultsBox').show();
    $('.result').append("<p>Congratulations you scored </p>" + score + "<p> out of </p>" + questions.length);
}



function setupQuestion() {
    $('#question').text(questions[questionNumber].question);
    $('#questionNumber').text(questionNumber);
    $('#choices').empty();
    var choiceTotal = questions[questionNumber].choices.length;
    for (var i = 0; i < choiceTotal; i++) {
        //displays the answer choices
        $('#choices').append("<input type='radio' class='option' name='option' value=" + i + "> " + questions[questionNumber].choices[i] + " <br>");
    }
}

// I am not sure if this is the correct placement of the "Document Ready" function.
$(document).ready(function () {
    $('.questionBox').hide();
    $('.resultsBox').hide();
    $('.introBox').show();
    $('#continueToQuiz').on('click', hideIntroShowQuiz);
});


/********************* Controller *******************/

var questionNumber = 0;


function checkAnswer(userAnswer) {
    if (userAnswer == correctAnswerForQuestion(questionNumber)) {
        score++;
        console.log("score++");
    } else {
        //incorrect answer
    }
}

function userAnswer() {
    var answer = $("input[class='option']:checked").val();
    return answer;
}

function validateAnswer() {
    var answer = userAnswer();
    if (typeof answer == 'undefined') {
        answer = 0;
    } else {
        answer = 1;
    }
    return answer;
}

function submitButtonPressed() {
    var validAnswer = validateAnswer();
    if (!validAnswer) {
        // No answer selected
        alert('Please select an answer.');
    } else {
        checkAnswer(userAnswer());
        if (questionNumber < (questions.length - 1)) {
            questionNumber++;
            setupQuestion();
        } else {
            console.log('Hide Quiz');
            hideQuizShowResults();
        }
    }
}

$(document).on('click', '#submitAnswer', submitButtonPressed);
