import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  Eye,
  Database,
  Lock,
  Share2,
  Clock,
  UserCheck,
  Cookie,
  Mail,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useSEO } from "@/hooks/useSEO";
import { fadeUp, staggerContainer, cardFadeUp, viewportOnce } from "@/lib/animations";

/* ─────────────────────────────────────────────────────── */

const LAST_UPDATED = "13 May 2025";

const SECTIONS = [
  {
    id: "who-we-are",
    Icon: Shield,
    title: "Who We Are",
    body: [
      "This Privacy Policy applies to Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC (\"Dubai in Cairo\", \"we\", \"our\", or \"us\"), registered under Commercial Registration No. 163772 issued by the General Authority for Investment and Free Zones in Cairo, with registered offices at 100 Al-Mirgani Street, Abu Dhabi Bank Tower, 1st Floor, Heliopolis, Cairo, Egypt.",
      "We operate the website dubaiincairo.com and all subdomains and pages associated with it (the \"Site\"). This Policy explains what personal data we collect, why we collect it, how we use it, and what rights you have in relation to it.",
      "If you have any questions about this Policy or our data practices, the right place to start is info@dubaiincairo.com. We will respond within five business days.",
    ],
  },
  {
    id: "data-we-collect",
    Icon: Database,
    title: "Data We Collect",
    body: [
      "We collect only the data we actually need. The categories below cover everything we may receive, depending on how you interact with the Site.",
      "Contact and enquiry data: when you fill out our contact form, send us an email, or message us via WhatsApp Business, we receive your name, email address, phone number (if provided), company name (if provided), and the content of your message.",
      "Analytics data: we use privacy-respecting analytics to understand how visitors navigate the Site. This includes pages visited, time on site, referral source, approximate geographic region (country or city level only), device type, and browser type. We do not track individual users across sessions without consent.",
      "Cookie and technical data: when you visit the Site, your browser automatically sends certain technical information — IP address, browser version, operating system, and the time of your visit. We store this in aggregated, anonymised form only.",
      "Voluntarily submitted data: if you apply for a job, register for an event, or download a resource, we collect only the fields you complete in that specific form.",
    ],
  },
  {
    id: "how-we-use-it",
    Icon: Eye,
    title: "How We Use Your Data",
    body: [
      "We use data for defined purposes and do not repurpose it without telling you first.",
      "To respond to enquiries and proposals: when you contact us, we use your details to reply, prepare a proposal if relevant, and manage our client relationship if you choose to work with us.",
      "To improve the Site: anonymised analytics help us understand which pages are useful, where visitors get lost, and how the Site performs across devices. We use this to make editorial and technical improvements.",
      "To send relevant communications: if you have opted in, we may send you updates about our services, case studies, or industry commentary. Every email includes a one-click unsubscribe link. We do not send unsolicited marketing.",
      "To meet legal obligations: in limited circumstances we may be required to process or disclose data to comply with Egyptian law, a court order, or a request from a regulatory authority.",
    ],
  },
  {
    id: "cookies",
    Icon: Cookie,
    title: "Cookies & Tracking",
    body: [
      "Cookies are small text files stored on your device when you visit a website. We use two types.",
      "Essential cookies are required for the Site to function correctly. They manage your session, remember your cookie consent choice, and ensure forms work. You cannot opt out of essential cookies without stopping use of the Site entirely, because they are part of its basic operation.",
      "Analytics cookies are optional. They help us understand how the Site is used at an aggregate level. We only set these after you click 'Accept All' in the cookie banner. If you click 'Decline', no analytics cookies are placed.",
      "Your consent choice is stored in your browser's localStorage under the key dic_cookie_consent. You can clear this at any time by clearing your site data, which will cause the banner to reappear on your next visit. You can also change your browser settings to block all cookies, though this may affect how the Site behaves.",
    ],
  },
  {
    id: "data-sharing",
    Icon: Share2,
    title: "Data Sharing",
    body: [
      "We do not sell your personal data. We do not share it with advertisers, data brokers, or any third party whose primary business is marketing to other people's audiences.",
      "We share data only in the following narrow circumstances: with technology service providers who help us operate the Site (hosting, email, CRM, analytics), where those providers are contractually bound to handle data only on our instructions; with professional advisers (lawyers, accountants) under confidentiality obligations when the situation requires it; and with authorities when required by applicable law.",
      "All service providers we use are evaluated for data security practices before we engage them. Data transferred outside Egypt is subject to appropriate contractual safeguards.",
    ],
  },
  {
    id: "data-retention",
    Icon: Clock,
    title: "Data Retention",
    body: [
      "We keep data only as long as it serves its original purpose or as required by law.",
      "Enquiry and contact data is retained for three years from the last meaningful interaction, after which it is deleted unless a commercial relationship is active.",
      "Client engagement data (contracts, correspondence, deliverables, invoices) is retained for seven years in line with Egyptian commercial record-keeping requirements.",
      "Analytics data is retained in aggregated, anonymised form indefinitely. No individual-level records are retained beyond 90 days.",
      "Job application data is retained for 12 months from the application date, after which it is deleted unless you are offered and accept a position.",
    ],
  },
  {
    id: "your-rights",
    Icon: UserCheck,
    title: "Your Rights",
    body: [
      "You have the right to know what data we hold about you and to receive a copy of it. Submit a written request to info@dubaiincairo.com and we will respond within 30 days.",
      "You have the right to correct inaccurate data. If something we hold is wrong, tell us and we will fix it promptly.",
      "You have the right to request deletion of your data, subject to legal retention requirements. We will acknowledge the request, explain what we can delete immediately and what must be retained, and complete the deletion within 30 days.",
      "You have the right to withdraw consent for marketing communications at any time by clicking 'Unsubscribe' in any email, or by contacting us directly. Withdrawal does not affect the lawfulness of processing that occurred before withdrawal.",
      "You have the right to object to processing based on legitimate interests. We will assess your objection and either stop the processing or explain why we believe a legitimate interest overrides it.",
      "To exercise any of these rights, email info@dubaiincairo.com with the subject line 'Privacy Request'. We will verify your identity before actioning any request that involves disclosing or deleting data.",
    ],
  },
  {
    id: "security",
    Icon: Lock,
    title: "Security",
    body: [
      "We implement technical and organisational measures proportionate to the nature of the data we hold. These include encrypted data transmission (HTTPS across the Site), access controls that limit who within our team can view personal data, and a formal process for identifying and responding to any data security incident.",
      "No transmission over the internet is guaranteed to be perfectly secure. If you believe your data has been compromised in connection with our Site, contact us immediately at info@dubaiincairo.com and we will investigate within 24 hours.",
    ],
  },
  {
    id: "contact",
    Icon: Mail,
    title: "Contact & Updates",
    body: [
      "For any questions, requests, or concerns about this Privacy Policy or our handling of your data, contact us at: info@dubaiincairo.com — or write to us at Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC, 100 Al-Mirgani Street, Abu Dhabi Bank Tower, 1st Floor, Heliopolis, Cairo, Egypt.",
      "We review and update this Policy when our data practices change materially. The 'Last Updated' date at the top of this page reflects the most recent revision. Continued use of the Site after a policy update constitutes acceptance of the revised terms.",
    ],
  },
];

/* ─────────────────────────────────────────────────────── */

const PrivacyPolicy = () => {
  useSEO({
    titleKey: "seo_privacy_title",
    descriptionKey: "seo_privacy_description",
    canonical: "/privacy",
  });

  return (
    <PageTransition>
      <main id="main-content" className="min-h-screen bg-background">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative pt-28 pb-8 md:pt-28 md:pb-10 px-6 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, hsl(38 80% 55% / 0.05), transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                  Legal
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
                Privacy Policy
              </h1>

              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-6">
                We collect only what we need, use it only for stated purposes,
                and never sell it. This document explains the specifics in plain
                language.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 text-xs text-muted-foreground">
                <Clock className="w-3 h-3 text-primary" />
                Last updated: {LAST_UPDATED}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Table of contents ─────────────────────────────── */}
        <section className="px-6 pb-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="glass-card rounded-2xl border border-border/60 p-5 md:p-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-3">
                Contents
              </p>
              <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 list-none">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                    >
                      <span className="text-[11px] font-mono text-primary/50 group-hover:text-primary/80 transition-colors w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </section>

        {/* ── Sections ──────────────────────────────────────── */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {SECTIONS.map((s, i) => (
                <motion.div
                  key={s.id}
                  id={s.id}
                  variants={cardFadeUp}
                  className="glass-card rounded-2xl border border-border/60 p-6 md:p-8 scroll-mt-24"
                >
                  {/* Section header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                      <s.Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-primary/50 block mb-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-lg md:text-xl font-display font-bold text-foreground">
                        {s.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body paragraphs */}
                  <div className="space-y-3 pl-[52px]">
                    {s.body.map((para, pi) => (
                      <p
                        key={pi}
                        className="text-muted-foreground text-sm leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Footer note ── */}
            <motion.p
              className="text-center text-xs text-muted-foreground/50 mt-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC ·
              Commercial Registration No. 163772 · Cairo, Egypt ·{" "}
              <a
                href="mailto:info@dubaiincairo.com"
                className="text-primary/60 hover:text-primary transition-colors underline underline-offset-2"
              >
                info@dubaiincairo.com
              </a>
            </motion.p>
          </div>
        </section>

      </main>
    </PageTransition>
  );
};

export default PrivacyPolicy;
