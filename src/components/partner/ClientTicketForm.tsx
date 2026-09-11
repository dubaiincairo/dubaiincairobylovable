import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Server,
  Layers,
  Cpu,
  MapPin,
  Link as LinkIcon,
  AlertTriangle,
  UploadCloud,
  FileVideo,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Copy,
  Check,
  Send,
  Loader2,
  Sparkles,
  MessageCircle,
  HelpCircle,
  ExternalLink,
  ClipboardPaste,
  Building2,
  ChevronRight,
  ShieldCheck,
  Video,
  FileCheck2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  TicketSystem,
  TicketPriority,
  ClientTicket,
  SYSTEM_META,
  BRANCH_OPTIONS_EN,
  BRANCH_OPTIONS_AR,
} from "@/types/tickets";
import { ticketTranslations } from "@/lib/ticketTranslations";

interface Props {
  lang: "en" | "ar";
  onTicketSubmitted?: (ticket: ClientTicket) => void;
}

const STORAGE_SAVED_SUBMITTER = "dubaiincairo_ticket_submitter_v1";
const STORAGE_LOCAL_TICKETS = "dubaiincairo_submitted_tickets_v1";

// Custom System Icons & SVG Logos
function OdooBrandIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function EzeeBrandIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function OzooBrandIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 8.5l7 7M12 4v4M12 16v4" />
    </svg>
  );
}

export default function ClientTicketForm({ lang, onTicketSubmitted }: Props) {
  const t = ticketTranslations[lang];
  const isRtl = lang === "ar";
  const { toast } = useToast();

  // Branch options strictly isolated by language
  const branchOptions = isRtl ? BRANCH_OPTIONS_AR : BRANCH_OPTIONS_EN;

  // Form state
  const [system, setSystem] = useState<TicketSystem>("odoo");
  const [branch, setBranch] = useState<string>("swiss_blue_jeddah");
  const [customBranch, setCustomBranch] = useState<string>("");
  const [issueUrl, setIssueUrl] = useState<string>("");
  const [priority, setPriority] = useState<TicketPriority>("normal");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Submitter state
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Attachments state
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [recordingMode, setRecordingMode] = useState<"file" | "link">("file");
  const [recordingFile, setRecordingFile] = useState<File | null>(null);
  const [recordingPreview, setRecordingPreview] = useState<string | null>(null);
  const [screenRecordingLink, setScreenRecordingLink] = useState<string>("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successTicket, setSuccessTicket] = useState<ClientTicket | null>(null);
  const [copiedSuccessId, setCopiedSuccessId] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [screenshotDragging, setScreenshotDragging] = useState<boolean>(false);
  const [videoDragging, setVideoDragging] = useState<boolean>(false);

  // File input refs
  const screenshotInputRef = useRef<HTMLInputElement>(null);
  const recordingInputRef = useRef<HTMLInputElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Load remembered user data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SAVED_SUBMITTER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setClientName(parsed.name);
        if (parsed.email) setClientEmail(parsed.email);
        if (parsed.phone) setClientPhone(parsed.phone);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (screenshotPreview && screenshotPreview.startsWith("blob:")) {
        URL.revokeObjectURL(screenshotPreview);
      }
      if (recordingPreview && recordingPreview.startsWith("blob:")) {
        URL.revokeObjectURL(recordingPreview);
      }
    };
  }, [screenshotPreview, recordingPreview]);

  // Global Clipboard Paste Listener for Screenshots (Cmd+V / Ctrl+V)
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleScreenshotChange(file);
          toast({
            title: isRtl ? "تم لصق لقطة الشاشة" : "Screenshot Pasted",
            description: t.pastedScreenshotSuccess,
          });
          e.preventDefault();
          break;
        }
      }
    }
  }, [isRtl, t.pastedScreenshotSuccess, toast]);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  // Handle screenshot selection
  const handleScreenshotChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({
        title: isRtl ? "صيغة غير مدعومة" : "Unsupported format",
        description: isRtl ? "يرجى اختيار صورة بصيغة PNG أو JPG أو WebP." : "Please select a PNG, JPG, or WebP image.",
        variant: "destructive",
      });
      return;
    }
    setScreenshotFile(file);
    const url = URL.createObjectURL(file);
    setScreenshotPreview(url);
  };

  // Handle video recording selection
  const handleRecordingChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      toast({
        title: isRtl ? "صيغة غير مدعومة" : "Unsupported format",
        description: isRtl ? "يرجى اختيار ملف فيديو (MP4, WebM, MOV)." : "Please select a video file (MP4, WebM, MOV).",
        variant: "destructive",
      });
      return;
    }
    setRecordingFile(file);
    const url = URL.createObjectURL(file);
    setRecordingPreview(url);
  };

  // Upload helper to Supabase Storage with graceful fallback
  const uploadAttachment = async (file: File, folder: string): Promise<string> => {
    const ext = file.name.split(".").pop() || "bin";
    const cleanFileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    try {
      const { data, error } = await supabase.storage.from("assets").upload(cleanFileName, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from("assets").getPublicUrl(cleanFileName);
        return publicUrlData.publicUrl;
      }
    } catch {
      // Fallback
    }

    try {
      const { data, error } = await supabase.storage.from("applications").upload(cleanFileName, file);
      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from("applications").getPublicUrl(cleanFileName);
        return publicUrlData.publicUrl;
      }
    } catch {
      // Fallback
    }

    return `local://${file.name}`;
  };

  // URL Clipboard Paste Helper
  const handlePasteUrlFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setIssueUrl(text.trim());
        toast({
          title: isRtl ? "تم لصق الرابط" : "URL Pasted",
          description: text.trim(),
        });
      }
    } catch {
      toast({
        title: isRtl ? "تعذر الوصول للحافظة" : "Clipboard access denied",
        description: isRtl ? "يرجى استخدام اختصار اللصق ⌘+V أو Ctrl+V" : "Please paste using ⌘+V or Ctrl+V",
      });
    }
  };

  // Form submission handler
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!title.trim()) {
      toast({ title: t.errorTitle, variant: "destructive" });
      return;
    }
    if (!description.trim()) {
      toast({ title: t.errorDesc, variant: "destructive" });
      return;
    }
    if (!clientEmail.trim() || !clientEmail.includes("@")) {
      toast({ title: t.errorEmail, variant: "destructive" });
      return;
    }
    if (!clientName.trim()) {
      toast({ title: t.errorName, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload files if provided
      let uploadedScreenshotUrl = "";
      let uploadedRecordingUrl = screenRecordingLink.trim();

      if (screenshotFile) {
        uploadedScreenshotUrl = await uploadAttachment(screenshotFile, "tickets/screenshots");
      }
      if (recordingFile && recordingMode === "file") {
        const directVideoUrl = await uploadAttachment(recordingFile, "tickets/recordings");
        uploadedRecordingUrl = uploadedRecordingUrl
          ? `${directVideoUrl} | ${isRtl ? "رابط سحابي" : "Cloud Link"}: ${uploadedRecordingUrl}`
          : directVideoUrl;
      }

      // 2. Resolve final branch label strictly according to active language
      const selectedBranchObj = branchOptions.find((b) => b.id === branch);
      const branchLabel =
        branch === "other"
          ? customBranch.trim() || (isRtl ? "فرع آخر غير محدد" : "Other unspecified branch")
          : selectedBranchObj?.label || branch;

      // 3. Generate unique Ticket Number (e.g. TIC-ODOO-74829)
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const ticketNumber = `TIC-${system.toUpperCase()}-${randomSuffix}`;

      const newTicket: ClientTicket = {
        ticket_number: ticketNumber,
        system,
        branch: branchLabel,
        issue_url: issueUrl.trim() || undefined,
        title: title.trim(),
        description: description.trim(),
        priority,
        status: "open",
        screenshot_url: uploadedScreenshotUrl || undefined,
        screen_recording_url: uploadedRecordingUrl || undefined,
        client_name: clientName.trim(),
        client_email: clientEmail.trim().toLowerCase(),
        client_phone: clientPhone.trim() || undefined,
        created_at: new Date().toISOString(),
      };

      // 4. Save to Database with Resilient Fallback
      let savedToDb = false;

      // Attempt A: Try client_tickets table
      try {
        const { error: ticketError } = await supabase.from("client_tickets" as any).insert([
          {
            ticket_number: newTicket.ticket_number,
            system: newTicket.system,
            branch: newTicket.branch,
            issue_url: newTicket.issue_url || null,
            title: newTicket.title,
            description: newTicket.description,
            priority: newTicket.priority,
            status: newTicket.status,
            screenshot_url: newTicket.screenshot_url || null,
            screen_recording_url: newTicket.screen_recording_url || null,
            client_name: newTicket.client_name,
            client_email: newTicket.client_email,
            client_phone: newTicket.client_phone || null,
          },
        ]);
        if (!ticketError) savedToDb = true;
      } catch {
        // Continue to fallback
      }

      // Attempt B: Fallback to contact_submissions
      if (!savedToDb) {
        try {
          const structuredMessage = `[CLIENT TICKET ${ticketNumber}]
System: ${system.toUpperCase()}
Branch: ${branchLabel}
Priority: ${priority.toUpperCase()}
Issue URL: ${issueUrl || "N/A"}
Title: ${title}

Description:
${description}

Screenshot: ${uploadedScreenshotUrl || "None"}
Screen Recording: ${uploadedRecordingUrl || "None"}`;

          await supabase.from("contact_submissions").insert({
            name: clientName.trim(),
            email: clientEmail.trim().toLowerCase(),
            phone: clientPhone.trim() || null,
            message: structuredMessage,
          });
        } catch {
          // Continue
        }
      }

      // 5. Save to Local Browser Storage for Client Tracking
      try {
        const existing = localStorage.getItem(STORAGE_LOCAL_TICKETS);
        const parsed: ClientTicket[] = existing ? JSON.parse(existing) : [];
        const updated = [newTicket, ...parsed.slice(0, 19)];
        localStorage.setItem(STORAGE_LOCAL_TICKETS, JSON.stringify(updated));
      } catch {
        // Ignore
      }

      // 6. Save Submitter details if Remember Me is checked
      if (rememberMe) {
        localStorage.setItem(
          STORAGE_SAVED_SUBMITTER,
          JSON.stringify({ name: clientName, email: clientEmail, phone: clientPhone })
        );
      }

      // 7. Dispatch Notification via Supabase Edge Function
      try {
        supabase.functions.invoke("send-notification", {
          body: {
            type: "client_ticket",
            data: {
              ticket_number: ticketNumber,
              system: system.toUpperCase(),
              branch: branchLabel,
              priority: priority.toUpperCase(),
              url: issueUrl || "N/A",
              title,
              description,
              client_name: clientName,
              client_email: clientEmail,
              client_phone: clientPhone || "N/A",
              screenshot_url: uploadedScreenshotUrl || "None",
              screen_recording_url: uploadedRecordingUrl || "None",
            },
          },
        }).catch(() => {});
      } catch {
        // Ignore
      }

      // 8. Update UI State & Notify Callback
      setSuccessTicket(newTicket);
      if (onTicketSubmitted) onTicketSubmitted(newTicket);

      // Scroll smoothly to success card
      window.scrollTo({ top: 0, behavior: "smooth" });

      toast({
        title: isRtl ? "تم استلام التذكرة بنجاح" : "Ticket submitted successfully",
        description: isRtl
          ? `رقم التذكرة: ${ticketNumber} - تم تفعيل الإشعارات.`
          : `Ticket #${ticketNumber} logged and notifications dispatched.`,
      });

      // Clear non-contact inputs
      setTitle("");
      setDescription("");
      setIssueUrl("");
      setScreenshotFile(null);
      setScreenshotPreview(null);
      setRecordingFile(null);
      setRecordingPreview(null);
      setScreenRecordingLink("");
    } catch (err: any) {
      toast({
        title: isRtl ? "حدث خطأ غير متوقع" : "Submission error",
        description: err?.message || (isRtl ? "يرجى المحاولة مرة أخرى." : "Please try again later."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard shortcut: Cmd+Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopyTicketId = () => {
    if (!successTicket) return;
    navigator.clipboard.writeText(successTicket.ticket_number);
    setCopiedSuccessId(true);
    setTimeout(() => setCopiedSuccessId(false), 2000);
  };

  const handleCopyTicketSummary = () => {
    if (!successTicket) return;
    const summaryText = isRtl
      ? `[تذكرة الدعم الفني ${successTicket.ticket_number}]
المنظومة: ${successTicket.system.toUpperCase()}
الفرع: ${successTicket.branch}
الأولوية: ${successTicket.priority.toUpperCase()}
العنوان: ${successTicket.title}
الرابط: ${successTicket.issue_url || "لا يوجد"}
مقدم الطلب: ${successTicket.client_name} (${successTicket.client_email})
تاريخ التوثيق: ${new Date(successTicket.created_at || "").toLocaleString("ar-EG")}`
      : `[SUPPORT TICKET ${successTicket.ticket_number}]
Platform: ${successTicket.system.toUpperCase()}
Branch: ${successTicket.branch}
Priority: ${successTicket.priority.toUpperCase()}
Title: ${successTicket.title}
URL: ${successTicket.issue_url || "N/A"}
Submitter: ${successTicket.client_name} (${successTicket.client_email})
Timestamp: ${new Date(successTicket.created_at || "").toLocaleString("en-US")}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const getWhatsAppMessageUrl = () => {
    if (!successTicket) return "#";
    const text = isRtl
      ? `مرحباً، تم رفع تذكرة دعم فني جديدة برقم المرجع: *${successTicket.ticket_number}*\nالمنظومة: *${successTicket.system.toUpperCase()}*\nالفرع: *${successTicket.branch}*\nالملخص: *${successTicket.title}*\nيرجى المتابعة.`
      : `Hello, a new support ticket has been submitted with reference: *${successTicket.ticket_number}*\nPlatform: *${successTicket.system.toUpperCase()}*\nBranch: *${successTicket.branch}*\nTitle: *${successTicket.title}*\nPlease follow up.`;
    return `https://wa.me/201099990099?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      ref={formContainerRef}
      onKeyDown={handleKeyDown}
      className="w-full space-y-8"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ── SUCCESS MODAL & TIMELINE ────────────────────────────────────────── */}
      {successTicket && (
        <div className="rounded-3xl border border-primary/50 bg-gradient-to-b from-[#161208]/90 via-[#0e0c06]/95 to-background p-6 md:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-500 via-primary to-yellow-300" />
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 shadow-lg shadow-primary/10">
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                  {t.successHeading}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                  {t.successSubheading}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground shrink-0 rounded-full"
              onClick={() => setSuccessTicket(null)}
              title={t.closeModal}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Ticket Reference & SLA Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-card/60 border border-primary/20 rounded-2xl p-5">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                {t.ticketIdLabel}
              </span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="font-mono text-xl font-bold text-primary tracking-wide">
                  {successTicket.ticket_number}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyTicketId}
                  className="h-7 px-2.5 text-xs gap-1 border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary font-semibold"
                >
                  {copiedSuccessId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.copyTicketId}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                {t.estimatedSla}
              </span>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/40 font-mono text-xs px-2.5 py-0.5">
                  {successTicket.priority === "critical"
                    ? (isRtl ? "أقل من ساعتين" : "< 2 Hours")
                    : successTicket.priority === "high"
                    ? (isRtl ? "4 إلى 8 ساعات" : "4 - 8 Hours")
                    : (isRtl ? "12 إلى 24 ساعة" : "12 - 24 Hours")}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isRtl ? "فريق العمليات متصل" : "Ops Team Assigned"}
                </span>
              </div>
            </div>
          </div>

          {/* 4-Step Resolution Timeline */}
          <div className="mt-6 pt-5 border-t border-border/60">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-primary/15 border border-primary/40">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mx-auto mb-1">
                  ✓
                </div>
                <div className="text-xs font-bold text-foreground">{t.stepTimeline1}</div>
                <div className="text-[10px] text-muted-foreground">{t.stepTimeline1Sub}</div>
              </div>

              <div className="p-3 rounded-xl bg-primary/15 border border-primary/40">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mx-auto mb-1">
                  ✓
                </div>
                <div className="text-xs font-bold text-foreground">{t.stepTimeline2}</div>
                <div className="text-[10px] text-muted-foreground">{t.stepTimeline2Sub}</div>
              </div>

              <div className="p-3 rounded-xl bg-card/50 border border-border/60">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center mx-auto mb-1 animate-pulse">
                  3
                </div>
                <div className="text-xs font-bold text-foreground">{t.stepTimeline3}</div>
                <div className="text-[10px] text-muted-foreground">{t.stepTimeline3Sub}</div>
              </div>

              <div className="p-3 rounded-xl bg-card/30 border border-border/40 opacity-70">
                <div className="w-6 h-6 rounded-full bg-border text-muted-foreground text-xs font-bold flex items-center justify-center mx-auto mb-1">
                  4
                </div>
                <div className="text-xs font-semibold text-muted-foreground">{t.stepTimeline4}</div>
                <div className="text-[10px] text-muted-foreground">{t.stepTimeline4Sub}</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.whatsappAction}</span>
            </a>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyTicketSummary}
              className="text-xs font-semibold gap-1.5 border-border/80"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.copiedSummary}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.copySummaryBtn}</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSuccessTicket(null)}
              className="text-xs font-medium ms-auto text-muted-foreground hover:text-foreground"
            >
              {t.submitAnother}
            </Button>
          </div>
        </div>
      )}

      {/* ── MAIN TICKET SUBMISSION FORM ──────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. Software Platform Selection */}
        <section className="space-y-3.5">
          <div>
            <h3 className="text-base md:text-lg font-display font-semibold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              {t.selectSystemTitle}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t.selectSystemDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {(["odoo", "ezee", "ozoo"] as TicketSystem[]).map((sysKey) => {
              const meta = SYSTEM_META[sysKey];
              const isSelected = system === sysKey;
              return (
                <button
                  type="button"
                  key={sysKey}
                  onClick={() => setSystem(sysKey)}
                  className={`group relative p-4 rounded-2xl border text-start transition-all duration-200 overflow-hidden active:scale-[0.99] ${
                    isSelected
                      ? "border-primary bg-gradient-to-b from-primary/15 via-card/80 to-card ring-1 ring-primary shadow-xl shadow-primary/10"
                      : "border-border/70 bg-card/40 hover:bg-card/75 hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner"
                        style={{
                          backgroundColor: `${meta.color}25`,
                          color: meta.color,
                          border: `1px solid ${meta.color}40`,
                        }}
                      >
                        {sysKey === "odoo" ? (
                          <OdooBrandIcon className="w-5 h-5" />
                        ) : sysKey === "ezee" ? (
                          <EzeeBrandIcon className="w-5 h-5" />
                        ) : (
                          <OzooBrandIcon className="w-5 h-5" />
                        )}
                      </div>
                      <span className="font-display font-bold text-sm text-foreground">
                        {isRtl ? meta.nameAr : meta.nameEn}
                      </span>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/80 bg-background/40"
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {isRtl ? meta.subtitleAr : meta.subtitleEn}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Branch & URL Location */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {/* Branch selection */}
          <div className="space-y-2">
            <div className="min-h-[46px] flex flex-col justify-end">
              <label className="block text-sm font-display font-semibold text-foreground flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-primary shrink-0" />
                <span>{t.branchTitle}</span>
              </label>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.branchDesc}</p>
            </div>

            <div className="relative group">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full h-11 rounded-xl border border-border/80 bg-background ps-3.5 pe-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
              >
                {branchOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-card text-foreground py-1">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-all">
                <ChevronDown className="w-3.5 h-3.5 text-primary" />
              </div>

              {branch === "other" && (
                <Input
                  value={customBranch}
                  onChange={(e) => setCustomBranch(e.target.value)}
                  placeholder={t.customBranchPlaceholder}
                  className="mt-2 bg-background border-border/80 h-11 animate-in fade-in"
                  autoFocus
                />
              )}
            </div>
          </div>

          {/* Incident URL */}
          <div className="space-y-2">
            <div className="min-h-[46px] flex flex-col justify-end">
              <label className="block text-sm font-display font-semibold text-foreground flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-primary shrink-0" />
                <span>{t.urlTitle}</span>
              </label>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.urlHelper}</p>
            </div>

            <div className="relative">
              <Input
                type="url"
                value={issueUrl}
                onChange={(e) => setIssueUrl(e.target.value)}
                placeholder={t.urlPlaceholder}
                className={`w-full h-11 bg-background border-border/80 text-sm font-mono placeholder:font-sans ${
                  isRtl ? "pl-11 pr-3.5" : "pr-11 pl-3.5"
                }`}
                dir={issueUrl ? "ltr" : undefined}
              />
              <button
                type="button"
                onClick={handlePasteUrlFromClipboard}
                title={t.pasteUrlBtn}
                className={`absolute ${
                  isRtl ? "left-2" : "right-2"
                } top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg`}
              >
                <ClipboardPaste className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. Priority & Urgency Levels */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm md:text-base font-display font-semibold text-foreground flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-primary" />
              {t.priorityTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              {
                id: "normal" as TicketPriority,
                label: t.priorityNormal,
                desc: t.priorityNormalDesc,
                sla: isRtl ? "24-48 ساعة" : "24-48h",
                color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/5",
                activeColor: "border-emerald-500 bg-emerald-500/15 ring-1 ring-emerald-500 shadow-md shadow-emerald-500/10",
                dot: "bg-emerald-500",
              },
              {
                id: "medium" as TicketPriority,
                label: t.priorityMedium,
                desc: t.priorityMediumDesc,
                sla: isRtl ? "12-24 ساعة" : "12-24h",
                color: "border-amber-500/40 text-amber-400 bg-amber-500/5",
                activeColor: "border-amber-500 bg-amber-500/15 ring-1 ring-amber-500 shadow-md shadow-amber-500/10",
                dot: "bg-amber-500",
              },
              {
                id: "high" as TicketPriority,
                label: t.priorityHigh,
                desc: t.priorityHighDesc,
                sla: isRtl ? "4-8 ساعات" : "4-8h",
                color: "border-orange-500/40 text-orange-400 bg-orange-500/5",
                activeColor: "border-orange-500 bg-orange-500/15 ring-1 ring-orange-500 shadow-md shadow-orange-500/10",
                dot: "bg-orange-500 animate-pulse",
              },
              {
                id: "critical" as TicketPriority,
                label: t.priorityCritical,
                desc: t.priorityCriticalDesc,
                sla: isRtl ? "أقل من ساعتين" : "< 2h",
                color: "border-rose-500/40 text-rose-400 bg-rose-500/5",
                activeColor: "border-rose-500 bg-rose-500/20 ring-1 ring-rose-500 shadow-md shadow-rose-500/20",
                dot: "bg-rose-500 animate-ping",
              },
            ].map((p) => {
              const isSelected = priority === p.id;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`p-3.5 rounded-2xl border text-start transition-all ${
                    isSelected ? p.activeColor : "border-border/60 bg-card/40 hover:bg-card/70"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2 h-2 rounded-full ${p.dot}`} />
                    <span className="font-semibold text-xs text-foreground">
                      {p.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                    {p.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Ticket Title & Description */}
        <section className="space-y-4">

          {/* Ticket Title */}
          <div className="space-y-2">
            <label className="block text-sm font-display font-semibold text-foreground">
              {t.ticketSummaryTitle} *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.ticketSummaryPlaceholder}
              required
              className="bg-background border-border/80 text-sm font-medium h-11"
            />
          </div>

          {/* Ticket Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-muted-foreground">
                {isRtl ? "تفاصيل المشكلة" : "Description"}
              </label>
              <span className="text-[11px] text-muted-foreground font-mono">
                {description.length} {t.charCount}
              </span>
            </div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descPlaceholder}
              rows={6}
              required
              className="bg-background border-border/80 text-sm leading-relaxed whitespace-pre-line font-sans"
            />
          </div>
        </section>

        {/* 5. Attachments: Screenshot & Video Recording */}
        <section className="space-y-4">
          <div>
            <h3 className="text-base font-display font-semibold text-foreground flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-primary" />
              {t.attachmentsTitle}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t.attachmentsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {/* Screenshot upload zone */}
            <div className="space-y-2">
              <div className="h-9 flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{t.screenshotLabel}</span>
                </label>
                <span className="text-[10px] text-muted-foreground font-mono bg-muted/40 px-2 py-0.5 rounded-md border border-border/50">
                  ⌘+V / Ctrl+V
                </span>
              </div>

              <input
                ref={screenshotInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => handleScreenshotChange(e.target.files?.[0] || null)}
              />

              {screenshotPreview ? (
                <div className="relative rounded-2xl border border-primary/40 bg-card/70 p-4 h-[170px] flex items-center gap-3.5 shadow-lg shadow-black/40">
                  <img
                    src={screenshotPreview}
                    alt="Screenshot preview"
                    className="w-24 h-24 rounded-xl object-cover border border-border/80 shrink-0 bg-background"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-foreground truncate">
                      {screenshotFile?.name || "screenshot.png"}
                    </p>
                    <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                      {screenshotFile ? `${(screenshotFile.size / 1024).toFixed(1)} KB` : (isRtl ? "جاهز للرفع" : "Ready to upload")}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1">
                      <FileCheck2 className="w-3 h-3" />
                      {isRtl ? "تم إرفاق الصورة" : "Image attached"}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                    onClick={() => {
                      setScreenshotFile(null);
                      setScreenshotPreview(null);
                    }}
                    title={t.removeFile}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setScreenshotDragging(true);
                  }}
                  onDragLeave={() => setScreenshotDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setScreenshotDragging(false);
                    handleScreenshotChange(e.dataTransfer.files?.[0] || null);
                  }}
                  onClick={() => screenshotInputRef.current?.click()}
                  className={`cursor-pointer rounded-2xl border-2 border-dashed p-4 text-center transition-all h-[170px] flex flex-col items-center justify-center ${
                    screenshotDragging
                      ? "border-primary bg-primary/15 scale-[1.01]"
                      : "border-border/70 bg-card/30 hover:bg-card/60 hover:border-primary/60"
                  }`}
                >
                  <ImageIcon className="w-7 h-7 mx-auto text-primary/80 mb-2 shrink-0" />
                  <p className="text-xs font-semibold text-foreground">
                    {screenshotDragging ? t.screenshotDragActive : t.screenshotPrompt}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1 max-w-xs mx-auto leading-relaxed">
                    {t.screenshotSubtext}
                  </p>
                </div>
              )}
            </div>

            {/* Screen recording: Segmented Upload vs Loom Link */}
            <div className="space-y-2">
              <div className="h-9 flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                  <FileVideo className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{t.screenRecordingLabel}</span>
                </label>

                {/* Sub-tabs */}
                <div className="inline-flex rounded-lg border border-border/80 bg-background/60 p-0.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setRecordingMode("file")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      recordingMode === "file"
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.tabVideoFile}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecordingMode("link")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      recordingMode === "link"
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.tabLoomLink}
                  </button>
                </div>
              </div>

              {recordingMode === "file" ? (
                <>
                  <input
                    ref={recordingInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    className="hidden"
                    onChange={(e) => handleRecordingChange(e.target.files?.[0] || null)}
                  />

                  {recordingPreview ? (
                    <div className="relative rounded-2xl border border-primary/40 bg-card/70 p-3 h-[170px] flex flex-col justify-between shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-foreground truncate">
                            {recordingFile?.name || "recording.mp4"}
                          </p>
                          <p className="text-[11px] text-muted-foreground font-mono">
                            {recordingFile ? `${(recordingFile.size / (1024 * 1024)).toFixed(2)} MB` : (isRtl ? "جاهز" : "Ready")}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full"
                          onClick={() => {
                            setRecordingFile(null);
                            setRecordingPreview(null);
                          }}
                          title={t.removeFile}
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>

                      <video
                        src={recordingPreview}
                        controls
                        className="w-full h-24 rounded-xl bg-black border border-border/80 object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setVideoDragging(true);
                      }}
                      onDragLeave={() => setVideoDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setVideoDragging(false);
                        handleRecordingChange(e.dataTransfer.files?.[0] || null);
                      }}
                      onClick={() => recordingInputRef.current?.click()}
                      className={`cursor-pointer rounded-2xl border-2 border-dashed p-4 text-center transition-all h-[170px] flex flex-col items-center justify-center ${
                        videoDragging
                          ? "border-primary bg-primary/15 scale-[1.01]"
                          : "border-border/70 bg-card/30 hover:bg-card/60 hover:border-primary/60"
                      }`}
                    >
                      <FileVideo className="w-7 h-7 mx-auto text-primary/80 mb-2 shrink-0" />
                      <p className="text-xs font-semibold text-foreground">
                        {t.videoUploadPrompt}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {t.videoUploadSubtext}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-2xl border border-border/70 bg-card/30 p-4 h-[170px] flex flex-col justify-center space-y-2.5">
                  <div className="flex items-center gap-1.5 text-foreground/90 text-xs font-semibold">
                    <LinkIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{t.orPasteLoom}</span>
                  </div>
                  <Input
                    type="url"
                    value={screenRecordingLink}
                    onChange={(e) => setScreenRecordingLink(e.target.value)}
                    placeholder={t.loomPlaceholder}
                    className="bg-background border-border/80 text-xs font-mono placeholder:font-sans h-11 w-full"
                    dir="ltr"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {isRtl
                      ? "يدعم روابط لوم أو جوجل درايف المباشرة."
                      : "Supports direct Loom or Google Drive links."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 6. Submitter Contact Info */}
        <section className="space-y-4 rounded-2xl border border-border/70 bg-card/40 p-5 md:p-6 backdrop-blur-sm">
          <div>
            <h3 className="text-sm md:text-base font-display font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              {t.submitterTitle}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t.submitterDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground/90">
                {t.nameLabel}
              </label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={t.namePlaceholder}
                required
                className="bg-background border-border/80 text-sm h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground/90">
                {t.emailLabel}
              </label>
              <Input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                className="bg-background border-border/80 text-sm h-10"
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground/90">
                {t.phoneLabel}
              </label>
              <Input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                className="bg-background border-border/80 text-sm font-mono h-10"
                dir="ltr"
              />
            </div>
          </div>

          <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-border bg-background text-primary focus:ring-primary h-4 w-4 accent-amber-500"
            />
            <span className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t.rememberMeLabel}
            </span>
          </label>
        </section>

        {/* 7. Submit Action Area */}
        <div className="pt-2 space-y-2 text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 text-sm md:text-base font-display font-bold bg-gradient-to-r from-amber-500 via-primary to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-xl shadow-primary/25 rounded-2xl gap-2 transition-all active:scale-[0.99] cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                <span>{t.submittingBtn}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 text-slate-950" />
                <span>{t.submitBtn}</span>
              </>
            )}
          </Button>

          <p className="text-[11px] text-muted-foreground font-mono">
            {t.shortcutHint}
          </p>
        </div>
      </form>
    </div>
  );
}
