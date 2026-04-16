import { motion } from "framer-motion";
import { Shield, MapPin, Building2, FileText, CreditCard, Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, fadeIn, viewportOnce } from "@/lib/animations";

const LegalSection = () => {
  const { get } = useSiteContent();

  const details = [
    { icon: FileText, label: get("legal_reg_label", "Commercial Registration"), value: get("legal_reg", "163772") },
    { icon: Building2, label: get("legal_membership_label", "Membership No."), value: get("legal_membership", "4568") },
    { icon: CreditCard, label: get("legal_tax_label", "Tax Registration"), value: get("legal_tax", "168-626-168") },
    { icon: Globe, label: get("legal_sector_label", "Sector"), value: get("legal_sector", "IT & Telecom") },
  ];

  return (
    <section className="relative py-8 md:py-14 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent, hsl(220 18% 6% / 0.5), transparent)' }} />

      <div className="relative max-w-5xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary whitespace-pre-line">
              {get("legal_subtitle", "Registered, Licensed & Ready to Operate")}
            </span>
          </div>

          <h3 className="text-center text-xl md:text-2xl font-display font-bold mb-2 whitespace-pre-line">
            {get("legal_company_name", "Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC")}
          </h3>
          <p className="text-center text-sm text-muted-foreground mb-10 whitespace-pre-line">
            {get("legal_company_type", "A Limited Liability Company")}
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {details.map((item, i) => (
            <motion.div key={i} className="glass-card flex flex-col items-center text-center p-5 rounded-xl hover-lift" variants={cardFadeUp}>
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground mb-1">{item.label}</span>
              <span className="text-sm font-display font-semibold">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="flex items-center justify-center gap-2 text-sm text-muted-foreground" variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="whitespace-pre-line">{get("legal_address", "100 Al-Mirghany Street, Abu Dhabi Bank Building, 1st Floor, Heliopolis, Cairo")}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default LegalSection;
