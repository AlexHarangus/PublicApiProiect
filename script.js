document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://picsum.photos/v2/list';
    const gallery = document.getElementById('gallery');
    const authorDropdown = document.getElementById('authorDropdown');
    let photos = [];

    async function fetchPhotos() {
        try {
            const response = await fetch(apiUrl);
            photos = await response.json();
            displayPhotos(photos);
            populateDropdown(photos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    }

    function displayPhotos(photos) {
        gallery.innerHTML = '';
        photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card';
            photoCard.innerHTML = `
                <img src="${photo.download_url}" alt="${photo.author}">
                <div class="author">${photo.author}</div>
                <div class="body-text">Static body text</div>
            `;
            gallery.appendChild(photoCard);
        });
    }

    function populateDropdown(photos) {
        const authors = [...new Set(photos.map(photo => photo.author))];
        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorDropdown.appendChild(option);
        });
    }

    authorDropdown.addEventListener('change', () => {
        const selectedAuthor = authorDropdown.value;
        const filteredPhotos = selectedAuthor ? photos.filter(photo => photo.author === selectedAuthor) : photos;
        displayPhotos(filteredPhotos);
    });

    fetchPhotos();
});
