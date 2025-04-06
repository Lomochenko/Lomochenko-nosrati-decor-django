/**
 * Passive Event Listeners Polyfill
 * Fixes warnings related to non-passive event listeners
 */
(function () {
    // Test browser support for passive event listeners
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('test', null, opts);
        window.removeEventListener('test', null, opts);
    } catch (e) { }

    // Modify addEventListener behavior to support older jQuery
    if (supportsPassive) {
        var originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, listener, options) {
            if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' || type === 'mousewheel') {
                var opts = options;
                if (typeof options === 'object') {
                    opts = Object.assign({}, options);
                } else {
                    opts = {
                        capture: !!options,
                        passive: true
                    };
                }
                originalAddEventListener.call(this, type, listener, opts);
            } else {
                originalAddEventListener.call(this, type, listener, options);
            }
        };
    }
})();
