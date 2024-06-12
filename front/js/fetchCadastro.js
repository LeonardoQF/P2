const registerEndPoint = "http://127.0.0.1:8000/registerUser";

var nameInput = document.getElementById("usuario");
var passwordInput = document.getElementById('senha');
var enviar = document.getElementById("enviar");

enviar.addEventListener('click', function(event) {
    event.preventDefault();
    fetchRegister();
});

nameInput.addEventListener("input", function() {
    nameInput.setCustomValidity("");
});
passwordInput.addEventListener("input", function() {
    passwordInput.setCustomValidity("");
});

function fetchRegister() {
    if(!formValidation()) return;

    var username = nameInput.value
    var password = passwordInput.value

    jsonData = JSON.stringify({
        username: username,
        password: password
    });

    console.log(jsonData);

    fetch(registerEndPoint, {
        method: 'POST',
        headers: {
            "Content-type" : "application/json"
        },
        body: jsonData
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else throw new Error();
    }).then(data => {
        Swal.fire({
            heightAuto: false,
            icon: 'success',
            title: 'Usuário Cadastrado!',
        }).then(() => {
            location.replace("./login.html")
        })
    }).catch(error => {
        Swal.fire({
            heightAuto: false,
            icon: 'error',
            title: 'Usuário já existe',
            text: 'Tente outro.',
        });
    });
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
        nameInput.setCustomValidity("Preencha com um nome!");
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
            passwordInput.setCustomValidity("Digite uma senha!");
            passwordInput.reportValidity();
        }
        return false;
    } else {
        passwordInput.setCustomValidity("");
        return true;
    }
}