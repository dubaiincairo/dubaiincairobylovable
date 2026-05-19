import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useContactModal } from "@/context/ContactModalContext";
import { useLocale } from "@/contexts/LocaleContext";
import { slideDown, useMotionPref } from "@/lib/animations";

// ── EN/AR pill ─────────────────────────────────────────────────────────────
// Small two-state toggle next to the CTA. Always shows both labels so users
// recognize the option at a glance; the active language is highlighted.
const LocaleToggle = ({ className = "" }: { className?: string }) => {
  const { locale, otherLocaleHref } = useLocale();
  const otherLabel = locale === "ar" ? "EN" : "AR";
  const ariaLabel = locale === "ar" ? "Switch to English" : "التحويل إلى العربية";
  return (
    <Link
      to={otherLocaleHref}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center min-h-[36px] px-3 py-1.5 rounded-full border border-border text-xs font-display font-semibold tracking-wide text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-300",
        className,
      )}
    >
      <span className={cn("px-1", locale === "en" && "text-primary")}>EN</span>
      <span aria-hidden="true" className="text-border/80">/</span>
      <span className={cn("px-1", locale === "ar" && "text-primary")}>AR</span>
      <span className="sr-only">{otherLabel}</span>
    </Link>
  );
};

type TopItem =
  | { kind: "link"; id: string; href: string; label: string }
  | { kind: "dropdown"; id: string; label: string; items: { href: string; label: string }[] };

const parseOrder = (raw: string, fallback: string[]) => {
  const ids = raw.split(",").map((s) => s.trim()).filter(Boolean);
  // start with the user-defined order, then append any default ids missing from it
  const out: string[] = [];
  ids.forEach((id) => { if (fallback.includes(id) && !out.includes(id)) out.push(id); });
  fallback.forEach((id) => { if (!out.includes(id)) out.push(id); });
  return out;
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeouts = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const { shouldReduce } = useMotionPref();
  const { get } = useSiteContent();
  const { openContactModal } = useContactModal();
  const { pathname } = useLocation();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // ── Scroll-driven chrome: bg, blur, and shrink height (60px → 48px) ──
  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const blurVal = useTransform(scrollY, [0, 100], [8, 20]);
  const navHeight = useTransform(scrollY, [0, 100], shouldReduce ? [60, 60] : [60, 48]);
  const [scrolled, setScrolled] = useState(false);

  const backgroundColor = useMotionTemplate`hsl(220 20% 4% / ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurVal}px)`;

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 50));

  // ── Dropdown link sets (sub-items inside each dropdown are unordered for now) ──
  const serviceLinks = [
    { href: "/studios", label: get("nav_link_studios", "Studios") },
    { href: "/tech",    label: get("nav_link_tech",    "Technology") },
    { href: "/faq",     label: get("nav_link_faq",     "FAQ") },
  ];
  const companyLinks = [
    { href: "/careers",   label: get("nav_link_careers",   "Careers") },
    { href: "/investors", label: get("nav_link_investors", "Investors") },
  ];
  const partnerLinks = [
    { href: "/partnerships/odoo",    label: get("nav_partner_odoo",    "Odoo ERP") },
    { href: "/partnerships/yanolja", label: get("nav_partner_yanolja", "Yanolja Cloud") },
    { href: "/partnerships/zoho",    label: get("nav_partner_zoho",    "Zoho") },
  ];

  // ── Top-level items keyed by id so they can be reordered from the CMS ──
  const topById: Record<string, TopItem> = {
    home:         { kind: "link",     id: "home",         href: "/",        label: get("nav_link_home", "Home") },
    services:     { kind: "dropdown", id: "services",     label: get("nav_link_services", "Services"),     items: serviceLinks },
    company:      { kind: "dropdown", id: "company",      label: get("nav_link_company",  "Company"),      items: companyLinks },
    partnerships: { kind: "dropdown", id: "partnerships", label: get("nav_link_partnerships", "Partnerships"), items: partnerLinks },
  };
  const topOrder = parseOrder(
    get("nav_top_order", "home,services,company,partnerships"),
    ["home", "services", "company", "partnerships"],
  );
  const topItems: TopItem[] = topOrder.map((id) => topById[id]).filter(Boolean);

  // ── Dropdown helpers ──
  const handleDropdownEnter = (id: string) => {
    const t = dropdownTimeouts.current[id];
    if (t) { clearTimeout(t); dropdownTimeouts.current[id] = null; }
    setOpenDropdown(id);
  };
  const handleDropdownLeave = (id: string) => {
    dropdownTimeouts.current[id] = setTimeout(
      () => setOpenDropdown((cur) => (cur === id ? null : cur)),
      150,
    );
  };

  // Close mobile menu on Escape + restore focus to its trigger
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

  // Close any open dropdown on Escape + outside-click
  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenDropdown(null); };
    const onPointerDown = (e: PointerEvent) => {
      const el = dropdownRefs.current[openDropdown];
      if (el && !el.contains(e.target as Node)) setOpenDropdown(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openDropdown]);

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

      <motion.div
        className="max-w-6xl mx-auto px-6 flex items-center justify-between"
        style={{ height: navHeight }}
      >
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
          {topItems.map((item) => {
            if (item.kind === "link") {
              const active = isActive(item.href);
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center min-h-[44px] transition-colors duration-300",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-px left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            }

            // Dropdown
            const isOpen = openDropdown === item.id;
            return (
              <div
                key={item.id}
                ref={(el) => { dropdownRefs.current[item.id] = el; }}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.id)}
                onMouseLeave={() => handleDropdownLeave(item.id)}
              >
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() => setOpenDropdown((cur) => (cur === item.id ? null : item.id))}
                  onFocus={() => handleDropdownEnter(item.id)}
                  onBlur={() => handleDropdownLeave(item.id)}
                  className="inline-flex items-center min-h-[44px] gap-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: shouldReduce ? 0 : -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduce ? 0 : 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-xl overflow-hidden"
                    onMouseEnter={() => handleDropdownEnter(item.id)}
                    onMouseLeave={() => handleDropdownLeave(item.id)}
                  >
                    {item.items.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        role="menuitem"
                        className="block px-4 py-3 min-h-[44px] text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}

          <LocaleToggle />

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
      </motion.div>

      {/* Mobile menu — top-level links + grouped sub-lists for each dropdown */}
      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          className="md:hidden glass px-6 py-6 flex flex-col gap-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]"
          initial={{ opacity: 0, y: shouldReduce ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.25 }}
        >
          {topItems.map((item) =>
            item.kind === "link" ? (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center min-h-[44px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <div key={item.id}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-2">
                  {item.label}
                </p>
                {item.items.map((sub) => (
                  <a
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center pl-3 min-h-[44px] text-sm text-muted-foreground hover:text-foreground transition-colors border-l border-border/40"
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            ),
          )}

          <LocaleToggle className="self-start" />

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
