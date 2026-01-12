/**
 * @file Component loader for static HTML components
 * @description Loads and injects static HTML components like navbar and footer
 */

/**
 * Loads an HTML component and injects it into a container
 *
 * @param componentPath - Path to the component HTML file
 * @param containerId - ID of the container element to inject into
 * @returns Promise that resolves when component is loaded
 */
export async function loadComponent(
    componentPath: string,
    containerId: string
): Promise<void> {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`componentLoader Container #${containerId} not found`);
        return;
    }

    try {
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath} (HTTP ${response.status})`);
        }

        const html = await response.text();
        container.innerHTML = html;

        console.log(`componentLoader Loaded ${componentPath} into #${containerId}`);
    } catch (error) {
        console.error(`componentLoader Error loading ${componentPath}:`, error);
    }
}

/**
 * Loads all static components (navbar, footer, etc.)
 */
export async function loadAllComponents(): Promise<void> {
    await Promise.all([
        loadComponent('/components/navbar.html', 'navbar-container'),
        loadComponent('/components/footer.html', 'footer-container')
    ]);
}