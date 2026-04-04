import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { get } = useSiteContent();

  const links = [
    { href: "#about", label: get("nav_link_1", "About") },
    { href: "#services", label: get("nav_link_2", "Services") },
    { href: "#work", label: get("nav_link_3", "Our Work") },
    { href: "#team", label: get("nav_link_4", "Team") },
    { href: "#contact", label: get("nav_link_5", "Contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl">
          <span className="text-gradient-gold">{get("nav_brand_1", "Dubai")}</span>
          <span className="text-foreground">{get("nav_brand_2", "in")}</span>
          <span className="text-gradient-gold">{get("nav_brand_3", "Cairo")}</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2 bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wide rounded-lg transition-all hover:brightness-110">
            {get("nav_cta", "Get Started")}
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="px-5 py-2.5 bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wide rounded-lg text-center">
            {get("nav_cta", "Get Started")}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
