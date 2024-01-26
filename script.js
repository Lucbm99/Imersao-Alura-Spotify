const searchInput = document.getElementById('search-input')
const resultsArtist = document.getElementById('result-artist')
const resultPlaylist = document.getElementById('result-playlists')
var searchTimeout;
    
    function requestApi(searchTerm) {
        const baseUrl = `http://localhost:3000/artists?name_like=${searchTerm}`;
    
        fetch(baseUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                if (result.length === 0) {
                    handleNoResults();
                } else {
                    displayResults(result);
                }
            })
            .catch((error) => {
                handleError(error);
            });
    }
    
    function handleNoResults() {
        alert("Artista não encontrado. Verifique o texto digitado e tente novamente.")
    }
    
    function handleError(error) {
        console.error(`Error: ${error.message}`);
    }


function displayResults(result) {

    resultPlaylist.classList.add('hidden')
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');
    const artistCategorie = document.getElementById('artist-categorie');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
        artistCategorie.innerText = element.genre;
    });

    resultsArtist.classList.remove('hidden')
}

// um ouvinte de evento à entrada de pesquisa
document.addEventListener('input', function() {
    // Limpa o tempo anterior
    clearTimeout(searchTimeout);

    // Define um novo tempo limite para acionar a solicitação após 2 segundos
    searchTimeout = setTimeout(function() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() !== '') {
            requestApi(searchTerm);
        }
    }, 2000); // 2000 milissegundos (2 segundos)
});
