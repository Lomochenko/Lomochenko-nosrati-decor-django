// Critical JavaScript for initial loading
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader when page is loaded
    var loader = document.querySelector('.wait-loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Show content
    var content = document.querySelector('.main-root');
    if (content) {
        content.style.visibility = 'visible';
    }
});

// Preload main JavaScript file
var mainScript = document.createElement('script');
mainScript.src = 'assets/js/all.min.js';
document.head.appendChild(mainScript);
