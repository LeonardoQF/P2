const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon";
const savePokemonUrl = "http://127.0.0.1:8000/addPokemon";
const enviar = document.getElementById("enviar");
const token = localStorage.getItem("token");
clearPokemon();

enviar.addEventListener('click', function (event) {
    event.preventDefault();
    fetchPokemon();
});

document.getElementById("pokemon-form").addEventListener("submit", function (event) {
    event.preventDefault();
    fetchPokemon();
});

function fetchPokemon() {
    let pokemonName = document.getElementById("pokemon").value.toLowerCase();

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
            console.error(error);
            Swal.fire({
                heightAuto: false,
                icon: 'error',
                title: 'Oops!',
                text: 'Pokémon não encontrado!',
            });
        });
}

function fetchSalvar() {
    let pokemonData = localStorage.getItem("currentPokemon");

    let objectPokemon = JSON.parse(pokemonData);

    const decodedToken = jwt_decode(token);
    const username = decodedToken.username;

    objectPokemon.username = username;

    const jsonData = JSON.stringify(objectPokemon);

    fetch(savePokemonUrl, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: jsonData
    }).then(response => {
        if (response.ok) return response.json();
        else {
            return response.text().then(errorMessage => {
                throw new Error(JSON.parse(errorMessage).detail);
            });
        }
    }).then(data => {
        Swal.fire({
            heightAuto: false,
            icon: "success",
            title: "adicionado",
            text: `Pokémon ${objectPokemon.name} adicionado com sucesso!`
        })
    }).catch(error => {
        Swal.fire({
            heightAuto: false,
            icon: "error",
            title: "Oops!",
            text: "Algo deu errado: " + error.message
        })
    })
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
        baseStats[stat.stat.name.replace('-', '_')] = stat.base_stat;
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
    container.style.marginTop = '105px';

    // Check if data and its properties exist to prevent errors
    if (data && data.baseStats) {
        pokemonInfo.innerHTML = `
            <img src="${data.imageUrl}" alt="${data.name}">
            <h3>${data.name}</h3>
            <p><strong>HP:</strong> ${data.baseStats.hp}</p>
            <p><strong>Attack:</strong> ${data.baseStats.attack}</p>
            <p><strong>Defense:</strong> ${data.baseStats.defense}</p>
            <p><strong>Speed:</strong> ${data.baseStats.speed}</p>
            <p><strong>Special Attack:</strong> ${data.baseStats["special_attack"]}</p>
            <p><strong>Special Defense:</strong> ${data.baseStats["special_defense"]}</p>
            <p><strong>Height:</strong> ${data.height}</p>
            <p><strong>Weight:</strong> ${data.weight}</p>
            <button class="btn btn-warning" type="button" id="salvar">Salvar Pokemon</button>
        `;

        const salvar = document.getElementById("salvar")

        salvar.addEventListener('click', function (event) {
            event.preventDefault();
            fetchSalvar();
        });
    } else {
        console.error("Invalid data or baseStats missing:", data);
        pokemonInfo.innerHTML = `<p>Error: Invalid Pokemon data</p>`;
    }
}

function clearPokemon() {
    localStorage.removeItem("currentPokemon");
}


