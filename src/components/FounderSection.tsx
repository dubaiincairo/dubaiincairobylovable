import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, fadeIn, scaleIn, viewportOnce } from "@/lib/animations";

const FounderSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="team" className="py-16 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-6 md:mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
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

        <motion.blockquote variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-12 relative p-8 rounded-xl border border-primary/20 bg-primary/5 text-center">
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
