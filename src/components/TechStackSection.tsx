import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

const TechStackSection = () => {
  const { get } = useSiteContent();

  const categories = Array.from({ length: 6 }, (_, i) => ({
    label: get(`tech_${i + 1}_label`, `Category ${i + 1}`),
    tools: get(`tech_${i + 1}_tools`, "").split(/[,\n]/).map(s => s.trim()).filter(Boolean),
  }));

  return (
    <section className="relative py-16 md:py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[130px] -translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div className="text-center mb-10 md:mb-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("tech_subtitle", "Our Tech Stack")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("tech_headline", "Integrated Solutions. Proven Tools.")}
          </h2>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {categories.map((cat, i) => (
            <motion.div key={i} className="glass-card gradient-border p-6 rounded-xl hover-lift" variants={cardFadeUp}>
              <h3 className="font-display font-semibold text-sm text-primary mb-4 tracking-wide uppercase">{cat.label}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground font-medium">{tool}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
