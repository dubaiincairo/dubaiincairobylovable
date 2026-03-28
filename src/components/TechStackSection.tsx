import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const TechStackSection = () => {
  const { get } = useSiteContent();

  const categories = Array.from({ length: 6 }, (_, i) => ({
    label: get(`tech_${i + 1}_label`, `Category ${i + 1}`),
    tools: get(`tech_${i + 1}_tools`, "").split(",").map(s => s.trim()).filter(Boolean),
  }));

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("tech_subtitle", "Our Tech Stack")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            {get("tech_headline", "Integrated Solutions. Proven Tools.")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div key={i} className="p-6 rounded-xl border border-border bg-card/50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <h3 className="font-display font-semibold text-sm text-primary mb-4 tracking-wide uppercase">{cat.label}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground font-medium">{tool}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
