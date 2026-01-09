import { projectsData } from '@projectCardManager/data/projectsData';
import { generateProjectCardHTML } from '@projectCardManager/projectCardGenerator';
import { initProjectCard } from '@projectCardManager/projectsCardController';

/**
 * Initializes all project cards in the specified container
 * @param containerId - The ID of the container element (defaults to 'projects-grid')
 */
export function initAllProjects(containerId: string = 'projects-grid'): void {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }

    // Generate HTML for all project cards
    const cardsHTML: string = projectsData.map(project =>
        generateProjectCardHTML(project)
    ).join('');

    // Insert before the "View More" card (or append if not found)
    const viewMoreCard: Element | null = container.querySelector('.glass-card');
    if (viewMoreCard) {
        viewMoreCard.insertAdjacentHTML('beforebegin', cardsHTML);
    } else {
        container.insertAdjacentHTML('beforeend', cardsHTML);
    }

    // Initialize all cards
    projectsData.forEach(project => {
        initProjectCard(project.id, project.images);
    });
}