import { motion } from "framer-motion";
import { MapPin, ExternalLink, Star } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { useSiteContent } from "@/hooks/useSiteContent";
import { contentRegistry } from "@/lib/contentRegistry";

const g = (key: string) => contentRegistry.find((f) => f.key === key)?.defaultValue ?? "";

const GoogleBusinessWidget = () => {
  const { get } = useSiteContent();

  const badge       = get("google_badge",        g("google_badge"));
  const headline    = get("google_headline",     g("google_headline"));
  const subtext     = get("google_subtext",      g("google_subtext"));
  const bizName     = get("google_biz_name",     g("google_biz_name"));
  const bizCategory = get("google_biz_category", g("google_biz_category"));
  const rating      = get("google_rating",       g("google_rating"));
  const address     = get("google_address",      g("google_address"));
  const mapsLink    = get("google_maps_link",    g("google_maps_link"));
  const mapsEmbed   = get("google_maps_embed",   g("google_maps_embed"));
  const cta         = get("google_cta",          g("google_cta"));

  const ratingNum = Math.min(5, Math.max(0, parseFloat(rating) || 5));

  return (
    <section className="relative py-8 md:py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, hsl(38 80% 55% / 0.04) 0%, transparent 60%)' }} />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Info card */}
          <div className="md:col-span-1 h-72 md:h-80">
            <div className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">{bizName}</h3>
                <p className="text-sm text-primary font-medium">{bizCategory}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i <= Math.round(ratingNum) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
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
          <div className="md:col-span-2 rounded-2xl overflow-hidden border border-border h-72 md:h-80">
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
      </div>
    </section>
  );
};

export default GoogleBusinessWidget;
