import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";

// ── Funnel geometry helpers ──────────────────────────────────────────────────
const CX    = 220;   // horizontal centre
const TOP_Y = 52;    // top of funnel
const BOT_Y = 250;   // bottom of funnel body
const TOP_HW = 136;  // half-width at top
const BOT_HW = 15;   // half-width at bottom (narrow tip)
const FH = BOT_Y - TOP_Y;

const fL = (y: number) => CX - TOP_HW + ((y - TOP_Y) / FH) * (TOP_HW - BOT_HW);
const fR = (y: number) => CX + TOP_HW - ((y - TOP_Y) / FH) * (TOP_HW - BOT_HW);
const trap = (y0: number, y1: number) =>
  `M ${fL(y0)} ${y0} L ${fR(y0)} ${y0} L ${fR(y1)} ${y1} L ${fL(y1)} ${y1} Z`;

// Stage divider y-values
const DIVS = [104, 157, 205];

const STAGES = [
  { label: "Awareness",  y0: TOP_Y, y1: 104, fill: "hsl(38 22% 13%)" },
  { label: "Engagement", y0: 104,   y1: 157, fill: "hsl(38 38% 16%)" },
  { label: "Conversion", y0: 157,   y1: 205, fill: "hsl(38 55% 19%)" },
  { label: "Retention",  y0: 205,   y1: BOT_Y, fill: "hsl(38 68% 22%)" },
];
const MIDS = STAGES.map(s => (s.y0 + s.y1) / 2);

// Side item circles
const L_CX = 32, R_CX = 408, CR = 15;

const LEFT_ITEMS = [
  { abbr: "AD",  label: "Paid Ads"      },
  { abbr: "SEO", label: "Content & SEO" },
  { abbr: "EM",  label: "Email Flows"   },
  { abbr: "CRM", label: "CRM System"    },
];
const RIGHT_ITEMS = [
  { abbr: "TGT", label: "Audience Data" },
  { abbr: "AI",  label: "Predictive AI" },
  { abbr: "A/B", label: "A/B Testing"   },
  { abbr: "ANL", label: "Attribution"   },
];

// ── SVG Funnel ───────────────────────────────────────────────────────────────
const FunnelSVG = ({ inView }: { inView: boolean }) => (
  <svg viewBox="0 0 440 295" className="w-full h-auto select-none">
    <defs>
      <filter id="fGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="1.8" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="fBorderGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="hsl(38 80% 55%)" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="hsl(38 80% 55%)" stopOpacity="0.15"/>
      </linearGradient>
    </defs>

    {/* ── Column headers ── */}
    {([ ["INPUTS", L_CX], ["MARKETING FUNNEL", CX], ["INTELLIGENCE", R_CX] ] as [string, number][]).map(([lbl, x]) => (
      <motion.text key={lbl} x={x} y={30} textAnchor="middle"
        fontSize={x === CX ? "7.5" : "6.5"} fontWeight="700" letterSpacing="0.14em"
        fill={x === CX ? "hsl(38 80% 58%)" : "hsl(0 0% 48%)"}
        initial={{ opacity: 0 }} animate={inView ? { opacity: x === CX ? 0.9 : 0.6 } : {}}
        transition={{ delay: 0.05, duration: 0.4 }}
      >{lbl}</motion.text>
    ))}

    {/* ── Stage trapezoids ── */}
    {STAGES.map((s, i) => (
      <motion.path key={s.label} d={trap(s.y0, s.y1)}
        fill={s.fill}
        stroke="url(#fBorderGrad)" strokeWidth="0.6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.18 + i * 0.13, duration: 0.55 }}
      />
    ))}

    {/* Outer funnel border */}
    <motion.path
      d={`M ${fL(TOP_Y)} ${TOP_Y} L ${fR(TOP_Y)} ${TOP_Y} L ${fR(BOT_Y)} ${BOT_Y} L ${fL(BOT_Y)} ${BOT_Y} Z`}
      fill="none" stroke="hsl(38 75% 55%)" strokeWidth="0.7" strokeOpacity="0.35"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{ delay: 0.1, duration: 1.0, ease: "easeOut" }}
    />

    {/* ── Stage dividers ── */}
    {DIVS.map((y, i) => (
      <motion.path key={`dv${y}`} d={`M ${fL(y)} ${y} L ${fR(y)} ${y}`}
        stroke="hsl(38 70% 55%)" strokeWidth="0.55" strokeOpacity="0.22" fill="none"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ delay: 0.35 + i * 0.1, duration: 0.4 }}
      />
    ))}

    {/* ── Stage labels ── */}
    {STAGES.map((s, i) => (
      <motion.text key={`sl${i}`} x={CX} y={MIDS[i] + 4.5}
        textAnchor="middle" fontSize="10.5" fontWeight="700"
        fill="hsl(38 88% 74%)" letterSpacing="0.02em"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 + i * 0.13, duration: 0.4 }}
      >{s.label}</motion.text>
    ))}

    {/* ── Left side items ── */}
    {LEFT_ITEMS.map((item, i) => {
      const y  = MIDS[i];
      const fx = fL(y);
      return (
        <g key={`L${i}`}>
          {/* Edge dot */}
          <motion.circle cx={fx} cy={y} r="2.8" fill="hsl(38 82% 58%)"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.78 + i * 0.12, duration: 0.3 }}
          />
          {/* Dashed connector */}
          <motion.path d={`M ${fx - 4} ${y} L ${L_CX + CR + 4} ${y}`}
            stroke="hsl(38 75% 55%)" strokeWidth="0.55" strokeDasharray="3.5,2.5"
            strokeOpacity="0.38" fill="none"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 + i * 0.12, duration: 0.35 }}
          />
          {/* Circle ring */}
          <motion.circle cx={L_CX} cy={y} r={CR}
            fill="hsl(38 75% 55% / 0.07)" stroke="hsl(38 72% 52%)"
            strokeWidth="0.8" strokeOpacity="0.55"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 + i * 0.12, duration: 0.4 }}
          />
          {/* Abbreviation */}
          <motion.text x={L_CX} y={y + 3.5} textAnchor="middle"
            fontSize="7" fontWeight="800" fill="hsl(38 88% 68%)"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.08 + i * 0.12 }}
          >{item.abbr}</motion.text>
          {/* Label */}
          <motion.text x={L_CX} y={y + CR + 10} textAnchor="middle"
            fontSize="6.2" fill="hsl(0 0% 58%)"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
            transition={{ delay: 1.12 + i * 0.12 }}
          >{item.label}</motion.text>
        </g>
      );
    })}

    {/* ── Right side items ── */}
    {RIGHT_ITEMS.map((item, i) => {
      const y  = MIDS[i];
      const fx = fR(y);
      return (
        <g key={`R${i}`}>
          <motion.circle cx={fx} cy={y} r="2.8" fill="hsl(38 82% 58%)"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.78 + i * 0.12, duration: 0.3 }}
          />
          <motion.path d={`M ${fx + 4} ${y} L ${R_CX - CR - 4} ${y}`}
            stroke="hsl(38 75% 55%)" strokeWidth="0.55" strokeDasharray="3.5,2.5"
            strokeOpacity="0.38" fill="none"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 + i * 0.12, duration: 0.35 }}
          />
          <motion.circle cx={R_CX} cy={y} r={CR}
            fill="hsl(38 75% 55% / 0.07)" stroke="hsl(38 72% 52%)"
            strokeWidth="0.8" strokeOpacity="0.55"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 + i * 0.12, duration: 0.4 }}
          />
          <motion.text x={R_CX} y={y + 3.5} textAnchor="middle"
            fontSize="7" fontWeight="800" fill="hsl(38 88% 68%)"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.08 + i * 0.12 }}
          >{item.abbr}</motion.text>
          <motion.text x={R_CX} y={y + CR + 10} textAnchor="middle"
            fontSize="6.2" fill="hsl(0 0% 58%)"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 0.8 } : {}}
            transition={{ delay: 1.12 + i * 0.12 }}
          >{item.label}</motion.text>
        </g>
      );
    })}

    {/* ── Bottom pill ── */}
    <motion.rect x={CX - 76} y={BOT_Y + 6} width={152} height={23} rx={11.5}
      fill="hsl(38 78% 55% / 0.12)" stroke="hsl(38 80% 55%)"
      strokeWidth="0.8" filter="url(#fGlow)"
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 1.65, duration: 0.5 }}
    />
    <motion.text x={CX} y={BOT_Y + 21.5} textAnchor="middle"
      fontSize="8.8" fontWeight="700" fill="hsl(38 90% 66%)" filter="url(#fGlow)"
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: 1.8 }}
    >Predictive Revenue Growth</motion.text>

    {/* ── Top entry arrows (left & right) ── */}
    {[
      { d: `M ${CX - 60} ${TOP_Y} L ${CX - 30} ${TOP_Y - 12}`, anchor: "end",   label: "Data In" },
      { d: `M ${CX + 60} ${TOP_Y} L ${CX + 30} ${TOP_Y - 12}`, anchor: "start", label: "Signals In" },
    ].map(({ d, anchor, label }, i) => (
      <g key={`entry${i}`}>
        <motion.path d={d}
          stroke="hsl(38 70% 55%)" strokeWidth="0.8" strokeOpacity="0.35"
          fill="none" markerEnd="url(#arrowDown)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.08, duration: 0.5 }}
        />
        <motion.text
          x={i === 0 ? CX - 63 : CX + 63} y={TOP_Y - 14}
          textAnchor={anchor as "end" | "start"}
          fontSize="6" fill="hsl(0 0% 52%)" fillOpacity="0.7"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.7 } : {}}
          transition={{ delay: 0.2 }}
        >{label}</motion.text>
      </g>
    ))}
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

        {/* RIGHT — Funnel visual */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 30 }}
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
