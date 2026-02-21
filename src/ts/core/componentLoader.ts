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
        const container = getContainer(containerId);

        const response = await getResponse(componentPath);

        container.innerHTML = await response.text();

        /** DEBUG success log */
        console.log(`componentLoader Loaded ${componentPath} into #${containerId}`);
    } catch (error) {
        throw new Error(`componentLoader failed to load component: ${componentPath}, Error: ${error},`);
    }

    function getContainer(containerId: string) : HTMLElement{
        const container = document.getElementById(containerId);

        if (!container) {
            throw new Error(`componentLoader Container #${containerId} not found`);
        }

        return container;
    }

    async function getResponse(componentPath: string): Promise<Response>{
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