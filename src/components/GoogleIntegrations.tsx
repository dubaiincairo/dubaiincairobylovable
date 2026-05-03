import { useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

/**
 * Reads GA4 measurement ID and GSC verification code from the admin
 * (SEO & Meta Tags section) and injects them into the document head.
 * Mount this once in App.tsx, inside SiteContentProvider.
 */
const GoogleIntegrations = () => {
  const { get } = useSiteContent();

  const ga4Id   = get("seo_ga4_id", "").trim();
  const gscCode = get("seo_gsc_verification", "").trim();

  // ── Google Analytics 4 ───────────────────────────────────────────────────
  useEffect(() => {
    if (!ga4Id) return;

    const scriptId = "ga4-script";
    if (document.getElementById(scriptId)) return;

    const tag = document.createElement("script");
    tag.id = scriptId;
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    document.head.appendChild(tag);

    const init = document.createElement("script");
    init.id = "ga4-init";
    init.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4Id}', { anonymize_ip: true });
    `;
    document.head.appendChild(init);
  }, [ga4Id]);

  // ── Google Search Console verification ──────────────────────────────────
  useEffect(() => {
    if (!gscCode) return;

    const metaId = "gsc-verification";
    if (document.getElementById(metaId)) return;

    const meta = document.createElement("meta");
    meta.id = metaId;
    meta.name = "google-site-verification";
    meta.content = gscCode;
    document.head.appendChild(meta);
  }, [gscCode]);

  return null;
};

export default GoogleIntegrations;
