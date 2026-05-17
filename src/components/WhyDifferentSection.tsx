import { useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Globe, Target } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { cardFadeUp, viewportOnce } from "@/lib/animations";
import { RichText } from "@/components/ui/rich-text";
import AnimatedUnderline from "@/components/ui/animated-underline";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCarouselSwipeHint } from "@/hooks/useCarouselSwipeHint";
import { useSectionParallax } from "@/hooks/useSectionParallax";

const WhyDifferentSection = () => {
  const { get } = useSiteContent();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  useCarouselSwipeHint(api, carouselRef);
  const { ref: sectionRef, headerY, headerOpacity, orbY, orbScale } = useSectionParallax();

  const edges = [
    {
      icon: BrainCircuit,
      title: get("edge_1_title", "Intelligence-Powered Operations"),
      desc: get(
        "edge_1_desc",
        "We leverage the latest AI tools and a rigorous electronic management system to streamline workflows. By combining emerging technology with automated tracking, we deliver high-quality projects faster and ensure that no detail ever slips through the cracks.",
      ),
    },
    {
      icon: Globe,
      title: get("edge_2_title", "Elite Global Expertise"),
      desc: get(
        "edge_2_desc",
        "Our unique model connects you with a vetted network of more than 80 project-based specialists across the digital marketing and eCommerce fields. This flexible structure allows us to maintain expert-level quality while keeping costs lean, offering you high-tier talent without the traditional agency overhead.",
      ),
    },
    {
      icon: Target,
      title: get("edge_3_title", "Performance-Based Value"),
      desc: get(
        "edge_3_desc",
        "We believe in complete transparency, from our competitive pricing to our data-backed reporting. Every initiative is tied to clear KPIs and actionable insights, passing significant operational savings directly to you while ensuring you know exactly how your investment is driving growth.",
      ),
    },
  ];

  return (
    <section ref={sectionRef as RefObject<HTMLElement>} className="relative py-6 md:py-10 px-6 overflow-hidden">
      {/* Radial glow — scroll-parallax drifts the orb downward as section passes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
        <motion.div
          className="w-full h-full rounded-full"
          style={{ y: orbY, scale: orbScale, background: 'radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div className="text-center mb-6 md:mb-12" style={{ y: headerY, opacity: headerOpacity }}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("edges_subtitle", "Why We're Different")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("edges_headline", "A Smarter Way to Grow Your Business Online")}
          </h2>
          <AnimatedUnderline />
        </motion.div>

        {/* Mobile / tablet: peek carousel */}
        <div ref={carouselRef} className="lg:hidden">
          <Carousel setApi={(a) => { setApi(a); if (a) { setCurrent(a.selectedScrollSnap()); a.on("select", () => setCurrent(a.selectedScrollSnap())); } }} opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {edges.map((item, i) => (
                <CarouselItem key={i} className="pl-4 basis-[85%] sm:basis-1/2">
                  <motion.div
                    variants={cardFadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="group glass-card gradient-border p-6 rounded-xl hover-lift h-full"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-12">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-3 whitespace-pre-line">{item.title}</h3>
                    <RichText html={item.desc} className="text-muted-foreground text-sm leading-relaxed" />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4" />
            <CarouselNext className="hidden sm:flex -right-4" />
          </Carousel>
          <div className="flex justify-center gap-2 mt-6">
            {edges.map((_, i) => (
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
          {edges.map((item, i) => (
            <motion.div key={i} className="group glass-card gradient-border p-6 rounded-xl hover-lift" variants={cardFadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-12">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-3 whitespace-pre-line">{item.title}</h3>
              <RichText html={item.desc} className="text-muted-foreground text-sm leading-relaxed" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
