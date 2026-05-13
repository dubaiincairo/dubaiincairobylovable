import { MouseEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Star, Briefcase } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { heroChild, MOTION, useMotionPref } from "@/lib/animations";
import { FloatCard } from "@/components/ui/float-card";
import HeroHeadline from "@/components/HeroHeadline";

// ── Animated SVG chart path ────────────────────────────────────────────────
const ChartVisual = ({ shouldReduce }: { shouldReduce: boolean }) => (
  <svg viewBox="0 0 240 80" fill="none" className="w-full">
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(38 80% 55%)" stopOpacity="0.35" />
        <stop offset="100%" stopColor="hsl(38 80% 55%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Static area fill — appears with the dashboard card */}
    <path
      d="M0 70 C30 65 50 55 70 45 C90 35 110 25 130 20 C150 15 170 18 190 12 C210 6 225 8 240 5 L240 80 L0 80 Z"
      fill="url(#chartGrad)"
    />
    {/* Single line draw — the one moving accent */}
    <motion.path
      d="M0 70 C30 65 50 55 70 45 C90 35 110 25 130 20 C150 15 170 18 190 12 C210 6 225 8 240 5"
      stroke="hsl(38 80% 55%)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: shouldReduce ? 1 : 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: shouldReduce ? 0 : 0.2, duration: shouldReduce ? 0 : 1.2, ease: MOTION.ease.entrance }}
    />
    {/* Static end dot */}
    <circle cx="240" cy="5" r="3" fill="hsl(38 80% 55%)" />
  </svg>
);

// ── Refined scroll cue ─────────────────────────────────────────────────────
const ScrollCue = ({ label }: { label: string }) => {
  const { shouldReduce } = useMotionPref();
  return (
    <motion.a
      href="#about"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      aria-label={label}
    >
      <span className="text-[10px] tracking-[0.25em] uppercase font-medium">{label}</span>
      <div className="relative h-10 w-px overflow-hidden bg-border">
        <motion.div
          className="absolute left-0 right-0 h-4 bg-primary"
          initial={{ y: "-100%" }}
          animate={shouldReduce ? { y: "-100%" } : { y: ["-100%", "300%"] }}
          transition={
            shouldReduce
              ? { duration: 0 }
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }
          }
        />
      </div>
    </motion.a>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
const HeroSection = () => {
  const { get } = useSiteContent();
  const { shouldReduce } = useMotionPref();
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null);

  // Smooth, cohesive intro for the diagram column: one stagger drives the
  // dashboard card and four floating cards so they rise together as a unit.
  const diagramContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduce ? 0 : 0.5,
        staggerChildren: shouldReduce ? 0 : 0.12,
      },
    },
  };

  const diagramItem: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 12, scale: shouldReduce ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: shouldReduce ? 0 : 0.7, ease: MOTION.ease.entrance },
    },
  };

  const cardLabel    = get("hero_card_label",    "Growth Analytics");
  const cardTrend    = get("hero_card_trend",    "+34% ↑");
  const cardValue    = get("hero_card_value",    "216+");
  const cardSublabel = get("hero_card_sublabel", "Projects Delivered");
  const float1Value  = get("hero_float_1_value", "5.0 ★");
  const float1Label  = get("hero_float_1_label", "Google Rating");
  const float2Value  = get("hero_float_2_value", "50+");
  const float2Label  = get("hero_float_2_label", "Happy Clients");
  const float3Value  = get("hero_float_3_value", "5 Yrs");
  const float3Label  = get("hero_float_3_label", "In Business");
  const float4Value  = get("hero_float_4_value", "100%");
  const float4Label  = get("hero_float_4_label", "Digital-First");

  const handleSpotlightMove = (e: MouseEvent<HTMLElement>) => {
    if (shouldReduce || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSpotlightLeave = () => setSpotlight(null);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSpotlightMove}
      onMouseLeave={handleSpotlightLeave}
      className="relative md:min-h-screen flex md:items-center overflow-hidden px-6 pt-24 pb-16 md:pt-0 md:pb-0"
    >

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(circle, hsl(38 80% 55% / 0.06), transparent 70%)' }} />
      </div>

      {/* Dot grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(38 80% 55% / 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.28 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* Spotlight cursor — desktop only, disabled when reduced-motion */}
      {spotlight && !shouldReduce && (
        <div
          className="absolute pointer-events-none hidden md:block transition-opacity duration-200"
          style={{
            left: spotlight.x - 200,
            top: spotlight.y - 200,
            width: 400,
            height: 400,
            background:
              'radial-gradient(circle, hsl(38 80% 55% / 0.10), hsl(38 80% 55% / 0.04) 40%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, hsl(220 20% 4%) 100%)' }} />

      {/* ── Split grid ── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center md:pt-20">

        {/* LEFT — copy */}
        <div className="text-left">
          <motion.div variants={heroChild(0)} initial="hidden" animate="visible">
            <span
              className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-[0.2em] uppercase border border-gold-subtle rounded-full text-primary whitespace-pre-line animate-shimmer-badge"
              style={{
                color: 'hsl(38 80% 60%)',
                backgroundImage: 'linear-gradient(90deg, hsl(38 80% 60%), hsl(38 90% 75%), hsl(38 80% 60%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {get("hero_tagline", "Dubai's Quality · Cairo's Reach")}
            </span>
          </motion.div>

          <HeroHeadline text={get("hero_headline", "Data-Powered Growth. Science-Fueled Success.")} />

          <motion.p
            className="text-lg text-muted-foreground max-w-lg mb-10 font-light leading-relaxed whitespace-pre-line"
            variants={heroChild(0.45)}
            initial="hidden"
            animate="visible"
          >
            {get("hero_subheadline", "We help ambitious businesses grow through the internet — with proven systems, measurable results, and a commitment to doing things differently.")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            variants={heroChild(0.6)}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/studios"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide rounded-lg transition-colors duration-300 hover:bg-primary/90"
            >
              {get("hero_cta_primary", "Explore Our Services")}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 border border-border text-foreground font-display font-medium text-sm tracking-wide rounded-lg transition-colors duration-300 hover:border-primary/40 hover:bg-foreground/[0.02]"
            >
              {get("hero_cta_secondary", "Talk to Our Team")}
            </a>
          </motion.div>
        </div>

        {/* RIGHT — visual */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          variants={diagramContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full max-w-md aspect-square">

            {/* Outer decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[340px] h-[340px] rounded-full border border-primary/8 animate-float-slow" />
              <div className="absolute w-[260px] h-[260px] rounded-full border border-primary/12" />
            </div>

            {/* Central glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full"
                style={{ background: 'radial-gradient(circle, hsl(38 80% 55% / 0.12) 0%, transparent 70%)', filter: 'blur(24px)' }} />
            </div>

            {/* Main dashboard card */}
            <motion.div
              className="absolute inset-[15%] rounded-2xl border border-border bg-card/70 backdrop-blur-md p-5 flex flex-col justify-between shadow-2xl"
              variants={diagramItem}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{cardLabel}</span>
                  <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">{cardTrend}</span>
                </div>
                <div className="text-2xl font-display font-bold text-gradient-gold">{cardValue}</div>
                <div className="text-xs text-muted-foreground">{cardSublabel}</div>
              </div>
              <div className="mt-3">
                <ChartVisual shouldReduce={shouldReduce} />
              </div>
            </motion.div>

            {/* Floating cards — driven by parent stagger */}
            <FloatCard icon={Star}       value={float1Value} label={float1Label} variants={diagramItem} className="top-4 right-0" />
            <FloatCard icon={Users}      value={float2Value} label={float2Label} variants={diagramItem} className="bottom-16 left-0" />
            <FloatCard icon={Briefcase}  value={float3Value} label={float3Label} variants={diagramItem} className="top-1/2 -translate-y-1/2 -right-2" />
            <FloatCard icon={TrendingUp} value={float4Value} label={float4Label} variants={diagramItem} className="bottom-4 right-8" />

          </div>
        </motion.div>
      </div>

      <ScrollCue label="Scroll" />
    </section>
  );
};

export default HeroSection;
