/**
 * Instant Navigation & Speculation Rules Engine for WD Group Client Operations Portal
 * - Uses native Chromium Speculation Rules API for moderate prefetching of internal portal pages
 * - Provides lightweight (0.8KB) fallback for Safari/WebKit & Firefox on hover/touchstart
 * - Delivers 0ms instantaneous page transitions across desktop and mobile devices
 */
(function() {
  // 1. Native Chromium Speculation Rules Injection (Chrome, Edge, Android Chrome)
  if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
    var specScript = document.createElement('script');
    specScript.type = 'speculationrules';
    specScript.textContent = JSON.stringify({
      prefetch: [
        {
          where: {
            and: [
              { href_matches: "/portal/*" },
              { not: { href_matches: "*/login?logout=*" } }
            ]
          },
          eagerness: "moderate"
        }
      ]
    });
    document.head.appendChild(specScript);
    return;
  }

  // 2. High-Performance WebKit/Safari/Firefox Fallback (Link Prefetch on Hover/Touch)
  var prefetched = new Set();
  function prefetchUrl(url) {
    if (!url || prefetched.has(url)) return;
    prefetched.add(url);
    try {
      if (window.fetch) {
        fetch(url, { priority: 'low' }).catch(function() {});
      }
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    } catch (e) {}
  }

  function handleInteraction(e) {
    var target = e.target;
    if (!target) return;
    var a = target.closest ? target.closest('a[href^="/portal/"]') : null;
    if (a && a.href && !a.href.includes('logout=')) {
      prefetchUrl(a.href);
    }
  }

  document.addEventListener('mouseover', handleInteraction, { passive: true });
  document.addEventListener('touchstart', handleInteraction, { passive: true });
})();
