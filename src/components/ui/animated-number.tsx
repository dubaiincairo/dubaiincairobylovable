import { useRef, useEffect, useState, ElementType } from "react";
import { motion, useInView } from "framer-motion";
import { useMotionPref } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  /** Display value. The first numeric chunk is animated; non-digit prefixes
   *  (e.g. "+", "$") and suffixes (e.g. "%", "+", "★", " Yrs") are preserved
   *  verbatim. Decimal values keep their precision (e.g. "5.0" stays "5.0"). */
  value: string;
  className?: string;
  /** Animation duration in ms. Defaults to 2200. */
  duration?: number;
  /** Render as div (default) or span for inline contexts. */
  as?: "div" | "span";
  /** Disable the scale pulse on landing. */
  disablePulse?: boolean;
}

const parse = (value: string) => {
  // Captures: optional non-digit/non-dot prefix, the number (with optional
  // decimals), and any trailing characters (suffix).
  const match = value.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numberStr, suffix] = match;
  const decimalPart = numberStr.split(".")[1];
  return {
    prefix,
    target: parseFloat(numberStr),
    suffix,
    decimals: decimalPart ? decimalPart.length : 0,
  };
};

const AnimatedNumber = ({
  value,
  className,
  duration = 2200,
  as = "div",
  disablePulse = false,
}: AnimatedNumberProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { shouldReduce } = useMotionPref();
  const [display, setDisplay] = useState(value);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const parsed = parse(value);

    if (!parsed) {
      setDisplay(value);
      setLanded(true);
      return;
    }

    if (shouldReduce) {
      setDisplay(value);
      setLanded(true);
      return;
    }

    const { prefix, target, suffix, decimals } = parsed;
    const start = Date.now();

    const formatNumber = (n: number) =>
      decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quart: confident climb, gentle landing
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(prefix + formatNumber(target * eased) + suffix);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setLanded(true);
      }
    };
    requestAnimationFrame(tick);
  }, [isInView, value, shouldReduce, duration]);

  const MotionTag = as === "span" ? motion.span : motion.div;
  const shouldPulse = landed && !shouldReduce && !disablePulse;

  return (
    <MotionTag
      ref={ref as never}
      className={cn(className)}
      animate={shouldPulse ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {display}
    </MotionTag>
  );
};

export { AnimatedNumber };
