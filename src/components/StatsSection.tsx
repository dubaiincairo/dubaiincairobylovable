import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const StatsSection = () => {
  const { get } = useSiteContent();

  const stats = [
    { value: get("stat_projects", "216"), label: get("stat_projects_label", "Successful Projects") },
    { value: get("stat_clients", "36+"), label: get("stat_clients_label", "Clients Served") },
    { value: get("stat_years", "4+"), label: get("stat_years_label", "Years of Growth") },
    { value: get("stat_digital", "100%"), label: get("stat_digital_label", "Digital Operation") },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground tracking-wide">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
