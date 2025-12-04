// Handles navbar UI: menu toggle, sticky header, active link styling, and emitting navigation.
import { navigateTo, onRouteChange, getCurrentRoute } from './router.js';

export function initNavbar({
                               headerSelector = 'header',
                               menuToggleId = 'menu-toggle',
                               mobileMenuId = 'mobile-menu',
                               linkSelector = '.nav-link',
                           } = {}) {
    const header     = document.querySelector(headerSelector);
    const menuToggle = document.getElementById(menuToggleId);
    const mobileMenu = document.getElementById(mobileMenuId);
    const navLinks   = document.querySelectorAll(linkSelector);

    if (!navLinks.length) {
        console.warn('[navbar] No nav links found');
        return;
    }

    // Active state management
    function setActiveLink(routeName) {
        navLinks.forEach(link => {
            const linkRoute = link.getAttribute('data-page');
            if (linkRoute === routeName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Sticky header
    if (header) {
        const updateHeaderShadow = () => {
            const SCROLL_THRESHOLD = 100;
            const scrolled = window.scrollY > SCROLL_THRESHOLD;
            header.classList.toggle('shadow-lg', scrolled);
            header.classList.toggle('py-2', scrolled);
            header.classList.toggle('py-4', !scrolled);
        };
        updateHeaderShadow();
        window.addEventListener('scroll', updateHeaderShadow, { passive: true });
    }

    // Menu toggle
    if (menuToggle && mobileMenu) {
        menuToggle.setAttribute('aria-controls', mobileMenuId);
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            menuToggle.setAttribute('aria-expanded', String(!isHidden));
        });
    }

    // Link clicks -> navigate
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const routeName = link.getAttribute('data-page');
            if (routeName) {
                navigateTo(routeName);

                // Close mobile menu
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    if (menuToggle) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // Listen for route changes and update active link
    onRouteChange((newRoute) => {
        setActiveLink(newRoute);
    });
}