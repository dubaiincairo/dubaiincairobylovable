import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, CheckCircle, Loader2, MessageSquare, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { z } from "zod";
import { fadeUp, scaleIn, viewportOnce } from "@/lib/animations";
import AnimatedUnderline from "@/components/ui/animated-underline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COUNTRY_CODES = [
  { code: "+20",  flag: "🇪🇬", label: "Egypt" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+966", flag: "🇸🇦", label: "Saudi Arabia" },
  { code: "+965", flag: "🇰🇼", label: "Kuwait" },
  { code: "+974", flag: "🇶🇦", label: "Qatar" },
  { code: "+973", flag: "🇧🇭", label: "Bahrain" },
  { code: "+968", flag: "🇴🇲", label: "Oman" },
  { code: "+962", flag: "🇯🇴", label: "Jordan" },
  { code: "+961", flag: "🇱🇧", label: "Lebanon" },
  { code: "+249", flag: "🇸🇩", label: "Sudan" },
  { code: "+218", flag: "🇱🇾", label: "Libya" },
  { code: "+212", flag: "🇲🇦", label: "Morocco" },
  { code: "+216", flag: "🇹🇳", label: "Tunisia" },
  { code: "+213", flag: "🇩🇿", label: "Algeria" },
  { code: "+1",   flag: "🇺🇸", label: "USA/Canada" },
  { code: "+44",  flag: "🇬🇧", label: "UK" },
  { code: "+49",  flag: "🇩🇪", label: "Germany" },
  { code: "+33",  flag: "🇫🇷", label: "France" },
  { code: "+90",  flag: "🇹🇷", label: "Turkey" },
  { code: "+91",  flag: "🇮🇳", label: "India" },
  { code: "+86",  flag: "🇨🇳", label: "China" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(5, "Phone number is required").max(20),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const SERVICES = [
  "Digital Marketing",
  "ERP / Odoo",
  "eCommerce",
  "Tech Stack",
  "Partnerships",
  "Other",
];

const ContactSection = () => {
  const { toast } = useToast();
  const { get } = useSiteContent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    const fullPhone = `${countryCode} ${result.data.phone}`;
    const fullMessage = selectedService
      ? `Service interest: ${selectedService}\n\n${result.data.message}`
      : result.data.message;
    const { error } = await supabase.from("contact_submissions").insert({
      name: result.data.name, email: result.data.email, phone: fullPhone, message: fullMessage,
    });
    setIsSubmitting(false);
    if (error) { toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" }); return; }
    supabase.functions.invoke("send-notification", {
      body: { type: "contact", data: { name: result.data.name, email: result.data.email, phone: fullPhone, message: fullMessage } },
    }).catch(() => {});
    setIsSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setSelectedService("");
    setCountryCode("+20");
  };

  return (
    <section id="contact" className="relative py-8 md:py-14 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(38 80% 55% / 0.04), transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("contact_subtitle", "Get Started")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight whitespace-pre-line">
            {get("contact_headline", "Ready to Grow?\nLet's Build.")}
          </h2>
          <AnimatedUnderline align="left" className="mb-5" />
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 whitespace-pre-line">
            {get("contact_subtext", "We're committed to delivering the best digital marketing and eCommerce services with measurable impact, flexible execution, and competitive pricing.")}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span>{get("contact_trust_1", "Response within 24 hours")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <span>{get("contact_trust_2", "Free consultation call")}</span>
            </div>
          </div>
        </motion.div>

        <div>
          {isSubmitted ? (
            <motion.div variants={scaleIn} initial="hidden" animate="visible" className="flex flex-col items-center gap-4 py-16 text-center">
              <CheckCircle className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-display font-semibold">{get("contact_success_title", "Thank You!")}</h3>
              <p className="text-muted-foreground">{get("contact_success_msg", "We'll get back to you within 24 hours.")}</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                {get("contact_success_btn", "Send Another Message")}
              </Button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 80, damping: 20 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    {get("contact_name_label", "Name *")}
                  </label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder={get("contact_name_placeholder", "Your name")} className="bg-card border-border" />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    {get("contact_email_label", "Email *")}
                  </label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder={get("contact_email_placeholder", "you@company.com")} className="bg-card border-border" />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                  {get("contact_phone_label", "Phone *")}
                </label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger
                      className="w-[130px] shrink-0 bg-card border-border text-sm"
                      aria-label="Country code"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {COUNTRY_CODES.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          <span className="inline-flex items-center gap-2">
                            <span className="text-base leading-none">{c.flag}</span>
                            <span className="font-mono text-xs">{c.code}</span>
                            <span className="text-muted-foreground text-xs">{c.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={get("contact_phone_placeholder", "100 000 0000")}
                    className="bg-card border-border flex-1"
                  />
                </div>
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {get("contact_service_label", "Service of interest")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedService((prev) => (prev === s ? "" : s))}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
                        selectedService === s
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  {get("contact_message_label", "Message *")}
                </label>
                <Textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder={get("contact_message_placeholder", "Tell us about your project and goals...")} rows={5} className="bg-card border-border" />
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting} className="shimmer-btn w-full sm:w-auto px-10 py-5 text-lg font-display font-semibold glow-gold">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                {isSubmitting ? "Sending..." : get("contact_cta", "Start a Project")}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </Button>
            </motion.form>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
