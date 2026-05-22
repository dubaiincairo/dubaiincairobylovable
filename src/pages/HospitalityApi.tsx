import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Hotel, Workflow, Receipt, ShieldCheck } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import PageTransition from "@/components/PageTransition";
import { useContactModal } from "@/context/ContactModalContext";
import { fadeUp, scaleIn, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

// Canva "watch" presentation — accounting integration from hospitality software to Odoo.
const CANVA_EMBED = "https://www.canva.com/design/DAHKZe1a-PY/DUVo6Oljvl8yj2okEmEDVg/watch?embed";
const CANVA_LINK = "https://www.canva.com/design/DAHKZe1a-PY/DUVo6Oljvl8yj2okEmEDVg/watch";
const VIDEO_TITLE = "الربط المحاسبي الشامل من برامج الفندقة إلى أودو";

const highlights = [
  {
    icon: Workflow,
    title: "Real-time sync",
    desc: "Reservations, folios, and payments flow from your hotel management system into Odoo automatically — no manual re-entry.",
  },
  {
    icon: Receipt,
    title: "Audit-ready books",
    desc: "Every transaction posts to the right accounts and taxes, keeping your ledger reconciled and ready for review.",
  },
  {
    icon: ShieldCheck,
    title: "Built for any PMS",
    desc: "A single API layer bridges hospitality platforms to Odoo accounting, whatever system your property runs on.",
  },
];

const HospitalityApi = () => {
  const { openContactModal } = useContactModal();

  useSEO({
    title: "Hospitality API — Connect Your Hotel Software to Odoo | Dubai in Cairo",
    description:
      "A complete accounting integration that connects hospitality and hotel management software to Odoo ERP — real-time, audit-ready, and built for any PMS.",
    canonical: "/hospitalityapi",
  });

  return (
    <PageTransition>
      <main id="main-content">

        {/* Hero */}
        <section className="relative pt-24 pb-6 md:pt-28 md:pb-8 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />
          </div>
          <div className="relative max-w-5xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Hotel className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                  Hospitality API
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
                Connect Your Hospitality Software
                <br />
                <span className="text-gradient-gold">to Odoo Accounting</span>
              </h1>
              <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
                A complete integration layer that pushes every reservation, folio, and
                payment from your hotel management system straight into Odoo — accurate,
                real-time, and ready for the auditors.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Hero video */}
        <section className="relative px-6 pb-4 md:pb-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="relative"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl pointer-events-none"
              />
              <div className="relative rounded-2xl border border-primary/20 bg-card overflow-hidden shadow-2xl">
                <div style={{ position: "relative", width: "100%", height: 0, paddingTop: "65.034%" }}>
                  <iframe
                    loading="lazy"
                    title={VIDEO_TITLE}
                    src={CANVA_EMBED}
                    allow="fullscreen"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                </div>
              </div>
              <p className="relative mt-4 text-center text-sm text-muted-foreground">
                <a
                  href={CANVA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="rtl"
                  className="hover:text-foreground transition-colors"
                >
                  {VIDEO_TITLE}
                </a>{" "}
                — by Abdalla H. Elfouly
              </p>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="px-6 py-10 md:py-14">
          <motion.div
            className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {highlights.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={cardFadeUp}
                className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-base text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA strip */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl border border-border bg-card px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  Want this integration for your property?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tell us which PMS you run and we'll map the full accounting flow into Odoo.
                </p>
              </div>
              <button
                type="button"
                onClick={openContactModal}
                className="shrink-0 shimmer-btn px-6 py-3 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-xl hover:brightness-110 transition-all glow-gold"
              >
                Book an Integration Call
              </button>
            </div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
};

export default HospitalityApi;
