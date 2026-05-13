import { motion, Variants } from "framer-motion";
import { MOTION, useMotionPref } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeroHeadlineProps {
  text: string;
  className?: string;
}

const HeroHeadline = ({ text, className }: HeroHeadlineProps) => {
  const { shouldReduce } = useMotionPref();

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

  return (
    <motion.h1
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
