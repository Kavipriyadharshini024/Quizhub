// =====================================
// GET STORED DATA
// =====================================

const username =
    localStorage.getItem("username");

const quizName =
    localStorage.getItem("quizName");

const score =
    Number(
        localStorage.getItem("quizScore")
    );

const total =
    Number(
        localStorage.getItem("totalQuestions")
    );


// =====================================
// VALIDATION
// =====================================

if (

    !quizName ||

    total === 0 ||

    score === null ||

    score === undefined

){

    alert(

        "You are not eligible to view certificate"
    );

    window.location.href =
        "dashboard.html";
}


/* =====================================
   PERCENTAGE
===================================== */

const percentage = Math.round(

    (score / total) * 100
);


/* =====================================
   PASS CHECK
===================================== */

if(percentage < 50){

    alert(

        "Certificate available only after passing the quiz"
    );

    window.location.href =
        "result.html";
}


/* =====================================
   DISPLAY DATA
===================================== */

document.getElementById(
    "studentName"
).innerText = username;


document.getElementById(
    "quizName"
).innerText = quizName;


document.getElementById(
    "scoreText"
).innerText = `${percentage}%`;


/* =====================================
   BACK BUTTON
===================================== */

function goDashboard(){

    window.location.href =
        "dashboard.html";
}