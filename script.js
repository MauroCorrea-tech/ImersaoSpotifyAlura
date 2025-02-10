const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

let debounceTimer;

// Dados de artistas (apenas os artistas mencionados)
let artistsData = [
    {
        "id": 1,
        "name": "Foo Fighters",
        "genre": "Rock",
        "urlImg": "https://i.scdn.co/image/ab67616100005174c884df599abc793c116cdf15"
    },
    {
        "id": 2,
        "name": "Michael Jackson",
        "genre": "Pop",
        "urlImg": "https://i.scdn.co/image/ab676161000051740e08ea2c4d6789fbf5cbe0aa"
    },
    {
        "id": 3,
        "name": "Emicida",
        "genre": "Hip Hop",
        "urlImg": "https://i.scdn.co/image/ab67616100005174908b4b4bc90e1518b68b4068"
    },
    {
        "id": 4,
        "name": "Chitãozinho e Xororó",
        "genre": "Sertanejo",
        "urlImg": "https://i.scdn.co/image/ab676161000051744606c59411c57f7b49588be4"
    },
    {
        "id": 5,
        "name": "Mc Coringa",
        "genre": "Funk",
        "urlImg": "https://i.scdn.co/image/ab67616d00001e02fe8f6dd361ad0f12b88c7f56"
    },
    {
        "id": 6,
        "name": "Arlindo Cruz",
        "genre": "Samba",
        "urlImg": "https://i.scdn.co/image/ab67616100005174181873f93056642d7b340839"
    },
    {
        "id": 7,
        "name": "Caetano Veloso",
        "genre": "MPB",
        "urlImg": "https://i.scdn.co/image/ab67616100005174e98de50f36cf1aa4bf047757"
    }
];

// Função de pesquisa
function requestApi(searchTerm) {
    // Convertendo o termo de pesquisa para minúsculas
    const lowerSearchTerm = searchTerm.toLowerCase();

    // Filtra artistas que possuem o nome ou gênero correspondente ao termo de pesquisa
    const result = artistsData.filter(artist =>
        artist.name.toLowerCase().includes(lowerSearchTerm) || 
        artist.genre.toLowerCase().includes(lowerSearchTerm)
    );

    displayResults(result);
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    // Limpar resultados anteriores antes de preencher novos
    artistName.innerText = '';
    artistImage.src = '';

    // Verifica se existem resultados e exibe
    if (result.length > 0) {
        result.forEach(element => {
            artistName.innerText = element.name; // Exibe o nome do artista
            if (element.urlImg) {
                artistImage.src = element.urlImg; // Exibe a imagem do artista, caso exista
            }
        });
        resultArtist.classList.remove('hidden');
    } else {
        artistName.innerText = "Nenhum resultado encontrado.";
        resultArtist.classList.remove('hidden');
    }
}

// Função de debounce para otimizar as buscas
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        // Realizando a requisição da API com o termo de pesquisa
        requestApi(searchTerm);
    }, 500); // Espera 500ms após o usuário parar de digitar
});