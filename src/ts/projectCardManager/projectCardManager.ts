import { CardState } from '@projectCardManager/cardState';
import { resolveCardElements } from '@projectCardManager/cardElements';
import { CardStateHandler, TiltHandler, FlipHandler, ScrollHandler, GalleryHandler } from '@handlers/index';
import type { ICardHandler } from '@projectCardManager/interface';
import type { ICardState } from '@projectCardManager/cardState';
import type { CardElements } from '@projectCardManager/cardElements';

/**
 * Composition root for a single project card. Owns the shared state and
 * DOM element references, assembles all behavior handlers, and injects
 * dependencies into each one.
 *
 * Lifecycle:
 *   const manager = new ProjectCardManager('project-card-1', images);
 *   manager.init();      // activates all handlers
 *   manager.destroy();   // tears down all listeners (for dynamic removal)
 */
export class ProjectCardManager {
    private readonly handlers: ICardHandler[];
    private readonly state: ICardState;
    private readonly elements: CardElements;

    constructor(cardId: string, private readonly images: string[] = []) {
        this.state = new CardState();
        this.elements = resolveCardElements(cardId);
        this.handlers = this.buildHandlers();
    }

    /** Activate all card behaviors */
    init(): void {
        this.handlers.forEach(handler => handler.init());
    }

    /** Tear down all event listeners for clean removal */
    destroy(): void {
        this.handlers.forEach(handler => handler.destroy());
    }

    // ========================== Composition ==========================

    private buildHandlers(): ICardHandler[] {
        const { card, container, cardBack,
            galleryImg, prevBtn, nextBtn, indicatorsContainer } = this.elements;

        return [
            new CardStateHandler(container, card, this.state),
            new TiltHandler(container, card, this.state),
            new FlipHandler(card),
            new ScrollHandler(container, cardBack, this.state),
            new GalleryHandler(galleryImg, prevBtn, nextBtn, indicatorsContainer, this.images),
        ];
    }
}