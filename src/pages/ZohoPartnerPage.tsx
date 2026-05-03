import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContactModal } from "@/context/ContactModalContext";
import {
  ArrowLeft,
  Users,
  Megaphone,
  TrendingUp,
  Globe,
  Receipt,
  BarChart2,
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

const ZohoLogo = ({ logoUrl, name }: { logoUrl?: string; name?: string }) => {
  const displayName = name || "Zoho";
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
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-11 w-auto flex-shrink-0"
        aria-label={displayName}
      >
        <rect x="4" y="4" width="40" height="40" rx="8" fill="hsl(38 80% 55% / 0.15)" />
        <path
          d="M12 16h24L18 32h18"
          stroke="hsl(38 80% 55%)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display font-bold text-[2rem] leading-none tracking-tight text-primary select-none">
        {displayName}
      </span>
    </div>
  );
};

const zohoIcons = [Users, Megaphone, TrendingUp, Globe, Receipt, BarChart2];

const ZohoPartnerPage = () => {
  const { get } = useSiteContent();
  const { openContactModal } = useContactModal();

  useSEO({
    titleKey: "seo_zoho_title",
    descriptionKey: "seo_zoho_description",
    canonical: "/partnerships/zoho",
  });

  const zohoTags = Array.from({ length: 8 }, (_, i) =>
    get(`zoho_tag_${i + 1}`, [
      "Zoho CRM Implementation & Configuration",
      "Marketing Automation Setup & Deployment",
      "Lead Management & Pipeline Configuration",
      "Workflow Automation & Process Alignment",
      "Omnichannel Communication Setup (Email, SMS, WhatsApp)",
      "Reporting & Dashboard Configuration",
      "System Integration with Existing Tools & Operations",
      "Team Training & User Enablement",
    ][i])
  );

  const zohoSuites = Array.from({ length: 6 }, (_, i) => ({
    icon: zohoIcons[i],
    title: get(`zoho_suite_${i + 1}_title`, [
      "Zoho CRM Suite",
      "Zoho Marketing Automation Suite",
      "Zoho Sales & Pipeline Management Suite",
      "Zoho Customer Experience (CX) Suite",
      "Zoho Finance & Operations Suite",
      "Zoho Analytics & Business Intelligence Suite",
    ][i]),
    desc: get(`zoho_suite_${i + 1}_desc`, [
      "Implements a centralized system for managing customer data, interactions, and sales pipelines — ensuring clear visibility and structured management of leads and opportunities.",
      "Supports the setup and execution of automated marketing campaigns, including lead capture, segmentation, and nurturing across multiple channels.",
      "Configures structured sales processes with pipeline tracking, lead qualification, and performance monitoring to support consistent revenue generation.",
      "Integrates customer interactions across channels, enabling teams to manage communication, support, and engagement within a unified system.",
      "Connects financial workflows such as invoicing and transaction tracking with sales and customer data for improved operational visibility.",
      "Enables the setup of dashboards and reporting systems that provide insights into marketing, sales, and operational performance.",
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
              {get("zoho_page_badge", "Strategic Partnership")}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
              {get("zoho_page_headline", "Zoho Enablement Experts")}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              {get(
                "zoho_page_subtext",
                "We specialize in implementing Zoho applications and integrating them directly into your existing business and operational workflows."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Zoho Hero ───────────────────────────────────────────────────── */}
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

            {/* Left: copy */}
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                {get("zoho_hero_badge", "CRM Partnership")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                {get("zoho_hero_h1", "We are")}
                <br />
                <span className="text-gradient-gold">{get("zoho_hero_h1_accent", "Zoho Enablement")}</span>
                <br />
                {get("zoho_hero_h1_end", "Experts")}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 max-w-lg">
                {get(
                  "zoho_hero_body_1",
                  "With over five years of hands-on experience, we help organizations deploy Zoho systems in a way that connects marketing, sales, and operations — ensuring that tools are not only installed, but fully adopted and operationalized."
                )}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
                {get(
                  "zoho_hero_body_2",
                  "Our focus is on execution: configuring systems, aligning them with real business processes, and enabling teams to use them effectively to support day-to-day operations and growth activities."
                )}
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
                  <ZohoLogo
                    logoUrl={get("zoho_logo_url", "") || undefined}
                    name={get("zoho_partner_name", "Zoho")}
                  />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 self-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">
                      {get("zoho_badge_label", "Enablement Expert")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {zohoTags.map((tag) => (
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

      {/* ── Value statement ──────────────────────────────────────────────── */}
      <section className="relative px-6 py-8 md:py-10">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="rounded-2xl border border-border/40 bg-card/30 p-7 md:p-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {get(
                "zoho_value_body",
                "Zoho's value lies in how well it is implemented and integrated into actual workflows. We ensure that each application works within your business environment — from lead management and campaign execution to sales tracking and reporting — while providing the training needed for teams to operate independently and efficiently."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Zoho Suites Grid ─────────────────────────────────────────────── */}
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
              {get("zoho_suites_badge", "Zoho Ecosystem")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              {get("zoho_suites_h2", "Six Integrated Suites.")}
              <br />
              <span className="text-gradient-gold">
                {get("zoho_suites_h2_accent", "One Unified Growth Engine.")}
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
            {zohoSuites.map(({ icon: Icon, title, desc }, i) => (
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
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 50%, hsl(38 80% 55% / 0.06), transparent 70%), hsl(var(--card))",
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("zoho_cta_badge", "Start the Conversation")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              {get("zoho_cta_h2", "Ready to Operationalize Zoho for Your Business?")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed text-sm">
              {get(
                "zoho_cta_body",
                "Let's connect your Zoho environment to your actual business workflows. Our enablement team handles implementation, integration, and team training end to end."
              )}
            </p>
            <button
              onClick={openContactModal}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:brightness-110 transition-all glow-gold shimmer-btn text-sm"
            >
              {get("zoho_cta_btn", "Get in Touch")}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ZohoPartnerPage;
