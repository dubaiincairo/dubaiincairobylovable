import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";

const defaultClients = "Novartis,Sanofi,Roche,Novo Nordisk,Huawei,Banque Misr,Yorkshire Tea,Beyond Meat,Alpro,Monin,Berlitz,Shark Tank Egypt,World Economic Forum,AstraZeneca,Pfizer,L'Oréal,Unilever,Samsung,Vodafone,Orange,Nestlé,PepsiCo,Johnson & Johnson,Danone,Bayer";

const ClientsSection = () => {
  const { get } = useSiteContent();
  const raw = get("clients_list", defaultClients);
  const clients = raw.split(/[,\n]/).map(s => s.trim()).filter(Boolean);

  // Split into two rows for the two marquee tracks
  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half);
  const row2 = clients.slice(half);

  return (
    <section id="work" className="relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, hsl(38 80% 55% / 0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, hsl(220 40% 30% / 0.05) 0%, transparent 50%)' }} />

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

      {/* Marquee Row 1 — left */}
      <div className="relative mb-3 overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

        <div className="flex animate-marquee-left gap-3 w-max">
          {[...row1, ...row1].map((name, i) => (
            <LogoChip key={`r1-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — right */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

        <div className="flex animate-marquee-right gap-3 w-max">
          {[...row2, ...row2].map((name, i) => (
            <LogoChip key={`r2-${i}`} name={name} gold />
          ))}
        </div>
      </div>
    </section>
  );
};

const LogoChip = ({ name, gold = false }: { name: string; gold?: boolean }) => (
  <div className={`
    flex-shrink-0 px-6 py-3 rounded-full border text-sm font-display font-semibold
    transition-colors duration-200 cursor-default
    ${gold
      ? "border-primary/30 text-primary/80 bg-primary/5 hover:bg-primary/10 hover:text-primary"
      : "border-border text-muted-foreground bg-card hover:border-primary/30 hover:text-foreground"
    }
  `}>
    {name}
  </div>
);

export default ClientsSection;
