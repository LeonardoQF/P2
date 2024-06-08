const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon";
var enviar = document.getElementById("enviar");
clearPokemon();

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
            let dataPokemon = localStorage.getItem('currentPokemon');
            carregarPokemon(dataPokemon);
        })
        .catch(error => {
            console.error("error");
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Pokémon não encontrado!',
            });
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

function carregarPokemon(data) {
    // Parse the data if it's in string format
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    const pokemonInfo = document.getElementById("pokemon-details");
    const container = document.getElementById("search-container");

    pokemonInfo.style.borderStyle = 'solid';
    container.style.height = '690px';
    container.style.marginTop = '40px';

    // Check if data and its properties exist to prevent errors
    if (data && data.baseStats) {
        pokemonInfo.innerHTML = `
            <img src="${data.imageUrl}" alt="${data.name}">
            <h3>${data.name}</h3>
            <p><strong>HP:</strong> ${data.baseStats.hp}</p>
            <p><strong>Attack:</strong> ${data.baseStats.attack}</p>
            <p><strong>Defense:</strong> ${data.baseStats.defense}</p>
            <p><strong>Speed:</strong> ${data.baseStats.speed}</p>
            <p><strong>Special Attack:</strong> ${data.baseStats["special-attack"]}</p>
            <p><strong>Special Defense:</strong> ${data.baseStats["special-defense"]}</p>
            <p><strong>Height:</strong> ${data.height}</p>
            <p><strong>Weight:</strong> ${data.weight}</p>

            <button class="btn btn-warning" type="button" id="salvar">Salvar Pokemon</button>
        `;
    } else {
        console.error("Invalid data or baseStats missing:", data);
        pokemonInfo.innerHTML = `<p>Error: Invalid Pokemon data</p>`;
    }
}

function clearPokemon() {
    localStorage.removeItem("currentPokemon");
}