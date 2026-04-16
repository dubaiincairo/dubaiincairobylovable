import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, fadeIn, springBounce, viewportOnce } from "@/lib/animations";

const FounderSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="team" className="relative py-10 md:py-16 px-6 overflow-hidden">
      {/* Cinematic gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 18% 6%) 50%, hsl(220 20% 4%) 100%)' }} />
      {/* Gold accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background: 'linear-gradient(180deg, transparent, hsl(38 80% 55% / 0.2), transparent)' }} />

      <div className="relative max-w-4xl mx-auto">
        <motion.div className="text-center mb-4 md:mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("founder_subtitle", "A Message from Our Founder")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("founder_headline", "Built by Someone Who's Been in the Trenches")}
          </h2>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-6 text-muted-foreground text-lg leading-relaxed text-center max-w-3xl mx-auto">
          <p className="whitespace-pre-line">{get("founder_body", "Abdullah Hassan Al-Fawali founded Dubai in Cairo with a bold vision.")}</p>
          <p className="whitespace-pre-line">{get("founder_education", "His foundation is built on dual academic distinctions from the Arab Academy.")}</p>
        </motion.div>

        <motion.blockquote variants={springBounce} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-6 relative p-8 rounded-xl glass-card text-center" style={{ borderColor: 'hsl(38 80% 55% / 0.2)', background: 'hsl(38 80% 55% / 0.03)' }}>
          <Quote className="w-8 h-8 text-primary/30 mx-auto mb-4" />
          <p className="text-foreground text-lg md:text-xl font-display italic leading-relaxed mb-4 whitespace-pre-line">
            "{get("founder_quote", "I believe that continuous learning is the key to success in business.")}"
          </p>
          <footer className="text-sm text-primary font-display font-semibold whitespace-pre-line">
            {get("founder_attribution", "— Abdullah Al-Fawali, CEO & Founder")}
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default FounderSection;
