import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { Copy, Check, MapPin, Landmark, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fadeUp, cardFadeUp, viewportOnce } from "@/lib/animations";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCarouselSwipeHint } from "@/hooks/useCarouselSwipeHint";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { useSiteContent } from "@/hooks/useSiteContent";
import { RichText } from "@/components/ui/rich-text";

// ── Type ──────────────────────────────────────────────────────────────────────

type BankAccount = {
  id: string;
  title: string;
  abbr: string | null;
  branch: string | null;
  account_number: string | null;
  iban: string | null;
  currencies: string | null; // comma-separated e.g. "USD,EGP"
  sort_order: number | null;
};

// ── Copy field ────────────────────────────────────────────────────────────────

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
  const { get } = useSiteContent();
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  useCarouselSwipeHint(api, carouselRef);
  const { ref: sectionRef, headerY, headerOpacity, orbY, orbScale } = useSectionParallax();

  const accountLabel = get("bank_account_label", "Account Number — Companies");
  const ibanLabel = get("bank_iban_label", "IBAN");

  useEffect(() => {
    supabase
      .from("bank_accounts")
      .select("id,title,abbr,branch,account_number,iban,currencies,sort_order")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) setBanks(data as BankAccount[]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section ref={sectionRef as RefObject<HTMLElement>} id="bank-accounts" className="relative py-6 md:py-10 px-6 overflow-hidden">

      {/* Ambient radial glow — scroll parallax */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
        <motion.div
          className="w-full h-full rounded-full"
          style={{ y: orbY, scale: orbScale, background: "radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-6 md:mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("bank_subtitle", "Payment & Banking")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 whitespace-pre-line">
            {get("bank_headline", "Bank Account Details")}
          </h2>
          <RichText
            html={get(
              "bank_description",
              "All accounts are registered under Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC — Arab Republic of Egypt.",
            )}
            className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed"
          />
        </motion.div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && banks.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border rounded-xl text-muted-foreground">
            <p className="text-sm">{get("bank_empty_state", "No bank accounts available at the moment.")}</p>
          </div>
        )}

        {/* ── Bank cards ── */}
        {!loading && banks.length > 0 && (
          <>
            {/* Mobile / tablet: peek carousel */}
            <div ref={carouselRef} className="lg:hidden">
              <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
                <CarouselContent className="-ml-4">
                  {banks.map((bank) => {
                    const currencyList = (bank.currencies || "")
                      .split(",").map((c) => c.trim()).filter(Boolean);
                    return (
                      <CarouselItem key={bank.id} className="pl-4 basis-[85%] sm:basis-1/2">
                        <motion.div
                          variants={cardFadeUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={viewportOnce}
                          className="group glass-card gradient-border rounded-xl p-6 hover-lift flex flex-col gap-5 h-full"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-12">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            {currencyList.length > 0 && (
                              <div className="flex gap-1.5 mt-1 shrink-0">
                                {currencyList.map((c) => (
                                  <span key={c} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-primary/25 text-primary/80 bg-primary/5">{c}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div>
                            {bank.abbr && <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/70 mb-1 block">{bank.abbr}</span>}
                            <h3 className="text-lg font-display font-semibold text-foreground leading-snug">{bank.title}</h3>
                            {bank.branch && (
                              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3 text-primary/60 shrink-0" /><span>{bank.branch}</span>
                              </div>
                            )}
                          </div>
                          <div className="h-px bg-border/60" />
                          <div className="flex flex-col gap-4">
                            {bank.account_number && <CopyField label={accountLabel} value={bank.account_number} />}
                            {bank.iban && <CopyField label={ibanLabel} value={bank.iban} />}
                          </div>
                        </motion.div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-4" />
                <CarouselNext className="hidden sm:flex -right-4" />
              </Carousel>
              {banks.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {banks.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => api?.scrollTo(i)}
                      className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-muted-foreground"}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: static 3-column grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {banks.map((bank) => {
                const currencyList = (bank.currencies || "")
                  .split(",").map((c) => c.trim()).filter(Boolean);
                return (
                  <motion.div
                    key={bank.id}
                    variants={cardFadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="group glass-card gradient-border rounded-xl p-6 hover-lift flex flex-col gap-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-12">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      {currencyList.length > 0 && (
                        <div className="flex gap-1.5 mt-1 shrink-0">
                          {currencyList.map((c) => (
                            <span key={c} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-primary/25 text-primary/80 bg-primary/5">{c}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      {bank.abbr && <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/70 mb-1 block">{bank.abbr}</span>}
                      <h3 className="text-lg font-display font-semibold text-foreground leading-snug">{bank.title}</h3>
                      {bank.branch && (
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 text-primary/60 shrink-0" /><span>{bank.branch}</span>
                        </div>
                      )}
                    </div>
                    <div className="h-px bg-border/60" />
                    <div className="flex flex-col gap-4">
                      {bank.account_number && <CopyField label="Account Number — Companies" value={bank.account_number} />}
                      {bank.iban && <CopyField label="IBAN" value={bank.iban} />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Footer note ── */}
        {!loading && banks.length > 0 && (
          <motion.div
            className="flex items-center justify-center gap-2 mt-10 text-sm text-muted-foreground"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <Landmark className="w-4 h-4 text-primary/60 shrink-0" />
            <span>
              {get("bank_footer_note", "For wire transfers, always include the IBAN and specify the transfer currency.")}
            </span>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default BankAccountsSection;
