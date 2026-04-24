import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, MapPin, Landmark } from "lucide-react";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

const banks = [
  {
    nameAr: "البنك العربي الإفريقي الدولي",
    nameEn: "Arab African International Bank",
    abbr: "AAIB",
    branchAr: "فرع أركان بلازا – الشيخ زايد",
    branchEn: "Arkan Plaza – Sheikh Zayed",
    account: "1144817810010201",
    iban: "EG730057028001144817810010201",
    currencies: ["USD", "EGP"],
  },
  {
    nameAr: "البنك الأهلي المصري",
    nameEn: "National Bank of Egypt",
    abbr: "NBE",
    branchAr: "فرع القرية الذكية – السادس من أكتوبر",
    branchEn: "Smart Village – 6th of October",
    account: "1923071255410401013",
    iban: "EG410003019230712554104010130",
    currencies: ["USD", "EGP"],
  },
  {
    nameAr: "البنك التجاري الدولي",
    nameEn: "Commercial International Bank",
    abbr: "CIB",
    branchAr: "فرع أركان بلازا – الشيخ زايد",
    branchEn: "Arkan Plaza – Sheikh Zayed",
    account: "100059074754",
    iban: "EG160010026000000100059074754",
    currencies: ["USD"],
  },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy"
      className="ml-2 p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors shrink-0"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-primary" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

const BankAccountsSection = () => {
  return (
    <section id="bank-accounts" className="relative py-16 md:py-24 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(38 80% 55% / 0.05), transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Landmark className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
              Banking Details
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            الحسابات المصرفية
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            جمهورية مصر العربية &nbsp;·&nbsp; Arab Republic of Egypt
          </p>
        </motion.div>

        {/* Bank cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {banks.map((bank, i) => (
            <motion.div
              key={i}
              variants={cardFadeUp}
              className="glass-card gradient-border rounded-2xl p-6 hover-lift flex flex-col gap-5"
            >
              {/* Bank name */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {bank.abbr}
                  </span>
                  {/* Currency pills */}
                  <div className="flex gap-1 ml-auto">
                    {bank.currencies.map((c) => (
                      <span
                        key={c}
                        className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-secondary text-muted-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <h3
                  className="text-lg font-display font-bold text-foreground leading-snug text-right"
                  dir="rtl"
                >
                  {bank.nameAr}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{bank.nameEn}</p>
              </div>

              {/* Branch */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span dir="rtl" className="text-right leading-relaxed">
                  {bank.branchAr}
                  <br />
                  <span className="text-[11px] opacity-70">{bank.branchEn}</span>
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/60" />

              {/* Account number */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                  Account No. <span className="text-primary/60">(شركات)</span>
                </p>
                <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                  <span className="font-mono text-sm font-semibold text-foreground tracking-wide">
                    {bank.account}
                  </span>
                  <CopyButton value={bank.account} />
                </div>
              </div>

              {/* IBAN */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                  IBAN
                </p>
                <div className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2 gap-2">
                  <span className="font-mono text-xs text-foreground tracking-wide break-all leading-relaxed">
                    {bank.iban}
                  </span>
                  <CopyButton value={bank.iban} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          All accounts are registered under{" "}
          <span className="text-foreground font-medium">
            Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC
          </span>
          . For transfers, use the IBAN and specify the currency clearly.
        </motion.p>

      </div>
    </section>
  );
};

export default BankAccountsSection;
