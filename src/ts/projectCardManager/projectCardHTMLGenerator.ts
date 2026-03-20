import type { Project } from '@data/projects';

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Generates the complete HTML string for a project card (front + back).
 * This HTML is injected into the DOM before ProjectCardManager attaches behaviors.
 */

export function generateProjectCardHTML(project: Project): string {
    return `
        <div class="card-container">
            <div class="card-glass"></div>
            <div class="card-flip" id="${project.id}">
                ${generateCardFrontHTML(project)}
                ${generateCardBackHTML(project)}
            </div>
        </div>
    `;
}

// ============================================================================
// PRIVATE HELPERS
// ============================================================================

function generateListHTML(items: string[]): string {
    return items.map(item => `<li>${item}</li>`).join('');
}

function hasMultipleImages(images: string[]): boolean {
    return images.length > 1;
}

function hasNoImages(images: string[]): boolean {
    return images.length === 0;
}

function generateGalleryControlsHTML(images: string[]): string {
    if (!hasMultipleImages(images)) return '';

    return `
        ${generateGalleryArrowsHTML()}
        <div class="gallery-indicators"></div>
    `;
}

function generateGalleryArrowsHTML(): string {
    return `
        ${generateLeftGalleryArrow()}
        ${generateRightGalleryArrow()}
    `;
}

function generateLeftGalleryArrow(): string {
    return `
        <button class="gallery-arrow gallery-arrow-left" aria-label="Previous Image">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>`
}

function generateRightGalleryArrow(): string {
    return `
        <button class="gallery-arrow gallery-arrow-right" aria-label="Next Image">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>`
}

function generateDetailSectionHTML(title: string, content: string): string {
    return `
        <div class="detail-section">
            <div class="detail-title">${title}</div>
            <div class="detail-content">${content}</div>
        </div>
    `;
}

function generateDetailListSectionHTML(title: string, items: string[]): string {
    return `
        <div class="detail-section">
            <div class="detail-title">${title}</div>
            <ul class="detail-list">
                ${generateListHTML(items)}
            </ul>
        </div>
    `;
}

function generateGalleryContentHTML(project: Project): string {
    if (hasNoImages(project.images)) return '';

    return `
        <img class="gallery-image" src="${project.images[0]}" alt="${project.title}" draggable="false">
        ${generateGalleryControlsHTML(project.images)}
    `;
}

function generateCardFrontHTML(project: Project): string {
    return `
        <div class="card-face card-front">
            <div class="gallery-container">
                ${generateGalleryContentHTML(project)}
            </div>

            <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-black font-bold text-xl mb-3">${project.title}</h3>
                <p class="text-black text-sm mb-4 flex-1">${project.description}</p>                             
                <a href="${project.githubUrl}" target="_blank" class="github-url">
                    View Project on GitHub →
                </a>
            </div>
        </div>
    `;
}

function generateCardBackHTML(project: Project): string {
    const { details } = project;

    return `
        <div class="text-black card-face card-back">
            <h3 class="font-bold text-2xl mb-4">Project Details</h3>
            
            ${generateDetailSectionHTML('Overview', details.overview)}
            ${generateDetailListSectionHTML('Key Features', details.keyFeatures)}
            ${generateDetailListSectionHTML('Technical Highlights', details.technicalHighlights)}
            ${generateDetailSectionHTML('Status', details.status)}
        </div>
    `;
}