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
    try {
        /* getting and setting the content stored within html **/
        const container = getContainer();

        const response = await getResponse();

        container.innerHTML = await response.text();

        /** DEBUG log */
        console.log(`componentLoader Loaded ${componentPath} into #${containerId}`);
    } catch (error) {
        console.error(`componentLoader Error loading ${componentPath}:`, error);
    }

    function getContainer() : HTMLElement{
        const container = document.getElementById(containerId);

        if (!container) {
            throw new Error(`componentLoader Container #${containerId} not found`);
        }

        return container;
    }

    async function getResponse(): Promise<Response>{
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath} (HTTP ${response.status})`);
        }

        return response;
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