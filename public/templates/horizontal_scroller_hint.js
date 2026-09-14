/**
 * Horizontal Scroller Hint Animation Template (Standard Production Specification)
 *
 * Description:
 *   Provides a slow, silky-smooth 2-centimeter (76px) nudge and snap-back visual cue
 *   for horizontal scroll containers (tab bars, category chips, card rails) to signal
 *   to the user that content overflows horizontally.
 *
 * Defaults:
 *   - Initial Delay: 1600ms (1.6 seconds after page/DOM ready)
 *   - Distance: 76px (exactly 2cm at standard 96 DPI / 37.8px/cm)
 *   - Forward Duration: 900ms (slow, graceful outward glide)
 *   - Apex Dwell Pause: 400ms (gentle pause at 2cm apex)
 *   - Return Duration: 1000ms (silky-smooth glide back to starting position 0)
 *   - Physics: easeInOutSine (zero jerk at start and end)
 *   - Safety: Direct user input (touch, mouse, wheel) immediately halts the animation.
 */

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.initHorizontalScrollerHint = factory();
    }
}(typeof self !== "undefined" ? self : this, function() {

    function initHorizontalScrollerHint(target, options) {
        options = options || {};
        var scroller = typeof target === "string" ? document.querySelector(target) : target;
        if (!scroller) return null;

        var delay = options.delay !== undefined ? options.delay : 1600;
        var distance = options.distance !== undefined ? options.distance : 76; // 2cm = 76px
        var forwardTime = options.forwardTime !== undefined ? options.forwardTime : 900;
        var pauseTime = options.pauseTime !== undefined ? options.pauseTime : 400;
        var returnTime = options.returnTime !== undefined ? options.returnTime : 1000;

        var userInteracted = false;
        var onUserGesture = function() { userInteracted = true; };

        // Listen only to physical user input gestures so programmatic scroll does not self-cancel
        scroller.addEventListener("touchstart", onUserGesture, { passive: true });
        scroller.addEventListener("mousedown", onUserGesture, { passive: true });
        scroller.addEventListener("pointerdown", onUserGesture, { passive: true });
        scroller.addEventListener("wheel", onUserGesture, { passive: true });

        // Zero-velocity endpoints for organic, smooth motion
        function easeInOutSine(t) {
            return -(Math.cos(Math.PI * t) - 1) / 2;
        }

        function animateScroll(from, to, duration, callback) {
            if (userInteracted) return;
            var startTime = performance.now();
            var initialBehavior = scroller.style.scrollBehavior;
            scroller.style.scrollBehavior = "auto"; // Prevent CSS scroll-smooth conflict

            function step(currentTime) {
                if (userInteracted) {
                    scroller.style.scrollBehavior = initialBehavior;
                    return;
                }
                var elapsed = currentTime - startTime;
                var progress = Math.min(elapsed / duration, 1);
                var eased = easeInOutSine(progress);

                scroller.scrollLeft = from + (to - from) * eased;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    scroller.scrollLeft = to;
                    scroller.style.scrollBehavior = initialBehavior;
                    if (callback) callback();
                }
            }
            requestAnimationFrame(step);
        }

        var timer = setTimeout(function() {
            // Abort if already scrolled or touched
            if (userInteracted || scroller.scrollLeft > 5) return;

            animateScroll(0, distance, forwardTime, function() {
                setTimeout(function() {
                    if (userInteracted) return;
                    animateScroll(distance, 0, returnTime, function() {
                        scroller.scrollLeft = 0;
                    });
                }, pauseTime);
            });
        }, delay);

        return function cleanup() {
            clearTimeout(timer);
            scroller.removeEventListener("touchstart", onUserGesture);
            scroller.removeEventListener("mousedown", onUserGesture);
            scroller.removeEventListener("pointerdown", onUserGesture);
            scroller.removeEventListener("wheel", onUserGesture);
        };
    }

    return initHorizontalScrollerHint;
}));
