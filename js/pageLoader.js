// Responsible for loading and injecting page content.

import { onRouteChange } from './router.js';

export function initPageLoader({
                                   containerId = 'content-container',
                                   loadingId = 'loading',
                                   sectionFallback = 'section',   // fallback selector if id-matching section not found
                                   mapRouteToFile = (route) => `${route}.html`, // route -> file
                                   onAfterRender = null,          // optional callback after content injection
                               } = {}) {
    const contentContainer = document.getElementById(containerId);
    const loadingIndicator = document.getElementById(loadingId);
    if (!contentContainer) {
        console.warn(`[pageLoader] Missing #${containerId}`);
        return;
    }

    let currentAbort = null;

    const showLoading = () => loadingIndicator && loadingIndicator.classList.remove('hidden');
    const hideLoading = () => loadingIndicator && loadingIndicator.classList.add('hidden');

    const idFromPage = (file) => file.replace(/\.html$/i, '');

    async function loadRoute(routeName) {
        const file = mapRouteToFile(routeName);

        // Cancel any in-flight request
        if (currentAbort) currentAbort.abort();
        currentAbort = new AbortController();

        showLoading();

        try {
            const res = await fetch(file, { signal: currentAbort.signal });
            if (!res.ok) throw new Error(`Failed to load ${file} (HTTP ${res.status})`);

            const html = await res.text();
            const temp = document.createElement('div');
            temp.innerHTML = html;

            // Prefer a section whose id matches the routeName (e.g., 'projects')
            const section = temp.querySelector(`#${idFromPage(file)}`) || temp.querySelector(sectionFallback);

            if (section) {
                contentContainer.innerHTML = section.outerHTML;
            } else {
                contentContainer.innerHTML = `
          <div class='text-center py-16'>
            <p class='text-red-600'>Error: Could not find content in ${file}</p>
          </div>`;
            }

            if (typeof onAfterRender === 'function') {
                onAfterRender({ route: routeName, file, container: contentContainer });
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('[pageLoader] Error:', err);
                contentContainer.innerHTML = `
          <div class='text-center py-16'>
            <p class='text-red-600'>Error loading content. Please try again.</p>
          </div>`;
            }
        } finally {
            if (!currentAbort || !currentAbort.signal.aborted) hideLoading();
        }
    }

    // React to route changes
    onRouteChange(loadRoute);
}
