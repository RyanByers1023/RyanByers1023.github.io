/**
 * @file Page content Injector
 * @description Handles dynamic loading and injection of page content with route-based
 * file fetching, loading states, and error handling
 */

/** TODO: refactor this file, it is incredibly difficult to read */

import { onRouteChange } from './router';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Callback context provided after content is rendered
 */
interface RenderContext {
    /** Current route name that was loaded */
    route: string;
    /** File path that was fetched */
    file: string;
    /** Container element where content was injected */
    container: HTMLElement;
}

/**
 * Configuration options for page loader initialization
 */
interface PageLoaderConfig {
    /** ID of the main content container element */
    containerId?: string;
    /** ID of the loading indicator element */
    loadingId?: string;
    /** Fallback CSS selector for content sections */
    sectionFallback?: string;
    /** Function to map route names to file paths */
    mapRouteToFile?: (route: string) => string;
    /** Optional callback invoked after content injection */
    onAfterRender?: ((context: RenderContext) => void) | null;
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Initializes the page loader with dynamic content fetching
 *
 * Sets up the following features:
 * - Route-based HTML file loading
 * - Abort controller for canceling in-flight requests
 * - Loading indicator management
 * - Automatic content injection into container
 * - Error handling with user-friendly messages
 * - Optional post-render callback for additional processing
 *
 * @param {PageLoaderConfig} config - Configuration object for page loader
 * @param {string} [config.containerId='content-container'] - ID of content container
 * @param {string} [config.loadingId='loading'] - ID of loading indicator
 * @param {string} [config.sectionFallback='section'] - Fallback selector for content
 * @param {Function} [config.mapRouteToFile] - Function mapping routes to file paths
 * @param {Function} [config.onAfterRender] - Callback after content render
 *
 * @example
 * // Initialize with default configuration
 * initPageLoader();
 *
 * @example
 * // Initialize with custom file mapping and callback
 * initPageLoader({
 *   containerId: 'main-content',
 *   mapRouteToFile: (route) => `/pages/${route}.html`,
 *   onAfterRender: ({ route, container }) => {
 *     console.log(`Loaded route: ${route}`);
 *     initializePageSpecificScripts(container);
 *   }
 * });
 */
export function initPageLoader({
                                   containerId = 'content-container',
                                   loadingId = 'loading',
                                   sectionFallback = 'section',
                                   mapRouteToFile = (route: string) => `${route}.html`,
                                   onAfterRender = null,
                               }: PageLoaderConfig = {}): void {

    // ========================================================================
    // CONSTANTS
    // ========================================================================

    /** Regular expression pattern for matching .html file extensions */
    const HTML_EXT_PATTERN = /\.html$/i;

    /** Error name for aborted fetch requests */
    const ABORT_ERROR_NAME = 'AbortError';

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

    // TypeScript now knows contentContainer is non-null beyond this point

    // ========================================================================
    // STATE MANAGEMENT
    // ========================================================================

    /** Abort controller for canceling in-flight fetch requests */
    let currentAbort: AbortController | null = null;

    // ========================================================================
    // LOADING STATE HELPERS
    // ========================================================================

    /**
     * Shows the loading indicator by removing the hidden class
     *
     * @private
     */
    const showLoading = (): void => {
        if (loadingIndicator) {
            loadingIndicator.classList.remove('hidden');
        }
    };

    /**
     * Hides the loading indicator by adding the hidden class
     *
     * @private
     */
    const hideLoading = (): void => {
        if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
        }
    };

    // ========================================================================
    // UTILITY FUNCTIONS
    // ========================================================================

    /**
     * Extracts the base ID from a file path by removing directory and .html extension
     *
     * @param {string} file - File path with .html extension
     * @returns {string} Base filename without path or extension
     *
     * @example
     * idFromPage('projects.html') // Returns 'projects'
     * idFromPage('/pages/projects.html') // Returns 'projects'
     *
     * @private
     */
    const idFromPage = (file: string): string => {
        // Extract filename from path (e.g., '/pages/projects.html' -> 'projects.html')
        const filename = file.split('/').pop() || file;
        // Remove .html extension
        return filename.replace(HTML_EXT_PATTERN, '');
    };

    /**
     * Generates HTML for a generic error message
     *
     * @param {string} message - Error message to display
     * @returns {string} HTML markup for error display
     *
     * @private
     */
    const generateErrorHTML = (message: string): string => {
        return `
            <div class='${ERROR_CONTAINER_CLASSES}'>
                <p class='${ERROR_TEXT_CLASSES}'>${message}</p>
            </div>
        `;
    };

    // ========================================================================
    // ROUTE LOADING
    // ========================================================================

    /**
     * Loads and injects content for a specific route
     *
     * Process:
     * 1. Cancels any in-flight requests
     * 2. Shows loading indicator
     * 3. Fetches HTML file for the route
     * 4. Parses content and extracts appropriate section
     * 5. Injects content into container
     * 6. Invokes post-render callback if provided
     * 7. Handles errors with user-friendly messages
     *
     * @param {string} routeName - Name of the route to load
     *
     * @private
     */

    /**TODO: refactor this and break it up a bit, too long */
    async function loadRoute(routeName: string): Promise<void> {
        const file = mapRouteToFile(routeName);

        // Cancel any in-flight request
        if (currentAbort) {
            currentAbort.abort();
        }
        currentAbort = new AbortController();

        showLoading();

        try {
            const res = await fetch(file, { signal: currentAbort.signal });

            if (!res.ok) {
                throw new Error(`Failed to load ${file} (HTTP ${res.status})`);
            }

            if(!contentContainer){
                throw new Error('Failed to locate contentContainer.');
            }

            const html = await res.text();
            const temp = document.createElement('div');
            temp.innerHTML = html;

            // Prefer a section whose id matches the routeName (e.g., 'projects')
            const section = temp.querySelector(`#${idFromPage(file)}`) ||
                temp.querySelector(sectionFallback);

            if (section) {
                contentContainer.innerHTML = section.outerHTML;
            } else {
                contentContainer.innerHTML = generateErrorHTML(
                    `Error: Could not find content (section is NULL) in ${file}`
                );
            }

            // Invoke post-render callback if provided
            if (typeof onAfterRender === 'function') {
                onAfterRender({
                    route: routeName,
                    file,
                    container: contentContainer
                });
            }
        } catch (err) {
            // Ignore abort errors (user navigated away)
            if (err instanceof Error && err.name !== ABORT_ERROR_NAME) {
                console.error('pageLoader Error:', err);
            }
        } finally {
            // Only hide loading if this request wasn't aborted
            if (!currentAbort || !currentAbort.signal.aborted) {
                hideLoading();
            }
        }
    }

    // ========================================================================
    // ROUTE CHANGE LISTENER
    // ========================================================================

    /**
     * Registers callback to load content when routes change
     *
     * Ensures page content is automatically updated when navigation occurs
     * through any means (links, back/forward buttons, programmatic navigation)
     *
     * @private
     */
    onRouteChange(loadRoute);
}