import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { format } from "date-fns";

export interface TimeEntry {
  id: string;
  user_id: string;
  entry_date: string; // yyyy-MM-dd
  hour: number;
  title: string;
  description: string;
  project: string;
  notes: string;
}

type Draft = Pick<TimeEntry, "title" | "description" | "project" | "notes">;

const emptyDraft: Draft = { title: "", description: "", project: "", notes: "" };

const formatHourLabel = (hour: number) => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return format(date, "h a");
};

interface Props {
  open: boolean;
  entry: TimeEntry | null;
  date: Date | null;
  hour: number | null;
  saving: boolean;
  deleting: boolean;
  lang?: "en" | "ar";
  onClose: () => void;
  onSave: (draft: Draft) => void;
  onDelete: () => void;
}

const AR_DAY_NAMES = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const formatHourLabelLocal = (hour: number, isRtl: boolean) => {
  if (!isRtl) {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    return format(date, "h a");
  }
  const period = hour >= 12 ? "م" : "ص";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${period}`;
};

export default function EntryModal({
  open,
  entry,
  date,
  hour,
  saving,
  deleting,
  lang = "en",
  onClose,
  onSave,
  onDelete,
}: Props) {
  const isRtl = lang === "ar";
  const [draft, setDraft] = useState<Draft>(emptyDraft);

  useEffect(() => {
    if (!open) return;
    setDraft(entry
      ? { title: entry.title, description: entry.description, project: entry.project, notes: entry.notes }
      : emptyDraft);
  }, [open, entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    onSave(draft);
  };

  const heading = date && hour !== null
    ? isRtl
      ? `${AR_DAY_NAMES[date.getDay()]} · ${formatHourLabelLocal(hour, true)} – ${formatHourLabelLocal((hour + 1) % 24, true)}`
      : `${format(date, "EEEE, MMM d")} · ${formatHourLabelLocal(hour, false)}–${formatHourLabelLocal((hour + 1) % 24, false)}`
    : isRtl ? "سجل ساعات العمل" : "Time entry";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border" dir={isRtl ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="font-display">
            {entry
              ? (isRtl ? "تعديل السجل" : "Edit entry")
              : (isRtl ? "تسجيل ساعة عمل" : "Log work")}
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">{heading}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold mb-1.5">
              {isRtl ? "عنوان المهمة *" : "Task title *"}
            </label>
            <Input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder={isRtl ? "ما الذي كنت تعمل عليه خلال هذه الساعة؟" : "What were you working on?"}
              required
              autoFocus
              className="bg-background border-border"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5">
              {isRtl ? "المشروع أو العميل" : "Project / Client"}
            </label>
            <Input
              value={draft.project}
              onChange={(e) => setDraft({ ...draft, project: e.target.value })}
              placeholder={isRtl ? "مثال: سويس بلو، مهمة داخلية..." : "e.g. Swiss Blue, Internal"}
              className="bg-background border-border"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5">
              {isRtl ? "وصف العمل المنجز" : "Description of completed work"}
            </label>
            <Textarea
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              placeholder={isRtl ? "تفاصيل ما تم إنجازه خلال هذه الساعة بالتحديد" : "Detail what was achieved during this hour"}
              rows={3}
              className="bg-background border-border resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5">
              {isRtl ? "ملاحظات إضافية (اختياري)" : "Notes (optional)"}
            </label>
            <Textarea
              value={draft.notes}
              onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              placeholder={isRtl ? "أي تفاصيل أخرى جديرة بالتوثيق" : "Anything else worth remembering"}
              rows={2}
              className="bg-background border-border resize-none"
            />
          </div>

          <DialogFooter className="flex-row justify-between sm:justify-between gap-2 pt-2">
            {entry ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onDelete}
                disabled={deleting || saving}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                {deleting
                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                  : <Trash2 className="w-3.5 h-3.5 mx-1" aria-hidden="true" />}
                {isRtl ? "حذف" : "Delete"}
              </Button>
            ) : <span />}

            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={saving || deleting}>
                {isRtl ? "إلغاء" : "Cancel"}
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={saving || deleting || !draft.title.trim()}
                className="font-display font-semibold glow-gold"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin mx-1" aria-hidden="true" />}
                {saving
                  ? (isRtl ? "جاري الحفظ…" : "Saving…")
                  : entry
                  ? (isRtl ? "حفظ التعديلات" : "Save changes")
                  : (isRtl ? "تسجيل الساعة" : "Log hour")}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
