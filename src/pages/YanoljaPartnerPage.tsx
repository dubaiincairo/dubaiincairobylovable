import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContactModal } from "@/context/ContactModalContext";
import {
  ArrowLeft,
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
import { useSEO } from "@/hooks/useSEO";
import {
  fadeUp,
  staggerContainer,
  cardFadeUp,
  viewportOnce,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";

const YANOLJA_LOGO_URL =
  "https://yanoljacloud.com/static/media/logo_ycs_white.c5f61f77.svg";

const YanoljaLogo = ({ logoUrl, name }: { logoUrl?: string; name?: string }) => {
  const displayName = name || "Yanolja Cloud Solution";
  return (
    <div className="flex items-center justify-start">
      <img
        src={logoUrl || YANOLJA_LOGO_URL}
        alt={displayName}
        className="h-14 w-auto object-contain"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const [line1, ...rest] = displayName.split(" ");
          const line2 = rest.join(" ") || "";
          const fallback = document.createElement("div");
          fallback.style.cssText = "display:flex;flex-direction:column;gap:2px";
          const s1 = document.createElement("span");
          s1.style.cssText =
            "font-size:1.65rem;font-weight:700;color:hsl(38 80% 55%);line-height:1;letter-spacing:-0.02em";
          s1.textContent = line1;
          fallback.appendChild(s1);
          if (line2) {
            const s2 = document.createElement("span");
            s2.style.cssText =
              "font-size:0.7rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:hsl(38 80% 55% / 0.6)";
            s2.textContent = line2;
            fallback.appendChild(s2);
          }
          el.parentElement?.appendChild(fallback);
        }}
      />
    </div>
  );
};

const yanIcons = [Building2, Wifi, BookOpen, LayoutDashboard, Monitor, DollarSign, BarChart2, CreditCard];

const YanoljaPartnerPage = () => {
  const { get } = useSiteContent();
  const { openContactModal } = useContactModal();

  useSEO({
    titleKey: "seo_yanolja_title",
    descriptionKey: "seo_yanolja_description",
    canonical: "/partnerships/yanolja",
  });

  const yanTags = Array.from({ length: 4 }, (_, i) =>
    get(`yan_tag_${i + 1}`, [
      "12 Months Hands-On Experience",
      "Saudi Arabia Market",
      "Cloud-Based Implementation",
      "Hospitality Tech Integration",
    ][i])
  );

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
              {get("yan_page_badge", "Hospitality Technology")}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
              {get("yan_page_headline", "Yanolja Cloud Partnership")}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              {get(
                "yan_page_subtext",
                "We have built extensive hands-on experience implementing Yanolja Cloud and its eZee suite across hospitality properties in Saudi Arabia."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Yanolja Hero ─────────────────────────────────────────────────── */}
      <section className="relative py-8 md:py-12 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 65%)" }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

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
                {get(
                  "yan_hero_body",
                  "We have also expanded our capabilities into the hospitality technology sector through our work with Yanolja Cloud and its suite of cloud-based management solutions. Over the past 12 months, we have built extensive hands-on experience implementing and integrating these systems across hospitality properties in Saudi Arabia, enabling fully digital, streamlined operations aligned with modern guest experiences. This practical exposure has positioned us as specialized implementors in hospitality tech, and we are now actively scaling these capabilities into new markets beyond Saudi Arabia."
                )}
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
                  <YanoljaLogo
                    logoUrl={get("yan_logo_url", YANOLJA_LOGO_URL)}
                    name={get("yan_partner_name", "Yanolja Cloud Solution")}
                  />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 self-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">
                      {get("yan_badge_label", "Specialized Implementor")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {yanTags.map((tag) => (
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

      {/* ── Yanolja Products Grid ─────────────────────────────────────────── */}
      <section className="relative px-6 pb-8 md:pb-12 overflow-hidden">
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

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
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
              {get("yan_cta_badge", "Scale Your Hospitality Tech")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              {get("yan_cta_h2", "Ready to Digitize Your Hospitality Operations?")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed text-sm">
              {get(
                "yan_cta_body",
                "Our hospitality tech team brings 12 months of hands-on implementation experience across Saudi Arabia. Let's bring that expertise to your property."
              )}
            </p>
            <button
              onClick={openContactModal}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:brightness-110 transition-all glow-gold shimmer-btn text-sm"
            >
              {get("yan_cta_btn", "Get in Touch")}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default YanoljaPartnerPage;
