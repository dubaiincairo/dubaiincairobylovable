import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Megaphone,
  TrendingUp,
  Package,
  Receipt,
  ShoppingBag,
  FolderKanban,
  Users,
  Factory,
  // Yanolja / eZee icons
  Building2,
  BarChart2,
  CreditCard,
  Wifi,
  BookOpen,
  LayoutDashboard,
  DollarSign,
  Monitor,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  fadeUp,
  staggerContainer,
  cardFadeUp,
  viewportOnce,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";

/* ─────────────────────────────────────────────────────────────
   Official Odoo logo — 7 overlapping circles (hexagonal flower)
   Monochrome gold: opacity stacking creates petal intersections
   ───────────────────────────────────────────────────────────── */
const OdooLogo = () => (
  <div className="flex items-center gap-4">
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-11 w-auto flex-shrink-0"
      aria-label="Odoo logo"
    >
      {/* Center */}
      <circle cx="20" cy="20" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
      {/* Right */}
      <circle cx="30" cy="20" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
      {/* Upper-right */}
      <circle cx="25" cy="11.1" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
      {/* Upper-left */}
      <circle cx="15" cy="11.1" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
      {/* Left */}
      <circle cx="10" cy="20" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
      {/* Lower-left */}
      <circle cx="15" cy="28.9" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
      {/* Lower-right */}
      <circle cx="25" cy="28.9" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
    </svg>
    <span className="font-display font-bold text-[2rem] leading-none tracking-tight text-primary select-none">
      Odoo
    </span>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Yanolja Cloud logo — geometric Y mark + wordmark
   ───────────────────────────────────────────────────────────── */
const YanoljaLogo = () => (
  <div className="flex items-center gap-4">
    <svg
      viewBox="0 0 40 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-11 w-auto flex-shrink-0"
      aria-label="Yanolja Cloud logo"
    >
      {/* Stylised Y — two angled arms + vertical stem, bold rounded strokes */}
      <line x1="4"  y1="4"  x2="20" y2="24" stroke="hsl(38 80% 55%)" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="36" y1="4"  x2="20" y2="24" stroke="hsl(38 80% 55%)" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="20" y1="24" x2="20" y2="42" stroke="hsl(38 80% 55%)" strokeWidth="5.5" strokeLinecap="round" />
      {/* Three dots suggesting cloud/digital connectivity */}
      <circle cx="4"  cy="4"  r="3" fill="hsl(38 80% 55%)" opacity="0.45" />
      <circle cx="36" cy="4"  r="3" fill="hsl(38 80% 55%)" opacity="0.45" />
      <circle cx="20" cy="42" r="3" fill="hsl(38 80% 55%)" opacity="0.45" />
    </svg>
    <div className="flex flex-col gap-0.5">
      <span className="font-display font-bold text-[1.65rem] leading-none tracking-tight text-primary select-none">
        Yanolja Cloud
      </span>
      <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/55 select-none">
        eZee Suite
      </span>
    </div>
  </div>
);

/* ─── Odoo suite icons ─── */
const odooIcons = [Globe, Megaphone, TrendingUp, Package, Receipt, ShoppingBag, FolderKanban, Users, Factory];
/* ─── Yanolja suite icons ─── */
const yanIcons = [Building2, Wifi, BookOpen, LayoutDashboard, Monitor, Globe, BarChart2, CreditCard];

/* ─────────────────────────────────────────────────────────────
   Page component
   ───────────────────────────────────────────────────────────── */
const OdooPartner = () => {
  const { get } = useSiteContent();

  const odooTags  = Array.from({ length: 8 }, (_, i) => get(`odoo_tag_${i + 1}`, [
    "ERP Architecture & Solution Design",
    "Training & Enablement Programs",
    "Business Analysis & Process Re-engineering",
    "Data Migration & Structuring",
    "Go-Live Support & Change Management",
    "Performance Optimization & Audits",
    "Reporting & BI Dashboards",
    "Productization & Module Development",
  ][i]));

  const odooSuites = Array.from({ length: 9 }, (_, i) => ({
    icon: odooIcons[i],
    title: get(`odoo_suite_${i + 1}_title`, [
      "Odoo eCommerce & Website Suite",
      "Odoo Marketing Automation Suite",
      "Odoo Sales & CRM Suite",
      "Odoo Inventory & Supply Chain Suite",
      "Odoo Accounting Suite",
      "Odoo POS & Retail Suite",
      "Odoo Project & Services Suite",
      "Odoo HR & Workforce Suite",
      "Odoo Manufacturing Suite",
    ][i]),
    desc: get(`odoo_suite_${i + 1}_desc`, [
      "Provides a fully integrated platform to build, manage, and scale online stores and websites, seamlessly connected with backend operations such as inventory, sales, and customer data — making it the core foundation for any digital commerce strategy.",
      "Empowers businesses to design, automate, and analyze multi-channel campaigns — including email, SMS, and social marketing — turning traffic into conversions through data-driven engagement and lifecycle automation.",
      "Manages the full customer journey from lead acquisition to deal closure, enabling precise pipeline tracking, customer segmentation, and revenue forecasting — critical for aligning marketing efforts with actual sales outcomes.",
      "Ensures real-time stock visibility and efficient order fulfillment, directly impacting customer experience, delivery performance, and the scalability of eCommerce operations.",
      "Provides real-time financial tracking, invoicing, and reconciliation, enabling accurate measurement of marketing ROI, profitability, and overall business performance.",
      "Connects offline and online sales channels, creating an omnichannel experience where customer data, inventory, and transactions are fully synchronized.",
      "Supports execution and delivery of digital services, campaigns, and internal workflows, ensuring structured project management and operational efficiency.",
      "Manages recruitment, performance, and team operations, supporting the human infrastructure behind marketing, sales, and eCommerce execution.",
      "Enables production planning and control, becoming relevant in eCommerce businesses that rely on in-house manufacturing or custom product workflows.",
    ][i]),
  }));

  const yanTags = Array.from({ length: 4 }, (_, i) => get(`yan_tag_${i + 1}`, [
    "12 Months Hands-On Experience",
    "Saudi Arabia Market",
    "Cloud-Based Implementation",
    "Hospitality Tech Integration",
  ][i]));

  const yanSuites = Array.from({ length: 8 }, (_, i) => ({
    icon: yanIcons[i],
    title: get(`yan_suite_${i + 1}_title`, [
      "eZee Absolute (Cloud PMS)",
      "eZee Centrix (Channel Manager)",
      "eZee Reservation (Booking Engine)",
      "Central Reservation System (CRS)",
      "eZee Optimus (Restaurant POS)",
      "Hotel Website Builder",
      "Revenue Management System (RMS)",
      "Payment Solutions",
    ][i]),
    desc: get(`yan_suite_${i + 1}_desc`, [
      "A comprehensive cloud-based Property Management System that centralizes all hotel operations — from reservations and front office to housekeeping, billing, and reporting — enabling properties to operate efficiently through a single, fully integrated digital platform.",
      "A real-time channel management solution that connects hospitality properties to global OTAs, synchronizing rates and inventory across all platforms to eliminate overbookings, maintain rate parity, and maximize online visibility.",
      "A direct booking engine that empowers hotels to capture commission-free reservations through their own website, offering a seamless user experience fully synchronized with live availability and pricing.",
      "Acts as a unified control layer for managing bookings, rates, and inventory across multiple properties and channels, ensuring consistency, scalability, and centralized operational control.",
      "A cloud-based POS solution designed for hospitality F&B operations, streamlining order management, billing, and reporting while seamlessly integrating with the PMS for a unified guest experience.",
      "A purpose-built platform for creating high-performance hospitality websites, combining modern design, SEO optimization, and direct booking capabilities to strengthen digital presence and increase direct revenue.",
      "Leverages data-driven insights and demand forecasting to dynamically optimize pricing strategies, helping properties maximize occupancy, revenue, and overall profitability.",
      "Integrated payment solutions enable secure, seamless transactions across all touchpoints — from online bookings to on-site billing — ensuring efficient financial operations and a frictionless guest payment experience.",
    ][i]),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Page intro ──────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-6 md:pt-32 md:pb-8 px-6">
        <div className="relative max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("partnerships_badge", "Strategic Partnerships")}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
              {get("partnerships_headline", "Our Technology Partners")}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              {get("partnerships_subtext", "We have built deep implementation expertise across two technology ecosystems — Odoo for ERP and business automation, and Yanolja Cloud for hospitality management.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ODOO SECTION
      ══════════════════════════════════════════════════════════════════ */}

      {/* ── Odoo Hero ───────────────────────────────────────────────────── */}
      <section className="relative py-10 md:py-16 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 65%)" }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.016]"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg, hsl(38 80% 55%), hsl(38 80% 55%) 1px, transparent 1px, transparent 40px)" }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left: copy */}
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                {get("odoo_hero_badge", "ERP Partnership")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                {get("odoo_hero_h1", "We are a")}
                <br />
                <span className="text-gradient-gold">{get("odoo_hero_h1_accent", "Verified Odoo")}</span>
                <br />
                {get("odoo_hero_h1_end", "Partner")}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 max-w-lg">
                {get("odoo_hero_body_1", "We are now a verified Odoo partner, enabling our clients to operate within a fully integrated, closed-loop ecosystem that connects eCommerce, digital marketing, and backend operations. We believe that impactful marketing cannot exist in isolation — real, scalable results require a robust ERP system that digitally manages and synchronizes all operational processes.")}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
                {get("odoo_hero_body_2", "That's why we've established a dedicated Odoo studio, specializing in implementation, customization, and API development, ensuring seamless integration between your business operations and your marketing engine.")}
              </p>
            </motion.div>

            {/* Right: logo card */}
            <motion.div
              className="flex justify-center md:justify-end"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 rounded-2xl bg-primary/6 blur-3xl scale-110 pointer-events-none" />
                <div className="relative rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-7 flex flex-col gap-5">
                  <OdooLogo />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 self-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">
                      {get("odoo_badge_label", "Verified Partner")}
                    </span>
                  </div>
                  {/* Service tags */}
                  <div className="flex flex-wrap gap-2">
                    {odooTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Odoo Suites Grid ─────────────────────────────────────────────── */}
      <section className="relative px-6 pb-10 md:pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-primary/4 blur-[120px] translate-x-1/3 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              {get("odoo_suites_badge", "Odoo Studio")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              {get("odoo_suites_h2", "Nine Integrated Suites.")}
              <br />
              <span className="text-gradient-gold">
                {get("odoo_suites_h2_accent", "One Unified Platform.")}
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {odooSuites.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                className="group glass-card gradient-border rounded-xl p-6 hover-lift flex flex-col gap-4"
                variants={cardFadeUp}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold font-display text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm md:text-base mb-2 leading-snug">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Odoo CTA ─────────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-10 md:pb-16">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="rounded-2xl border border-border/60 p-8 md:p-12 text-center"
            style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%, hsl(38 80% 55% / 0.06), transparent 70%), hsl(var(--card))" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("odoo_cta_badge", "Start the Conversation")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              {get("odoo_cta_h2", "Ready to Build Your Integrated Ecosystem?")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed text-sm">
              {get("odoo_cta_body", "Let's connect your marketing engine to a fully synchronized ERP backend. Our Odoo studio handles everything from initial scoping to go-live.")}
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:brightness-110 transition-all glow-gold shimmer-btn text-sm"
            >
              {get("odoo_cta_btn", "Get in Touch")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section divider ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          YANOLJA CLOUD SECTION
      ══════════════════════════════════════════════════════════════════ */}

      {/* ── Yanolja Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-10 md:py-16 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 65%)" }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left: copy */}
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                {get("yan_hero_badge", "Hospitality Technology")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                {get("yan_hero_h2", "Yanolja Cloud")}
                <br />
                <span className="text-gradient-gold">{get("yan_hero_h2_accent", "Partnership")}</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
                {get("yan_hero_body", "We have also expanded our capabilities into the hospitality technology sector through our work with Yanolja Cloud and its suite of cloud-based management solutions. Over the past 12 months, we have built extensive hands-on experience implementing and integrating these systems across hospitality properties in Saudi Arabia, enabling fully digital, streamlined operations aligned with modern guest experiences. This practical exposure has positioned us as specialized implementors in hospitality tech, and we are now actively scaling these capabilities into new markets beyond Saudi Arabia.")}
              </p>
            </motion.div>

            {/* Right: logo card */}
            <motion.div
              className="flex justify-center md:justify-end"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 rounded-2xl bg-primary/6 blur-3xl scale-110 pointer-events-none" />
                <div className="relative rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-7 flex flex-col gap-5">
                  <YanoljaLogo />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 self-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">
                      {get("yan_badge_label", "Specialized Implementor")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {yanTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Yanolja Products Grid ─────────────────────────────────────────── */}
      <section className="relative px-6 pb-10 md:pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full bg-primary/4 blur-[120px] -translate-x-1/3 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              {get("yan_suites_badge", "eZee Suite")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              {get("yan_suites_h2", "Eight Integrated Solutions.")}
              <br />
              <span className="text-gradient-gold">
                {get("yan_suites_h2_accent", "One Hospitality Platform.")}
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {yanSuites.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                className="group glass-card gradient-border rounded-xl p-6 hover-lift flex flex-col gap-4"
                variants={cardFadeUp}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold font-display text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm md:text-base mb-2 leading-snug">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Yanolja CTA ──────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-20">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="rounded-2xl border border-border/60 p-8 md:p-12 text-center"
            style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%, hsl(38 80% 55% / 0.06), transparent 70%), hsl(var(--card))" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("yan_cta_badge", "Scale Your Hospitality Tech")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              {get("yan_cta_h2", "Ready to Digitize Your Hospitality Operations?")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed text-sm">
              {get("yan_cta_body", "Our hospitality tech team brings 12 months of hands-on implementation experience across Saudi Arabia. Let's bring that expertise to your property.")}
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:brightness-110 transition-all glow-gold shimmer-btn text-sm"
            >
              {get("yan_cta_btn", "Get in Touch")}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OdooPartner;
