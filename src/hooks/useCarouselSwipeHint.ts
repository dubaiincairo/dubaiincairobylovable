import { useEffect, useRef } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { useMotionPref } from "@/lib/animations";

/**
 * Once the host element enters the viewport, nudge the carousel slightly to
 * the right then snap back, signalling that more cards exist off-screen.
 * Skipped when prefers-reduced-motion is active.
 */
export function useCarouselSwipeHint(
  api: CarouselApi | undefined,
  rootRef: React.RefObject<HTMLElement>,
) {
  const { shouldReduce } = useMotionPref();
  const fired = useRef(false);

  useEffect(() => {
    if (!api || !rootRef.current || shouldReduce || fired.current) return;

    const el = rootRef.current;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;
        io.disconnect();

        // Delay slightly so the section entrance animation finishes first.
        const t1 = window.setTimeout(() => {
          api.scrollNext();
        }, 900);
        const t2 = window.setTimeout(() => {
          api.scrollPrev();
        }, 1550);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [api, rootRef, shouldReduce]);
}
