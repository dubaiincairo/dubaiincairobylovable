import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fadeUp, fadeIn, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type CaseStudy = {
  id: string;
  slug: string;
  client_name: string;
  industry: string;
  tagline: string;
  challenge: string;
  solution: string;
  results: string;
  metric_1_value: string | null;
  metric_1_label: string | null;
  metric_2_value: string | null;
  metric_2_label: string | null;
  metric_3_value: string | null;
  metric_3_label: string | null;
  tags: string[] | null;
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [cs, setCs] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("case_studies")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { navigate("/case-studies"); return; }
        setCs(data as CaseStudy);
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!cs) return null;

  const metrics = [
    { v: cs.metric_1_value, l: cs.metric_1_label },
    { v: cs.metric_2_value, l: cs.metric_2_label },
    { v: cs.metric_3_value, l: cs.metric_3_label },
  ].filter((m) => m.v);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, hsl(38 80% 55% / 0.05), transparent 60%)' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32" style={{ background: 'linear-gradient(180deg, transparent, hsl(38 80% 55% / 0.2), transparent)' }} />

        <div className="relative max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> All Case Studies
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full px-3 py-1">
                {cs.industry}
              </span>
              {cs.tags?.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
              {cs.client_name}
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
              {cs.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics bar */}
      {metrics.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className={`grid gap-px bg-border rounded-2xl overflow-hidden ${metrics.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : metrics.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}
              variants={staggerContainer} initial="hidden" animate="visible"
            >
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  variants={cardFadeUp}
                  className="bg-card px-4 py-6 sm:px-8 sm:py-8 text-center"
                >
                  <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2">{m.v}</div>
                  <div className="text-sm text-muted-foreground">{m.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-12">

          {cs.challenge && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-primary">The Challenge</h2>
              </div>
              <p className="text-foreground text-lg leading-relaxed whitespace-pre-line pl-4">{cs.challenge}</p>
            </motion.div>
          )}

          {cs.solution && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-primary">Our Approach</h2>
              </div>
              <p className="text-foreground text-lg leading-relaxed whitespace-pre-line pl-4">{cs.solution}</p>
            </motion.div>
          )}

          {cs.results && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-primary">The Results</h2>
              </div>
              <p className="text-foreground text-lg leading-relaxed whitespace-pre-line pl-4">{cs.results}</p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewportOnce}
            className="glass-card rounded-2xl p-8 text-center mt-16"
            style={{ borderColor: 'hsl(38 80% 55% / 0.2)' }}
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3">Ready to Be Next?</p>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Let's Build Your Success Story</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Every partnership starts with a conversation. Tell us about your goals.
            </p>
            <Link
              to="/#contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-lg hover:brightness-110 transition-all"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudy;
