import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeIn, viewportOnce } from "@/lib/animations";

const Footer = () => {
  const { get } = useSiteContent();

  return (
    <motion.footer
      className="py-8 md:py-12 px-6 border-t border-border"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-sm text-muted-foreground text-center">
        <span className="font-display font-semibold text-foreground text-lg">
          <span className="text-gradient-gold">{get("nav_brand_1", "Dubai")}</span>
          {get("nav_brand_2", "in")}
          <span className="text-gradient-gold">{get("nav_brand_3", "Cairo")}</span>
        </span>
        <p className="text-xs italic max-w-md whitespace-pre-line">{get("footer_tagline", "From Dubai to Cairo, we transferred the scope, the challenges, and the quality.")}</p>
        <span className="text-xs whitespace-pre-line">{get("footer_copyright", "© 2025 Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC · All Rights Reserved")}</span>
      </div>
    </motion.footer>
  );
};

export default Footer;
