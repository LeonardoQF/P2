const loginEndPoint = "http://127.0.0.1:8000/login";
var enviar = document.getElementById("enviar");

enviar.addEventListener('click', function (event) {
    event.preventDefault();
    fetchLogin();
});

function fetchLogin() {
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
            Swal.fire({
                heightAuto: false,
                title: "Logado",
                text: "Usuário logado com sucesso. Bem vindo",
                icon: "success",
            }).then(() => {
            fetchHome();
            location.replace("http://127.0.0.1:5500/front/home.html");
            })
            // Redirect to home page with the token
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                heightAuto: false,
                icon: 'error',
                title: 'Usuário não encontrado',
                text: 'Verifique o login e senha',
            });
        });
}


const homeEndPoint = "http://127.0.0.1:5500/front/home.html";

function fetchHome() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token not found in localStorage");
        return;
    }
    console.log("Token found:", token);

    const url = `${homeEndPoint}?token=${token}`;

    fetch(url, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
}
