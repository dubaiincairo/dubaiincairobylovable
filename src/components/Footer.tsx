import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeIn, viewportOnce } from "@/lib/animations";

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
        <span className="font-display font-semibold text-foreground text-lg">
          <span className="text-gradient-gold">{get("nav_brand_1", "Dubai")}</span>
          {get("nav_brand_2", "in")}
          <span className="text-gradient-gold">{get("nav_brand_3", "Cairo")}</span>
        </span>
        <p className="text-xs italic max-w-md whitespace-pre-line">{get("footer_tagline", "From Dubai to Cairo, we transferred the scope, the challenges, and the quality.")}</p>
        <nav className="flex items-center gap-5 flex-wrap justify-center">
          <Link to="/investor-brief" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Investor Brief
          </Link>
        </nav>
        <span className="text-xs whitespace-pre-line">{get("footer_copyright", "© 2025 Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC · All Rights Reserved")}</span>
      </div>
    </motion.footer>
  );
};

export default Footer;
