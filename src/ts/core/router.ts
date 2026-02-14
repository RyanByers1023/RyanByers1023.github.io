/**
 * @file Hash-based client-side router (lazy loader)
 * @description Lightweight routing system using URL hash for navigation with
 * pub-sub pattern for route change notifications
 */

// ============================================================================
// CONSTANTS
// ============================================================================

/** Default route to navigate to when no hash is present */
const DEFAULT_ROUTE = 'projects';

/** Regular expression pattern for matching .html file extensions */
const HTML_EXT_PATTERN = /\.html$/i;

/** Browser event fired when URL hash changes */
const HASH_CHANGE_EVENT = 'hashchange';

/** Browser event fired when navigating through history (back/forward) */
const POP_STATE_EVENT = 'popstate';

/** Event listener options for passive event handling */
const PASSIVE_EVENT_OPTIONS: AddEventListenerOptions = { passive: true };

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Callback function invoked when route changes
 * @callback RouteChangeCallback
 * @param {string} routeName - The new route name
 */
type RouteChangeCallback = (routeName: string) => void;

/**
 * Function to unsubscribe from route change notifications
 * @callback UnsubscribeFunction
 */
type UnsubscribeFunction = () => void;

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * Set of registered route change listeners
 * Using Set for O(1) add/delete operations and automatic deduplication
 * @private
 */
const listeners = new Set<RouteChangeCallback>();

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Extracts the current route name from the URL hash
 *
 * Removes the leading '#' character and any whitespace, falling back
 * to the default route (projects) if no hash is present
 *
 * @returns {string} Current route name without hash prefix or file extension
 *
 * @example
 * // URL: https://ryanbyers1023.github.io/#skills
 * pageFromHash() // Returns 'skills'
 *
 * @example
 * // URL: https://ryanbyers1023.github.io
 * pageFromHash() // Returns 'projects' (default)
 *
 * @private
 */
function pageFromHash(): string {
    const hash = window.location.hash.replace(new RegExp(`^#`), '').trim();
    return hash || DEFAULT_ROUTE;
}

/**
 * Notifies all registered listeners of a route change
 *
 * Iterates through all subscribed callbacks and invokes them with
 * the new route name
 *
 * @param {string} routeName - The route name to broadcast to listeners
 *
 * @private
 */
function notify(routeName: string): void {
    for (const cb of listeners) {
        cb(routeName);
    }
}

/**
 * Handles browser hash change events
 *
 * Extracts the current route from the hash and notifies all listeners.
 * Attached to both 'hashchange' and 'popstate' events to handle
 * all navigation scenarios.
 *
 * @private
 */
function handleHashChange(): void {
    notify(pageFromHash());
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Gets the current active route name
 *
 * Extracts and returns the route from the URL hash, or the default
 * route if no hash is present
 *
 * @returns {string} Current route name
 *
 * @example
 * // URL: https://example.com/#about
 * const route = getCurrentRoute(); // Returns 'about'
 */
export function getCurrentRoute(): string {
    return pageFromHash();
}

/**
 * Navigates to a specified route programmatically
 *
 * Updates the URL hash to trigger navigation. Automatically:
 * - Normalizes route names by removing .html extensions
 * - Triggers 'hashchange' event if hash actually changes
 * - Manually notifies listeners if already on the target route
 *
 * @param {string} routeName - Name of the route to navigate to (with or without .html)
 *
 * @example
 * // Navigate to projects page
 * navigateTo('projects');
 *
 * @example
 * // Navigate with .html extension (automatically normalized)
 * navigateTo('about.html'); // Equivalent to navigateTo('about')
 */
export function navigateTo(routeName: string): void {
    // Normalize by removing .html extension if present
    const clean = routeName.replace(HTML_EXT_PATTERN, '');
    const newHash = `#${clean}`;

    if (window.location.hash !== newHash) {
        // Setting hash triggers 'hashchange' event, which notifies listeners
        window.location.hash = newHash;
    } else {
        // Already on this route - manually notify listeners
        notify(clean);
    }
}

/**
 * Subscribes to route change notifications
 *
 * Registers a callback function to be invoked whenever the route changes.
 * The callback is immediately invoked once with the current route for
 * initial rendering.
 *
 * @param {RouteChangeCallback} cb - Callback function to invoke on route changes
 * @returns {UnsubscribeFunction} Function to call to unsubscribe this listener
 *
 * @example
 * // Subscribe to route changes
 * const unsubscribe = onRouteChange((route) => {
 *   console.log(`Navigated to: ${route}`);
 *   loadPageContent(route);
 * });
 *
 * @example
 * // Later, unsubscribe when component unmounts
 * unsubscribe();
 */
export function onRouteChange(cb: RouteChangeCallback): UnsubscribeFunction {
    listeners.add(cb);

    // Immediate invocation with current route (useful for initial render)
    cb(pageFromHash());

    // Return unsubscribe function
    return () => listeners.delete(cb);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Listen for hash changes (direct hash manipulation or navigateTo calls)
 * Using passive option for better scroll performance
 */
window.addEventListener(HASH_CHANGE_EVENT, handleHashChange, PASSIVE_EVENT_OPTIONS);

/**
 * Listen for popstate events (browser back/forward buttons)
 * Using passive option for better scroll performance
 */
window.addEventListener(POP_STATE_EVENT, handleHashChange, PASSIVE_EVENT_OPTIONS);