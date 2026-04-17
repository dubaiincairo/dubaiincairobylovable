import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";

// ── Funnel geometry ───────────────────────────────────────────────────────────
const CX = 200, TOP_Y = 44, BOT_Y = 244, TOP_HW = 116, BOT_HW = 13;
const FH = BOT_Y - TOP_Y;
const fL = (y: number) => CX - TOP_HW + ((y - TOP_Y) / FH) * (TOP_HW - BOT_HW);
const fR = (y: number) => CX + TOP_HW - ((y - TOP_Y) / FH) * (TOP_HW - BOT_HW);
const trap = (y0: number, y1: number) =>
  `M ${fL(y0)} ${y0} L ${fR(y0)} ${y0} L ${fR(y1)} ${y1} L ${fL(y1)} ${y1} Z`;

const STAGES = [
  { label: "Awareness",  y0: TOP_Y, y1: 104 },
  { label: "Engagement", y0: 104,   y1: 156 },
  { label: "Conversion", y0: 156,   y1: 203 },
  { label: "Retention",  y0: 203,   y1: BOT_Y },
];
const MIDS = STAGES.map(s => (s.y0 + s.y1) / 2);
const DIVS = [104, 156, 203];

// Side labels — plain text only, no icons, no circles
const LEFT  = ["Paid Ads", "Content & SEO", "Email Flows", "CRM System"];
const RIGHT = ["Audience Data", "Predictive AI", "A/B Testing", "Attribution"];

// ── SVG ───────────────────────────────────────────────────────────────────────
const FunnelSVG = ({ inView }: { inView: boolean }) => (
  <svg viewBox="0 0 400 276" className="w-full h-auto select-none">
    <defs>
      <linearGradient id="fFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="hsl(38 60% 50%)" stopOpacity="0.06" />
        <stop offset="100%" stopColor="hsl(38 80% 55%)" stopOpacity="0.18" />
      </linearGradient>
      <filter id="pillGlow" x="-30%" y="-50%" width="160%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* ── Funnel fill (single gradient shape) ── */}
    <motion.path
      d={trap(TOP_Y, BOT_Y)}
      fill="url(#fFill)"
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 0.1, duration: 0.8 }}
    />

    {/* ── Funnel outer border ── */}
    <motion.path
      d={`M ${fL(TOP_Y)} ${TOP_Y} L ${fR(TOP_Y)} ${TOP_Y} L ${fR(BOT_Y)} ${BOT_Y} L ${fL(BOT_Y)} ${BOT_Y} Z`}
      fill="none" stroke="hsl(38 75% 55%)" strokeWidth="0.75" strokeOpacity="0.45"
      initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
      transition={{ delay: 0.15, duration: 1.0, ease: "easeOut" }}
    />

    {/* ── Stage dividers ── */}
    {DIVS.map((y, i) => (
      <motion.path key={y}
        d={`M ${fL(y)} ${y} L ${fR(y)} ${y}`}
        stroke="hsl(38 70% 55%)" strokeWidth="0.45" strokeOpacity="0.2" fill="none"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
      />
    ))}

    {/* ── Stage labels ── */}
    {STAGES.map((s, i) => (
      <motion.text key={s.label}
        x={CX} y={MIDS[i] + 4.5}
        textAnchor="middle" fontSize="10.5" fontWeight="600"
        fill="hsl(38 85% 72%)"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.55 + i * 0.12, duration: 0.4 }}
      >{s.label}</motion.text>
    ))}

    {/* ── Left labels + thin connector ── */}
    {LEFT.map((label, i) => {
      const y = MIDS[i];
      return (
        <g key={`L${i}`}>
          <motion.path
            d={`M ${fL(y) - 3} ${y} L 72 ${y}`}
            stroke="hsl(38 60% 55%)" strokeWidth="0.4" strokeOpacity="0.18" fill="none"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.75 + i * 0.1, duration: 0.35 }}
          />
          <motion.text
            x={68} y={y + 3.5}
            textAnchor="end" fontSize="8.5"
            fill="hsl(0 0% 58%)"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 0.85 } : {}}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.35 }}
          >{label}</motion.text>
        </g>
      );
    })}

    {/* ── Right labels + thin connector ── */}
    {RIGHT.map((label, i) => {
      const y = MIDS[i];
      return (
        <g key={`R${i}`}>
          <motion.path
            d={`M ${fR(y) + 3} ${y} L 328 ${y}`}
            stroke="hsl(38 60% 55%)" strokeWidth="0.4" strokeOpacity="0.18" fill="none"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.75 + i * 0.1, duration: 0.35 }}
          />
          <motion.text
            x={332} y={y + 3.5}
            textAnchor="start" fontSize="8.5"
            fill="hsl(0 0% 58%)"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 0.85 } : {}}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.35 }}
          >{label}</motion.text>
        </g>
      );
    })}

    {/* ── Bottom output pill ── */}
    <motion.rect
      x={CX - 66} y={BOT_Y + 7} width={132} height={21} rx={10.5}
      fill="hsl(38 80% 55% / 0.08)" stroke="hsl(38 78% 55%)"
      strokeWidth="0.7" filter="url(#pillGlow)"
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 1.4, duration: 0.5 }}
    />
    <motion.text
      x={CX} y={BOT_Y + 21.5}
      textAnchor="middle" fontSize="8.5" fontWeight="700"
      fill="hsl(38 88% 66%)" filter="url(#pillGlow)"
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 1.55 }}
    >Revenue Growth</motion.text>
  </svg>
);

// ── Section ───────────────────────────────────────────────────────────────────
const AboutSection = () => {
  const { get } = useSiteContent();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-16 md:py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[420px] h-[420px] rounded-full bg-primary/4 blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

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

        {/* RIGHT — Funnel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <FunnelSVG inView={inView} />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
