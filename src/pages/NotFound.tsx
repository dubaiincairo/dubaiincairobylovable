import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Compass } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useSEO } from "@/hooks/useSEO";
import { MOTION, useMotionPref } from "@/lib/animations";

const NotFound = () => {
  const { shouldReduce } = useMotionPref();

  useSEO({
    title: "Page not found — Dubai in Cairo",
    description:
      "The page you're looking for doesn't exist or has moved. Head back to the homepage or browse our work.",
    canonical: "/404",
    noindex: true,
  });

  const fade = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0 : MOTION.duration.entrance,
        delay: shouldReduce ? 0 : i * 0.08,
        ease: MOTION.ease.entrance,
      },
    }),
  };

  return (
    <PageTransition>
      <main
        id="main-content"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24"
      >
        {/* Background orbs — same vocabulary as HeroSection */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full bg-primary/8 blur-[140px] animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] rounded-full bg-accent/10 blur-[120px] animate-float-reverse" />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, hsl(220 20% 4%) 100%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.span
            custom={0}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="inline-block mb-6 px-4 py-1.5 text-xs font-medium tracking-[0.25em] uppercase border border-gold-subtle rounded-full text-primary"
          >
            Error 404
          </motion.span>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="font-display font-bold text-7xl md:text-9xl leading-none mb-6 text-gradient-gold"
          >
            404
          </motion.h1>

          <motion.h2
            custom={2}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="font-display font-semibold text-2xl md:text-3xl text-foreground mb-4"
          >
            We couldn't find that page.
          </motion.h2>

          <motion.p
            custom={3}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg text-muted-foreground max-w-md mx-auto mb-10 font-light leading-relaxed"
          >
            The link may be broken, the page may have moved, or it never existed
            in the first place. Let's get you back on track.
          </motion.p>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide rounded-lg transition-colors duration-300 hover:bg-primary/90 shimmer-btn"
            >
              <Home className="w-4 h-4" />
              Back to home
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-foreground font-display font-medium text-sm tracking-wide rounded-lg transition-colors duration-300 hover:border-primary/40 hover:bg-foreground/[0.02]"
            >
              <Compass className="w-4 h-4" />
              Browse our work
            </Link>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default NotFound;
