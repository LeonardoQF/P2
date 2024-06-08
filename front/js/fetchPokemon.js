const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon";
var enviar = document.getElementById("enviar");

enviar.addEventListener('click', function (event) {
    event.preventDefault();
    fetchPokemon();
});

function fetchPokemon() {
    let pokemonName = document.getElementById("pokemon").value.toLowerCase();

    jsonData = JSON.stringify({
        pokemon: pokemonName
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
            storePokemonInfo(data);
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}


function extractPokemonInfo(pokemonData) {
    // Parse the JSON data if it's a string
    if (typeof pokemonData === 'string') {
        pokemonData = JSON.parse(pokemonData);
    }

    const { name, stats, height, weight, sprites } = pokemonData;

    // Extract base stats
    const baseStats = {};
    stats.forEach(stat => {
        baseStats[stat.stat.name] = stat.base_stat;
    });

    // Extract front_default image URL
    const imageUrl = sprites?.front_default;

    return {
        name,
        baseStats,
        height,
        weight,
        imageUrl,
    };
}


function storePokemonInfo(pokemonData) {
    // Extract pokemon information using the previous function
    const pokemonInfo = extractPokemonInfo(pokemonData);

    // Stringify the pokemonInfo object before storing
    const stringifiedData = JSON.stringify(pokemonInfo);

    // Store data in local storage with a key (e.g., "currentPokemon")
    localStorage.setItem("currentPokemon", stringifiedData);
}

