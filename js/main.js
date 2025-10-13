import { initNavbar } from './navbar.js';
import { initPageLoader } from './pageLoader.js';

// Initialize UI + loader. They communicate only via the router.
initNavbar({
    headerSelector: 'header',
    menuToggleId: 'menu-toggle',
    mobileMenuId: 'mobile-menu',
    linkSelector: '.nav-link',
});

initPageLoader({
    containerId: 'content-container',
    loadingId: 'loading',
    mapRouteToFile: (route) => `${route}.html`,
});