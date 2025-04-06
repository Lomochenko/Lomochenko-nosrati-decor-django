/**
 * Mobile Navigation - Optimized for Performance
 * This file handles the mobile navigation functionality
 */

(function($) {
    'use strict';

    // Store the current active page
    var currentPage = '';

    // Function to get the current page from URL
    function getCurrentPage() {
        var path = window.location.pathname;
        var page = path.split('/').pop() || 'home.html';

        // If URL is empty, we're probably on home page
        if (page === '' || page === 'home.html') {
            page = 'home.html';
        }

        return page;
    }

    // Function to set active nav item
    function setActiveNavItem(page) {
        // Find mobile nav
        var $mobileNav = $('.nav-mobile-app');
        if ($mobileNav.length <= 0) return;

        // Always show menu
        $mobileNav.addClass('nav-visible').removeClass('nav-hidden');

        // Get current page
        currentPage = page || getCurrentPage();
        var currentHash = window.location.hash;
        var isConsultingPage = currentHash === '#consulting';

        // Remove all active classes first
        $mobileNav.find('.nav-item').removeClass('active');

        // Find the matching nav item and add active class
        $mobileNav.find('.nav-item').each(function() {
            var $item = $(this);
            var href = $item.attr('href');
            var hrefBase = href.split('#')[0]; // Get base URL without hash

            // Detect active item based on URL
            if (
                hrefBase === currentPage ||
                ((currentPage === 'home.html') && (hrefBase === 'home.html' || hrefBase === 'home.html')) ||
                (isConsultingPage && href.indexOf('consulting') !== -1)
            ) {
                $item.addClass('active');
            }
        });
    }

    // Function to handle nav item click with SPA-like behavior
    function handleNavItemClick(e) {
        e.preventDefault(); // Prevent default link behavior

        var $this = $(this);
        var href = $this.attr('href');

        // Don't do anything if this is already the active page
        if ($this.hasClass('active')) {
            return;
        }

        // Set this item as active
        $('.nav-mobile-app').find('.nav-item').removeClass('active');
        $this.addClass('active');

        // Show wait-loader
        $('.wait-loader').show();

        // Disable scrolling
        $('body').css('overflow', 'hidden');

        // Update current page
        currentPage = href;

        // Update browser history
        history.pushState(null, null, href);

        // Load content using the shared function
        loadPageContent(href);
    }

    // Initialize mobile navigation and handle all internal links
    function initMobileNav() {
        var $mobileNav = $('.nav-mobile-app');
        if ($mobileNav.length <= 0) return;

        // Set initial active item
        setActiveNavItem();

        // Remove any existing click handlers to prevent duplicates
        $mobileNav.find('.nav-item').off('click.mobileNav');
        $('a[href]').off('click.internalLink');

        // Add click handler to mobile nav items
        $mobileNav.find('.nav-item').on('click.mobileNav', handleNavItemClick);

        // Add click handler to all internal links
        $('a[href]').on('click.internalLink', function(e) {
            var $this = $(this);
            var href = $this.attr('href');

            // Skip if this is a mobile nav item (already handled)
            if ($this.hasClass('nav-item') && $this.closest('.nav-mobile-app').length > 0) {
                return;
            }

            // Skip external links, anchor links, javascript links, etc.
            if (href.indexOf('http') === 0 ||
                href.indexOf('#') === 0 ||
                href.indexOf('javascript:') === 0 ||
                href.indexOf('tel:') === 0 ||
                href.indexOf('mailto:') === 0 ||
                $this.attr('target') === '_blank') {
                return;
            }

            // This is an internal link, handle it like mobile nav items
            e.preventDefault();

            // Update active item in mobile nav based on the href
            updateMobileNavActive(href);

            // Show wait-loader
            $('.wait-loader').show();

            // Disable scrolling
            $('body').css('overflow', 'hidden');

            // Update browser history
            history.pushState(null, null, href);

            // Load content using fetch for better performance
            loadPageContent(href);
        });
    }

    // Function to update active item in mobile nav based on href
    function updateMobileNavActive(href) {
        var $mobileNav = $('.nav-mobile-app');
        if ($mobileNav.length <= 0) return;

        // Extract page name from href
        var pageName = href.split('/').pop() || 'home.html';

        // Remove active class from all items
        $mobileNav.find('.nav-item').removeClass('active');

        // Find matching nav item and add active class
        $mobileNav.find('.nav-item').each(function() {
            var $item = $(this);
            var navHref = $item.attr('href');
            var navPage = navHref.split('/').pop() || 'home.html';

            // Check if this nav item matches the current page
            if (navPage === pageName ||
                (pageName === 'home.html' && navPage === 'home.html') ||
                (pageName === 'home.html' && navPage === 'home.html')) {
                $item.addClass('active');
            }
        });
    }

    // Function to load page content using fetch
    function loadPageContent(href) {
        fetch(href)
            .then(function(response) {
                if (!response.ok) {
                    window.location = href;
                    return;
                }
                return response.text();
            })
            .then(function(html) {
                if (!html) return;

                // Parse the HTML
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');

                // Extract main content
                var newContent = doc.querySelector('main.main-root');
                if (!newContent) {
                    window.location = href;
                    return;
                }

                // Remove preloader from new content
                var preloader = newContent.querySelector('.preloader');
                if (preloader) {
                    preloader.parentNode.removeChild(preloader);
                }

                // Update page title
                var title = doc.querySelector('title');
                if (title) {
                    document.title = title.textContent;
                }

                // Replace main content
                $('main.main-root').html(newContent.innerHTML);

                // Load images before showing content
                var images = $('main.main-root').find('img');
                var imagesLoaded = 0;
                var totalImages = images.length;
                var minImagesToLoad = Math.min(3, totalImages);
                var scrollEnabled = false;

                // Set a minimum loading time to prevent flickering
                var minLoadingTime = 800; // milliseconds
                var loadingStartTime = new Date().getTime();

                // Function to check if we can hide the loader and enable scrolling
                function checkIfLoadingComplete() {
                    var currentTime = new Date().getTime();
                    var timeElapsed = currentTime - loadingStartTime;

                    // Only complete loading if minimum time has passed AND minimum images are loaded
                    if (timeElapsed >= minLoadingTime && imagesLoaded >= minImagesToLoad) {
                        if (!scrollEnabled) {
                            scrollEnabled = true;
                            // First enable scrolling, then hide the loader to prevent flickering
                            $('body').css('overflow', '');
                            // Add a small delay before hiding the loader
                            setTimeout(function() {
                                $('.wait-loader').fadeOut(300);
                            }, 100);
                        }
                    }
                }

                if (totalImages === 0) {
                    // If no images, still wait for minimum loading time
                    setTimeout(function() {
                        $('body').css('overflow', '');
                        $('.wait-loader').fadeOut(300);
                    }, minLoadingTime);
                    return;
                }

                // Set a timeout for minimum loading time
                setTimeout(checkIfLoadingComplete, minLoadingTime);

                // Load images
                images.each(function() {
                    var img = new Image();
                    img.onload = img.onerror = function() {
                        imagesLoaded++;
                        checkIfLoadingComplete();
                    };
                    img.src = this.src;
                });

                // Reinitialize any necessary scripts for the new content
                setTimeout(function() {
                    // Reinitialize mobile nav to handle new links
                    initMobileNav();
                }, 100);
            })
            .catch(function(error) {
                console.error('Error loading page:', error);
                window.location = href; // Fallback to normal navigation
            });
    }

    // Update active nav item after AJAX content is loaded
    function updateNavAfterAjax() {
        setActiveNavItem();
    }

    // Public API
    window.mobileNav = {
        init: initMobileNav,
        setActive: setActiveNavItem,
        updateAfterAjax: updateNavAfterAjax
    };

    // Initialize on document ready
    $(document).ready(function() {
        initMobileNav();
    });

    // Update on AJAX complete
    $(document).on('ajaxComplete', function() {
        updateNavAfterAjax();
    });

    // Handle browser back/forward buttons
    $(window).on('popstate', function() {
        // Show wait-loader
        $('.wait-loader').show();

        // Disable scrolling
        $('body').css('overflow', 'hidden');

        // Get current URL after popstate
        var currentUrl = window.location.href;
        var currentPath = window.location.pathname;
        var currentPage = currentPath.split('/').pop() || 'home.html';

        // Update current page variable
        currentPage = currentPage;

        // Load content using fetch
        fetch(currentUrl)
            .then(function(response) {
                if (!response.ok) {
                    window.location.reload();
                    return;
                }
                return response.text();
            })
            .then(function(html) {
                if (!html) return;

                // Parse the HTML
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');

                // Extract main content
                var newContent = doc.querySelector('main.main-root');
                if (!newContent) {
                    window.location.reload();
                    return;
                }

                // Remove preloader from new content
                var preloader = newContent.querySelector('.preloader');
                if (preloader) {
                    preloader.parentNode.removeChild(preloader);
                }

                // Update page title
                var title = doc.querySelector('title');
                if (title) {
                    document.title = title.textContent;
                }

                // Replace main content
                $('main.main-root').html(newContent.innerHTML);

                // Update active nav item
                setActiveNavItem();

                // Load images before showing content
                var images = $('main.main-root').find('img');
                var imagesLoaded = 0;
                var totalImages = images.length;
                var minImagesToLoad = Math.min(3, totalImages);
                var scrollEnabled = false;

                // Set a minimum loading time to prevent flickering
                var minLoadingTime = 800; // milliseconds
                var loadingStartTime = new Date().getTime();

                // Function to check if we can hide the loader and enable scrolling
                function checkIfLoadingComplete() {
                    var currentTime = new Date().getTime();
                    var timeElapsed = currentTime - loadingStartTime;

                    // Only complete loading if minimum time has passed AND minimum images are loaded
                    if (timeElapsed >= minLoadingTime && imagesLoaded >= minImagesToLoad) {
                        if (!scrollEnabled) {
                            scrollEnabled = true;
                            // First enable scrolling, then hide the loader to prevent flickering
                            $('body').css('overflow', '');
                            // Add a small delay before hiding the loader
                            setTimeout(function() {
                                $('.wait-loader').fadeOut(300);
                            }, 100);
                        }
                    }
                }

                if (totalImages === 0) {
                    // If no images, still wait for minimum loading time
                    setTimeout(function() {
                        $('body').css('overflow', '');
                        $('.wait-loader').fadeOut(300);
                    }, minLoadingTime);
                    return;
                }

                // Set a timeout for minimum loading time
                setTimeout(checkIfLoadingComplete, minLoadingTime);

                // Load images
                images.each(function() {
                    var img = new Image();
                    img.onload = img.onerror = function() {
                        imagesLoaded++;
                        checkIfLoadingComplete();
                    };
                    img.src = this.src;
                });
            })
            .catch(function(error) {
                console.error('Error loading page:', error);
                window.location.reload();
            });
    });

})(jQuery);
