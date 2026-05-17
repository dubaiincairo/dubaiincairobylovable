import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS = Array.from({ length: 7 }, (_, i) => i);

const formatHourShort = (hour: number) => {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return format(d, "h a");
};

const toDateKey = (date: Date) => format(date, "yyyy-MM-dd");

interface EditingTarget {
  date: Date;
  hour: number;
  entry: TimeEntry | null;
}

const PartnerTimeTracker = () => {
  useSEO({ title: "Partner Time Tracker", description: "", noindex: true });
  const navigate = useNavigate();
  const { toast } = useToast();

  const [authReady, setAuthReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // Anchor any Date within the currently visible week.
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
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState<EditingTarget | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const entryKey = (date: string, hour: number) => `${date}|${hour}`;

  // ── Auth gate ──────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      if (!data.user) {
        navigate("/partner/login", { replace: true });
        return;
      }
      setUserEmail(data.user.email ?? "");
      setUserId(data.user.id);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/partner/login", { replace: true });
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  // ── Load entries for the visible week ──────────────────────────────────
  useEffect(() => {
    if (!authReady) return;
    setLoading(true);
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
          toast({ title: "Couldn't load entries", description: error.message, variant: "destructive" });
          setLoading(false);
          return;
        }
        const map: Record<string, TimeEntry> = {};
        for (const row of (data ?? []) as TimeEntry[]) {
          map[entryKey(row.entry_date, row.hour)] = row;
        }
        setEntries(map);
        setLoading(false);
      });
  }, [authReady, weekStart, toast]);

  // Auto-scroll to 08:00 on first render so the workday is in view.
  useEffect(() => {
    if (!authReady) return;
    const el = document.getElementById("hour-08");
    if (el) el.scrollIntoView({ block: "start", behavior: "auto" });
  }, [authReady]);

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
      toast({ title: "Couldn't save entry", description: result.error.message, variant: "destructive" });
      return;
    }
    const saved = result.data as TimeEntry;
    setEntries((prev) => ({ ...prev, [entryKey(saved.entry_date, saved.hour)]: saved }));
    setTarget(null);
    toast({ title: target.entry ? "Entry updated" : "Hour logged" });
  };

  const handleDelete = async () => {
    if (!target?.entry) return;
    setDeleting(true);
    const { error } = await supabase.from("time_entries").delete().eq("id", target.entry.id);
    setDeleting(false);
    if (error) {
      toast({ title: "Couldn't delete", description: error.message, variant: "destructive" });
      return;
    }
    setEntries((prev) => {
      const next = { ...prev };
      delete next[entryKey(target.entry!.entry_date, target.entry!.hour)];
      return next;
    });
    setTarget(null);
    toast({ title: "Entry deleted" });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/partner/login", { replace: true });
  };

  const goPrevWeek = () => setWeekAnchor((d) => addWeeks(d, -1));
  const goNextWeek = () => setWeekAnchor((d) => addWeeks(d, 1));
  const goToday = () => setWeekAnchor(new Date());

  const weekLabel = `${format(weekStart, "MMM d")} – ${format(addDays(weekStart, 6), "MMM d, yyyy")}`;

  if (!authReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-3">
          <a href="/" className="font-display font-bold text-base inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-gradient-gold">Time</span>
            <span>Tracker</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-muted-foreground truncate max-w-[180px]">
              {userEmail}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Week navigation + summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goPrevWeek} aria-label="Previous week">
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToday} className="font-display">
              <CalendarIcon className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goNextWeek} aria-label="Next week">
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
            <h2 className="ml-2 font-display font-semibold text-lg md:text-xl">{weekLabel}</h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card">
            <Clock className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">This week</span>
            <span className="font-display font-bold text-base">
              {totalHoursThisWeek}<span className="text-muted-foreground font-normal">h</span>
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Day headers */}
          <div
            className="grid border-b border-border bg-background/40"
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
              return (
                <div
                  key={dayKey}
                  className={cn(
                    "px-2 py-2 text-center border-l border-border",
                    today && "bg-primary/5",
                  )}
                >
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {format(day, "EEE")}
                  </div>
                  <div className={cn(
                    "font-display font-bold text-base leading-none mt-0.5",
                    today && "text-primary",
                  )}>
                    {format(day, "d")}
                  </div>
                  {dayTotal > 0 && (
                    <div className="text-[10px] text-primary/80 mt-0.5 font-mono">
                      {dayTotal}h
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hour rows */}
          <div className="max-h-[calc(100vh-260px)] overflow-y-auto relative">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/60 backdrop-blur-sm">
                <Loader2 className="w-5 h-5 animate-spin text-primary" aria-hidden="true" />
              </div>
            )}

            {HOURS.map((hour) => (
              <div
                key={hour}
                id={`hour-${String(hour).padStart(2, "0")}`}
                className="grid border-b border-border/60 last:border-b-0"
                style={{ gridTemplateColumns: "70px repeat(7, minmax(0, 1fr))" }}
              >
                {/* Hour label */}
                <div className="px-2 py-1 text-[10px] text-muted-foreground text-right font-mono leading-tight border-r border-border/60 flex items-start justify-end pt-1.5">
                  {formatHourShort(hour)}
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
                          ? `${entry.title} — ${format(day, "EEEE")} at ${formatHourShort(hour)}`
                          : `Log work for ${format(day, "EEEE")} at ${formatHourShort(hour)}`
                      }
                    >
                      {entry ? (
                        <div className="h-full flex flex-col justify-between">
                          <div className="text-[11px] font-semibold text-foreground line-clamp-2 leading-tight">
                            {entry.title}
                          </div>
                          {entry.project && (
                            <div className="text-[9px] text-primary/90 truncate font-mono uppercase tracking-wider">
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
          Tip: click any empty cell to log an hour. Click a filled cell to edit or delete.
        </p>
      </main>

      <EntryModal
        open={!!target}
        entry={target?.entry ?? null}
        date={target?.date ?? null}
        hour={target?.hour ?? null}
        saving={saving}
        deleting={deleting}
        onClose={() => setTarget(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PartnerTimeTracker;
