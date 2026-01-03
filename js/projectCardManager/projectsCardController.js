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
    let tiltX = 0;
    let tiltY = 0;


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
    }, { passive: false });

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

    function prevImage(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    }

    // Event listeners for gallery navigation
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);

    // Helper function to apply combined transforms
    function applyTransform() {
        if (isFlipping) return;

        const flipRotation = isFlipped ? 180 : 0;
        card.style.transform = `rotateY(${flipRotation + tiltY}deg) rotateX(${tiltX}deg) scale(1.02)`;
    }

    // Click to flip
    card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('.gallery-arrow') || e.target.closest('.gallery-indicator')) {
            return;
        }

        // Set flag FIRST, before any transform changes
        isFlipping = true;
        isFlipped = !isFlipped;
        tiltX = 0;
        tiltY = 0;

        card.classList.add('flipping');
        card.classList.remove('tilting', 'resetting');

        // This will be blocked by the isFlipping check in applyTransform
        const flipRotation = isFlipped ? 180 : 0;
        card.style.transform = `rotateY(${flipRotation}deg) rotateX(0deg) scale(1.02)`;

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

        tiltX = (y - centerY) / CARD_TILT_DAMPENER;
        tiltY = (centerX - x) / CARD_TILT_DAMPENER;

        card.classList.add('tilting');
        card.classList.remove('flipping', 'resetting');
        applyTransform();
    });

    // Reset tilt when mouse leaves
    cardContainer.addEventListener('mouseleave', () => {
        if (isFlipping) return;  // Don't interrupt flip

        tiltX = 0;
        tiltY = 0;

        card.classList.add('resetting');
        card.classList.remove('tilting', 'flipping');
        applyTransform();
    });

    // Initialize gallery if images provided
    if (images.length > 0) {
        initIndicators();
    }
}