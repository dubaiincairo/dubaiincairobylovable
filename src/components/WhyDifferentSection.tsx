import { motion } from "framer-motion";
import { Cpu, ListChecks, Handshake, Users, BadgeDollarSign } from "lucide-react";

const edges = [
  { icon: Cpu, title: "Unprecedented Productivity via AI", desc: "We stay ahead of every emerging AI tool — not just learning them, but deploying them in real projects to deliver better, faster results for our clients." },
  { icon: ListChecks, title: "Intelligent Task Management", desc: "Our electronic management system distributes work, tracks quality, and monitors deadlines at every stage — so nothing slips through the cracks." },
  { icon: Handshake, title: "Trusted Partner Network", desc: "We tap into a vetted network of specialists with 20+ combined years of market experience, covering every digital marketing and eCommerce discipline." },
  { icon: Users, title: "Flexible Part-Time Team Structure", desc: "Our talent model keeps costs lean while maintaining expert-level quality — so you always get more value for your investment." },
  { icon: BadgeDollarSign, title: "Competitive, Transparent Pricing", desc: "Our unique business model reduces overheads significantly — and we pass those savings directly to our clients, without compromising on quality." },
];

const WhyDifferentSection = () => (
  <section className="py-32 px-6 bg-card/50">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">Why We're Different</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          A Smarter Way to <span className="text-gradient-gold">Grow</span> Your Business Online
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {edges.map((item, i) => (
          <motion.div
            key={item.title}
            className={`group p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 ${i === edges.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-display font-semibold mb-3">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyDifferentSection;
