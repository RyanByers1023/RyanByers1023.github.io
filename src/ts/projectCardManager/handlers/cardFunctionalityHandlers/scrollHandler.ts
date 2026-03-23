import type { ICardHandler } from '@projectCardManager/interface';
import type { ICardState } from '@projectCardManager/cardState';

// ============================================================================
// SCROLL HANDLER - Scroll wheel support for the card back face
// ============================================================================

/**
 * Captures mouse wheel events on the card container and scrolls
 * the card back content when the card is flipped.
 * Reads isMouseOverCard from shared state (written by CardStateHandler).
 */
export class ScrollHandler implements ICardHandler {
    private readonly abortController = new AbortController();

    constructor(
        private readonly container: HTMLElement,
        private readonly cardBack: HTMLElement | null,
        private readonly state: ICardState
    ) {}

    init(): void {
        // No card back to scroll — nothing to do
        if (!this.cardBack) return;

        //narrow cardBack to HTMLElement type;
        const cardBack = this.cardBack; 
        const { signal } = this.abortController;

        this.container.addEventListener('wheel', (e: WheelEvent) => {
            if (this.userCanScroll()) {
                this.performScroll(e, cardBack);
            }
        }, { passive: false, signal });
    }

    destroy(): void {
        this.abortController.abort();
    }

    // ========================== Private Helpers ==========================

    private performScroll(e: WheelEvent, cardBack: HTMLElement): void {
        if (this.hasScrollableContent(cardBack)) {
            e.preventDefault();
            e.stopPropagation();
            this.scroll(e, cardBack);
        }
    }

    private hasScrollableContent(cardBack: HTMLElement){
        return (cardBack.scrollHeight > cardBack.clientHeight);
    }

    private userCanScroll() : boolean{
        return (this.state.isMouseOverCard && this.state.isFlipped && this.cardBack != null);
    }

    private scroll(e: WheelEvent, cardBack: HTMLElement){
        cardBack.scrollTop += e.deltaY;
    }
}