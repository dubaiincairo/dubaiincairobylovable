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
  Globe, Check, Info,
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
import { JobApplicationsPanel } from "@/components/admin/JobApplicationsPanel";

// ─── Icons & labels ────────────────────────────────────────────

const sectionIcons: Record<string, string> = {
  seo: "🔍",
  nav: "🧭", hero: "🏠", stats: "📊", about: "ℹ️", edges: "⚡",
  values: "💎", services: "🎯", founder: "👤", clients: "🤝",
  tech: "🛠️", google: "📍", legal: "📜", contact: "✉️", footer: "🔗",
  careers: "🎓", odoo: "🟢", yanolja: "🏨", zoho: "🟦", testimonials: "⭐",
};

const sectionDescriptions: Record<string, string> = {
  nav: "Logo name, nav links, CTA button",
  hero: "Overline, headline, body, chips, CTAs",
  stats: "4 stats with labels",
  about: "Subtitle, headline, body, CTA, 3 metrics",
  edges: "Section header + 4 differentiator cards",
  values: "Section header + 4 value cards",
  services: "Section header + 6 studio cards (grid)",
  studios: "Studios page hero + 6 studio deep-dives",
  founder: "Name, title, bio, photo, LinkedIn",
  clients: "Client names marquee",
  testimonials: "Section header (cards in Testimonials tab)",
  tech: "Section header + 4 tool categories",
  google: "Google Maps embed + address",
  legal: "Entity name, registration, tax ID",
  contact: "Email, phone, address, section text",
  footer: "Tagline, copyright, social links",
  careers: "Hero, perks, open-roles fallback text",
  odoo: "Page header, hero copy, service tags, 9 suites, CTA — plus Odoo logo upload",
  yanolja: "Hero copy, partner name, logo upload, service tags, 8 products, CTA",
  zoho: "Page header, hero copy, capability tags, 6 suites, CTA — plus Zoho logo upload",
};

const subItemLabels: Record<string, string> = {
  hero: "Chip",
  about: "Metric",
  services: "Studio",
  edges: "Edge",
  values: "Value",
  tech: "Category",
};

// ─── Field-type helpers ────────────────────────────────────────────────

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

// ─── Grouping within a section ─────────────────────────────────────────────

interface SectionGroups {
  headerFields: ContentField[];
  numbered: Record<string, ContentField[]>;  // "1" → [title, desc], "2" → ...
}

function groupSectionFields(fields: ContentField[]): SectionGroups {
  const headerFields: ContentField[] = [];
  const numbered: Record<string, ContentField[]> = {};
  for (const field of fields) {
    const m = field.key.match(/_([\d]+)_/);
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

// ─── Component ────────────────────────────────────────────────────────────────────

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dbValues, setDbValues]     = useState<Record<string, string>>({});
  const [edited, setEdited]         = useState<Record<string, string>>({});
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [openSubGroups, setOpenSubGroups] = useState<Record<string, boolean>>({});
  const [search, setSearch]         = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [adminTab, setAdminTab]     = useState<AdminTab>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
        data.forEach(({ key, value }) => { map[key] = value ?? ""; });
        setDbValues(map);
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  // ── Keyboard save ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (Object.keys(edited).length > 0) handleSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const handleChange = (key: string, val: string) => {
    setEdited((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async () => {
    if (Object.keys(edited).length === 0) return;
    setSaving(true);
    const upserts = Object.entries(edited).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("site_content").upsert(upserts, { onConflict: "key" });
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      setDbValues((prev) => ({ ...prev, ...edited }));
      setEdited({});
      toast({ title: "Saved!", description: "Changes are now live." });
      logActivity("saved", "content", `${Object.keys(edited).length} field(s)`);
    }
    setSaving(false);
  };

  // ── Activity log ──
  const logActivity = async (action: string, entity: string, label: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("admin_activity_log").insert({
      user_id: user.id, action, entity_type: entity, entity_label: label,
    });
  };

  // ── Section navigation ──
  const selectSection = (section: string | null) => {
    setActiveSection(section);
    setSearch("");
  };
  const toggleSubGroup = (key: string) => {
    setOpenSubGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasEdits = Object.keys(edited).length > 0;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // ── CaseStudiesPanel ──
  // (defined inline below)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border bg-card">
        <SidebarContent
          adminTab={adminTab}
          setAdminTab={(tab) => setAdminTab(tab)}
          hasEdits={hasEdits}
          saving={saving}
          edited={edited}
          handleSave={handleSave}
          handleLogout={handleLogout}
        />
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card/80 backdrop-blur flex items-center gap-3 px-4 shrink-0">
          {/* Mobile menu */}
          <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-56 p-0">
              <SidebarContent
                adminTab={adminTab}
                setAdminTab={(tab) => { setAdminTab(tab); setMobileSidebarOpen(false); }}
                hasEdits={hasEdits}
                saving={saving}
                edited={edited}
                handleSave={handleSave}
                handleLogout={handleLogout}
              />
            </SheetContent>
          </Sheet>

          {/* Search — only in content tab */}
          {adminTab === "content" && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="search" value={search} placeholder="Search fields…"
                className="w-full h-8 pl-8 pr-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onChange={(e) => { setSearch(e.target.value); if (adminTab !== "content") setAdminTab("content"); }}
              />
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            {hasEdits && (adminTab === "content" || adminTab === "seo" || adminTab === "clients") && (
              <Button size="sm" className="h-8" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
                {saving ? "Saving…" : "Save"}
              </Button>
            )}
            <Button variant="outline" size="sm" className="h-9 px-3" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {adminTab === "dashboard"    && <DashboardPanel />}
        {adminTab === "seo"          && <SEOPanel dbValues={dbValues} edited={edited} onChange={handleChange} onSave={handleSave} saving={saving} />}
        {adminTab === "contacts"     && <ContactSubmissionsPanel />}
        {adminTab === "applications" && <JobApplicationsPanel />}
        {adminTab === "testimonials" && <TestimonialsPanel logActivity={(action, label) => logActivity(action, "testimonial", label)} />}
        {adminTab === "clients" && (
          <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 overflow-y-auto">
            <div className="mb-5">
              <h2 className="font-display font-bold text-lg">Client Logos</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Checkbox = show in marquee · green ✓ = logo uploaded · ✕ = clear logo. Hit Save when done.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden mb-4">
              <div className="px-5 py-2.5 bg-muted/30 border-b border-border">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Section Text</span>
              </div>
              {(["clients_subtitle","clients_headline","clients_description"] as const).map((key) => {
                const field = contentRegistry.find((f) => f.key === key)!;
                return (
                  <FieldRow key={key} field={field}
                    value={edited[key] ?? dbValues[key] ?? field.defaultValue}
                    isEdited={editedKeys.has(key)} onChange={handleChange} />
                );
              })}
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-2.5 bg-muted/30 border-b border-border">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Logo Slots</span>
              </div>
              <div className="p-4">
                <ClientsLogoPanel edited={edited} dbValues={dbValues} onChange={handleChange} />
              </div>
            </div>
            {hasEdits && (
              <div className="mt-4 flex justify-end">
                <Button onClick={handleSave} disabled={saving} size="sm">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            )}
          </main>
        )}
        {adminTab === "case-studies" && <CaseStudiesPanel logActivity={logActivity} />}
        {adminTab === "jobs"         && <JobsPanel logActivity={logActivity} />}
        {adminTab === "banks"        && <BanksPanel logActivity={logActivity} />}

        {adminTab === "content" && (() => {

          // ── Search mode: show all matching sections expanded ──────────────────────────
          if (search) {
            return (
              <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 space-y-4 overflow-y-auto">
                {filteredSections.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No fields match "<strong>{search}</strong>"</p>
                    <button onClick={() => setSearch("")} className="mt-2 text-xs text-primary hover:underline">Clear search</button>
                  </div>
                ) : filteredSections.map((section) => {
                  const fields = grouped[section];
                  if (!fields || fields.length === 0) return null;
                  const visibleFields = fields.filter(
                    (f) =>
                      f.label.toLowerCase().includes(searchLower) ||
                      f.key.toLowerCase().includes(searchLower) ||
                      (edited[f.key] ?? dbValues[f.key] ?? f.defaultValue).toLowerCase().includes(searchLower)
                  );
                  if (visibleFields.length === 0) return null;
                  const { headerFields, numbered } = groupSectionFields(visibleFields);
                  const numberedEntries = Object.entries(numbered).sort(([a], [b]) => Number(a) - Number(b));
                  const subLabel = subItemLabels[section] || "Item";
                  return (
                    <div key={section} className="rounded-xl border border-border bg-card overflow-hidden">
                      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30">
                        <span className="text-lg leading-none">{sectionIcons[section] || "📄"}</span>
                        <span className="text-sm font-display font-bold text-foreground">{sectionLabels[section] || section}</span>
                        <button onClick={() => { setSearch(""); selectSection(section); }}
                          className="ml-auto text-[10px] text-primary hover:underline">Open section →</button>
                      </div>
                      <div className="border-t border-border divide-y divide-border">
                        {headerFields.map((field) => (
                          <FieldRow key={field.key} field={field}
                            value={edited[field.key] ?? dbValues[field.key] ?? field.defaultValue}
                            isEdited={editedKeys.has(field.key)} onChange={handleChange}
                            highlight={search} />
                        ))}
                        {numberedEntries.map(([num, groupFields]) => (
                          <div key={num}>
                            <div className="px-5 py-2 bg-muted/20">
                              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                {subLabel} {num}
                              </span>
                            </div>
                            <div className="divide-y divide-border">
                              {groupFields.map((field) => (
                                <FieldRow key={field.key} field={field}
                                  value={edited[field.key] ?? dbValues[field.key] ?? field.defaultValue}
                                  isEdited={editedKeys.has(field.key)} onChange={handleChange}
                                  indent highlight={search} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </main>
            );
          }

          // ── Overview: no section selected ─────────────────────────────────────────────────
          if (!activeSection) {
            return (
              <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 overflow-y-auto">
                <div className="mb-5">
                  <h2 className="font-display font-bold text-lg">Content Sections</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Pick a section to edit its fields</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {sectionOrder.map((section) => {
                    const fields = grouped[section] ?? [];
                    if (fields.length === 0) return null;
                    const editCount = fields.filter((f) => editedKeys.has(f.key)).length;
                    const { numbered } = groupSectionFields(fields);
                    const subCount = Object.keys(numbered).length;
                    const subLabel = subItemLabels[section];
                    return (
                      <button
                        key={section}
                        onClick={() => selectSection(section)}
                        className="text-left rounded-xl border border-border bg-card hover:bg-muted/30 hover:border-primary/30 transition-all p-4 group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-2xl leading-none">{sectionIcons[section] || "📄"}</span>
                          {editCount > 0 && (
                            <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                              {editCount}
                            </span>
                          )}
                        </div>
                        <p className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                          {sectionLabels[section] || section}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-tight line-clamp-2">
                          {subCount > 0
                            ? `${subCount} ${(subLabel || "item").toLowerCase()}s · ${fields.length} fields`
                            : `${fields.length} field${fields.length !== 1 ? "s" : ""}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </main>
            );
          }

          // ── Single-section drill-in view ──────────────────────────────────────────────
          const fields = grouped[activeSection] ?? [];
          const { headerFields, numbered } = groupSectionFields(fields);
          const numberedEntries = Object.entries(numbered).sort(([a], [b]) => Number(a) - Number(b));
          const subLabel = subItemLabels[activeSection] || "Item";
          const editCount = fields.filter((f) => editedKeys.has(f.key)).length;
          const isClientsSection = activeSection === "clients";

          return (
            <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 overflow-y-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-5">
                <button
                  onClick={() => selectSection(null)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> All Sections
                </button>
                <span className="text-muted-foreground/40">/</span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <span className="text-lg leading-none">{sectionIcons[activeSection] || "📄"}</span>
                  {sectionLabels[activeSection] || activeSection}
                </span>
                {editCount > 0 && (
                  <span className="ml-auto text-xs font-semibold text-primary">{editCount} unsaved</span>
                )}
              </div>

              <div className="rounded-xl border border-border bg-card overflow-hidden space-y-0">

                {/* Section-level header fields */}
                {headerFields.length > 0 && (
                  <div className="divide-y divide-border">
                    {numberedEntries.length > 0 && (
                      <div className="px-5 py-2.5 bg-muted/30">
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

                {/* Custom logo panel for the Clients section */}
                {isClientsSection && (
                  <div className="border-t border-border p-4">
                    <div className="mb-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Logo Slots</p>
                      <p className="text-[11px] text-muted-foreground">
                        Checkbox = visible in marquee · ✓ = logo uploaded · ✕ = clear logo
                      </p>
                    </div>
                    <ClientsLogoPanel edited={edited} dbValues={dbValues} onChange={handleChange} />
                  </div>
                )}

                {/* Numbered sub-groups (Studio 1, Edge 2, …) */}
                {!isClientsSection && numberedEntries.map(([num, groupFields]) => {
                  const subKey = `${activeSection}:${num}`;
                  const isSubOpen = openSubGroups[subKey] ?? false;
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
                          <span className="text-xs font-semibold text-foreground">{subLabel} {num}</span>
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
            </main>
          );
        })()}
      </div>
    </div>
  );
};

// ─── SidebarContent ─────────────────────────────────────────────────────

type AdminTab = "dashboard" | "content" | "seo" | "case-studies" | "jobs" | "banks" | "testimonials" | "clients" | "contacts" | "applications";

const TAB_ITEMS: { id: AdminTab; label: string; icon: typeof BookOpen; dividerBefore?: boolean }[] = [
  { id: "dashboard",    label: "Dashboard",       icon: LayoutDashboard },
  { id: "content",      label: "Content",         icon: Type },
  { id: "seo",          label: "SEO & Meta",      icon: Globe, dividerBefore: true },
  { id: "case-studies", label: "Cases",           icon: BookOpen },
  { id: "jobs",         label: "Job Listings",    icon: Briefcase },
  { id: "banks",        label: "Banks",           icon: Landmark },
  { id: "testimonials", label: "Testimonials",    icon: Star },
  { id: "clients",      label: "Clients",         icon: ImageIcon },
  { id: "applications", label: "Applications",    icon: MessageSquare, dividerBefore: true },
  { id: "contacts",     label: "Messages",        icon: Mail },
];

function SidebarContent({
  adminTab, setAdminTab, hasEdits, saving, edited, handleSave, handleLogout,
}: {
  adminTab: AdminTab;
  setAdminTab: (t: AdminTab) => void;
  hasEdits: boolean;
  saving: boolean;
  edited: Record<string, string>;
  handleSave: () => void;
  handleLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
        <span className="font-display font-bold text-sm text-foreground">Dubai in Cairo</span>
        <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {TAB_ITEMS.map(({ id, label, icon: Icon, dividerBefore }) => (
          <div key={id}>
            {dividerBefore && <div className="h-px bg-border mx-2 my-2" />}
            <button
              onClick={() => setAdminTab(id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                adminTab === id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-border shrink-0 space-y-1.5">
        {hasEdits && (adminTab === "content" || adminTab === "seo" || adminTab === "clients") ? (
          <Button size="sm" className="w-full" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
            {saving ? "Saving…" : `Save ${Object.keys(edited).length} change${Object.keys(edited).length !== 1 ? "s" : ""}`}
          </Button>
        ) : (adminTab === "content" || adminTab === "seo" || adminTab === "clients") ? (
          <Button size="sm" variant="outline" className="w-full" disabled>
            <Check className="w-3.5 h-3.5 mr-1.5" /> All saved
          </Button>
        ) : null}
        {(adminTab === "content" || adminTab === "seo" || adminTab === "clients") && <p className="text-center text-[10px] text-muted-foreground">⌘S to save</p>}
        <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-1.5" /> Logout
        </Button>
      </div>
    </div>
  );
}

// ─── SEOPanel ────────────────────────────────────────────────────────────────────────

function SEOPanel({
  dbValues, edited, onChange, onSave, saving,
}: {
  dbValues: Record<string, string>;
  edited: Record<string, string>;
  onChange: (key: string, val: string) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const seoFields = contentRegistry.filter((f) => f.section === "seo");
  const globalFields = seoFields.filter((f) => !f.key.match(/_(home|studios|careers|contact|case_studies|odoo|yanolja|zoho)_/));
  const pageGroups: Record<string, ContentField[]> = {};
  seoFields.filter((f) => f.key.match(/_(home|studios|careers|contact|case_studies|odoo|yanolja|zoho)_/)).forEach((f) => {
    const m = f.key.match(/_(home|studios|careers|contact|case_studies|odoo|yanolja|zoho)_/);
    if (m) {
      const page = m[1];
      if (!pageGroups[page]) pageGroups[page] = [];
      pageGroups[page].push(f);
    }
  });
  const pageLabels: Record<string, string> = {
    home: "Home", studios: "Studios", careers: "Careers",
    contact: "Contact", case_studies: "Case Studies",
    odoo: "Odoo", yanolja: "Yanolja", zoho: "Zoho",
  };
  const editedKeys = new Set(Object.keys(edited));
  const hasEdits = Object.keys(edited).length > 0;

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 overflow-y-auto">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-lg">SEO & Meta Tags</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Controls page titles, descriptions, and social share images</p>
        </div>
        {hasEdits && (
          <Button size="sm" onClick={onSave} disabled={saving}>
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
            {saving ? "Saving…" : "Save"}
          </Button>
        )}
      </div>

      {/* Global */}
      <div className="rounded-xl border border-border bg-card overflow-hidden mb-4">
        <div className="px-5 py-2.5 bg-muted/30 border-b border-border">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Global</span>
        </div>
        <div className="divide-y divide-border">
          {globalFields.map((field) => (
            <SEOFieldRow
              key={field.key}
              field={field}
              value={edited[field.key] ?? dbValues[field.key] ?? field.defaultValue}
              isEdited={editedKeys.has(field.key)}
              onChange={onChange}
              type={field.type === "upload" ? "upload" : key.includes("description") ? "textarea" : "text"}
            />
          ))}
        </div>
      </div>

      {/* Per-page */}
      {Object.entries(pageGroups).map(([page, fields]) => {
        const isOg = (f: ContentField) => f.key.includes("_og_image");
        const isTitle = (f: ContentField) => f.key.includes("_title");
        return (
          <div key={page} className="rounded-xl border border-border bg-card overflow-hidden mb-4">
            <div className="px-5 py-2.5 bg-muted/30 border-b border-border">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{pageLabels[page] || page}</span>
            </div>
            <div className="divide-y divide-border">
              {fields.map((field) => (
                <SEOFieldRow
                  key={field.key}
                  field={field}
                  value={edited[field.key] ?? dbValues[field.key] ?? field.defaultValue}
                  isEdited={editedKeys.has(field.key)}
                  onChange={onChange}
                  type={isOg(field) ? "upload" : isTitle(field) ? "text" : "textarea"}
                />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}

function SEOFieldRow({
  field, value, isEdited, onChange, type,
}: {
  field: ContentField;
  value: string;
  isEdited: boolean;
  onChange: (key: string, val: string) => void;
  type: "text" | "textarea" | "upload";
}) {
  return (
    <div className={cn("px-5 py-3.5 transition-colors", isEdited && "bg-primary/[0.03]")}>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-xs font-semibold text-foreground">{field.label}</label>
        {isEdited && (
          <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-auto">
            unsaved
          </span>
        )}
      </div>
      {type === "upload" ? (
        <ImageUploadField value={value} onChange={(val) => onChange(field.key, val)} fieldKey={field.key} />
      ) : type === "textarea" ? (
        <AutoResizeTextarea value={value} onChange={(val) => onChange(field.key, val)} />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      )}
      {field.key.includes("og_image") && (
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
          <Info className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-[10px] text-amber-400/90 leading-relaxed">
            After uploading a new social banner here, the <code className="font-mono bg-amber-500/10 px-1 rounded">index.html</code> file must also be updated to match the new URL — otherwise WhatsApp, Facebook, and other crawlers will still show the old image. Contact your developer to sync the change.
          </p>
        </div>
      )}
    </div>
  );
}
// ─── FieldRow ─────────────────────────────────────────────────────────────────────────────────

function FieldRow({
  field, value, isEdited, onChange, indent = false, highlight = "",
}: {
  field: ContentField;
  value: string;
  isEdited: boolean;
  onChange: (key: string, val: string) => void;
  indent?: boolean;
  highlight?: string;
}) {
  const type = detectFieldType(field.key);
  const { label: typeLabel, icon: TypeIcon, color: typeColor } = fieldTypeConfig[type];

  const showSnippet = highlight &&
    value.toLowerCase().includes(highlight.toLowerCase()) &&
    !field.label.toLowerCase().includes(highlight.toLowerCase());

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
      {showSnippet && <MatchSnippet text={value} term={highlight} />}
      {field.type === "upload" ? (
        <ImageUploadField value={value} onChange={(val) => onChange(field.key, val)} fieldKey={field.key} />
      ) : type === "body" ? (
        <RichTextEditor value={value} onChange={(val) => onChange(field.key, val)} minHeight={80} />
      ) : (
        <AutoResizeTextarea value={value} onChange={(val) => onChange(field.key, val)} />
      )}
      {field.key.includes("og_image") && (
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
          <Info className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-[10px] text-amber-400/90 leading-relaxed">
            After uploading a new social banner here, the <code className="font-mono bg-amber-500/10 px-1 rounded">index.html</code> file must also be updated to match the new URL — otherwise WhatsApp, Facebook, and other crawlers will still show the old image. Contact your developer to sync the change.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── ImageUploadField ─────────────────────────────────────────────────────────────────────────

function ImageUploadField({ value, onChange, fieldKey }: { value: string; onChange: (v: string) => void; fieldKey?: string }) {
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
    // Max 2 MB
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 2 MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop() ?? "png";
    // Use the field key as a folder hint so uploads are organized in storage
    const folder = fieldKey ? fieldKey.replace(/_url$/, "").replace(/_/g, "-") : "uploads";
    const path = `${folder}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("assets").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("assets").getPublicUrl(path);
    onChange(urlData.publicUrl);
    toast({ title: "Image uploaded!", description: "Save to apply the change to the site." });
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

// ─── ClientsLogoPanel ──────────────────────────────────────────────────────────────────────

const MAX_LOGO_SLOTS = 24;

function ClientsLogoPanel({
  edited, dbValues, onChange,
}: {
  edited: Record<string, string>;
  dbValues: Record<string, string>;
  onChange: (key: string, val: string) => void;
}) {
  const { toast } = useToast();
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const val = (key: string, fallback = "") =>
    edited[key] !== undefined ? edited[key] : (dbValues[key] ?? fallback);

  const handleFile = async (slot: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/svg+xml", "image/png", "image/x-icon", "image/jpeg", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast({ title: "Unsupported file type", description: "Please upload an SVG, PNG, ICO, or WebP file.", variant: "destructive" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 2 MB.", variant: "destructive" });
      return;
    }
    setUploadingSlot(slot);
    const ext = file.name.split(".").pop() ?? "png";
    const folder = `client-logo-${slot}`;
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("assets").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploadingSlot(null);
      return;
    }
    const { data: urlData } = supabase.storage.from("assets").getPublicUrl(path);
    onChange(`client_logo_${slot}_url`, urlData.publicUrl);
    toast({ title: "Logo uploaded!", description: "Save to apply the change to the site." });
    setUploadingSlot(null);
    e.target.value = "";
  };

  return (
    <div className="space-y-1">
      {Array.from({ length: MAX_LOGO_SLOTS }, (_, i) => i + 1).map((slot) => {
        const enabledKey = `client_logo_${slot}_enabled`;
        const nameKey    = `client_logo_${slot}_name`;
        const urlKey     = `client_logo_${slot}_url`;
        const enabled    = val(enabledKey, "true") !== "false";
        const name       = val(nameKey, "");
        const url        = val(urlKey, "");
        const hasUrl     = url.trim().length > 0;
        const isUploading = uploadingSlot === slot;

        return (
          <div
            key={slot}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors",
              enabled ? "border-border bg-card" : "border-border/40 bg-muted/20 opacity-60"
            )}
          >
            {/* Slot number */}
            <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
              {slot}
            </span>

            {/* Enable/disable checkbox */}
            <button
              type="button"
              onClick={() => onChange(enabledKey, enabled ? "false" : "true")}
              className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                enabled ? "border-primary bg-primary" : "border-muted-foreground/40 bg-transparent"
              )}
              title={enabled ? "Visible in marquee — click to hide" : "Hidden — click to show"}
            >
              {enabled && <Check className="w-3 h-3 text-primary-foreground" />}
            </button>

            {/* Brand name */}
            <input
              type="text"
              value={name}
              onChange={(e) => onChange(nameKey, e.target.value)}
              placeholder={`Brand ${slot}`}
              className="flex-1 min-w-0 rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            {/* Upload button */}
            <button
              type="button"
              onClick={() => fileInputRefs.current[slot]?.click()}
              disabled={isUploading}
              className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              {isUploading ? "…" : "Upload"}
            </button>
            <input
              ref={(el) => { fileInputRefs.current[slot] = el; }}
              type="file"
              accept="image/svg+xml,image/png,image/x-icon,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleFile(slot, e)}
            />

            {/* URL text input (compact) */}
            <input
              type="text"
              value={url}
              onChange={(e) => onChange(urlKey, e.target.value)}
              placeholder="or paste URL"
              className="w-40 rounded-md border border-input bg-background px-2.5 py-1.5 text-[11px] font-mono text-muted-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            {/* Uploaded indicator */}
            {hasUrl ? (
              <span className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0" title="Logo uploaded">
                <Check className="w-3 h-3 text-emerald-500" />
              </span>
            ) : (
              <span className="w-5 h-5 shrink-0" />
            )}

            {/* Clear URL button */}
            <button
              type="button"
              onClick={() => onChange(urlKey, "")}
              disabled={!hasUrl}
              className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              title="Remove logo URL"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ─── AutoResizeTextarea ────────────────────────────────────────────────────────────────────

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
    <div className="relative">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => { onChange(e.target.value); resize(); }}
        onInput={resize}
        rows={1}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none overflow-hidden"
      />
    </div>
  );
}

// ─── MatchSnippet ──────────────────────────────────────────────────────────────────────────────

function MatchSnippet({ text, term }: { text: string; term: string }) {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(term.toLowerCase());
  if (idx === -1) return null;
  const start = Math.max(0, idx - 30);
  const end = Math.min(text.length, idx + term.length + 30);
  const before = text.slice(start, idx);
  const match  = text.slice(idx, idx + term.length);
  const after  = text.slice(idx + term.length, end);
  return (
    <p className="text-[11px] text-muted-foreground mb-1.5 font-mono">
      {start > 0 && <span>…</span>}
      {before}
      <mark className="bg-primary/20 text-primary rounded px-0.5">{match}</mark>
      {after}
      {end < text.length && <span>…</span>}
    </p>
  );
}

// ─── Panels imported from separate files ─────────────────────────────────────────────────────────

import { CaseStudiesPanel } from "@/components/admin/CaseStudiesPanel";
import { JobsPanel } from "@/components/admin/JobsPanel";
import { BanksPanel } from "@/components/admin/BanksPanel";

export default Admin;
