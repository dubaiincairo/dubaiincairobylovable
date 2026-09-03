import { motion } from "framer-motion";
import { Quote, Linkedin, Facebook, Instagram } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, fadeIn, springBounce, viewportOnce } from "@/lib/animations";

const SOCIALS = [
  { key: "founder_linkedin", Icon: Linkedin, label: "LinkedIn" },
  { key: "founder_facebook", Icon: Facebook, label: "Facebook" },
  { key: "founder_instagram", Icon: Instagram, label: "Instagram" },
] as const;

// Helper to strip any raw CMS/HTML markup (e.g. <p style="...">, <em>) from quote text
const cleanQuoteText = (raw: string): string => {
  if (!raw) return "";
  return raw
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/^["'“”«»]+|["'“”«»]+$/g, "")
    .trim();
};

const FounderSection = () => {
  const { get } = useSiteContent();

  const photoUrl = (get("founder_photo_url") || get("founder_image", "")).trim();
  const rawQuote = get(
    "founder_quote",
    "Strategy without implementation is a document. Implementation without strategy is noise. The discipline to keep both together, and to charge accordingly, is a market position that most agencies are structurally incapable of holding."
  );
  const quote = cleanQuoteText(rawQuote);
  const attribution = get("founder_attribution", "— Abdalla Hassan Elfouly, CEO & Co-Founder");
  const founderName = get("founder_name", "Abdalla Hassan Elfouly");
  const education = get("founder_education", "").trim();

  return (
    <section id="team" className="relative py-16 md:py-32 px-6 overflow-hidden">
      {/* Cinematic gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 18% 6%) 50%, hsl(220 20% 4%) 100%)' }} />
      {/* Gold accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background: 'linear-gradient(180deg, transparent, hsl(38 80% 55% / 0.2), transparent)' }} />

      <div className="relative max-w-4xl mx-auto">
        <motion.div className="text-center mb-6 md:mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("founder_subtitle", "A Message from Our Founder")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold whitespace-pre-line">
            {get("founder_headline", "Built by Someone Who's Been in the Trenches")}
          </h2>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-6 text-muted-foreground text-lg leading-relaxed text-center max-w-3xl mx-auto">
          <p className="whitespace-pre-line">
            {get("founder_body", "Abdalla Hassan Elfouly founded Dubai in Cairo with a bold vision.")}
          </p>
          {education && (
            <p className="whitespace-pre-line">{education}</p>
          )}
        </motion.div>

        <motion.blockquote
          variants={springBounce}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 relative p-8 md:p-10 rounded-2xl glass-card text-center flex flex-col items-center"
          style={{ borderColor: 'hsl(38 80% 55% / 0.2)', background: 'hsl(38 80% 55% / 0.03)' }}
        >
          <Quote className="w-8 h-8 text-primary/30 mx-auto mb-4" />
          <p className="text-foreground text-lg md:text-xl font-display italic leading-relaxed mb-6 whitespace-pre-line max-w-2xl mx-auto">
            “{quote}”
          </p>

          {photoUrl && (
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4 border-2 border-primary/40 shadow-xl bg-card/60">
              <img
                src={photoUrl}
                alt={founderName}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          <footer className="text-sm text-primary font-display font-semibold whitespace-pre-line">
            {attribution}
          </footer>

          {/* Social links */}
          <div className="flex items-center gap-2.5 mt-4">
            {SOCIALS.map(({ key, Icon, label }) => {
              const url = get(key, "").trim();
              if (!url) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default FounderSection;
