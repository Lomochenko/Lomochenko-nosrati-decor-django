/**
 * Lazy Load Images
 * Improves performance by loading images only when they enter the viewport
 */

document.addEventListener("DOMContentLoaded", function() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Create a new IntersectionObserver instance
        var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                // If the image is in the viewport
                if (entry.isIntersecting) {
                    var lazyImage = entry.target;
                    
                    // Set the src attribute to the value of data-src
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.removeAttribute('data-src');
                    }
                    
                    // Set the srcset attribute to the value of data-srcset
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                        lazyImage.removeAttribute('data-srcset');
                    }
                    
                    // Set the background image if data-bg is present
                    if (lazyImage.dataset.bg) {
                        lazyImage.style.backgroundImage = "url('" + lazyImage.dataset.bg + "')";
                        lazyImage.removeAttribute('data-bg');
                    }
                    
                    // Add a loaded class to the image
                    lazyImage.classList.add('loaded');
                    
                    // Stop observing the image
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        // Get all images with data-src attribute
        var lazyImages = document.querySelectorAll('img[data-src], img[data-srcset], [data-bg]');
        
        // Observe each image
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        var lazyImages = document.querySelectorAll('img[data-src], img[data-srcset], [data-bg]');
        
        // Load all images immediately
        lazyImages.forEach(function(lazyImage) {
            if (lazyImage.dataset.src) {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.removeAttribute('data-src');
            }
            
            if (lazyImage.dataset.srcset) {
                lazyImage.srcset = lazyImage.dataset.srcset;
                lazyImage.removeAttribute('data-srcset');
            }
            
            if (lazyImage.dataset.bg) {
                lazyImage.style.backgroundImage = "url('" + lazyImage.dataset.bg + "')";
                lazyImage.removeAttribute('data-bg');
            }
            
            lazyImage.classList.add('loaded');
        });
    }
    
    // Convert existing background images to lazy load
    var bgElements = document.querySelectorAll('.cover-bg, [data-image-src]');
    bgElements.forEach(function(element) {
        var bgUrl = element.style.backgroundImage;
        if (!bgUrl || bgUrl === 'none') {
            bgUrl = element.getAttribute('data-image-src');
            if (bgUrl) {
                element.setAttribute('data-bg', bgUrl);
                element.removeAttribute('data-image-src');
                element.style.backgroundImage = 'none';
            }
        }
    });
});
