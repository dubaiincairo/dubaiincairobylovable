import { motion } from "framer-motion";
import { Quote, Linkedin } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

const TestimonialsSection = () => {
  const { get } = useSiteContent();

  const testimonials = Array.from({ length: 3 }, (_, i) => ({
    photo:     get(`testimonial_${i + 1}_photo`,    ""),
    name:      get(`testimonial_${i + 1}_name`,     `Client ${i + 1}`),
    title:     get(`testimonial_${i + 1}_title`,    ""),
    relation:  get(`testimonial_${i + 1}_relation`, ""),
    quote:     get(`testimonial_${i + 1}_quote`,    ""),
    linkedin:  get(`testimonial_${i + 1}_linkedin`, ""),
  }));

  return (
    <section className="relative py-8 md:py-20 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 18% 6%) 50%, hsl(220 20% 4%) 100%)" }}
      />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[140px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-6 md:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("testimonials_subtitle", "What Clients Say")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("testimonials_headline", "Trusted by Leaders.\nRecommended by Peers.")}
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            {get("testimonials_subtext", "Real recommendations from clients and colleagues — pulled directly from LinkedIn.")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col glass-card rounded-2xl p-6 md:p-8 hover-lift"
              style={{ borderColor: "hsl(38 80% 55% / 0.15)", background: "hsl(38 80% 55% / 0.02)" }}
              variants={cardFadeUp}
            >
              {/* Gold top accent */}
              <div className="absolute top-0 inset-x-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              {/* Quote icon */}
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 shrink-0">
                <Quote className="w-4 h-4 text-primary" />
              </div>

              {/* Quote text — grows to fill card */}
              <p className="text-foreground/90 text-sm leading-relaxed flex-1 italic whitespace-pre-line">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-border/60 my-5" />

              {/* Author row */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/30 bg-muted shrink-0 flex items-center justify-center">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-display font-bold text-primary/60">
                      {t.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Name + title */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-semibold text-sm text-foreground truncate">
                      {t.name}
                    </p>
                    {t.linkedin && (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.name} on LinkedIn`}
                        className="shrink-0 text-muted-foreground hover:text-[#0A66C2] transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2 mt-0.5">
                    {t.title}
                  </p>
                  {t.relation && (
                    <p className="text-[10px] text-primary/70 mt-1 font-medium">
                      {t.relation}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
