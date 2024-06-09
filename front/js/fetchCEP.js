const enviar = document.getElementById("enviar");
const inputCep = document.getElementById("cep")
enviar.addEventListener("click", (event) => {
    event.preventDefault();
    const cep = inputCep.value.trim();
    cep.replace("-", "");
    fetchCepInfo(cep);
});

function fetchCepInfo(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error("CEP inválido ou inexistente");
        })
        .then(data => {
            console.log(data);
            logradouro.textContent = `Logradouro: ${data.logradouro}`;
            cepInfo.textContent = `CEP: ${data.cep}`;
            bairro.textContent = `Bairro: ${data.bairro}`;
            localidade.textContent = `Localidade: ${data.localidade}`;
            uf.textContent = `UF: ${data.uf}`;

            // Show the table container
            document.getElementById("table-container").style.display = "block";
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error.message);
            Swal.fire({
                heightAuto: false,
                icon : "error",
                title : "Erro",
                text : "CEP inválido ou inexistente."
            })
        });
}
