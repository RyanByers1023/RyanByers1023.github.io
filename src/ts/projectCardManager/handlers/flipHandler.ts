import type { ICardHandler } from '../interface';

/** determines how many pixels (from the right edge of the card) should be considered the scrollbar's space (does not flip card upon clicking in this **/
const SCROLLBAR_WIDTH = 40;

/**
 * Sole responsibility: detect valid flip clicks and dispatch 'card-flip'.
 * CardStateHandler owns all resulting state and class changes.
 */
export class FlipHandler implements ICardHandler {
    private readonly abortController = new AbortController();

    constructor(
        private readonly card: HTMLElement,
    ) {}

    init(): void {
        const { signal } = this.abortController;

        this.card.addEventListener('click', (e: MouseEvent) => {
            if (this.isClickOnInteractable(e)) return;
            if (this.isClickOnScrollbar(e)) return;

            this.flipCard();
        }, { signal });
    }

    destroy(): void {
        this.abortController.abort();
    }

    // ========================== Private Helpers ==========================

    private flipCard(): void {
        this.card.dispatchEvent(new CustomEvent('card-flip'));
    }

    /**
     * Returns true if the click target is an interactive element
     * (link, button, gallery control) that should NOT trigger a flip.
     */
    private isClickOnInteractable(e: MouseEvent): boolean {
        const target = e.target as HTMLElement;
        return target.closest('a, button, .gallery-arrow, .gallery-indicator') instanceof HTMLElement;
    }

    /**
     * Returns true if the click is in the scrollbar region of the card back.
     */
    private isClickOnScrollbar(e: MouseEvent): boolean {
        const target = e.target as HTMLElement;
        const cardBack = target.closest('.card-back');

        if (!(cardBack instanceof HTMLElement)) return false;

        const rect = cardBack.getBoundingClientRect();

        const scrollbar_area = rect.right - SCROLLBAR_WIDTH;

        return e.clientX > scrollbar_area;
    }
}