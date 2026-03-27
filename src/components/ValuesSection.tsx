import { motion } from "framer-motion";
import { Search, Ruler, Handshake, Globe, Lightbulb, RefreshCw } from "lucide-react";

const values = [
  { icon: Search, title: "Transparency & Learning", desc: "We share knowledge openly and grow continuously." },
  { icon: Ruler, title: "Measurement & Analysis", desc: "Every decision is grounded in data." },
  { icon: Handshake, title: "Collaboration & Integration", desc: "Your success is our shared mission." },
  { icon: Globe, title: "Diversity & Inclusion", desc: "Varied perspectives make stronger solutions." },
  { icon: Lightbulb, title: "Innovation & Courage", desc: "We try new things. We don't fear bold moves." },
  { icon: RefreshCw, title: "Adaptability & Flexibility", desc: "We evolve as fast as the digital landscape does." },
];

const ValuesSection = () => (
  <section className="py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">What We Stand For</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          The Principles Behind Every <span className="text-gradient-gold">Project</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            className="text-center p-8 rounded-xl border border-border bg-card/50 hover:border-primary/20 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <v.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold mb-2">{v.title}</h3>
            <p className="text-muted-foreground text-sm">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValuesSection;
