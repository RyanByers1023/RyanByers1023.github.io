import type { ICardHandler } from '../interface';
import type { ICardState } from '../cardState';

/**
 * Applies a 3D tilt effect to the card based on mouse position.
 * Reads isFlipping from shared state to suppress tilt during flip animations.
 * Uses CSS custom properties (--tilt-x, --tilt-y) so CSS handles the transform.
 */
export class TiltHandler implements ICardHandler {
    private readonly DAMPENER: number;
    private readonly abortController = new AbortController();

    constructor(
        private readonly container: HTMLElement,
        private readonly card: HTMLElement,
        private readonly state: ICardState,
        dampener: number = 45
    ) {
        this.DAMPENER = dampener;
    }

    init(): void {
        const { signal } = this.abortController;

        this.container.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.state.isFlipping || this.mouseIsOverScrollbar(e)) return;

            const tiltX = this.calculateTiltX(e);
            const tiltY = this.calculateTiltY(e);

            this.applyTilt(tiltX, tiltY);
        }, { signal });

        this.container.addEventListener('mouseleave', () => {
            this.resetTilt();
        }, { signal });
    }

    destroy(): void {
        this.abortController.abort();
    }

    // ========================== Private Helpers ==========================

    private calculateTiltX(e: MouseEvent): number {
        const rect = this.container.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const centerY = rect.height / 2;

        return (mouseY - centerY) / this.DAMPENER;
    }

    private calculateTiltY(e: MouseEvent): number {
        const rect = this.container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const centerX = rect.width / 2;

        return (centerX - mouseX) / this.DAMPENER;
    }

    private applyTilt(tiltX: number, tiltY: number): void {
        this.card.style.setProperty('--tilt-x', `${tiltX}deg`);
        this.card.style.setProperty('--tilt-y', `${tiltY}deg`);

        this.card.classList.add('tilting');
        this.card.classList.remove('resetting');
    }

    private resetTilt(): void {
        this.card.style.setProperty('--tilt-x', '0deg');
        this.card.style.setProperty('--tilt-y', '0deg');

        this.card.classList.add('resetting');
        this.card.classList.remove('tilting');
    }

    /**
     * Determines whether the mouse is hovering over the scrollbar region
     * on the card back. Returns false if the mouse is on the front face.
     */
    private mouseIsOverScrollbar(e: MouseEvent): boolean {
        const target = e.target as HTMLElement;
        const cardBack = target.closest('.card-back');

        // Mouse is on the front face — not over any scrollbar
        if (!(cardBack instanceof HTMLElement)) return false;

        const rect = cardBack.getBoundingClientRect();
        const SCROLLBAR_WIDTH = 120;
        const scrollbarRegion = rect.right - SCROLLBAR_WIDTH;

        return e.clientX > scrollbarRegion;
    }
}