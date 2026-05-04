import { motion } from "framer-motion";
import { Search, Ruler, Handshake } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import { richText } from "@/lib/richText";

const icons = [Search, Ruler, Handshake];

const ValuesSection = () => {
  const { get } = useSiteContent();

  const values = Array.from({ length: 3 }, (_, i) => ({
    icon: icons[i],
    title: get(`value_${i + 1}_title`, `Value ${i + 1}`),
    desc: get(`value_${i + 1}_desc`, ""),
  }));

  return (
    <section className="relative py-12 md:py-20 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div className="text-center mb-8 md:mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("values_subtitle", "What We Stand For")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("values_headline", "The Principles Behind Every Project")}
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {values.map((v, i) => (
            <motion.div key={i} className="group glass-card gradient-border text-center p-5 md:p-8 rounded-xl hover-lift" variants={cardFadeUp}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:rotate-12">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2 whitespace-pre-line">{v.title}</h3>
              <div
                className="text-muted-foreground text-sm [&>p]:whitespace-pre-line [&>p]:mb-0"
                dangerouslySetInnerHTML={{ __html: richText(v.desc) }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;
