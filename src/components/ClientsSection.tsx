import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";

const MAX_SLOTS = 12;
const GAP = 12;

interface Logo {
  name: string;
  url: string;
}

// First-paint defaults — used when the CMS row doesn't exist yet. Once an
// editor saves or uploads in the admin, the CMS value overrides. Setting a
// slot to an empty string in the admin removes it from the wall.
const DEFAULT_LOGOS: Array<Logo | null> = [
  { name: "Samsung",  url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/samsung.svg" },
  { name: "Unilever", url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/unilever.svg" },
  { name: "Vodafone", url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vodafone.svg" },
  { name: "Huawei",   url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/huawei.svg" },
  { name: "PepsiCo",  url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/pepsi.svg" },
  { name: "Orange",   url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/orange.svg" },
  null, null, null, null, null, null,
];

const ClientsSection = () => {
  const { get } = useSiteContent();

  // Collect logo slots that have a URL set; blank slots are skipped.
  const logos: Logo[] = [];
  for (let i = 1; i <= MAX_SLOTS; i++) {
    const fallback = DEFAULT_LOGOS[i - 1];
    const url = get(`client_logo_${i}_url`, fallback?.url ?? "").trim();
    if (!url) continue;
    const name = get(`client_logo_${i}_name`, fallback?.name ?? `Client ${i}`).trim() || `Client ${i}`;
    logos.push({ name, url });
  }

  // Fallback to text-based clients_list if no logos are uploaded yet.
  const fallbackRaw = get("clients_list", "");
  const fallbackClients = fallbackRaw
    ? fallbackRaw.split(/[,\n]/).map((s) => s.trim()).filter(Boolean)
    : [];

  const useLogos = logos.length > 0;
  const half = Math.ceil((useLogos ? logos.length : fallbackClients.length) / 2);
  const row1Logos = useLogos ? logos.slice(0, half) : [];
  const row2Logos = useLogos ? logos.slice(half) : [];
  const row1Names = !useLogos ? fallbackClients.slice(0, half) : [];
  const row2Names = !useLogos ? fallbackClients.slice(half) : [];

  return (
    <section id="work" className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, hsl(38 80% 55% / 0.03) 0%, transparent 50%)' }} />

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

      <div className="space-y-3">
        {useLogos ? (
          <>
            <LogoMarquee items={row1Logos} direction="left" />
            <LogoMarquee items={row2Logos} direction="right" />
          </>
        ) : (
          <>
            <NameMarquee items={row1Names} direction="left" />
            <NameMarquee items={row2Names} direction="right" gold />
          </>
        )}
      </div>
    </section>
  );
};

/* ─────────────────── Logo marquee (image cells) ─────────────────── */

const LogoMarquee = ({ items, direction }: { items: Logo[]; direction: "left" | "right" }) => {
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

  const from = direction === "left" ? 0 : -copyWidth;
  const to = direction === "left" ? -copyWidth : 0;

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

      <div
        className="flex items-center"
        style={copyWidth ? {
          willChange: "transform",
          animation: `marquee-${direction} 30s linear infinite`,
          ["--from" as string]: `${from}px`,
          ["--to" as string]: `${to}px`,
        } : { visibility: "hidden" }}
      >
        <div ref={copyRef} className="flex flex-shrink-0 items-center">
          {items.map((logo, i) => (
            <LogoCell key={i} logo={logo} />
          ))}
        </div>
        {[2, 3, 4, 5, 6].map((n) => (
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
    className="flex-shrink-0 flex items-center justify-center h-16 w-40"
    style={{ marginRight: GAP }}
  >
    <img
      src={logo.url}
      alt={logo.name}
      loading="lazy"
      decoding="async"
      title={logo.name}
      className="max-h-10 max-w-[140px] w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
      style={{ filter: "brightness(0) invert(1)" }}
      onError={(e) => {
        // Fall back to brand name text if the image fails to load
        const el = e.currentTarget;
        el.style.display = "none";
        const parent = el.parentElement;
        if (parent && !parent.querySelector(".logo-fallback")) {
          const span = document.createElement("span");
          span.className = "logo-fallback text-sm font-display font-semibold text-muted-foreground";
          span.textContent = logo.name;
          parent.appendChild(span);
        }
      }}
    />
  </div>
);

/* ─────────────────── Name marquee (legacy fallback) ─────────────────── */

const NameMarquee = ({ items, direction, gold = false }: { items: string[]; direction: "left" | "right"; gold?: boolean }) => {
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

  const from = direction === "left" ? 0 : -copyWidth;
  const to = direction === "left" ? -copyWidth : 0;

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

      <div
        className="flex"
        style={copyWidth ? {
          willChange: "transform",
          animation: `marquee-${direction} 30s linear infinite`,
          ["--from" as string]: `${from}px`,
          ["--to" as string]: `${to}px`,
        } : { visibility: "hidden" }}
      >
        <div ref={copyRef} className="flex flex-shrink-0">
          {items.map((name, i) => (
            <NameChip key={i} name={name} gold={gold} />
          ))}
        </div>
        {[2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="flex flex-shrink-0" aria-hidden>
            {items.map((name, i) => (
              <NameChip key={`${n}-${i}`} name={name} gold={gold} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const NameChip = ({ name, gold }: { name: string; gold: boolean }) => (
  <div
    className={`flex-shrink-0 px-6 py-3 rounded-full border text-sm font-display font-semibold cursor-default transition-colors duration-200
      ${gold
        ? "border-primary/30 text-primary/80 bg-primary/5 hover:bg-primary/10 hover:text-primary"
        : "border-border text-muted-foreground bg-card hover:border-primary/30 hover:text-foreground"
      }`}
    style={{ marginRight: GAP }}
  >
    {name}
  </div>
);

export default ClientsSection;
