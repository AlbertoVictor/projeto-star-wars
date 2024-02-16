let currentPageUrl = 'https://swapi.dev/api/films/';
window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
};
async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpa os resultados anteriores 
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/films/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"
            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"
            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.title}`
            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)
            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"
                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''
                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/films/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"
                modalContent.appendChild(characterImage)
                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.title}`
                modalContent.appendChild(name)
                const diretor = document.createElement("span")
                diretor.className = "character-details"
                diretor.innerText = `Diretor: ${character.director}`
                const episodio = document.createElement("span")
                episodio.className = "character-details"
                episodio.innerText = `Episódio: ${character.episode_id}`
                const produtor = document.createElement("span")
                produtor.className = "character-details"
                produtor.innerText = `Produtor: ${character.producer}`
                const lancamento = document.createElement("span")
                lancamento.className = "character-details"
                lancamento.innerText = `Lançamento: ${character.release_date}`
                modalContent.appendChild(diretor)
                modalContent.appendChild(episodio)
                modalContent.appendChild(produtor)
                modalContent.appendChild(lancamento)
            }
            const mainContent = document.getElementById('main-content');
            mainContent.appendChild(card);
        });
        // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');
        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        nextButton.style.visibility = responseJson.next ? "visible" : "hidden";

        currentPageUrl = url;
    } catch (error) {
        throw new Error('Erro ao carregar personagens');
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }