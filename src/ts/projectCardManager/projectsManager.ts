import { projectsData } from '@projectCardManager/data/projectsData';
import { generateProjectCardHTML } from '@projectCardManager/projectCardGenerator';
import { initProjectCard } from '@projectCardManager/projectsCardController';

/**
 * Initializes all project cards in the specified container
 * @param projectsContainerId - The ID of the container element (defaults to 'projects-grid')
 */
export function initAllProjects(projectsContainerId: string = 'projects-grid'): void {
    const projectsContainer = getProjectsContainer(projectsContainerId) as HTMLElement;

    initAllProjectCards();

    function getProjectsContainer(projectsContainerId: string) : HTMLElement{
        const projectsContainer = document.getElementById(projectsContainerId);
        if (!projectsContainer) {
            throw new Error(`Container with id "${projectsContainerId}" not found`);
        }
        return projectsContainer;
    }


    function initAllProjectCards(){
        // Generate HTML for all project cards
        const cardsHTML: string = projectsData.map(project =>
            generateProjectCardHTML(project)
        ).join('');

        // inject the HTML into the DOM
        projectsContainer.innerHTML = cardsHTML;

        // Initialize all cards
        projectsData.forEach(project => {
            initProjectCard(project.id, project.images);
        });
    }
}
