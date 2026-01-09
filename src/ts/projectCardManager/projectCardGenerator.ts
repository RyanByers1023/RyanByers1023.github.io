/**
 * @file Project card HTML generator
 * @description Generates HTML markup for project cards with front/back flip functionality
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Technology tag with display name and Tailwind CSS styling classes
 */
interface TechTag {
    /** name of the technology */
    name: string;
    /** Tailwind CSS classes for badge color */
    color: string;
}

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
    /** Technologies used in the project */
    techStack: TechTag[];
    /** GitHub repository URL */
    githubUrl: string;
    /** Additional detailed project information */
    details: ProjectDetails;
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Generates complete HTML structure for a project card with flip animation
 *
 * Creates a two-sided card with:
 * - Front: Image gallery, title, description, tech stack, and GitHub link
 * - Back: Detailed project information including overview, features, and status
 *
 * @param {Project} project - Project data object containing all card information
 * @returns {string} Complete HTML markup for the project card
 *
 * @example
 * const cardHTML = generateProjectCardHTML({
 *   id: 'project-1',
 *   title: 'My Project',
 *   description: 'A cool project',
 *   images: ['./img1.jpg'],
 *   techStack: [{ name: 'React', color: 'bg-blue-100' }],
 *   githubUrl: 'https://github.com/user/repo',
 *   details: { overview: '...', keyFeatures: [], technicalHighlights: [], status: 'Complete' }
 * });
 */
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

/**
 * Generates HTML markup for a single technology badge
 *
 * @param {TechTag} tech - Technology tag object with name and color classes
 * @returns {string} HTML span element with styled technology badge
 *
 * @private
 */
function generateTechTagHTML(tech: TechTag): string {
    return `<span class="tech-tag ${tech.color}">${tech.name}</span>`;
}

/**
 * Generates HTML for the complete tech stack section
 *
 * Transforms an array of technology tags into a series of styled badge elements
 *
 * @param {TechTag[]} techStack - Array of technology tags to display
 * @returns {string} Concatenated HTML for all technology badges
 *
 * @private
 */
function generateTechStackHTML(techStack: TechTag[]): string {
    return techStack.map(generateTechTagHTML).join('');
}

/**
 * Generates HTML list items from an array of strings
 *
 * @param {string[]} items - Array of text items to convert to list elements
 * @returns {string} Concatenated HTML <li> elements
 *
 * @private
 */
function generateListHTML(items: string[]): string {
    return items.map(item => `<li>${item}</li>`).join('');
}

/**
 * Determines whether gallery navigation controls should be displayed
 *
 * Controls are only shown when there are multiple images to navigate between
 *
 * @param {string[]} images - Array of image paths
 * @returns {boolean} True if gallery has more than one image, false otherwise
 *
 * @private
 */
function imagesInArray(images: string[]): boolean {
    return images.length > 1;
}

/**
 * Generates HTML for gallery navigation arrow buttons
 *
 * Creates left and right arrow buttons with SVG icons for navigating
 * between gallery images
 *
 * @returns {string} HTML markup for previous and next arrow buttons
 *
 * @private
 */
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

/**
 * Generates complete gallery controls including arrows and indicators
 *
 * Returns empty string if only one image exists. For multiple images,
 * generates navigation arrows and indicator dots.
 *
 * @param {string[]} images - Array of image paths in the gallery
 * @returns {string} HTML markup for gallery controls, or empty string if not needed
 *
 * @private
 */
function generateGalleryControlsHTML(images: string[]): string {
    if (!imagesInArray(images)) {
        return '';
    }

    return `
        ${generateGalleryArrowsHTML()}
        <div class="gallery-indicators"></div>
    `;
}

/**
 * Generates HTML for a detail section with title and content
 *
 * Creates a consistently styled detail section with a bold title
 * and content text
 *
 * @param {string} title - Section title (e.g., "Overview", "Status")
 * @param {string} content - Section content text
 * @returns {string} HTML markup for the detail section
 *
 * @private
 */
function generateDetailSectionHTML(title: string, content: string): string {
    return `
        <div class="detail-section">
            <div class="detail-title">${title}</div>
            <div class="detail-content">${content}</div>
        </div>
    `;
}

/**
 * Generates HTML for a detail section with title and bulleted list
 *
 * Creates a consistently styled detail section with a bold title
 * and unordered list of items
 *
 * @param {string} title - Section title (e.g., "Key Features")
 * @param {string[]} items - Array of list items to display
 * @returns {string} HTML markup for the detail section with list
 *
 * @private
 */
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

/**
 * Generates HTML for the front face of the project card
 *
 * The front face includes:
 * - Image gallery with optional navigation controls
 * - Project title and description
 * - Technology stack badges
 * - GitHub repository link
 *
 * @param {Project} project - Project data object
 * @returns {string} HTML markup for the card's front face
 *
 * @private
 */
function generateCardFrontHTML(project: Project): string {
    const galleryControlsHTML: string = generateGalleryControlsHTML(project.images);
    const techStackHTML: string = generateTechStackHTML(project.techStack);

    return `
        <div class="card-face card-front">
            <div class="gallery-container">
                <img class="gallery-image" src="${project.images[0]}" alt="${project.title}">
                ${galleryControlsHTML}
            </div>

            <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-black font-bold text-xl mb-3">${project.title}</h3>
                <p class="text-black text-sm mb-4 flex-1">${project.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${techStackHTML}
                </div>
                
                <a href="${project.githubUrl}" target="_blank" class="github-url">
                    View Project on GitHub →
                </a>
            </div>
        </div>
    `;
}

/**
 * Generates HTML for the back face of the project card
 *
 * The back face includes detailed project information:
 * - Overview section
 * - Key features list
 * - Technical highlights list
 * - Current project status
 *
 * @param {Project} project - Project data object
 * @returns {string} HTML markup for the card's back face
 *
 * @private
 */
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