/**
 * All DOM elements needed by card handlers, resolved once during
 * ProjectCardManager construction.
 */
export interface CardElements {
    /** The card-flip element (identified by project id) */
    card: HTMLElement;

    /** The outer .card-container wrapping the card */
    container: HTMLElement;

    /** The .card-back face (null if not found) */
    cardBack: HTMLElement | null;

    /** The gallery <img> element (null if gallery not found) */
    galleryImg: HTMLImageElement | null;

    /** Previous image navigation button (null if not found) */
    prevBtn: HTMLButtonElement | null;

    /** Next image navigation button (null if not found) */
    nextBtn: HTMLButtonElement | null;

    /** Container for gallery dot indicators (null if not found) */
    indicatorsContainer: HTMLElement | null;
}

/**
 * Resolves and validates all DOM elements for a given card ID.
 * Throws if the card or its container cannot be found.
 */
export function resolveCardElements(cardId: string): CardElements {
    const card = document.getElementById(cardId);
    if (!card) {
        throw new Error(`Project card with id "${cardId}" not found`);
    }

    const container = card.closest('.card-container') as HTMLElement;
    if (!container) {
        throw new Error(`Card container not found for card "${cardId}"`);
    }

    return {
        card,
        container,
        cardBack: card.querySelector('.card-back'),
        galleryImg: card.querySelector('.gallery-image'),
        prevBtn: card.querySelector('.gallery-arrow-left'),
        nextBtn: card.querySelector('.gallery-arrow-right'),
        indicatorsContainer: card.querySelector('.gallery-indicators'),
    };
}