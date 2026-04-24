import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, MapPin, Landmark, Building2 } from "lucide-react";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

// ── Data ──────────────────────────────────────────────────────────────────────

const banks = [
  {
    abbr: "AAIB",
    name: "Arab African International Bank",
    branch: "Arkan Plaza Branch — Sheikh Zayed",
    account: "1144817810010201",
    iban: "EG730057028001144817810010201",
    currencies: ["USD", "EGP"],
  },
  {
    abbr: "NBE",
    name: "National Bank of Egypt",
    branch: "Smart Village Branch — 6th of October",
    account: "1923071255410401013",
    iban: "EG410003019230712554104010130",
    currencies: ["USD", "EGP"],
  },
  {
    abbr: "CIB",
    name: "Commercial International Bank",
    branch: "Arkan Plaza Branch — Sheikh Zayed",
    account: "100059074754",
    iban: "EG160010026000000100059074754",
    currencies: ["USD"],
  },
];

// ── Copy button ───────────────────────────────────────────────────────────────

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
        {label}
      </p>
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-between gap-3 bg-secondary/60 hover:bg-secondary border border-border/60 hover:border-primary/30 rounded-lg px-3 py-2.5 transition-all duration-200 group text-left"
      >
        <span className="font-mono text-xs font-medium text-foreground tracking-wide break-all leading-relaxed">
          {value}
        </span>
        <span className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center bg-background/60 border border-border/60 group-hover:border-primary/40 group-hover:text-primary transition-colors">
          {copied
            ? <Check className="w-3 h-3 text-primary" />
            : <Copy className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
          }
        </span>
      </button>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

const BankAccountsSection = () => {
  return (
    <section id="bank-accounts" className="relative py-8 md:py-20 px-6 overflow-hidden">

      {/* Ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-6 md:mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            Payment & Banking
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 whitespace-pre-line">
            Bank Account Details
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            All accounts are registered under{" "}
            <span className="text-foreground font-medium">
              Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC
            </span>{" "}
            — Arab Republic of Egypt.
          </p>
        </motion.div>

        {/* ── Bank cards ── */}
        <motion.div
          className="grid md:grid-cols-3 gap-5 lg:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {banks.map((bank, i) => (
            <motion.div
              key={i}
              variants={cardFadeUp}
              className="group glass-card gradient-border rounded-xl p-6 hover-lift flex flex-col gap-5"
            >

              {/* Bank header */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-12">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex gap-1.5 mt-1 shrink-0">
                  {bank.currencies.map((c) => (
                    <span
                      key={c}
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-primary/25 text-primary/80 bg-primary/5"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bank identity */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/70 mb-1 block">
                  {bank.abbr}
                </span>
                <h3 className="text-base font-display font-semibold text-foreground leading-snug">
                  {bank.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 text-primary/60 shrink-0" />
                  <span>{bank.branch}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/60" />

              {/* Account fields */}
              <div className="flex flex-col gap-4">
                <CopyField label="Account Number — Companies" value={bank.account} />
                <CopyField label="IBAN" value={bank.iban} />
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* ── Footer note ── */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-10 text-sm text-muted-foreground"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Landmark className="w-4 h-4 text-primary/60 shrink-0" />
          <span>
            For wire transfers, always include the IBAN and specify the transfer currency.
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default BankAccountsSection;
