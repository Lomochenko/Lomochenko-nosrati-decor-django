/**
 * Isotope Gallery Functionality
 * Handles filtering and layout for gallery items
 */
(function($) {
    'use strict';

    /**
     * Initialize Isotope gallery with filtering
     */
    function initIsotopeGallery() {
        const filteringButtons = $(".filtering");
        
        // Exit if no filtering buttons exist
        if (filteringButtons.length === 0) return;
        
        // Initialize Isotope
        var gallery = $(".gallery").isotope({
            itemSelector: ".item",
            transitionDuration: "0.5s"
        });
        
        // Filter items on button click
        filteringButtons.on("click", "button", function() {
            var filterValue = $(this).attr("data-filter");
            gallery.isotope({
                filter: filterValue
            });
        });
        
        // Add active class to current filter button
        filteringButtons.on("click", "button", function() {
            $(this).addClass("active").siblings().removeClass("active");
            
            // Scroll to gallery after filtering
            let scrollTarget = window;
            if (typeof window.Scrollbar !== 'undefined' && window.Scrollbar.has(document.querySelector('#dsn-scrollbar'))) {
                scrollTarget = window.Scrollbar.get(document.querySelector('#dsn-scrollbar'));
            }
            
            setTimeout(function() {
                TweenLite.to(scrollTarget, 1.5, {
                    scrollTo: gallery.offset().top - 150,
                    ease: Expo.easeInOut
                });
            }, 500);
        });
        
        // Handle videos in gallery items
        gallery.find("video").each(function() {
            this.pause();
            
            $(this).parents(".item").find("> a").on("mouseenter", function() {
                $(this).parents(".item").find("video")[0].play();
            }).on("mouseleave", function() {
                $(this).parents(".item").find("video")[0].pause();
            });
        });
    }

    // Initialize gallery when document is ready
    $(document).ready(function() {
        if ($(".gallery").length > 0) {
            initIsotopeGallery();
        }
    });

    // Re-initialize on AJAX complete
    $(document).on('ajaxComplete', function() {
        if ($(".gallery").length > 0) {
            initIsotopeGallery();
        }
    });

})(jQuery);
