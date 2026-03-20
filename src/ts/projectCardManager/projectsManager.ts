import {projectsData} from '@data/projectsData';
import {generateProjectCardHTML} from '@projectCardManager/projectCardHTMLGenerator';
import {ProjectCardManager} from '@projectCardManager/projectCardManager';
import {Project} from "@projectCardManager/data/projects";

// ============================================================================
// PROJECTS MANAGER - Entry point that bootstraps all project cards
// ============================================================================

/**
 * Initializes all project cards in the specified container.
 * Generates HTML, injects it into the DOM, then creates a
 * ProjectCardManager for each card to wire up all behaviors.
 *
 * @param projectsContainerId - The ID of the container element (defaults to 'projects-grid')
 * @returns Array of ProjectCardManager instances (useful for later cleanup via destroy())
 */
export function initAllProjects(projectsContainerId: string = 'projects-grid'): ProjectCardManager[] {
    const projectsContainer = document.getElementById(projectsContainerId);

    if (!projectsContainer) {
        throw new Error(`Container with id "${projectsContainerId}" not found`);
    }

    generateCardHTML(projectsContainer);

    return createManagers(projectsData);
}

// Create a manager for each card, init behaviors, and return the instances
function createManagers(projects: Project[]): ProjectCardManager[] {
    return projects.map(project => {
        const manager = new ProjectCardManager(project.id, project.images);
        manager.init();
        return manager;
    });
}

// Generate and inject HTML for all cards
function generateCardHTML(projectsContainer: HTMLElement){
    projectsContainer.innerHTML = projectsData
        .map(project => generateProjectCardHTML(project))
        .join('');
}