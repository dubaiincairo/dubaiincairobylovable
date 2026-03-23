import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      message: result.data.message,
    });
    setIsSubmitting(false);

    if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      return;
    }

    setIsSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to <span className="text-gradient-gold">Grow</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Let's build a marketing strategy that puts your brand on the map. Book a free consultation today.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-12"
          >
            <CheckCircle className="w-12 h-12 text-primary" />
            <h3 className="text-2xl font-display font-semibold">Thank You!</h3>
            <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-left space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="bg-card border-border" />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className="bg-card border-border" />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">Phone (optional)</label>
              <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 890" className="bg-card border-border" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
              <Textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project and goals..." rows={5} className="bg-card border-border" />
              {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-10 py-5 text-lg font-display font-semibold glow-gold">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
              {isSubmitting ? "Sending..." : "Book a Consultation"}
              {!isSubmitting && <ArrowRight className="w-5 h-5" />}
            </Button>
          </motion.form>
        )}

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Cairo, Egypt</span>
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Dubai, UAE</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
