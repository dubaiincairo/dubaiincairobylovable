import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import { TrendingUp, ShoppingCart, Cpu, ArrowRight } from "lucide-react";

/* ─── Category definition ─── */
const CATEGORIES = [
  {
    num: "01",
    Icon: TrendingUp,
    accentClass:  "text-primary",
    accentBg:     "bg-primary/10",
    accentBorder: "border-primary/20",
    pillBg:       "bg-primary/8",
    gradFrom:     "from-primary/15",
    titleKey:      "tech_1_title",
    titleDef:      "Growth & Customer Intelligence",
    subtitleDef:   "Marketing, Analytics, CRM, and Revenue Optimization",
    descDef:       "This layer owns acquisition, conversion, retention, and insights.",
    roleDef:       "Transforms data into revenue. This is your decision-making engine.",
    roleKey:       "tech_1_role",
    groups: [
      { lk: "tech_1_g1_label", ld: "Core Platforms",           tk: "tech_1_g1_tools", td: "Google Analytics,Looker Studio,HubSpot,Salesforce Cloud,Semrush" },
      { lk: "tech_1_g2_label", ld: "AI-Driven Intelligence",   tk: "tech_1_g2_tools", td: "Salesforce Einstein,Adobe Sensei,ChatGPT,Perplexity AI" },
      { lk: "tech_1_g3_label", ld: "Growth & Experimentation", tk: "tech_1_g3_tools", td: "Optimizely,Hotjar" },
    ],
  },
  {
    num: "02",
    Icon: ShoppingCart,
    accentClass:  "text-primary",
    accentBg:     "bg-primary/10",
    accentBorder: "border-primary/20",
    pillBg:       "bg-primary/8",
    gradFrom:     "from-primary/15",
    titleKey:      "tech_2_title",
    titleDef:      "Commerce & Business Operations",
    subtitleDef:   "Ecommerce, Finance, Workflows, and Execution Systems",
    descDef:       "This layer ensures transactions, scalability, and operational efficiency.",
    roleDef:       "This is your execution backbone — where revenue is processed and operations are optimized.",
    roleKey:       "tech_2_role",
    groups: [
      { lk: "tech_2_g1_label", ld: "Ecommerce Ecosystem",           tk: "tech_2_g1_tools", td: "Shopify Magic,Adobe Commerce,Wix eCommerce" },
      { lk: "tech_2_g2_label", ld: "ERP & Financial Systems",       tk: "tech_2_g2_tools", td: "Odoo,Zoho Books" },
      { lk: "tech_2_g3_label", ld: "Workflow & Project Management", tk: "tech_2_g3_tools", td: "ClickUp,Asana,Monday.com,Notion AI" },
      { lk: "tech_2_g4_label", ld: "AI for Operations",             tk: "tech_2_g4_tools", td: "Zapier,Make (Integromat),UiPath" },
    ],
  },
  {
    num: "03",
    Icon: Cpu,
    accentClass:  "text-primary",
    accentBg:     "bg-primary/10",
    accentBorder: "border-primary/20",
    pillBg:       "bg-primary/8",
    gradFrom:     "from-primary/15",
    titleKey:      "tech_3_title",
    titleDef:      "Creative, AI & Digital Infrastructure",
    subtitleDef:   "Content Creation, AI Production, and Technical Foundations",
    descDef:       "This layer powers content, experience, and scalability.",
    roleDef:       "This is your innovation layer — where brand, AI, and scalability intersect.",
    roleKey:       "tech_3_role",
    groups: [
      { lk: "tech_3_g1_label", ld: "Design & Creative Tools",        tk: "tech_3_g1_tools", td: "Figma,Adobe Creative Suite,Canva,Blender,Lottie" },
      { lk: "tech_3_g2_label", ld: "AI Content & Media Generation",  tk: "tech_3_g2_tools", td: "Midjourney,Runway,Synthesia,Jasper,Writesonic" },
      { lk: "tech_3_g3_label", ld: "AI & Cloud Infrastructure",      tk: "tech_3_g3_tools", td: "OpenAI API,AWS,Google Cloud AI,Microsoft Azure AI,Infobip" },
      { lk: "tech_3_g4_label", ld: "Emerging AI Stack",              tk: "tech_3_g4_tools", td: "LangChain,Pinecone,Replicate" },
    ],
  },
] as const;

/* ─── Component ─── */
const TechStackSection = () => {
  const { get } = useSiteContent();

  return (
    <section className="relative py-8 md:py-12 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-10 md:mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
            {get("tech_subtitle", "Our Tech Stack")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            {get("tech_headline", "Integrated Solutions. Proven Tools.")}
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            {get("tech_desc", "Three intelligent layers — each purpose-built to cover a critical domain of your digital operation.")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-5"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
        >
          {CATEGORIES.map((cat) => {
            const title = get(cat.titleKey, cat.titleDef);
            const role  = get(cat.roleKey,  cat.roleDef);

            return (
              <motion.div
                key={cat.num}
                variants={cardFadeUp}
                className="relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden"
              >
                {/* accent top line */}
                <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${cat.gradFrom} via-transparent to-transparent`} />

                <div className="flex flex-col flex-1 p-5 gap-4">

                  {/* Card header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cat.accentBg} border ${cat.accentBorder}`}>
                      <cat.Icon className={`w-4 h-4 ${cat.accentClass}`} />
                    </div>
                    <span className={`text-3xl font-display font-bold leading-none ${cat.accentClass} opacity-25 select-none`}>{cat.num}</span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-foreground leading-snug">{title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">({cat.subtitleDef})</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{cat.descDef}</p>
                  </div>

                  <div className="w-full h-px bg-border/50" />

                  {/* Sub-groups */}
                  <div className="flex flex-col gap-3 flex-1">
                    {cat.groups.map((g) => {
                      const label = get(g.lk, g.ld);
                      const tools = get(g.tk, g.td).split(/[,\n]/).map((s: string) => s.trim()).filter(Boolean);
                      return (
                        <div key={g.tk}>
                          <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${cat.accentClass}`}>{label}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {tools.map((tool: string) => (
                              <span
                                key={tool}
                                className={`px-2 py-1 text-[11px] rounded-md border ${cat.accentBorder} ${cat.accentBg} ${cat.accentClass} font-medium`}
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="w-full h-px bg-border/50" />

                  {/* Strategic role */}
                  <div className={`rounded-lg border ${cat.accentBorder} ${cat.accentBg} px-3 py-2.5`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <ArrowRight className={`w-3 h-3 ${cat.accentClass}`} />
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${cat.accentClass}`}>Strategic Role</span>
                    </div>
                    <p className="text-[11px] text-foreground leading-relaxed">{role}</p>
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
