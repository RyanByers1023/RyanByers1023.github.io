
// ============================================================================
// TYPE DEFINITIONS
// ============================================================================


export function initPageLoader({
                                   containerId = 'content-container',
                                   loadingId = 'loading',
                                   sectionFallback = 'section',
                                   onAfterRender = null,
                               }): void {

    // ========================================================================
    // CONSTANTS
    // ========================================================================

    /** Regular expression pattern for matching .html file extensions */
    const HTML_EXT_PATTERN = /\.html$/i;

    /** CSS classes for error message container */
    const ERROR_CONTAINER_CLASSES = 'text-center py-16';

    /** CSS classes for error message text */
    const ERROR_TEXT_CLASSES = 'text-red-600';

    // ========================================================================
    // DOM ELEMENT REFERENCES
    // ========================================================================

    const contentContainer: HTMLElement | null = document.getElementById(containerId);
    const loadingIndicator: HTMLElement | null = document.getElementById(loadingId);

    // Early return if required container is missing
    if (!contentContainer) {
        console.warn(`pageLoader Missing #${containerId}`);
        return;
    }

    /** Abort controller for canceling in-flight fetch requests */
    let currentAbort: AbortController | null = null;

    /**
     * Shows the loading indicator by removing the hidden class
     */
    const showLoading = (): void => {
        if (loadingIndicator) {
            loadingIndicator.classList.remove('hidden');
        }
    };

    /**
     * Hides the loading indicator by adding the hidden class
    */
    const hideLoading = (): void => {
        if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
        }
    };

    /**
     * Extracts the base ID from a file path by removing directory and .html extension
     */
    const idFromPage = (file: string): string => {
        // Extract filename from path (e.g., '/pages/projects.html' -> 'projects.html')
        const filename = file.split('/').pop() || file;
        // Remove .html extension
        return filename.replace(HTML_EXT_PATTERN, '');
    };

    /**
     * Generates HTML for a generic error message
    */
    const generateErrorHTML = (message: string): string => {
        return `
            <div class='${ERROR_CONTAINER_CLASSES}'>
                <p class='${ERROR_TEXT_CLASSES}'>${message}</p>
            </div>
        `;
    };
}
        