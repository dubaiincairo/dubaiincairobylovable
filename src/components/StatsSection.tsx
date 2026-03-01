import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "Clients Served" },
  { value: "3x", label: "Avg. ROI Increase" },
  { value: "12+", label: "Markets Reached" },
  { value: "98%", label: "Client Retention" },
];

const StatsSection = () => {
  return (
    <section className="py-24 px-6 border-y border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground tracking-wide">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
