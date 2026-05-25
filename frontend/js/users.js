const API_URL = "http://127.0.0.1:8000";


/* ===================================
   CHECK ADMIN
=================================== */

const role = localStorage.getItem(
    "role"
);


if(role !== "admin"){

    window.location.href =
        "login.html";
}



/* ===================================
   LOAD USERS
=================================== */

async function loadUsers(){

    try{

        const response = await fetch(

            `${API_URL}/users/`
        );

        const users =
            await response.json();


        const table =
            document.getElementById(
                "userTable"
            );

        table.innerHTML = "";


        users.forEach((user)=>{

            table.innerHTML += `

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
            `;
        });

    }

    catch(error){

        console.log(error);
    }
}



/* ===================================
   ROUTING
=================================== */

function goDashboard(){

    window.location.href =
        "admin.html";
}

function goRequests(){

    window.location.href =
        "quiz-requests.html";
}

function goAnalytics(){

    window.location.href =
        "analytics.html";
}



/* ===================================
   LOGOUT
=================================== */

function logoutUser(){

    localStorage.clear();

    window.location.href =
        "login.html";
}


loadUsers();