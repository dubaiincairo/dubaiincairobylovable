import { type RefObject } from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce, MOTION } from "@/lib/animations";
import { RichText } from "@/components/ui/rich-text";
import AnimatedUnderline from "@/components/ui/animated-underline";
import { useSectionParallax } from "@/hooks/useSectionParallax";

const AboutSection = () => {
  const { get } = useSiteContent();
  const { ref: sectionRef, orbY, orbScale } = useSectionParallax();

  const steps = [
    {
      num: get("about_step_1_num", "01"),
      title: get("about_step_1_title", "Strategy & Research"),
      desc: get("about_step_1_desc", "We start with data — auditing your market, competitors, and audience before writing a single line of copy or launching a single campaign."),
    },
    {
      num: get("about_step_2_num", "02"),
      title: get("about_step_2_title", "Build & Execute"),
      desc: get("about_step_2_desc", "Every channel, every creative, every system is built with precision — designed to work together as one growth engine, not isolated experiments."),
    },
    {
      num: get("about_step_3_num", "03"),
      title: get("about_step_3_title", "Optimise & Scale"),
      desc: get("about_step_3_desc", "Continuous testing, real-time analytics, and ruthless focus on what moves the needle. When something works, we scale it fast."),
    },
  ];

  return (
    <section ref={sectionRef as RefObject<HTMLElement>} id="about" className="relative py-6 md:py-10 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[480px] h-[480px] translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div className="w-full h-full rounded-full bg-primary/4 blur-[150px]" style={{ y: orbY, scale: orbScale }} />
      </div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-12 items-start">

        {/* LEFT — copy */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("about_subtitle", "Who We Are")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight whitespace-pre-line">
            {get("about_headline", "A Digital Agency Built on Science, Not Guesswork")}
          </h2>
          <AnimatedUnderline align="left" className="mb-5" />
          <RichText
            html={get("about_body", "Founded in 2021, Dubai in Cairo is a Cairo-based digital marketing and eBusiness solutions agency.")}
            className="text-muted-foreground text-base md:text-lg leading-relaxed"
          />
        </motion.div>

        {/* RIGHT — Process steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-0"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={cardFadeUp}
              className="relative flex gap-5 group"
            >
              {/* Vertical connector — draws top→bottom, circle pops in spring + sonar ping */}
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-px flex-1 bg-border origin-top group-first:mt-2"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, delay: i * 0.35, ease: MOTION.ease.standard }}
                />
                <motion.div
                  className="relative w-8 h-8 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 my-3 transition-colors duration-300 group-hover:border-primary/60 group-hover:bg-primary/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.35 + 0.2, type: "spring", stiffness: 220, damping: 14 }}
                >
                  {/* Sonar ping — single ring expanding outward as the circle appears */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-primary/40"
                    initial={{ scale: 1, opacity: 0 }}
                    whileInView={{ scale: [1, 1.9, 1.9], opacity: [0, 0.7, 0] }}
                    viewport={viewportOnce}
                    transition={{ delay: i * 0.35 + 0.45, duration: 1.4, times: [0, 0.55, 1], ease: "easeOut" }}
                  />
                  <span className="text-[10px] font-bold text-primary tracking-wider relative">{step.num}</span>
                </motion.div>
                <motion.div
                  className="w-px flex-1 bg-border origin-top group-last:opacity-0"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, delay: i * 0.35 + 0.35, ease: MOTION.ease.standard }}
                />
              </div>

              {/* Content */}
              <div className="pb-8 group-last:pb-0 pt-2">
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <RichText html={step.desc} className="text-muted-foreground text-sm leading-relaxed" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
