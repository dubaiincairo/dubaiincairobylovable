import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { MOTION, useMotionPref } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeroHeadlineProps {
  text: string;
  className?: string;
}

const HeroHeadline = ({ text, className }: HeroHeadlineProps) => {
  const { shouldReduce } = useMotionPref();
  const ref = useRef<HTMLHeadingElement>(null);

  // Scroll-linked: progress goes from 0 (headline at top of viewport)
  // to 1 (headline scrolled fully past the top). Drives parallax + fade.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const blur = useTransform(scrollYProgress, [0, 0.6, 1], ["blur(0px)", "blur(0px)", "blur(4px)"]);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.055,
        delayChildren: shouldReduce ? 0 : 0.18,
      },
    },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: MOTION.ease.entrance },
    },
  };

  const lines = text.split("\n");

  const scrollStyle = shouldReduce
    ? undefined
    : { y, opacity, scale, filter: blur, willChange: "transform, opacity, filter" as const };

  return (
    <motion.h1
      ref={ref}
      style={scrollStyle}
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.05] mb-6",
        className,
      )}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block" aria-hidden="true">
          {line.split(" ").filter(Boolean).map((w, wordIdx) => (
            <motion.span
              key={`${lineIdx}-${wordIdx}`}
              variants={word}
              className="inline-block mr-[0.25em] last:mr-0"
              style={{ willChange: "transform" }}
            >
              {w}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
};

export default HeroHeadline;
