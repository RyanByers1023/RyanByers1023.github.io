import type { ICardHandler } from '../interface';
import type { ICardState } from '../cardState';


/** Duration of the flip animation in milliseconds */
const FLIP_DURATION_MS = 800;

/** determines how many pixels (from the right edge of the card) should be considered the scrollbar's space (does not flip card upon clicking in this **/
const SCROLLBAR_WIDTH = 40;



/**
 * Handles clicking on the card to flip it 180°.
 * Writes isFlipped and isFlipping to shared state so other handlers
 * (tilt, scroll) can react accordingly.
 */
export class FlipHandler implements ICardHandler {
    private readonly abortController = new AbortController();

    constructor(
        private readonly card: HTMLElement,
        private readonly state: ICardState
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
        this.state.isFlipped = !this.state.isFlipped;
        this.state.isFlipping = true;

        // Reset tilt before flipping (vars live on the container, not the card)
        const container = this.card.parentElement;
        if (container) {
            container.style.setProperty('--tilt-x', '0deg');
            container.style.setProperty('--tilt-y', '0deg');
        }

        //indicate there has been a flip
        this.card.classList.toggle('flipped');

        //indicate we are in the middle of a flip
        this.card.classList.add('flipping');

        //remove classes relating to tilting from the card
        this.card.classList.remove('tilting', 'resetting');

        //after FLIP_DURATION_MS, reset state to indicate the flip animation has completed
        setTimeout(() => {
            this.state.isFlipping = false;
            this.card.classList.remove('flipping');
        }, FLIP_DURATION_MS);
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