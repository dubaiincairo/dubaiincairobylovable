import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { heroChild, heroHeadline } from "@/lib/animations";

const HeroSection = () => {
  const { get } = useSiteContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px]" style={{ background: 'radial-gradient(circle, hsl(38 80% 55% / 0.06), transparent 70%)' }} />
      </div>

      {/* Dot grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(38 80% 55% / 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, hsl(220 20% 4%) 100%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div variants={heroChild(0)} initial="hidden" animate="visible">
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-[0.2em] uppercase border border-gold-subtle rounded-full text-primary whitespace-pre-line animate-shimmer-badge" style={{ backgroundImage: 'linear-gradient(90deg, hsl(38 80% 55%), hsl(38 90% 70%), hsl(38 80% 55%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {get("hero_tagline", "Dubai's Quality · Cairo's Reach")}
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] mb-6 whitespace-pre-line"
          variants={heroHeadline}
          initial="hidden"
          animate="visible"
        >
          {get("hero_headline", "Data-Powered Growth. Science-Fueled Success.")}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed whitespace-pre-line"
          variants={heroChild(0.35)}
          initial="hidden"
          animate="visible"
        >
          {get("hero_subheadline", "We help ambitious businesses grow through the internet — with proven systems, measurable results, and a commitment to doing things differently.")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={heroChild(0.5)}
          initial="hidden"
          animate="visible"
        >
          <a href="#services" className="group shimmer-btn inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide rounded-lg glow-gold transition-all hover:brightness-110">
            {get("hero_cta_primary", "Explore Our Services")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 border border-gold-subtle text-foreground font-display font-medium text-sm tracking-wide rounded-lg transition-all hover:bg-secondary hover:border-primary/30">
            {get("hero_cta_secondary", "Talk to Our Team")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
