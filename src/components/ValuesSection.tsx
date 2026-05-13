import { motion } from "framer-motion";
import { Lightbulb, Handshake, Sprout } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import { RichText } from "@/components/ui/rich-text";
import AnimatedUnderline from "@/components/ui/animated-underline";

const ValuesSection = () => {
  const { get } = useSiteContent();

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
    <section className="relative py-8 md:py-14 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div className="text-center mb-8 md:mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("values_subtitle", "What We Stand For")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("values_headline", "Core beliefs shaping our approach")}
          </h2>
          <AnimatedUnderline />
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {values.map((v, i) => (
            <motion.div key={i} className="group glass-card gradient-border text-center p-5 md:p-8 rounded-xl hover-lift" variants={cardFadeUp}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:rotate-12">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2 whitespace-pre-line">{v.title}</h3>
              <RichText html={v.desc} className="text-muted-foreground text-sm" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;
