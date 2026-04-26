import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import { TrendingUp, ShoppingCart, Cpu, ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    num: "01",
    Icon: TrendingUp,
    accent: "hsl(38 80% 55%)",        // gold / primary
    accentClass: "text-primary",
    accentBg: "bg-primary/10",
    accentBorder: "border-primary/25",
    pillBg: "bg-primary/8",
    gradFrom: "from-primary/10",
    titleKey:    "tech_1_title",
    titleDef:    "Growth & Customer Intelligence",
    subtitleDef: "Marketing, Analytics, CRM, and Revenue Optimization",
    descDef:     "This layer owns acquisition, conversion, retention, and insights.",
    roleDef:     "Transforms data into revenue. This is your decision-making engine.",
    groups: [
      { labelKey: "", labelDef: "", toolsKey: "tech_1_tools", toolsDef: "Google Analytics,Looker Studio,HubSpot,Salesforce Cloud,Semrush,Salesforce Einstein,Adobe Sensei,ChatGPT,Perplexity AI,Optimizely,Hotjar" },
    ],
  },
  {
    num: "02",
    Icon: ShoppingCart,
    accent: "hsl(210 80% 60%)",        // blue
    accentClass: "text-blue-400",
    accentBg: "bg-blue-400/10",
    accentBorder: "border-blue-400/25",
    pillBg: "bg-blue-400/8",
    gradFrom: "from-blue-400/10",
    titleKey:    "tech_2_title",
    titleDef:    "Commerce & Business Operations",
    subtitleDef: "Ecommerce, Finance, Workflows, and Execution Systems",
    descDef:     "This layer ensures transactions, scalability, and operational efficiency.",
    roleDef:     "This is your execution backbone — where revenue is processed and operations are optimized.",
    groups: [
      { labelKey: "tech_2a_label", labelDef: "Ecommerce Ecosystem", toolsKey: "tech_2a_tools", toolsDef: "Shopify Magic,Adobe Commerce,Wix eCommerce,Odoo,Zoho Books" },
      { labelKey: "tech_2b_label", labelDef: "Operations & Workflow",  toolsKey: "tech_2b_tools", toolsDef: "ClickUp,Asana,Monday.com,Notion AI,Zapier,Make,UiPath" },
    ],
  },
  {
    num: "03",
    Icon: Cpu,
    accent: "hsl(270 70% 65%)",        // violet
    accentClass: "text-violet-400",
    accentBg: "bg-violet-400/10",
    accentBorder: "border-violet-400/25",
    pillBg: "bg-violet-400/8",
    gradFrom: "from-violet-400/10",
    titleKey:    "tech_3_title",
    titleDef:    "Creative, AI & Digital Infrastructure",
    subtitleDef: "Content Creation, AI Production, and Technical Foundations",
    descDef:     "This layer powers content, experience, and scalability.",
    roleDef:     "This is your innovation layer — where brand, AI, and scalability intersect.",
    groups: [
      { labelKey: "tech_3a_label", labelDef: "Design & Creative Tools",     toolsKey: "tech_3a_tools", toolsDef: "Figma,Adobe Creative Suite,Canva,Blender,Lottie,Midjourney,Runway,Synthesia,Jasper,Writesonic" },
      { labelKey: "tech_3b_label", labelDef: "AI & Cloud Infrastructure",   toolsKey: "tech_3b_tools", toolsDef: "OpenAI API,AWS,Google Cloud AI,Microsoft Azure AI,Infobip,LangChain,Pinecone,Replicate" },
    ],
  },
] as const;

const TechStackSection = () => {
  const { get } = useSiteContent();

  return (
    <section className="relative py-12 md:py-24 px-6 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("tech_subtitle", "Our Tech Stack")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            {get("tech_headline", "Integrated Solutions. Proven Tools.")}
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            {get("tech_desc", "Three intelligent layers — each purpose-built to cover a critical domain of your digital operation.")}
          </p>
        </motion.div>

        {/* Category cards */}
        <motion.div
          className="space-y-6"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          {CATEGORIES.map((cat) => {
            const title    = get(cat.titleKey,    cat.titleDef);
            const subtitle = cat.subtitleDef;
            const desc     = cat.descDef;
            const role     = cat.roleDef;

            return (
              <motion.div
                key={cat.num}
                variants={cardFadeUp}
                className="relative rounded-2xl border border-border bg-card overflow-hidden"
              >
                {/* top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${cat.gradFrom} via-transparent to-transparent`} />

                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:gap-12">

                    {/* ── Left: meta ── */}
                    <div className="lg:w-72 shrink-0 mb-6 lg:mb-0">
                      <div className="flex items-start gap-4 mb-5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cat.accentBg} ${cat.accentBorder} border`}>
                          <cat.Icon className={`w-5 h-5 ${cat.accentClass}`} />
                        </div>
                        <span className={`text-5xl font-display font-bold leading-none ${cat.accentClass} opacity-20 select-none`}>
                          {cat.num}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-foreground mb-1 leading-tight">
                        {title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        ({subtitle})
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {desc}
                      </p>

                      {/* Strategic role */}
                      <div className={`rounded-xl border ${cat.accentBorder} ${cat.accentBg} px-4 py-3`}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <ArrowRight className={`w-3 h-3 ${cat.accentClass}`} />
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${cat.accentClass}`}>Strategic Role</span>
                        </div>
                        <p className="text-xs text-foreground leading-relaxed">{role}</p>
                      </div>
                    </div>

                    {/* ── Right: tools ── */}
                    <div className="flex-1 flex flex-col gap-5">
                      {cat.groups.map((group) => {
                        const tools = get(group.toolsKey, group.toolsDef)
                          .split(/[,\n]/).map((s: string) => s.trim()).filter(Boolean);
                        const subLabel = group.labelKey ? get(group.labelKey, group.labelDef) : "";

                        return (
                          <div key={group.toolsKey}>
                            {subLabel && (
                              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                                {subLabel}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {tools.map((tool: string) => (
                                <span
                                  key={tool}
                                  className={`px-3 py-1.5 text-xs rounded-lg border ${cat.accentBorder} ${cat.accentBg} ${cat.accentClass} font-medium`}
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
