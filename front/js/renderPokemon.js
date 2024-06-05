function carregaPokemon(pokemon){


    const button = document.getElementById("");


    cardPokemon = document.createElement('div');

    cardPokemon.innerHTML = `
  <img src="img_avatar.png" alt="Avatar" style="width:100%">
  <div class="container">
    <h4><b>John Doe</b></h4>
    <p>Architect & Engineer</p>
  </div>
    `
}


carregaPokemon();