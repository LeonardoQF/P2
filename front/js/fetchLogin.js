const loginEndPoint = "http://127.0.0.1:8000/login";

var nameInput = document.getElementById("usuario");
var passwordInput = document.getElementById('senha');
var enviar = document.getElementById("enviar");

enviar.addEventListener('click', function (event) {
    event.preventDefault();
    fetchLogin();
});

nameInput.addEventListener("input", function() {
    nameInput.setCustomValidity("");
});
passwordInput.addEventListener("input", function() {
    passwordInput.setCustomValidity("");
});

function fetchLogin() {
    if(!formValidation()) return;

    var username = nameInput.value;
    var password = passwordInput.value;

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

// Validar Formulário
function formValidation() {
    if(!validateName()) return false;
    if(!validatePass(true)) return false;
    return true;
}

// Validar Nome
function validateName() {
    if(nameInput.value == null || nameInput.value.trim().length <= 0) {
        nameInput.setCustomValidity("Nome inválido!");
        nameInput.reportValidity();
        return false;
    } else {
        nameInput.setCustomValidity("");
        return true;
    }
}

// Validar Senha
function validatePass(showMsg) {
    if(passwordInput.value == null || passwordInput.value.trim().length <= 0) {
        if(showMsg) {
            passwordInput.setCustomValidity("Senha inválida!");
            passwordInput.reportValidity();
        }
        return false;
    } else {
        passwordInput.setCustomValidity("");
        return true;
    }
}