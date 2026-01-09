/**
 * Initializes a project card with gallery functionality, 3D tilt and flip effects, and a custom scrollbar
 * @param cardId - The ID of the card element to initialize
 * @param images - Array of image URLs for the gallery
 */
export function initProjectCard(cardId: string, images: string[] = []): void {
    const card = document.getElementById(cardId);
    if (!card) {
        console.error(`Project card with id "${cardId}" not found`);
        return;
    }

    const cardContainer = card.closest('.card-container') as HTMLElement | null;
    if (!cardContainer) {
        console.error('Card container not found');
        return;
    }

    // Gallery setup
    const galleryImg = card.querySelector('.gallery-image') as HTMLImageElement | null;
    const prevBtn = card.querySelector('.gallery-arrow-left') as HTMLButtonElement | null;
    const nextBtn = card.querySelector('.gallery-arrow-right') as HTMLButtonElement | null;
    const indicatorsContainer = card.querySelector('.gallery-indicators') as HTMLElement | null;

    const cardBack = card.querySelector('.card-back') as HTMLElement | null;

    const CARD_TILT_DAMPENER: number = 45;
    let isMouseOverCard: boolean = false;

    let currentImageIndex: number = 0;

    // Track flip animation state
    let isFlipped: boolean = false;
    let isFlipping: boolean = false;

    initIndicators();

    // Track mouse position (on/off) over card
    cardContainer.addEventListener('mouseenter', () => {
        isMouseOverCard = true;
    });

    cardContainer.addEventListener('mouseleave', () => {
        isMouseOverCard = false;
    });

    // Capture scroll events when mouse is over card
    cardContainer.addEventListener('wheel', (e: WheelEvent) => {
        if (isMouseOverCard && isFlipped && cardBack) {
            const hasScroll: boolean = cardBack.scrollHeight > cardBack.clientHeight;

            if (hasScroll) {
                e.preventDefault();
                e.stopPropagation();
                cardBack.scrollTop += e.deltaY;
            }
        }
    }, { passive: false });

    /**
     * Initialize gallery indicators
     */
    function initIndicators(): void {
        if (!indicatorsContainer || images.length <= 1) return;
        indicatorsContainer.innerHTML = '';
        images.forEach((_, index: number) => {
            const indicator = document.createElement('div');
            indicator.className = 'gallery-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', (e: MouseEvent) => {
                e.stopPropagation();
                showImage(index);
            });
            indicatorsContainer.appendChild(indicator);
        });
    }

    /**
     * Update image and indicators
     * @param index - The index of the image to display
     */
    function showImage(index: number): void {
        currentImageIndex = index;
        if (galleryImg) galleryImg.src = images[index];

        if (indicatorsContainer) {
            const indicators = indicatorsContainer.querySelectorAll('.gallery-indicator');
            indicators.forEach((ind, i: number) => {
                ind.classList.toggle('active', i === index);
            });
        }
    }

    /**
     * Navigate to next image
     * @param e - Mouse event from click
     */
    function nextImage(e: MouseEvent): void {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }

    /**
     * Navigate to previous image
     * @param e - Mouse event from click
     */
    function prevImage(e: MouseEvent): void {
        e.stopPropagation();
        // Caluculate index of prev. image, avoid neg index:
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    }

    // Click to flip
    card.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // elements to NOT flip the card over upon clicking:
        //  1. hyperlinks
        //  2. gallery elements
        //  3. scrollbar located on card back side (TODO: find reference to scrollbar and put here)
        if (target.closest('a') || target.closest('.gallery-arrow') || target.closest('.gallery-indicator')) {
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
    cardContainer.addEventListener('mousemove', (e: MouseEvent) => {
        if (isFlipping) return;

        const rect: DOMRect = cardContainer.getBoundingClientRect();
        const x: number = e.clientX - rect.left;
        const y: number = e.clientY - rect.top;

        const centerX: number = rect.width / 2;
        const centerY: number = rect.height / 2;

        const tiltX: number = (y - centerY) / CARD_TILT_DAMPENER;
        const tiltY: number = (centerX - x) / CARD_TILT_DAMPENER;

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

    // Event listeners for gallery navigation
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
}