import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";

const AnimatedNumber = ({ value }: { value: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;
    const numMatch = value.match(/^(\d+)/);
    if (!numMatch) { setDisplay(value); return; }
    const target = parseInt(numMatch[1]);
    const suffix = value.slice(numMatch[1].length);
    const duration = 3200;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Slow linear climb then dramatic ease-out at the end
      const eased = progress < 0.75
        ? progress * 0.85                          // steady climb for first 75%
        : 0.6375 + (1 - Math.pow(1 - ((progress - 0.75) / 0.25), 4)) * 0.3625; // snap to final
      setDisplay(Math.round(target * eased) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <div ref={ref} className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2">{display}</div>;
};

const StatsSection = () => {
  const { get } = useSiteContent();
  const stats = [
    { value: get("stat_projects", "216"), label: get("stat_projects_label", "Successful Projects") },
    { value: get("stat_clients", "36+"), label: get("stat_clients_label", "Clients Served") },
    { value: get("stat_years", "4+"), label: get("stat_years_label", "Years of Growth") },
    { value: get("stat_digital", "100%"), label: get("stat_digital_label", "Digital Operation") },
  ];

  return (
    <section className="relative py-8 md:py-12 px-6">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {stats.map((stat, i) => (
          <motion.div key={i} className="text-center" variants={scaleIn}>
            <AnimatedNumber value={stat.value} />
            <div className="text-sm text-muted-foreground tracking-wide">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default StatsSection;
