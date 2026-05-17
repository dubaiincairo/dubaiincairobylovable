import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeIn, viewportOnce } from "@/lib/animations";

const tel = (display: string) => `tel:${display.replace(/[^\d+]/g, "")}`;

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

  const phones = [
    get("footer_phone_1", "+20 120 200 0068"),
    get("footer_phone_2", "+966 059 597 9064"),
  ];

  return (
    <motion.footer
      className="relative pt-8 md:pt-10 pb-5 px-6 border-t border-border"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 80% 55% / 0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto">

        {/* 3-column grid (brand spans 2 of 4 cols → 50% width with phones underneath) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-7">

          {/* Brand + tagline + phones */}
          <div className="col-span-2 md:col-span-2">
            <span
              aria-label="Dubai in Cairo"
              className="font-display font-semibold text-foreground text-xl inline-flex items-center gap-1.5"
            >
              <span className="text-gradient-gold">{get("nav_brand_1", "Dubai")}</span>
              <span>{get("nav_brand_2", "in")}</span>
              <span className="text-gradient-gold">{get("nav_brand_3", "Cairo")}</span>
            </span>
            <p className="mt-2 text-xs italic text-muted-foreground max-w-md leading-relaxed whitespace-pre-line">
              {get("footer_tagline", "From Dubai to Cairo, we transferred the scope, the challenges, and the quality.")}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {phones.map((p) => (
                <a
                  key={p}
                  href={tel(p)}
                  aria-label={`Call ${p}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <Phone aria-hidden="true" className="w-3 h-3 text-primary/60" />
                  {p}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground mb-2.5">
              {get("footer_explore_label", "Explore")}
            </h3>
            <ul className="flex flex-col gap-1.5">
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
            <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground mb-2.5">
              {get("footer_partnerships_label", "Partnerships")}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {partnerLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom strip: copyright + legal */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
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
