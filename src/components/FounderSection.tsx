import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, fadeIn, springBounce, viewportOnce } from "@/lib/animations";

const FounderSection = () => {
  const { get } = useSiteContent();

  return (
    <section id="team" className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Cinematic gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 18% 6%) 50%, hsl(220 20% 4%) 100%)' }} />
      {/* Gold accent line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background: 'linear-gradient(180deg, transparent, hsl(38 80% 55% / 0.2), transparent)' }} />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-14 lg:gap-24 items-start">

        {/* LEFT — copy */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("founder_subtitle", "A Message from Our Founder")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight whitespace-pre-line">
            {get("founder_headline", "Built by Someone Who's Been in the Trenches.")}
          </h2>
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p className="whitespace-pre-line">{get("founder_body", "Elfouly founded Dubai'nCairo with a bold vision: a digital world teeming with opportunity and a belief that technology can fundamentally transform the way businesses operate and grow.")}</p>
            <p className="whitespace-pre-line">{get("founder_education", "His foundation is built on dual academic distinctions from the Arab Academy for Science, Technology and Maritime Transport: a Bachelor's in Mechatronics & Robotics Engineering, and an MBA in Business Administration & Marketing.")}</p>
          </motion.div>
        </motion.div>

        {/* RIGHT — Quote visual */}
        <motion.div
          variants={springBounce}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex items-start justify-center md:justify-end"
        >
          <div className="relative w-full max-w-md">
            {/* Decorative outer ring */}
            <div className="absolute -inset-4 rounded-2xl border border-primary/6 pointer-events-none" />

            {/* Quote card */}
            <blockquote
              className="relative p-8 rounded-xl glass-card"
              style={{ borderColor: 'hsl(38 80% 55% / 0.2)', background: 'hsl(38 80% 55% / 0.03)' }}
            >
              {/* Large decorative quote mark */}
              <div className="flex justify-center mb-5">
                <div className="w-12 h-12 rounded-full bg-primary/8 border border-primary/20 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary/60" />
                </div>
              </div>

              <p className="text-foreground text-lg md:text-xl font-display italic leading-relaxed mb-6 text-center whitespace-pre-line">
                "{get("founder_quote", "I believe that continuous learning is the key to success in business. That's why I've completed 50+ specialized training courses in eBusiness, and I will never stop growing, nor will we.")}"
              </p>

              {/* Divider */}
              <div className="w-12 h-px bg-primary/30 mx-auto mb-4" />

              <footer className="text-center">
                <span className="text-sm text-primary font-display font-semibold whitespace-pre-line">
                  {get("founder_attribution", "— Abdalla Hassan Elfouly, CEO & Co-Founder")}
                </span>
              </footer>
            </blockquote>

            {/* Ambient glow behind card */}
            <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, hsl(38 80% 55% / 0.06), transparent 70%)', filter: 'blur(20px)', zIndex: -1 }} />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FounderSection;
