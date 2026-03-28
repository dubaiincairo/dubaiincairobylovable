import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { get } = useSiteContent();

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-sm text-muted-foreground text-center">
        <span className="font-display font-semibold text-foreground text-lg">
          <span className="text-gradient-gold">Dubai</span>in<span className="text-gradient-gold">Cairo</span>
        </span>
        <p className="text-xs italic max-w-md">{get("footer_tagline", "From Dubai to Cairo, we transferred the scope, the challenges, and the quality.")}</p>
        <span className="text-xs">© {new Date().getFullYear()} Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC · All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
