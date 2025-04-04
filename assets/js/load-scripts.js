/**
 * Script Loader for Nosrati Decor
 * Optimized for better performance
 */

// List of scripts to load
const scripts = [
    // Core libraries
    { src: 'assets/js/jquery-3.1.1.min.js', async: false, defer: false },
    { src: 'assets/js/dsn-grid.js', async: false, defer: false },
    
    // Plugins (load asynchronously)
    { src: 'assets/js/plugins.js', async: true, defer: true },
    
    // Custom scripts (load after core libraries)
    { src: 'assets/js/custom.js', async: true, defer: true },
    { src: 'assets/js/main.js', async: true, defer: true }
];

/**
 * Load scripts in order with proper attributes
 */
function loadScripts() {
    let loadedCount = 0;
    const totalScripts = scripts.length;
    
    // Function to load next script
    function loadNextScript(index) {
        if (index >= totalScripts) {
            // All scripts loaded
            document.querySelector('.main-root').style.visibility = 'visible';
            return;
        }
        
        const scriptInfo = scripts[index];
        const script = document.createElement('script');
        
        // Set attributes
        script.src = scriptInfo.src;
        if (scriptInfo.async) script.async = true;
        if (scriptInfo.defer) script.defer = true;
        
        // Set high priority for core scripts
        if (index < 2) {
            script.setAttribute('fetchpriority', 'high');
        }
        
        // Load next script when this one is loaded
        script.onload = function() {
            loadedCount++;
            
            // Load next script
            loadNextScript(index + 1);
            
            // Show content when all scripts are loaded
            if (loadedCount === totalScripts) {
                document.querySelector('.main-root').style.visibility = 'visible';
            }
        };
        
        // Handle errors
        script.onerror = function() {
            console.error('Failed to load script:', scriptInfo.src);
            loadNextScript(index + 1);
        };
        
        // Add to document
        document.head.appendChild(script);
    }
    
    // Start loading scripts
    loadNextScript(0);
}

// Start loading scripts immediately
loadScripts();

// Also make sure content is visible when DOM is ready (as a fallback)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (document.querySelector('.main-root')) {
            document.querySelector('.main-root').style.visibility = 'visible';
        }
    }, 2000); // Fallback after 2 seconds
});
