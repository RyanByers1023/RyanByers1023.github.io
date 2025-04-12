
// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);
            
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('active');
            });
            
            tabs.forEach(tab => {
                tab.classList.remove('active-tab');
                tab.classList.remove('bg-accent');
            });
            
            tab.classList.add('active-tab');
            tab.classList.add('bg-accent');
            target.classList.add('active');
            
            // Close mobile menu after selection
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });
    
    // Initialize the first tab as active
    tabs[0].classList.add('active-tab');
    tabs[0].classList.add('bg-accent');
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Course list toggles
    const umkcCoursesBtn = document.getElementById('umkc-courses-btn');
    const umkcChevron = document.getElementById('umkc-chevron');
    const umkcCourses = document.getElementById('umkc-courses');
    
    umkcCoursesBtn.addEventListener('click', () => {
        umkcCourses.classList.toggle('hidden');
        umkcChevron.classList.toggle('rotate-180');
    });
    
    const worwicCoursesBtn = document.getElementById('worwic-courses-btn');
    const worwicChevron = document.getElementById('worwic-chevron');
    const worwicCourses = document.getElementById('worwic-courses');
    
    worwicCoursesBtn.addEventListener('click', () => {
        worwicCourses.classList.toggle('hidden');
        worwicChevron.classList.toggle('rotate-180');
    });
});
