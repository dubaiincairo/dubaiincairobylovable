import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, TrendingUp, Users, Briefcase, Award, Target, Sparkles, BarChart3 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import PageTransition from "@/components/PageTransition";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import { RichText } from "@/components/ui/rich-text";
import AnimatedUnderline from "@/components/ui/animated-underline";

const HERO_STAT_ICONS = [TrendingUp, Users, Briefcase, Award];
const WHY_ICONS = [Target, Sparkles, BarChart3];

const Investors = () => {
  const { get } = useSiteContent();
  useSEO({ titleKey: "seo_investors_title", descriptionKey: "seo_investors_description", canonical: "/investors" });

  const contactEmail = get("investor_contact_email", "investors@dubaiincairo.com");

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
                  {get("investor_hero_headline_1", "Compounding Growth")}
                  <br />
                  <span className="text-gradient-gold">
                    {get("investor_hero_headline_2", "in MENA's Digital Economy")}
                  </span>
                </h1>

                <RichText
                  html={get(
                    "investor_hero_body",
                    "We're building a profitable, AI-first digital growth studio serving ambitious businesses across the Middle East and North Africa. Five years of compounding revenue, a lean operating model, and a verified partner network across Odoo, Yanolja Cloud, and Zoho.",
                  )}
                  className="text-muted-foreground text-lg mb-7 leading-relaxed"
                />

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/30 text-primary/80 bg-primary/5">
                    {get("investor_hero_pill_1", "✦ MENA-Focused")}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/30 text-primary/80 bg-primary/5">
                    {get("investor_hero_pill_2", "✦ Profitable Since 2022")}
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
                          {get(`investor_hero_stat_${i + 1}_value`, ["+38%", "50+", "200+", "5"][i])}
                        </div>
                        <div className="text-[11px] text-muted-foreground leading-snug">
                          {get(`investor_hero_stat_${i + 1}_label`, [
                            "YoY revenue growth",
                            "Active clients",
                            "Projects delivered",
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

        {/* ── Why Now — 3 reasons ─────────────────────────────────────────── */}
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
                {get("investor_why_badge", "Why Now")}
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                {get("investor_why_headline", "A Defensible Position in an Underserved Region")}
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
              {WHY_ICONS.map((Icon, i) => (
                <motion.div
                  key={i}
                  variants={cardFadeUp}
                  className="group glass-card gradient-border hover-lift rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {get(`investor_why_${i + 1}_title`, [
                      "Market Tailwind",
                      "AI-First Operating Model",
                      "Compounding Track Record",
                    ][i])}
                  </h3>
                  <RichText
                    html={get(`investor_why_${i + 1}_desc`, [
                      "MENA digital ad spend is growing at double-digit rates while local execution capacity remains a fraction of demand — a structural gap we're built to close.",
                      "Our team operates with AI at every workflow, sustaining premium output at a lean cost base. Margins compound as we scale, not erode.",
                      "Five consecutive profitable years, 50+ active clients, and verified partnerships across Odoo, Yanolja Cloud, and Zoho — the kind of foundation capital can accelerate.",
                    ][i])}
                    className="text-muted-foreground text-sm leading-relaxed"
                  />
                </motion.div>
              ))}
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
                    "We share full financials, growth metrics, and our roadmap with serious investors under NDA. Reach out and we'll schedule an introductory call within 48 hours.",
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
