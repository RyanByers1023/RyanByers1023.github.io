/**
 * Contract for shared card state.
 * Any handler that needs to read or write flip/tilt/hover state
 * depends on this interface
 */
export interface ICardState {
    /** the card is currently showing its back face */
    isFlipped: boolean;

    /** a flip animation is currently in progress */
    isFlipping: boolean;

    /** the user's cursor is currently within the card container */
    isMouseOverCard: boolean;

    // ── Tilt state ─────────────────────────────────────────────────────────

    /** current tilt angle on the X axis (degrees) */
    currentX: number;

    /** current tilt angle on the Y axis (degrees) */
    currentY: number;

    /** spring velocity on the X axis */
    velocityX: number;

    /** spring velocity on the Y axis */
    velocityY: number;

    /** cursor-driven tilt target on the X axis (degrees) */
    cursorTargetX: number;

    /** cursor-driven tilt target on the Y axis (degrees) */
    cursorTargetY: number;
}

/**
 * Default implementation of ICardState.
 * Instantiated once per card by ProjectCardManager and injected
 * into every handler that needs shared state.
 */
export class CardState implements ICardState {
    isFlipped = false;
    isFlipping = false;
    isMouseOverCard = false;

    currentX = 0;
    currentY = 0;
    velocityX = 0;
    velocityY = 0;
    cursorTargetX = 0;
    cursorTargetY = 0;
}