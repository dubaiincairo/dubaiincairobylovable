import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, CheckCircle, Loader2, MessageSquare, Clock, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { z } from "zod";
import { fadeUp, cardFadeUp, viewportOnce } from "@/lib/animations";
import AnimatedUnderline from "@/components/ui/animated-underline";
import { RichText } from "@/components/ui/rich-text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

const COUNTRY_CODES = [
  { code: "+20",  label: "Egypt" },
  { code: "+971", label: "UAE" },
  { code: "+966", label: "Saudi Arabia" },
  { code: "+965", label: "Kuwait" },
  { code: "+974", label: "Qatar" },
  { code: "+973", label: "Bahrain" },
  { code: "+968", label: "Oman" },
  { code: "+962", label: "Jordan" },
  { code: "+961", label: "Lebanon" },
  { code: "+249", label: "Sudan" },
  { code: "+218", label: "Libya" },
  { code: "+212", label: "Morocco" },
  { code: "+216", label: "Tunisia" },
  { code: "+213", label: "Algeria" },
  { code: "+1",   label: "USA" },
  { code: "+44",  label: "UK" },
  { code: "+49",  label: "Germany" },
  { code: "+33",  label: "France" },
  { code: "+90",  label: "Turkey" },
  { code: "+91",  label: "India" },
  { code: "+86",  label: "China" },
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
    <section id="contact" className="relative py-6 md:py-10 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[480px] h-[480px] rounded-full bg-primary/4 blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-start">

        {/* LEFT — left-aligned header + body + trust signals (matches About/Founder rhythm) */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
            {get("contact_subtitle", "Get Started")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight whitespace-pre-line">
            {get("contact_headline", "Ready to Grow?\nLet's Build.")}
          </h2>
          <AnimatedUnderline align="left" className="mb-5" />
          <RichText
            html={get("contact_subtext", "We're committed to delivering the best digital marketing and eCommerce services with measurable impact, flexible execution, and competitive pricing.")}
            className="text-muted-foreground text-base md:text-lg leading-relaxed"
          />

          <div className="mt-6 md:mt-7 flex flex-col gap-3">
            <div className="inline-flex items-center gap-3 text-sm text-foreground">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span>{get("contact_trust_1", "Response within 24 hours")}</span>
            </div>
            <div className="inline-flex items-center gap-3 text-sm text-foreground">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <span>{get("contact_trust_2", "Free consultation call")}</span>
            </div>
            <div className="inline-flex items-center gap-3 text-sm text-foreground">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4 text-primary" />
              </div>
              <span>{get("contact_trust_3", "Transparent pricing")}</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — form card (placed where Founder's quote card / About's process steps sit) */}
        <motion.div variants={cardFadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {isSubmitted ? (
            <div className="rounded-xl glass-card p-8 md:p-10 flex flex-col items-center gap-4 text-center">
              <CheckCircle className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-display font-semibold">{get("contact_success_title", "Thank You!")}</h3>
              <RichText
                html={get("contact_success_msg", "We'll get back to you within 24 hours.")}
                className="text-muted-foreground"
              />
              <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                {get("contact_success_btn", "Send Another Message")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-xl glass-card p-5 md:p-6 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1">
                    {get("contact_name_label", "Name *")}
                  </label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder={get("contact_name_placeholder", "Your name")} className="bg-background/60 border-border" />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1">
                    {get("contact_email_label", "Email *")}
                  </label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder={get("contact_email_placeholder", "you@company.com")} className="bg-background/60 border-border" />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-muted-foreground mb-1">
                  {get("contact_phone_label", "Phone *")}
                </label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger
                      className="w-[92px] shrink-0 bg-background/60 border-border hover:border-primary/40 data-[state=open]:border-primary/60 transition-colors"
                      aria-label={`Country code, currently ${countryCode}`}
                    >
                      <span className="font-mono text-sm tabular-nums text-foreground">{countryCode}</span>
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      sideOffset={6}
                      className="max-h-72 w-[190px] p-1.5"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <SelectPrimitive.Item
                          key={c.code}
                          value={c.code}
                          className={cn(
                            "group relative flex w-full items-center gap-3 rounded-md py-2.5 pl-3 pr-3 text-sm cursor-pointer outline-none transition-colors",
                            "focus:bg-muted/60",
                            "data-[state=checked]:bg-primary/10",
                          )}
                        >
                          <SelectPrimitive.ItemText asChild>
                            <span className="flex-1 truncate text-foreground group-data-[state=checked]:text-primary group-data-[state=checked]:font-medium">
                              {c.label}
                            </span>
                          </SelectPrimitive.ItemText>
                          <span className="font-mono text-xs tabular-nums text-muted-foreground group-data-[state=checked]:text-primary shrink-0">
                            {c.code}
                          </span>
                        </SelectPrimitive.Item>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={get("contact_phone_placeholder", "100 000 0000")}
                    className="bg-background/60 border-border flex-1"
                  />
                </div>
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="service" className="block text-xs font-medium text-muted-foreground mb-1">
                  {get("contact_service_label", "Service of interest")}
                </label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger
                    id="service"
                    className="bg-background/60 border-border hover:border-primary/40 data-[state=open]:border-primary/60 transition-colors"
                  >
                    <SelectValue placeholder="Select a service (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1">
                  {get("contact_message_label", "Message *")}
                </label>
                <Textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder={get("contact_message_placeholder", "Tell us about your project and goals...")} rows={3} className="bg-background/60 border-border resize-none" />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="shimmer-btn w-full px-8 py-3 text-base font-display font-semibold glow-gold mt-1"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                {isSubmitting ? "Sending..." : get("contact_cta", "Start a Project")}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
