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

  return (
    <motion.footer
      className="relative py-10 md:py-12 px-6 border-t border-border"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(38 80% 55% / 0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-sm text-muted-foreground text-center">
        <span
          aria-label="Dubai in Cairo"
          className="font-display font-semibold text-foreground text-lg inline-flex items-center gap-1.5"
        >
          <span className="text-gradient-gold">{get("nav_brand_1", "Dubai")}</span>
          <span>{get("nav_brand_2", "in")}</span>
          <span className="text-gradient-gold">{get("nav_brand_3", "Cairo")}</span>
        </span>

        <p className="text-xs italic max-w-md whitespace-pre-line">{get("footer_tagline", "From Dubai to Cairo, we transferred the scope, the challenges, and the quality.")}</p>

        {/* Phone numbers */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          {PHONES.map((p) => (
            <a
              key={p.href}
              href={p.href}
              aria-label={`Call ${p.display}`}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Phone aria-hidden="true" className="w-3 h-3 text-primary/60" />
              {p.display}
            </a>
          ))}
        </div>

        {/* Legal links */}
        <div className="flex items-center gap-4 text-xs">
          <Link to="/privacy" className="hover:text-primary transition-colors duration-200">
            Privacy Policy
          </Link>
          <span className="text-border">·</span>
          <Link to="/faq" className="hover:text-primary transition-colors duration-200">
            FAQ
          </Link>
        </div>

        <span className="text-xs whitespace-pre-line">{get("footer_copyright", "© 2025 Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC · All Rights Reserved")}</span>
      </div>
    </motion.footer>
  );
};

export default Footer;
