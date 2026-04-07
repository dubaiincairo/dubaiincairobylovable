import { motion } from "framer-motion";
import { Search, Ruler, Handshake, Globe, Lightbulb, RefreshCw } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

const icons = [Search, Ruler, Handshake, Globe, Lightbulb, RefreshCw];

const ValuesSection = () => {
  const { get } = useSiteContent();

  const values = Array.from({ length: 6 }, (_, i) => ({
    icon: icons[i],
    title: get(`value_${i + 1}_title`, `Value ${i + 1}`),
    desc: get(`value_${i + 1}_desc`, ""),
  }));

  return (
    <section className="py-16 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-10 md:mb-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("values_subtitle", "What We Stand For")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("values_headline", "The Principles Behind Every Project")}
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {values.map((v, i) => (
            <motion.div key={i} className="text-center p-8 rounded-xl border border-border bg-card/50 hover:border-primary/20 hover-lift transition-all" variants={cardFadeUp}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2 whitespace-pre-line">{v.title}</h3>
              <p className="text-muted-foreground text-sm whitespace-pre-line">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;
