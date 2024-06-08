const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon";
var enviar = document.getElementById("enviar");

enviar.addEventListener('click', function (event) {
    event.preventDefault();
    fetchPokemon();
});

function fetchPokemon() {
    let pokemonName = document.getElementById("pokemon").value

    jsonData = JSON.stringify({
        pokemon : pokemonName
    });

    console.log(jsonData);

    const url = `${pokemonEndPoint}/${pokemonName}`

    fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            localStorage.setItem("dados", data);
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

