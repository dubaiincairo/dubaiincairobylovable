import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useContactModal } from "@/context/ContactModalContext";
import { slideDown, useMotionPref } from "@/lib/animations";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const partnerTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const partnerRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const { shouldReduce } = useMotionPref();
  const { get } = useSiteContent();

  const partnerLinks = [
    { href: "/partnerships/odoo",    label: get("nav_partner_odoo",    "Odoo ERP") },
    { href: "/partnerships/yanolja", label: get("nav_partner_yanolja", "Yanolja Cloud") },
    { href: "/partnerships/zoho",    label: get("nav_partner_zoho",    "Zoho") },
  ];
  const { openContactModal } = useContactModal();
  const { pathname } = useLocation();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const blurVal = useTransform(scrollY, [0, 100], [8, 20]);
  const [scrolled, setScrolled] = useState(false);

  const backgroundColor = useMotionTemplate`hsl(220 20% 4% / ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurVal}px)`;

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 50));

  const handlePartnerEnter = () => {
    if (partnerTimeout.current) clearTimeout(partnerTimeout.current);
    setPartnerOpen(true);
  };

  const handlePartnerLeave = () => {
    partnerTimeout.current = setTimeout(() => setPartnerOpen(false), 150);
  };

  // Close mobile menu on Escape + restore focus to its trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuTriggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close partnerships dropdown on Escape + outside-click.
  useEffect(() => {
    if (!partnerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPartnerOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (partnerRef.current && !partnerRef.current.contains(e.target as Node)) {
        setPartnerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [partnerOpen]);

  const links = [
    { href: "/",        label: get("nav_link_home", "Home") },
    { href: "/studios", label: get("nav_link_studios", "Studios") },
    { href: "/careers", label: get("nav_link_careers", "Careers") },
    { href: "/tech",    label: get("nav_link_tech", "Tech Stack") },
    { href: "/faq",     label: get("nav_link_faq", "FAQ") },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 will-change-transform ${scrolled ? "border-border" : "border-transparent"}`}
      style={{ backgroundColor, backdropFilter, WebkitBackdropFilter: backdropFilter }}
      variants={slideDown}
      initial="hidden"
      animate="visible"
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary to-primary/60 origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          aria-label="Dubai in Cairo — home"
          className="font-display font-bold text-2xl md:text-[1.65rem] inline-flex items-center min-h-[44px] tracking-tight"
        >
          <span className="text-gradient-gold">{get("nav_brand_1", "Dubai")}</span>
          <span className="text-foreground">{get("nav_brand_2", "in")}</span>
          <span className="text-gradient-gold">{get("nav_brand_3", "Cairo")}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative inline-flex items-center min-h-[44px] transition-colors duration-300",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-px left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* Partnerships dropdown */}
          <div
            ref={partnerRef}
            className="relative"
            onMouseEnter={handlePartnerEnter}
            onMouseLeave={handlePartnerLeave}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={partnerOpen}
              onClick={() => setPartnerOpen((v) => !v)}
              onFocus={handlePartnerEnter}
              onBlur={handlePartnerLeave}
              className="inline-flex items-center min-h-[44px] gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {get("nav_link_partnerships", "Partnerships")}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${partnerOpen ? "rotate-180" : ""}`} />
            </button>

            {partnerOpen && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: shouldReduce ? 0 : -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduce ? 0 : 0.15 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-xl overflow-hidden"
                onMouseEnter={handlePartnerEnter}
                onMouseLeave={handlePartnerLeave}
              >
                {partnerLinks.map((pl) => (
                  <a
                    key={pl.href}
                    href={pl.href}
                    role="menuitem"
                    className="block px-4 py-3 min-h-[44px] text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                  >
                    {pl.label}
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          <button
            onClick={openContactModal}
            className="shimmer-btn inline-flex items-center min-h-[44px] px-5 py-2 bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wide rounded-lg transition-all hover:brightness-110"
          >
            {get("nav_cta", "Get Started")}
          </button>
        </nav>

        <button
          ref={menuTriggerRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden text-foreground w-11 h-11 flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          className="md:hidden glass px-6 py-6 flex flex-col gap-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]"
          initial={{ opacity: 0, y: shouldReduce ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.25 }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="inline-flex items-center min-h-[44px] text-muted-foreground hover:text-foreground transition-colors"
            >
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
                className="flex items-center pl-3 min-h-[44px] text-sm text-muted-foreground hover:text-foreground transition-colors border-l border-border/40"
              >
                {pl.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => { setOpen(false); openContactModal(); }}
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-primary text-primary-foreground font-display font-semibold text-xs tracking-wide rounded-lg text-center"
          >
            {get("nav_cta", "Get Started")}
          </button>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Navbar;
