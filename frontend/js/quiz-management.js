const API_URL = "http://192.168.5.24/api";


const quizId = localStorage.getItem(
    "quiz_id"
);


/* ===================================
   LOAD QUESTIONS
=================================== */

async function loadQuestions() {

    try {

        const response = await fetch(

            `${API_URL}/questions/${quizId}`
        );

        const questions =
            await response.json();


        let html = "";


        questions.forEach((question,index)=>{

            html += `

                <div class="question-card">

                    <h3>

                        Q${index + 1}.
                        ${question.question}

                    </h3>

                    <br>

                    <p>

                        ✔ ${question.correct_answer}

                    </p>

                </div>
            `;
        });


        document.getElementById(
            "questionList"
        ).innerHTML = html;

    }

    catch(error){

        console.log(error);
    }
}


/* ===================================
   ADD QUESTION
=================================== */

async function addQuestion() {

    const question =
        document.getElementById(
            "question"
        ).value;

    const option_1 =
        document.getElementById(
            "option1"
        ).value;

    const option_2 =
        document.getElementById(
            "option2"
        ).value;

    const option_3 =
        document.getElementById(
            "option3"
        ).value;

    const option_4 =
        document.getElementById(
            "option4"
        ).value;

    const correct_answer =
        document.getElementById(
            "correct_answer"
        ).value;

    const marks =
        document.getElementById(
            "marks"
        ).value;


    try {

        const response = await fetch(

            `${API_URL}/questions/create`,

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    quiz_id:quizId,

                    question,
                    option_1,
                    option_2,
                    option_3,
                    option_4,
                    correct_answer,
                    marks
                })
            }
        );


        const data =
            await response.json();


        alert(data.message);

        loadQuestions();

    }

    catch(error){

        console.log(error);
    }
}


/* ===================================
   BACK
=================================== */

function goBack() {

    window.location.href =
        "admin.html";
}


loadQuestions();