import { motion } from "framer-motion";
import { MapPin, ExternalLink, Star } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";

const MAPS_EMBED = "https://maps.google.com/maps?q=Dubai+in+Cairo+Marketing+Studios,+100+El-Sayed+El-Merghany,+Heliopolis,+Cairo,+Egypt&output=embed&z=16";
const MAPS_LINK = "https://maps.app.goo.gl/BVYf5XUFXJyoW1gQ9";

const GoogleBusinessWidget = () => (
  <section className="relative py-16 md:py-24 px-6 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, hsl(38 80% 55% / 0.04) 0%, transparent 60%)' }} />

    <div className="relative max-w-6xl mx-auto">
      <motion.div className="text-center mb-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">Find Us</span>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">We're on Google</h2>
        <p className="text-muted-foreground">Heliopolis, Cairo — visit us or find us on Google Maps</p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-6 items-start"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Info card */}
        <div className="md:col-span-1 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            {/* Business name */}
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">Dubai in Cairo</h3>
              <p className="text-sm text-primary font-medium">Marketing Studios</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">5.0</span>
              <span className="text-xs text-muted-foreground">on Google</span>
            </div>

            {/* Address */}
            <div className="flex gap-3">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                100 Al-Mirghany Street, Abu Dhabi Bank Building, 1st Floor, Heliopolis, Cairo
              </p>
            </div>

            {/* CTA */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Map embed */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden border border-border h-72 md:h-80">
          <iframe
            title="Dubai in Cairo on Google Maps"
            src={MAPS_EMBED}
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

export default GoogleBusinessWidget;
