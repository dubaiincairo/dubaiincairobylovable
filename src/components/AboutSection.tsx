import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const AboutSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">Who We Are</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            {get("about_headline", "A Digital Agency Built on Science, Not Guesswork").replace("Science", "").split(",")[0]}
            <span className="text-gradient-gold">Science</span>, Not Guesswork
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-6 text-muted-foreground text-lg leading-relaxed text-center max-w-3xl mx-auto">
          <p>{get("about_body", "Founded in 2021, Dubai in Cairo is a Cairo-based digital marketing and eBusiness solutions agency on a mission to help organizations achieve their commercial goals online. We combine the latest technology with data-driven strategies and a commitment to delivering real, tangible outcomes — not just reports.")}</p>
          <p>
            <span className="text-foreground font-medium">{get("about_body_2", "We are 100% digital by design. No physical overhead. No wasted time. Just a focused, talented team — available to you from anywhere.")}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
