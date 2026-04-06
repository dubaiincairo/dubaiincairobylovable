import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const defaultClients = "Novartis,Sanofi,Roche,Novo Nordisk,Huawei,Banque Misr,Yorkshire Tea,Beyond Meat,Alpro,Monin,Berlitz,Shark Tank Egypt,World Economic Forum,AstraZeneca,Pfizer,L'Oréal,Unilever,Samsung,Vodafone,Orange,Nestlé,PepsiCo,Johnson & Johnson,Danone,Bayer";

const ClientsSection = () => {
  const { get } = useSiteContent();
  // Support both comma-separated and newline-separated
  const raw = get("clients_list", defaultClients);
  const clients = raw.split(/[,\n]/).map(s => s.trim()).filter(Boolean);

  return (
    <section id="work" className="py-16 md:py-32 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("clients_subtitle", "Success Partners")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 whitespace-pre-line">
            {get("clients_headline", "Trusted by Brands That Mean Business")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto whitespace-pre-line">
            {get("clients_description", "From global pharmaceutical giants to beloved local names.")}
          </p>
        </motion.div>

        <motion.div className="flex flex-wrap items-center justify-center gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          {clients.map((name, i) => (
            <motion.div key={name + i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="px-6 py-3 rounded-lg border border-border bg-card text-sm font-display font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
              {name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
