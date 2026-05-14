import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";

const MAX_SLOTS = 24;
const GAP = 16;

interface Logo {
  name: string;
  url: string;
}

// First-paint default brand names. The corresponding URL is left empty so the
// component renders a styled text wordmark until a real SVG/PNG is uploaded
// to that slot in the admin. Huawei alone has a public Simple Icons SVG; the
// rest (regional, pharma, hospitality) need to be uploaded by the editor.
const DEFAULT_NAMES = [
  "Arma",
  "Sanofi",
  "Novartis",
  "Roche",
  "Novo Nordisk",
  "Berlitz",
  "Monin",
  "Alpro",
  "Huawei",
  "World Economic Forum",
  "Banque Misr",
  "The National Council for Women",
  "ADCB Bank",
  "Shark Tank Egypt",
  "Sarj",
  "EDGE Consultants",
  "Abou Tarek",
  "Quanta",
  "San Benedetto",
  "EduFun",
  "El Kou5 Restaurant & Cafe",
];

const DEFAULT_URLS: Record<number, string> = {
  9: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/huawei.svg",
};

const ClientsSection = () => {
  const { get } = useSiteContent();

  const logos: Logo[] = [];
  for (let i = 1; i <= MAX_SLOTS; i++) {
    const enabled = get(`client_logo_${i}_enabled`, "true").trim();
    if (enabled === "false") continue;
    const fallbackName = DEFAULT_NAMES[i - 1] ?? "";
    const fallbackUrl = DEFAULT_URLS[i] ?? "";
    const name = get(`client_logo_${i}_name`, fallbackName).trim();
    const url = get(`client_logo_${i}_url`, fallbackUrl).trim();
    if (!name && !url) continue;
    logos.push({ name: name || `Client ${i}`, url });
  }

  if (logos.length === 0) return null;

  return (
    <section id="work" className="relative py-12 md:py-16 overflow-hidden">
      {/* Ambient gold wash behind the strip */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[240px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(38 80% 55% / 0.05), transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
            {get("clients_subtitle", "Success Partners")}
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {get("clients_headline", "Trusted by Brands That Mean Business")}
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            {get("clients_description", "From global pharmaceutical giants to beloved local names.")}
          </p>
        </motion.div>
      </div>

      {/* Single-row continuous marquee — framed by a thin top and bottom rule */}
      <div className="relative border-y border-border/30 bg-card/20">
        <LogoMarquee items={logos} />
      </div>
    </section>
  );
};

/* ─────────────────── Marquee ─────────────────── */

const LogoMarquee = ({ items }: { items: Logo[] }) => {
  const copyRef = useRef<HTMLDivElement>(null);
  const [copyWidth, setCopyWidth] = useState(0);

  useEffect(() => {
    if (!copyRef.current) return;
    setCopyWidth(copyRef.current.scrollWidth + GAP);
    const ro = new ResizeObserver(() => {
      if (copyRef.current) setCopyWidth(copyRef.current.scrollWidth + GAP);
    });
    ro.observe(copyRef.current);
    return () => ro.disconnect();
  }, [items]);

  return (
    <div className="relative overflow-hidden py-2">
      {/* fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
      />

      <div
        className="flex items-center"
        style={
          copyWidth
            ? {
                willChange: "transform",
                animation: `marquee-left 60s linear infinite`,
                ["--from" as string]: `0px`,
                ["--to" as string]: `${-copyWidth}px`,
              }
            : { visibility: "hidden" }
        }
      >
        <div ref={copyRef} className="flex flex-shrink-0 items-center">
          {items.map((logo, i) => (
            <LogoCell key={i} logo={logo} />
          ))}
        </div>
        {[2, 3].map((n) => (
          <div key={n} className="flex flex-shrink-0 items-center" aria-hidden>
            {items.map((logo, i) => (
              <LogoCell key={`${n}-${i}`} logo={logo} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const LogoCell = ({ logo }: { logo: Logo }) => (
  <div
    className="flex-shrink-0 flex items-center justify-center h-20 w-48 px-4 group"
    style={{ marginRight: GAP }}
    title={logo.name}
  >
    {logo.url ? (
      <img
        src={logo.url}
        alt={logo.name}
        loading="lazy"
        decoding="async"
        className="max-h-12 max-w-[160px] w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ filter: "brightness(0) invert(1)" }}
        onError={(e) => {
          // Image failed -> swap to text wordmark so the cell is never empty
          const el = e.currentTarget;
          el.style.display = "none";
          const parent = el.parentElement;
          if (parent && !parent.querySelector(".logo-fallback")) {
            const span = document.createElement("span");
            span.className =
              "logo-fallback font-display font-semibold text-base text-muted-foreground/60 tracking-wide whitespace-nowrap";
            span.textContent = logo.name;
            parent.appendChild(span);
          }
        }}
      />
    ) : (
      <span className="font-display font-semibold text-base text-muted-foreground/60 group-hover:text-foreground transition-colors duration-300 tracking-wide whitespace-nowrap text-center">
        {logo.name}
      </span>
    )}
  </div>
);

export default ClientsSection;
