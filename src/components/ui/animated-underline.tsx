import { motion } from "framer-motion";
import { MOTION, useMotionPref, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedUnderlineProps {
  align?: "left" | "center";
  width?: string;
  className?: string;
}

/**
 * A thin gold line that draws in from its origin when scrolled into view.
 * Used under section headings to anchor each chapter with a confident,
 * editorial accent.
 */
const AnimatedUnderline = ({
  align = "center",
  width = "w-12",
  className,
}: AnimatedUnderlineProps) => {
  const { shouldReduce } = useMotionPref();
  const originClass = align === "left" ? "origin-left" : "origin-center mx-auto";

  return (
    <motion.span
      aria-hidden="true"
      className={cn("block h-[2px] bg-primary/70 mt-4 mb-2 rounded-full", width, originClass, className)}
      initial={{ scaleX: shouldReduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOnce}
      transition={{
        duration: shouldReduce ? 0 : 0.9,
        ease: MOTION.ease.entrance,
        delay: shouldReduce ? 0 : 0.15,
      }}
    />
  );
};

export default AnimatedUnderline;
