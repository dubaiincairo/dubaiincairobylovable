import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { slideInLeft, slideInRight, fadeIn, viewportOnce } from "@/lib/animations";

const AboutSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="about" className="relative py-16 md:py-32 px-6 overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-12">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("about_subtitle", "Who We Are")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 whitespace-pre-line">
            {get("about_headline", "A Digital Agency Built on Science, Not Guesswork")}
          </h2>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-6 text-lg leading-relaxed text-center max-w-3xl mx-auto"
        >
          <motion.p variants={fadeIn} className="text-muted-foreground whitespace-pre-line">
            {get("about_body", "Founded in 2021, Dubai in Cairo is a Cairo-based digital marketing and eBusiness solutions agency.")}
          </motion.p>
          <motion.p variants={fadeIn} className="text-foreground font-medium whitespace-pre-line">
            {get("about_body_2", "We are 100% digital by design.")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
