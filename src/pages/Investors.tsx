import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Quote,
  Globe,
  Layers,
  TrendingUp,
  Award,
  Lightbulb,
  BrainCircuit,
  Cpu,
  Building2,
  Sparkles,
  MapPin,
  Briefcase,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import PageTransition from "@/components/PageTransition";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import { RichText } from "@/components/ui/rich-text";
import AnimatedUnderline from "@/components/ui/animated-underline";

const HERO_STAT_ICONS = [Globe, Layers, TrendingUp, Award];
const PROCESS_ICONS = [Lightbulb, BrainCircuit, Cpu];
const FRANCHISE_COL_ICONS = [Building2, TrendingUp, Sparkles];
const REVENUE_ICONS = [Briefcase, ShieldCheck, Handshake];

const Investors = () => {
  const { get } = useSiteContent();
  useSEO({ titleKey: "seo_investors_title", descriptionKey: "seo_investors_description", canonical: "/investors" });

  const contactEmail = get("investor_contact_email", "investors@dubaiincairo.com");

  const cities = [
    get("investor_franchise_city_1", "Riyadh"),
    get("investor_franchise_city_2", "Doha"),
    get("investor_franchise_city_3", "Kuwait City"),
    get("investor_franchise_city_4", "Manama"),
    get("investor_franchise_city_5", "Baghdad"),
    get("investor_franchise_city_6", "Accra"),
    get("investor_franchise_city_7", "Johannesburg"),
  ];

  const processSteps = [
    {
      title: get("investor_process_1_title", "Business Model Study"),
      desc: get(
        "investor_process_1_desc",
        "Deep analysis of client revenue generation, customer acquisition, and competitive landscape.",
      ),
    },
    {
      title: get("investor_process_2_title", "Strategy & AI Stack Design"),
      desc: get(
        "investor_process_2_desc",
        "Custom marketing strategy paired with specific, purpose-selected AI tools.",
      ),
    },
    {
      title: get("investor_process_3_title", "Supervised Implementation"),
      desc: get(
        "investor_process_3_desc",
        "Hands-on deployment with team training, real-time monitoring, and continued accountability.",
      ),
    },
  ];

  const franchiseColumns = [
    {
      title: get("investor_franchise_col_1_title", "Investor Contribution"),
      items: [
        get("investor_franchise_col_1_item_1", "Local office space"),
        get("investor_franchise_col_1_item_2", "Business licenses and legal registration"),
        get("investor_franchise_col_1_item_3", "Local operational fees"),
      ],
    },
    {
      title: get("investor_franchise_col_2_title", "Investor Returns"),
      items: [
        get("investor_franchise_col_2_item_1", "30% of all revenue generated"),
        get("investor_franchise_col_2_item_2", "Real-time financial transparency"),
        get("investor_franchise_col_2_item_3", "No filtered reporting"),
      ],
    },
    {
      title: get("investor_franchise_col_3_title", "DubaiInCity Provides"),
      items: [
        get("investor_franchise_col_3_item_1", "Complete brand, methodology, and AI ecosystem"),
        get("investor_franchise_col_3_item_2", "Full operational team managing all client engagements"),
        get("investor_franchise_col_3_item_3", "All deliverables and client relationship management"),
      ],
    },
  ];

  const revenueStreams = [
    {
      title: get("investor_revenue_1_title", "Engagement Fees"),
      desc: get(
        "investor_revenue_1_desc",
        "Strategy-plus-implementation packages tailored to each client's business model and growth stage.",
      ),
    },
    {
      title: get("investor_revenue_2_title", "Ongoing Supervision Retainers"),
      desc: get(
        "investor_revenue_2_desc",
        "Continued accountability and optimization, generating predictable recurring revenue from supervised clients.",
      ),
    },
    {
      title: get("investor_revenue_3_title", "Franchise Licensing & Royalties"),
      desc: get(
        "investor_revenue_3_desc",
        "Licensing fees and revenue royalties from city-specific franchise partners across the region.",
      ),
    },
  ];

  return (
    <PageTransition>
      <main id="main-content">

        {/* ── Hero — 2-col, mirrors homepage rhythm ───────────────────────── */}
        <section className="relative pt-24 pb-8 md:pt-28 md:pb-10 px-6 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 70%)" }}
          />
          <div className="relative max-w-6xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">

              {/* LEFT — copy */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                  {get("investor_hero_badge", "Investor Relations")}
                </span>

                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
                  {get("investor_hero_headline_1", "Marketing Intelligence,")}
                  <br />
                  <span className="text-gradient-gold">
                    {get("investor_hero_headline_2", "Built to Scale")}
                  </span>
                </h1>

                <RichText
                  html={get(
                    "investor_hero_body",
                    "DubaiInCity operates as a marketing intelligence firm that integrates strategy and implementation as inseparable components. The company evolved from DubaiInCairo, scaling a proven model across new Middle East and African markets.",
                  )}
                  className="text-muted-foreground text-lg mb-7 leading-relaxed"
                />

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/30 text-primary/80 bg-primary/5">
                    {get("investor_hero_pill_1", "✦ Built on DubaiInCairo")}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/30 text-primary/80 bg-primary/5">
                    {get("investor_hero_pill_2", "✦ Franchise Across MENA & Africa")}
                  </span>
                </div>
              </motion.div>

              {/* RIGHT — 2x2 stat cards */}
              <motion.div
                className="hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[340px] h-[340px] rounded-full border border-primary/8 animate-float-slow" />
                  </div>

                  <div className="relative grid grid-cols-2 gap-3 max-w-md mx-auto">
                    {HERO_STAT_ICONS.map((Icon, i) => (
                      <div
                        key={i}
                        className="group glass-card gradient-border hover-lift rounded-xl p-4"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-2xl font-display font-bold text-gradient-gold leading-none mb-1">
                          {get(`investor_hero_stat_${i + 1}_value`, ["7", "3", "30%", "5"][i])}
                        </div>
                        <div className="text-[11px] text-muted-foreground leading-snug">
                          {get(`investor_hero_stat_${i + 1}_label`, [
                            "Target franchise cities",
                            "Stage engagement process",
                            "Investor revenue share",
                            "Years profitable",
                          ][i])}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Founding Philosophy — Pull Quote ───────────────────────────── */}
        <section className="relative px-6 py-6 md:py-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-primary/4 blur-[140px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              className="relative rounded-2xl border border-border/60 p-8 md:p-12 text-center overflow-hidden"
              style={{
                background:
                  "radial-gradient(ellipse 80% 100% at 50% 50%, hsl(38 80% 55% / 0.06), transparent 70%), hsl(var(--card))",
              }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <Quote className="w-10 h-10 text-primary/40 mx-auto mb-4" aria-hidden="true" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                {get("investor_quote_badge", "Founding Philosophy")}
              </span>
              <blockquote className="max-w-3xl mx-auto">
                <RichText
                  html={get(
                    "investor_quote_text",
                    "Strategy without implementation is a document. Implementation without strategy is noise.",
                  )}
                  className="text-xl md:text-2xl font-display font-medium italic leading-relaxed text-foreground"
                />
              </blockquote>
              <RichText
                html={get("investor_quote_caption", "The conviction that shapes every engagement we deliver.")}
                className="text-sm text-muted-foreground mt-5 max-w-md mx-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* ── Three-Stage Engagement Process ─────────────────────────────── */}
        <section className="relative px-6 py-6 md:py-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-primary/4 blur-[140px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="relative max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-6 md:mb-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
                {get("investor_process_badge", "How We Engage")}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                {get("investor_process_headline", "A Three-Stage")}{" "}
                <span className="text-gradient-gold">
                  {get("investor_process_headline_accent", "Engagement Process")}
                </span>
              </h2>
              <AnimatedUnderline />
              <RichText
                html={get(
                  "investor_process_subtext",
                  "Each engagement moves clients from business clarity to operational execution under our direct supervision.",
                )}
                className="text-muted-foreground text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed"
              />
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {processSteps.map((step, i) => {
                const Icon = PROCESS_ICONS[i];
                return (
                  <motion.div
                    key={i}
                    variants={cardFadeUp}
                    className="group glass-card gradient-border hover-lift rounded-xl p-6 relative"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-3xl font-display font-bold text-primary/25 leading-none">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      {step.title}
                    </h3>
                    <RichText
                      html={step.desc}
                      className="text-muted-foreground text-sm leading-relaxed"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Franchise Model ────────────────────────────────────────────── */}
        <section className="relative px-6 py-6 md:py-10 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[150px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          <div className="relative max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-6 md:mb-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
                {get("investor_franchise_badge", "Franchise Opportunities")}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                {get("investor_franchise_headline", "Seven Cities.")}{" "}
                <span className="text-gradient-gold">
                  {get("investor_franchise_headline_accent", "One Proven Model.")}
                </span>
              </h2>
              <AnimatedUnderline />
              <RichText
                html={get(
                  "investor_franchise_subtext",
                  "DubaiInCity offers franchise opportunities across seven target cities — scaling a proven methodology into high-growth markets in the Middle East and Africa.",
                )}
                className="text-muted-foreground text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed"
              />
            </motion.div>

            {/* City pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {cities.map((city, i) => (
                <motion.span
                  key={i}
                  variants={cardFadeUp}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-display font-semibold border border-primary/30 text-foreground bg-primary/5 hover:border-primary/60 hover:bg-primary/10 transition-colors duration-300"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  {city}
                </motion.span>
              ))}
            </motion.div>

            {/* 3-column franchise breakdown */}
            <motion.div
              className="grid md:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {franchiseColumns.map((col, i) => {
                const Icon = FRANCHISE_COL_ICONS[i];
                return (
                  <motion.div
                    key={i}
                    variants={cardFadeUp}
                    className="group glass-card gradient-border hover-lift rounded-xl p-6"
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                      {col.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {col.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-muted-foreground text-sm leading-relaxed"
                        >
                          <span className="text-primary mt-1 shrink-0 text-xs">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Revenue Streams ────────────────────────────────────────────── */}
        <section className="relative px-6 py-6 md:py-10 overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[130px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />
          <div className="relative max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-6 md:mb-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
                {get("investor_revenue_badge", "Revenue Streams")}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                {get("investor_revenue_headline", "Three Sources of")}{" "}
                <span className="text-gradient-gold">
                  {get("investor_revenue_headline_accent", "Compounding Growth")}
                </span>
              </h2>
              <AnimatedUnderline />
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {revenueStreams.map((stream, i) => {
                const Icon = REVENUE_ICONS[i];
                return (
                  <motion.div
                    key={i}
                    variants={cardFadeUp}
                    className="group glass-card gradient-border hover-lift rounded-xl p-6"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      {stream.title}
                    </h3>
                    <RichText
                      html={stream.desc}
                      className="text-muted-foreground text-sm leading-relaxed"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Get in Touch CTA ────────────────────────────────────────────── */}
        <section className="relative px-6 py-6 md:py-10 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, hsl(38 80% 55% / 0.04), transparent 70%)' }}
          />
          <div className="relative max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto">
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
                  {get("investor_contact_badge", "Get in Touch")}
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                  {get("investor_contact_headline", "Let's Talk Numbers")}
                </h2>
                <RichText
                  html={get(
                    "investor_contact_body",
                    "We share full financials, growth metrics, and franchise terms with serious investors under NDA. Reach out and we'll schedule an introductory call within 48 hours.",
                  )}
                  className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed"
                />

                <a
                  href={`mailto:${contactEmail}?subject=Investor%20Inquiry`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:brightness-110 transition-all glow-gold shimmer-btn text-sm"
                >
                  <Mail className="w-4 h-4" />
                  {contactEmail}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
};

export default Investors;
