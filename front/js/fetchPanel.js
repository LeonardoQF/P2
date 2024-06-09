let itemCount = 0;

function addItem() {
    let dataPokemon = localStorage.getItem('currentPokemon');
    if (typeof dataPokemon === 'string') {
        dataPokemon = JSON.parse(dataPokemon);
    }

    itemCount++;
    const panel = document.getElementById('scrollablePanel');
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" alt="mewtwo">
        <button class="remove-button" onclick="removeItem(this)">Remover</button>
        <div class="itens-info">
            <h3><strong>mewtwo</strong></h3>
            <p><strong>HP:</strong>106</p>
            <p><strong>Attack:</strong>110</p>
            <p><strong>Defense:</strong>90</p>
            <p><strong>Speed:</strong>130</p>
            <p><strong>Special Attack:</strong>154</p>
            <p><strong>Special Defense:</strong>90</p>
            <p><strong>Height:</strong>20</p>
            <p><strong>Weight:</strong>1220</p>
        </div>
    `;
    panel.appendChild(newItem);
}

function removeItem(button) {
    const item = button.parentElement;
    item.remove();
}

addItem()
addItem()
addItem()