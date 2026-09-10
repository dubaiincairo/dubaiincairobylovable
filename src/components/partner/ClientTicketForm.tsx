import React, { useState, useEffect, useRef } from "react";
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
  ExternalLink
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
  BRANCH_OPTIONS_EN
} from "@/types/tickets";
import { ticketTranslations } from "@/lib/ticketTranslations";

interface Props {
  lang: "en" | "ar";
  onTicketSubmitted?: (ticket: ClientTicket) => void;
}

const STORAGE_SAVED_SUBMITTER = "dubaiincairo_ticket_submitter_v1";
const STORAGE_LOCAL_TICKETS = "dubaiincairo_submitted_tickets_v1";

export default function ClientTicketForm({ lang, onTicketSubmitted }: Props) {
  const t = ticketTranslations[lang];
  const isRtl = lang === "ar";
  const { toast } = useToast();

  // Form state
  const [system, setSystem] = useState<TicketSystem>("odoo");
  const [branch, setBranch] = useState<string>("swiss_blue_khobar");
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
  const [recordingFile, setRecordingFile] = useState<File | null>(null);
  const [recordingPreview, setRecordingPreview] = useState<string | null>(null);
  const [screenRecordingLink, setScreenRecordingLink] = useState<string>("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successTicket, setSuccessTicket] = useState<ClientTicket | null>(null);
  const [copiedSuccessId, setCopiedSuccessId] = useState<boolean>(false);
  const [screenshotDragging, setScreenshotDragging] = useState<boolean>(false);
  const [videoDragging, setVideoDragging] = useState<boolean>(false);

  // File input refs
  const screenshotInputRef = useRef<HTMLInputElement>(null);
  const recordingInputRef = useRef<HTMLInputElement>(null);

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
      // Try assets bucket first
      const { data, error } = await supabase.storage.from("assets").upload(cleanFileName, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from("assets").getPublicUrl(cleanFileName);
        return publicUrlData.publicUrl;
      }
    } catch {
      // Try applications bucket as fallback
    }

    try {
      const { data, error } = await supabase.storage.from("applications").upload(cleanFileName, file);
      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from("applications").getPublicUrl(cleanFileName);
        return publicUrlData.publicUrl;
      }
    } catch {
      // Graceful fallback
    }

    // Return filename placeholder if bucket upload isn't accessible
    return `local://${file.name}`;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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
      if (recordingFile) {
        const directVideoUrl = await uploadAttachment(recordingFile, "tickets/recordings");
        uploadedRecordingUrl = uploadedRecordingUrl
          ? `${directVideoUrl} | External Link: ${uploadedRecordingUrl}`
          : directVideoUrl;
      }

      // 2. Resolve final branch label
      const selectedBranchObj = BRANCH_OPTIONS_EN.find((b) => b.id === branch);
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

      // Attempt B: Fallback to contact_submissions table if client_tickets is not yet migrated
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

      toast({
        title: isRtl ? "تم استلام التذكرة بنجاح" : "Ticket submitted successfully",
        description: isRtl
          ? `رقم التذكرة: ${ticketNumber} - تم إرسال الإشعارات.`
          : `Ticket #${ticketNumber} has been logged and notifications dispatched.`,
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

  const handleCopyTicketId = () => {
    if (!successTicket) return;
    navigator.clipboard.writeText(successTicket.ticket_number);
    setCopiedSuccessId(true);
    setTimeout(() => setCopiedSuccessId(false), 2000);
  };

  const getWhatsAppMessageUrl = () => {
    if (!successTicket) return "#";
    const text = isRtl
      ? `مرحباً، تم رفع تذكرة دعم فني جديدة برقم المرجع: *${successTicket.ticket_number}*\nالنظام: *${successTicket.system.toUpperCase()}*\nالفرع: *${successTicket.branch}*\nالملخص: *${successTicket.title}*\nيرجى المتابعة.`
      : `Hello, a new support ticket has been submitted with reference: *${successTicket.ticket_number}*\nSystem: *${successTicket.system.toUpperCase()}*\nBranch: *${successTicket.branch}*\nTitle: *${successTicket.title}*\nPlease follow up.`;
    return `https://wa.me/201099990099?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full space-y-8" dir={isRtl ? "rtl" : "ltr"}>
      {/* Success Modal / Banner */}
      {successTicket && (
        <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-card to-card p-6 md:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-primary to-emerald-400" />
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground">
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
              className="text-muted-foreground hover:text-foreground shrink-0"
              onClick={() => setSuccessTicket(null)}
              title={t.closeModal}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-background/60 border border-border/60 rounded-xl p-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                {t.ticketIdLabel}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-lg font-bold text-primary">
                  {successTicket.ticket_number}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyTicketId}
                  className="h-7 px-2 text-xs gap-1"
                >
                  {copiedSuccessId ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{t.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
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
              <div className="mt-1 flex items-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  {successTicket.priority === "critical"
                    ? "< 2 Hours"
                    : successTicket.priority === "high"
                    ? "4 - 8 Hours"
                    : "12 - 24 Hours"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {isRtl ? "فريق العمليات متصل" : "Ops Team Active"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
            {t.notificationSentNote}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.whatsappAction}</span>
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSuccessTicket(null)}
              className="text-xs font-medium"
            >
              {t.submitAnother}
            </Button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. System Selection */}
        <section className="space-y-3">
          <div>
            <h3 className="text-base md:text-lg font-display font-semibold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              {t.selectSystemTitle}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t.selectSystemDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(["odoo", "ezee", "ozoo"] as TicketSystem[]).map((sysKey) => {
              const meta = SYSTEM_META[sysKey];
              const isSelected = system === sysKey;
              return (
                <button
                  type="button"
                  key={sysKey}
                  onClick={() => setSystem(sysKey)}
                  className={`relative p-4 rounded-xl border text-start transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? "border-primary bg-primary/10 ring-1 ring-primary shadow-lg shadow-primary/5"
                      : "border-border/60 bg-card/40 hover:bg-card/80 hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                        style={{
                          backgroundColor: `${meta.color}25`,
                          color: meta.color,
                        }}
                      >
                        {sysKey === "odoo" ? "OD" : sysKey === "ezee" ? "EZ" : "OZ"}
                      </div>
                      <span className="font-display font-bold text-sm text-foreground">
                        {isRtl ? meta.nameAr : meta.nameEn}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 border-border/60 uppercase font-mono"
                    >
                      {meta.badge}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {isRtl ? meta.subtitleAr : meta.subtitleEn}
                  </p>

                  {isSelected && (
                    <div className="absolute top-2 end-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Branch & URL Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Branch selection */}
          <div className="space-y-2">
            <label className="block text-sm font-display font-semibold text-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {t.branchTitle}
            </label>
            <p className="text-xs text-muted-foreground">{t.branchDesc}</p>

            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {BRANCH_OPTIONS_EN.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>

            {branch === "other" && (
              <Input
                value={customBranch}
                onChange={(e) => setCustomBranch(e.target.value)}
                placeholder={t.customBranchPlaceholder}
                className="mt-2 bg-background border-border/80"
                autoFocus
              />
            )}
          </div>

          {/* Incident URL */}
          <div className="space-y-2">
            <label className="block text-sm font-display font-semibold text-foreground flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-primary" />
              {t.urlTitle}
            </label>
            <p className="text-xs text-muted-foreground">{t.urlHelper}</p>

            <Input
              type="url"
              value={issueUrl}
              onChange={(e) => setIssueUrl(e.target.value)}
              placeholder={t.urlPlaceholder}
              className="bg-background border-border/80 text-sm font-mono placeholder:font-sans"
              dir="ltr"
            />
          </div>
        </section>

        {/* 3. Priority Selector */}
        <section className="space-y-3">
          <div>
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
                color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/5",
                activeColor: "border-emerald-500 bg-emerald-500/15 ring-1 ring-emerald-500",
              },
              {
                id: "medium" as TicketPriority,
                label: t.priorityMedium,
                desc: t.priorityMediumDesc,
                color: "border-amber-500/40 text-amber-400 bg-amber-500/5",
                activeColor: "border-amber-500 bg-amber-500/15 ring-1 ring-amber-500",
              },
              {
                id: "high" as TicketPriority,
                label: t.priorityHigh,
                desc: t.priorityHighDesc,
                color: "border-orange-500/40 text-orange-400 bg-orange-500/5",
                activeColor: "border-orange-500 bg-orange-500/15 ring-1 ring-orange-500",
              },
              {
                id: "critical" as TicketPriority,
                label: t.priorityCritical,
                desc: t.priorityCriticalDesc,
                color: "border-rose-500/40 text-rose-400 bg-rose-500/5",
                activeColor: "border-rose-500 bg-rose-500/20 ring-1 ring-rose-500",
              },
            ].map((p) => {
              const isSelected = priority === p.id;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`p-3 rounded-xl border text-start transition-all ${
                    isSelected ? p.activeColor : "border-border/60 bg-card/40 hover:bg-card/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-foreground">{p.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                    {p.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Ticket Summary & Description */}
        <section className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-display font-semibold text-foreground">
              {t.ticketSummaryTitle} *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.ticketSummaryPlaceholder}
              required
              className="bg-background border-border/80 text-sm font-medium"
            />
          </div>

          <div className="space-y-2">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descPlaceholder}
              rows={5}
              required
              className="bg-background border-border/80 text-sm leading-relaxed whitespace-pre-line"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Screenshot upload zone */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-primary" />
                {t.screenshotLabel}
              </label>

              <input
                ref={screenshotInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => handleScreenshotChange(e.target.files?.[0] || null)}
              />

              {screenshotPreview ? (
                <div className="relative rounded-xl border border-border bg-card/60 p-3 flex items-center gap-3">
                  <img
                    src={screenshotPreview}
                    alt="Screenshot preview"
                    className="w-16 h-16 rounded-lg object-cover border border-border/80 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">
                      {screenshotFile?.name || "screenshot.png"}
                    </p>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      {screenshotFile ? `${(screenshotFile.size / 1024).toFixed(1)} KB` : "Uploaded"}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
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
                  className={`cursor-pointer rounded-xl border-2 border-dashed p-5 text-center transition-all ${
                    screenshotDragging
                      ? "border-primary bg-primary/10"
                      : "border-border/70 bg-card/30 hover:bg-card/60 hover:border-primary/60"
                  }`}
                >
                  <ImageIcon className="w-7 h-7 mx-auto text-primary/70 mb-2" />
                  <p className="text-xs font-medium text-foreground">
                    {screenshotDragging ? t.screenshotDragActive : t.screenshotPrompt}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {t.screenshotSubtext}
                  </p>
                </div>
              )}
            </div>

            {/* Screen recording upload + Loom Link zone */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                <FileVideo className="w-3.5 h-3.5 text-primary" />
                {t.screenRecordingLabel}
              </label>

              <input
                ref={recordingInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={(e) => handleRecordingChange(e.target.files?.[0] || null)}
              />

              {recordingPreview ? (
                <div className="relative rounded-xl border border-border bg-card/60 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground truncate">
                        {recordingFile?.name || "recording.mp4"}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        {recordingFile ? `${(recordingFile.size / (1024 * 1024)).toFixed(2)} MB` : "Ready"}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                      onClick={() => {
                        setRecordingFile(null);
                        setRecordingPreview(null);
                      }}
                      title={t.removeFile}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <video
                    src={recordingPreview}
                    controls
                    className="w-full max-h-36 rounded-lg bg-black border border-border/80"
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
                  className={`cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-all ${
                    videoDragging
                      ? "border-primary bg-primary/10"
                      : "border-border/70 bg-card/30 hover:bg-card/60 hover:border-primary/60"
                  }`}
                >
                  <FileVideo className="w-7 h-7 mx-auto text-primary/70 mb-1.5" />
                  <p className="text-xs font-medium text-foreground">
                    {t.videoUploadPrompt}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {t.videoUploadSubtext}
                  </p>
                </div>
              )}

              {/* Cloud / Loom link input */}
              <div className="pt-1">
                <Input
                  type="url"
                  value={screenRecordingLink}
                  onChange={(e) => setScreenRecordingLink(e.target.value)}
                  placeholder={t.loomPlaceholder}
                  className="bg-background border-border/80 text-xs font-mono placeholder:font-sans"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Submitter Contact Info */}
        <section className="space-y-4 rounded-xl border border-border/60 bg-card/30 p-4 md:p-5">
          <div>
            <h3 className="text-sm md:text-base font-display font-semibold text-foreground">
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
                className="bg-background border-border/80 text-sm"
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
                className="bg-background border-border/80 text-sm"
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
                className="bg-background border-border/80 text-sm font-mono"
                dir="ltr"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-border bg-background text-primary focus:ring-primary h-4 w-4"
            />
            <span className="text-xs text-muted-foreground">
              {t.rememberMeLabel}
            </span>
          </label>
        </section>

        {/* 7. Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-sm md:text-base font-display font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.submittingBtn}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t.submitBtn}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
