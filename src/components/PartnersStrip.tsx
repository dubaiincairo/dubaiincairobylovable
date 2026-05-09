import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeIn, viewportOnce } from "@/lib/animations";

const PartnersStrip = () => {
  const { get } = useSiteContent();

  const partners = [
    { href: "/partnerships/odoo",    label: get("partners_strip_odoo",    "Odoo ERP Partner") },
    { href: "/partnerships/yanolja", label: get("partners_strip_yanolja", "Yanolja Cloud Partner") },
    { href: "/partnerships/zoho",    label: get("partners_strip_zoho",    "Zoho Authorized Partner") },
  ];

  return (
    <motion.section
      aria-label="Official partnerships"
      className="relative px-6 py-6 md:py-8 border-y border-border/40"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
          {get("partners_strip_label", "Official Partner Of")}
        </span>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
          {partners.map((p) => (
            <li key={p.href}>
              <Link
                to={p.href}
                className="inline-flex items-center min-h-[44px] px-2 text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default PartnersStrip;
