import { useEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { Quote, Linkedin, ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { RichText } from "@/components/ui/rich-text";
import AnimatedUnderline from "@/components/ui/animated-underline";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useSectionParallax } from "@/hooks/useSectionParallax";

type Testimonial = {
  id: string;
  client_name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number | null;
  avatar_url: string | null;
  sort_order: number | null;
  published: boolean | null;
  relation: string | null;
  linkedin_url: string | null;
};

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="group relative flex flex-col glass-card gradient-border hover-lift rounded-2xl overflow-hidden"
      variants={fadeUp}
    >
      <div className="p-6 md:p-7 flex flex-col">
        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 shrink-0">
          <Quote className="w-4 h-4 text-primary" />
        </div>

        <div className="relative flex-1 mb-1">
          <RichText
            html={t.content}
            className={`text-foreground/90 text-sm leading-relaxed italic overflow-hidden transition-all duration-300 ${
              expanded ? "max-h-[2000px]" : "max-h-[6.5rem]"
            }`}
          />
          {!expanded && (
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-card to-transparent pointer-events-none" />
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors mt-2 mb-5 self-start"
        >
          {expanded ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Read less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> Read more</>
          )}
        </button>

        <div className="w-full h-px bg-border/60 mb-5" />

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/30 bg-muted shrink-0 flex items-center justify-center">
            {t.avatar_url ? (
              <img src={t.avatar_url} alt={t.client_name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-display font-bold text-primary/60">
                {t.client_name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-display font-semibold text-sm text-foreground truncate">{t.client_name}</p>
              {t.linkedin_url && (
                <a
                  href={t.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.client_name} on LinkedIn`}
                  className="shrink-0 text-muted-foreground hover:text-[#0A66C2] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2 mt-0.5">{t.role}</p>
            {t.relation && (
              <p className="text-[10px] text-primary/70 mt-1 font-medium">{t.relation}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const TestimonialsSection = () => {
  const { get } = useSiteContent();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { ref: sectionRef, headerY, orbY } = useSectionParallax();

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setTestimonials(data as Testimonial[]);
      });
  }, []);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (testimonials.length === 0) return null;

  return (
    <section ref={sectionRef as RefObject<HTMLElement>} className="relative py-6 md:py-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 18% 6%) 50%, hsl(220 20% 4%) 100%)" }}
      />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] translate-x-1/3 -translate-y-1/2 pointer-events-none">
        <motion.div className="w-full h-full rounded-full bg-primary/4 blur-[140px]" style={{ y: orbY }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-6 md:mb-12"
          style={{ y: headerY }}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("testimonials_subtitle", "What Clients Say")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("testimonials_headline", "Trusted by Leaders.\nRecommended by Peers.")}
          </h2>
          <AnimatedUnderline />
          <RichText
            html={get("testimonials_subtext", "Real recommendations from clients and colleagues — pulled directly from LinkedIn.")}
            className="mt-4 text-muted-foreground text-base max-w-xl mx-auto leading-relaxed"
          />
        </motion.div>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6 items-start py-4">
            {testimonials.map((t, i) => (
              <CarouselItem key={t.id} className="pl-4 md:pl-6 basis-[88%] md:basis-1/2 lg:basis-1/3">
                <TestimonialCard t={t} index={i} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {count > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all duration-200"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 h-2 bg-primary"
                      : "w-2 h-2 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all duration-200"
            >
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
