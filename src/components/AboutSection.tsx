import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "@/lib/animations";

const AboutSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="about" className="py-16 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-12">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("about_subtitle", "Who We Are")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 whitespace-pre-line">
            {get("about_headline", "A Digital Agency Built on Science, Not Guesswork")}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
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
