import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, CheckCircle, Loader2, MessageSquare, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useContactModal } from "@/context/ContactModalContext";
import { z } from "zod";

const contactSchema = z.object({
  name:    z.string().trim().min(1, "Name is required").max(100),
  email:   z.string().trim().email("Invalid email address").max(255),
  phone:   z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export const ContactModal = () => {
  const { isOpen, closeContactModal } = useContactModal();
  const { toast } = useToast();
  const { get } = useSiteContent();

  const [form, setForm]           = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted]   = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.errors.forEach((err) => { if (err.path[0]) fe[err.path[0] as string] = err.message; });
      setErrors(fe);
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: result.data.name, email: result.data.email,
      phone: result.data.phone || null, message: result.data.message,
    });
    setIsSubmitting(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      return;
    }
    setIsSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const handleClose = () => {
    closeContactModal();
    setTimeout(() => { setIsSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); setErrors({}); }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[99] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.93, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* gold top accent */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div>
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-primary block mb-0.5">
                    {get("contact_subtitle", "Get Started")}
                  </span>
                  <h2 className="font-display font-bold text-xl text-foreground">
                    {get("contact_modal_title", "Let's Build Together")}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-4 px-6 pb-4">
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Clock className="w-3 h-3 text-primary" />
                  {get("contact_trust_1", "Response within 24 hours")}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MessageSquare className="w-3 h-3 text-primary" />
                  {get("contact_trust_2", "Free consultation call")}
                </span>
              </div>

              <div className="h-px bg-border mx-6" />

              {/* Body */}
              <div className="px-6 py-5">
                {isSubmitted ? (
                  <div className="flex flex-col items-center gap-3 py-8 text-center">
                    <CheckCircle className="w-10 h-10 text-primary" />
                    <h3 className="text-lg font-display font-semibold">{get("contact_success_title", "Thank You!")}</h3>
                    <p className="text-sm text-muted-foreground">{get("contact_success_msg", "We'll get back to you within 24 hours.")}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          {get("contact_name_label", "Name *")}
                        </label>
                        <Input name="name" value={form.name} onChange={handleChange}
                          placeholder={get("contact_name_placeholder", "Your name")}
                          className="bg-background border-border h-9 text-sm" />
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          {get("contact_email_label", "Email *")}
                        </label>
                        <Input name="email" type="email" value={form.email} onChange={handleChange}
                          placeholder={get("contact_email_placeholder", "you@company.com")}
                          className="bg-background border-border h-9 text-sm" />
                        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        {get("contact_phone_label", "Phone (optional)")}
                      </label>
                      <Input name="phone" value={form.phone} onChange={handleChange}
                        placeholder={get("contact_phone_placeholder", "+1 234 567 890")}
                        className="bg-background border-border h-9 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        {get("contact_message_label", "Message *")}
                      </label>
                      <Textarea name="message" value={form.message} onChange={handleChange}
                        placeholder={get("contact_message_placeholder", "Tell us about your project and goals...")}
                        rows={4} className="bg-background border-border text-sm resize-none" />
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" disabled={isSubmitting}
                      className="shimmer-btn w-full font-display font-semibold glow-gold">
                      {isSubmitting
                        ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...</>
                        : <><Mail className="w-4 h-4 mr-2" />{get("contact_cta", "Start a Project")}<ArrowRight className="w-4 h-4 ml-2" /></>
                      }
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
