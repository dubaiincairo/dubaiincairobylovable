import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/cookieConsent";
import { useMotionPref } from "@/lib/animations";
import { useSiteContent } from "@/hooks/useSiteContent";

const DISMISS_KEY = "wa_teaser_dismissed";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WhatsAppButton = () => {
  const { get } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [consentPending, setConsentPending] = useState(false);
  const { shouldReduce } = useMotionPref();
  const panelRef = useRef<HTMLDivElement>(null);

  // ── CMS-driven copy ──────────────────────────────────────────────────────
  const phone        = get("wa_phone",         "201225250554").replace(/[^\d]/g, "");
  const teaserTitle  = get("wa_teaser_title",  "👋 Hi! Let's start a conversation");
  const teaserCta    = get("wa_teaser_cta",    "Tap to chat →");
  const headerName   = get("wa_header_name",   "Dubai in Cairo");
  const headerStatus = get("wa_header_status", "Typically replies within 1 hour");
  const openerText   = get("wa_opener_text",   "👋 Hi there! How can we help you today?");
  const openerHint   = get("wa_opener_hint",   "Pick one below");
  const footerNote   = get("wa_footer_note",   "Picks open WhatsApp with the message ready to send");

  const quickReplies = [1, 2, 3, 4]
    .map((n) => ({
      label:   get(`wa_reply_${n}_label`,   ""),
      message: get(`wa_reply_${n}_message`, ""),
    }))
    .filter((r) => r.label && r.message);

  // Lift the button above the cookie banner if consent hasn't been recorded
  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      setConsentPending(stored === null);
    };
    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
  }, []);

  // Auto-reveal the catchy teaser bubble after 4s — unless the visitor has
  // already dismissed it in this browser session
  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    const t = setTimeout(() => setShowTeaser(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Close the conversation panel on Escape or outside-click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onPointerDown = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const dismissTeaser = () => {
    setShowTeaser(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  const send = (message: string) => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const bottomClass = consentPending
    ? "bottom-[calc(env(safe-area-inset-bottom)+11rem)] md:bottom-[calc(env(safe-area-inset-bottom)+8rem)]"
    : "bottom-[calc(env(safe-area-inset-bottom)+1.5rem)]";

  return (
    <div className={`fixed right-6 z-50 flex flex-col items-end gap-3 ${bottomClass}`}>

      {/* Conversation panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="WhatsApp chat options"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 12, scale: shouldReduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduce ? 0 : 8, scale: shouldReduce ? 1 : 0.96 }}
            transition={{ duration: shouldReduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-[20rem] max-w-[calc(100vw-3rem)] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
          >
            {/* WhatsApp-style header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54] text-white">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-5 h-5 fill-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">{headerName}</p>
                <p className="text-[11px] text-white/80 leading-tight flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                  {headerStatus}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation area */}
            <div className="px-4 py-5 bg-muted/20 max-h-[60vh] overflow-y-auto">
              {/* Incoming bubble */}
              <div className="flex">
                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-card border border-border px-4 py-2.5 shadow-sm">
                  <p className="text-sm text-foreground leading-relaxed">{openerText}</p>
                  {openerHint && (
                    <p className="text-[10px] text-muted-foreground/70 mt-1">{openerHint}</p>
                  )}
                </div>
              </div>

              {/* Quick replies — stacked outgoing-style options */}
              <div className="flex flex-col gap-2 mt-4 items-end">
                {quickReplies.map((r) => (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => send(r.message)}
                    className="max-w-[85%] text-left px-4 py-2.5 rounded-2xl rounded-tr-md bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-colors text-sm font-medium"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            {footerNote && (
              <div className="px-4 py-2.5 bg-card border-t border-border text-center">
                <p className="text-[10px] text-muted-foreground">{footerNote}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teaser bubble (auto-revealed) — sits next to the floating button */}
      <AnimatePresence>
        {showTeaser && !open && (
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : 12, scale: shouldReduce ? 1 : 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: shouldReduce ? 0 : 12, scale: shouldReduce ? 1 : 0.9 }}
            transition={{ duration: shouldReduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex items-stretch gap-0 max-w-[15rem] rounded-2xl rounded-br-md border border-border bg-card shadow-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => { setOpen(true); dismissTeaser(); }}
              className="px-4 py-2.5 text-left hover:bg-muted/40 transition-colors group"
            >
              <p className="text-sm font-medium text-foreground leading-snug">{teaserTitle}</p>
              {teaserCta && (
                <p className="text-[11px] text-primary mt-0.5 group-hover:text-primary/80 transition-colors">
                  {teaserCta}
                </p>
              )}
            </button>
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dismiss"
              className="px-2 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border-l border-border"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button — toggles the conversation panel */}
      <button
        type="button"
        onClick={() => { setOpen((v) => !v); if (showTeaser) dismissTeaser(); }}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        aria-expanded={open}
        className="relative group"
      >
        {/* Pulse rings — only when panel is closed */}
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping pointer-events-none [animation-delay:0.5s]" />
          </>
        )}
        <span
          className={`
            relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center
            shadow-[0_4px_24px_rgba(37,211,102,0.4)]
            transition-transform duration-200 group-hover:scale-110
          `}
        >
          {open ? <X className="w-6 h-6 text-white" /> : <WhatsAppIcon className="w-7 h-7 fill-white" />}
        </span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
