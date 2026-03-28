import { motion } from "framer-motion";
import { Shield, MapPin, Building2, FileText, CreditCard, Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const LegalSection = () => {
  const { get } = useSiteContent();

  const details = [
    { icon: FileText, label: "Commercial Registration", value: get("legal_reg", "163772") },
    { icon: Building2, label: "Membership No.", value: get("legal_membership", "4568") },
    { icon: CreditCard, label: "Tax Registration", value: get("legal_tax", "168-626-168") },
    { icon: Globe, label: "Sector", value: get("legal_sector", "IT & Telecom") },
  ];

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
              {get("legal_subtitle", "Registered, Licensed & Ready to Operate")}
            </span>
          </div>

          <h3 className="text-center text-xl md:text-2xl font-display font-bold mb-2">
            {get("legal_company_name", "Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC")}
          </h3>
          <p className="text-center text-sm text-muted-foreground mb-10">
            {get("legal_company_type", "A Limited Liability Company")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {details.map((item, i) => (
              <motion.div key={item.label} className="flex flex-col items-center text-center p-5 rounded-xl border border-border bg-card" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground mb-1">{item.label}</span>
                <span className="text-sm font-display font-semibold">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>{get("legal_address", "100 Al-Mirghany Street, Abu Dhabi Bank Building, 1st Floor, Heliopolis, Cairo")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LegalSection;
