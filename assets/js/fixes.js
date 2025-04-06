/**
 * Fixes for JavaScript errors
 * This file contains fixes for errors in the console
 */

// Fix for luxuryPreloader is not defined
// We don't need luxuryPreloader anymore as we're using the main preloader
if (typeof luxuryPreloader === 'undefined') {
    window.luxuryPreloader = {
        init: function() {
            // Do nothing - main preloader is used instead
            console.log('Using main preloader instead of luxury preloader');
        }
    };
}

// Fix for setActiveNavItem is not defined
// Mobile navigation is now handled in custom.js to avoid duplication
if (typeof setActiveNavItem === 'undefined') {
    window.setActiveNavItem = function() {
        // This is just a stub - the real implementation is in custom.js
        console.log('Using setActiveNavItem from custom.js');
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
