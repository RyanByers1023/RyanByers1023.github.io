import { onRouteChange } from '@core/router';
import { PageLoaderConfig } from '@contentHandler/types';
import { generateErrorHTML } from '@contentHandler/errorRenderer';
import { createLoadingIndicator } from '@contentHandler/loadingIndicator';
import { parseSection } from '@contentHandler/htmlContentParser';
import { createAbortableFetcher } from '@contentHandler/fetchWithAbort';

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export function validateContainer(containerId: string): HTMLElement | null {
    const container = document.getElementById(containerId);

    if (!container) {
        console.warn(`pageLoader Missing #${containerId}`);
    }

    return container;
}

export function validateFetchResponse(res: Response, file: string): void {
    if (!res.ok) {
        throw new Error(`Failed to load ${file} (HTTP ${res.status})`);
    }
}

export function injectSection(
    section: Element | null,
    container: HTMLElement,
    file: string,
): void {
    if (section) {
        container.innerHTML = section.outerHTML;
    } else {
        container.innerHTML = generateErrorHTML(
            `Error: Could not find content (section is NULL) in ${file}`
        );
    }
}

export function handleFetchError(err: unknown): void {
    if (err instanceof Error && err.name !== 'AbortError') {
        console.error('pageLoader Error:', err);
    }
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

    const container: HTMLElement | null = validateContainer(containerId);

    if (!container) {
        return;
    }

    // Non-null reference for use in async closures (TS can't narrow across closure boundaries)
    const validContainer: HTMLElement = container;

    const loading = createLoadingIndicator(loadingId);
    const fetcher = createAbortableFetcher();

    async function loadRoute(routeName: string): Promise<void> {
        const file = mapRouteToFile(routeName);

        loading.show();

        try {
            const res = await fetcher.fetch(file);

            validateFetchResponse(res, file);

            const html = await res.text();
            const section = parseSection(html, file, sectionFallback);

            injectSection(section, validContainer, file);

            if (typeof onAfterRender === 'function') {
                onAfterRender({ route: routeName, file, container: validContainer });
            }
        } catch (err) {
            handleFetchError(err);
        } finally {
            loading.hide();
        }
    }

    onRouteChange(loadRoute);
}