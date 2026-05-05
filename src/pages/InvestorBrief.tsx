import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Globe, Layers, DollarSign, BarChart2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

const InvestorBrief = () => {
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
              Investor Brief · 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient-gold">Dubai in Cairo</span>
              <br />Business Model
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              A marketing intelligence firm rejecting the traditional agency model — fusing strategy with implementation across Middle Eastern and African markets.
            </p>
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
              Core Proposition
            </span>
            <p className="text-foreground text-lg md:text-xl leading-relaxed">
              DubaiInCity operates as a marketing intelligence firm rejecting the traditional agency model. The company fuses strategy with implementation, refusing to separate these functions that most competitors handle independently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              The Problem We Solve
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              Fragmented Marketing.<br />AI Without Direction.
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
                title: "Fragmented Vendors",
                desc: "Organizations in target markets typically fragment their marketing across disconnected vendors, creating gaps between strategy and execution.",
              },
              {
                icon: TrendingUp,
                title: "AI Without Guidance",
                desc: "Businesses recognize AI's importance but lack guidance on selecting appropriate tools and integrating them effectively into existing workflows.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={cardFadeUp}
                className="glass-card rounded-xl p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
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
              Operational Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 leading-tight">
              Three Sequential Stages
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
                num: "01",
                title: "Understand",
                desc: "Study how a client's business operates and identify where marketing intelligence generates the highest returns.",
              },
              {
                num: "02",
                title: "Strategise & Select",
                desc: "Combine strategy development with AI tool selection, ensuring both decisions reflect the specific client situation rather than generic trends.",
              },
              {
                num: "03",
                title: "Implement & Sustain",
                desc: "Supervised implementation, training, real-time monitoring, and accountability until client teams operate independently.",
              },
            ].map((step, i) => (
              <motion.div key={step.num} variants={cardFadeUp} className="relative flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="w-px flex-1 bg-border group-first:mt-2" />
                  <div className="w-9 h-9 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 my-3 transition-colors duration-300 group-hover:border-primary/60 group-hover:bg-primary/10">
                    <span className="text-[10px] font-bold text-primary tracking-wider">{step.num}</span>
                  </div>
                  <div className="w-px flex-1 bg-border group-last:opacity-0" />
                </div>
                <div className="pb-8 group-last:pb-0 pt-2">
                  <h3 className="font-display font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
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
              Franchise Opportunity
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">
              Seven Licensed Markets
            </h2>
            <p className="text-muted-foreground text-base mb-8 leading-relaxed">
              Investors provide local infrastructure while the central team manages all operations and client relationships.
            </p>
          </motion.div>

          {/* Markets */}
          <motion.div
            className="flex flex-wrap gap-2.5 mb-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {["Riyadh", "Doha", "Kuwait City", "Manama", "Baghdad", "Accra", "Johannesburg"].map((city) => (
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
              <span className="font-display font-semibold text-foreground">Financial Structure</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                <div className="text-4xl font-display font-bold text-green-400 mb-1">30%</div>
                <p className="text-sm font-semibold text-foreground mb-1">Investor Revenue Share</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Complete real-time financial transparency. Investors provide local infrastructure only.
                </p>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="text-4xl font-display font-bold text-primary mb-1">70%</div>
                <p className="text-sm font-semibold text-foreground mb-1">DubaiInCity Operating Share</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Handles all operational responsibilities, client relationships, and team management.
                </p>
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
              Revenue Streams
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 leading-tight">
              Three Income Channels
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
                title: "Complete Engagements",
                desc: "Full packages combining strategy and implementation for clients requiring end-to-end support.",
              },
              {
                num: "2",
                title: "Monthly Retainers",
                desc: "Ongoing optimization and supervision for clients who need continuous performance management.",
              },
              {
                num: "3",
                title: "Franchise Fees",
                desc: "Licensing and royalty fees from market operators across the seven licensed territories.",
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
                <h3 className="font-display font-semibold text-foreground mb-2 text-sm">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
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
                  Market Timing
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3">
                  An 18–24 Month Window
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Before AI tools become commoditised, a critical window exists to establish market leadership. Early positioning now narrows the competitive advantage gap that later entrants will be unable to close.
                </p>
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
