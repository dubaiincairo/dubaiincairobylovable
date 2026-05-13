import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";

const driveImg = (id: string) => `https://drive.google.com/uc?export=view&id=${id}`;

const LOGO_MAP: Record<string, string> = {
  "Novartis":                      driveImg("1o3FOf7f11ttW4KgGySmJx_AkuJ5ToWgX"),
  "Sanofi":                        driveImg("1HgRxZlkzZF1pNqyj-Hf3JOjuIfnAWRY8"),
  "Roche":                         driveImg("1FbjFKBZLGnVlZDgiLHW58Q58FLmv31zD"),
  "Novo Nordisk":                  driveImg("1JUlTFhYOcVf4YWiXlKfjEgcxx9mFxs98"),
  "Banque Misr":                   driveImg("1ShiTKV-EI8ebo6OwKiFfHwoY_ixZBgjr"),
  "Monin":                         driveImg("1x9FP9c52lCxZsk7V73AMaSFwE1CFLsN7"),
  "Berlitz":                       driveImg("1wME_0l97T_jeKt17E671cHYCYopTQLzC"),
  "World Economic Forum":          driveImg("1i3OAk4NehrSm5ykRhf4lJLiVRB9eNjAt"),
  "EDGE Consultants":              driveImg("1FakwE71h4BBhquIyuya_3Ple-yEXPJ9-"),
  "San Benedetto":                 driveImg("1fV1L2fpmTsw0rnHyzY0Ab0VlB469H8qh"),
  "Edu Fun":                       driveImg("1ca3mV_-ftQIm_buMj1Wj_IlTuww_K-kK"),
  "Arma Group":                    driveImg("1Tia50ucaqUlADkAWmhv3wqzD81snK4c3"),
  "Abou Tarek":                    driveImg("1PikR4VmaAVPzRP-LKtCiqzWg8f5rVLcE"),
  "SARJ":                          driveImg("1mbLSIaKSMu8ptmbr1YsO06UuNhuwQ1R2"),
  "ADCB":                          driveImg("1_zLJpegkwQdVOK-KIae9UKsV7mmQYlSm"),
  "National Council for Women":    driveImg("1u32DClLo_fqHf9gPR3R80n63B1OzlVcR"),
};

const defaultClients = "Novartis,Sanofi,Roche,Novo Nordisk,Banque Misr,Monin,Berlitz,World Economic Forum,EDGE Consultants,San Benedetto,Edu Fun,Arma Group,Abou Tarek,SARJ,ADCB,National Council for Women,Huawei,Yorkshire Tea,Beyond Meat,Alpro,Shark Tank Egypt,AstraZeneca,Pfizer,L'Oréal,Unilever,Samsung,Vodafone,Orange,Nestlé,PepsiCo,Johnson & Johnson,Danone,Bayer";

const GAP = 16; // px — space between chips

const ClientsSection = () => {
  const { get } = useSiteContent();
  const raw = get("clients_list", defaultClients);
  const clients = raw.split(/[,\n]/).map(s => s.trim()).filter(Boolean);

  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half);
  const row2 = clients.slice(half);

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

const LogoChip = ({ name, gold, gap }: { name: string; gold: boolean; gap: number }) => {
  const logoUrl = LOGO_MAP[name];

  if (logoUrl) {
    return (
      <div
        className="flex-shrink-0 flex items-center justify-center px-5 rounded-xl border border-border bg-white/90 hover:border-primary/40 transition-colors duration-200"
        style={{ marginRight: gap, height: "52px", minWidth: "110px", maxWidth: "200px" }}
      >
        <img
          src={logoUrl}
          alt={name}
          className="max-h-8 max-w-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  return (
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
};

export default ClientsSection;
