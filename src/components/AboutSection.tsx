import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";

// ── Animated performance chart ────────────────────────────────────────────
const PerformanceChart = ({ inView }: { inView: boolean }) => (
  <svg viewBox="0 0 260 80" className="w-full h-full">
    <defs>
      <linearGradient id="o2ChartFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="hsl(38 80% 55%)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="hsl(38 80% 55%)" stopOpacity="0"   />
      </linearGradient>
      <filter id="o2Glow">
        <feGaussianBlur stdDeviation="1.8" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* Grid lines */}
    {[20, 40, 60].map(y => (
      <line key={y} x1="0" y1={y} x2="260" y2={y}
        stroke="hsl(38 80% 55%)" strokeOpacity="0.07" strokeWidth="0.5" />
    ))}
    {/* Area fill */}
    <motion.path
      d="M 0 72 C 30 68 55 58 80 50 C 105 42 125 34 150 26 C 175 18 200 14 230 9 L 260 6 L 260 80 L 0 80 Z"
      fill="url(#o2ChartFill)"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 0.8, duration: 0.8 }}
    />
    {/* Chart line */}
    <motion.path
      d="M 0 72 C 30 68 55 58 80 50 C 105 42 125 34 150 26 C 175 18 200 14 230 9 L 260 6"
      stroke="hsl(38 85% 60%)" strokeWidth="2" fill="none" strokeLinecap="round"
      filter="url(#o2Glow)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{ delay: 0.5, duration: 1.6, ease: "easeOut" }}
    />
    {/* End dot */}
    <motion.circle cx="260" cy="6" r="3.5"
      fill="hsl(38 85% 60%)" filter="url(#o2Glow)"
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: 2.1, duration: 0.4, type: "spring" }}
    />
  </svg>
);

// ── Metric chip ───────────────────────────────────────────────────────────
const MetricChip = ({
  label, value, sub, delay, inView, highlight = false,
}: {
  label: string; value: string; sub: string;
  delay: number; inView: boolean; highlight?: boolean;
}) => (
  <motion.div
    className={`flex-1 rounded-xl border p-3 text-center ${
      highlight
        ? "border-primary/40 bg-primary/5"
        : "border-border bg-card/50"
    }`}
    initial={{ opacity: 0, y: 10 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay, duration: 0.5 }}
  >
    <div className={`text-xs uppercase tracking-widest mb-1 ${highlight ? "text-primary" : "text-muted-foreground"}`}>
      {label}
    </div>
    <div className={`text-xl font-display font-bold ${highlight ? "text-gradient-gold" : "text-foreground"}`}>
      {value}
    </div>
    <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>
  </motion.div>
);

// ── Dashboard visual ──────────────────────────────────────────────────────
const GrowthIntelligenceVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative w-full max-w-lg">
      {/* Ambient glow */}
      <div className="absolute -inset-8 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 40%, hsl(38 80% 55% / 0.06) 0%, transparent 65%)", filter: "blur(20px)" }} />

      <motion.div
        className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/60">
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Growth Intelligence</span>
            <p className="text-sm font-display font-semibold text-foreground mt-0.5">Performance Overview</p>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="text-[10px] text-green-400 font-medium">Live</span>
          </div>
        </div>

        {/* ── Chart ── */}
        <div className="px-4 pt-4 pb-2 h-28">
          <PerformanceChart inView={inView} />
        </div>

        {/* ── Funnel + label overlay ── */}
        <div className="relative px-5 pb-3">
          <div className="flex items-center gap-2 mb-3">
            {/* Mini funnel */}
            <svg viewBox="0 0 22 30" className="w-5 h-7 shrink-0">
              <motion.path d="M 1 1 L 21 1 L 14 10 L 14 24 L 8 28 L 8 10 Z"
                fill="hsl(38 80% 55%)" fillOpacity="0.15"
                stroke="hsl(38 80% 55%)" strokeOpacity="0.5" strokeWidth="0.8"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4 }}
              />
            </svg>
            <span className="text-[10px] text-muted-foreground tracking-wide">Conversion Funnel Analysis</span>
            <span className="ml-auto text-[10px] text-primary font-semibold">↑ Optimised</span>
          </div>

          {/* ── Metric chips ── */}
          <div className="flex gap-2">
            <MetricChip label="ROAS"     value="3.8×"   sub="Avg. return"     delay={1.6} inView={inView} highlight />
            <MetricChip label="CVR"      value="4.2%"   sub="Conv. rate"      delay={1.8} inView={inView} />
            <MetricChip label="Growth"   value="+127%"  sub="YoY revenue"     delay={2.0} inView={inView} />
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div className="px-5 py-2.5 border-t border-border/60 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">216 campaigns analysed</span>
          <span className="text-[10px] text-primary font-medium">Data-Driven · Always On</span>
        </div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg"
        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: -3 } : {}}
        transition={{ delay: 2.4, duration: 0.4, type: "spring" }}
      >
        Science-Fueled
      </motion.div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────
const AboutSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="about" className="relative py-16 md:py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[140px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* LEFT — copy */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("about_subtitle", "Who We Are")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight whitespace-pre-line">
            {get("about_headline", "A Digital Agency Built on Science, Not Guesswork")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-5 whitespace-pre-line">
            {get("about_body", "Founded in 2021, Dubai in Cairo is a Cairo-based digital marketing and eBusiness solutions agency.")}
          </p>
          <p className="text-foreground font-medium text-lg leading-relaxed whitespace-pre-line">
            {get("about_body_2", "We are 100% digital by design — no overhead, no guesswork. Just a focused team turning data into strategy.")}
          </p>
        </motion.div>

        {/* RIGHT — Control interface visual */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <GrowthIntelligenceVisual />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
