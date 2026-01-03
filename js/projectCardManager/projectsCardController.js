export function initProjectCard(cardId, images = []) {
    const card = document.getElementById(cardId);
    if (!card) {
        console.error(`Project card with id "${cardId}" not found`);
        return;
    }

    const cardContainer = card.closest('.card-container');
    if (!cardContainer) {
        console.error('Card container not found');
        return;
    }

    // Gallery setup
    const galleryImg = card.querySelector('.gallery-image');
    const prevBtn = card.querySelector('.gallery-arrow-left');
    const nextBtn = card.querySelector('.gallery-arrow-right');
    const indicatorsContainer = card.querySelector('.gallery-indicators');

    const cardBack = card.querySelector('.card-back');

    const CARD_TILT_DAMPENER = 45;
    let isMouseOverCard = false;

    let currentImageIndex = 0;
    let isFlipped = false;
    let isFlipping = false;  // NEW: Track flip animation state

    initIndicators();


    // Track mouse position over card
    cardContainer.addEventListener('mouseenter', () => {
        isMouseOverCard = true;
    });

    cardContainer.addEventListener('mouseleave', () => {
        isMouseOverCard = false;
    });

    // Capture scroll events when mouse is over card to improve ui responsiveness
    cardContainer.addEventListener('wheel', (e) => {
        if (isMouseOverCard && isFlipped && cardBack) {
            const hasScroll = cardBack.scrollHeight > cardBack.clientHeight;

            if (hasScroll) {
                e.preventDefault();
                e.stopPropagation();
                cardBack.scrollTop += e.deltaY;
            }
        }
    }, {passive: false});

    // Initialize gallery indicators
    function initIndicators() {
        if (!indicatorsContainer || images.length <= 1) return;
        indicatorsContainer.innerHTML = '';
        images.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'gallery-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(index);
            });
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Update image and indicators
    function showImage(index) {
        currentImageIndex = index;
        if (galleryImg) galleryImg.src = images[index];

        if (indicatorsContainer) {
            const indicators = indicatorsContainer.querySelectorAll('.gallery-indicator');
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
        }
    }

    // Navigation functions
    function nextImage(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }

    // Click to flip
    card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('.gallery-arrow') || e.target.closest('.gallery-indicator')) {
            return;
        }

        isFlipped = !isFlipped;
        isFlipping = true;

        // Reset tilt
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');

        // Toggle flip and apply transition class
        card.classList.toggle('flipped');
        card.classList.add('flipping');
        card.classList.remove('tilting', 'resetting');

        setTimeout(() => {
            isFlipping = false;
            card.classList.remove('flipping');
        }, 800);
    });

    // 3D Tilt effect on hover
    cardContainer.addEventListener('mousemove', (e) => {
        if (isFlipping) return;

        const rect = cardContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = (y - centerY) / CARD_TILT_DAMPENER;
        const tiltY = (centerX - x) / CARD_TILT_DAMPENER;

        // Just update CSS variables - CSS handles the rest
        card.style.setProperty('--tilt-x', `${tiltX}deg`);
        card.style.setProperty('--tilt-y', `${tiltY}deg`);

        card.classList.add('tilting');
        card.classList.remove('resetting');
    });

    // Reset tilt when mouse leaves
    cardContainer.addEventListener('mouseleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');

        card.classList.add('resetting');
        card.classList.remove('tilting');
    });

    function prevImage(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    }

    // Event listeners for gallery navigation
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
}