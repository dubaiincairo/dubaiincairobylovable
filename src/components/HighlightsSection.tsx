import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { fadeUp, cardFadeUp, viewportOnce } from "@/lib/animations";
import AnimatedUnderline from "@/components/ui/animated-underline";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCarouselSwipeHint } from "@/hooks/useCarouselSwipeHint";

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  useCarouselSwipeHint(api, carouselRef);

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

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (studies.length === 0) return null;

  const CaseCard = ({ cs }: { cs: CaseStudy }) => (
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
  );

  return (
    <section id="highlights" className="relative py-6 md:py-10 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <div>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Highlights from Our Collaboration
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Real Clients.<br />Measurable Results.
            </h2>
            <AnimatedUnderline align="left" />
          </div>
          <Link
            to="/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-display font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            See All Case Studies
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Mobile / tablet: peek carousel */}
        <div ref={carouselRef} className="lg:hidden">
          <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {studies.map((cs) => (
                <CarouselItem key={cs.id} className="pl-4 basis-[85%] sm:basis-1/2">
                  <motion.div
                    variants={cardFadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="h-full"
                  >
                    <CaseCard cs={cs} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4" />
            <CarouselNext className="hidden sm:flex -right-4" />
          </Carousel>
          {studies.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {studies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-muted-foreground"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop: static 3-column grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {studies.map((cs) => (
            <motion.div key={cs.id} variants={cardFadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <CaseCard cs={cs} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
