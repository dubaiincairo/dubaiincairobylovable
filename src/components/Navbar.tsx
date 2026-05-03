import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useContactModal } from "@/context/ContactModalContext";
import { slideDown } from "@/lib/animations";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const partnerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { get } = useSiteContent();

  const partnerLinks = [
    { href: "/partnerships/odoo",    label: get("nav_partner_odoo",    "Odoo ERP") },
    { href: "/partnerships/yanolja", label: get("nav_partner_yanolja", "Yanolja Cloud") },
    { href: "/partnerships/zoho",    label: get("nav_partner_zoho",    "Zoho") },
  ];
  const { openContactModal } = useContactModal();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const blurVal = useTransform(scrollY, [0, 100], [8, 20]);
  const [scrolled, setScrolled] = useState(false);

  const backgroundColor = useMotionTemplate`hsl(220 20% 4% / ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurVal}px)`;

  scrollY.on("change", (v) => setScrolled(v > 50));

  const handlePartnerEnter = () => {
    if (partnerTimeout.current) clearTimeout(partnerTimeout.current);
    setPartnerOpen(true);
  };

  const handlePartnerLeave = () => {
    partnerTimeout.current = setTimeout(() => setPartnerOpen(false), 150);
  };

  const links = [
    { href: "/",        label: get("nav_link_home", "Home") },
    { href: "/studios", label: get("nav_link_studios", "Studios") },
    { href: "/careers", label: get("nav_link_careers", "Careers") },
    { href: "/tech",    label: get("nav_link_tech", "Tech Stack") },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 will-change-transform ${scrolled ? "border-border" : "border-transparent"}`}
      style={{ backgroundColor, backdropFilter, WebkitBackdropFilter: backdropFilter }}
      variants={slideDown}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-display font-bold text-xl">
          <span className="text-gradient-gold">{get("nav_brand_1", "Dubai")}</span>
          <span className="text-foreground">{get("nav_brand_2", "in")}</span>
          <span className="text-gradient-gold">{get("nav_brand_3", "Cairo")}</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              {l.label}
            </a>
          ))}

          {/* Partnerships dropdown */}
          <div
            className="relative"
            onMouseEnter={handlePartnerEnter}
            onMouseLeave={handlePartnerLeave}
          >
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300">
              {get("nav_link_partnerships", "Partnerships")}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${partnerOpen ? "rotate-180" : ""}`} />
            </button>

            {partnerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-xl overflow-hidden"
                onMouseEnter={handlePartnerEnter}
                onMouseLeave={handlePartnerLeave}
              >
                {partnerLinks.map((pl) => (
                  <a
                    key={pl.href}
                    href={pl.href}
                    className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                  >
                    {pl.label}
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          <button
            onClick={openContactModal}
            className="shimmer-btn px-5 py-2 bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wide rounded-lg transition-all hover:brightness-110"
          >
            {get("nav_cta", "Get Started")}
          </button>
        </div>

        <button className="md:hidden text-foreground w-10 h-10 flex items-center justify-center" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          className="md:hidden glass px-6 py-6 flex flex-col gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}

          {/* Mobile partnerships — flat list under a label */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-2">
              {get("nav_link_partnerships", "Partnerships")}
            </p>
            {partnerLinks.map((pl) => (
              <a
                key={pl.href}
                href={pl.href}
                onClick={() => setOpen(false)}
                className="block pl-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors border-l border-border/40"
              >
                {pl.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => { setOpen(false); openContactModal(); }}
            className="px-5 py-2.5 bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wide rounded-lg text-center"
          >
            {get("nav_cta", "Get Started")}
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
