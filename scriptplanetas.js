let currentPageUrl = 'https://swapi.dev/api/planets/';
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
async function loadCharacters(url){
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML =''; // Limpa os resultados anteriores 
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`
            card.className ="cards"
            const characterNameBG = document.createElement("div")
            characterNameBG.className ="character-name-bg"
            const characterName = document.createElement("span")
            characterName.className ="character-name"
            characterName.innerText =`${character.name}`
            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)
            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility ="visible"
                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML =''
                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage =`url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className ="character-image"
                const name = document.createElement("span")
                name.className ="character-details"
                name.innerText =`Nome: ${character.name}`
                const clima = document.createElement("span")
                clima.className ="character-details"
                clima.innerText =`Clima: ${character.climate}`
                const terreno = document.createElement("span")
                terreno.className ="character-details"
                terreno.innerText =`Terreno: ${character.terrain}`
                const populacao = document.createElement("span")
                populacao.className ="character-details"
                populacao.innerText =`População: ${character.population}`
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(clima)
                modalContent.appendChild(terreno)
                modalContent.appendChild(populacao)
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
async function loadNextPage() {
    if (!currentPageUrl) return;
    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();
        await loadCharacters(responseJson.next);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
    }
}
async function loadPreviousPage() {
    if (!currentPageUrl) return;
    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.previous);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}
function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }