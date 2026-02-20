import { navigateTo, onRouteChange, getCurrentRoute } from './router';
/** Module level constants, pre-written tailwind CSS stlying */

/** Scroll distance threshold for triggering header style changes */
const SCROLL_THRESHOLD = 100;

/** Data attribute for storing route names on navigation links */
const DATA_PAGE_ATTR = 'data-page';

/** CSS class applied to active navigation links */
const ACTIVE_CLASS = 'active';

/** CSS class for hiding mobile menu */
const HIDDEN_CLASS = 'hidden';

/** CSS class for large shadow effect on scrolled header */
const SHADOW_CLASS = 'shadow-lg';

/** CSS class for compact header padding when scrolled */
const PADDING_SMALL_CLASS = 'py-2';

/** CSS class for default header padding when at top */
const PADDING_LARGE_CLASS = 'py-4';

/** ARIA attribute for associating toggle button with menu */
const ARIA_CONTROLS = 'aria-controls';

/** ARIA attribute for indicating menu expanded state */
const ARIA_EXPANDED = 'aria-expanded';

/**
 * Configuration options for navbar initialization
 */
interface NavbarConfig {
    /** CSS selector for the header element */
    headerSelector?: string;

    /** ID of the mobile menu toggle button */
    menuToggleId?: string;

    /** CSS selector for navigation links */
    linkSelector?: string;
}

export function initNavbar({
                               headerSelector = 'header',
                               menuToggleId = 'menu-toggle',
                               linkSelector = '.nav-link',
                           }: NavbarConfig = {}): void {

    /** retrieve DOM references relative to the navbar */
    const header = document.querySelector<HTMLElement>(headerSelector);
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(linkSelector);
    const menuToggle = document.getElementById(menuToggleId);

    initRouteChangeHandlers();

    initNavLinkClickListeners();

    initStickyHeader();

    countNavbarLinks();

    function countNavbarLinks() {
        if (!navLinks.length) {
            console.warn('[navbar] No nav links found');
            return;
        }
    }

    function initStickyHeader(): void {
        if (header) {
            const updateHeaderShadow = (): void => {
                const scrolled = window.scrollY > SCROLL_THRESHOLD;
                header.classList.toggle(SHADOW_CLASS, scrolled);
                header.classList.toggle(PADDING_SMALL_CLASS, scrolled);
                header.classList.toggle(PADDING_LARGE_CLASS, !scrolled);
            };

            updateHeaderShadow();
            window.addEventListener('scroll', updateHeaderShadow, {passive: true});
        } else {
            throw new Error("Header could not be found, sticky header not initialized");
        }
    }


    function initRouteChangeHandlers(): void {
        onRouteChange((newRoute: string) => {
            setActiveLink(newRoute);
        });
    }

    function initNavLinkClickListeners(): void {
        navLinks.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const routeName = link.getAttribute(DATA_PAGE_ATTR);

                if (routeName) {
                    navigateTo(routeName);
                }
            });
        });
    }


    /** TODO: move active state management utils to another file */

    // ========================================================================
    // ACTIVE STATE MANAGEMENT
    // ========================================================================

    function setActiveLink(routeName: string): void {
        navLinks.forEach(link => {
            const linkRoute = link.getAttribute(DATA_PAGE_ATTR);
            if (linkRoute === routeName) {
                link.classList.add(ACTIVE_CLASS);
            } else {
                link.classList.remove(ACTIVE_CLASS);
            }
        });
    }
}