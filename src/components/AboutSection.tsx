import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

const AboutSection = () => {
  const { get } = useSiteContent();

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
    <section id="about" className="relative py-14 md:py-20 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[480px] h-[480px] rounded-full bg-primary/4 blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20 items-start">

        {/* LEFT — copy */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("about_subtitle", "Who We Are")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight whitespace-pre-line">
            {get("about_headline", "A Digital Agency Built on Science, Not Guesswork")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5 whitespace-pre-line">
            {get("about_body", "Founded in 2021, Dubai in Cairo is a Cairo-based digital marketing and eBusiness solutions agency.")}
          </p>
          <p className="text-foreground font-medium text-base md:text-lg leading-relaxed whitespace-pre-line">
            {get("about_body_2", "We are 100% digital by design — no overhead, no guesswork. Just a focused team turning data into strategy.")}
          </p>
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
              {/* Vertical connector line */}
              <div className="flex flex-col items-center">
                <div className="w-px flex-1 bg-border group-first:mt-2" />
                <div className="w-8 h-8 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 my-3 transition-colors duration-300 group-hover:border-primary/60 group-hover:bg-primary/10">
                  <span className="text-[10px] font-bold text-primary tracking-wider">{step.num}</span>
                </div>
                <div className="w-px flex-1 bg-border group-last:opacity-0" />
              </div>

              {/* Content */}
              <div className="pb-8 group-last:pb-0 pt-2">
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
