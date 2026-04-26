import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2, Save, LogOut, ArrowLeft, ChevronDown, Search, X,
  Type, AlignLeft, MousePointer, Hash, LayoutList,
  Plus, Trash2, Pencil, Star, Eye, EyeOff, BookOpen, Briefcase, Landmark,
  Upload, ImageIcon, GripVertical, Mail, Menu, LayoutDashboard, MessageSquare,
} from "lucide-react";
import { contentRegistry, sectionOrder, sectionLabels, type ContentField } from "@/lib/contentRegistry";
import { cn } from "@/lib/utils";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { DashboardPanel } from "@/components/admin/DashboardPanel";
import { ContactSubmissionsPanel } from "@/components/admin/ContactSubmissionsPanel";
import { TestimonialsPanel } from "@/components/admin/TestimonialsPanel";

// ─── Icons & labels ──────────────────────────────────────────────────────────

const sectionIcons: Record<string, string> = {
  seo: "🔍",
  nav: "🧭", hero: "🏠", stats: "📊", about: "ℹ️", edges: "⚡",
  values: "💎", services: "🎯", founder: "👤", clients: "🤝",
  tech: "🛠️", google: "📍", legal: "📜", contact: "✉️", footer: "🔗",
  careers: "💼",
};

const sectionDescriptions: Record<string, string> = {
  nav: "Logo name, nav links, CTA button",
  hero: "Headline, sub-headline, CTA buttons, right-side visual card",
  stats: "Key numbers shown below the hero",
  about: "Text copy + dashboard visual (header, metrics, badge)",
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
  careers: "Hero, Why Join cards, job section labels, how to apply copy",
};

const subItemLabels: Record<string, string> = {
  hero: "Chip",
  about: "Metric",
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
  const [adminTab, setAdminTab]     = useState<"dashboard" | "content" | "case-studies" | "jobs" | "banks" | "testimonials" | "contacts">("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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

  // ── Activity logger ──
  const logActivity = useCallback(async (
    action: string,
    entityType: string,
    entityLabel: string,
    fieldsChanged?: number,
  ) => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("admin_activity_log").insert({
      user_email: user?.email ?? null,
      action,
      entity_type: entityType,
      entity_label: entityLabel,
      fields_changed: fieldsChanged ?? null,
    });
  }, []);

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

    if (successCount > 0) {
      logActivity("updated", "content", "Site Content", successCount);
    }

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

      {/* ── Sidebar (desktop) ───────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-border bg-card/50 sticky top-0 h-screen overflow-y-auto shrink-0">
        <SidebarContent
          adminTab={adminTab}
          setAdminTab={(tab) => setAdminTab(tab)}
          grouped={grouped}
          editedKeys={editedKeys}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          hasEdits={hasEdits}
          saving={saving}
          edited={edited}
          handleSave={handleSave}
          handleLogout={handleLogout}
          contentRegistry={contentRegistry}
          sectionOrder={sectionOrder}
        />
      </aside>

      {/* ── Mobile sidebar (sheet) ───────────────────────────────────────── */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 flex flex-col">
          <SidebarContent
            adminTab={adminTab}
            setAdminTab={(tab) => { setAdminTab(tab); setMobileSidebarOpen(false); }}
            grouped={grouped}
            editedKeys={editedKeys}
            activeSection={activeSection}
            scrollToSection={(s) => { scrollToSection(s); setMobileSidebarOpen(false); }}
            hasEdits={hasEdits}
            saving={saving}
            edited={edited}
            handleSave={handleSave}
            handleLogout={handleLogout}
            contentRegistry={contentRegistry}
            sectionOrder={sectionOrder}
          />
        </SheetContent>
      </Sheet>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
          <div className="max-w-3xl mx-auto px-4 md:px-6 h-14 flex items-center gap-3">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
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

        {adminTab === "dashboard"    && <DashboardPanel />}
        {adminTab === "contacts"     && <ContactSubmissionsPanel />}
        {adminTab === "testimonials" && <TestimonialsPanel logActivity={(action, label) => logActivity(action, "testimonial", label)} />}
        {adminTab === "case-studies" && <CaseStudiesPanel logActivity={logActivity} />}
        {adminTab === "jobs"         && <JobsPanel logActivity={logActivity} />}
        {adminTab === "banks"        && <BanksPanel logActivity={logActivity} />}

        {/* Sections */}
        {adminTab === "content" && <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 space-y-4">
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
        </main>}
      </div>
    </div>
  );
};

// ─── SidebarContent ───────────────────────────────────────────────────────────

type AdminTab = "dashboard" | "content" | "case-studies" | "jobs" | "banks" | "testimonials" | "contacts";

const TAB_ITEMS: { id: AdminTab; label: string; icon: typeof BookOpen }[] = [
  { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { id: "content",      label: "Content",      icon: Type },
  { id: "case-studies", label: "Cases",        icon: BookOpen },
  { id: "jobs",         label: "Jobs",         icon: Briefcase },
  { id: "banks",        label: "Banks",        icon: Landmark },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "contacts",     label: "Messages",     icon: Mail },
];

function SidebarContent({
  adminTab, setAdminTab, grouped, editedKeys, activeSection,
  scrollToSection, hasEdits, saving, edited, handleSave, handleLogout,
  contentRegistry: _cr, sectionOrder,
}: {
  adminTab: AdminTab;
  setAdminTab: (t: AdminTab) => void;
  grouped: Record<string, ContentField[]>;
  editedKeys: Set<string>;
  activeSection: string | null;
  scrollToSection: (s: string) => void;
  hasEdits: boolean;
  saving: boolean;
  edited: Record<string, string>;
  handleSave: () => void;
  handleLogout: () => void;
  contentRegistry: ContentField[];
  sectionOrder: string[];
}) {
  return (
    <>
      <div className="p-5 border-b border-border">
        <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs">Back to website</span>
        </a>
        <h1 className="font-display font-bold text-xl">
          <span className="text-gradient-gold">Content</span> Manager
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Dubai in Cairo CMS</p>
      </div>

      {/* Tab switcher */}
      <div className="px-3 pt-3 pb-1 border-b border-border space-y-0.5">
        {TAB_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setAdminTab(id)}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left",
              adminTab === id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* Section nav (content tab only) */}
      {adminTab === "content" && (
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {sectionOrder.map((section) => {
            const fields = grouped[section] ?? [];
            const editCount = fields.filter((f) => editedKeys.has(f.key)).length;
            const isActive = activeSection === section;
            const { numbered } = groupSectionFields(fields);
            const subCount = Object.keys(numbered).length;
            return (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
      )}

      <div className="p-4 border-t border-border space-y-2 mt-auto">
        {hasEdits && adminTab === "content" ? (
          <Button onClick={handleSave} disabled={saving} size="sm" className="w-full glow-gold font-display">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
            Save {Object.keys(edited).length} Change{Object.keys(edited).length !== 1 ? "s" : ""}
          </Button>
        ) : adminTab === "content" ? (
          <div className="text-center text-xs text-muted-foreground py-1">No unsaved changes</div>
        ) : null}
        <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-1.5" /> Logout
        </Button>
        {adminTab === "content" && <p className="text-center text-[10px] text-muted-foreground">⌘S to save</p>}
      </div>
    </>
  );
}

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
        {field.type === "upload" ? (
          <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded text-primary bg-primary/10">
            <ImageIcon className="w-2.5 h-2.5" /> Image
          </span>
        ) : (
          <span className={cn("inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded", typeColor)}>
            <TypeIcon className="w-2.5 h-2.5" />
            {typeLabel}
          </span>
        )}
        {isEdited && (
          <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-auto">
            unsaved
          </span>
        )}
      </div>
      {field.type === "upload" ? (
        <ImageUploadField value={value} onChange={(val) => onChange(field.key, val)} />
      ) : (
        <AutoResizeTextarea value={value} onChange={(val) => onChange(field.key, val)} />
      )}
    </div>
  );
}

// ─── ImageUploadField ─────────────────────────────────────────────────────────

function ImageUploadField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowed = ["image/svg+xml", "image/png", "image/x-icon", "image/jpeg", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast({ title: "Unsupported file type", description: "Please upload an SVG, PNG, ICO, or WebP file.", variant: "destructive" });
      return;
    }
    // Max 512 KB
    if (file.size > 512 * 1024) {
      toast({ title: "File too large", description: "Max size is 512 KB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop() ?? "png";
    const path = `favicon/favicon-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("assets").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("assets").getPublicUrl(path);
    onChange(urlData.publicUrl);
    toast({ title: "Favicon uploaded!" });
    setUploading(false);
    // Reset so same file can be re-selected
    e.target.value = "";
  };

  const isExternal = value.startsWith("http");
  const previewSrc = value || "/favicon.svg";

  return (
    <div className="flex items-center gap-3">
      {/* Preview box */}
      <div className="w-12 h-12 rounded-lg border border-border bg-background flex items-center justify-center shrink-0 overflow-hidden">
        {value ? (
          <img
            src={previewSrc}
            alt="favicon preview"
            className="w-8 h-8 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <ImageIcon className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        {/* URL display (read-only, still editable manually) */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/favicon.svg or https://..."
          className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs font-mono text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        {/* Upload button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-colors disabled:opacity-50"
        >
          {uploading
            ? <Loader2 className="w-3 h-3 animate-spin" />
            : <Upload className="w-3 h-3" />}
          {uploading ? "Uploading…" : "Upload SVG / PNG / ICO"}
        </button>
        {isExternal && (
          <p className="text-[10px] text-muted-foreground">Hosted at: {value.slice(0, 60)}{value.length > 60 ? "…" : ""}</p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/svg+xml,image/png,image/x-icon,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFile}
      />
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

// ─── Sortable row helpers ─────────────────────────────────────────────────────

function SortableCSRow({ cs, onEdit, onToggle, onDelete }: {
  cs: CS;
  onEdit: (cs: CS) => void;
  onToggle: (id: string, field: "published" | "featured", val: boolean) => void;
  onDelete: (id: string, name: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cs.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("rounded-xl border border-border bg-card p-4 flex items-center gap-3", isDragging && "opacity-50 shadow-lg")}>
      <button {...attributes} {...listeners} className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing shrink-0">
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display font-semibold text-sm text-foreground truncate">{cs.client_name || "Untitled"}</span>
          {cs.featured && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold">Featured</span>}
          {!cs.published && <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-semibold">Draft</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{cs.industry}{cs.tagline ? ` · ${cs.tagline}` : ""}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={() => onToggle(cs.id, "featured", !cs.featured)} title={cs.featured ? "Unfeature" : "Feature on homepage"}
          className={cn("w-7 h-7 rounded-md flex items-center justify-center transition-colors", cs.featured ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
          <Star className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onToggle(cs.id, "published", !cs.published)} title={cs.published ? "Unpublish" : "Publish"}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          {cs.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button onClick={() => onEdit(cs)} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(cs.id, cs.client_name)} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── CaseStudiesPanel ─────────────────────────────────────────────────────────

type CS = {
  id: string; slug: string; client_name: string; industry: string;
  tagline: string; challenge: string; solution: string; results: string;
  metric_1_value: string; metric_1_label: string;
  metric_2_value: string; metric_2_label: string;
  metric_3_value: string; metric_3_label: string;
  tags: string[]; featured: boolean; published: boolean; sort_order: number;
};

const EMPTY_CS: Omit<CS, "id"> = {
  slug: "", client_name: "", industry: "", tagline: "",
  challenge: "", solution: "", results: "",
  metric_1_value: "", metric_1_label: "",
  metric_2_value: "", metric_2_label: "",
  metric_3_value: "", metric_3_label: "",
  tags: [], featured: false, published: true, sort_order: 0,
};

function CaseStudiesPanel({ logActivity }: { logActivity: (action: string, entityType: string, label: string) => void }) {
  const { toast } = useToast();
  const [list, setList]       = useState<CS[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<CS> | null>(null);
  const [saving, setSaving]   = useState(false);
  const [isNew, setIsNew]     = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const load = async () => {
    const { data } = await supabase.from("case_studies").select("*").order("sort_order");
    if (data) setList(data as CS[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing({ ...EMPTY_CS }); setIsNew(true); };
  const openEdit = (cs: CS) => { setEditing({ ...cs }); setIsNew(false); };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    const tagsArr = typeof editing.tags === "string"
      ? (editing.tags as string).split(",").map((t: string) => t.trim()).filter(Boolean)
      : editing.tags ?? [];

    const payload = { ...editing, tags: tagsArr };

    if (isNew) {
      if (!payload.slug) {
        payload.slug = (payload.client_name || "case-study")
          .toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      }
      const { error } = await supabase.from("case_studies").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Case study created!" }); logActivity("created", "case_study", payload.client_name || "New Case Study"); closeForm(); load(); }
    } else {
      const { error } = await supabase.from("case_studies").update(payload).eq("id", editing.id!);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Saved!" }); logActivity("updated", "case_study", payload.client_name || "Case Study"); closeForm(); load(); }
    }
    setSaving(false);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = list.findIndex((cs) => cs.id === active.id);
    const newIdx = list.findIndex((cs) => cs.id === over.id);
    const reordered = arrayMove(list, oldIdx, newIdx);
    setList(reordered);
    await Promise.all(reordered.map((cs, i) =>
      supabase.from("case_studies").update({ sort_order: i }).eq("id", cs.id)
    ));
  };

  const toggleField = async (id: string, field: "published" | "featured", val: boolean) => {
    await supabase.from("case_studies").update({ [field]: val }).eq("id", id);
    setList((prev) => prev.map((cs) => cs.id === id ? { ...cs, [field]: val } : cs));
    const cs = list.find((cs) => cs.id === id);
    logActivity(val ? field === "featured" ? "featured" : "published" : field === "featured" ? "unfeatured" : "unpublished", "case_study", cs?.client_name ?? "Case Study");
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await supabase.from("case_studies").delete().eq("id", id);
    setList((prev) => prev.filter((cs) => cs.id !== id));
    logActivity("deleted", "case_study", name);
    toast({ title: "Deleted" });
  };

  const set = (key: string, val: string | boolean) =>
    setEditing((prev) => prev ? { ...prev, [key]: val } : prev);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );

  if (editing) return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="font-display font-bold text-lg">{isNew ? "New Case Study" : `Edit — ${editing.client_name}`}</h2>
      </div>

      <div className="space-y-5">
        {/* Identity */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Identity</p>
          <Field label="Client Name *" value={editing.client_name || ""} onChange={(v) => set("client_name", v)} />
          <Field label="Industry" value={editing.industry || ""} onChange={(v) => set("industry", v)} placeholder="e.g. Pharma, FMCG, eCommerce" />
          <Field label="Tagline (one-line summary for cards)" value={editing.tagline || ""} onChange={(v) => set("tagline", v)} long />
          <Field label="URL Slug" value={editing.slug || ""} onChange={(v) => set("slug", v)} placeholder="auto-generated if empty" />
          <Field label="Tags (comma-separated)" value={Array.isArray(editing.tags) ? editing.tags.join(", ") : (editing.tags || "")} onChange={(v) => set("tags", v)} placeholder="Social Media, eCommerce, Branding" />
        </div>

        {/* Metrics */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Key Metrics (shown on cards)</p>
          {[1, 2, 3].map((n) => (
            <div key={n} className="grid grid-cols-2 gap-3">
              <Field label={`Metric ${n} — Value`} value={(editing as any)[`metric_${n}_value`] || ""} onChange={(v) => set(`metric_${n}_value`, v)} placeholder="+127%" />
              <Field label={`Metric ${n} — Label`} value={(editing as any)[`metric_${n}_label`] || ""} onChange={(v) => set(`metric_${n}_label`, v)} placeholder="Revenue Growth" />
            </div>
          ))}
        </div>

        {/* Narrative */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Case Study Narrative</p>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">The Challenge</label>
            <RichTextEditor value={editing.challenge || ""} onChange={(v) => set("challenge", v)} placeholder="Describe the client's challenge..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Our Approach / Solution</label>
            <RichTextEditor value={editing.solution || ""} onChange={(v) => set("solution", v)} placeholder="Describe your approach..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">The Results</label>
            <RichTextEditor value={editing.results || ""} onChange={(v) => set("results", v)} placeholder="What results were achieved?" />
          </div>
        </div>

        {/* Settings */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Settings</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={!!editing.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 accent-primary" />
            <span className="text-sm">Published (visible on site)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={!!editing.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-primary" />
            <span className="text-sm">Featured on homepage</span>
          </label>
          <Field label="Sort Order (lower = first)" value={String(editing.sort_order ?? 0)} onChange={(v) => set("sort_order", parseInt(v) || 0)} placeholder="0" />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving} className="glow-gold font-display">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
            {isNew ? "Create Case Study" : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={closeForm}>Cancel</Button>
        </div>
      </div>
    </main>
  );

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-lg">Case Studies</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{list.length} total · {list.filter(c => c.featured).length} featured · drag to reorder</p>
        </div>
        <Button onClick={openNew} size="sm" className="glow-gold font-display">
          <Plus className="w-4 h-4 mr-1.5" /> New Case Study
        </Button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <BookOpen className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground mb-4">No case studies yet.</p>
          <Button onClick={openNew} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1.5" /> Add your first case study
          </Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={list.map((cs) => cs.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {list.map((cs) => (
                <SortableCSRow key={cs.id} cs={cs} onEdit={openEdit} onToggle={toggleField} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </main>
  );
}

// ─── Sortable Job / Bank rows ─────────────────────────────────────────────────

function SortableJobRow({ job, onEdit, onToggle, onDelete }: {
  job: Job;
  onEdit: (j: Job) => void;
  onToggle: (id: string, val: boolean) => void;
  onDelete: (id: string, title: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: job.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("rounded-xl border border-border bg-card p-4 flex items-center gap-3", isDragging && "opacity-50 shadow-lg")}>
      <button {...attributes} {...listeners} className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing shrink-0">
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display font-semibold text-sm text-foreground truncate">{job.title || "Untitled"}</span>
          {job.experience && <span className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-semibold">{job.experience}</span>}
          {!job.published && <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-semibold">Draft</span>}
        </div>
        {job.notes && <p className="text-xs text-muted-foreground mt-0.5 truncate">{job.notes}</p>}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={() => onToggle(job.id, !job.published)} title={job.published ? "Unpublish" : "Publish"}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          {job.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button onClick={() => onEdit(job)} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(job.id, job.title)} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── JobsPanel ────────────────────────────────────────────────────────────────

type Job = {
  id: string; title: string; role_overview: string; responsibilities: string;
  requirements: string; notes: string; experience: string;
  sort_order: number; published: boolean;
};

const EMPTY_JOB: Omit<Job, "id"> = {
  title: "", role_overview: "", responsibilities: "", requirements: "",
  notes: "", experience: "", sort_order: 0, published: true,
};

function JobsPanel({ logActivity }: { logActivity: (action: string, entityType: string, label: string) => void }) {
  const { toast } = useToast();
  const [list, setList]       = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Job> | null>(null);
  const [saving, setSaving]   = useState(false);
  const [isNew, setIsNew]     = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const load = async () => {
    const { data } = await supabase.from("job_listings").select("*").order("sort_order");
    if (data) setList(data as Job[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing({ ...EMPTY_JOB }); setIsNew(true); };
  const openEdit = (job: Job) => { setEditing({ ...job }); setIsNew(false); };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const payload = { ...editing };
    if (isNew) {
      const { error } = await supabase.from("job_listings").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Job listing created!" }); logActivity("created", "job", payload.title || "New Job"); closeForm(); load(); }
    } else {
      const { error } = await supabase.from("job_listings").update(payload).eq("id", editing.id!);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Saved!" }); logActivity("updated", "job", payload.title || "Job"); closeForm(); load(); }
    }
    setSaving(false);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = list.findIndex((j) => j.id === active.id);
    const newIdx = list.findIndex((j) => j.id === over.id);
    const reordered = arrayMove(list, oldIdx, newIdx);
    setList(reordered);
    await Promise.all(reordered.map((j, i) =>
      supabase.from("job_listings").update({ sort_order: i }).eq("id", j.id)
    ));
  };

  const togglePublished = async (id: string, val: boolean) => {
    await supabase.from("job_listings").update({ published: val }).eq("id", id);
    setList((prev) => prev.map((j) => j.id === id ? { ...j, published: val } : j));
    const j = list.find((j) => j.id === id);
    logActivity(val ? "published" : "unpublished", "job", j?.title ?? "Job");
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await supabase.from("job_listings").delete().eq("id", id);
    setList((prev) => prev.filter((j) => j.id !== id));
    logActivity("deleted", "job", title);
    toast({ title: "Deleted" });
  };

  const set = (key: string, val: string | boolean | number) =>
    setEditing((prev) => prev ? { ...prev, [key]: val } : prev);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );

  if (editing) return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="font-display font-bold text-lg">
          {isNew ? "New Job Listing" : `Edit — ${editing.title}`}
        </h2>
      </div>

      <div className="space-y-5">
        {/* Position Details */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Position Details</p>
          <Field
            label="Job Title *"
            value={editing.title || ""}
            onChange={(v) => set("title", v)}
            placeholder="e.g. AI-Focused Senior Graphic Designer"
          />
          <Field
            label="Experience Required"
            value={editing.experience || ""}
            onChange={(v) => set("experience", v)}
            placeholder="e.g. 5+ Years"
          />
          <Field
            label="Special Notes (optional)"
            value={editing.notes || ""}
            onChange={(v) => set("notes", v)}
            placeholder="e.g. Females Only – English Fluency Required"
          />
        </div>

        {/* Role Content */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Role Content</p>
          <Field
            label="Role Overview"
            value={editing.role_overview || ""}
            onChange={(v) => set("role_overview", v)}
            long
            placeholder="Brief 1–2 sentence description of the role and its purpose."
          />
          <Field
            label="Key Responsibilities (one per line)"
            value={editing.responsibilities || ""}
            onChange={(v) => set("responsibilities", v)}
            long
            placeholder={"Develop high-end visual concepts\nUse AI tools to accelerate production\nCollaborate with marketing teams"}
          />
          <Field
            label="Requirements (one per line)"
            value={editing.requirements || ""}
            onChange={(v) => set("requirements", v)}
            long
            placeholder={"5+ years of professional experience\nStrong portfolio showcasing your work\nProficiency in relevant tools"}
          />
        </div>

        {/* Settings */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Settings</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!editing.published}
              onChange={(e) => set("published", e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm">Published (visible on /careers page)</span>
          </label>
          <Field
            label="Sort Order (lower number = appears first)"
            value={String(editing.sort_order ?? 0)}
            onChange={(v) => set("sort_order", parseInt(v) || 0)}
            placeholder="0"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving} className="glow-gold font-display">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
            {isNew ? "Create Job Listing" : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={closeForm}>Cancel</Button>
        </div>
      </div>
    </main>
  );

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-lg">Job Listings</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {list.length} total · {list.filter((j) => j.published).length} published · drag to reorder
          </p>
        </div>
        <Button onClick={openNew} size="sm" className="glow-gold font-display">
          <Plus className="w-4 h-4 mr-1.5" /> New Job
        </Button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <Briefcase className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground mb-4">No job listings yet.</p>
          <Button onClick={openNew} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1.5" /> Add your first job
          </Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={list.map((j) => j.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {list.map((job) => (
                <SortableJobRow key={job.id} job={job} onEdit={openEdit} onToggle={togglePublished} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </main>
  );
}

// ─── SortableBankRow ──────────────────────────────────────────────────────────

function SortableBankRow({ bank, onEdit, onToggle, onDelete }: {
  bank: BankAccount;
  onEdit: (b: BankAccount) => void;
  onToggle: (id: string, val: boolean) => void;
  onDelete: (id: string, title: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: bank.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("rounded-xl border border-border bg-card p-4 flex items-center gap-3", isDragging && "opacity-50 shadow-lg")}>
      <button {...attributes} {...listeners} className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing shrink-0">
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display font-semibold text-sm text-foreground truncate">{bank.title || "Untitled"}</span>
          {bank.abbr && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold">{bank.abbr}</span>}
          {bank.currencies && <span className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-semibold">{bank.currencies}</span>}
          {!bank.published && <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-semibold">Draft</span>}
        </div>
        {bank.branch && <p className="text-xs text-muted-foreground mt-0.5 truncate">{bank.branch}</p>}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={() => onToggle(bank.id, !bank.published)} title={bank.published ? "Unpublish" : "Publish"}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          {bank.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button onClick={() => onEdit(bank)} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(bank.id, bank.title)} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── BanksPanel ───────────────────────────────────────────────────────────────

type BankAccount = {
  id: string; title: string; abbr: string; branch: string;
  account_number: string; iban: string; currencies: string;
  sort_order: number; published: boolean;
};

const EMPTY_BANK: Omit<BankAccount, "id"> = {
  title: "", abbr: "", branch: "",
  account_number: "", iban: "", currencies: "",
  sort_order: 0, published: true,
};

function BanksPanel({ logActivity }: { logActivity: (action: string, entityType: string, label: string) => void }) {
  const { toast } = useToast();
  const [list, setList]       = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BankAccount> | null>(null);
  const [saving, setSaving]   = useState(false);
  const [isNew, setIsNew]     = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const load = async () => {
    const { data } = await supabase.from("bank_accounts").select("*").order("sort_order");
    if (data) setList(data as BankAccount[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew   = () => { setEditing({ ...EMPTY_BANK }); setIsNew(true); };
  const openEdit  = (bank: BankAccount) => { setEditing({ ...bank }); setIsNew(false); };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const payload = { ...editing };
    if (isNew) {
      const { error } = await supabase.from("bank_accounts").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Bank account created!" }); logActivity("created", "bank", payload.title || "New Bank"); closeForm(); load(); }
    } else {
      const { error } = await supabase.from("bank_accounts").update(payload).eq("id", editing.id!);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else { toast({ title: "Saved!" }); logActivity("updated", "bank", payload.title || "Bank"); closeForm(); load(); }
    }
    setSaving(false);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = list.findIndex((b) => b.id === active.id);
    const newIdx = list.findIndex((b) => b.id === over.id);
    const reordered = arrayMove(list, oldIdx, newIdx);
    setList(reordered);
    await Promise.all(reordered.map((b, i) =>
      supabase.from("bank_accounts").update({ sort_order: i }).eq("id", b.id)
    ));
  };

  const togglePublished = async (id: string, val: boolean) => {
    await supabase.from("bank_accounts").update({ published: val }).eq("id", id);
    setList((prev) => prev.map((b) => b.id === id ? { ...b, published: val } : b));
    const b = list.find((b) => b.id === id);
    logActivity(val ? "published" : "unpublished", "bank", b?.title ?? "Bank");
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await supabase.from("bank_accounts").delete().eq("id", id);
    setList((prev) => prev.filter((b) => b.id !== id));
    logActivity("deleted", "bank", title);
    toast({ title: "Deleted" });
  };

  const set = (key: string, val: string | boolean | number) =>
    setEditing((prev) => prev ? { ...prev, [key]: val } : prev);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );

  if (editing) return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={closeForm} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="font-display font-bold text-lg">
          {isNew ? "New Bank Account" : `Edit — ${editing.title}`}
        </h2>
      </div>

      <div className="space-y-5">
        {/* Bank Identity */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Bank Identity</p>
          <Field
            label="Bank Full Name *"
            value={editing.title || ""}
            onChange={(v) => set("title", v)}
            placeholder="e.g. Arab African International Bank"
          />
          <Field
            label="Abbreviation"
            value={editing.abbr || ""}
            onChange={(v) => set("abbr", v)}
            placeholder="e.g. AAIB"
          />
          <Field
            label="Branch Name"
            value={editing.branch || ""}
            onChange={(v) => set("branch", v)}
            placeholder="e.g. Arkan Plaza Branch — Sheikh Zayed"
          />
        </div>

        {/* Account Details */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Account Details</p>
          <Field
            label="Account Number"
            value={editing.account_number || ""}
            onChange={(v) => set("account_number", v)}
            placeholder="e.g. 1144817810010201"
          />
          <Field
            label="IBAN"
            value={editing.iban || ""}
            onChange={(v) => set("iban", v)}
            placeholder="e.g. EG730057028001144817810010201"
          />
          <Field
            label="Currencies (comma-separated)"
            value={editing.currencies || ""}
            onChange={(v) => set("currencies", v)}
            placeholder="e.g. USD,EGP"
          />
        </div>

        {/* Settings */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Settings</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!editing.published}
              onChange={(e) => set("published", e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm">Published (visible on homepage)</span>
          </label>
          <Field
            label="Sort Order (lower number = appears first)"
            value={String(editing.sort_order ?? 0)}
            onChange={(v) => set("sort_order", parseInt(v) || 0)}
            placeholder="0"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={saving} className="glow-gold font-display">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
            {isNew ? "Create Bank Account" : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={closeForm}>Cancel</Button>
        </div>
      </div>
    </main>
  );

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-lg">Bank Accounts</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {list.length} total · {list.filter((b) => b.published).length} published · drag to reorder
          </p>
        </div>
        <Button onClick={openNew} size="sm" className="glow-gold font-display">
          <Plus className="w-4 h-4 mr-1.5" /> New Bank
        </Button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <Landmark className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground mb-4">No bank accounts yet.</p>
          <Button onClick={openNew} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1.5" /> Add your first bank
          </Button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={list.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {list.map((bank) => (
                <SortableBankRow key={bank.id} bank={bank} onEdit={openEdit} onToggle={togglePublished} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </main>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────

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
      <textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onInput={resize}
        rows={long ? 3 : 1}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none overflow-hidden"
      />
    </div>
  );
}

export default Admin;
