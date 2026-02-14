/**
 * Initializes a project card with gallery functionality, 3D tilt and flip effects, and a custom scrollbar
 * @param cardId - The ID of the card element to initialize
 * @param images - Array of image URLs for the gallery
 */
export function initProjectCard(cardId: string, images: string[] = []): void {
    /** ========================== Initialize public variables ========================== **/
    const card = getCard();

    const cardContainer = getCardContainer(card);

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

    /** ========================== Initialize listeners ========================== **/

    initIndicators();

    initMousePositionListeners();

    initScrollWheelListeners();

    init3DHoverEffect();

    initGalleryControlListeners();

    initClickListeners();


    function initClickListeners(): void {
        // Card click handler, flips project card 180 degrees
        card.addEventListener('click', (e: MouseEvent) => {
            if(clickLocatedOnCard(e)){
                // click is valid, rotate this project card 180 degrees
                flipCard180(card);
            }
        });
    }

    function initGalleryControlListeners(): void {
        // Event listeners for gallery navigation
        if (prevBtn) prevBtn.addEventListener('click', prevImage);
        if (nextBtn) nextBtn.addEventListener('click', nextImage);
    }


    function init3DHoverEffect() : void {
        // 3D Tilt effect on hover
        cardContainer.addEventListener('mousemove', (e: MouseEvent) => {
            if (isFlipping || mouseIsOverScrollbar(e)) return;

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
    }

    /** Capture scroll events when mouse is over card **/
    function initScrollWheelListeners(): void {
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
    }

    /** Track mouse position (on/off) over card **/
    function initMousePositionListeners(){
        cardContainer.addEventListener('mouseenter', () => {
            isMouseOverCard = true;
        });

        cardContainer.addEventListener('mouseleave', () => {
            isMouseOverCard = false;
        });
    }

    /** retrieves and verifies a project card by the provided cardId parameter (string) **/
    function getCard() : HTMLElement{
        const card = document.getElementById(cardId);

        if (!card) {
            throw new Error(`Project card with id "${cardId}" not found`);
        }

        return card as HTMLElement;
    }

    /** retrieves and verifies the outer container for the card HTMLElement **/
    function getCardContainer(card: HTMLElement): HTMLElement {
        const cardContainer = card.closest('.card-container');
        if (!cardContainer) {
            throw new Error('Card container not found');
        }

        return cardContainer as HTMLElement;
    }

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
        // Calculate index of prev. image, avoid neg index:
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    }



    function clickLocatedOnCard(e: MouseEvent): boolean {
        // elements to NOT flip (return early) the card over upon clicking:
        //  1. hyperlinks
        //  2. gallery elements
        //  3. scrollbar located on card back side
        //  4. any other interactive element (ex: scrollbar)
        return !(mouseIsOverInteractable(e) || mouseIsOverScrollbar(e));
    }

    function mouseIsOverInteractable(e: MouseEvent) : boolean {
        const target = e.target as HTMLElement;

        const isOverInteractable = target.closest('a, button, .gallery-arrow, .gallery-indicator');

        return isOverInteractable instanceof HTMLElement;
    }

    function mouseIsOverScrollbar(e: MouseEvent): boolean {
        const mouseLocation = e.target as HTMLElement;
        const cardBack = mouseLocation.closest('.card-back');

        /** we are on the front side of the card, return early **/
        if (!(cardBack instanceof HTMLElement)) return false;

        /** get the space in which the entire backside of the card resides **/
        const rect = cardBack.getBoundingClientRect();

        const scrollBarWidth: number = 60;

        /** now get the space in which only the scrollbar resides **/
        const scrollbarRegion = rect.right - scrollBarWidth;

        /** determine whether the x component of the mouse position
         * relative to the card is on the left side of the scrollbar
         * (not over), or the right side (over) **/

        return (e.clientX > scrollbarRegion);
    }

    function flipCard180(card: HTMLElement) : void{
        // set global state values to indicate a flip is occurring
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
    }
}