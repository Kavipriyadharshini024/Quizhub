const API_URL = "http://192.168.5.24/api";


const userId = localStorage.getItem(
    "user_id"
);


/* ===================================
   LOAD ATTEMPT HISTORY
=================================== */

async function loadHistory() {

    try {

        const response = await fetch(

            `${API_URL}/attempts/${userId}`
        );

        const attempts =
            await response.json();


        let html = "";


        if (attempts.length === 0) {

            html = `

                <h2>
                    No Quiz Attempts Yet
                </h2>
            `;
        }

        else {

            attempts.forEach((attempt) => {

                html += `

                    <div class="quiz-item">

                        <div class="quiz-left">

                            <div class="quiz-icon">

                                📘

                            </div>

                            <div>

                                <h3>

                                    ${attempt.quiz_name}

                                </h3>

                                <p>

                                    Score:
                                    ${attempt.score}

                                </p>

                                <small>

                                    ${attempt.result}

                                </small>

                            </div>

                        </div>

                    </div>
                `;
            });
        }


        document.getElementById(
            "quizHistory"
        ).innerHTML = html;

    }

    catch(error){

        console.log(error);
    }
}


loadHistory();