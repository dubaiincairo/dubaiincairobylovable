import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2, Save, LogOut, ArrowLeft, ChevronDown, Search, X,
  Type, AlignLeft, MousePointer, Hash, LayoutList,
} from "lucide-react";
import { contentRegistry, sectionOrder, sectionLabels, type ContentField } from "@/lib/contentRegistry";
import { cn } from "@/lib/utils";

// ─── Icons & labels ──────────────────────────────────────────────────────────

const sectionIcons: Record<string, string> = {
  nav: "🧭", hero: "🏠", stats: "📊", about: "ℹ️", edges: "⚡",
  values: "💎", services: "🎯", founder: "👤", clients: "🤝",
  tech: "🛠️", google: "📍", legal: "📜", contact: "✉️", footer: "🔗",
};

const sectionDescriptions: Record<string, string> = {
  nav: "Logo name, nav links, CTA button",
  hero: "Headline, sub-headline, CTA buttons, right-side visual card",
  stats: "Key numbers shown below the hero",
  about: "Who we are — text block",
  edges: "Why we're different — 6 cards",
  values: "Our core values — 6 cards",
  services: "Six specialised studios",
  founder: "Founder quote & bio",
  clients: "Client names marquee",
  tech: "Tech stack categories & tools",
  google: "Google Maps widget — name, address, rating, links",
  legal: "Company registration details",
  contact: "Contact form labels & copy",
  footer: "Footer tagline & copyright",
};

const subItemLabels: Record<string, string> = {
  services: "Studio",
  edges: "Edge",
  values: "Value",
  tech: "Category",
};

// ─── Field-type helpers ───────────────────────────────────────────────────────

type FieldType = "heading" | "body" | "button" | "number" | "text";

function detectFieldType(key: string): FieldType {
  if (/headline|_title/.test(key)) return "heading";
  if (/body|_desc|description|subtext|tagline|quote|attribution/.test(key)) return "body";
  if (/cta|_btn|button/.test(key)) return "button";
  if (/stat_(?!.*_label)/.test(key)) return "number";
  return "text";
}

const fieldTypeConfig: Record<FieldType, { label: string; icon: typeof Type; color: string }> = {
  heading: { label: "Heading",  icon: Type,           color: "text-amber-500  bg-amber-500/10" },
  body:    { label: "Body",     icon: AlignLeft,      color: "text-blue-500   bg-blue-500/10"  },
  button:  { label: "Button",   icon: MousePointer,   color: "text-green-500  bg-green-500/10" },
  number:  { label: "Number",   icon: Hash,           color: "text-purple-500 bg-purple-500/10"},
  text:    { label: "Text",     icon: LayoutList,     color: "text-muted-foreground bg-muted"  },
};

// ─── Grouping within a section ───────────────────────────────────────────────

interface SectionGroups {
  headerFields: ContentField[];
  numbered: Record<string, ContentField[]>;  // "1" → [title, desc], "2" → ...
}

function groupSectionFields(fields: ContentField[]): SectionGroups {
  const headerFields: ContentField[] = [];
  const numbered: Record<string, ContentField[]> = {};
  for (const field of fields) {
    const m = field.key.match(/_(\d+)_/);
    if (m) {
      const n = m[1];
      if (!numbered[n]) numbered[n] = [];
      numbered[n].push(field);
    } else {
      headerFields.push(field);
    }
  }
  return { headerFields, numbered };
}

// ─── Component ───────────────────────────────────────────────────────────────

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dbValues, setDbValues]     = useState<Record<string, string>>({});
  const [edited, setEdited]         = useState<Record<string, string>>({});
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [openSections, setOpenSections]   = useState<Record<string, boolean>>({});
  const [openSubGroups, setOpenSubGroups] = useState<Record<string, boolean>>({});
  const [search, setSearch]         = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ── Auth & data load ──
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }

      const { data: roles } = await supabase
        .from("user_roles").select("role").eq("user_id", user.id).single();

      if (!roles || roles.role !== "admin") {
        await supabase.auth.signOut();
        navigate("/login");
        return;
      }

      const { data } = await supabase.from("site_content").select("key, value");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((row) => (map[row.key] = row.value));
        setDbValues(map);
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  // ── Cmd+S / Ctrl+S shortcut ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (Object.keys(edited).length > 0 && !saving) handleSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const handleChange = (key: string, value: string) =>
    setEdited((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(edited);
    let successCount = 0, errorCount = 0;

    for (const [key, value] of updates) {
      const existsInDb = dbValues[key] !== undefined;
      const field = contentRegistry.find((f) => f.key === key);

      if (existsInDb) {
        const { error } = await supabase.from("site_content")
          .update({ value, updated_at: new Date().toISOString() }).eq("key", key);
        if (error) errorCount++; else successCount++;
      } else if (field) {
        const { error } = await supabase.from("site_content")
          .insert({ section: field.section, key, value, label: field.label });
        if (error) errorCount++; else successCount++;
      }
    }

    setDbValues((prev) => {
      const next = { ...prev };
      updates.forEach(([k, v]) => (next[k] = v));
      return next;
    });
    setSaving(false);
    setEdited({});

    if (errorCount > 0) {
      toast({ title: "Partially saved", description: `${successCount} updated, ${errorCount} failed.`, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: `${successCount} field${successCount !== 1 ? "s" : ""} updated. Changes are live.` });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const toggleSection = (section: string) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const toggleSubGroup = (key: string) =>
    setOpenSubGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  const scrollToSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: true }));
    setActiveSection(section);
    setTimeout(() => {
      sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const hasEdits   = Object.keys(edited).length > 0;
  const editedKeys = new Set(Object.keys(edited));
  const searchLower = search.toLowerCase();

  const grouped = sectionOrder.reduce<Record<string, typeof contentRegistry>>((acc, section) => {
    acc[section] = contentRegistry.filter((f) => f.section === section);
    return acc;
  }, {});

  const filteredSections = sectionOrder.filter((section) => {
    if (!search) return true;
    const fields = grouped[section];
    return (
      (sectionLabels[section] || section).toLowerCase().includes(searchLower) ||
      fields.some(
        (f) =>
          f.label.toLowerCase().includes(searchLower) ||
          f.key.toLowerCase().includes(searchLower) ||
          (edited[f.key] ?? dbValues[f.key] ?? f.defaultValue).toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="min-h-screen bg-background flex">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-border bg-card/50 sticky top-0 h-screen overflow-y-auto shrink-0">
        <div className="p-5 border-b border-border">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs">Back to website</span>
          </a>
          <h1 className="font-display font-bold text-xl">
            <span className="text-gradient-gold">Content</span> Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-1">{contentRegistry.length} editable fields across {sectionOrder.length} sections</p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {sectionOrder.map((section) => {
            const fields = grouped[section];
            const editCount = fields.filter((f) => editedKeys.has(f.key)).length;
            const isActive = activeSection === section;
            const { numbered } = groupSectionFields(fields);
            const subCount = Object.keys(numbered).length;

            return (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left group",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <span className="text-lg leading-none shrink-0">{sectionIcons[section] || "📄"}</span>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium text-sm">{sectionLabels[section] || section}</div>
                  {subCount > 0 && (
                    <div className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {subCount} {subItemLabels[section]?.toLowerCase() || "item"}s
                    </div>
                  )}
                </div>
                {editCount > 0 && (
                  <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {editCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          {hasEdits ? (
            <Button onClick={handleSave} disabled={saving} size="sm" className="w-full glow-gold font-display">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
              Save {Object.keys(edited).length} Change{Object.keys(edited).length !== 1 ? "s" : ""}
            </Button>
          ) : (
            <div className="text-center text-xs text-muted-foreground py-1">No unsaved changes</div>
          )}
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1.5" /> Logout
          </Button>
          <p className="text-center text-[10px] text-muted-foreground">⌘S to save</p>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
          <div className="max-w-3xl mx-auto px-4 md:px-6 h-14 flex items-center gap-3">
            <div className="flex items-center gap-3 lg:hidden">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </a>
              <h1 className="font-display font-bold text-sm">
                <span className="text-gradient-gold">Content</span> Manager
              </h1>
            </div>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sections, fields, or content…"
                className="w-full h-9 pl-9 pr-8 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              {hasEdits && (
                <Button onClick={handleSave} disabled={saving} size="sm" className="glow-gold font-display h-9 px-3">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                </Button>
              )}
              <Button variant="outline" size="sm" className="h-9 px-3" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Sections */}
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 space-y-4">
          {filteredSections.map((section) => {
            const fields = grouped[section];
            if (!fields || fields.length === 0) return null;

            const isOpen = openSections[section] ?? false;
            const editCount = fields.filter((f) => editedKeys.has(f.key)).length;

            const visibleFields = search
              ? fields.filter(
                  (f) =>
                    f.label.toLowerCase().includes(searchLower) ||
                    f.key.toLowerCase().includes(searchLower) ||
                    (edited[f.key] ?? dbValues[f.key] ?? f.defaultValue).toLowerCase().includes(searchLower)
                )
              : fields;

            const shouldOpen = isOpen || (search.length > 0 && visibleFields.length > 0);
            const { headerFields, numbered } = groupSectionFields(visibleFields);
            const numberedEntries = Object.entries(numbered).sort(([a], [b]) => Number(a) - Number(b));
            const subLabel = subItemLabels[section] || "Item";

            return (
              <div
                key={section}
                ref={(el) => { sectionRefs.current[section] = el; }}
                className="rounded-xl border border-border bg-card overflow-hidden scroll-mt-20"
              >
                {/* ── Section header ── */}
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors text-left"
                >
                  <span className="text-2xl leading-none">{sectionIcons[section] || "📄"}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-display font-bold text-foreground">
                      {sectionLabels[section] || section}
                    </h2>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {sectionDescriptions[section]}
                      {editCount > 0 && (
                        <span className="text-primary ml-1.5 font-semibold">· {editCount} unsaved</span>
                      )}
                    </p>
                  </div>
                  {numberedEntries.length > 0 && (
                    <span className="shrink-0 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {numberedEntries.length} {subLabel.toLowerCase()}s
                    </span>
                  )}
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform shrink-0", shouldOpen && "rotate-180")} />
                </button>

                {shouldOpen && (
                  <div className="border-t border-border">

                    {/* ── Section-level fields (subtitle, headline, etc.) ── */}
                    {headerFields.length > 0 && (
                      <div className="divide-y divide-border">
                        {numberedEntries.length > 0 && (
                          <div className="px-5 py-2 bg-muted/30">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                              Section Settings
                            </span>
                          </div>
                        )}
                        {headerFields.map((field) => (
                          <FieldRow
                            key={field.key}
                            field={field}
                            value={edited[field.key] ?? dbValues[field.key] ?? field.defaultValue}
                            isEdited={editedKeys.has(field.key)}
                            onChange={handleChange}
                          />
                        ))}
                      </div>
                    )}

                    {/* ── Numbered sub-groups (Studio 1, Edge 2, …) ── */}
                    {numberedEntries.map(([num, groupFields]) => {
                      const subKey = `${section}:${num}`;
                      const isSubOpen = openSubGroups[subKey] ?? true;
                      const subEditCount = groupFields.filter((f) => editedKeys.has(f.key)).length;
                      const titleField = groupFields.find((f) => f.key.includes("_title") || f.key.includes("_label"));
                      const subTitle = titleField
                        ? (edited[titleField.key] ?? dbValues[titleField.key] ?? titleField.defaultValue)
                        : "";

                      return (
                        <div key={subKey} className="border-t border-border">
                          <button
                            onClick={() => toggleSubGroup(subKey)}
                            className="w-full flex items-center gap-3 px-5 py-3 bg-muted/20 hover:bg-muted/40 transition-colors text-left"
                          >
                            <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                              {num}
                            </span>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-semibold text-foreground">
                                {subLabel} {num}
                              </span>
                              {subTitle && (
                                <span className="text-muted-foreground text-xs ml-2 truncate">— {subTitle}</span>
                              )}
                            </div>
                            {subEditCount > 0 && (
                              <span className="shrink-0 text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                {subEditCount} edited
                              </span>
                            )}
                            <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform shrink-0", isSubOpen && "rotate-180")} />
                          </button>

                          {isSubOpen && (
                            <div className="divide-y divide-border">
                              {groupFields.map((field) => (
                                <FieldRow
                                  key={field.key}
                                  field={field}
                                  value={edited[field.key] ?? dbValues[field.key] ?? field.defaultValue}
                                  isEdited={editedKeys.has(field.key)}
                                  onChange={handleChange}
                                  indent
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {filteredSections.length === 0 && search && (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No fields match "<strong>{search}</strong>"</p>
              <button onClick={() => setSearch("")} className="mt-2 text-xs text-primary hover:underline">Clear search</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ─── FieldRow ─────────────────────────────────────────────────────────────────

function FieldRow({
  field, value, isEdited, onChange, indent = false,
}: {
  field: ContentField;
  value: string;
  isEdited: boolean;
  onChange: (key: string, val: string) => void;
  indent?: boolean;
}) {
  const type = detectFieldType(field.key);
  const { label: typeLabel, icon: TypeIcon, color: typeColor } = fieldTypeConfig[type];

  return (
    <div className={cn("py-3.5 transition-colors", indent ? "px-6" : "px-5", isEdited && "bg-primary/[0.03]")}>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-xs font-semibold text-foreground">{field.label}</label>
        <span className={cn("inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded", typeColor)}>
          <TypeIcon className="w-2.5 h-2.5" />
          {typeLabel}
        </span>
        {isEdited && (
          <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-auto">
            unsaved
          </span>
        )}
      </div>
      <AutoResizeTextarea value={value} onChange={(val) => onChange(field.key, val)} />
    </div>
  );
}

// ─── AutoResizeTextarea ───────────────────────────────────────────────────────

function AutoResizeTextarea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.max(36, el.scrollHeight) + "px";
  }, []);

  useEffect(() => { resize(); }, [value, resize]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onInput={resize}
      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden"
      rows={1}
    />
  );
}

export default Admin;
