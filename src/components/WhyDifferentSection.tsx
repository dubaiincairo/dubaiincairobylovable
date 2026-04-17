import { motion } from "framer-motion";
import { Cpu, ListChecks, Handshake, Users, BadgeDollarSign, BarChart3 } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

const icons = [Cpu, ListChecks, Handshake, Users, BadgeDollarSign, BarChart3];

const WhyDifferentSection = () => {
  const { get } = useSiteContent();

  const edges = Array.from({ length: 6 }, (_, i) => ({
    icon: icons[i],
    title: get(`edge_${i + 1}_title`, `Edge ${i + 1}`),
    desc: get(`edge_${i + 1}_desc`, ""),
  }));

  return (
    <section className="relative py-14 md:py-20 px-6 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto">
        <motion.div className="text-center mb-6 md:mb-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("edges_subtitle", "Why We're Different")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("edges_headline", "A Smarter Way to Grow Your Business Online")}
          </h2>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {edges.map((item, i) => (
            <motion.div key={i} className="group glass-card gradient-border p-5 md:p-8 rounded-xl hover-lift" variants={cardFadeUp}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-12">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-3 whitespace-pre-line">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
