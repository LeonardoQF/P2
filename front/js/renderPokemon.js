function carregaPokemon(data) {
  const pokemonInfo = document.getElementById("pokemon-info");

  const types = data.types.map(typeInfo => typeInfo.type.name).join(", ");
  const stats = data.stats.reduce((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
  }, {});

  pokemonInfo.innerHTML = `
      <img src="${data.img}" alt="${data.name}">
      <h3>${data.name}</h3>
      <p><strong>Type:</strong> ${types}</p>
      <p><strong>HP:</strong> ${stats.hp}</p>
      <p><strong>Attack:</strong> ${stats.attack}</p>
      <p><strong>Defense:</strong> ${stats.defense}</p>
      <p><strong>Speed:</strong> ${stats.speed}</p>
      <p><strong>Generation:</strong> ${data.generation || 'N/A'}</p>
      <p><strong>Legendary:</strong> ${data.legendary ? 'Yes' : 'No'}</p>

      <button type="button" id="enviar">Salvar</button>
  `;
}