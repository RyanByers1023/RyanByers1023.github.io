import type { ICardHandler } from '../interface';
import type { ICardState } from '../cardState';

/**
 * Applies a 3D tilt effect to the card.
 *
 * A single RAF loop runs continuously and drives --tilt-x / --tilt-y through
 * a spring simulation. The spring's target switches between two modes:
 *
 *   • Idle  — sinusoidal auto-tilt (random starting phase per card so they drift out of sync)
 *   • Hover — cursor-driven tilt computed from mouse position
 */
export class TiltHandler implements ICardHandler {
    private readonly DAMPENER: number;
    private readonly SCROLLBAR_WIDTH: number;

    // ── Auto-tilt ────────────────────────────────────────────────────────────
    // Cap matches the approximate max a user achieves with the mouse
    // (1/2 card width / DAMPENER =~ 3°)
    private readonly MAX_AUTO_TILT_DEG = 3;


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

    // ── Spring state ─────────────────────────────────────────────────────────
    // Acceleration toward target per frame.
    // increase this value to increase the speed in which the card 'snaps back' to its current target
    private readonly SPRING_STIFFNESS = 0.015;
    // Fraction of velocity retained per frame.
    // increase this value to increase the amount the card will 'overshoot' its current target
    private readonly SPRING_DAMPING   = .8;

    // auto tilt values (updated continuously via stepSpring)
    private currentX  = 0;
    private currentY  = 0;
    private velocityX = 0;
    private velocityY = 0;

    // ── Cursor target (updated on mousemove) ─────────────────────────────────
    private cursorTargetX = 0;
    private cursorTargetY = 0;

    // ── Misc ─────────────────────────────────────────────────────────────────
    private readonly abortController = new AbortController();
    private rafId: number | null = null;

    constructor(
        private readonly container: HTMLElement,
        private readonly card: HTMLElement,
        private readonly state: ICardState,
        dampener: number = 45,
        _ms_mouse_leave_tilt_reset_delay: number = 200, // kept for API compat, no longer needed
        scrollbar_width: number = 120,
    ) {
        this.DAMPENER      = dampener;
        this.SCROLLBAR_WIDTH = scrollbar_width;
    }

    init(): void {
        //create the abort signal
        const { signal } = this.abortController;

        this.initListeners(signal);

        this.startAnimationLoop();
    }

    destroy(): void {
        this.stopLoop();
        //this causes all listeners to be destroyed
        this.abortController.abort();
    }

    private initListeners(signal: AbortSignal): void {
        this.initMouseMoveListener(signal);
    }

    // ========================== RAF loop ==========================

    private startAnimationLoop(): void {
        const animate = (timestamp: number) => {
            const { x: targetX, y: targetY } = this.getTiltTarget(timestamp);
            this.performTiltAnimation(targetX, targetY);
            this.rafId = requestAnimationFrame(animate);
        };
        this.rafId = requestAnimationFrame(animate);
    }

    private stopLoop(): void {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    private performTiltAnimation(targetX: number, targetY: number): void {
        if (!this.state.isFlipping) {
            this.stepSpring(targetX, targetY);
            this.applyCurrentTilt();
        }
    }

    // ========================== Spring ==========================


    /**
     * Returns the tilt target for this frame.
     * Hover mode uses the last known cursor position.
     * Idle mode follows a sinusoidal path unique to this card.
     */
    private getTiltTarget(timestamp: number): { x: number; y: number } {
        //in hover mode
        if (this.state.isMouseOverCard) {
            return { x: this.cursorTargetX, y: this.cursorTargetY };
        }

        //in idle mode
        return this.calculateAutoTiltTarget(timestamp)
    }

    /**
     * Advances the spring one frame toward (targetX, targetY).
     * Velocity is preserved across calls so mode switches carry momentum.
     */
    private stepSpring(targetX: number, targetY: number): void {
        this.velocityX += (targetX - this.currentX) * this.SPRING_STIFFNESS;
        this.velocityY += (targetY - this.currentY) * this.SPRING_STIFFNESS;

        this.velocityX *= this.SPRING_DAMPING;
        this.velocityY *= this.SPRING_DAMPING;

        this.currentX += this.velocityX;
        this.currentY += this.velocityY;
    }

    private applyCurrentTilt(): void {
        this.container.style.setProperty('--tilt-x', `${this.currentX}deg`);
        this.container.style.setProperty('--tilt-y', `${this.currentY}deg`);
    }

    // ========================== Listeners ==========================

    private initMouseMoveListener(signal: AbortSignal): void {
        this.container.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.state.isFlipping || this.mouseIsOverScrollbar(e)) return;

            this.updateCursorTargets(e);
        }, { signal });
    }

    private updateCursorTargets(e: MouseEvent): void {
        this.cursorTargetX = this.calculateTiltX(e);
        this.cursorTargetY = this.calculateTiltY(e);
    }

    // ========================== Calculations ==========================

    private calculateAutoTiltTarget(timestamp: number): { x: number; y: number } {
        const tiltX = this.MAX_AUTO_TILT_DEG * Math.sin(timestamp * this.IDLE_FREQ_X_RAD_PER_MS + this.phaseX);
        const tiltY = this.MAX_AUTO_TILT_DEG * Math.sin(timestamp * this.IDLE_FREQ_Y_RAD_PER_MS + this.phaseY);

        return {
            x: tiltX,
            //account for reversed y-values for a flipped card
            y: this.state.isFlipped ? -tiltY : tiltY,
        };
    }

    private calculateTiltX(e: MouseEvent): number {
        const rect    = this.container.getBoundingClientRect();
        const mouseY  = e.clientY - rect.top;
        const centerY = rect.height / 2;

        return (mouseY - centerY) / this.DAMPENER;
    }

    private calculateTiltY(e: MouseEvent): number {
        const rect    = this.container.getBoundingClientRect();
        const mouseX  = e.clientX - rect.left;
        const centerX = rect.width / 2;

        const raw = (centerX - mouseX) / this.DAMPENER;
        return this.state.isFlipped ? -raw : raw;
    }

    /**
     * Determines whether the mouse is hovering over the scrollbar region
     * on the card back. Returns false if the mouse is on the front face.
     */
    private mouseIsOverScrollbar(e: MouseEvent): boolean {
        if (!this.state.isFlipped) return false;

        const target   = e.target as HTMLElement;
        const cardBack = target.closest('.card-back');

        // @ts-ignore (null value verified via state machine)
        const rect = cardBack.getBoundingClientRect();
        return e.clientX > rect.right - this.SCROLLBAR_WIDTH;
    }
}