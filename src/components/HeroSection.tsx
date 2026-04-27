import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, TrendingUp, Users, Star, Briefcase } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { heroChild, heroHeadline } from "@/lib/animations";

// ── Animated SVG chart path ────────────────────────────────────────────────
const ChartVisual = () => (
  <svg viewBox="0 0 240 80" fill="none" className="w-full">
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(38 80% 55%)" stopOpacity="0.35" />
        <stop offset="100%" stopColor="hsl(38 80% 55%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Area fill */}
    <motion.path
      d="M0 70 C30 65 50 55 70 45 C90 35 110 25 130 20 C150 15 170 18 190 12 C210 6 225 8 240 5 L240 80 L0 80 Z"
      fill="url(#chartGrad)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
    />
    {/* Line */}
    <motion.path
      d="M0 70 C30 65 50 55 70 45 C90 35 110 25 130 20 C150 15 170 18 190 12 C210 6 225 8 240 5"
      stroke="hsl(38 80% 55%)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
    />
    {/* End dot */}
    <motion.circle
      cx="240" cy="5" r="3"
      fill="hsl(38 80% 55%)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, duration: 0.3 }}
    />
  </svg>
);

// ── Floating stat card ─────────────────────────────────────────────────────
const FloatCard = ({
  icon: Icon, value, label, delay, className,
}: {
  icon: typeof Star; value: string; label: string; delay: number; className?: string;
}) => (
  <motion.div
    className={`absolute flex items-center gap-2.5 bg-card/80 backdrop-blur-md border border-border rounded-xl px-3.5 py-2.5 shadow-lg ${className}`}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
  >
    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
      <Icon className="w-3.5 h-3.5 text-primary" />
    </div>
    <div>
      <div className="text-sm font-bold text-foreground leading-none">{value}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  </motion.div>
);

// ── Main component ─────────────────────────────────────────────────────────
const HeroSection = () => {
  const { get } = useSiteContent();

  // Hero visual — fully independent from the stats counter section
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

  return (
    <section className="relative md:min-h-screen flex md:items-center overflow-hidden px-6 pt-28 pb-16 md:pt-0 md:pb-0">

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
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

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
                backgroundImage: 'linear-gradient(90deg, hsl(38 80% 55%), hsl(38 90% 70%), hsl(38 80% 55%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {get("hero_tagline", "Dubai's Quality · Cairo's Reach")}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.05] mb-6 whitespace-pre-line"
            variants={heroHeadline}
            initial="hidden"
            animate="visible"
          >
            {get("hero_headline", "Data-Powered Growth. Science-Fueled Success.")}
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-lg mb-10 font-light leading-relaxed whitespace-pre-line"
            variants={heroChild(0.35)}
            initial="hidden"
            animate="visible"
          >
            {get("hero_subheadline", "We help ambitious businesses grow through the internet — with proven systems, measurable results, and a commitment to doing things differently.")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            variants={heroChild(0.5)}
            initial="hidden"
            animate="visible"
          >
            <a
              href="#services"
              className="group shimmer-btn inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide rounded-lg glow-gold transition-all duration-300 hover:brightness-110"
            >
              {get("hero_cta_primary", "Explore Our Services")}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-gold-subtle text-foreground font-display font-medium text-sm tracking-wide rounded-lg transition-all duration-300 hover:bg-secondary hover:border-primary/30"
            >
              {get("hero_cta_secondary", "Talk to Our Team")}
            </a>
          </motion.div>
        </div>

        {/* RIGHT — visual */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
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
                <ChartVisual />
              </div>
            </motion.div>

            {/* Floating cards */}
            <FloatCard icon={Star}       value={float1Value} label={float1Label} delay={0.9}  className="top-4 right-0" />
            <FloatCard icon={Users}      value={float2Value} label={float2Label} delay={1.1}  className="bottom-16 left-0" />
            <FloatCard icon={Briefcase}  value={float3Value} label={float3Label} delay={1.3}  className="top-1/2 -translate-y-1/2 -right-2" />
            <FloatCard icon={TrendingUp} value={float4Value} label={float4Label} delay={1.5}  className="bottom-4 right-8" />

          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;
