//Generates project card from data stored wtihin projectsData.js
/**
 * Main function: Generates complete project card HTML
 */
export function generateProjectCardHTML(project) {
    return `
        <div class="card-container">
            <div class="card-flip" id="${project.id}">
                ${generateCardFrontHTML(project)}
                ${generateCardBackHTML(project)}
            </div>
        </div>
    `;
}

/**
 * Generates HTML for a single technology tag
 */
function generateTechTagHTML(tech) {
    return `<span class="tech-tag ${tech.color}">${tech.name}</span>`;
}

/**
 * Generates HTML for the tech stack section
 */
function generateTechStackHTML(techStack) {
    return techStack.map(generateTechTagHTML).join('');
}

/**
 * Generates HTML for a list of items
 */
function generateListHTML(items) {
    return items.map(item => `<li>${item}</li>`).join('');
}

/**
 * Determines whether gallery controls should be displayed
 */
function imagesInArray(images) {
    return images.length > 1;
}

/**
 * Generates HTML for gallery navigation arrows
 */
function generateGalleryArrowsHTML() {
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
 * Generates HTML for gallery controls (arrows and indicators)
 */
function generateGalleryControlsHTML(images) {
    if (!imagesInArray(images)) {
        return '';
    }

    return `
        ${generateGalleryArrowsHTML()}
        <div class="gallery-indicators"></div>
    `;
}

/**
 * Generates HTML for a detail section
 */
function generateDetailSectionHTML(title, content) {
    return `
        <div class="detail-section">
            <div class="detail-title">${title}</div>
            <div class="detail-content">${content}</div>
        </div>
    `;
}

/**
 * Generates HTML for a detail section with a list
 */
function generateDetailListSectionHTML(title, items) {
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
 * Generates HTML for the front face of the card
 */
function generateCardFrontHTML(project) {
    const galleryControlsHTML = generateGalleryControlsHTML(project.images);
    const techStackHTML = generateTechStackHTML(project.techStack);

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
 * Generates HTML for the back face of the card
 */
function generateCardBackHTML(project) {
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