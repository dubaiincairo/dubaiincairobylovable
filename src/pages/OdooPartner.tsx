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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce, slideInLeft, slideInRight } from "@/lib/animations";

const OdooHoneycomb = () => (
  <div className="flex items-center gap-3">
    <svg viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto flex-shrink-0">
      <circle cx="21" cy="24"  r="7" fill="hsl(38 80% 55%)" />
      <circle cx="21" cy="10"  r="7" fill="hsl(38 80% 55%)" opacity="0.75" />
      <circle cx="21" cy="38"  r="7" fill="hsl(38 80% 55%)" opacity="0.75" />
      <circle cx="8.9"  cy="17" r="7" fill="hsl(38 80% 55%)" opacity="0.6" />
      <circle cx="33.1" cy="17" r="7" fill="hsl(38 80% 55%)" opacity="0.6" />
      <circle cx="8.9"  cy="31" r="7" fill="hsl(38 80% 55%)" opacity="0.6" />
      <circle cx="33.1" cy="31" r="7" fill="hsl(38 80% 55%)" opacity="0.6" />
    </svg>
    <span className="font-display font-bold text-[1.75rem] leading-none tracking-tight text-primary select-none">
      odoo
    </span>
  </div>
);

const suites = [
  {
    icon: Globe,
    title: "Odoo eCommerce & Website Suite",
    desc: "Provides a fully integrated platform to build, manage, and scale online stores and websites, seamlessly connected with backend operations such as inventory, sales, and customer data — making it the core foundation for any digital commerce strategy.",
  },
  {
    icon: Megaphone,
    title: "Odoo Marketing Automation Suite",
    desc: "Empowers businesses to design, automate, and analyze multi-channel campaigns — including email, SMS, and social marketing — turning traffic into conversions through data-driven engagement and lifecycle automation.",
  },
  {
    icon: TrendingUp,
    title: "Odoo Sales & CRM Suite",
    desc: "Manages the full customer journey from lead acquisition to deal closure, enabling precise pipeline tracking, customer segmentation, and revenue forecasting — critical for aligning marketing efforts with actual sales outcomes.",
  },
  {
    icon: Package,
    title: "Odoo Inventory & Supply Chain Suite",
    desc: "Ensures real-time stock visibility and efficient order fulfillment, directly impacting customer experience, delivery performance, and the scalability of eCommerce operations.",
  },
  {
    icon: Receipt,
    title: "Odoo Accounting Suite",
    desc: "Provides real-time financial tracking, invoicing, and reconciliation, enabling accurate measurement of marketing ROI, profitability, and overall business performance.",
  },
  {
    icon: ShoppingBag,
    title: "Odoo POS & Retail Suite",
    desc: "Connects offline and online sales channels, creating an omnichannel experience where customer data, inventory, and transactions are fully synchronized.",
  },
  {
    icon: FolderKanban,
    title: "Odoo Project & Services Suite",
    desc: "Supports execution and delivery of digital services, campaigns, and internal workflows, ensuring structured project management and operational efficiency.",
  },
  {
    icon: Users,
    title: "Odoo HR & Workforce Suite",
    desc: "Manages recruitment, performance, and team operations, supporting the human infrastructure behind marketing, sales, and eCommerce execution.",
  },
  {
    icon: Factory,
    title: "Odoo Manufacturing Suite",
    desc: "Enables production planning and control, becoming relevant in eCommerce businesses that rely on in-house manufacturing or custom product workflows.",
  },
];

const OdooPartner = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* ── Hero ─────────────────────────────────────────────────────────── */}
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 px-6 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.06), transparent 65%)" }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: "repeating-linear-gradient(-45deg, hsl(38 80% 55%), hsl(38 80% 55%) 1px, transparent 1px, transparent 40px)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Official Partnership
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                We are a<br />
                <span className="text-gradient-gold">Verified Odoo</span><br />
                Partner
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                We enable our clients to operate within a fully integrated, closed-loop ecosystem
                that connects eCommerce, digital marketing, and backend operations. We believe that
                impactful marketing cannot exist in isolation — real, scalable results require a
                robust ERP system that digitally manages and synchronizes all operational processes.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
                That's why we've established a dedicated Odoo studio, specializing in implementation,
                customization, and API development, ensuring seamless integration between your
                business operations and your marketing engine.
              </p>
            </div>

            {/* Right: logo card */}
            <motion.div
              className="flex justify-center md:justify-end"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-primary/8 blur-3xl scale-125 pointer-events-none" />
                <div className="relative rounded-3xl border border-primary/20 bg-card/60 backdrop-blur-sm px-12 py-10 flex flex-col items-center gap-6">
                  <OdooHoneycomb />
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/8">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                      Verified Partner
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {["Implementation", "Customization", "API Dev"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-[10px] font-semibold rounded-md bg-secondary text-secondary-foreground text-center"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Suites Grid ──────────────────────────────────────────────────── */}
    <section className="relative px-6 py-12 md:py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[130px] translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            Odoo Studio
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Nine Integrated Suites.<br />
            <span className="text-gradient-gold">One Unified Platform.</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {suites.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="group glass-card gradient-border rounded-xl p-6 hover-lift flex flex-col gap-4"
              variants={cardFadeUp}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="shrink-0 w-6 h-6 rounded-md bg-secondary flex items-center justify-center">
                  <span className="text-[10px] font-bold font-display text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm md:text-base mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────────────────── */}
    <section className="relative px-6 pb-20">
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
            Start the Conversation
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
            Ready to Build Your Integrated Ecosystem?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed text-sm">
            Let's connect your marketing engine to a fully synchronized ERP backend.
            Our Odoo studio handles everything from initial scoping to go-live.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:brightness-110 transition-all glow-gold shimmer-btn text-sm"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default OdooPartner;
