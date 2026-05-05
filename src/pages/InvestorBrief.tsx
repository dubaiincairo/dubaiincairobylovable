import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Globe, Layers, DollarSign, BarChart2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSEO } from "@/hooks/useSEO";
import { richText } from "@/lib/richText";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

const InvestorBrief = () => {
  const { get } = useSiteContent();

  useSEO({
    titleKey: "seo_investor_brief_title",
    descriptionKey: "seo_investor_brief_description",
    canonical: "/investor-brief",
  });

  const markets = get("ib_markets", "Riyadh,Doha,Kuwait City,Manama,Baghdad,Accra,Johannesburg")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-primary/5 blur-[140px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              {get("ib_hero_eyebrow", "Investor Brief · 2025")}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient-gold">{get("ib_hero_headline_1", "Dubai in Cairo")}</span>
              <br />{get("ib_hero_headline_2", "Business Model")}
            </h1>
            <div
              className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed [&>p]:mb-0"
              dangerouslySetInnerHTML={{ __html: richText(get("ib_hero_body", "A marketing intelligence firm rejecting the traditional agency model — fusing strategy with implementation across Middle Eastern and African markets.")) }}
            />
          </motion.div>
        </div>
      </section>

      {/* Core Proposition */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card gradient-border rounded-2xl p-8 md:p-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("ib_prop_badge", "Core Proposition")}
            </span>
            <div
              className="text-foreground text-lg md:text-xl leading-relaxed [&>p]:mb-0"
              dangerouslySetInnerHTML={{ __html: richText(get("ib_prop_body", "DubaiInCity operates as a marketing intelligence firm rejecting the traditional agency model. The company fuses strategy with implementation, refusing to separate these functions that most competitors handle independently.")) }}
            />
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("ib_problem_badge", "The Problem We Solve")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              {get("ib_problem_headline_1", "Fragmented Marketing.")}<br />{get("ib_problem_headline_2", "AI Without Direction.")}
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[
              {
                icon: Layers,
                titleKey: "ib_problem_1_title",
                titleDef: "Fragmented Vendors",
                descKey: "ib_problem_1_desc",
                descDef: "Organizations in target markets typically fragment their marketing across disconnected vendors, creating gaps between strategy and execution.",
              },
              {
                icon: TrendingUp,
                titleKey: "ib_problem_2_title",
                titleDef: "AI Without Guidance",
                descKey: "ib_problem_2_desc",
                descDef: "Businesses recognize AI's importance but lack guidance on selecting appropriate tools and integrating them effectively into existing workflows.",
              },
            ].map((item) => (
              <motion.div
                key={item.titleKey}
                variants={cardFadeUp}
                className="glass-card rounded-xl p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{get(item.titleKey, item.titleDef)}</h3>
                  <div
                    className="text-muted-foreground text-sm leading-relaxed [&>p]:mb-0"
                    dangerouslySetInnerHTML={{ __html: richText(get(item.descKey, item.descDef)) }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Operational Approach */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("ib_ops_badge", "Operational Approach")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 leading-tight">
              {get("ib_ops_headline", "Three Sequential Stages")}
            </h2>
          </motion.div>

          <motion.div
            className="space-y-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[
              {
                numKey: "ib_stage_1_num", numDef: "01",
                titleKey: "ib_stage_1_title", titleDef: "Understand",
                descKey: "ib_stage_1_desc", descDef: "Study how a client's business operates and identify where marketing intelligence generates the highest returns.",
              },
              {
                numKey: "ib_stage_2_num", numDef: "02",
                titleKey: "ib_stage_2_title", titleDef: "Strategise & Select",
                descKey: "ib_stage_2_desc", descDef: "Combine strategy development with AI tool selection, ensuring both decisions reflect the specific client situation rather than generic trends.",
              },
              {
                numKey: "ib_stage_3_num", numDef: "03",
                titleKey: "ib_stage_3_title", titleDef: "Implement & Sustain",
                descKey: "ib_stage_3_desc", descDef: "Supervised implementation, training, real-time monitoring, and accountability until client teams operate independently.",
              },
            ].map((step, i) => (
              <motion.div key={step.numKey} variants={cardFadeUp} className="relative flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="w-px flex-1 bg-border group-first:mt-2" />
                  <div className="w-9 h-9 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 my-3 transition-colors duration-300 group-hover:border-primary/60 group-hover:bg-primary/10">
                    <span className="text-[10px] font-bold text-primary tracking-wider">{get(step.numKey, step.numDef)}</span>
                  </div>
                  <div className="w-px flex-1 bg-border group-last:opacity-0" />
                </div>
                <div className="pb-8 group-last:pb-0 pt-2">
                  <h3 className="font-display font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {get(step.titleKey, step.titleDef)}
                  </h3>
                  <div
                    className="text-muted-foreground text-sm leading-relaxed [&>p]:mb-0"
                    dangerouslySetInnerHTML={{ __html: richText(get(step.descKey, step.descDef)) }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Franchise Opportunity */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("ib_franchise_badge", "Franchise Opportunity")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">
              {get("ib_franchise_headline", "Seven Licensed Markets")}
            </h2>
            <div
              className="text-muted-foreground text-base mb-8 leading-relaxed [&>p]:mb-0"
              dangerouslySetInnerHTML={{ __html: richText(get("ib_franchise_subtext", "Investors provide local infrastructure while the central team manages all operations and client relationships.")) }}
            />
          </motion.div>

          {/* Markets */}
          <motion.div
            className="flex flex-wrap gap-2.5 mb-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {markets.map((city) => (
              <motion.span
                key={city}
                variants={cardFadeUp}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary"
              >
                <Globe className="w-3.5 h-3.5" />
                {city}
              </motion.span>
            ))}
          </motion.div>

          {/* Financial split */}
          <motion.div
            className="glass-card gradient-border rounded-2xl p-7 md:p-9"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <DollarSign className="w-4.5 h-4.5 text-primary" />
              </div>
              <span className="font-display font-semibold text-foreground">{get("ib_fin_badge", "Financial Structure")}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                <div className="text-4xl font-display font-bold text-green-400 mb-1">{get("ib_investor_pct", "30%")}</div>
                <p className="text-sm font-semibold text-foreground mb-1">{get("ib_investor_title", "Investor Revenue Share")}</p>
                <div
                  className="text-xs text-muted-foreground leading-relaxed [&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: richText(get("ib_investor_desc", "Complete real-time financial transparency. Investors provide local infrastructure only.")) }}
                />
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="text-4xl font-display font-bold text-primary mb-1">{get("ib_company_pct", "70%")}</div>
                <p className="text-sm font-semibold text-foreground mb-1">{get("ib_company_title", "DubaiInCity Operating Share")}</p>
                <div
                  className="text-xs text-muted-foreground leading-relaxed [&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: richText(get("ib_company_desc", "Handles all operational responsibilities, client relationships, and team management.")) }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Revenue Streams */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("ib_revenue_badge", "Revenue Streams")}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 leading-tight">
              {get("ib_revenue_headline", "Three Income Channels")}
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[
              {
                num: "1",
                titleKey: "ib_revenue_1_title", titleDef: "Complete Engagements",
                descKey: "ib_revenue_1_desc", descDef: "Full packages combining strategy and implementation for clients requiring end-to-end support.",
              },
              {
                num: "2",
                titleKey: "ib_revenue_2_title", titleDef: "Monthly Retainers",
                descKey: "ib_revenue_2_desc", descDef: "Ongoing optimization and supervision for clients who need continuous performance management.",
              },
              {
                num: "3",
                titleKey: "ib_revenue_3_title", titleDef: "Franchise Fees",
                descKey: "ib_revenue_3_desc", descDef: "Licensing and royalty fees from market operators across the seven licensed territories.",
              },
            ].map((item) => (
              <motion.div
                key={item.num}
                variants={cardFadeUp}
                className="glass-card gradient-border rounded-xl p-6 text-center group"
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:border-primary/60 group-hover:bg-primary/10 transition-colors">
                  <span className="text-xs font-bold text-primary">{item.num}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 text-sm">{get(item.titleKey, item.titleDef)}</h3>
                <div
                  className="text-muted-foreground text-xs leading-relaxed [&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: richText(get(item.descKey, item.descDef)) }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Market Timing */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative glass-card rounded-2xl p-8 md:p-10 overflow-hidden"
            style={{ borderColor: 'hsl(38 80% 55% / 0.25)', background: 'hsl(38 80% 55% / 0.03)' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="relative flex items-start gap-5">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-2 block">
                  {get("ib_timing_badge", "Market Timing")}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3">
                  {get("ib_timing_headline", "An 18–24 Month Window")}
                </h3>
                <div
                  className="text-muted-foreground leading-relaxed [&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: richText(get("ib_timing_body", "Before AI tools become commoditised, a critical window exists to establish market leadership. Early positioning now narrows the competitive advantage gap that later entrants will be unable to close.")) }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestorBrief;
