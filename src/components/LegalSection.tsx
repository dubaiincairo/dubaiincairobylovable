import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const LegalSection = () => (
  <section className="py-20 px-6 border-t border-border">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">Registered, Licensed & Ready to Operate</span>
        </div>

        <div className="text-sm text-muted-foreground space-y-2 max-w-2xl mx-auto">
          <p className="text-foreground font-display font-semibold">Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC</p>
          <p>A Limited Liability Company</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mt-4 text-xs">
            <p><span className="text-foreground/70">Commercial Registration:</span> 163772</p>
            <p><span className="text-foreground/70">Membership No.:</span> 4568</p>
            <p><span className="text-foreground/70">Tax Registration:</span> 168-626-168</p>
            <p><span className="text-foreground/70">Sector:</span> IT & Telecom</p>
          </div>
          <p className="mt-3 text-xs">100 Al-Mirghany Street, Abu Dhabi Bank Building, 1st Floor, Heliopolis, Cairo</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default LegalSection;
