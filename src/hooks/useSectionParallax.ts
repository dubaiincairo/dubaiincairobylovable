import { useRef, type RefObject } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMotionPref } from "@/lib/animations";

interface SectionParallax {
  ref: RefObject<HTMLElement>;
  headerY: MotionValue<number>;
  orbY: MotionValue<number>;
  contentY: MotionValue<number>;
}

/**
 * Section-local scroll parallax. Returns a ref to attach to the <section>
 * and motion values that drift the section's header, background orb, and
 * content as the section moves through the viewport.
 *
 * scrollYProgress goes 0 → 1 over the full window during which any part of
 * the section is in view (offset: ["start end", "end start"]).
 *
 * Reduced-motion users get static MotionValues (range collapses to [0, 0]).
 */
export const useSectionParallax = (): SectionParallax => {
  const ref = useRef<HTMLElement>(null);
  const { shouldReduce } = useMotionPref();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [25, -25]);
  const orbY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [-45, 45]);
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [12, -12]);

  return { ref, headerY, orbY, contentY };
};
