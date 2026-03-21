import type { ICardState } from '@projectCardManager/cardState';

/**
 * Advances a spring simulation on the tilt properties of a CardState.
 * Stateless — all mutable data lives in the CardState it operates on.
 */
export class SpringHandler {
    // Acceleration toward target per frame.
    // increase this value to increase the speed in which the card 'snaps back' to its current target
    private readonly SPRING_STIFFNESS = 0.015;
    // Fraction of velocity retained per frame.
    // increase this value to increase the amount the card will 'overshoot' its current target
    private readonly SPRING_DAMPING = 0.8;

    /**
     * Advances the spring one frame toward (targetX, targetY).
     * Velocity is preserved across calls so mode switches carry momentum.
     */
    step(targetX: number, targetY: number, state: ICardState): void {
        state.velocityX += (targetX - state.currentX) * this.SPRING_STIFFNESS;
        state.velocityY += (targetY - state.currentY) * this.SPRING_STIFFNESS;

        state.velocityX *= this.SPRING_DAMPING;
        state.velocityY *= this.SPRING_DAMPING;

        state.currentX += state.velocityX;
        state.currentY += state.velocityY;
    }
}
