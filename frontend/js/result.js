// frontend/js/result.js

const score =
    localStorage.getItem(
        "quizScore"
    );


const total =
    localStorage.getItem(
        "totalQuestions"
    );


document.getElementById(
    "scoreText"
).innerText =

    `Your Score: ${score}/${total}`;


function viewCertificate(){

    window.location.href =
        "certificate.html";
}