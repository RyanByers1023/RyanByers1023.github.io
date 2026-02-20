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
import { initPageLoader } from '@core/pageContentInjector';
import { initAllProjects } from '@projectCardManager/projectsManager';
import {loadAllComponents} from "@core/componentLoader";

// ============================================================================
// CONSTANTS
// ============================================================================

/** CSS selector for the header element */
const HEADER_SELECTOR = 'header';

/** ID of the mobile menu toggle button */
const MENU_TOGGLE_ID = 'menu-toggle';

/** ID of the mobile menu container */
const MOBILE_MENU_ID = 'mobile-menu';

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

/**
 * Initializes the navigation bar with menu toggle and route handling
 *
 * Sets up:
 * - Mobile menu toggle functionality
 * - Active link highlighting
 * - Sticky header behavior
 * - Click handlers for navigation
 *
 * @private
 */
function initializeNavbar(): void {
    initNavbar({
        headerSelector: HEADER_SELECTOR,
        menuToggleId: MENU_TOGGLE_ID,
        linkSelector: NAV_LINK_SELECTOR,
    });
}

/**
 * Initializes the page loader with dynamic content injection
 *
 * Sets up:
 * - Route-based HTML file loading
 * - Loading indicator management
 * - Post-render callback for route-specific initialization
 * - Special handling for projects page to initialize card functionality
 *
 * @private
 */
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
        }
    });
}

// ============================================================================
// BOOTSTRAP APPLICATION
// ============================================================================

/**
 * Bootstraps the application by initializing all core modules
 *
 * Initialization order:
 * 1. Navbar - Sets up navigation UI and route change handlers
 * 2. Page Loader - Sets up content loading and injection
 *
 * Modules communicate exclusively through the router for loose coupling,
 * enabling independent development and testing of each module.
 */
async function bootstrap(): Promise<void> {
    await loadAllComponents();

    initializeNavbar();

    initializePageLoader();
}

// ============================================================================
// APPLICATION START
// ============================================================================

/**
 * Wait for DOM to be fully loaded before initializing application
 * This ensures all HTML elements exist before we try to access them
 */
if (document.readyState === 'loading') {
    // DOM is still loading, wait for it
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    // DOM is already loaded, start immediately
    bootstrap();
}