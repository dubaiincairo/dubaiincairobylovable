import { motion } from "framer-motion";
import { Briefcase, Palette, Code, Fingerprint, Camera, Award } from "lucide-react";

const studios = [
  { icon: Briefcase, title: "Business Solutions Studio", desc: "Strategy, feasibility studies, market analysis, digital marketing strategy, performance reporting, and team training." },
  { icon: Palette, title: "Creativity Studio", desc: "Graphic design, motion graphics, website content, and high-converting marketing campaign copy." },
  { icon: Code, title: "Technology Studio", desc: "Website development, e-store creation, mobile app development, and AI-powered business web solutions." },
  { icon: Fingerprint, title: "Brand Identity Studio", desc: "Visual identity, strategic brand architecture, and compelling company storytelling content." },
  { icon: Camera, title: "Media Production Studio", desc: "Event photography, smartphone-optimized content creation, and cinematic video production." },
  { icon: Award, title: "Platform Certifications", desc: "Officially certified on Instagram, Facebook, LinkedIn, TikTok, YouTube, Snapchat, WhatsApp, Google, and X." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">Our Studios</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Six Specialized Studios. <span className="text-gradient-gold">One Unified Vision.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((s, i) => (
            <motion.div
              key={s.title}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
