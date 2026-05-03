import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type CaseStudy = {
  id: string;
  slug: string;
  client_name: string;
  industry: string;
  tagline: string;
  metric_1_value: string | null;
  metric_1_label: string | null;
  metric_2_value: string | null;
  metric_2_label: string | null;
  metric_3_value: string | null;
  metric_3_label: string | null;
  tags: string[] | null;
};

const CaseStudies = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [industries, setIndustries] = useState<string[]>([]);

  useSEO({ titleKey: "seo_cases_title", descriptionKey: "seo_cases_description", canonical: "/case-studies" });

  useEffect(() => {
    supabase
      .from("case_studies")
      .select("id,slug,client_name,industry,tagline,metric_1_value,metric_1_label,metric_2_value,metric_2_label,metric_3_value,metric_3_label,tags")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setStudies(data as CaseStudy[]);
          const unique = Array.from(new Set((data as CaseStudy[]).map((s) => s.industry).filter(Boolean)));
          setIndustries(unique);
        }
        setLoading(false);
      });
  }, []);

  const filtered = filter === "All" ? studies : studies.filter((s) => s.industry === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Highlights from Our Collaboration
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
              Real Clients.<br />Measurable Results.
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              A selection of partnerships where strategy met execution — and the numbers proved it.
            </p>
          </motion.div>

          {/* Industry filter */}
          {industries.length > 1 && (
            <motion.div
              className="flex flex-wrap gap-2 mt-10"
              variants={fadeUp} initial="hidden" animate="visible"
            >
              {["All", ...industries].map((ind) => (
                <button
                  key={ind}
                  onClick={() => setFilter(ind)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    filter === ind
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative px-6 pb-20">
        <div className="relative max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer} initial="hidden" animate="visible"
            >
              {filtered.map((cs) => (
                <motion.div key={cs.id} variants={cardFadeUp}>
                  <Link
                    to={`/case-studies/${cs.slug}`}
                    className="group glass-card gradient-border rounded-xl p-6 flex flex-col h-full hover-lift block"
                  >
                    <div className="mb-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                          {cs.client_name}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 shrink-0 mt-1" />
                      </div>
                      <span className="text-xs font-medium text-primary/70 uppercase tracking-wider">{cs.industry}</span>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-2">{cs.tagline}</p>
                    </div>

                    {(cs.metric_1_value || cs.metric_2_value || cs.metric_3_value) && (
                      <div className="grid grid-cols-3 gap-3 mt-auto pt-5 border-t border-border/50">
                        {[
                          { v: cs.metric_1_value, l: cs.metric_1_label },
                          { v: cs.metric_2_value, l: cs.metric_2_label },
                          { v: cs.metric_3_value, l: cs.metric_3_label },
                        ].map((m, i) => m.v ? (
                          <div key={i} className="text-center">
                            <div className="text-lg font-display font-bold text-gradient-gold">{m.v}</div>
                            <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{m.l}</div>
                          </div>
                        ) : null)}
                      </div>
                    )}

                    {cs.tags && cs.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {cs.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-[10px] rounded-md bg-secondary text-secondary-foreground font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
