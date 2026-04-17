import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";

// ── Hand-placed scattered nodes (raw data zone, left side) ────────────────
const SCATTERED = [
  { id: 1,  cx: 9,  cy: 14, r: 1.8 }, { id: 2,  cx: 22, cy: 28, r: 1.2 },
  { id: 3,  cx: 6,  cy: 48, r: 1.5 }, { id: 4,  cx: 29, cy: 50, r: 1.0 },
  { id: 5,  cx: 14, cy: 70, r: 1.6 }, { id: 6,  cx: 37, cy: 18, r: 1.2 },
  { id: 7,  cx: 46, cy: 36, r: 1.4 }, { id: 8,  cx: 38, cy: 58, r: 1.0 },
  { id: 9,  cx: 56, cy: 22, r: 1.3 }, { id: 10, cx: 60, cy: 48, r: 1.5 },
  { id: 11, cx: 50, cy: 70, r: 1.1 }, { id: 12, cx: 20, cy: 86, r: 1.4 },
  { id: 13, cx: 44, cy: 88, r: 1.0 }, { id: 14, cx: 63, cy: 80, r: 1.2 },
];

const SCATTERED_LINES = [
  "M 9 14 L 22 28",   "M 22 28 L 6 48",   "M 22 28 L 37 18",
  "M 6 48 L 29 50",   "M 29 50 L 38 58",  "M 37 18 L 46 36",
  "M 46 36 L 60 48",  "M 14 70 L 44 88",  "M 38 58 L 50 70",
  "M 56 22 L 60 48",  "M 9 14 L 46 36",   // chaotic crossings
  "M 6 48 L 60 48",   "M 22 28 L 50 70",
];

// ── 4×4 grid (structured intelligence, right side) ───────────────────────
const GRID_COLS = 4;
const GRID_ROWS = 4;
const G_X0 = 118;
const G_Y0 = 8;
const G_SX = 25;
const G_SY = 28;

const GRID = Array.from({ length: GRID_ROWS }, (_, row) =>
  Array.from({ length: GRID_COLS }, (_, col) => ({
    id: `g${row}-${col}`,
    cx: G_X0 + col * G_SX,
    cy: G_Y0 + row * G_SY,
  }))
).flat();

const GRID_LINES: string[] = [];
for (let row = 0; row < GRID_ROWS; row++) {
  for (let col = 0; col < GRID_COLS; col++) {
    const cx = G_X0 + col * G_SX;
    const cy = G_Y0 + row * G_SY;
    if (col < GRID_COLS - 1) GRID_LINES.push(`M ${cx} ${cy} L ${cx + G_SX} ${cy}`);
    if (row < GRID_ROWS - 1) GRID_LINES.push(`M ${cx} ${cy} L ${cx} ${cy + G_SY}`);
  }
}

// Gold staircase path — the "emerging insight" trace
const GOLD_PATH = `M ${G_X0} ${G_Y0} L ${G_X0 + G_SX} ${G_Y0} L ${G_X0 + G_SX} ${G_Y0 + G_SY} L ${G_X0 + G_SX * 2} ${G_Y0 + G_SY} L ${G_X0 + G_SX * 2} ${G_Y0 + G_SY * 2} L ${G_X0 + G_SX * 3} ${G_Y0 + G_SY * 2} L ${G_X0 + G_SX * 3} ${G_Y0 + G_SY * 3}`;

// ── Visual component ──────────────────────────────────────────────────────
const DataToIntelligenceVisual = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative w-full select-none">
      {/* Ambient glow behind the grid */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.07) 0%, transparent 70%)", filter: "blur(24px)" }} />

      <svg viewBox="0 0 225 110" className="w-full h-auto" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="o1FlowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="hsl(38 80% 55%)" stopOpacity="0"   />
            <stop offset="35%"  stopColor="hsl(38 80% 55%)" stopOpacity="0.55"/>
            <stop offset="65%"  stopColor="hsl(38 80% 55%)" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="hsl(38 80% 55%)" stopOpacity="0"   />
          </linearGradient>
          <filter id="o1Glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Scattered chaotic connections ── */}
        {SCATTERED_LINES.map((d, i) => (
          <motion.path key={`sl${i}`} d={d}
            stroke="hsl(38 80% 55%)" strokeWidth="0.35" fill="none"
            initial={{ strokeOpacity: 0 }}
            animate={inView ? { strokeOpacity: 0.18 } : {}}
            transition={{ delay: 0.1 + i * 0.04, duration: 0.5 }}
          />
        ))}

        {/* ── Scattered nodes ── */}
        {SCATTERED.map((n, i) => (
          <motion.circle key={n.id} cx={n.cx} cy={n.cy} r={n.r}
            fill="hsl(38 80% 55%)"
            initial={{ fillOpacity: 0, scale: 0 }}
            animate={inView ? { fillOpacity: 0.35 + (i % 4) * 0.08, scale: 1 } : {}}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.4, type: "spring", stiffness: 200 }}
          />
        ))}

        {/* ── Transformation zone — glowing divider ── */}
        <motion.rect x="83" y="0" width="6" height="110"
          fill="url(#o1FlowGrad)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0.7, 0.4, 0.8, 0.4] } : {}}
          transition={{ delay: 0.9, duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* ── Flowing chevrons in transform zone ── */}
        {[22, 50, 80].map((y, i) => (
          <motion.path key={`arr${i}`}
            d={`M 85 ${y - 4} L 90 ${y} L 85 ${y + 4}`}
            stroke="hsl(38 90% 65%)" strokeWidth="0.8" fill="none" strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 0.8, 0] } : {}}
            transition={{ delay: 1.2 + i * 0.35, duration: 1.0, repeat: Infinity, repeatDelay: 1.0 }}
          />
        ))}

        {/* ── Grid connections ── */}
        {GRID_LINES.map((d, i) => (
          <motion.path key={`gl${i}`} d={d}
            stroke="hsl(38 80% 55%)" strokeWidth="0.45" fill="none"
            initial={{ pathLength: 0, strokeOpacity: 0 }}
            animate={inView ? { pathLength: 1, strokeOpacity: 0.28 } : {}}
            transition={{ delay: 1.3 + i * 0.018, duration: 0.35 }}
          />
        ))}

        {/* ── Grid nodes ── */}
        {GRID.map((n, i) => (
          <motion.circle key={n.id} cx={n.cx} cy={n.cy} r="2.2"
            fill="hsl(38 80% 55%)"
            initial={{ fillOpacity: 0, scale: 0 }}
            animate={inView ? { fillOpacity: 0.85, scale: 1 } : {}}
            transition={{ delay: 1.5 + i * 0.045, duration: 0.3, type: "spring", stiffness: 260 }}
          />
        ))}

        {/* ── Gold insight path — draws last ── */}
        <motion.path d={GOLD_PATH}
          stroke="hsl(38 92% 65%)" strokeWidth="1.8" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#o1Glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 1.4, ease: "easeOut" }}
        />

        {/* Glow dot at path end */}
        <motion.circle
          cx={G_X0 + G_SX * 3} cy={G_Y0 + G_SY * 3} r="3.5"
          fill="hsl(38 90% 65%)" fillOpacity="0.9"
          filter="url(#o1Glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: [0, 1.4, 1], opacity: 1 } : {}}
          transition={{ delay: 3.4, duration: 0.5, type: "spring" }}
        />
      </svg>

      {/* Zone labels */}
      <div className="flex justify-between mt-2 px-1">
        <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground/50">Raw Data</span>
        <span className="text-[9px] uppercase tracking-[0.18em] text-primary/70">Structured Intelligence</span>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────
const AboutSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="about" className="relative py-16 md:py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

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

        {/* RIGHT — Data → Intelligence visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <DataToIntelligenceVisual />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
