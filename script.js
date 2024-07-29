const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        try {
            const data = await searchSpotify(searchTerm);
            displayResults(data.tracks.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});

function displayResults(tracks) {
    resultsContainer.innerHTML = '';
    tracks.forEach(track => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';
        card.innerHTML = `
            <div class="card">
                <img src="${track.album.images[0].url}" class="card-img-top" alt="${track.name}">
                <div class="card-body">
                    <h5 class="card-title">${track.name}</h5>
                    <p class="card-text">${track.artists[0].name}</p>
                    <audio controls>
                        <source src="${track.preview_url}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}