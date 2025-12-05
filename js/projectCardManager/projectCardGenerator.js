export function generateProjectCardHTML(project) {
    const techStackHTML = project.techStack.map(tech =>
        `<span class="tech-tag ${tech.color}">${tech.name}</span>`
    ).join('');

    const keyFeaturesHTML = project.details.keyFeatures.map(feature =>
        `<li>${feature}</li>`
    ).join('');

    const technicalHighlightsHTML = project.details.technicalHighlights.map(highlight =>
        `<li>${highlight}</li>`
    ).join('');

    // Show gallery controls only if multiple images
    const showGalleryControls = project.images.length > 1;
    const galleryControlsHTML = showGalleryControls ? `
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
        <div class="gallery-indicators"></div>
    ` : '';

    return `
        <div class="card-container">
            <div class="card-flip" id="${project.id}">
                <!-- FRONT FACE -->
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
                        
                        <a href="${project.githubUrl}" target="_blank" class ="transition-all duration-300 ease-in-out hover:text-indigo-700 hover:scale-105">
                            View Project on GitHub →
                        </a>
                    </div>
                </div>

                <!-- BACK FACE -->
                <div class="text-black card-face card-back">
                    <h3 class="font-bold text-2xl mb-4">Project Details</h3>
                    
                    <div class="detail-section">
                        <div class="detail-title">Overview</div>
                        <div class="detail-content">${project.details.overview}</div>
                    </div>

                    <div class="detail-section">
                        <div class="detail-title">Key Features</div>
                        <ul class="detail-list">
                            ${keyFeaturesHTML}
                        </ul>
                    </div>

                    <div class="detail-section">
                        <div class="detail-title">Technical Highlights</div>
                        <ul class="detail-list">
                            ${technicalHighlightsHTML}
                        </ul>
                    </div>

                    <div class="detail-section">
                        <div class="detail-title">Status</div>
                        <div class="detail-content">${project.details.status}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}