import type { ICardHandler } from '../interface';
import type { ICardState } from '../cardState';

// ============================================================================
// SCROLL HANDLER - Scroll wheel support for the card back face
// ============================================================================

/**
 * Captures mouse wheel events on the card container and scrolls
 * the card back content when the card is flipped.
 * Also tracks whether the mouse is currently over the card (isMouseOverCard).
 */
export class ScrollHandler implements ICardHandler {
    private readonly abortController = new AbortController();

    constructor(
        private readonly container: HTMLElement,
        private readonly cardBack: HTMLElement | null,
        private readonly state: ICardState
    ) {}

    init(): void {
        const { signal } = this.abortController;

        this.initMouseEnterListener(signal);

        this.initMouseLeaveListener(signal);

        this.initScrollBarListener(signal);
    }

    destroy(): void {
        this.abortController.abort();
    }

    // ========================== Private Helpers ==========================

    // Intercept scroll wheel events when card back is showing
    private initScrollBarListener(signal: AbortSignal): void {
        this.container.addEventListener('wheel', (e: WheelEvent) => {
            if (this.state.isMouseOverCard && this.state.isFlipped && this.cardBack) {
                this.performScroll(e, this.cardBack);
            }
        }, { passive: false, signal });
    }

    // Track mouse entering / leaving the card container
    private initMouseEnterListener(signal: AbortSignal): void {
        this.container.addEventListener('mouseenter', () => {
            this.state.isMouseOverCard = true;
        }, { signal });
    }

    private initMouseLeaveListener(signal: AbortSignal): void {
        this.container.addEventListener('mouseleave', () => {
            this.state.isMouseOverCard = false;
        }, { signal });
    }

    private performScroll(e: WheelEvent, cardBack: HTMLElement): void {
        const hasScrollableContent = cardBack.scrollHeight > cardBack.clientHeight;

        if (hasScrollableContent) {
            e.preventDefault();
            e.stopPropagation();
            cardBack.scrollTop += e.deltaY;
        }
    }
}