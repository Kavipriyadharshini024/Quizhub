const API_URL = "http://127.0.0.1:8000";


/* ===================================
   REGISTER
=================================== */
async function registerUser() {

    const username = document
        .getElementById("username")
        .value
        .trim();

    const email = document
        .getElementById("email")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    const role = document
        .getElementById("role")
        .value;



    /* ==========================
       VALIDATION
    ========================== */

    if(

        username === "" ||
        email === "" ||
        password === ""

    ){

        alert(
            "Please fill all fields"
        );

        return;
    }


    if(!email.includes("@")){

        alert(
            "Enter valid email"
        );

        return;
    }


    if(password.length < 6){

        alert(
            "Password must contain minimum 6 characters"
        );

        return;
    }



    try {

        const response = await fetch(

            `${API_URL}/auth/register`,

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    username,
                    email,
                    password,
                    role
                })
            }
        );

        const data =
            await response.json();


        if(response.ok){

            alert(
                "Registration Successful"
            );

            window.location.href =
                "login.html";
        }

        else{

            alert(data.detail);
        }

    }

    catch(error){

        console.log(error);
    }
}


/* ===================================
   LOGIN
=================================== */

async function loginUser() {

    const email = document
        .getElementById("email")
        .value;

    const password = document
        .getElementById("password")
        .value;


    try {

        const response = await fetch(

            `${API_URL}/auth/login`,

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    email,
                    password
                })
            }
        );

        const data =
            await response.json();


        if(response.ok){

            localStorage.setItem(

                "user_id",

                data.user_id
            );

            localStorage.setItem(

                "username",

                data.username
            );

            localStorage.setItem(

                "email",

                data.email
            );

            localStorage.setItem(

                "role",

                data.role
            );


            alert(
                "Login Successful"
            );


            /* ==========================
               ROLE REDIRECTION
            ========================== */

            if(data.role === "admin"){

                window.location.href =
                    "admin.html";
            }

            else{

                window.location.href =
                    "dashboard.html";
            }
        }

        else{

            alert(data.detail);
        }

    }

    catch(error){

        console.log(error);
    }
}