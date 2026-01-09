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

/**
 * Initializes the navbar with interactive functionality
 *
 * Sets up the following features:
 * - Active link highlighting based on current route
 * - Sticky header with shadow effect on scroll
 * - Mobile menu toggle with ARIA accessibility
 * - Navigation link click handling with router integration
 * - Route change listener for automatic active state updates
 *
 * @param {NavbarConfig} config - Configuration object for navbar selectors and IDs
 * @param {string} [config.headerSelector='header'] - CSS selector for header element
 * @param {string} [config.menuToggleId='menu-toggle'] - ID of menu toggle button
 * @param {string} [config.mobileMenuId='mobile-menu'] - ID of mobile menu container
 * @param {string} [config.linkSelector='.nav-link'] - CSS selector for navigation links
 *
 * @example
 * // Initialize with default selectors
 * initNavbar();
 *
 * @example
 * // Initialize with custom selectors
 * initNavbar({
 *   headerSelector: 'nav-header',
 *   menuToggleId: '.nav-menu-toggle-button',
 *   mobileMenuId: 'nav-menu-mobile',
 *   linkSelector: '.nav-link'
 * });
 */
export function initNavbar({
                               headerSelector = 'header',
                               menuToggleId = 'menu-toggle',
                               mobileMenuId = 'mobile-menu',
                               linkSelector = '.nav-link',
                           }: NavbarConfig = {}): void {

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

    // ========================================================================
    // DOM ELEMENT REFERENCES
    // ========================================================================

    const header = document.querySelector<HTMLElement>(headerSelector);
    const menuToggle = document.getElementById(menuToggleId);
    const mobileMenu = document.getElementById(mobileMenuId);
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(linkSelector);

    if (!navLinks.length) {
        console.warn('[navbar] No nav links found');
        return;
    }

    // ========================================================================
    // ACTIVE STATE MANAGEMENT
    // ========================================================================

    /**
     * Updates active state styling for navigation links
     *
     * Adds 'active' class to the link matching the current route and removes
     * it from all other links
     *
     * @param {string} routeName - Name of the currently active route
     * @private
     */
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

    // ========================================================================
    // STICKY HEADER
    // ========================================================================

    /**
     * Implements sticky header behavior with scroll-based styling
     *
     * Updates header appearance when user scrolls past threshold:
     * - Adds shadow for depth perception
     * - Adjusts padding for compact appearance
     *
     * @private
     */
    if (header) {
        /**
         * Updates header shadow and padding based on scroll position
         *
         * Threshold set at 100px - header styling changes when user
         * scrolls beyond this point
         *
         * @private
         */
        const updateHeaderShadow = (): void => {
            const scrolled = window.scrollY > SCROLL_THRESHOLD;
            header.classList.toggle(SHADOW_CLASS, scrolled);
            header.classList.toggle(PADDING_SMALL_CLASS, scrolled);
            header.classList.toggle(PADDING_LARGE_CLASS, !scrolled);
        };

        updateHeaderShadow();
        window.addEventListener('scroll', updateHeaderShadow, { passive: true });
    }

    // ========================================================================
    // MOBILE MENU TOGGLE
    // ========================================================================

    /**
     * Sets up mobile menu toggle functionality with accessibility support
     *
     * Implements ARIA attributes for screen reader compatibility and
     * toggles menu visibility on button click
     *
     * @private
     */
    if (menuToggle && mobileMenu) {
        menuToggle.setAttribute(ARIA_CONTROLS, mobileMenuId);
        menuToggle.setAttribute(ARIA_EXPANDED, 'false');

        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle(HIDDEN_CLASS);
            menuToggle.setAttribute(ARIA_EXPANDED, String(!isHidden));
        });
    }

    // ========================================================================
    // NAVIGATION LINK HANDLERS
    // ========================================================================

    /**
     * Attaches click handlers to navigation links for route navigation
     *
     * Prevents default link behavior, triggers router navigation,
     * and closes mobile menu after navigation
     *
     * @private
     */
    navLinks.forEach(link => {
        link.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const routeName = link.getAttribute(DATA_PAGE_ATTR);

            if (routeName) {
                navigateTo(routeName);

                // Close mobile menu after navigation
                if (mobileMenu) {
                    mobileMenu.classList.add(HIDDEN_CLASS);
                    if (menuToggle) {
                        menuToggle.setAttribute(ARIA_EXPANDED, 'false');
                    }
                }
            }
        });
    });

    // ========================================================================
    // ROUTE CHANGE LISTENER
    // ========================================================================

    /**
     * Registers callback to update active link styling on route changes
     *
     * Ensures navbar reflects current route even when navigation occurs
     * through other means (e.g., browser back/forward buttons)
     *
     * @private
     */
    onRouteChange((newRoute: string) => {
        setActiveLink(newRoute);
    });
}