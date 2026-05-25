// frontend/js/dashboard.js

const API_URL = "http://192.168.5.24/api";

/* ====================================
   USER AUTH
==================================== */

const role = localStorage.getItem("role");

if (role !== "student") {
    window.location.href = "login.html";
}

/* ====================================
   USER DATA
==================================== */

const username = localStorage.getItem("username") || "Student";

document.getElementById("welcomeHeading").innerText =
    `Welcome back, ${username} 👋`;

document.getElementById("profileName").innerText = username;

document.getElementById("profileCircle").innerText =
    username.charAt(0).toUpperCase();

/* ====================================
   ACTIVE SIDEBAR
==================================== */

function setActive(element) {

    document.querySelectorAll(".menu-item")
        .forEach((item) => {
            item.classList.remove("active");
        });

    element.classList.add("active");
}

/* ====================================
   DASHBOARD
==================================== */

async function showDashboard(element) {

    if (element) {
        setActive(element);
    }

    try {

        const response = await fetch(`${API_URL}/quizzes/`);

        const quizzes = await response.json();

        document.getElementById("contentArea").innerHTML = `

            <div class="cards">

                <div class="card">
                    <h3>Available Quizzes</h3>
                    <h1>${quizzes.length}</h1>
                </div>

                <div class="card">
                    <h3>Quiz Status</h3>
                    <h1>Active</h1>
                </div>

                <div class="card">
                    <h3>Performance</h3>
                    <h1>Good</h1>
                </div>

            </div>

            <div class="section">

                <h2>Latest Quizzes</h2>

                ${quizzes.map((quiz) => `

                    <div class="quiz-card">

                        <div>

                            <h3>${quiz.quiz_name}</h3>

                            <p>${quiz.description}</p>

                        </div>

                        <button class="quiz-btn"
                                onclick="startQuiz(${quiz.quiz_id})">

                            Attend Quiz

                        </button>

                    </div>

                `).join("")}

            </div>
        `;

    } catch (error) {

        console.log(error);

        document.getElementById("contentArea").innerHTML = `
            <h2>Failed to load quizzes</h2>
        `;
    }
}

/* ====================================
   AVAILABLE QUIZZES
==================================== */

async function showAvailableQuizzes(element) {

    setActive(element);

    try {

        const response = await fetch(`${API_URL}/quizzes/`);

        const quizzes = await response.json();

        document.getElementById("contentArea").innerHTML = `

            <div class="section">

                <h2>Available Quizzes</h2>

                ${quizzes.map((quiz) => `

                    <div class="quiz-card">

                        <div>

                            <h3>${quiz.quiz_name}</h3>

                            <p>${quiz.description}</p>

                        </div>

                        <button class="quiz-btn"
                                onclick="startQuiz(${quiz.quiz_id})">

                            Start Quiz

                        </button>

                    </div>

                `).join("")}

            </div>
        `;

    } catch (error) {

        console.log(error);

        document.getElementById("contentArea").innerHTML = `
            <h2>Failed to load quizzes</h2>
        `;
    }
}

/* ====================================
   RESULTS
==================================== */

function showResults(element) {

    setActive(element);

    const latestQuiz =
        localStorage.getItem("quizName") || "Quiz";

    const score =
        localStorage.getItem("quizScore") || 0;

    const total =
        localStorage.getItem("totalQuestions") || 0;

    const status =
        Number(score) >= Number(total) / 2
            ? "Passed"
            : "Failed";

    document.getElementById("contentArea").innerHTML = `

        <div class="section">

            <h2>Quiz Results</h2>

            <table>

                <thead>

                    <tr>
                        <th>Quiz</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td>${latestQuiz}</td>
                        <td>${score} / ${total}</td>
                        <td>${status}</td>
                    </tr>

                </tbody>

            </table>

        </div>
    `;
}

/* ====================================
   CERTIFICATES
==================================== */

function showCertificates(element) {

    setActive(element);

    const latestQuiz =
        localStorage.getItem("quizName") || "Quiz";

    document.getElementById("contentArea").innerHTML = `

        <div class="card">

            <h2>Certificates</h2>

            <div class="certificate-card">

                <div class="certificate-info">

                    <h3>${latestQuiz} Certificate</h3>

                    <p>
                        Successfully completed the quiz.
                    </p>

                </div>

                <button class="certificate-btn"
                        onclick="downloadCertificate()">

                    Download Certificate

                </button>

            </div>

        </div>
    `;
}

/* ====================================
   PROFILE
==================================== */

function showProfile(element) {

    setActive(element);

    document.getElementById("contentArea").innerHTML = `

        <div class="section">

            <h2>My Profile</h2>

            <table>

                <tr>
                    <th>Username</th>
                    <td>${username}</td>
                </tr>

                <tr>
                    <th>Role</th>
                    <td>Student</td>
                </tr>

            </table>

        </div>
    `;
}

/* ====================================
   HELP
==================================== */

function showHelp(element) {

    setActive(element);

    document.getElementById("contentArea").innerHTML = `

        <div class="section">

            <h2>Help & Support</h2>

            <div class="help-box">
                📧 support@quizhub.com
            </div>

            <div class="help-box">
                ☎ +91 9876543210
            </div>

        </div>
    `;
}

/* ====================================
   START QUIZ
==================================== */

function startQuiz(quizId) {

    localStorage.setItem("quiz_id", quizId);

    window.location.href =
        `quiz.html?quiz=${quizId}`;
}

/* ====================================
   DOWNLOAD CERTIFICATE
==================================== */

function downloadCertificate() {

    window.location.href = "certificate.html";
}

/* ====================================
   LOGOUT
==================================== */

function logoutUser() {

    localStorage.clear();

    window.location.href = "login.html";
}

/* ====================================
   DEFAULT PAGE
==================================== */

showDashboard();