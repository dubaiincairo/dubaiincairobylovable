import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

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

const HighlightsSection = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    supabase
      .from("case_studies")
      .select("id,slug,client_name,industry,tagline,metric_1_value,metric_1_label,metric_2_value,metric_2_label,metric_3_value,metric_3_label,tags")
      .eq("published", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(3)
      .then(({ data }) => { if (data) setStudies(data as CaseStudy[]); });
  }, []);

  if (studies.length === 0) return null;

  return (
    <section id="highlights" className="relative py-8 md:py-16 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Highlights from Our Collaboration
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Real Clients.<br />Measurable Results.
            </h2>
          </div>
          <Link
            to="/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-display font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            See All Case Studies
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          {studies.map((cs) => (
            <motion.div key={cs.id} variants={cardFadeUp}>
              <Link
                to={`/case-studies/${cs.slug}`}
                className="group glass-card gradient-border rounded-xl p-6 flex flex-col h-full hover-lift block"
              >
                {/* Header */}
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

                {/* Metrics */}
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

                {/* Tags */}
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
      </div>
    </section>
  );
};

export default HighlightsSection;
