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
}