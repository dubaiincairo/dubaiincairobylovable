import { motion } from "framer-motion";
import { Quote, Facebook, Linkedin, Instagram } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, cardFadeUp, viewportOnce } from "@/lib/animations";

const SOCIALS = [
  { key: "founder_facebook",  Icon: Facebook,  label: "Facebook"  },
  { key: "founder_linkedin",  Icon: Linkedin,  label: "LinkedIn"  },
  { key: "founder_instagram", Icon: Instagram, label: "Instagram" },
] as const;

const FounderSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="team" className="relative py-8 md:py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 18% 6%) 50%, hsl(220 20% 4%) 100%)' }} />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-20 items-start">

        {/* LEFT — copy */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("founder_subtitle", "A Message from Our Founder")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight whitespace-pre-line">
            {get("founder_headline", "Built by Someone Who's Been in the Trenches.")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
            {get("founder_body", "Elfouly founded Dubai'nCairo with a bold vision: a digital world teeming with opportunity and a belief that technology can fundamentally transform the way businesses operate and grow.")}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-8">
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
                  className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT — Quote visual */}
        <motion.div variants={cardFadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <blockquote
            className="relative p-8 rounded-xl glass-card"
            style={{ borderColor: 'hsl(38 80% 55% / 0.2)', background: 'hsl(38 80% 55% / 0.03)' }}
          >
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 rounded-full bg-primary/8 border border-primary/20 flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary/60" />
              </div>
            </div>

            <p className="text-foreground text-lg md:text-xl font-display italic leading-relaxed mb-6 text-center whitespace-pre-line">
              "{get("founder_quote", "I believe that continuous learning is the key to success in business. That's why I've completed 50+ specialized training courses in eBusiness, and I will never stop growing, nor will we.")}"
            </p>

            <div className="w-12 h-px bg-primary/30 mx-auto mb-4" />

            <footer className="text-center">
              <span className="text-sm text-primary font-display font-semibold whitespace-pre-line">
                {get("founder_attribution", "— Abdalla Hassan Elfouly, CEO & Co-Founder")}
              </span>
            </footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
};

export default FounderSection;
