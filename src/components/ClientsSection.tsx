import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";

const defaultClients = "Novartis,Sanofi,Roche,Novo Nordisk,Huawei,Banque Misr,Yorkshire Tea,Beyond Meat,Alpro,Monin,Berlitz,Shark Tank Egypt,World Economic Forum,AstraZeneca,Pfizer,L'Oréal,Unilever,Samsung,Vodafone,Orange,Nestlé,PepsiCo,Johnson & Johnson,Danone,Bayer";

const GAP = 12; // px — space between chips

const ClientsSection = () => {
  const { get } = useSiteContent();
  const raw = get("clients_list", defaultClients);
  const clients = raw.split(/[,\n]/).map(s => s.trim()).filter(Boolean);

  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half);
  const row2 = clients.slice(half);

  return (
    <section id="work" className="relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, hsl(38 80% 55% / 0.03) 0%, transparent 50%)' }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-10 md:mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("clients_subtitle", "Success Partners")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {get("clients_headline", "Trusted by Brands That Mean Business")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {get("clients_description", "From global pharmaceutical giants to beloved local names.")}
          </p>
        </motion.div>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" gold />
      </div>
    </section>
  );
};

const MarqueeRow = ({ items, direction, gold = false }: { items: string[]; direction: "left" | "right"; gold?: boolean }) => {
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
  const to   = direction === "left" ? -copyWidth : 0;

  return (
    <div className="relative overflow-hidden">
      {/* fade edges */}
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
          ["--to"   as string]: `${to}px`,
        } : { visibility: "hidden" }}
      >
        {/* copy 1 — measured */}
        <div ref={copyRef} className="flex flex-shrink-0">
          {items.map((name, i) => (
            <LogoChip key={i} name={name} gold={gold} gap={GAP} />
          ))}
        </div>
        {/* copies 2–6 — ensures track is always full, loop never visible */}
        {[2,3,4,5,6].map(n => (
          <div key={n} className="flex flex-shrink-0" aria-hidden>
            {items.map((name, i) => (
              <LogoChip key={`${n}-${i}`} name={name} gold={gold} gap={GAP} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const LogoChip = ({ name, gold, gap }: { name: string; gold: boolean; gap: number }) => (
  <div
    className={`flex-shrink-0 px-6 py-3 rounded-full border text-sm font-display font-semibold cursor-default transition-colors duration-200
      ${gold
        ? "border-primary/30 text-primary/80 bg-primary/5 hover:bg-primary/10 hover:text-primary"
        : "border-border text-muted-foreground bg-card hover:border-primary/30 hover:text-foreground"
      }`}
    style={{ marginRight: gap }}
  >
    {name}
  </div>
);

export default ClientsSection;
