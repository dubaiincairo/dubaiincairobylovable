import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to <span className="text-gradient-gold">Grow</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Let's build a marketing strategy that puts your brand on the map. Book a free consultation today.
          </p>

          <a
            href="mailto:hello@dubaiincairo.com"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-display font-semibold tracking-wide rounded-lg glow-gold transition-all hover:brightness-110 text-lg"
          >
            <Mail className="w-5 h-5" />
            Book a Consultation
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Cairo, Egypt</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Dubai, UAE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
