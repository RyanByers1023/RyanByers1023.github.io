import { navigateTo, onRouteChange} from './router';
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

export function initNavbar({
                               headerSelector = 'header',
                               menuToggleId   = 'menu-toggle',
                               mobileMenuId   = 'mobile-menu',
                               linkSelector   = '.nav-link',
                           }: NavbarConfig = {}): void {
    const header     = document.querySelector<HTMLElement>(headerSelector);
    const navLinks   = document.querySelectorAll<HTMLAnchorElement>(linkSelector);
    const menuToggle = document.getElementById(menuToggleId);
    const mobileMenu = document.getElementById(mobileMenuId);

    initRouteChangeHandlers();

    initNavLinkClickListeners();

    initStickyHeader();

    initMobileMenuToggle();

    countNavbarLinks();


    function countNavbarLinks() {
        if (!navLinks.length) {
            console.warn('[navbar] No nav links found');
            return;
        }
    }

    // handles scroll events for the header
    function initStickyHeader(): void {
            setStickyHeaderShadow();
            window.addEventListener('scroll', setStickyHeaderShadow, {passive: true});

    }

    // helper function for initStickyHeader(), sets the css to emulate a shadow effect on the navbar
    function setStickyHeaderShadow() : void{
        if (header) {
            // did the user scroll?
            const scrolled = window.scrollY > SCROLL_THRESHOLD;

            // apply the css effects based on whether or not the user was detected scrolling
            header.classList.toggle(SHADOW_CLASS, scrolled);
            header.classList.toggle(PADDING_SMALL_CLASS, scrolled);
            header.classList.toggle(PADDING_LARGE_CLASS, !scrolled);
        }
        else {
            throw new Error("Header could not be found, sticky header not initialized");
        }
    }


    function initRouteChangeHandlers(): void {
        onRouteChange((newRoute: string) => {
            setActiveLink(newRoute);
            closeMobileMenu();
        });
    }

    // handles click events upon navbar links
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

    // wires up the hamburger button to toggle the mobile menu open/closed
    function initMobileMenuToggle(): void {
        if (!menuToggle || !mobileMenu) return;

        menuToggle.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains(HIDDEN_CLASS);
            isOpen ? closeMobileMenu() : openMobileMenu();
        });
    }

    function openMobileMenu(): void {
        if (!mobileMenu || !menuToggle) return;
        mobileMenu.classList.remove(HIDDEN_CLASS);
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.querySelector<SVGElement>('.hamburger-icon')?.classList.add(HIDDEN_CLASS);
        menuToggle.querySelector<SVGElement>('.close-icon')?.classList.remove(HIDDEN_CLASS);
    }

    function closeMobileMenu(): void {
        if (!mobileMenu || !menuToggle) return;
        mobileMenu.classList.add(HIDDEN_CLASS);
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector<SVGElement>('.hamburger-icon')?.classList.remove(HIDDEN_CLASS);
        menuToggle.querySelector<SVGElement>('.close-icon')?.classList.add(HIDDEN_CLASS);
    }

    // sets a navbar link active if the current page matches the link associated with the navbar element's link
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
