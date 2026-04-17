import { motion } from "framer-motion";
import { MapPin, ExternalLink, Star, Shield } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { useSiteContent } from "@/hooks/useSiteContent";
import { contentRegistry } from "@/lib/contentRegistry";

const g = (key: string) => contentRegistry.find((f) => f.key === key)?.defaultValue ?? "";

const GoogleBusinessWidget = () => {
  const { get } = useSiteContent();

  const bizName     = get("google_biz_name",     g("google_biz_name"));
  const bizCategory = get("google_biz_category", g("google_biz_category"));
  const rating      = get("google_rating",       g("google_rating"));
  const address     = get("google_address",      g("google_address"));
  const mapsLink    = get("google_maps_link",    g("google_maps_link"));
  const mapsEmbed   = get("google_maps_embed",   g("google_maps_embed"));
  const cta         = get("google_cta",          g("google_cta"));

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
  const legalAddress    = get("legal_address",         "100 Al-Mirghany Street, Abu Dhabi Bank Building, 1st Floor, Heliopolis, Cairo");

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

        {/* Map + Info card */}
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
                <span className="text-xs text-muted-foreground">on Google</span>
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
          <div className="md:col-span-2 rounded-2xl overflow-hidden border border-border h-64 md:h-72">
            <iframe
              title="Dubai in Cairo on Google Maps"
              src={mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* Legal strip */}
        <motion.div
          className="border border-border/50 rounded-2xl px-6 py-5"
          style={{ background: 'hsl(220 18% 6% / 0.6)' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Top row: badge + company name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <div className="flex items-center gap-1.5 shrink-0">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-primary">{legalSubtitle}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <span className="text-sm font-display font-semibold text-foreground">{companyName}</span>
          </div>

          {/* Bottom row: legal items + address */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalItems.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">{item.label}:</span>
                <span className="text-xs font-semibold text-foreground">{item.value}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 ml-auto">
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              <span className="text-xs text-muted-foreground">{legalAddress}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default GoogleBusinessWidget;
