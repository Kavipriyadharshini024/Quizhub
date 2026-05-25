const username = localStorage.getItem(
    "username"
);

const role = localStorage.getItem(
    "role"
);


document.getElementById(
    "username"
).innerText = username;


document.getElementById(
    "role"
).innerText = role;


function goBack() {

    if(role === "organization"){

        window.location.href =
            "admin.html";
    }

    else{

        window.location.href =
            "dashboard.html";
    }
}