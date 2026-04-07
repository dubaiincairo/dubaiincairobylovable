import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { heroChild, heroHeadline } from "@/lib/animations";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const HeroSection = () => {
  const { get } = useSiteContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(hsl(38 80% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(38 80% 55%) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2, ease }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div variants={heroChild(0)} initial="hidden" animate="visible">
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-[0.2em] uppercase border border-gold-subtle rounded-full text-primary whitespace-pre-line">
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
          <a href="#services" className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide rounded-lg glow-gold transition-all hover:brightness-110">
            {get("hero_cta_primary", "Explore Our Services")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 border border-gold-subtle text-foreground font-display font-medium text-sm tracking-wide rounded-lg transition-colors hover:bg-secondary">
            {get("hero_cta_secondary", "Talk to Our Team")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
