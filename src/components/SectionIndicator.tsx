import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useMotionPref } from "@/lib/animations";

interface SectionInfo {
  id: string;
  label: string;
}

interface Props {
  sections: SectionInfo[];
}

/**
 * Fixed vertical strip of dots on the right side that shows which section
 * the user is currently scrolled to and lets them jump to another. Desktop
 * only (hidden on mobile/tablet). Uses IntersectionObserver to pick the
 * section whose middle is closest to the viewport's middle.
 */
const SectionIndicator = ({ sections }: Props) => {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const { shouldReduce } = useMotionPref();

  useEffect(() => {
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visibility.set(e.target.id, e.intersectionRatio);
          else visibility.delete(e.target.id);
        });
        // Choose the section with the highest intersection ratio
        let bestId = "";
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
        });
        if (bestId) setActive(bestId);
      },
      // Multiple thresholds give smooth tracking; rootMargin focuses on the
      // central band of the viewport so a section is "active" while in the
      // middle, not the moment it enters from below.
      { threshold: [0.15, 0.35, 0.55, 0.75], rootMargin: "-15% 0px -30% 0px" },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center"
          >
            {/* Hover/active label */}
            <span
              className={cn(
                "absolute right-full mr-3 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap bg-card border border-border text-foreground shadow-sm transition-opacity duration-200",
                isActive
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100 pointer-events-none",
              )}
            >
              {s.label}
            </span>

            {/* Dot — active grows + glows */}
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                isActive
                  ? "w-2.5 h-2.5 bg-primary shadow-[0_0_10px_hsl(38_80%_55%_/_0.6)]"
                  : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
              )}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default SectionIndicator;
