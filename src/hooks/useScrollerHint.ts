import { useEffect, useRef, RefObject } from "react";

export interface ScrollerHintOptions {
  /** Initial delay in ms before motion begins (default: 1600ms = 1.6s) */
  delay?: number;
  /** Displacement in pixels (default: 76px = exactly 2cm at 96 DPI) */
  distance?: number;
  /** Duration of outward movement in ms (default: 900ms) */
  forwardTime?: number;
  /** Pause at the 2cm peak in ms (default: 400ms) */
  pauseTime?: number;
  /** Duration of return movement in ms (default: 1000ms) */
  returnTime?: number;
}

/**
 * Custom React hook that applies the standard luxury 2cm horizontal scroller hint animation.
 *
 * @example
 * const scrollerRef = useScrollerHint<HTMLDivElement>();
 * return <div ref={scrollerRef} className="overflow-x-auto">...</div>;
 */
export function useScrollerHint<T extends HTMLElement = HTMLDivElement>(
  options: ScrollerHintOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const scroller = ref.current;
    if (!scroller) return;

    const {
      delay = 1600,
      distance = 76,       // 2cm in standard screen CSS pixels
      forwardTime = 900,   // ms
      pauseTime = 400,     // ms
      returnTime = 1000,   // ms
    } = options;

    let userInteracted = false;
    const onUserGesture = () => { userInteracted = true; };

    scroller.addEventListener("touchstart", onUserGesture, { passive: true });
    scroller.addEventListener("mousedown", onUserGesture, { passive: true });
    scroller.addEventListener("pointerdown", onUserGesture, { passive: true });
    scroller.addEventListener("wheel", onUserGesture, { passive: true });

    const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

    let rafId: number;
    let timerId: ReturnType<typeof setTimeout>;

    const animateScroll = (
      from: number,
      to: number,
      duration: number,
      callback?: () => void
    ) => {
      if (userInteracted || !scroller) return;
      const startTime = performance.now();
      const initialBehavior = scroller.style.scrollBehavior;
      scroller.style.scrollBehavior = "auto";

      const step = (currentTime: number) => {
        if (userInteracted || !scroller) {
          if (scroller) scroller.style.scrollBehavior = initialBehavior;
          return;
        }
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutSine(progress);

        scroller.scrollLeft = from + (to - from) * eased;

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          scroller.scrollLeft = to;
          scroller.style.scrollBehavior = initialBehavior;
          if (callback) callback();
        }
      };
      rafId = requestAnimationFrame(step);
    };

    timerId = setTimeout(() => {
      if (userInteracted || scroller.scrollLeft > 5) return;

      animateScroll(0, distance, forwardTime, () => {
        timerId = setTimeout(() => {
          if (userInteracted) return;
          animateScroll(distance, 0, returnTime, () => {
            if (scroller) scroller.scrollLeft = 0;
          });
        }, pauseTime);
      });
    }, delay);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(rafId);
      if (scroller) {
        scroller.removeEventListener("touchstart", onUserGesture);
        scroller.removeEventListener("mousedown", onUserGesture);
        scroller.removeEventListener("pointerdown", onUserGesture);
        scroller.removeEventListener("wheel", onUserGesture);
      }
    };
  }, [options.delay, options.distance, options.forwardTime, options.pauseTime, options.returnTime]);

  return ref;
}

export default useScrollerHint;
