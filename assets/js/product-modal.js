/**
 * Bootstrap-style Modal Functionality for Product Page
 * Lightweight, performance-focused implementation
 */
(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing modal...');
        initProductModal();
    });

    function initProductModal() {
        // Get all required elements
        const modal = document.getElementById('fullscreen-modal');
        const showBtn = document.getElementById('show-modal-btn');

        // Exit if essential elements don't exist
        if (!modal || !showBtn) {
            console.error('Modal or button not found:', { modal: !!modal, button: !!showBtn });
            return;
        }

        const modalContent = modal.querySelector('.modal-content');
        const modalBody = modal.querySelector('.modal-body');
        const closeBtn = modal.querySelector('.close-modal');

        // Create SEO content if it doesn't exist
        let seoContent = document.querySelector('.seo-content');

        // State variables
        let isModalOpen = false;
        let scrollPosition = 0;

        // Show modal function - Bootstrap style
        function showModal(e) {
            if (e) e.preventDefault();
            if (isModalOpen) return;

            console.log('Opening modal');

            // Save scroll position
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            // Copy SEO content to modal
            if (modalBody && seoContent) {
                modalBody.innerHTML = seoContent.innerHTML;
            }

            // Show modal with optimized animation
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling

            // Ensure modal is visible in current viewport
            window.scrollTo({
                top: window.scrollY,
                behavior: 'auto'
            });

            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                modal.classList.add('show');
                isModalOpen = true;

                // Force browser to recognize the modal in the current viewport
                setTimeout(() => {
                    window.scrollTo({
                        top: window.scrollY,
                        behavior: 'auto'
                    });
                }, 50);
            });
        }

        // Close modal function
        function closeModal() {
            if (!isModalOpen) return;

            console.log('Closing modal');
            modal.classList.remove('show');
            isModalOpen = false;

            // Hide modal after animation completes
            setTimeout(() => {
                modal.style.display = 'none';
                if (modalBody) modalBody.innerHTML = '';
                document.body.style.overflow = ''; // Restore scrolling

                // Restore scroll position
                window.scrollTo(0, scrollPosition);
            }, 300);
        }

        // Event listeners - using passive where possible for better performance
        showBtn.addEventListener('click', showModal, { passive: false });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal, { passive: true });
        }

        // Close when clicking outside content
        modal.addEventListener('click', function(e) {
            if (modalContent && !modalContent.contains(e.target)) {
                closeModal();
            }
        }, { passive: true });

        // Close with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        }, { passive: true });

        // Allow scrolling within modal content
        if (modalBody) {
            modalBody.addEventListener('wheel', function(e) {
                e.stopPropagation();
            }, { passive: true });

            modalBody.addEventListener('touchmove', function(e) {
                e.stopPropagation();
            }, { passive: true });
        }

        console.log('Modal initialized successfully');
    }
})();
