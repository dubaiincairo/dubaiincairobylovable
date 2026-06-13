import { useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Handshake, Sprout } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { cardFadeUp, viewportOnce } from "@/lib/animations";
import { RichText } from "@/components/ui/rich-text";
import AnimatedUnderline from "@/components/ui/animated-underline";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCarouselSwipeHint } from "@/hooks/useCarouselSwipeHint";
import { useSectionParallax } from "@/hooks/useSectionParallax";

const ValuesSection = () => {
  const { get } = useSiteContent();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  useCarouselSwipeHint(api, carouselRef);
  const { ref: sectionRef, headerY, headerOpacity, orbY, orbScale } = useSectionParallax();

  const values = [
    {
      icon: Lightbulb,
      title: get("value_1_title", "Clarity as a Foundation"),
      desc: get(
        "value_1_desc",
        "We believe impactful marketing is rooted in clear thinking and shared understanding. By championing open communication and continuous alignment on your core objectives, we ensure every strategy is built on a foundation of truth and transparency.",
      ),
    },
    {
      icon: Handshake,
      title: get("value_2_title", "Partners, Not Providers"),
      desc: get(
        "value_2_desc",
        "The most profound results emerge from genuine partnership, not transactional service delivery. Our philosophy is to integrate deeply with your vision. We don't just execute tasks; we take shared, personal responsibility for your sustained growth.",
      ),
    },
    {
      icon: Sprout,
      title: get("value_3_title", "Evolution Through Agility"),
      desc: get(
        "value_3_desc",
        "We believe sustainable growth demands a culture of testing, adapting, and embracing change. By valuing the agility to explore new channels and evolving market trends, we maintain the freedom to scale what works and intelligently refine what doesn't.",
      ),
    },
  ];

  return (
    <section ref={sectionRef as RefObject<HTMLElement>} className="relative py-6 md:py-10 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] pointer-events-none">
        <motion.div className="w-full h-full rounded-full bg-accent/5 blur-[120px]" style={{ y: orbY, scale: orbScale }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div className="text-center mb-8 md:mb-12" style={{ y: headerY, opacity: headerOpacity }}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("values_subtitle", "What We Stand For")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("values_headline", "Core beliefs shaping our approach")}
          </h2>
          <AnimatedUnderline />
        </motion.div>

        {/* Mobile / tablet: peek carousel */}
        <div ref={carouselRef} className="lg:hidden">
          <Carousel setApi={(a) => { setApi(a); if (a) { setCurrent(a.selectedScrollSnap()); a.on("select", () => setCurrent(a.selectedScrollSnap())); } }} opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {values.map((v, i) => (
                <CarouselItem key={i} className="pl-4 basis-[85%] sm:basis-1/2">
                  <motion.div
                    variants={cardFadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="group glass-card gradient-border p-6 rounded-xl hover-lift h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-12">
                      <v.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2 whitespace-pre-line">{v.title}</h3>
                    <RichText html={v.desc} className="text-muted-foreground text-sm leading-relaxed" />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4" />
            <CarouselNext className="hidden sm:flex -right-4" />
          </Carousel>
          <div className="flex justify-center gap-2 mt-6">
            {values.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-muted-foreground"}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: static 3-column grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={i} className="group glass-card gradient-border p-6 rounded-xl hover-lift" variants={cardFadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-12">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2 whitespace-pre-line">{v.title}</h3>
              <RichText html={v.desc} className="text-muted-foreground text-sm leading-relaxed" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
