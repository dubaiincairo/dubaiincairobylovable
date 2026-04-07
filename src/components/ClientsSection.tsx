import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, fadeIn, viewportOnce } from "@/lib/animations";

const defaultClients = "Novartis,Sanofi,Roche,Novo Nordisk,Huawei,Banque Misr,Yorkshire Tea,Beyond Meat,Alpro,Monin,Berlitz,Shark Tank Egypt,World Economic Forum,AstraZeneca,Pfizer,L'Oréal,Unilever,Samsung,Vodafone,Orange,Nestlé,PepsiCo,Johnson & Johnson,Danone,Bayer";

const ClientsSection = () => {
  const { get } = useSiteContent();
  const raw = get("clients_list", defaultClients);
  const clients = raw.split(/[,\n]/).map(s => s.trim()).filter(Boolean);

  return (
    <section id="work" className="py-16 md:py-32 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-8 md:mb-16" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
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

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {clients.map((name, i) => (
            <div key={name + i} className="px-3 py-2 md:px-6 md:py-3 rounded-lg border border-border bg-card text-xs md:text-sm font-display font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all text-center">
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
