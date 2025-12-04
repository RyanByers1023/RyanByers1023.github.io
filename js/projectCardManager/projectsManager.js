import { projectsData } from './projectsData.js';
import { generateProjectCardHTML } from './projectCardGenerator.js';
import { initProjectCard } from './projectsCardController.js';

export function initAllProjects(containerId = 'projects-grid') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }

    // Generate HTML for all project cards
    const cardsHTML = projectsData.map(project =>
        generateProjectCardHTML(project)
    ).join('');

    // Insert before the "View More" card (or append if not found)
    const viewMoreCard = container.querySelector('.glass-card');
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