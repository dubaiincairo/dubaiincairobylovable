import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { cn } from "@/lib/utils";

const StatsSection = () => {
  const { get } = useSiteContent();
  const stats = [
    { value: get("stat_projects", "216"), label: get("stat_projects_label", "Successful Projects") },
    { value: get("stat_clients", "36+"), label: get("stat_clients_label", "Clients Served") },
    { value: get("stat_years", "4+"), label: get("stat_years_label", "Years of Growth") },
    { value: get("stat_digital", "100%"), label: get("stat_digital_label", "Digital Operation") },
  ];

  return (
    <section className="relative py-8 md:py-12 px-6 overflow-hidden">
      {/* Ambient gold glow behind the panel */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[260px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(38 80% 55% / 0.06), transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden shadow-[0_10px_40px_-20px_rgba(0,0,0,0.4)]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className={cn(
                "text-center py-8 md:py-10 px-4 border-border/50 md:border-b-0",
                // Mobile (2-col grid): right border on left column, bottom border on top row
                i % 2 === 0 && "border-r",
                i < 2 && "border-b",
                // Desktop (4-col grid): right border on all except last column
                i < 3 && "md:border-r",
              )}
            >
              <AnimatedNumber
                value={stat.value}
                className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2"
              />
              <div className="text-xs md:text-sm text-muted-foreground tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
