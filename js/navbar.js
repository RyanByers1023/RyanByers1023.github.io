function Navbar(){
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Get content container
        const contentContainer = document.getElementById('content-container');
        const loadingIndicator = document.getElementById('loading');

        // All navigation links
        const navLinks = document.querySelectorAll('.nav-link');

        // Function to load content
        async function loadContent(page) {
            try {
                // Show loading indicator
                loadingIndicator.classList.remove('hidden');

                // Fetch the content
                const response = await fetch(page);

                if (!response.ok) {
                    throw new Error(`Failed to load ${page}`);
                }

                let html = await response.text();

                // Extract the section content from the page
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                // Find the section with ID matching the page name (without .html)
                const pageName = page.split('.')[0];
                const section = tempDiv.querySelector(`#${pageName}`);

                if (section) {
                    // Update content container
                    contentContainer.innerHTML = section.outerHTML;
                } else {
                    contentContainer.innerHTML = `<div class="text-center py-16"><p class="text-red-600">Error: Could not find content in ${page}</p></div>`;
                }
            } catch (error) {
                console.error('Error loading content:', error);
                contentContainer.innerHTML = `<div class="text-center py-16"><p class="text-red-600">Error loading content. Please try again.</p></div>`;
            } finally {
                // Hide loading indicator
                loadingIndicator.classList.add('hidden');
            }
        }

        // Handle navigation clicks
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Update active state
                navLinks.forEach(nav => {
                    nav.classList.remove('text-indigo-600');
                    nav.classList.add('text-gray-500');
                });
                this.classList.remove('text-gray-500');
                this.classList.add('text-indigo-600');

                // Load the content
                const page = this.getAttribute('data-page');
                loadContent(page);

                // Update URL without page reload
                history.pushState(null, null, this.getAttribute('href'));

                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            });
        });

        // Handle initial page load and back/forward navigation
        function handleInitialPage() {
            let targetPage = 'about.html'; // Default page
            let targetHash = 'about';

            // Check if there's a hash in the URL
            if (window.location.hash) {
                targetHash = window.location.hash.substring(1);
                targetPage = `${targetHash}.html`;
            }

            // Find the corresponding nav link and simulate a click
            const targetNavLink = document.querySelector(`.nav-link[data-page="${targetPage}"]`);
            if (targetNavLink) {
                // Update active state
                navLinks.forEach(nav => {
                    nav.classList.remove('text-indigo-600');
                    nav.classList.add('text-gray-500');
                });
                targetNavLink.classList.remove('text-gray-500');
                targetNavLink.classList.add('text-indigo-600');

                // Load the content
                loadContent(targetPage);
            } else {
                // Default to about page if target not found
                loadContent('about.html');
            }
        }

        // Handle back/forward navigation
        window.addEventListener('popstate', handleInitialPage);

        // Handle initial page load
        handleInitialPage();
    });

    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Sticky header effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
            header.classList.add('py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('shadow-lg');
            header.classList.add('py-4');
            header.classList.remove('py-2');
        }
    });

    // Navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });

    // Simulated content loading (replace with your actual loading logic)
    document.addEventListener('DOMContentLoaded', function() {
        // Your existing JavaScript code for loading content
        console.log('Content loaded');
    });

    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Sticky header effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
            header.classList.add('py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('shadow-lg');
            header.classList.add('py-4');
            header.classList.remove('py-2');
        }
    });

    // Navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });

    // Check page URL and set active nav link
    document.addEventListener('DOMContentLoaded', function() {
        // Your existing JavaScript code for loading content

        // Example for setting active tab based on URL hash or path
        const currentPage = window.location.hash || '#contact';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
}

Navbar();
