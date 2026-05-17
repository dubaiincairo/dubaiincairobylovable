import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeIn, viewportOnce } from "@/lib/animations";

const PHONES = [
  { display: "+20 120 200 0068", href: "tel:+20120200068" },
  { display: "+966 059 597 9064", href: "tel:+966595979064" },
];

const Footer = () => {
  const { get } = useSiteContent();

  const exploreLinks = [
    { href: "/",        label: get("nav_link_home",    "Home") },
    { href: "/studios", label: get("nav_link_studios", "Studios") },
    { href: "/careers", label: get("nav_link_careers", "Careers") },
    { href: "/tech",    label: get("nav_link_tech",    "Tech Stack") },
    { href: "/faq",     label: get("nav_link_faq",     "FAQ") },
  ];

  const partnerLinks = [
    { href: "/partnerships/odoo",    label: get("nav_partner_odoo",    "Odoo ERP") },
    { href: "/partnerships/yanolja", label: get("nav_partner_yanolja", "Yanolja Cloud") },
    { href: "/partnerships/zoho",    label: get("nav_partner_zoho",    "Zoho") },
  ];

  return (
    <motion.footer
      className="relative pt-12 md:pt-14 pb-6 px-6 border-t border-border"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 80% 55% / 0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto">

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span
              aria-label="Dubai in Cairo"
              className="font-display font-semibold text-foreground text-xl inline-flex items-center gap-1.5"
            >
              <span className="text-gradient-gold">{get("nav_brand_1", "Dubai")}</span>
              <span>{get("nav_brand_2", "in")}</span>
              <span className="text-gradient-gold">{get("nav_brand_3", "Cairo")}</span>
            </span>
            <p className="mt-3 text-xs italic text-muted-foreground max-w-xs leading-relaxed whitespace-pre-line">
              {get("footer_tagline", "From Dubai to Cairo, we transferred the scope, the challenges, and the quality.")}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground mb-3">
              Explore
            </h3>
            <ul className="flex flex-col gap-2">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnerships */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground mb-3">
              Partnerships
            </h3>
            <ul className="flex flex-col gap-2">
              {partnerLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground mb-3">
              Contact
            </h3>
            <ul className="flex flex-col gap-2">
              {PHONES.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    aria-label={`Call ${p.display}`}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <Phone aria-hidden="true" className="w-3 h-3 text-primary/60" />
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom strip: copyright + legal */}
        <div className="pt-5 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="whitespace-pre-line text-center sm:text-left">
            {get("footer_copyright", "© 2025 Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC · All Rights Reserved")}
          </span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="text-border">·</span>
            <Link to="/partner/login" className="hover:text-primary transition-colors duration-200">
              Partner Sign In
            </Link>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
