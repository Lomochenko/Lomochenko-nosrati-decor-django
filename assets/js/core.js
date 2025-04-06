/**
 * Core JavaScript file for Nosrati Decor
 * Contains essential functionality used across all pages
 */

// Wait for document ready
document.addEventListener('DOMContentLoaded', function() {
    // Show content when DOM is ready
    document.querySelector('.main-root').style.visibility = 'visible';
});

// jQuery document ready
(function($) {
    "use strict";

    // Global variables
    const $window = $(window);
    const $body = $('body');

    /**
     * Initialize all components
     */
    function initAll() {
        // Initialize components only if they exist
        if (typeof SliderProject === 'function') SliderProject();
        if (typeof data_overlay === 'function') data_overlay();
        if (typeof background === 'function') background();
        if (typeof initCursor === 'function') initCursor();
        if (typeof contactValidator === 'function') contactValidator();

        // Initialize mobile navigation
        if (typeof window.mobileNav !== 'undefined' && typeof window.mobileNav.init === 'function') {
            window.mobileNav.init();
        } else if (typeof setActiveNavItem === 'function') {
            setActiveNavItem();
        }
    }

    // Initialize everything when document is ready
    $(document).ready(function() {
        initAll();
    });

    // Re-initialize on AJAX complete
    $(document).on('ajaxComplete', function() {
        initAll();
    });

    // Make functions available globally
    window.initCore = initAll;

})(jQuery);
