/**
 * @file Shared type definitions for the component-based architecture
 * @description Defines the Component interface and related types that all
 * UI components must implement for unified lifecycle management
 */

/**
 * Contract that every UI component must implement.
 *
 * The ComponentManager uses this interface to orchestrate mounting,
 * unmounting, and route-driven updates for all registered components.
 *
 * Persistent components (navbar, footer) mount once at startup.
 * Dynamic components (page content) remount on every route change.
 *
 * @example
 * const myComponent: Component = {
 *   containerId: 'sidebar-container',
 *   persistent: true,
 *   async getTemplate() { return '<nav>...</nav>'; },
 *   onMount(container) { container.querySelector('button')?.addEventListener('click', handler); },
 *   onUnmount(container) { container.querySelector('button')?.removeEventListener('click', handler); },
 * };
 */

export interface Component {
    /** DOM element ID where this component's HTML will be injected */
    containerId: string;

    /**
     * Whether the component stays mounted across route changes.
     *
     * - `true`:  Mounted once during init, `onRouteChange` called on navigation
     * - `false`: Full unmount → getTemplate → mount cycle on every route change
     */
    persistent: boolean;

    /**
     * Fetches or generates the HTML string for this component.
     *
     * For persistent components, `route` reflects the initial route.
     * For dynamic components, `route` is the newly navigated route.
     *
     * @param route - Current route name
     * @returns HTML string to inject into the container
     */
    getTemplate(route: string): Promise<string>;

    /**
     * Called after the component's HTML has been injected into the DOM.
     *
     * Used to attach event listeners, initialize third-party libraries,
     * or perform any DOM-dependent setup.
     *
     * @param container - The mounted container element
     * @param route - Current route name
     */
    onMount(container: HTMLElement, route: string): void;

    /**
     * Called before the component's HTML is removed from the DOM.
     *
     * Use this to remove event listeners, cancel timers, abort fetch
     * requests, or perform any cleanup to prevent memory leaks.
     *
     * @param container - The container element about to be cleared
     */
    onUnmount?(container: HTMLElement): void;

    /**
     * Called on persistent components when the route changes.
     *
     * Allows persistent components to react to navigation without
     * a full remount cycle (e.g., updating active link highlighting).
     *
     * @param route - The new route name
     * @param container - The component's container element
     */
    onRouteChange?(route: string, container: HTMLElement): void;
}