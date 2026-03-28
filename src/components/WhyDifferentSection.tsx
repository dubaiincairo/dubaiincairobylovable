import { motion } from "framer-motion";
import { Cpu, ListChecks, Handshake, Users, BadgeDollarSign, BarChart3 } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const icons = [Cpu, ListChecks, Handshake, Users, BadgeDollarSign, BarChart3];

const WhyDifferentSection = () => {
  const { get } = useSiteContent();

  const edges = Array.from({ length: 6 }, (_, i) => ({
    icon: icons[i],
    title: get(`edge_${i + 1}_title`, `Edge ${i + 1}`),
    desc: get(`edge_${i + 1}_desc`, ""),
  }));

  return (
    <section className="py-32 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("edges_subtitle", "Why We're Different")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            {get("edges_headline", "A Smarter Way to Grow Your Business Online")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {edges.map((item, i) => (
            <motion.div key={i} className="group p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
