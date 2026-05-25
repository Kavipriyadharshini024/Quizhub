// frontend/js/admin.js

const API_URL = "http://127.0.0.1:8000";


/* ====================================
   ADMIN AUTH CHECK
==================================== */

const role = localStorage.getItem(
    "role"
);


if(role !== "admin"){

    window.location.href =
        "login.html";
}


/* ====================================
   ADMIN NAME
==================================== */

const username = localStorage.getItem(
    "username"
);


document.getElementById(
    "adminHeading"
).innerText =

    `Welcome ${username} 👋`;


document.getElementById(
    "adminName"
).innerText = username;


/* ====================================
   ACTIVE SIDEBAR
==================================== */

function setActive(element){

    document.querySelectorAll(
        ".menu-item"
    ).forEach((item)=>{

        item.classList.remove(
            "active"
        );
    });

    element.classList.add(
        "active"
    );
}


/* ====================================
   DASHBOARD
==================================== */

async function showDashboard(element){

    if(element){

        setActive(element);
    }

    try{

        // FETCH QUIZZES
        const quizResponse = await fetch(

            `${API_URL}/quizzes/`
        );

        const quizzes =
            await quizResponse.json();


        // FETCH USERS
        const userResponse = await fetch(

            `${API_URL}/users/`
        );

        const users =
            await userResponse.json();


        // FETCH SCORES
        const scoreResponse = await fetch(

            `${API_URL}/scores/`
        );

        const scores =
            await scoreResponse.json();


        // TOTAL STUDENTS
        const totalStudents =
            users.filter(

                user => user.role !== "admin"
            ).length;


        // RENDER DASHBOARD
        document.getElementById(
            "contentArea"
        ).innerHTML = `

            <!-- CARDS -->

            <div class="cards">

                <div class="card">

                    <h3>
                        Total Users
                    </h3>

                    <h1>
                        ${totalStudents}
                    </h1>

                </div>

                <div class="card">

                    <h3>
                        Total Quizzes
                    </h3>

                    <h1>
                        ${quizzes.length}
                    </h1>

                </div>

                <div class="card">

                    <h3>
                        Platform Status
                    </h3>

                    <h1>
                        Active
                    </h1>

                </div>

            </div>


            <!-- PUBLISHED QUIZZES -->

            <div class="section">

                <h2>
                    Published Quizzes
                </h2>

                <table>

                    <thead>

                        <tr>

                            <th>
                                Quiz Name
                            </th>

                            <th>
                                Description
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${quizzes.map((quiz)=>`

                            <tr>

                                <td>
                                    ${quiz.quiz_name}
                                </td>

                                <td>
                                    ${quiz.description}
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>


            <!-- STUDENT ATTEMPTS -->

            <div class="analytics-section">

                <h2>
                    Student Attempts
                </h2>

                <table>

                    <thead>

                        <tr>

                            <th>User</th>

                            <th>Quiz</th>

                            <th>Score</th>

                            <th>Status</th>

                            <th>Attended</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${scores.map((item)=>`

                            <tr>

                                <td>
                                    ${item.username || item.user || "N/A"}
                                </td>

                                <td>
                                    ${item.quiz_name || item.quiz || "N/A"}
                                </td>

                                <td>
                                    ${item.score || "0"}
                                </td>

                                <td>
                                    ${item.status || "Pending"}
                                </td>

                                <td>
                                    ${item.attended || "Yes"}
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>

        `;

    }

    catch(error){

        console.log(error);

        document.getElementById(
            "contentArea"
        ).innerHTML = `

            <h2>
                Failed to load dashboard
            </h2>

        `;
    }
}

/* ====================================
   USERS
==================================== */

async function showUsers(element){

    setActive(element);

    try{

        const response = await fetch(

            `${API_URL}/users/`
        );

        const users =
            await response.json();


        const students =
            users.filter(

                user => user.role !== "admin"
            );


        document.getElementById(
            "contentArea"
        ).innerHTML = `

            <div class="section">

                <h2>
                    Registered Users
                </h2>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Username</th>

                            <th>Email</th>

                            <th>Role</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${students.map((user)=>`

                            <tr>

                                <td>
                                    ${user.user_id}
                                </td>

                                <td>
                                    ${user.username}
                                </td>

                                <td>
                                    ${user.email}
                                </td>

                                <td>
                                    ${user.role}
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>
        `;
    }

    catch(error){

        console.log(error);
    }
}



/* ====================================
   QUIZ REQUESTS
==================================== */

async function showQuizRequests(element) {

    setActive(element);

    try {

        const response = await fetch(
            `${API_URL}/quizzes/`
        );

        const quizzes = await response.json();

        document.getElementById(
            "contentArea"
        ).innerHTML = `

            <div class="section">

                <h2>Quiz Requests</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Quiz</th>
                            <th>Description</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${quizzes.map((quiz) => `

                            <tr>

                                <td>${quiz.quiz_name}</td>

                                <td>${quiz.description}</td>

                                <td>Published</td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>
        `;

    } catch (error) {

        console.log(error);

        document.getElementById(
            "contentArea"
        ).innerHTML = `

            <h2>Failed to load quiz requests</h2>

        `;
    }
}

/* ====================================
   ANALYTICS
==================================== */

async function showAnalytics(element){

    setActive(element);

    const response = await fetch(

        `${API_URL}/quizzes/`
    );

    const quizzes =
        await response.json();


    document.getElementById(
        "contentArea"
    ).innerHTML = `

        <div class="cards">

            <div class="card">

                <h3>
                    Total Quizzes
                </h3>

                <h1>
                    ${quizzes.length}
                </h1>

            </div>

            <div class="card">

                <h3>
                    Quiz Attempts
                </h3>

                <h1>
                    25
                </h1>

            </div>

            <div class="card">

                <h3>
                    Certificates Issued
                </h3>

                <h1>
                    12
                </h1>

            </div>

        </div>
    `;
}



/* ====================================
   ACTIVITY LOGS
==================================== */

function showLogs(element){

    setActive(element);

    document.getElementById(
        "contentArea"
    ).innerHTML = `

        <div class="section">

            <h2>
                Activity Logs
            </h2>

            <div class="log-item">

                Admin logged into system

            </div>

            <div class="log-item">

                New quiz published

            </div>

            <div class="log-item">

                Student attended quiz

            </div>

            <div class="log-item">

                Certificate generated

            </div>

        </div>
    `;
}



/* ====================================
   LOGOUT
==================================== */

function logoutUser(){

    localStorage.clear();

    window.location.href =
        "login.html";
}
const attemptsTable = document.getElementById("attemptsTable");

fetch("http://127.0.0.1:8000/scores/")

.then(response => response.json())

.then(data => {

    attemptsTable.innerHTML = "";

    data.forEach(item => {

        attemptsTable.innerHTML += `

            <tr>

                <td>${item.user}</td>

                <td>${item.quiz}</td>

                <td>${item.score}</td>

                <td>${item.status}</td>

                <td>${item.attended}</td>

            </tr>
        `;
    });

});


/* ====================================
   DEFAULT PAGE
==================================== */

showDashboard();