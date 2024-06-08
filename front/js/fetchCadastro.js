const registerEndPoint = "http://127.0.0.1:8000/registerUser";

var enviar = document.getElementById("enviar");

enviar.addEventListener('click', function(event) {
    event.preventDefault();
    fetchRegister();
});


function fetchRegister() {
    var username = document.getElementById("usuario").value
    var password = document.getElementById("senha").value

    jsonData = JSON.stringify({
        username : username,
        password : password
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
        }
    }).then(data => {
        alert("Cadastrado: " + data.username);
    }).catch(error => {
        Swal.fire({
            heightAuto: false,
            icon: 'error',
            title: 'Usuário já existe',
            text: 'Tente outro.',
        });
    });
}