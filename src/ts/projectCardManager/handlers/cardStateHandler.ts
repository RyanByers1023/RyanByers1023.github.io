import type { ICardHandler } from '@projectCardManager/interface';
import type { ICardState } from '@projectCardManager/cardState';
import { readFlipDurationMs } from '@projectCardManager/cardUtils';

/**
 * Sole responsibility: keep shared card state accurate.
 * All other handlers read state but never write it.
 **/
export class CardStateHandler implements ICardHandler {
    private readonly abortController = new AbortController();

    constructor(
        private readonly container: HTMLElement,
        private readonly card: HTMLElement,
        private readonly state: ICardState,
    ) {}

    init(): void {
        const { signal } = this.abortController;
        this.handleAllEvents(signal);
    }

    destroy(): void {
        this.abortController.abort();
    }

//--------private helper functions----------

    private handleAllEvents(signal: AbortSignal): void {
        this.handleMouseEnterEvent(signal);
        this.handleMouseLeaveEvent(signal);
        this.handleCardFlipEvent(signal);
    }

    private handleMouseEnterEvent(signal: AbortSignal): void {
        this.container.addEventListener('mouseenter', () => {
            this.setMouseEnterStateValue();
        }, { signal });
    }

    private handleMouseLeaveEvent(signal: AbortSignal): void {
        this.container.addEventListener('mouseleave', () => {
            this.removeMouseLeaveStateValue();
        }, { signal });
    }

    private handleCardFlipEvent(signal: AbortSignal): void {
        this.card.addEventListener('card-flip', () => {
            this.setAllFlippingValues();

            setTimeout(() => {
                this.removeAllFlippingValues();
            }, readFlipDurationMs(this.card));
        }, { signal });
    }

//------private interface functions-----------

    private setMouseEnterStateValue(){
        this.state.isMouseOverCard = true;
    }

    private removeMouseLeaveStateValue(){
        this.state.isMouseOverCard = false;
    }

    //toggle both the state machine flip values, and the css state values
    private setAllFlippingValues(){
        this.setFlippingStateValues()
        this.setFlippingCSSValues();
    }

    private setFlippingCSSValues(){
        this.card.classList.toggle('flipped');
        this.card.classList.add('flipping');
    }

    private setFlippingStateValues(){
        this.state.isFlipped = !this.state.isFlipped;
        this.state.isFlipping = true;
    }

    private removeAllFlippingValues(){
        this.removeFlippingCSSValue();
        this.removeFlippingStateValue();
    }

    private removeFlippingCSSValue(){
        this.card.classList.remove('flipping');
    }

    private removeFlippingStateValue(){
        this.state.isFlipping = false;
    }
}