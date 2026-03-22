import { TiltHandler } from '@src/ts/projectCardManager/handlers/cardEffectHandlers/tiltHandler';
import { CardState } from '@projectCardManager/cardState';

const PAGE_TILT_CONTAINER_CLASS = 'page-tilt-container';
const GLASS_CARD_CLASS = 'glass-card';

// Higher dampener = less tilt. Project cards use 45; these page cards use 250.
const TILT_DAMPENER = 150;

export function initPageTilt(): void {
    const containers = document.querySelectorAll<HTMLElement>(`.${PAGE_TILT_CONTAINER_CLASS}`);

    containers.forEach(container => {
        const card = container.querySelector<HTMLElement>(`.${GLASS_CARD_CLASS}`);
        if (!card) return;

        const state = new CardState();

        container.addEventListener('mouseenter', () => { state.isMouseOverCard = true; });
        container.addEventListener('mouseleave', () => { state.isMouseOverCard = false; });

        const tiltHandler = new TiltHandler(container, card, state, TILT_DAMPENER);
        tiltHandler.init();
    });
}
