/**
 * Fixes for JavaScript errors
 * This file contains fixes for errors in the console
 */

// Fix for luxuryPreloader is not defined
if (typeof luxuryPreloader === 'undefined') {
    // Create a dummy luxuryPreloader object with the same interface
    window.luxuryPreloader = {
        init: function() {
            console.log('Using simplified preloader instead of luxury preloader');
            // If simplePreloader exists, use it instead
            if (typeof simplePreloader !== 'undefined') {
                simplePreloader.init();
            }
        }
    };
}

// Fix for setActiveNavItem is not defined
if (typeof setActiveNavItem === 'undefined') {
    // Define the setActiveNavItem function
    window.setActiveNavItem = function() {
        // Find mobile nav
        var $mobileNav = $('.nav-mobile-app');
        if ($mobileNav.length <= 0) return;
        
        // Always show menu
        $mobileNav.addClass('nav-visible').removeClass('nav-hidden');
        
        // Get current URL
        var currentPath = window.location.pathname;
        var currentPage = currentPath.split('/').pop() || 'home.html';
        
        // If URL is empty, we're probably on home page
        if (currentPage === '') {
            currentPage = 'home.html';
        }
        
        // For consulting page check
        var isConsultingPage = window.location.hash === '#consulting';
        
        // Remove all active classes first
        $mobileNav.find('.nav-item').removeClass('active');
        
        // Find the matching nav item and add active class
        $mobileNav.find('.nav-item').each(function() {
            var $item = $(this);
            var href = $item.attr('href');
            
            // Detect active item based on URL
            if (
                href === currentPage ||
                ((currentPage === 'home.html' || currentPage === 'index.html') &&
                 (href === 'home.html' || href === 'index.html')) ||
                (isConsultingPage && href === 'consulting.html')
            ) {
                $item.addClass('active');
            }
        });
        
        // Add click handler for nav items
        $mobileNav.find('.nav-item').off('click.nav').on('click.nav', function() {
            $mobileNav.find('.nav-item').removeClass('active');
            $(this).addClass('active');
        });
    };
}

// Execute when document is ready
$(document).ready(function() {
    // Call setActiveNavItem if it exists
    if (typeof setActiveNavItem === 'function') {
        setActiveNavItem();
    }
    
    // Fix for font loading warning
    // Preload critical fonts
    function preloadFonts() {
        const fontUrls = [
            'assets/fonts/fa-solid-900.woff2',
            'assets/fonts/fa-brands-400.woff2'
        ];
        
        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    preloadFonts();
    
    // Add mobile-web-app-capable meta tag
    if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
        const meta = document.createElement('meta');
        meta.name = 'mobile-web-app-capable';
        meta.content = 'yes';
        document.head.appendChild(meta);
    }
});
