import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const FounderSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="team" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("founder_subtitle", "A Message from Our Founder")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            {get("founder_headline", "Built by Someone Who's Been in the Trenches")}
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-6 text-muted-foreground text-lg leading-relaxed text-center max-w-3xl mx-auto">
          <p>{get("founder_body", "Abdullah Hassan Al-Fawali founded Dubai in Cairo with a bold vision: a digital world teeming with opportunity — and a belief that technology can fundamentally transform the way businesses operate and grow.")}</p>
          <p>{get("founder_education", "His foundation is built on dual academic distinctions from the Arab Academy for Science, Technology and Maritime Transport.")}</p>
        </motion.div>

        <motion.blockquote initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12 relative p-8 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <Quote className="w-8 h-8 text-primary/30 mx-auto mb-4" />
          <p className="text-foreground text-lg md:text-xl font-display italic leading-relaxed mb-4">
            "{get("founder_quote", "I believe that continuous learning is the key to success in business.")}"
          </p>
          <footer className="text-sm text-primary font-display font-semibold">
            {get("founder_attribution", "— Abdullah Al-Fawali, CEO & Founder")}
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default FounderSection;
