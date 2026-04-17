import { motion } from "framer-motion";
import { Briefcase, Palette, Code, Fingerprint, Camera, Award } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

const icons = [Briefcase, Palette, Code, Fingerprint, Camera, Award];

const ServicesSection = () => {
  const { get } = useSiteContent();

  const studios = Array.from({ length: 6 }, (_, i) => ({
    icon: icons[i],
    title: get(`service_${i + 1}_title`, `Service ${i + 1}`),
    desc: get(`service_${i + 1}_desc`, ""),
  }));

  return (
    <section id="services" className="relative py-14 md:py-20 px-6 overflow-hidden">
      {/* Diagonal pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, hsl(38 80% 55%), hsl(38 80% 55%) 1px, transparent 1px, transparent 40px)' }} />
      {/* Floating orb */}
      <div className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] translate-x-1/3 pointer-events-none animate-float-reverse" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div className="text-center mb-6 md:mb-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("services_subtitle", "Our Studios")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("services_headline", "Six Specialized Studios. One Unified Vision.")}
          </h2>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {studios.map((s, i) => (
            <motion.div key={i} className="group glass-card gradient-border p-8 rounded-xl hover-lift" variants={cardFadeUp}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 whitespace-pre-line">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
