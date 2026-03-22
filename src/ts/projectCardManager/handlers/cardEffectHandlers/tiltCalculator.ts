import type { ICardState } from '@projectCardManager/cardState';

/**
 * Pure tilt-angle calculations.
 * Owns the math for idle auto-tilt and cursor-driven tilt,
 * but never touches the DOM or animation loop.
 */
export class TiltCalculator {
    private readonly DAMPENER: number;
    private readonly SCROLLBAR_WIDTH: number;

    // Cap matches the approximate max a user achieves with the mouse
    // (1/2 card width / DAMPENER =~ 3° at default dampener of 45)
    private readonly MAX_AUTO_TILT_DEG: number;

    // Angular frequencies for the idle sinusoidal path, in radians per millisecond.
    // Ex:
    //   X: 0.0008 rad/ms → 0.8 rad/s → full cycle every ~7.9 s
    //   Y: 0.0006 rad/ms → 0.6 rad/s → full cycle every ~10.5 s

    //increase this value to increase cards' x-rotation speed
    private readonly IDLE_FREQ_X_RAD_PER_MS = 0.0016;
    //increase this value to increase cards' y-rotation speed
    private readonly IDLE_FREQ_Y_RAD_PER_MS = 0.0010;

    // Unique phase per card so every card drifts independently
    private readonly phaseX = Math.random() * Math.PI * 2;
    private readonly phaseY = Math.random() * Math.PI * 2;

    constructor(dampener: number, scrollbarWidth: number) {
        this.DAMPENER = dampener;
        this.SCROLLBAR_WIDTH = scrollbarWidth;
        this.MAX_AUTO_TILT_DEG = 135 / dampener;
    }

    /**
     * Returns the tilt target for this frame.
     * Hover mode uses the last known cursor position from state.
     * Idle mode follows a sinusoidal path unique to this card.
     */
    getTiltTarget(timestamp: number, state: ICardState): { x: number; y: number } {
        if (state.isMouseOverCard) {
            return { x: state.cursorTargetX, y: state.cursorTargetY };
        }

        return this.calculateAutoTiltTarget(timestamp, state);
    }

    /**
     * Updates cursor tilt targets on state from a mouse event.
     */
    updateCursorTargets(e: MouseEvent, container: HTMLElement, state: ICardState): void {
        state.cursorTargetX = -this.calculateTiltX(e, container);
        state.cursorTargetY = -this.calculateTiltY(e, container, state);
    }

    /**
     * Determines whether the mouse is hovering over the scrollbar region
     * on the card back. Returns false if the mouse is on the front face.
     */
    mouseIsOverScrollbar(e: MouseEvent, state: ICardState): boolean {
        if (!state.isFlipped) return false;

        const target = e.target as HTMLElement;
        const cardBack = target.closest('.card-back');

        // @ts-ignore (null value verified via state machine)
        const rect = cardBack.getBoundingClientRect();
        return e.clientX > rect.right - this.SCROLLBAR_WIDTH;
    }

    // ========================== Private ==========================

    private calculateAutoTiltTarget(timestamp: number, state: ICardState): { x: number; y: number } {
        const tiltX = this.MAX_AUTO_TILT_DEG * Math.sin(timestamp * this.IDLE_FREQ_X_RAD_PER_MS + this.phaseX);
        const tiltY = this.MAX_AUTO_TILT_DEG * Math.sin(timestamp * this.IDLE_FREQ_Y_RAD_PER_MS + this.phaseY);

        return {
            x: tiltX,
            //account for reversed y-values for a flipped card
            y: state.isFlipped ? -tiltY : tiltY,
        };
    }

    private calculateTiltX(e: MouseEvent, container: HTMLElement): number {
        const rect    = container.getBoundingClientRect();
        const mouseY  = e.clientY - rect.top;
        const centerY = rect.height / 2;

        return (mouseY - centerY) / this.DAMPENER;
    }

    private calculateTiltY(e: MouseEvent, container: HTMLElement, state: ICardState): number {
        const rect    = container.getBoundingClientRect();
        const mouseX  = e.clientX - rect.left;
        const centerX = rect.width / 2;

        const raw = (centerX - mouseX) / this.DAMPENER;
        return state.isFlipped ? -raw : raw;
    }
}
