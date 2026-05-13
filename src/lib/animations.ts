import type { Variants } from "framer-motion";
import { useReducedMotion } from "framer-motion";

// ── Motion design tokens ───────────────────────────────────────────────────
// Named constants so durations, easings, and stagger ratios stay consistent
// across the whole site. Refactor existing call sites to consume these
// instead of inlining magic numbers.
export const MOTION = {
  ease: {
    standard: [0.25, 0.46, 0.45, 0.94] as const,
    entrance: [0.16, 1, 0.3, 1] as const,
    exit: [0.4, 0, 0.2, 1] as const,
  },
  duration: {
    micro: 0.2,
    short: 0.4,
    entrance: 0.7,
    hero: 1.0,
  },
  stagger: {
    tight: 0.06,
    standard: 0.1,
    relaxed: 0.14,
  },
} as const;

const ease = MOTION.ease.standard;

// ── Reduced-motion helpers ─────────────────────────────────────────────────
export const useMotionPref = () => {
  const reduced = useReducedMotion();
  return { shouldReduce: Boolean(reduced) };
};

// ── Core variants ──────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: MOTION.duration.entrance, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: MOTION.duration.entrance, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: MOTION.duration.entrance, ease } },
};

export const slideDown: Variants = {
  hidden: { y: -60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 18 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: MOTION.duration.entrance, ease } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: MOTION.duration.entrance, ease } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: MOTION.stagger.standard, delayChildren: 0.05 },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: MOTION.stagger.relaxed, delayChildren: 0.1 },
  },
};

export const cardFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const heroChild = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: MOTION.duration.hero, delay, ease: MOTION.ease.entrance } },
});

export const heroHeadline: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: MOTION.duration.hero, delay: 0.15, ease: MOTION.ease.entrance } },
};

export const springBounce: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 16 } },
};

// ── Page-transition variants ───────────────────────────────────────────────
// Used by <PageTransition>. Asymmetric y (entries arrive +8, exits drift -4)
// is an intentional editorial trick: content feels like it "arrives into place"
// rather than just appearing.
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.duration.short, ease: MOTION.ease.standard },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: MOTION.duration.micro, ease: MOTION.ease.exit },
  },
};

export const pageVariantsReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: MOTION.duration.micro } },
  exit: { opacity: 0, transition: { duration: MOTION.duration.micro } },
};

// Use a generous margin so animations trigger well before elements enter the viewport
// and "once: true" ensures they never re-trigger (preventing flicker on scroll back).
export const viewportOnce = { once: true, margin: "-100px" as any };
