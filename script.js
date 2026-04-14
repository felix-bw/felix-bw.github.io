function toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    const button = document.getElementById('toggle-btn');

    // Toggle class für Projektboxen
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.classList.toggle('light', isLight);
    });

    button.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'; // Icon wechseln

    // Speichere den Status im localStorage
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Beim Laden der Seite den gespeicherten Modus überprüfen
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        const button = document.getElementById('toggle-btn');
        button.innerHTML = '<i class="fas fa-moon"></i>'; // Icon für Light Mode
    }
    initGalleryCarousel();
};

function initGalleryCarousel() {
    const galleries = document.querySelectorAll('.gallery');
    if (!galleries.length || typeof Swiper === 'undefined') return;

    galleries.forEach(gallery => {
        const images = Array.from(gallery.querySelectorAll('img'));
        if (!images.length) return;

        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <button class="gallery-close" aria-label="Schließen"><i class="fas fa-times"></i></button>
            <div class="swiper gallery-swiper">
                <div class="swiper-wrapper"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
            </div>
        `;
        document.body.appendChild(modal);

        const wrapper = modal.querySelector('.swiper-wrapper');
        images.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            const slideImg = document.createElement('img');
            slideImg.src = img.src;
            slideImg.alt = img.alt || '';
            slide.appendChild(slideImg);
            wrapper.appendChild(slide);
        });

        const swiper = new Swiper(modal.querySelector('.gallery-swiper'), {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            keyboard: {
                enabled: true
            }
        });

        const closeButton = modal.querySelector('.gallery-close');
        const closeModal = () => modal.classList.remove('active');
        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', event => {
            if (event.target === modal) closeModal();
        });

        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                modal.classList.add('active');
                swiper.slideToLoop(index, 0, false);
            });
        });
    });
}

