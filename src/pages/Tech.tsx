import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechStackSection from "@/components/TechStackSection";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { useContactModal } from "@/context/ContactModalContext";

const Tech = () => {
  const { get } = useSiteContent();
  const { openContactModal } = useContactModal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" viewport={viewportOnce}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">Tech Stack</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
              {get("tech_page_headline", "The Technology Behind")}
              <br />
              <span className="text-gradient-gold">{get("tech_page_subheadline", "Every Result We Deliver")}</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
              {get("tech_page_desc", "We don't just use tools — we architect intelligent stacks. Three purpose-built layers that cover acquisition, execution, and innovation across your entire digital operation.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main stack section */}
      <TechStackSection />

      {/* CTA strip */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-border bg-card px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-1">
                {get("tech_cta_title", "Want to know which stack fits your business?")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {get("tech_cta_desc", "We'll audit your current tools and recommend the right combination.")}
              </p>
            </div>
            <button
              type="button"
              onClick={openContactModal}
              className="shrink-0 shimmer-btn px-6 py-3 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-xl hover:brightness-110 transition-all"
            >
              {get("tech_cta_btn", "Get a Free Stack Audit")}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tech;
