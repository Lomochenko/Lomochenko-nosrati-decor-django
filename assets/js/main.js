/**
 * Main JavaScript file for Nosrati Decor
 * Optimized for better performance
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
        initMobileNav();

        // Initialize fullscreen modal if it exists
        if (document.getElementById('fullscreen-modal')) {
            initFullscreenModal();
        }
    }

    /**
     * Mobile Navigation - Now handled in custom.js
     */
    function initMobileNav() {
        // Mobile navigation is now handled in custom.js to avoid duplication
        if (typeof setActiveNavItem === 'function') {
            setActiveNavItem();
        }
    }

    /**
     * Fullscreen Modal
     */
    function initFullscreenModal() {
        const modal = document.getElementById('fullscreen-modal');
        if (!modal) return;

        const modalBody = modal.querySelector('.modal-body');
        const closeBtn = modal.querySelector('.close-modal');
        const showBtn = document.getElementById('show-modal-btn');
        const seoContent = document.querySelector('.seo-content');
        let isModalOpen = false;
        let scrollPosition = 0;

        // Open modal function
        function openModal() {
            if (isModalOpen) return;

            // Store scroll position
            scrollPosition = window.pageYOffset;

            // Show modal
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('modal-visible');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollPosition}px`;
                document.body.style.width = '100%';
                isModalOpen = true;
            }, 10);
        }

        // Close modal function
        function closeModal() {
            if (!isModalOpen) return;

            // Hide modal
            modal.classList.remove('modal-visible');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, scrollPosition);
                isModalOpen = false;
            }, 300);
        }

        // Add event listeners
        if (showBtn) {
            showBtn.addEventListener('click', openModal);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on click outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        });
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
    window.initMobileNav = initMobileNav;
    window.initFullscreenModal = initFullscreenModal;

})(jQuery);
