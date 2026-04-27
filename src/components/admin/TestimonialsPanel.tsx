import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, ArrowLeft, Save, Star, Upload, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type Testimonial = {
  id: string;
  client_name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number | null;
  avatar_url: string | null;
  sort_order: number | null;
  published: boolean | null;
  relation: string | null;
  linkedin_url: string | null;
};

const EMPTY: Omit<Testimonial, "id"> = {
  client_name: "", role: "", company: "", content: "",
  rating: 5, avatar_url: "", sort_order: 0, published: true,
  relation: "", linkedin_url: "",
};

function SortableRow({ t, onEdit, onToggle, onDelete }: {
  t: Testimonial;
  onEdit: (t: Testimonial) => void;
  onToggle: (id: string, val: boolean) => void;
  onDelete: (id: string, name: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: t.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("rounded-xl border border-border bg-card p-4 flex items-center gap-3", isDragging && "opacity-50 shadow-lg")}
    >
      <button {...attributes} {...listeners} className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing shrink-0">
        <GripVertical className="w-4 h-4" />
      </button>

      {/* Avatar thumbnail */}
      <div className="w-9 h-9 rounded-full border border-border bg-muted flex items-center justify-center shrink-0 overflow-hidden">
        {t.avatar_url ? (
          <img src={t.avatar_url} alt={t.client_name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs font-bold text-muted-foreground">{t.client_name.charAt(0)}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display font-semibold text-sm">{t.client_name || "Untitled"}</span>
          {t.company && <span className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-semibold">{t.company}</span>}
          {t.rating != null && (
            <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5" /> {t.rating}
            </span>
          )}
          {!t.published && <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-semibold">Draft</span>}
        </div>
        {t.role && <p className="text-xs text-muted-foreground mt-0.5 truncate">{t.role}</p>}
        <p className="text-xs text-muted-foreground truncate mt-0.5 italic">"{t.content}"</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={() => onToggle(t.id, !t.published)} title={t.published ? "Unpublish" : "Publish"}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          {t.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button onClick={() => onEdit(t)}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(t.id, t.client_name)}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Avatar photo uploader ────────────────────────────────────────────────────
function AvatarUploader({ name, value, onChange }: {
  name: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      toast({ title: "Unsupported file type", description: "Please upload a JPG, PNG, WebP or GIF.", variant: "destructive" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 2 MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext  = file.name.split(".").pop() ?? "jpg";
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "client";
    const path = `testimonials/${slug}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("assets").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("assets").getPublicUrl(path);
    onChange(data.publicUrl);
    toast({ title: "Photo uploaded!" });
    setUploading(false);
    e.target.value = "";
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-foreground mb-2">Client Photo</label>
      <div className="flex items-center gap-4">

        {/* Circular preview */}
        <div className="w-16 h-16 rounded-full border-2 border-border bg-muted flex items-center justify-center shrink-0 overflow-hidden">
          {value ? (
            <img src={value} alt="Avatar preview" className="w-full h-full object-cover" />
          ) : (
            <User className="w-7 h-7 text-muted-foreground/40" />
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {/* Upload button */}
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFile} />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-muted hover:bg-muted/80 text-foreground transition-colors disabled:opacity-50"
          >
            {uploading
              ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…</>
              : <><Upload className="w-3.5 h-3.5" /> Upload Photo</>
            }
          </button>

          {/* Clear button — only shown when a photo exists */}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors self-start"
            >
              <X className="w-3 h-3" /> Remove photo
            </button>
          )}
        </div>
      </div>

      {/* Optional: paste a URL directly */}
      <div className="mt-3">
        <label className="block text-[11px] text-muted-foreground mb-1">Or paste a URL directly</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="flex w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, long }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; long?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.max(long ? 80 : 36, el.scrollHeight) + "px";
  }, [long]);
  useEffect(() => { resize(); }, [value, resize]);
  return (
    <div>
      <label className="block text-xs font-semibold text-foreground mb-1.5">{label}</label>
      <textarea ref={ref} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onInput={resize}
        rows={long ? 3 : 1}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none overflow-hidden" />
    </div>
  );
}

export function TestimonialsPanel({ logActivity }: { logActivity: (action: string, label: string) => void }) {
  const { toast } = useToast();
  const [list, setList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    if (data) setList(data as Testimonial[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing({ ...EMPTY }); setIsNew(true); };
  const openEdit = (t: Testimonial) => { setEditing({ ...t }); setIsNew(false); };
  const close    = () => { setEditing(null); setIsNew(false); };

  const set = (key: string, val: string | boolean | number) =>
    setEditing((prev) => prev ? { ...prev, [key]: val } : prev);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const payload = { ...editing };
    if (isNew) {
      const { error } = await supabase.from("testimonials").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Testimonial created!" }); logActivity("created", editing.client_name || "New Testimonial"); close(); load(); }
    } else {
      const { error } = await supabase.from("testimonials").update(payload).eq("id", editing.id!);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Saved!" }); logActivity("updated", editing.client_name || "Testimonial"); close(); load(); }
    }
    setSaving(false);
  };

  const togglePublished = async (id: string, val: boolean) => {
    await supabase.from("testimonials").update({ published: val }).eq("id", id);
    setList((prev) => prev.map((t) => t.id === id ? { ...t, published: val } : t));
    const t = list.find((t) => t.id === id);
    logActivity(val ? "published" : "unpublished", t?.client_name ?? "Testimonial");
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"? This cannot be undone.`)) return;
    await supabase.from("testimonials").delete().eq("id", id);
    setList((prev) => prev.filter((t) => t.id !== id));
    logActivity("deleted", name);
    toast({ title: "Deleted" });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = list.findIndex((t) => t.id === active.id);
    const newIdx = list.findIndex((t) => t.id === over.id);
    const reordered = arrayMove(list, oldIdx, newIdx);
    setList(reordered);
    await Promise.all(reordered.map((t, i) =>
      supabase.from("testimonials").update({ sort_order: i }).eq("id", t.id)
    ));
  };

  if (loading) return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="space-y-3 animate-pulse">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-muted" />)}</div>
    </main>
  );

  if (editing) return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={close} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="font-display font-bold text-lg">{isNew ? "New Testimonial" : `Edit — ${editing.client_name}`}</h2>
      </div>
      <div className="space-y-5">
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Client</p>
          <Field label="Client Name *" value={editing.client_name || ""} onChange={(v) => set("client_name", v)} />
          <Field label="Role / Title" value={editing.role || ""} onChange={(v) => set("role", v)} placeholder="e.g. Marketing Director" />
          <Field label="Company" value={editing.company || ""} onChange={(v) => set("company", v)} placeholder="e.g. Novartis Egypt" />
          <AvatarUploader name={editing.client_name || ""} value={editing.avatar_url || ""} onChange={(v) => set("avatar_url", v)} />
          <Field label="Relation / Date" value={editing.relation || ""} onChange={(v) => set("relation", v)} placeholder="e.g. March 2024 · Nouran was Abdalla's client" />
          <Field label="LinkedIn Profile URL" value={editing.linkedin_url || ""} onChange={(v) => set("linkedin_url", v)} placeholder="https://linkedin.com/in/..." />
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Testimonial</p>
          <Field label="Testimonial Text *" value={editing.content || ""} onChange={(v) => set("content", v)} long placeholder="What did the client say?" />
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => set("rating", n)}
                  className={cn("w-9 h-9 rounded-lg border text-sm font-bold transition-colors", (editing.rating ?? 5) >= n ? "bg-amber-500/20 border-amber-500/40 text-amber-500" : "border-border text-muted-foreground hover:border-border/80")}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Settings</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={!!editing.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 accent-primary" />
            <span className="text-sm">Published (visible on site)</span>
          </label>
          <Field label="Sort Order" value={String(editing.sort_order ?? 0)} onChange={(v) => set("sort_order", parseInt(v) || 0)} placeholder="0" />
        </div>
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving} className="glow-gold font-display">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
            {isNew ? "Create Testimonial" : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={close}>Cancel</Button>
        </div>
      </div>
    </main>
  );

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-lg">Testimonials</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{list.length} total · drag to reorder</p>
        </div>
        <Button onClick={openNew} size="sm" className="glow-gold font-display">
          <Plus className="w-4 h-4 mr-1.5" /> New Testimonial
        </Button>
      </div>
      {list.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <Star className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground mb-4">No testimonials yet.</p>
          <Button onClick={openNew} size="sm" variant="outline"><Plus className="w-4 h-4 mr-1.5" /> Add first testimonial</Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={list.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {list.map((t) => (
                <SortableRow key={t.id} t={t} onEdit={openEdit} onToggle={togglePublished} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </main>
  );
}
