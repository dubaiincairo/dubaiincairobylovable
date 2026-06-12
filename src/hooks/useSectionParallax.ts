import { useRef, type RefObject } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMotionPref } from "@/lib/animations";

interface SectionParallax {
  ref: RefObject<HTMLElement>;
  headerY: MotionValue<number>;
  headerOpacity: MotionValue<number>;
  orbY: MotionValue<number>;
  orbScale: MotionValue<number>;
  contentY: MotionValue<number>;
}

interface SectionParallaxOptions {
  /**
   * Max px the header drifts up/down across the scroll window. Sections are
   * `overflow-hidden`, so short sections (little content below the header)
   * must pass a value smaller than their top padding or the header gets
   * clipped against the section's own top edge near the end of the window.
   */
  headerTravel?: number;
}

/**
 * Section-local scroll parallax. Returns a ref to attach to the <section>
 * and motion values that drift the section's header, background orb, and
 * content as the section moves through the viewport.
 *
 * Uses a tightened offset (start at 90% from viewport top → end at 10%)
 * so the animation happens during the most-visible scroll window rather
 * than the whole viewport-passage — giving the effect noticeable speed
 * per scroll-pixel.
 *
 * Reduced-motion users get static MotionValues.
 */
export const useSectionParallax = ({ headerTravel = 80 }: SectionParallaxOptions = {}): SectionParallax => {
  const ref = useRef<HTMLElement>(null);
  const { shouldReduce } = useMotionPref();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"],
  });

  const headerY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [headerTravel, -headerTravel],
  );
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    shouldReduce ? [1, 1, 1, 1] : [0.35, 1, 1, 0.5],
  );
  const orbY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [-140, 140]);
  const orbScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduce ? [1, 1, 1] : [0.85, 1.15, 0.85],
  );
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [40, -40]);

  return { ref, headerY, headerOpacity, orbY, orbScale, contentY };
};

