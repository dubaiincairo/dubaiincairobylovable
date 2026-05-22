import { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Hotel,
  ChevronLeft,
  ChevronRight,
  Info,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import PageTransition from "@/components/PageTransition";
import { useContactModal } from "@/context/ContactModalContext";
import { useSiteContent } from "@/hooks/useSiteContent";
import { cn } from "@/lib/utils";
import { fadeUp, scaleIn, viewportOnce, useMotionPref } from "@/lib/animations";
import { chapters, type Block } from "@/lib/hospitalityApiContent";

// Canva "watch" presentation embedded as the page's hero video.
const CANVA_EMBED = "https://www.canva.com/design/DAHKZe1a-PY/DUVo6Oljvl8yj2okEmEDVg/watch?embed";
const CANVA_LINK = "https://www.canva.com/design/DAHKZe1a-PY/DUVo6Oljvl8yj2okEmEDVg/watch";

const CALLOUTS = {
  note: { Icon: Info, box: "border-border bg-muted/40", accent: "text-muted-foreground", label: "Note" },
  tip: { Icon: Lightbulb, box: "border-primary/30 bg-primary/[0.07]", accent: "text-primary", label: "Tip" },
  warning: { Icon: AlertTriangle, box: "border-amber-500/30 bg-amber-500/[0.09]", accent: "text-amber-400", label: "Warning" },
  important: { Icon: AlertCircle, box: "border-red-500/30 bg-red-500/[0.09]", accent: "text-red-400", label: "Important" },
} as const;

// Renders `inline code` spans (backtick-delimited) inside otherwise-plain text.
function renderInline(text: string) {
  return text.split("`").map((seg, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[0.82em] text-primary">
        {seg}
      </code>
    ) : (
      <Fragment key={i}>{seg}</Fragment>
    ),
  );
}

const BlockView = ({ block }: { block: Block }) => {
  switch (block.kind) {
    case "section":
      return (
        <h3 className="mt-9 flex items-center gap-3 font-display text-lg font-semibold text-foreground first:mt-0 md:text-xl">
          <span aria-hidden="true" className="h-5 w-1 shrink-0 rounded-full bg-primary" />
          {renderInline(block.text)}
        </h3>
      );
    case "subheading":
      return (
        <h4 className="mt-6 font-display text-[0.95rem] font-semibold text-foreground">
          {renderInline(block.text)}
        </h4>
      );
    case "text":
      return <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{renderInline(block.text)}</p>;
    case "list":
      return block.ordered ? (
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:font-semibold marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table
            className={cn(
              "w-full border-collapse text-sm",
              block.headers.length >= 3 && "min-w-[36rem]",
            )}
          >
            <thead>
              <tr className="bg-muted/50">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border/60 even:bg-muted/20">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        "px-4 py-2.5 align-top",
                        ci === 0 ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      const { Icon, box, accent, label } = CALLOUTS[block.tone];
      return (
        <div className={cn("mt-4 flex gap-3 rounded-xl border p-4", box)}>
          <Icon className={cn("h-5 w-5 shrink-0", accent)} />
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className={cn("font-semibold", accent)}>{label}: </span>
            {renderInline(block.text)}
          </p>
        </div>
      );
    }
    case "code":
      return (
        <div className="mt-4">
          {block.label && (
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {block.label}
            </div>
          )}
          <pre className="overflow-x-auto rounded-xl border border-border bg-background p-4 text-xs leading-relaxed">
            <code className="font-mono text-foreground/85">{block.code}</code>
          </pre>
        </div>
      );
    default:
      return null;
  }
};

const HospitalityApi = () => {
  const { openContactModal } = useContactModal();
  const { get } = useSiteContent();
  const { shouldReduce } = useMotionPref();
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "Hospitality Financial Connector — Any PMS to Odoo 19 | Dubai in Cairo",
    description:
      "An automated financial connector that bridges any hotel PMS to Odoo 19 Accounting — real-time invoicing, payments, reconciliation, and e-invoicing readiness, with full multi-property support.",
    canonical: "/hospitalityapi",
  });

  const videoTitle = get("hosp_video_title", "User Guide: New Hospitality Dashboard");

  const stats = [
    { value: get("hosp_stat_1_value", "10×"), label: get("hosp_stat_1_label", "Faster month-end close") },
    { value: get("hosp_stat_2_value", "99.9%"), label: get("hosp_stat_2_label", "Posting accuracy") },
    { value: get("hosp_stat_3_value", "24/7"), label: get("hosp_stat_3_label", "Automated, always-on sync") },
    { value: get("hosp_stat_4_value", "100%"), label: get("hosp_stat_4_label", "Hands-off once it is live") },
  ];

  const badges = [
    get("hosp_badge_1", "Odoo 19 module"),
    get("hosp_badge_2", "Works with any PMS"),
    get("hosp_badge_3", "One-way automated sync"),
    get("hosp_badge_4", "Multi-property ready"),
  ];

  const active = chapters[activeIndex];
  const ActiveIcon = active.icon;

  const selectChapter = (i: number) => {
    setActiveIndex(i);
    contentRef.current?.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <PageTransition>
      <main id="main-content">

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-6 pt-24 md:pb-8 md:pt-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
          </div>
          <div className="relative mx-auto max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <Link
                to="/"
                className="mb-6 -ml-1 inline-flex min-h-[44px] items-center gap-2 px-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> {get("hosp_back_link", "Back to Home")}
              </Link>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Hotel className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  {get("hosp_hero_eyebrow", "Hospitality Financial Connector")}
                </span>
              </div>

              <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-6xl">
                {get("hosp_hero_headline_1", "Connect Any PMS")}
                <br />
                <span className="text-gradient-gold">
                  {get("hosp_hero_headline_2", "to Odoo 19 Accounting")}
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {get(
                  "hosp_hero_desc",
                  "An automated financial connector that pushes every reservation, payment, and charge from your hotel's PMS straight into Odoo 19 Accounting — accurate, real-time, and audit-ready, whatever system your front desk runs. Watch the overview, then explore exactly how it works below.",
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Hero video */}
        <section className="relative px-6 pb-6 md:pb-10">
          <div className="mx-auto max-w-5xl">
            <motion.div
              className="relative"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-2xl">
                <div style={{ position: "relative", width: "100%", height: 0, paddingTop: "65.034%" }}>
                  <iframe
                    loading="lazy"
                    title={videoTitle}
                    src={CANVA_EMBED}
                    allow="fullscreen"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              </div>
              <p className="relative mt-4 text-center text-sm text-muted-foreground">
                <a
                  href={CANVA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {videoTitle}
                </a>{" "}
                — {get("hosp_video_credit", "by Abdalla H. Elfouly")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stat strip */}
        <section className="px-6 pb-6 md:pb-10">
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {stats.map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-card px-4 py-5 text-center">
                <div className="font-display text-2xl font-bold text-gradient-gold md:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Dashboard */}
        <section id="manual" className="px-6 pb-14">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="mb-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {get("hosp_manual_eyebrow", "How It Works")}
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                {get("hosp_manual_headline_1", "Explore the connector,")}{" "}
                <span className="text-gradient-gold">
                  {get("hosp_manual_headline_2", "chapter by chapter")}
                </span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {get(
                  "hosp_manual_desc",
                  "Pick a topic from the panel for the full detail — architecture, accounting logic, deployment, security, and day-to-day operations.",
                )}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {badges.map((m, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8 lg:items-start">
              {/* Side panel */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="relative lg:rounded-2xl lg:border lg:border-border lg:bg-card lg:p-3">
                  <p className="hidden px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:block">
                    Chapters
                  </p>
                  <nav
                    aria-label="Manual chapters"
                    className="flex gap-2 overflow-x-auto pb-2 lg:max-h-[calc(100vh-9rem)] lg:flex-col lg:gap-1 lg:overflow-x-visible lg:overflow-y-auto lg:pb-0"
                  >
                    {chapters.map((ch, i) => {
                      const isActive = i === activeIndex;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => selectChapter(i)}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "group flex shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all lg:w-full lg:shrink",
                            isActive
                              ? "border-primary/40 bg-primary/10"
                              : "border-border bg-card hover:border-primary/25 hover:bg-muted/40 lg:bg-transparent",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-display text-xs font-bold",
                              isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                            )}
                          >
                            {ch.number}
                          </span>
                          <span
                            className={cn(
                              "whitespace-nowrap text-sm font-medium lg:whitespace-normal",
                              isActive
                                ? "text-foreground"
                                : "text-muted-foreground group-hover:text-foreground",
                            )}
                          >
                            {ch.title}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                  {/* Scroll cue: fade the right edge so the chapter strip reads as scrollable on mobile. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-2 right-0 top-0 w-12 bg-gradient-to-l from-background to-transparent lg:hidden"
                  />
                </div>
              </aside>

              {/* Content panel */}
              <div ref={contentRef} className="min-w-0 scroll-mt-24">
                <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 md:p-9">
                  <div className="flex items-start gap-4">
                    <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 sm:flex">
                      <ActiveIcon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Chapter {active.number} of {chapters.length}
                      </span>
                      <h3 className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">
                        {active.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{active.summary}</p>
                    </div>
                  </div>

                  <div className="my-6 h-px bg-border" />

                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduce ? 0 : 0.3 }}
                  >
                    {active.blocks.map((block, i) => (
                      <BlockView key={i} block={block} />
                    ))}
                  </motion.div>

                  {/* Prev / Next */}
                  <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-stretch sm:justify-between">
                    {activeIndex > 0 ? (
                      <button
                        type="button"
                        onClick={() => selectChapter(activeIndex - 1)}
                        className="group flex w-full items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/30 hover:bg-muted/40 sm:w-auto"
                      >
                        <ChevronLeft className="h-4 w-4 shrink-0 text-primary" />
                        <span className="min-w-0">
                          <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                            Previous
                          </span>
                          <span className="block truncate text-sm font-medium text-foreground">
                            {chapters[activeIndex - 1].title}
                          </span>
                        </span>
                      </button>
                    ) : (
                      <span />
                    )}
                    {activeIndex < chapters.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => selectChapter(activeIndex + 1)}
                        className="group flex w-full items-center justify-end gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-right transition-colors hover:border-primary/30 hover:bg-muted/40 sm:w-auto"
                      >
                        <span className="min-w-0">
                          <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                            Next
                          </span>
                          <span className="block truncate text-sm font-medium text-foreground">
                            {chapters[activeIndex + 1].title}
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-primary" />
                      </button>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card px-8 py-10 md:flex-row">
              <div>
                <h3 className="mb-1 font-display text-xl font-bold text-foreground">
                  {get("hosp_cta_title", "Want this integration for your property?")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {get(
                    "hosp_cta_desc",
                    "Tell us which PMS you run and we'll map the full accounting flow into Odoo.",
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={openContactModal}
                className="shimmer-btn glow-gold shrink-0 rounded-xl bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                {get("hosp_cta_btn", "Book an Integration Call")}
              </button>
            </div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
};

export default HospitalityApi;
