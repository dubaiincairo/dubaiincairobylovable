/**
 * Standard Luxury Horizontal Scroller Hint Animation
 * Complies with Antigravity calibrated specification:
 * - 1,600ms initial delay
 * - 76px (2cm) forward glide over 900ms with easeInOutSine
 * - 400ms apex dwell pause
 * - 1,000ms smooth return glide to initial scroll position
 * - Direct physical user inputs immediately yield control
 * - Full LTR and RTL direction support with cross-browser detection
 */
(function() {
  function initLuxuryScrollerHint() {
    var scrollerSelectors = [
      '#tabScrollerWrapper',
      '#category-rail',
      '#pillar-tabs',
      '#category-tabs',
      '#category-filters',
      '#filters-rail',
      '#filter-container',
      '.horizontal-scroller-track'
    ];

    var scrollers = document.querySelectorAll(scrollerSelectors.join(','));
    if (!scrollers || scrollers.length === 0) return;

    scrollers.forEach(function(scroller) {
      if (!scroller) return;

      var userInteracted = false;
      function onUserGesture() {
        userInteracted = true;
      }

      scroller.addEventListener('touchstart', onUserGesture, { passive: true });
      scroller.addEventListener('mousedown', onUserGesture, { passive: true });
      scroller.addEventListener('pointerdown', onUserGesture, { passive: true });
      scroller.addEventListener('wheel', onUserGesture, { passive: true });

      var isRTL = document.dir === 'rtl' || 
                  (document.documentElement && document.documentElement.dir === 'rtl') || 
                  (window.getComputedStyle && window.getComputedStyle(scroller).direction === 'rtl');

      function easeInOutSine(t) {
        return -(Math.cos(Math.PI * t) - 1) / 2;
      }

      function animateScroll(from, to, duration, callback) {
        if (userInteracted) return;
        var startTime = performance.now();
        var initialBehavior = scroller.style.scrollBehavior;
        scroller.style.scrollBehavior = 'auto';

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

      setTimeout(function() {
        if (userInteracted) return;
        // Verify that container actually has horizontal overflow
        if (scroller.scrollWidth <= scroller.clientWidth + 10) return;

        var startPos = scroller.scrollLeft;
        if (Math.abs(startPos) > 5) return; // Already scrolled

        var targetDelta = 76;
        if (isRTL) {
          // Detect RTL scrollLeft direction convention
          scroller.scrollLeft = -1;
          var supportsNegative = scroller.scrollLeft < 0;
          scroller.scrollLeft = 0;
          targetDelta = supportsNegative ? -76 : 76;
        }

        var targetPos = startPos + targetDelta;

        animateScroll(startPos, targetPos, 900, function() {
          setTimeout(function() {
            if (userInteracted) return;
            animateScroll(targetPos, startPos, 1000, function() {
              scroller.scrollLeft = startPos;
            });
          }, 400);
        });
      }, 1600);
    });
  }

  // Dynamic Glassmorphic Executive Header (Transparent at top -> Frosted translucent glass on scroll)
  function initDynamicHeader() {
    var header = document.getElementById('mainHeader') || document.querySelector('header.sticky') || document.querySelector('nav.sticky');
    if (!header) return;

    header.classList.add('transition-all', 'duration-300');

    function updateHeader() {
      if (window.scrollY > 20) {
        header.classList.add('bg-[#0B192C]/85', 'backdrop-blur-md', 'border-slate-800/80', 'shadow-xl');
        header.classList.remove('bg-transparent', 'border-transparent', 'shadow-none');
      } else {
        header.classList.remove('bg-[#0B192C]/85', 'backdrop-blur-md', 'border-slate-800/80', 'shadow-xl');
        header.classList.add('bg-transparent', 'border-transparent', 'shadow-none');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initLuxuryScrollerHint();
      initDynamicHeader();
    });
  } else {
    initLuxuryScrollerHint();
    initDynamicHeader();
  }
})();
