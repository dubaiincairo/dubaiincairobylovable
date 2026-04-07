import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";

const StatsSection = () => {
  const { get } = useSiteContent();

  const stats = [
    { value: get("stat_projects", "216"), label: get("stat_projects_label", "Successful Projects") },
    { value: get("stat_clients", "36+"), label: get("stat_clients_label", "Clients Served") },
    { value: get("stat_years", "4+"), label: get("stat_years_label", "Years of Growth") },
    { value: get("stat_digital", "100%"), label: get("stat_digital_label", "Digital Operation") },
  ];

  return (
    <section className="py-12 md:py-24 px-6">
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {stats.map((stat, i) => (
          <motion.div key={i} className="text-center" variants={scaleIn}>
            <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground tracking-wide">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default StatsSection;
