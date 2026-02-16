/**
 * @file Navbar UI controller
 * @description Manages navbar interactions including menu toggle, sticky header behavior,
 * active link styling, and integration with the application router
 */

import { navigateTo, onRouteChange, getCurrentRoute } from './router';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Configuration options for navbar initialization
 */
interface NavbarConfig {
    /** CSS selector for the header element */
    headerSelector?: string;
    /** ID of the mobile menu toggle button */
    menuToggleId?: string;
    /** ID of the mobile menu container */
    mobileMenuId?: string;
    /** CSS selector for navigation links */
    linkSelector?: string;
}

// ============================================================================
// PUBLIC API
// ============================================================================

 *
 * @param {NavbarConfig} config - Configuration object for navbar selectors and IDs
 * @param {string} [config.headerSelector='header'] - CSS selector for header element
 * @param {string} [config.menuToggleId='menu-toggle'] - ID of menu toggle button
 * @param {string} [config.mobileMenuId='mobile-menu'] - ID of mobile menu container
 * @param {string} [config.linkSelector='.nav-link'] - CSS selector for navigation links
 */

export function initNavbar({
                               headerSelector = 'header',
                               menuToggleId = 'menu-toggle',
                               mobileMenuId = 'mobile-menu',
                               linkSelector = '.nav-link',
                           }: NavbarConfig = {}): void {


    /* TODO: move these module level constants to the top of the file**/
    // ========================================================================
    // CONSTANTS
    // ========================================================================

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
    
    const header = document.querySelector<HTMLElement>(headerSelector);
    const menuToggle = document.getElementById(menuToggleId);
    const mobileMenu = document.getElementById(mobileMenuId);
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(linkSelector);

    if (!navLinks.length) {
        console.warn('[navbar] No nav links found');
        return;
    }

    initRouteChangeHandlers(newRoute);

    initNavLinkClickListeners(e);

    initStickyHeader();



    function initRouteChangeHandlers(newRoute: string): void{
        onRouteChange((newRoute: string) => {
            setActiveLink(newRoute);
        });
    }

    function initNavLinkClickListeners(e: Event): void{
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

    /** TODO: move sticky header utils to another file */

    // ========================================================================
    // STICKY HEADER
    // ========================================================================

    function initStickyHeader() : void{
        if (header) {
            const updateHeaderShadow = (): void => {
                const scrolled = window.scrollY > SCROLL_THRESHOLD;
                header.classList.toggle(SHADOW_CLASS, scrolled);
                header.classList.toggle(PADDING_SMALL_CLASS, scrolled);
                header.classList.toggle(PADDING_LARGE_CLASS, !scrolled);
            };

            updateHeaderShadow();
            window.addEventListener('scroll', updateHeaderShadow, { passive: true });
        }
        else{
            throw new Error("Header could not be found, sticky header not initialized");
        }
    }
}