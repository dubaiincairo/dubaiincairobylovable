import { motion } from "framer-motion";
import { Settings, Puzzle, Zap } from "lucide-react";
import { fadeUp, slideInLeft, slideInRight, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

// Monochromatic Odoo logo — honeycomb icon + wordmark in the site's gold
const OdooLogo = () => (
  <div className="flex items-center gap-3">
    {/* Honeycomb icon: 7 touching circles in flower arrangement, r=7, spacing=2r */}
    <svg viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto flex-shrink-0">
      {/* center */}
      <circle cx="21" cy="24"   r="7" fill="hsl(38 80% 55%)" />
      {/* top */}
      <circle cx="21" cy="10"   r="7" fill="hsl(38 80% 55%)" opacity="0.75" />
      {/* bottom */}
      <circle cx="21" cy="38"   r="7" fill="hsl(38 80% 55%)" opacity="0.75" />
      {/* top-left */}
      <circle cx="8.9"  cy="17" r="7" fill="hsl(38 80% 55%)" opacity="0.6" />
      {/* top-right */}
      <circle cx="33.1" cy="17" r="7" fill="hsl(38 80% 55%)" opacity="0.6" />
      {/* bottom-left */}
      <circle cx="8.9"  cy="31" r="7" fill="hsl(38 80% 55%)" opacity="0.6" />
      {/* bottom-right */}
      <circle cx="33.1" cy="31" r="7" fill="hsl(38 80% 55%)" opacity="0.6" />
    </svg>
    {/* Wordmark using the site's display font for perfect brand cohesion */}
    <span className="font-display font-bold text-[2rem] leading-none tracking-tight text-primary select-none">
      odoo
    </span>
  </div>
);

const capabilities = [
  {
    icon: Settings,
    label: "Implementation & Customization",
    desc: "Tailored Odoo deployments built around your exact operational workflows.",
  },
  {
    icon: Puzzle,
    label: "API Development",
    desc: "Seamless integrations connecting your Odoo backend to every touchpoint.",
  },
  {
    icon: Zap,
    label: "Closed-Loop Ecosystem",
    desc: "eCommerce, digital marketing, and operations synchronized in one platform.",
  },
];

const OdooPartnerSection = () => (
  <section className="relative py-8 md:py-20 px-6 overflow-hidden">
    {/* Background orbs */}
    <div className="absolute top-1/2 left-0 w-[450px] h-[450px] rounded-full bg-primary/5 blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/4 blur-[120px] translate-x-1/3 pointer-events-none" />
    {/* Subtle diagonal pattern */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.018]"
      style={{ backgroundImage: "repeating-linear-gradient(-45deg, hsl(38 80% 55%), hsl(38 80% 55%) 1px, transparent 1px, transparent 40px)" }}
    />

    <div className="relative max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-10 md:mb-14"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4">
          <span className="block w-4 h-px bg-primary/60" />
          Partnership
          <span className="block w-4 h-px bg-primary/60" />
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          Verified Odoo Partner
        </h2>
      </motion.div>

      {/* Main card */}
      <div className="glass-card gradient-border rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-5 gap-0">

          {/* Left panel — logo + badge */}
          <motion.div
            className="md:col-span-2 flex flex-col items-center justify-center gap-6 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border/50"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="flex flex-col items-center gap-5">
              {/* Glow halo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-primary/8 blur-2xl scale-150 pointer-events-none" />
                <div className="relative rounded-2xl bg-primary/5 border border-primary/15 px-8 py-6">
                  <OdooLogo />
                </div>
              </div>

              {/* Verified badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/8 animate-shimmer-badge"
                style={{ backgroundImage: "linear-gradient(90deg, transparent, hsl(38 90% 70% / 0.12), transparent)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">Verified Partner</span>
              </div>
            </div>
          </motion.div>

          {/* Right panel — text + capabilities */}
          <motion.div
            className="md:col-span-3 p-8 md:p-12 flex flex-col gap-8"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              We are now a verified Odoo partner, enabling our clients to operate within a fully integrated,
              closed-loop ecosystem that connects eCommerce, digital marketing, and backend operations.
              We believe that impactful marketing cannot exist in isolation — real, scalable results require
              a robust ERP system that digitally manages and synchronizes all operational processes. That's
              why we've established a dedicated Odoo studio, specializing in implementation, customization,
              and API development, ensuring seamless integration between your business operations and your
              marketing engine.
            </p>

            {/* Capability pills */}
            <motion.div
              className="grid sm:grid-cols-3 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {capabilities.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  className="group glass-card rounded-xl p-4 hover-lift"
                  variants={cardFadeUp}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="text-sm font-display font-semibold mb-1 leading-snug">{label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default OdooPartnerSection;
