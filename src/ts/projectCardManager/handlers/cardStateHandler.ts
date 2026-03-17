import type { ICardHandler } from '../interface';
import type { ICardState } from '../cardState';
import { readFlipDurationMs } from '../cardUtils';

/**
 * Sole responsibility: keep shared card state accurate.
 * All other handlers read state but never write it.
 *
 * Owned state fields:
 *   isMouseOverCard — updated via mouseenter / mouseleave on the container
 *   isFlipped       — toggled on each 'card-flip' event dispatched by FlipHandler
 *   isFlipping      — true for FLIP_DURATION_MS after each flip
 */
export class CardStateHandler implements ICardHandler {
    private readonly abortController = new AbortController();

    constructor(
        private readonly container: HTMLElement,
        private readonly card: HTMLElement,
        private readonly state: ICardState,
    ) {}

    init(): void {
        const { signal } = this.abortController;

        this.handleAllEvents(signal);
    }

    destroy(): void {
        //destroys all listeners
        this.abortController.abort();
    }

    // ========================== Private Helpers ==========================

    private handleAllEvents(signal: AbortSignal): void {
        this.handleMouseEnterEvent(signal);
        this.handleMouseLeaveEvent(signal);
        this.handleCardFlipEvent(signal);
    }

    private handleMouseEnterEvent(signal: AbortSignal): void {
        this.container.addEventListener('mouseenter', () => {
            this.state.isMouseOverCard = true;
        }, { signal });
    }

    private handleMouseLeaveEvent(signal: AbortSignal): void {
        this.container.addEventListener('mouseleave', () => {
            this.state.isMouseOverCard = false;
        }, { signal });
    }

    private handleCardFlipEvent(signal: AbortSignal): void {
        this.card.addEventListener('card-flip', () => {
            this.state.isFlipped = !this.state.isFlipped;
            this.state.isFlipping = true;
            this.card.classList.toggle('flipped');
            this.card.classList.add('flipping');

            setTimeout(() => {
                this.state.isFlipping = false;
                this.card.classList.remove('flipping');
            }, readFlipDurationMs(this.card));
        }, { signal });
    }
}