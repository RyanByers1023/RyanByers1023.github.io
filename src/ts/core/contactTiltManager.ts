import { TiltHandler } from '@projectCardManager/handlers/tiltHandler';
import { CardState } from '@projectCardManager/cardState';

const PAGE_TILT_CONTAINER_CLASS = 'page-tilt-container';
const GLASS_CARD_CLASS = 'glass-card';

// Higher dampener = less tilt. Project cards use 45; these page cards use 250.
const CONTACT_DAMPENER = 250;

export function initPageTilt(): void {
    const containers = document.querySelectorAll<HTMLElement>(`.${PAGE_TILT_CONTAINER_CLASS}`);

    containers.forEach(container => {
        const card = container.querySelector<HTMLElement>(`.${GLASS_CARD_CLASS}`);
        if (!card) return;

        const tiltHandler = new TiltHandler(container, card, new CardState(), CONTACT_DAMPENER);
        tiltHandler.init();
    });
}
