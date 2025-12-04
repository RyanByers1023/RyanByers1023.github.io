// small hash-based router. Others can subscribe to route changes.
const listeners = new Set();
const DEFAULT_ROUTE = 'projects';

function pageFromHash() {
    const hash = window.location.hash.replace(/^#/, '').trim();
    return hash || DEFAULT_ROUTE; // route name (no .html)
}

export function getCurrentRoute() {
    return pageFromHash();
}

export function navigateTo(routeName) {
    // Normalize (no .html)
    const clean = routeName.replace(/\.html$/i, '');
    const newHash = `#${clean}`;
    if (window.location.hash !== newHash) {
        // Setting hash triggers 'hashchange' -> listeners will be notified
        window.location.hash = newHash;
    } else {
        // If already on this hash, manually notify
        notify(clean);
    }
}

export function onRouteChange(cb) {
    listeners.add(cb);
    // immediate first call with current route (useful for initial render)
    cb(pageFromHash());
    return () => listeners.delete(cb);
}

function notify(routeName) {
    for (const cb of listeners) cb(routeName);
}

function handleHashChange() {
    notify(pageFromHash());
}

window.addEventListener('hashchange', handleHashChange, { passive: true });
window.addEventListener('popstate', handleHashChange, { passive: true });