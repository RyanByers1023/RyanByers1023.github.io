import type { ICardHandler } from '../interface';
import type { ICardState } from '../cardState';

/**
 * Applies a 3D tilt effect to the card based on mouse position.
 * Reads isFlipping from shared state (derived from cardState.ts) to suppress tilt during flip animations.
 * Uses CSS custom properties (--tilt-x, --tilt-y) so CSS handles the transform.
 */
export class TiltHandler implements ICardHandler {
    private readonly DAMPENER: number;
    private readonly MS_MOUSE_LEAVE_TILT_RESET_DELAY: number;
    private readonly SCROLLBAR_WIDTH: number;
    private readonly abortController = new AbortController();

    constructor(
        private readonly container: HTMLElement,
        private readonly card: HTMLElement,
        private readonly state: ICardState,
        // increase this value to reduce the amount of tilt applied to project cards
        dampener: number = 45,
        ms_mouse_leave_tilt_reset_delay: number = 200,
        scrollbar_width: number = 120,
    ) {
        this.DAMPENER = dampener;
        this.MS_MOUSE_LEAVE_TILT_RESET_DELAY = ms_mouse_leave_tilt_reset_delay;
        this.SCROLLBAR_WIDTH = scrollbar_width;
    }

    init(): void {
        const { signal } = this.abortController;

        this.initMouseMoveListener(signal);

        this.initMouseLeaveListener(signal);
    }

    destroy(): void {
        this.abortController.abort();
    }

    // ========================== Private Helpers ==========================

    private initMouseLeaveListener(signal: AbortSignal): void {
        this.container.addEventListener('mouseleave', () => {
            this.resetTilt();
        }, { signal });
    }

    private initMouseMoveListener(signal: AbortSignal): void {
        this.container.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.shouldSuppressTilt(e)) return;

            const tiltX = this.calculateTiltX(e);
            const tiltY = this.calculateTiltY(e);

            this.applyTilt(tiltX, tiltY);
        }, { signal });
    }

    private shouldSuppressTilt(e: MouseEvent): boolean{
        return this.state.isFlipping || this.mouseIsOverScrollbar(e);
    }

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
        // Negate tiltY when flipped: the Y axis is mirrored after a 180° rotation,
        const effectiveTiltY = this.state.isFlipped ? -tiltY : tiltY;

        this.container.style.setProperty('--tilt-x', `${tiltX}deg`);
        this.container.style.setProperty('--tilt-y', `${effectiveTiltY}deg`);

        this.card.classList.add('tilting');
    }

    private resetTilt(): void {
        this.container.style.setProperty('--tilt-x', '0deg');
        this.container.style.setProperty('--tilt-y', '0deg');

        this.resetTiltClasses();
    }

    private resetTiltClasses(){
        this.card.classList.add('resetting');

        setTimeout(() => {
            this.card.classList.remove('resetting');
            this.card.classList.remove('tilting');
        }, this.MS_MOUSE_LEAVE_TILT_RESET_DELAY);
    }

    /**
     * Determines whether the mouse is hovering over the scrollbar region
     * on the card back. Returns false if the mouse is on the front face
     * or when the user's mouse is not over the scrollbar.
     */
    private mouseIsOverScrollbar(e: MouseEvent): boolean {
        const target = e.target as HTMLElement;
        const cardBack = target.closest('.card-back');

        // Mouse is on the front face — not over any scrollbar
        if (!(cardBack instanceof HTMLElement)) return false;

        const rect = cardBack.getBoundingClientRect();
        const scrollbarRegion = rect.right - this.SCROLLBAR_WIDTH;

        return e.clientX > scrollbarRegion;
    }
}