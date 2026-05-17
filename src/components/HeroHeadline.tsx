import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { MOTION, useMotionPref } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface HeroHeadlineProps {
  text: string;
  className?: string;
}

const HeroHeadline = ({ text, className }: HeroHeadlineProps) => {
  const { shouldReduce } = useMotionPref();

  // Tied to document scroll so the effect is visible from the first
  // pixel of scroll — not only once the headline reaches viewport top.
  // (HeroHeadline is only rendered inside the home Hero section.)
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.9]);
  const blur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(5px)"]);

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
