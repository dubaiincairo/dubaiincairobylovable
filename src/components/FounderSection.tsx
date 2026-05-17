import { motion } from "framer-motion";
import { Quote, Facebook, Linkedin, Instagram, Calendar, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, cardFadeUp, viewportOnce } from "@/lib/animations";
import { RichText } from "@/components/ui/rich-text";
import AnimatedUnderline from "@/components/ui/animated-underline";

const SOCIALS = [
  { key: "founder_facebook",  Icon: Facebook,  label: "Facebook"  },
  { key: "founder_linkedin",  Icon: Linkedin,  label: "LinkedIn"  },
  { key: "founder_instagram", Icon: Instagram, label: "Instagram" },
] as const;

const FounderSection = () => {
  const { get } = useSiteContent();
  const photoUrl    = get("founder_photo_url", "").trim();
  const calendlyUrl = get("founder_calendly_url", "").trim();
  const ctaLabel    = get("founder_cta_label", "Reserve a Consultation");
  const founderName = get("founder_name", "Abdalla Hassan Elfouly");

  return (
    <section id="team" className="relative py-8 md:py-14 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 18% 6%) 50%, hsl(220 20% 4%) 100%)' }} />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* LEFT — copy + CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("founder_subtitle", "A Message from Our Founder")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight whitespace-pre-line">
            {get("founder_headline", "Built by Someone Who's Been in the Trenches.")}
          </h2>
          <AnimatedUnderline align="left" className="mb-5" />
          <RichText
            html={get("founder_body", "Elfouly founded Dubai'nCairo with a bold vision: a digital world teeming with opportunity and a belief that technology can fundamentally transform the way businesses operate and grow.")}
            className="text-muted-foreground text-base md:text-lg leading-relaxed"
          />

          {/* CTA — Reserve a Consultation (Calendly).
              Renders only when an URL is set via /admin → site_content key
              `founder_calendly_url`. */}
          {calendlyUrl && (
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn group inline-flex items-center gap-2.5 mt-7 px-6 py-3 bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide rounded-lg transition-colors duration-300 hover:bg-primary/90 glow-gold"
            >
              <Calendar aria-hidden="true" className="w-4 h-4" />
              {ctaLabel}
              <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          )}

          {/* Social icons */}
          <div className="flex items-center gap-2.5 mt-6">
            {SOCIALS.map(({ key, Icon, label }) => {
              const url = get(key, "");
              if (!url) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all duration-200"
                >
                  <Icon aria-hidden="true" className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT — Founder card (portrait + quote) */}
        <motion.div variants={cardFadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <figure
            className="relative p-6 md:p-7 rounded-xl glass-card"
            style={{ borderColor: 'hsl(38 80% 55% / 0.2)', background: 'hsl(38 80% 55% / 0.03)' }}
          >
            {/* Portrait + quote chip */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-primary/30 bg-card/60 shadow-lg">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={founderName}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/8 flex items-center justify-center">
                      <Quote aria-hidden="true" className="w-7 h-7 text-primary/60" />
                    </div>
                  )}
                </div>
                {photoUrl && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center shadow-md">
                    <Quote aria-hidden="true" className="w-3.5 h-3.5 text-primary/70" />
                  </div>
                )}
              </div>
            </div>

            <blockquote>
              <RichText
                html={get("founder_quote", "I believe that continuous learning is the key to success in business. That's why I've completed 50+ specialized training courses in eBusiness, and I will never stop growing, nor will we.")}
                className="text-foreground text-base md:text-lg font-display italic leading-relaxed text-center"
              />
            </blockquote>

            <div className="w-12 h-px bg-primary/30 mx-auto my-4" />

            <figcaption className="text-center">
              <span className="text-sm text-primary font-display font-semibold whitespace-pre-line">
                {get("founder_attribution", "— Abdalla Hassan Elfouly, CEO & Co-Founder")}
              </span>
            </figcaption>
          </figure>
        </motion.div>

      </div>
    </section>
  );
};

export default FounderSection;
