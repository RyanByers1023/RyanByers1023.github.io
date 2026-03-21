import type { ICardHandler } from '@projectCardManager/interface';
import type { ICardState } from '@projectCardManager/cardState';
import { SpringHandler } from './springHandler';

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

    // ── Dependencies ───────────────────────────────────────────────────────
    private readonly spring = new SpringHandler();

    // ── Misc ─────────────────────────────────────────────────────────────────
    private readonly abortController = new AbortController();
    private rafId: number | null = null;

    constructor(
        private readonly container: HTMLElement,
        private readonly card: HTMLElement,
        private readonly state: ICardState,
        dampener: number = 45,
        scrollbar_width: number = 120,
    ) {
        this.DAMPENER        = dampener;
        this.SCROLLBAR_WIDTH = scrollbar_width;
        this.MAX_AUTO_TILT_DEG = 135 / dampener;
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
            this.spring.step(targetX, targetY, this.state);
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
            return { x: this.state.cursorTargetX, y: this.state.cursorTargetY };
        }

        //in idle mode
        return this.calculateAutoTiltTarget(timestamp)
    }


    private applyCurrentTilt(): void {
        this.container.style.setProperty('--tilt-x', `${this.state.currentX}deg`);
        this.container.style.setProperty('--tilt-y', `${this.state.currentY}deg`);
    }

    // ========================== Listeners ==========================

    private initMouseMoveListener(signal: AbortSignal): void {
        this.container.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.state.isFlipping || this.mouseIsOverScrollbar(e)) return;

            this.updateCursorTargets(e);
        }, { signal });
    }

    private updateCursorTargets(e: MouseEvent): void {
        this.state.cursorTargetX = -this.calculateTiltX(e);
        this.state.cursorTargetY = -this.calculateTiltY(e);
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
