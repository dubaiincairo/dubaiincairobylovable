import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";
import { MOTION, useMotionPref } from "@/lib/animations";
import { useT } from "@/hooks/useT";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  persistCookieConsent,
  type CookieConsent,
} from "@/lib/cookieConsent";

const CookieBanner = () => {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [mounted, setMounted] = useState(false);
  const { shouldReduce } = useMotionPref();
  const t = useT();

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) as CookieConsent;
    setConsent(stored);
    setMounted(true);
  }, []);

  const accept = () => {
    persistCookieConsent("accepted");
    setConsent("accepted");
  };

  const decline = () => {
    persistCookieConsent("declined");
    setConsent("declined");
  };

  const visible = mounted && consent === null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: shouldReduce ? 0 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: shouldReduce ? 0 : 100, opacity: 0 }}
          transition={
            shouldReduce
              ? { duration: MOTION.duration.micro }
              : { type: "spring", stiffness: 260, damping: 28 }
          }
          className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 md:px-6 md:pb-5 pointer-events-none"
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
        >
          <div
            className="pointer-events-auto max-w-5xl mx-auto rounded-2xl border border-border/70 p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative"
            style={{
              background:
                "linear-gradient(135deg, hsl(220 18% 9% / 0.97), hsl(220 18% 7% / 0.97))",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow:
                "0 -1px 0 0 hsl(var(--border) / 0.6), 0 8px 40px hsl(220 20% 4% / 0.7), 0 0 0 1px hsl(38 80% 55% / 0.08)",
            }}
          >
            {/* Icon */}
            <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Cookie aria-hidden="true" className="w-5 h-5 text-primary" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-display font-semibold text-foreground mb-0.5">
                {t("We use cookies", "نستخدم ملفّات تعريف الارتباط")}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(
                  "We use essential cookies to keep the site running and optional analytics cookies to understand how you use it. No data is sold or shared with third parties.",
                  "نستخدم ملفّاتٍ أساسية لتشغيل الموقع، وملفّات تحليلاتٍ اختيارية لفهم طريقة استخدامك له. لا نبيع بياناتك ولا نشاركها مع أيّ طرفٍ ثالث.",
                )}{" "}
                <Link
                  to="/privacy"
                  className="text-primary/80 hover:text-primary underline underline-offset-2 transition-colors"
                >
                  {t("Privacy policy", "سياسة الخصوصية")}
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={decline}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground border border-border/60 hover:border-border transition-colors duration-200"
              >
                {t("Decline", "رفض")}
              </button>
              <button
                type="button"
                onClick={accept}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg text-xs font-display font-semibold bg-primary text-primary-foreground hover:brightness-110 transition-all duration-200 shimmer-btn"
              >
                <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5" />
                {t("Accept All", "موافقة")}
              </button>
            </div>

            {/* Dismiss × */}
            <button
              type="button"
              onClick={decline}
              aria-label={t("Dismiss cookie banner", "إغلاق إشعار الكوكيز")}
              className="absolute top-3 right-3 rtl:right-auto rtl:left-3 sm:static sm:shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/40 transition-colors duration-200"
            >
              <X aria-hidden="true" className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
