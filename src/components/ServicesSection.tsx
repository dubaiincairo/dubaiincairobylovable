import { motion } from "framer-motion";
import { Briefcase, Palette, Code, Fingerprint, Camera, Award } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const icons = [Briefcase, Palette, Code, Fingerprint, Camera, Award];

const ServicesSection = () => {
  const { get } = useSiteContent();

  const studios = Array.from({ length: 6 }, (_, i) => ({
    icon: icons[i],
    title: get(`service_${i + 1}_title`, `Service ${i + 1}`),
    desc: get(`service_${i + 1}_desc`, ""),
  }));

  return (
    <section id="services" className="py-16 md:py-32 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-10 md:mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("services_subtitle", "Our Studios")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("services_headline", "Six Specialized Studios. One Unified Vision.")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((s, i) => (
            <motion.div key={i} className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 whitespace-pre-line">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
