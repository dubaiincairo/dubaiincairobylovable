import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useContactModal } from "@/context/ContactModalContext";
import { slideDown } from "@/lib/animations";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { get } = useSiteContent();
  const { openContactModal } = useContactModal();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const blurVal = useTransform(scrollY, [0, 100], [8, 20]);
  const [scrolled, setScrolled] = useState(false);

  const backgroundColor = useMotionTemplate`hsl(220 20% 4% / ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurVal}px)`;

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 50));
  }, [scrollY]);

  const links = [
    { href: "#about",        label: get("nav_link_1", "About") },
    { href: "#work",         label: get("nav_link_2", "Our Work") },
    { href: "#team",         label: get("nav_link_3", "Team") },
    { href: "#services",     label: get("nav_link_4", "Services") },
    { href: "#contact",      label: get("nav_link_5", "Contact") },
    { href: "/careers",      label: "Careers" },
    { href: "/partnerships", label: "Partnerships" },
    { href: "/tech",         label: "Tech Stack" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 will-change-transform ${scrolled ? 'border-border' : 'border-transparent'}`}
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
          <button
            onClick={openContactModal}
            className="shimmer-btn px-5 py-2 bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wide rounded-lg transition-all hover:brightness-110"
          >
            {get("nav_cta", "Get Started")}
          </button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

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
