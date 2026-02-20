/**TODO: seperate structural (HTML) from logic (TS), split into different files, with the HTML components being stored
 * in ./templates and loaded/injected at runtime **/

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Detailed information about a project
 */
interface ProjectDetails {
    /** High-level project description */
    overview: string;
    /** List of main project features */
    keyFeatures: string[];
    /** List of technical achievements/highlights */
    technicalHighlights: string[];
    /** Current project status ("Complete", "In Progress") */
    status: string;
}

/**
 * Complete project data structure for card generation
 */
interface Project {
    /** Unique identifier for the project card element */
    id: string;
    /** Project title displayed on card */
    title: string;
    /** Short description for card preview */
    description: string;
    /** Array of image paths for gallery display */
    images: string[];
    /** GitHub repository URL */
    githubUrl: string;
    /** Additional detailed project information */
    details: ProjectDetails;
}

// ============================================================================
// PUBLIC API
// ============================================================================


export function generateProjectCardHTML(project: Project): string {
    return `
        <div class="card-container">
            <div class="card-flip" id="${project.id}">
                ${generateCardFrontHTML(project)}
                ${generateCardBackHTML(project)}
            </div>
        </div>
    `;
}

// ============================================================================
// PRIVATE HELPER FUNCTIONS
// ============================================================================

function generateListHTML(items: string[]): string {
    return items.map(item => `<li>${item}</li>`).join('');
}


function imagesInArray(images: string[]): boolean {
    return images.length > 1;
}


function generateGalleryArrowsHTML(): string {
    return `
        <button class="gallery-arrow gallery-arrow-left" aria-label="Previous Image">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button class="gallery-arrow gallery-arrow-right" aria-label="Next Image">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    `;
}


function generateGalleryControlsHTML(images: string[]): string {
    if (!imagesInArray(images)) {
        return '';
    }

    return `
        ${generateGalleryArrowsHTML()}
        <div class="gallery-indicators"></div>
    `;
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


function generateCardFrontHTML(project: Project): string {
    const galleryControlsHTML: string = generateGalleryControlsHTML(project.images);

    return `
        <div class="card-face card-front">
            <div class="gallery-container">
                <img class="gallery-image" src="${project.images[0]}" alt="${project.title}">
                ${galleryControlsHTML}
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
    const { details }: { details: ProjectDetails } = project;

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