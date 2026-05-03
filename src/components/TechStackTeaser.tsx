import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, Cpu, ArrowRight } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { useSiteContent } from "@/hooks/useSiteContent";

const LAYERS = [
  { Icon: TrendingUp,   color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", label: "Growth & Customer Intelligence" },
  { Icon: ShoppingCart, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", label: "Commerce & Business Operations" },
  { Icon: Cpu,          color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", label: "Creative, AI & Infrastructure" },
];

const TechStackTeaser = () => {
  const { get } = useSiteContent();

  return (
    <section className="relative py-10 md:py-14 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-primary/3 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="rounded-2xl border border-border bg-card overflow-hidden"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          {/* top accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="px-6 md:px-8 py-7 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">

            {/* left text */}
            <div className="flex-1">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-primary block mb-2">
                {get("tech_subtitle", "Our Tech Stack")}
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-foreground mb-1">
                {get("tech_headline", "Integrated Solutions. Proven Tools.")}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {get("tech_teaser_desc", "41 industry-leading tools across 3 intelligent layers — purpose-built to drive growth, operations, and innovation.")}
              </p>
            </div>

            {/* middle — 3 layer pills */}
            <div className="flex flex-col gap-2 md:min-w-[220px]">
              {LAYERS.map(({ Icon, color, bg, border, label }) => (
                <div key={label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border ${border} ${bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${color} shrink-0`} />
                  <span className={`text-xs font-medium ${color}`}>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/tech"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-xl hover:brightness-110 transition-all shimmer-btn"
            >
              Explore Full Stack <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackTeaser;
