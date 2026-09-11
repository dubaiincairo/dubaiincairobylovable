import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  LogOut,
  Loader2,
  Plus,
  Ticket,
  Briefcase,
  History,
  Languages,
  ArrowRight,
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  Radio,
} from "lucide-react";
import {
  addDays,
  addWeeks,
  format,
  isSameDay,
  isToday,
  startOfWeek,
} from "date-fns";
import { cn } from "@/lib/utils";
import EntryModal, { type TimeEntry } from "@/components/partner/EntryModal";
import ClientTicketForm from "@/components/partner/ClientTicketForm";
import TicketHistoryModal from "@/components/partner/TicketHistoryModal";
import { ClientTicket } from "@/types/tickets";
import { ticketTranslations } from "@/lib/ticketTranslations";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = Array.from({ length: 7 }, (_, i) => i);

const formatHourDisplay = (hour: number, isRtl: boolean) => {
  if (!isRtl) {
    const d = new Date();
    d.setHours(hour, 0, 0, 0);
    return format(d, "h a");
  }
  const period = hour >= 12 ? "م" : "ص";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${period}`;
};

const toDateKey = (date: Date) => format(date, "yyyy-MM-dd");

interface EditingTarget {
  date: Date;
  hour: number;
  entry: TimeEntry | null;
}

const STORAGE_LOCAL_TICKETS = "dubaiincairo_submitted_tickets_v1";

const AR_DAY_NAMES = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const PartnerTimeTracker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "worksheet" ? "worksheet" : "tickets";
  const [activeTab, setActiveTab] = useState<"tickets" | "worksheet">(initialTab);

  // Strictly isolate default language: default to English unless ?lang=ar is explicitly requested
  const initialLang = searchParams.get("lang") === "ar" ? "ar" : "en";
  const [lang, setLang] = useState<"en" | "ar">(initialLang);
  const isRtl = lang === "ar";
  const t = ticketTranslations[lang];

  useSEO({
    title: isRtl ? "بوابة الشركاء والعمليات | دبي في القاهرة" : "Partner & Client Portal | Dubai in Cairo",
    description: isRtl
      ? "البوابة التنفيذية المعتمدة لرفع تذاكر الدعم الفني لأنظمة أودو وإيزي وأوزو، وسجل أعمال المستقلين."
      : "Executive portal for client support tickets (Odoo, eZee, Ozoo) and freelancer worksheet time tracking.",
    noindex: true,
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const [authReady, setAuthReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isPartnerUser, setIsPartnerUser] = useState(false);

  // Tickets & History state
  const [recentTickets, setRecentTickets] = useState<ClientTicket[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Inline Freelancer Login State
  const [inlineEmail, setInlineEmail] = useState("");
  const [inlinePassword, setInlinePassword] = useState("");
  const [inlineLoggingIn, setInlineLoggingIn] = useState(false);

  // Timesheet Anchor & Week
  const [weekAnchor, setWeekAnchor] = useState<Date>(new Date());
  const weekStart = useMemo(
    () => startOfWeek(weekAnchor, { weekStartsOn: 1 }),
    [weekAnchor],
  );
  const weekDays = useMemo(
    () => DAYS.map((i) => addDays(weekStart, i)),
    [weekStart],
  );

  const [entries, setEntries] = useState<Record<string, TimeEntry>>({});
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [target, setTarget] = useState<EditingTarget | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const entryKey = (date: string, hour: number) => `${date}|${hour}`;

  // Load recent tickets from local storage
  const loadStoredTickets = () => {
    try {
      const stored = localStorage.getItem(STORAGE_LOCAL_TICKETS);
      if (stored) {
        setRecentTickets(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    loadStoredTickets();
  }, []);

  // Auth Check
  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      if (data.user) {
        setUserEmail(data.user.email ?? "");
        setUserId(data.user.id);
        setIsPartnerUser(true);
      } else {
        setIsPartnerUser(false);
      }
      setAuthReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserEmail(session.user.email ?? "");
        setUserId(session.user.id);
        setIsPartnerUser(true);
      } else {
        setUserEmail("");
        setUserId("");
        setIsPartnerUser(false);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Update tab in URL query params
  const handleTabChange = (tab: "tickets" | "worksheet") => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    setSearchParams(params, { replace: true });
  };

  // Toggle Language Handler with URL persistence
  const handleLanguageToggle = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
    const params = new URLSearchParams(searchParams);
    params.set("lang", nextLang);
    setSearchParams(params, { replace: true });
  };

  // Load entries for the visible week if authenticated
  useEffect(() => {
    if (!isPartnerUser) return;
    setLoadingEntries(true);
    const from = toDateKey(weekStart);
    const to = toDateKey(addDays(weekStart, 6));

    supabase
      .from("time_entries")
      .select("*")
      .gte("entry_date", from)
      .lte("entry_date", to)
      .order("entry_date", { ascending: true })
      .order("hour", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          toast({ title: isRtl ? "تعذر تحميل السجلات" : "Couldn't load entries", description: error.message, variant: "destructive" });
          setLoadingEntries(false);
          return;
        }
        const map: Record<string, TimeEntry> = {};
        for (const row of (data ?? []) as TimeEntry[]) {
          map[entryKey(row.entry_date, row.hour)] = row;
        }
        setEntries(map);
        setLoadingEntries(false);
      });
  }, [isPartnerUser, weekStart, toast, isRtl]);

  const totalHoursThisWeek = Object.keys(entries).length;

  const handleCellClick = (date: Date, hour: number) => {
    const key = entryKey(toDateKey(date), hour);
    setTarget({ date, hour, entry: entries[key] ?? null });
  };

  const handleSave = async (draft: Pick<TimeEntry, "title" | "description" | "project" | "notes">) => {
    if (!target || !userId) return;
    setSaving(true);
    const dateStr = toDateKey(target.date);

    const payload = {
      user_id: userId,
      entry_date: dateStr,
      hour: target.hour,
      title: draft.title.trim(),
      description: draft.description.trim(),
      project: draft.project.trim(),
      notes: draft.notes.trim(),
    };

    const result = target.entry
      ? await supabase
          .from("time_entries")
          .update(payload)
          .eq("id", target.entry.id)
          .select()
          .single()
      : await supabase
          .from("time_entries")
          .upsert(payload, { onConflict: "user_id,entry_date,hour" })
          .select()
          .single();

    setSaving(false);
    if (result.error) {
      toast({ title: isRtl ? "تعذر حفظ الإدخال" : "Couldn't save entry", description: result.error.message, variant: "destructive" });
      return;
    }
    const saved = result.data as TimeEntry;
    setEntries((prev) => ({ ...prev, [entryKey(saved.entry_date, saved.hour)]: saved }));
    setTarget(null);
    toast({ title: target.entry ? (isRtl ? "تم تعديل السجل" : "Entry updated") : (isRtl ? "تم تسجيل الساعة" : "Hour logged") });
  };

  const handleDelete = async () => {
    if (!target?.entry) return;
    setDeleting(true);
    const { error } = await supabase.from("time_entries").delete().eq("id", target.entry.id);
    setDeleting(false);
    if (error) {
      toast({ title: isRtl ? "تعذر الحذف" : "Couldn't delete", description: error.message, variant: "destructive" });
      return;
    }
    setEntries((prev) => {
      const next = { ...prev };
      delete next[entryKey(target.entry!.entry_date, target.entry!.hour)];
      return next;
    });
    setTarget(null);
    toast({ title: isRtl ? "تم حذف السجل بنجاح" : "Entry deleted" });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsPartnerUser(false);
    setUserEmail("");
    toast({ title: isRtl ? "تم تسجيل الخروج بنجاح" : "Signed out successfully" });
  };

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineEmail || !inlinePassword) return;
    setInlineLoggingIn(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: inlineEmail,
      password: inlinePassword,
    });
    setInlineLoggingIn(false);
    if (error) {
      toast({
        title: isRtl ? "فشل تسجيل الدخول" : "Sign-in failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    if (data.user) {
      setUserEmail(data.user.email ?? "");
      setUserId(data.user.id);
      setIsPartnerUser(true);
      toast({
        title: isRtl ? "مرحباً بك مجدداً" : "Welcome back",
        description: isRtl ? "تم تفعيل جدول أعمالك الأسبوعي." : "Worksheet loaded.",
      });
    }
  };

  const goPrevWeek = () => setWeekAnchor((d) => addWeeks(d, -1));
  const goNextWeek = () => setWeekAnchor((d) => addWeeks(d, 1));
  const goToday = () => setWeekAnchor(new Date());

  const weekEnd = addDays(weekStart, 6);
  const weekLabel = isRtl
    ? `${new Intl.DateTimeFormat("ar-EG", { month: "short", day: "numeric" }).format(weekStart)} – ${new Intl.DateTimeFormat("ar-EG", { month: "short", day: "numeric", year: "numeric" }).format(weekEnd)}`
    : `${format(weekStart, "MMM d")} – ${format(weekEnd, "MMM d, yyyy")}`;

  if (!authReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground transition-all duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* ── TOP OPERATIONAL BAR ──────────────────────────────────────────────── */}
      <div className="border-b border-border/40 bg-[#0d0f17] text-[11px] py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-muted-foreground font-medium">
              {t.systemsStatusLive}
            </span>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <Link to="/portal" className="hover:text-primary transition-colors flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>{isRtl ? "أدلة العمليات المعتمدة" : "Client Deliverables (SOPs)"}</span>
            </Link>
            <span>·</span>
            <Link to="/" className="hover:text-primary transition-colors">
              {isRtl ? "الموقع الرئيسي" : "Main Website"}
            </Link>
          </div>
        </div>
      </div>

      {/* ── EXECUTIVE HEADER ────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/85">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand & Portal Badge */}
          <div className="flex items-center gap-3">
            <a href="/" className="font-display font-bold text-base inline-flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/50" />
              <span className="text-gradient-gold tracking-tight">
                {isRtl ? "دبي في القاهرة" : "Dubai in Cairo"}
              </span>
              <span className="hidden sm:inline text-muted-foreground/60 font-normal">|</span>
              <span className="hidden sm:inline text-xs text-muted-foreground font-medium">
                {isRtl ? "بوابة الشركاء والعمليات" : "Operations Desk"}
              </span>
            </a>
          </div>

          {/* Controls: Language Switcher + Tickets History + User Session */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Switcher strictly isolated */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="h-9 md:h-10 px-3.5 md:px-4 text-xs font-semibold gap-2 border border-border/80 bg-card/60 hover:bg-card text-foreground hover:text-foreground hover:border-primary/50 rounded-xl transition-all shadow-sm shrink-0"
            >
              <Languages className="w-4 h-4 text-primary shrink-0" />
              <span>{isRtl ? "التحويل للإنجليزية" : "Switch to Arabic"}</span>
            </Button>

            {/* My Tickets Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                loadStoredTickets();
                setHistoryOpen(true);
              }}
              className="h-9 md:h-10 ps-3.5 pe-3 md:ps-4 md:pe-3.5 text-xs font-semibold gap-2 border border-border/80 bg-card/60 hover:bg-card text-foreground hover:text-foreground hover:border-primary/50 rounded-xl transition-all shadow-sm shrink-0"
            >
              <History className="w-4 h-4 text-primary shrink-0" />
              <span className="hidden sm:inline">{t.myTicketsBtn}</span>
              {recentTickets.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary/20 text-primary text-[11px] font-bold font-mono ms-1 ring-1 ring-primary/30">
                  {recentTickets.length}
                </span>
              )}
            </Button>

            {/* User Session */}
            {isPartnerUser ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-xs text-muted-foreground font-mono truncate max-w-[140px]">
                  {userEmail}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="h-9 md:h-10 px-3 text-xs text-muted-foreground hover:text-foreground rounded-xl"
                >
                  <LogOut className="w-4 h-4 mx-1" />
                  <span className="hidden sm:inline">{isRtl ? "خروج" : "Sign out"}</span>
                </Button>
              </div>
            ) : (
              <Link to="/partner/login" className="shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 md:h-10 px-3.5 md:px-4 text-xs font-semibold gap-2 border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary rounded-xl transition-all shadow-sm"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{isRtl ? "دخول الشركاء" : "Partner Login"}</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO & MASTER WORKFLOW SWITCHER ─────────────────────────────────── */}
      <div className="border-b border-border/50 bg-gradient-to-b from-card/30 via-background to-background py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.portalBadge}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground tracking-tight">
            {t.portalTitle}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.portalSubtitle}
          </p>

          {/* Master Workflow Switcher Segmented Control */}
          <div className="pt-3 flex justify-center">
            <div className="p-1.5 rounded-2xl bg-card/80 border border-border/90 shadow-2xl shadow-black/60 inline-flex items-center gap-2 max-w-full overflow-x-auto backdrop-blur-lg">
              {/* Tab 1: Client Tickets */}
              <button
                type="button"
                onClick={() => handleTabChange("tickets")}
                className={cn(
                  "px-5 md:px-7 py-3 rounded-xl text-xs md:text-sm font-display font-semibold transition-all flex items-center gap-2.5 shrink-0 active:scale-[0.99]",
                  activeTab === "tickets"
                    ? "bg-gradient-to-r from-amber-500 via-primary to-yellow-500 text-slate-950 shadow-lg shadow-primary/25 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/60",
                )}
              >
                <Ticket className="w-4 h-4 shrink-0" />
                <span>{t.tabTickets}</span>
              </button>

              {/* Tab 2: Freelancer Worksheet */}
              <button
                type="button"
                onClick={() => handleTabChange("worksheet")}
                className={cn(
                  "px-5 md:px-7 py-3 rounded-xl text-xs md:text-sm font-display font-semibold transition-all flex items-center gap-2.5 shrink-0 active:scale-[0.99]",
                  activeTab === "worksheet"
                    ? "bg-gradient-to-r from-amber-500 via-primary to-yellow-500 text-slate-950 shadow-lg shadow-primary/25 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/60",
                )}
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>{t.tabWorksheet}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT WORKSPACE ──────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* WORKFLOW 1: CLIENT SUPPORT TICKETS */}
        {activeTab === "tickets" && (
          <div className="animate-in fade-in zoom-in-98 duration-300">
            <div className="max-w-3xl mx-auto">
              <ClientTicketForm
                lang={lang}
                onTicketSubmitted={(newTicket) => {
                  loadStoredTickets();
                }}
              />
            </div>
          </div>
        )}

        {/* WORKFLOW 2: FREELANCER WORKSHEET */}
        {activeTab === "worksheet" && (
          <div className="animate-in fade-in zoom-in-98 duration-300">
            {isPartnerUser ? (
              <div className="space-y-6">
                {/* Week navigation + summary */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-card/40 p-4 rounded-2xl border border-border/70">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={goPrevWeek} aria-label="Previous week" className="h-9 w-9 p-0 rounded-xl">
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={goToday} className="font-display h-9 rounded-xl">
                      <CalendarIcon className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                      {isRtl ? "اليوم" : "Today"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={goNextWeek} aria-label="Next week" className="h-9 w-9 p-0 rounded-xl">
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </Button>
                    <h2 className="ml-2 font-display font-bold text-base md:text-lg">{weekLabel}</h2>
                  </div>

                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-primary/30 bg-primary/10">
                    <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground font-medium">
                      {isRtl ? "إجمالي الساعات هذا الأسبوع:" : "This week total:"}
                    </span>
                    <span className="font-display font-bold text-lg text-primary">
                      {totalHoursThisWeek}<span className="text-xs text-muted-foreground font-normal">h</span>
                    </span>
                  </div>
                </div>

                {/* Grid */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
                  {/* Day headers strictly isolated */}
                  <div
                    className="grid border-b border-border bg-background/50"
                    style={{ gridTemplateColumns: "70px repeat(7, minmax(0, 1fr))" }}
                  >
                    <div className="px-2 py-2.5 text-[10px] uppercase tracking-wider text-muted-foreground" />
                    {weekDays.map((day) => {
                      const today = isToday(day);
                      const dayKey = toDateKey(day);
                      const dayTotal = HOURS.reduce(
                        (acc, h) => (entries[entryKey(dayKey, h)] ? acc + 1 : acc),
                        0,
                      );
                      const dayName = isRtl ? AR_DAY_NAMES[day.getDay()] : format(day, "EEE");

                      return (
                        <div
                          key={dayKey}
                          className={cn(
                            "px-2 py-2 text-center border-l border-border",
                            today && "bg-primary/10",
                          )}
                        >
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                            {dayName}
                          </div>
                          <div className={cn(
                            "font-display font-bold text-base leading-none mt-0.5",
                            today && "text-primary font-extrabold",
                          )}>
                            {format(day, "d")}
                          </div>
                          {dayTotal > 0 && (
                            <div className="text-[10px] text-primary mt-0.5 font-mono font-bold">
                              {dayTotal}h
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Hour rows */}
                  <div className="max-h-[calc(100vh-260px)] overflow-y-auto relative">
                    {loadingEntries && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/60 backdrop-blur-sm">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" aria-hidden="true" />
                      </div>
                    )}

                    {HOURS.map((hour) => (
                      <div
                        key={hour}
                        id={`hour-${String(hour).padStart(2, "0")}`}
                        className="grid border-b border-border/60 last:border-b-0"
                        style={{ gridTemplateColumns: "70px repeat(7, minmax(0, 1fr))" }}
                      >
                        {/* Hour label strictly isolated */}
                        <div className="px-2 py-1 text-[10px] text-muted-foreground text-right font-mono leading-tight border-r border-border/60 flex items-start justify-end pt-1.5">
                          {formatHourDisplay(hour, isRtl)}
                        </div>

                        {weekDays.map((day) => {
                          const dayKey = toDateKey(day);
                          const key = entryKey(dayKey, hour);
                          const entry = entries[key];
                          const today = isToday(day);
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => handleCellClick(day, hour)}
                              className={cn(
                                "group relative h-14 md:h-16 border-l border-border/60 px-1.5 py-1 text-left transition-colors",
                                today && !entry && "bg-primary/[0.025]",
                                entry
                                  ? "bg-primary/15 hover:bg-primary/25 cursor-pointer"
                                  : "hover:bg-primary/[0.06]",
                              )}
                              aria-label={
                                entry
                                  ? `${entry.title} — ${isRtl ? AR_DAY_NAMES[day.getDay()] : format(day, "EEEE")} at ${formatHourDisplay(hour, isRtl)}`
                                  : isRtl
                                  ? `تسجيل عمل ليوم ${AR_DAY_NAMES[day.getDay()]} الساعة ${formatHourDisplay(hour, isRtl)}`
                                  : `Log work for ${format(day, "EEEE")} at ${formatHourDisplay(hour, isRtl)}`
                              }
                            >
                              {entry ? (
                                <div className="h-full flex flex-col justify-between">
                                  <div className="text-[11px] font-semibold text-foreground line-clamp-2 leading-tight">
                                    {entry.title}
                                  </div>
                                  {entry.project && (
                                    <div className="text-[9px] text-primary/90 truncate font-mono uppercase tracking-wider font-bold">
                                      {entry.project}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Plus
                                  aria-hidden="true"
                                  className="w-3.5 h-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground text-center mt-4">
                  {isRtl
                    ? "تلميح: اضغط على أي خانة فارغة لتسجيل ساعة عمل جديدة. اضغط على أي خانة مسجلة للتعديل أو الحذف."
                    : "Tip: click any empty cell to log an hour. Click a filled cell to edit or delete."}
                </p>
              </div>
            ) : (
              /* Inline Partner Sign In card */
              <div className="max-w-md mx-auto py-8">
                <div className="rounded-3xl border border-border/80 bg-card/90 p-6 md:p-8 shadow-2xl text-center space-y-5 backdrop-blur-xl">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto shadow-inner">
                    <Briefcase className="w-7 h-7 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground">
                      {isRtl ? "تسجيل دخول الشركاء والمستقلين" : "Freelancer & Partner Sign In"}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {isRtl
                        ? "يرجى تسجيل الدخول بحساب الشريك لاستعراض وتعديل جدول ساعات العمل الأسبوعي الخاص بك."
                        : "Sign in with your partner credentials to view and log your weekly project worksheet hours."}
                    </p>
                  </div>

                  <form onSubmit={handleInlineLogin} className="space-y-3.5 text-start">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-foreground/80">
                        {isRtl ? "البريد الإلكتروني" : "Email address"}
                      </label>
                      <input
                        type="email"
                        value={inlineEmail}
                        onChange={(e) => setInlineEmail(e.target.value)}
                        placeholder="freelancer@partner.com"
                        required
                        className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-foreground/80">
                        {isRtl ? "كلمة المرور" : "Password"}
                      </label>
                      <input
                        type="password"
                        value={inlinePassword}
                        onChange={(e) => setInlinePassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={inlineLoggingIn}
                      className="w-full h-11 font-display font-bold text-sm bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 mt-2 rounded-xl"
                    >
                      {inlineLoggingIn ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>{isRtl ? "تسجيل الدخول وفتح الجدول" : "Sign In & Open Worksheet"}</span>
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="pt-3 border-t border-border/60 text-xs text-muted-foreground">
                    <Link
                      to="/partner/login"
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <span>{isRtl ? "إنشاء حساب شريك جديد أو استعادة كلمة المرور" : "Need an account or full sign-in page?"}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Ticket History Modal */}
      <TicketHistoryModal
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        tickets={recentTickets}
        lang={lang}
      />

      {/* Timesheet Entry Modal */}
      <EntryModal
        open={!!target}
        entry={target?.entry ?? null}
        date={target?.date ?? null}
        hour={target?.hour ?? null}
        saving={saving}
        deleting={deleting}
        lang={lang}
        onClose={() => setTarget(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PartnerTimeTracker;
