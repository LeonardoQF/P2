const loginEndPoint = "http://127.0.0.1:8000/login";
var enviar = document.getElementById("enviar");

enviar.addEventListener('click', function (event) {
    event.preventDefault();
    fetchRegister();
});

function fetchRegister() {
    var username = document.getElementById("usuario").value;
    var password = document.getElementById("senha").value;

    jsonData = JSON.stringify({
        username: username,
        password: password
    });

    console.log(jsonData);

    fetch(loginEndPoint, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: jsonData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
            // Store token in localStorage
            localStorage.setItem("token", data.access_token);
            alert("Logado com sucesso!");
            // Redirect to home page with the token
            location.replace("http://127.0.0.1:8000/front/home.html");
        })
        .catch(error => {
            console.error(error);
        });
}


const homeEndPoint = "http://127.0.0.1:8000/front/home.html";

function fetchHome() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token not found in localStorage");
        return;
    }
    console.log("Token found:", token); // Add this line to check if token is present

    fetch(homeEndPoint, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}` // Include token in Authorization header
        },
    })
        .then(response => {
            // Handle response
        })
        .catch(error => {
            // Handle errors
        })
}
