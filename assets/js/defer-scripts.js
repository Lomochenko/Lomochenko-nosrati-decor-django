/**
 * Script Defer Loader
 * Loads scripts after page content is loaded
 */

// Function to load scripts in sequence
function loadScriptsSequentially(scripts, callback) {
    if (scripts.length === 0) {
        if (callback) callback();
        return;
    }

    var script = document.createElement('script');
    script.src = scripts[0];
    
    script.onload = function() {
        loadScriptsSequentially(scripts.slice(1), callback);
    };
    
    script.onerror = function() {
        console.error('Error loading script: ' + scripts[0]);
        loadScriptsSequentially(scripts.slice(1), callback);
    };
    
    document.body.appendChild(script);
}

// Wait for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Show content immediately
    var mainRoot = document.querySelector('.main-root');
    if (mainRoot) {
        mainRoot.style.visibility = 'visible';
    }
    
    // Enable scrolling
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Load non-critical scripts after a short delay
    setTimeout(function() {
        // Add any non-critical scripts here that can be loaded after page render
        var nonCriticalScripts = [
            // Add paths to non-critical scripts here
        ];
        
        loadScriptsSequentially(nonCriticalScripts, function() {
            console.log('All non-critical scripts loaded');
        });
    }, 1000);
});

// Optimize animations on mobile
(function() {
    // Check if device is mobile
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) {
        // Simplify animations on mobile
        document.body.classList.add('mobile-optimized');
        
        // Reduce animation complexity
        var style = document.createElement('style');
        style.textContent = `
            /* Optimize animations for mobile */
            .mobile-optimized .dsn-animate-active {
                transition-duration: 0.3s !important;
            }
            
            /* Disable parallax effects on mobile */
            .mobile-optimized [data-dsn="parallax"] {
                transform: none !important;
                transition: none !important;
            }
            
            /* Simplify hover effects on mobile */
            .mobile-optimized .cursor {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
})();
