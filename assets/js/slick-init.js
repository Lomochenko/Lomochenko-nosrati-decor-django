/**
 * Slick Slider Initialization
 * Handles initialization of various slick sliders throughout the site
 */
(function($) {
    'use strict';

    /**
     * Initialize client cursor slider
     */
    function slick_client() {
        var $clientCurs = $(".client-curs");
        
        if ($clientCurs.length > 0) {
            $clientCurs.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                infinite: true,
                nextArrow: '<i class="fas fa-angle-right"></i>',
                prevArrow: '<i class="fas fa-angle-left"></i>',
                cssEase: "cubic-bezier(.9, .03, .41, .49)",
                speed: 700
            });
            
            // Add parallax effect to arrows on desktop
            if ($(window).width() > 991) {
                if (typeof dsnGrid !== 'undefined' && typeof dsnGrid.parallaxMoveElemnt === 'function') {
                    dsnGrid.parallaxMoveElemnt($clientCurs.find(".fas.fa-angle-right"), 25);
                    dsnGrid.parallaxMoveElemnt($clientCurs.find(".fas.fa-angle-left"), 25);
                }
            }
        }
    }

    /**
     * Initialize client testimonial slider
     */
    function initClientTestimonialSlider() {
        $(".client-see .slick-slider").slick({
            infinite: true,
            slidesToShow: 1,
            arrows: false,
            dots: true,
            fade: true,
            cssEase: "linear"
        });
    }

    /**
     * Initialize 2-column sliders (news, team, etc.)
     */
    function initTwoColumnSliders() {
        $('.our-news .slick-slider, .our-team .slick-slider, [data-dsn-col="2"] .slick-slider').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
            cssEase: 'ease-out',
            speed: 800,
            fade: false,
            swipe: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        autoplaySpeed: 2500
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplaySpeed: 2000
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplaySpeed: 1800
                    }
                }
            ]
        });
    }

    /**
     * Initialize 3-column sliders
     */
    function initThreeColumnSliders() {
        $('[data-dsn-col="3"] .slick-slider').slick({
            infinite: true,
            slidesToShow: 3,
            arrows: false,
            dots: true,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, 
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    /**
     * Initialize all slick sliders
     */
    function initAllSliders() {
        slick_client();
        initClientTestimonialSlider();
        initTwoColumnSliders();
        initThreeColumnSliders();
    }

    // Initialize sliders when document is ready
    $(document).ready(function() {
        initAllSliders();
    });

    // Re-initialize on AJAX complete
    $(document).on('ajaxComplete', function() {
        initAllSliders();
    });

    // Make functions available globally
    window.initSlickSliders = initAllSliders;

})(jQuery);
