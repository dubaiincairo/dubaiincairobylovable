import { motion } from "framer-motion";
import { TrendingUp, Target, BarChart3, Megaphone, Globe, Zap } from "lucide-react";

const services = [
  { icon: TrendingUp, title: "Growth Strategy", desc: "Data-driven plans that scale your revenue and market share." },
  { icon: Target, title: "Brand Positioning", desc: "Define your unique value and dominate your niche." },
  { icon: BarChart3, title: "Performance Marketing", desc: "ROI-focused campaigns across paid and organic channels." },
  { icon: Megaphone, title: "Social Media", desc: "Build engaged communities that convert into loyal customers." },
  { icon: Globe, title: "Market Expansion", desc: "Strategic entry into MENA and international markets." },
  { icon: Zap, title: "Conversion Optimization", desc: "Turn more visitors into leads and customers." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Strategies That <span className="text-gradient-gold">Deliver</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <service.icon className="w-8 h-8 text-primary mb-5 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
