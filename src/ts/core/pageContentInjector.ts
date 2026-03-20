import { onRouteChange } from './router';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface RenderContext {
    route: string;
    file: string;
    container: HTMLElement;
}

interface PageLoaderConfig {
    containerId?: string;
    loadingId?: string;
    sectionFallback?: string;
    mapRouteToFile?: (route: string) => string;
    onAfterRender?: ((context: RenderContext) => void) | null;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const HTML_EXT_PATTERN = /\.html$/i;
const ERROR_CONTAINER_CLASSES = 'text-center py-16';
const ERROR_TEXT_CLASSES = 'text-red-600';

// ============================================================================
// HELPERS
// ============================================================================

function idFromPage(file: string): string {
    const filename = file.split('/').pop() || file;
    return filename.replace(HTML_EXT_PATTERN, '');
}

function generateErrorHTML(message: string): string {
    return `
        <div class='${ERROR_CONTAINER_CLASSES}'>
            <p class='${ERROR_TEXT_CLASSES}'>${message}</p>
        </div>
    `;
}

// ============================================================================
// PUBLIC API
// ============================================================================

export function initPageLoader({
                                   containerId = 'content-container',
                                   loadingId = 'loading',
                                   sectionFallback = 'section',
                                   mapRouteToFile = (route: string) => `${route}.html`,
                                   onAfterRender = null,
                               }: PageLoaderConfig = {}): void {

    const contentContainer = document.getElementById(containerId);
    const loadingIndicator = document.getElementById(loadingId);

    if (!contentContainer) {
        console.warn(`pageLoader Missing #${containerId}`);
        return;
    }

    // Non-null reference for use in async closures (TS can't narrow across closure boundaries)
    const container: HTMLElement = contentContainer;

    let currentAbort: AbortController | null = null;

    const showLoading = (): void => {
        loadingIndicator?.classList.remove('hidden');
    };

    const hideLoading = (): void => {
        loadingIndicator?.classList.add('hidden');
    };

    async function loadRoute(routeName: string): Promise<void> {
        const file = mapRouteToFile(routeName);

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

            const html = await res.text();
            const temp = document.createElement('div');
            temp.innerHTML = html;

            const section = temp.querySelector(`#${idFromPage(file)}`) ||
                temp.querySelector(sectionFallback);

            if (section) {
                container.innerHTML = section.outerHTML;
            } else {
                container.innerHTML = generateErrorHTML(
                    `Error: Could not find content (section is NULL) in ${file}`
                );
            }

            if (typeof onAfterRender === 'function') {
                onAfterRender({ route: routeName, file, container });
            }
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                console.error('pageLoader Error:', err);
            }
        } finally {
            if (!currentAbort?.signal.aborted) {
                hideLoading();
            }
        }
    }

    onRouteChange(loadRoute);
}
        