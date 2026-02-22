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

function pageFromHash(): string {
    const hash = window.location.hash.replace(new RegExp(`^#`), '').trim();
    return hash || DEFAULT_ROUTE;
}

/**
 * Notifies all registered listeners of a route change
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
 * @returns {string} Current route name
 *
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
 * @param {RouteChangeCallback} cb - Callback function to invoke on route changes
 * @returns {UnsubscribeFunction} Function to call to unsubscribe this listener
 *
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
 */
window.addEventListener(HASH_CHANGE_EVENT, handleHashChange, PASSIVE_EVENT_OPTIONS);

/**
 * Listen for popstate events (browser back/forward buttons)
 */
window.addEventListener(POP_STATE_EVENT, handleHashChange, PASSIVE_EVENT_OPTIONS);