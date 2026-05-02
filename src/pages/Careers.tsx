import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, Mail, Briefcase, Globe, TrendingUp, Cpu } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyModal from "@/components/ApplyModal";

type Job = {
  id: string;
  title: string;
  role_overview: string | null;
  responsibilities: string | null;
  requirements: string | null;
  notes: string | null;
  experience: string | null;
  sort_order: number | null;
};

const WHY_ICONS = [Globe, Cpu, TrendingUp, Briefcase];

const parseList = (text: string | null): string[] => {
  if (!text) return [];
  return text
    .split("\n")
    .map((s) => s.trim().replace(/^[-•*▸]\s*/, ""))
    .filter(Boolean);
};

const Careers = () => {
  const { get } = useSiteContent();
  const [jobs, setJobs] = useState<Job[]>([]);

  useSEO({
    title: "Careers at Dubai in Cairo — Join Our Team in Egypt",
    description: "Explore job opportunities at Dubai in Cairo, Cairo's leading digital marketing agency. We're hiring talented marketers, designers, developers, and strategists passionate about driving real results.",
    canonical: "/careers",
  });
  const [loading, setLoading] = useState(true);
  const [applyJob, setApplyJob] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    supabase
      .from("job_listings")
      .select(
        "id,title,role_overview,responsibilities,requirements,notes,experience,sort_order"
      )
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) setJobs(data as Job[]);
        setLoading(false);
      });
  }, []);

  const applyEmail = get("careers_apply_email", "careers@dubaicairo.com");
  const applySubject = get("careers_apply_subject", "[Position Title] – Your Name");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 70%)" }}
        />
        <div className="relative max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              {get("careers_hero_badge", "We're Hiring")}
            </span>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
              {get("careers_hero_headline_1", "Build the Future of")}
              <br />
              <span className="text-gradient-gold">
                {get("careers_hero_headline_2", "Marketing with AI")}
              </span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mb-8 leading-relaxed">
              {get("careers_hero_body", "At Dubai in Cairo, we don't just deliver marketing solutions — we engineer growth using data, creativity, and AI-powered innovation.")}
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/30 text-primary/80 bg-primary/5">
                {get("careers_hero_pill_1", "✦ AUS Graduates Preferred")}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/30 text-primary/80 bg-primary/5">
                {get("careers_hero_pill_2", "✦ Gulf Experience Required")}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Join ─────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-10 md:py-12">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("careers_why_badge", "Why Dubai in Cairo")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              {get("careers_why_headline", "More Than a Job.")}{" "}
              <span className="text-gradient-gold">
                {get("careers_why_headline_accent", "A Career Accelerator.")}
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {WHY_ICONS.map((Icon, i) => (
              <motion.div
                key={i}
                variants={cardFadeUp}
                className="glass-card gradient-border rounded-xl p-5 hover-lift"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-1.5">
                  {get(`careers_why_${i + 1}_title`, ["Regional & International Brands", "AI-First Culture", "Real Career Growth", "Cutting-Edge Toolkit"][i])}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {get(`careers_why_${i + 1}_desc`, [
                    "Work on campaigns that reach audiences across the Middle East and beyond.",
                    "We deploy AI tools across every workflow — you'll work at the frontier of marketing technology.",
                    "High-growth environment with mentorship, real ownership, and tangible progression paths.",
                    "Access to the latest marketing, analytics, and creative technology platforms.",
                  ][i])}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Open Positions ───────────────────────────────────────────────── */}
      <section className="relative px-6 pb-12">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("careers_jobs_badge", "Open Positions")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              {get("careers_jobs_headline", "Find Your Role")}
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              {get("careers_jobs_subtext", "Click any position to view full details")}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-xl text-muted-foreground">
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No open positions at the moment.</p>
              <p className="text-xs mt-1">
                Check back soon or send your CV to{" "}
                <a href={`mailto:${applyEmail}`} className="text-primary hover:underline">
                  {applyEmail}
                </a>
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <AccordionPrimitive.Root type="single" collapsible className="space-y-3">
                {jobs.map((job, i) => (
                  <motion.div key={job.id} variants={cardFadeUp}>
                    <AccordionPrimitive.Item
                      value={job.id}
                      className="glass-card rounded-xl overflow-hidden border border-border data-[state=open]:border-primary/40 transition-colors duration-300"
                    >
                      {/* ── Row: number · trigger · apply button ── */}
                      <AccordionPrimitive.Header className="flex items-center gap-3 px-5 py-4">
                        <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-bold font-display flex items-center justify-center">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <AccordionPrimitive.Trigger className="flex-1 flex items-center justify-between gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg [&[data-state=open]_.job-title]:text-primary [&[data-state=open]>svg]:rotate-180 cursor-pointer py-0.5">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="job-title font-display font-semibold text-sm md:text-base text-foreground transition-colors duration-200">
                                {job.title}
                              </span>
                              {job.experience && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary text-secondary-foreground shrink-0">
                                  {job.experience}
                                </span>
                              )}
                            </div>
                            {job.notes && (
                              <p className="text-[11px] text-primary/60 mt-0.5 font-medium">
                                {job.notes}
                              </p>
                            )}
                          </div>
                          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300" />
                        </AccordionPrimitive.Trigger>

                        {/* Apply Now — sibling to trigger */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setApplyJob({ id: job.id, title: job.title });
                          }}
                          className="shrink-0 px-4 py-2 bg-primary text-primary-foreground font-display font-semibold text-xs rounded-lg hover:brightness-110 transition-all shimmer-btn hidden sm:inline-flex items-center gap-1.5"
                        >
                          Apply Now
                        </button>
                      </AccordionPrimitive.Header>

                      {/* ── Expanded content ── */}
                      <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className="px-5 pb-6 pt-0 border-t border-border/60 space-y-5">
                          {job.role_overview && (
                            <div className="mt-4">
                              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-2">
                                Role Overview
                              </h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {job.role_overview}
                              </p>
                            </div>
                          )}

                          {parseList(job.responsibilities).length > 0 && (
                            <div>
                              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-2">
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-1.5">
                                {parseList(job.responsibilities).map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                                    <span className="text-primary mt-0.5 shrink-0 text-xs">▸</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {parseList(job.requirements).length > 0 && (
                            <div>
                              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-2">
                                Requirements
                              </h4>
                              <ul className="space-y-1.5">
                                {parseList(job.requirements).map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                                    <span className="text-primary mt-0.5 shrink-0 text-xs">▸</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Preferred Qualifications */}
                          <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-1.5">
                              {get("careers_pref_title", "Preferred Qualifications")}
                            </h4>
                            <ul className="space-y-1">
                              <li className="flex items-start gap-2 text-muted-foreground text-xs">
                                <span className="text-primary shrink-0">✦</span>
                                {get("careers_pref_1", "AUS graduates are preferred")}
                              </li>
                              <li className="flex items-start gap-2 text-muted-foreground text-xs">
                                <span className="text-primary shrink-0">✦</span>
                                {get("careers_pref_2", "Gulf experience is a must")}
                              </li>
                            </ul>
                          </div>

                          {/* Mobile Apply button */}
                          <div className="sm:hidden pt-1">
                            <button
                              onClick={() => setApplyJob({ id: job.id, title: job.title })}
                              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-lg hover:brightness-110 transition-all"
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </AccordionPrimitive.Content>
                    </AccordionPrimitive.Item>
                  </motion.div>
                ))}
              </AccordionPrimitive.Root>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── How to Apply CTA ─────────────────────────────────────────────── */}
      <section className="relative px-6 pb-14">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="rounded-2xl border border-border/60 p-8 md:p-12 text-center"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 50%, hsl(38 80% 55% / 0.06), transparent 70%), hsl(var(--card))",
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
              {get("careers_apply_badge", "How to Apply")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              {get("careers_apply_headline", "Ready to Join Us?")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              {get("careers_apply_body", "Send your CV and portfolio (if applicable) to our careers inbox. Include the position title and your name in the subject line.")}
            </p>

            <a
              href={`mailto:${applyEmail}?subject=Application – ${applySubject}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:brightness-110 transition-all glow-gold shimmer-btn text-sm"
            >
              <Mail className="w-4 h-4" />
              {applyEmail}
            </a>

            <p className="text-xs text-muted-foreground mt-5">
              Subject line:{" "}
              <span className="text-foreground font-mono bg-secondary px-2 py-0.5 rounded">
                {applySubject}
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Apply Modal ──────────────────────────────────────────────────── */}
      {applyJob && (
        <ApplyModal
          jobId={applyJob.id}
          jobTitle={applyJob.title}
          onClose={() => setApplyJob(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Careers;
