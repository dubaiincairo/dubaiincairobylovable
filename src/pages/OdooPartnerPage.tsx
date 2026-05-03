import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContactModal } from "@/context/ContactModalContext";
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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSEO } from "@/hooks/useSEO";
import {
  fadeUp,
  staggerContainer,
  cardFadeUp,
  viewportOnce,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";

const OdooLogo = ({ logoUrl, name }: { logoUrl?: string; name?: string }) => {
  const displayName = name || "Odoo";
  if (logoUrl) {
    return (
      <div className="flex items-center justify-start">
        <img
          src={logoUrl}
          alt={displayName}
          className="h-12 w-auto object-contain"
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
            const fallback = document.createElement("span");
            fallback.style.cssText =
              "font-size:2rem;font-weight:700;color:hsl(38 80% 55%);line-height:1;letter-spacing:-0.02em";
            fallback.textContent = displayName;
            el.parentElement?.appendChild(fallback);
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-11 w-auto flex-shrink-0"
        aria-label={displayName}
      >
        <circle cx="20" cy="20" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
        <circle cx="30" cy="20" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
        <circle cx="25" cy="11.1" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
        <circle cx="15" cy="11.1" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
        <circle cx="10" cy="20" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
        <circle cx="15" cy="28.9" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
        <circle cx="25" cy="28.9" r="8" fill="hsl(38 80% 55%)" opacity="0.55" />
      </svg>
      <span className="font-display font-bold text-[2rem] leading-none tracking-tight text-primary select-none">
        {displayName}
      </span>
    </div>
  );
};

const odooIcons = [Globe, Megaphone, TrendingUp, Package, Receipt, ShoppingBag, FolderKanban, Users, Factory];

const OdooPartnerPage = () => {
  const { get } = useSiteContent();
  const { openContactModal } = useContactModal();

  useSEO({ titleKey: "seo_odoo_title", descriptionKey: "seo_odoo_description", canonical: "/partnerships/odoo" });

  const odooTags = Array.from({ length: 8 }, (_, i) =>
    get(`odoo_tag_${i + 1}`, [
      "ERP Architecture & Solution Design",
      "Training & Enablement Programs",
      "Business Analysis & Process Re-engineering",
      "Data Migration & Structuring",
      "Go-Live Support & Change Management",
      "Performance Optimization & Audits",
      "Reporting & BI Dashboards",
      "Productization & Module Development",
    ][i])
  );

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Page intro ──────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 px-6">
        <div className="relative max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Link
              to="/partnerships"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Partnerships
            </Link>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("odoo_page_badge", "ERP Partnership")}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
              {get("odoo_page_headline", "Verified Odoo Partner")}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              {get(
                "odoo_page_subtext",
                "We are a verified Odoo partner, enabling our clients to operate within a fully integrated ecosystem that connects eCommerce, digital marketing, and backend operations."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Odoo Hero ───────────────────────────────────────────────────── */}
      <section className="relative py-8 md:py-12 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 65%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.016]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, hsl(38 80% 55%), hsl(38 80% 55%) 1px, transparent 1px, transparent 40px)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

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
                  <OdooLogo
                    logoUrl={get("odoo_logo_url", "") || undefined}
                    name={get("odoo_partner_name", "Odoo")}
                  />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 self-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">
                      {get("odoo_badge_label", "Verified Partner")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {odooTags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-secondary text-secondary-foreground">
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
      <section className="relative px-6 pb-8 md:pb-12 overflow-hidden">
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

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-14">
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
            <button
              onClick={openContactModal}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:brightness-110 transition-all glow-gold shimmer-btn text-sm"
            >
              {get("odoo_cta_btn", "Get in Touch")}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OdooPartnerPage;
