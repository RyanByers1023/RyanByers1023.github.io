// Handles navbar UI: menu toggle, sticky header, active link styling, and emitting navigation.
import { navigateTo, onRouteChange } from './router.js';

export function initNavbar({
                               headerSelector = 'header',
                               menuToggleId = 'menu-toggle',
                               mobileMenuId = 'mobile-menu',
                               linkSelector = 'nav-link',   // links must have data-page="routeName"
                           } = {}) {
    document.addEventListener('DOMContentLoaded', () => {
        const header     = document.querySelector(headerSelector);
        const menuToggle = document.getElementById(menuToggleId);
        const mobileMenu = document.getElementById(mobileMenuId);
        const navLinks = document.querySelectorAll(linkSelector);

        // Make sure the highlighted link in the navbar is correct, even through refreshes:
        // Option 1: Use what was last clicked
        const savedRoute = localStorage.getItem('activeRoute');

        if (savedRoute) {
            setActiveLink(savedRoute);
        } else {
            // Option 2: Fall back to current URL
            const currentPath = window.location.pathname.split('/').pop();
            setActiveLink(currentPath);
        }

        // Sticky header
        const updateHeaderShadow = () => {
            if (!header) return;
            const SCROLL_THRESHOLD = 100;
            const scrolled = window.scrollY > SCROLL_THRESHOLD;
            header.classList.toggle('shadow-lg', scrolled);
            header.classList.toggle('py-2', scrolled);
            header.classList.toggle('py-4', !scrolled);
        };
        updateHeaderShadow();
        window.addEventListener('scroll', updateHeaderShadow, { passive: true });

        // Menu toggle
        if (menuToggle && mobileMenu) {
            menuToggle.setAttribute('aria-controls', mobileMenuId);
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.addEventListener('click', () => {
                const willOpen = !mobileMenu.classList.toggle('hidden');
                menuToggle.setAttribute('aria-expanded', String(willOpen));
            });
        }

        // Active state management (when route changes)
        const setActiveLink = (routeName) => {
            const target = Array.from(navLinks).find(
                link => link.getAttribute('data-page') === routeName
            );

            navLinks.forEach(link => link.classList.remove('active'));

            if (target) {
                target.classList.add('active');
            }
        };

        // Link clicks -> navigate
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const routeName = link.getAttribute('data-page');
                if (!routeName) return; // let normal navigation happen if missing
                //prevent page reload
                e.preventDefault();
                setActiveLink(routeName);
                //used later to check highlighted page in navbar
                localStorage.setItem('activeRoute', routeName);
                navigateTo(routeName);
            });
        });
    });
}
