import { motion } from "framer-motion";

const categories = [
  { label: "Operations & Quality", tools: ["Calendly", "Asana", "Monday.com", "Zoho Books", "Timely"] },
  { label: "Marketing & Analytics", tools: ["SEMrush", "Google Analytics", "HubSpot", "Hotjar", "Mailchimp", "Metricool"] },
  { label: "eCommerce", tools: ["Shopify", "WooCommerce", "Salesforce"] },
  { label: "AI Tools", tools: ["Midjourney", "DALL·E", "Jasper", "Runway", "Synthesia", "Notion", "Writesonic"] },
  { label: "Infrastructure", tools: ["AWS", "GoDaddy", "Infobip", "SurveyMonkey"] },
];

const TechStackSection = () => (
  <section className="py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">Our Tech Stack</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          Integrated Solutions. <span className="text-gradient-gold">Proven Tools.</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            className={`p-6 rounded-xl border border-border bg-card/50 ${i === categories.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="font-display font-semibold text-sm text-primary mb-4 tracking-wide uppercase">{cat.label}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.tools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStackSection;
