import { motion } from "framer-motion";
import { BrainCircuit, Globe, Target } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import { RichText } from "@/components/ui/rich-text";
import AnimatedUnderline from "@/components/ui/animated-underline";

const WhyDifferentSection = () => {
  const { get } = useSiteContent();

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
    <section className="relative py-8 md:py-14 px-6 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto">
        <motion.div className="text-center mb-8 md:mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("edges_subtitle", "Why We're Different")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("edges_headline", "A Smarter Way to Grow Your Business Online")}
          </h2>
          <AnimatedUnderline />
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {edges.map((item, i) => (
            <motion.div key={i} className="group glass-card gradient-border p-5 md:p-8 rounded-xl hover-lift" variants={cardFadeUp}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-12">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-3 whitespace-pre-line">{item.title}</h3>
              <RichText html={item.desc} className="text-muted-foreground text-sm leading-relaxed" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
