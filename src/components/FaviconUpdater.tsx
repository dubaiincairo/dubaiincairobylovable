import { useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

/**
 * Reads `nav_favicon_url` from the CMS and keeps the browser-tab
 * favicon in sync. Works for any image URL (SVG, PNG, ICO, WebP).
 * Mount once inside SiteContentProvider (already the case via App.tsx).
 */
const FaviconUpdater = () => {
  const { get } = useSiteContent();
  const url = get("nav_favicon_url", "/favicon.svg");

  useEffect(() => {
    if (!url) return;

    // Update every <link rel="icon"> and <link rel="alternate icon">
    const links = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="icon"], link[rel="alternate icon"], link[rel="apple-touch-icon"]'
    );

    if (links.length > 0) {
      links.forEach((link) => {
        // Derive type from extension; default to image/svg+xml
        const ext = url.split(".").pop()?.split("?")[0]?.toLowerCase();
        const typeMap: Record<string, string> = {
          svg: "image/svg+xml",
          png: "image/png",
          ico: "image/x-icon",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          webp: "image/webp",
        };
        link.type = typeMap[ext ?? ""] ?? "image/svg+xml";
        link.href = url;
      });
    } else {
      // No link tags in head yet — create one
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.href = url;
      document.head.appendChild(link);
    }
  }, [url]);

  return null;
};

export default FaviconUpdater;
