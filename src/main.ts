/**
 * @file Application entry point
 * @description Initializes all core modules including navbar,
 * page loader, and project cards. Modules communicate via a custom lazy loading router.
 */

import '@styles/mainContainerStyles.css';
import '@styles/glassmorphismStyles.css';
import '@styles/projectCardStyles.css';

/** TODO: implement automatic, resizing and reformatting based on device/window size, etc. look into media queries via css */

import { initNavbar } from '@core/navbarInitializer';
import { initPageLoader } from '@core/contentHandler';
import { initAllProjects } from '@projectCardManager/projectsManager';
import { initPageTilt } from '@core/containerTiltManager';
import {loadAllComponents} from "@core/componentLoader";

// ============================================================================
// CONSTANTS
// ============================================================================

/** CSS selector for the header element */
const HEADER_SELECTOR = 'header';

/** ID of the mobile menu toggle button */
const MENU_TOGGLE_ID = 'menu-toggle';

/** CSS selector for navigation links */
const NAV_LINK_SELECTOR = '.nav-link';

/** ID of the main content container element */
const CONTENT_CONTAINER_ID = 'content-container';

/** ID of the loading indicator element */
const LOADING_INDICATOR_ID = 'loading';

/** ID of the projects grid container */
const PROJECTS_GRID_ID = 'projects-grid';

/** Route name for the projects page */
const PROJECTS_ROUTE = 'projects';

/** File extension for HTML page fragments */
const HTML_EXTENSION = '.html';

/** Base path for HTML page files */
const PAGES_BASE_PATH = '/pages/';

// ============================================================================
// INITIALIZATION
// ============================================================================

function initializeNavbar(): void {
    initNavbar({
        headerSelector: HEADER_SELECTOR,
        menuToggleId: MENU_TOGGLE_ID,
        linkSelector: NAV_LINK_SELECTOR,
    });
}

function initializePageLoader(): void {
    initPageLoader({
        containerId: CONTENT_CONTAINER_ID,
        loadingId: LOADING_INDICATOR_ID,
        mapRouteToFile: (route: string) => `${PAGES_BASE_PATH}${route}${HTML_EXTENSION}`,
        onAfterRender: ({ route }) => {
            // Initialize project cards when navigating to projects page
            if (route === PROJECTS_ROUTE) {
                initAllProjects(PROJECTS_GRID_ID);
            }


            //page tilt only runs on the following pages:
            if (route === 'contact' || route === 'skills') {
                initPageTilt();
            }
        }
    });
}

async function bootstrap(): Promise<void> {
    await loadAllComponents();

    initializeNavbar();

    initializePageLoader();
}

if (document.readyState === 'loading') {
    // DOM is still loading, wait for it
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    // DOM is already loaded, start immediately
    bootstrap();
}