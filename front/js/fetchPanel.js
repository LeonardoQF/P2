const urlAllPokemons = "http://127.0.0.1:8000/getAllPokemon";
let itemCount = 0;

function fetchAllPokemons() {
    fetch(urlAllPokemons, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
            throw new Error("Erro desconhecido");
        }
    }).then(data => {
        renderPokemons(data);
        console.log("data fetchada: " + data);
    }).catch(error => {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Erro desconhecido 😅"
        });

        console.log(error);
    });
}

function renderPokemons(pokemons) {
    const panel = document.getElementById('scrollablePanel');
    panel.innerHTML = ''; // Clear existing items

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }

    // Decode the token to get the username
    const decodedToken = jwt_decode(token);
    const loggedInUsername = decodedToken.username;

    pokemons.forEach(pokemon => {
        itemCount++;
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.innerHTML = `
            <img src="${pokemon.imageUrl}" alt="${pokemon.name}">
            ${pokemon.username === loggedInUsername ? `<button class="remove-button" onclick="removeItem('${pokemon.name}', '${pokemon.username}')">Remover</button>` : ''}
            <div class="itens-info">
                <h3><strong>${pokemon.name}</strong></h3>
                <p><strong>HP:</strong> ${pokemon.baseStats.hp}</p>
                <p><strong>Attack:</strong> ${pokemon.baseStats.attack}</p>
                <p><strong>Defense:</strong> ${pokemon.baseStats.defense}</p>
                <p><strong>Speed:</strong> ${pokemon.baseStats.speed}</p>
                <p><strong>Special Attack:</strong> ${pokemon.baseStats.special_attack}</p>
                <p><strong>Special Defense:</strong> ${pokemon.baseStats.special_defense}</p>
                <p><strong>Height:</strong> ${pokemon.height}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
                <p><strong>Usuário:</strong> ${pokemon.username === loggedInUsername ? `${pokemon.username} <strong>(você)<strong>` : `${pokemon.username}`}</p>
            </div>
        `;
        panel.appendChild(newItem);
    });
}

function removeItem(name, username) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }

    event.preventDefault();

    fetchRemove(name, username, token);
}

function fetchRemove(name, username, token) {
    const urlRemovePokemon = "http://127.0.0.1:8000/removePokemon";

    fetch(urlRemovePokemon, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, username })
    }).then(response => {
        if (response.ok) {
            // Successfully removed
            fetchAllPokemons(); // Refresh the list after removal
        } else {
            throw new Error("Erro ao remover o Pokémon");
        }
    }).catch(error => {
        Swal.fire({
            heightAuto: false,
            icon: "error",
            title: "Erro",
            text: error.message
        });
    });
}


const refreshButton = document.getElementById("refreshIcon");

refreshButton.addEventListener('click', function (event){
    fetchAllPokemons();
});

fetchAllPokemons();