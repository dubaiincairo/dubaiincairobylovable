import { motion } from "framer-motion";
import { MapPin, ExternalLink, Star, Shield } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { useSiteContent } from "@/hooks/useSiteContent";
import { contentRegistry } from "@/lib/contentRegistry";

const g = (key: string) => contentRegistry.find((f) => f.key === key)?.defaultValue ?? "";

// Resolve whatever the editor pasted into a working iframe src.
// Accepts: raw embed URL, a full <iframe …> HTML snippet, or nothing — and
// falls back to a keyless address query that Google guarantees will render.
function resolveMapEmbed(raw: string, address: string): string {
  const trimmed = (raw || "").trim();

  // 1. Full <iframe> paste — pull the src attribute out.
  const iframeSrc = trimmed.match(/src=["']([^"']+)["']/i)?.[1];
  if (iframeSrc) return iframeSrc;

  // 2. A real embed URL (these are the only google.com URLs that allow framing).
  if (/^https?:\/\/(www\.)?google\.com\/maps\/embed/i.test(trimmed)) {
    return trimmed;
  }

  // 3. Anything else (share links, place URLs, garbage) — build a guaranteed
  //    embed from the address. This format works without an API key.
  if (address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  }

  return "";
}

const GoogleBusinessWidget = () => {
  const { get } = useSiteContent();

  const bizName     = get("google_biz_name",     g("google_biz_name")     || "Dubai in Cairo");
  const bizCategory = get("google_biz_category", g("google_biz_category") || "Digital Marketing Agency");
  const rating      = get("google_rating",       g("google_rating")       || "5.0");
  const address     = get("google_address",      g("google_address")      || "100 Al-Mirghany St, Heliopolis, Cairo");
  const mapsLink    = get("google_maps_link",    g("google_maps_link")    || "https://maps.google.com");
  const rawEmbed    = get("google_maps_embed", "");
  const mapsEmbed   = resolveMapEmbed(rawEmbed, address);
  const cta         = get("google_cta",          g("google_cta")          || "View on Google Maps");
  const ratingSuffix= get("google_rating_suffix", g("google_rating_suffix") || "on Google");

  const legalSubtitle   = get("legal_subtitle",        "Registered, Licensed & Ready to Operate");
  const companyName     = get("legal_company_name",    "Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC");
  const legalRegLabel   = get("legal_reg_label",       "Commercial Registration");
  const legalReg        = get("legal_reg",             "163772");
  const legalMembLabel  = get("legal_membership_label","Chamber of IT & Telecom.");
  const legalMemb       = get("legal_membership",      "4568");
  const legalTaxLabel   = get("legal_tax_label",       "Tax Registration");
  const legalTax        = get("legal_tax",             "625-626-168");
  const legalSectorLabel= get("legal_sector_label",    "Licensed Sector");
  const legalSector     = get("legal_sector",          "eBusiness Solutions");

  const ratingNum = Math.min(5, Math.max(0, parseFloat(rating) || 5));

  const legalItems = [
    { label: legalRegLabel,    value: legalReg },
    { label: legalMembLabel,   value: legalMemb },
    { label: legalTaxLabel,    value: legalTax },
    { label: legalSectorLabel, value: legalSector },
  ];

  return (
    <section className="relative py-8 md:py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, hsl(38 80% 55% / 0.04) 0%, transparent 60%)' }} />

      <div className="relative max-w-6xl mx-auto space-y-6">

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Info card */}
          <div className="md:col-span-1 h-64 md:h-72">
            <div className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">{bizName}</h3>
                <p className="text-sm text-primary font-medium">{bizCategory}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={`w-4 h-4 ${i <= Math.round(ratingNum) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{rating}</span>
                <span className="text-xs text-muted-foreground">{ratingSuffix}</span>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">{address}</p>
              </div>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                {cta}
              </a>
            </div>
          </div>

          {/* Map embed */}
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${bizName} on Google Maps`}
            className="md:col-span-2 relative rounded-2xl overflow-hidden border border-border h-64 md:h-72 bg-[hsl(220,20%,4%)] block group"
          >
            {mapsEmbed ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  filter: "invert(100%) hue-rotate(180deg) brightness(0.95)",
                  pointerEvents: "none",
                }}
              >
                <iframe
                  title="Dubai in Cairo on Google Maps"
                  src={mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <MapPin className="w-8 h-8 text-primary/50" />
                <span className="text-sm font-medium">{cta}</span>
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none transition-colors duration-300 group-hover:bg-primary/[0.04]" />
          </a>
        </motion.div>

        {/* Legal strip — same width and corner-radius vocabulary as the row above */}
        <motion.div
          className="border border-border rounded-2xl bg-card p-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Header — Shield badge + eyebrow + company name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield aria-hidden="true" className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">
                {legalSubtitle}
              </span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-border" />
            <span className="text-sm font-display font-semibold text-foreground">
              {companyName}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/60 my-5" />

          {/* Symmetric 4-column data grid — 2x2 on mobile, 1x4 on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            {legalItems.map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground mb-1">
                  {item.label}
                </span>
                <span className="text-sm font-display font-semibold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default GoogleBusinessWidget;
