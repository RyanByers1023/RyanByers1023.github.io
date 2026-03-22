import type { ICardHandler } from '@projectCardManager/interface';
import type { ICardState } from '@projectCardManager/cardState';
import { SpringHandler } from './springHandler';
import { TiltCalculator } from './tiltCalculator';

/**
 * Applies a 3D tilt effect to the card.
 *
 * Orchestrates the RAF loop, event listeners, and delegates to:
 *   • TiltCalculator — angle math (idle sinusoidal + cursor-driven)
 *   • SpringHandler  — spring physics simulation
 *   • CardState      — all mutable tilt data
 */
export class TiltHandler implements ICardHandler {
    // ── Dependencies ───────────────────────────────────────────────────────
    private readonly spring = new SpringHandler();
    private readonly calculator: TiltCalculator;

    // ── Misc ─────────────────────────────────────────────────────────────────
    private readonly abortController = new AbortController();
    private rafId: number | null = null;

    constructor(
        private readonly container: HTMLElement,
        private readonly card: HTMLElement,
        private readonly state: ICardState,
        dampener: number = 45,
        scrollbarWidth: number = 120,
    ) {
        this.calculator = new TiltCalculator(dampener, scrollbarWidth);
    }

    init(): void {
        const { signal } = this.abortController;

        this.initListeners(signal);
        this.startAnimationLoop();
    }

    destroy(): void {
        this.stopLoop();
        this.abortController.abort();
    }

    private initListeners(signal: AbortSignal): void {
        this.container.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.state.isFlipping || this.calculator.mouseIsOverScrollbar(e, this.state)) return;

            this.calculator.updateCursorTargets(e, this.container, this.state);
        }, { signal });
    }

    // ========================== RAF loop ==========================

    private startAnimationLoop(): void {
        const animate = (timestamp: number) => {
            this.performTiltAnimation(timestamp);
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

    private performTiltAnimation(timestamp: number): void {
        if (!this.state.isFlipping) {
            const { x: targetX, y: targetY } = this.calculator.getTiltTarget(timestamp, this.state);
            this.spring.step(targetX, targetY, this.state);
            this.applyCurrentTilt();
        }
    }

    private applyCurrentTilt(): void {
        this.container.style.setProperty('--tilt-x', `${this.state.currentX}deg`);
        this.container.style.setProperty('--tilt-y', `${this.state.currentY}deg`);
    }
}
