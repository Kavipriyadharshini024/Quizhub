const API_URL = "http://127.0.0.1:8000";

const urlParams = new URLSearchParams(window.location.search);

const quizId = urlParams.get("quiz");

let questions = [];

let currentQuestion = 0;

let selectedAnswers = [];

let score = 0;


/* =========================
   LOAD QUESTIONS
========================= */

async function fetchQuestions() {

    try {

        const response = await fetch(

            `${API_URL}/questions/${quizId}`
        );

        questions = await response.json();

        if (!questions.length) {

            alert("No questions found");

            return;
        }

        loadQuestion();

    } catch (error) {

        console.log(error);

        alert("Failed to load questions");
    }
}


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

    const question = questions[currentQuestion];

    document.getElementById(
        "questionNumber"
    ).innerText = `Q${currentQuestion + 1}.`;

    document.getElementById(
        "questionText"
    ).innerText = question.question;


    const optionsContainer =
        document.getElementById(
            "optionsContainer"
        );

    optionsContainer.innerHTML = "";


    const options = [

        question.option_1,
        question.option_2,
        question.option_3,
        question.option_4
    ];


    options.forEach((option) => {

        optionsContainer.innerHTML += `

            <label class="option">

                <input type="radio"
                       name="option"
                       value="${option}">

                ${option}

            </label>
        `;
    });
}


/* =========================
   SAVE ANSWER
========================= */

function saveAnswer() {

    const selected =
        document.querySelector(
            'input[name="option"]:checked'
        );

    if (selected) {

        selectedAnswers[currentQuestion] =
            selected.value;
    }
}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();
    }
}


/* =========================
   PREVIOUS QUESTION
========================= */

function prevQuestion() {

    saveAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();
    }
}


/* =========================
   TIMER
========================= */

let timeLeft = 600;

const timerInterval = setInterval(() => {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    document.getElementById(
        "timer"
    ).innerText =

        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;

    timeLeft--;

    if (timeLeft < 0) {

        clearInterval(timerInterval);

        submitQuiz();
    }

}, 1000);


/* =========================
   SUBMIT QUIZ
========================= */

function submitQuiz() {

    saveAnswer();

    score = 0;


    questions.forEach((question, index) => {

        if (

            selectedAnswers[index]
            === question.correct_answer

        ) {

            score++;
        }
    });


    /* =========================
       SAVE QUIZ DATA
    ========================= */

    localStorage.setItem(
        "quizScore",
        score
    );

    localStorage.setItem(
        "totalQuestions",
        questions.length
    );


    /* =========================
       SAVE QUIZ NAME
    ========================= */

    let quizName = "Quiz";


    if (quizId == 1) {

        quizName =
            "Cyber Security Fundamentals";
    }

    if (quizId == 2) {

        quizName =
            "Python Basics";
    }


    localStorage.setItem(
        "quizName",
        quizName
    );


    /* =========================
       CHECK SAVED VALUES
    ========================= */

    console.log(

        "Saved Score:",
        localStorage.getItem("quizScore")
    );

    console.log(

        "Saved Total:",
        localStorage.getItem("totalQuestions")
    );


    /* =========================
       REDIRECT
    ========================= */

    window.location.href =
        "result.html";
}

/* =========================
   INITIAL LOAD
========================= */

fetchQuestions();