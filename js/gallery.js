document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.gallery-lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentIndex = 0;

    // Filter functionality
    function filterGallery(category) {
        galleryItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.filter;
            filterGallery(category);
        });
    });

    // Lightbox functionality
    function openLightbox(index) {
        currentIndex = index;
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function navigateLightbox(direction) {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = galleryItems.length - 1;
        if (currentIndex >= galleryItems.length) currentIndex = 0;
        
        // Ensure we skip hidden items
        while (galleryItems[currentIndex].style.display === 'none') {
            currentIndex += direction;
            if (currentIndex < 0) currentIndex = galleryItems.length - 1;
            if (currentIndex >= galleryItems.length) currentIndex = 0;
        }
        
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
    }

    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Lightbox controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Close lightbox with Escape key
    window.addEventListener('keydown', function(e) {
        if (!lightbox?.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });

    // Click outside to close
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});