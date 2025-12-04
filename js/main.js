import { initNavbar } from './navbarInitializer.js';
import { initPageLoader } from './pageContentInjector.js';
import { initAllProjects } from './projectCardManager/projectsManager.js';

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

initPageLoader({
    containerId: 'content-container',
    loadingId: 'loading',
    mapRouteToFile: (route) => `${route}.html`,
    onAfterRender: ({ route }) => {
        if (route === 'projects') {
            initAllProjects('projects-grid');
        }
    }
});

