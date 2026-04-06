import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, LogOut, ArrowLeft, ChevronDown, Search, X } from "lucide-react";
import { contentRegistry, sectionOrder, sectionLabels } from "@/lib/contentRegistry";
import { cn } from "@/lib/utils";

const sectionIcons: Record<string, string> = {
  nav: "🧭", hero: "🏠", stats: "📊", about: "ℹ️", edges: "⚡",
  values: "💎", services: "🎯", founder: "👤", clients: "🤝",
  tech: "🛠️", legal: "📜", contact: "✉️", footer: "🔗",
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dbValues, setDbValues] = useState<Record<string, string>>({});
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

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

  const handleChange = (key: string, value: string) => {
    setEdited((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(edited);
    let successCount = 0;
    let errorCount = 0;

    for (const [key, value] of updates) {
      const existsInDb = dbValues[key] !== undefined;
      const field = contentRegistry.find((f) => f.key === key);

      if (existsInDb) {
        const { error } = await supabase
          .from("site_content")
          .update({ value, updated_at: new Date().toISOString() })
          .eq("key", key);
        if (error) { errorCount++; } else { successCount++; }
      } else if (field) {
        const { error } = await supabase
          .from("site_content")
          .insert({ section: field.section, key, value, label: field.label });
        if (error) { errorCount++; } else { successCount++; }
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
      toast({ title: "Content saved", description: `${successCount} field(s) updated. Changes are live now!` });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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

  const hasEdits = Object.keys(edited).length > 0;
  const editedKeys = new Set(Object.keys(edited));
  const searchLower = search.toLowerCase();

  const grouped = sectionOrder.reduce<Record<string, typeof contentRegistry>>((acc, section) => {
    acc[section] = contentRegistry.filter((f) => f.section === section);
    return acc;
  }, {});

  // Filter by search
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
      {/* Sidebar navigation */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 border-b border-border">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs">Back to website</span>
          </a>
          <h1 className="font-display font-bold text-lg">
            <span className="text-gradient-gold">Content</span> Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-1">{contentRegistry.length} editable fields</p>
        </div>

        <nav className="flex-1 py-3 px-3 space-y-0.5">
          {sectionOrder.map((section) => {
            const fields = grouped[section];
            const editCount = fields.filter((f) => editedKeys.has(f.key)).length;
            const isActive = activeSection === section;

            return (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <span className="text-base">{sectionIcons[section] || "📄"}</span>
                <span className="flex-1 truncate">{sectionLabels[section] || section}</span>
                {editCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {editCount}
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground">{fields.length}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          {hasEdits && (
            <Button onClick={handleSave} disabled={saving} size="sm" className="w-full glow-gold font-display">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4 mr-1" />}
              Save {Object.keys(edited).length} Change{Object.keys(edited).length > 1 ? "s" : ""}
            </Button>
          )}
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-4xl mx-auto px-4 md:px-6 h-14 flex items-center gap-3">
            {/* Mobile only: back + title */}
            <div className="flex items-center gap-3 lg:hidden">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </a>
              <h1 className="font-display font-bold text-sm">
                <span className="text-gradient-gold">Content</span> Manager
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fields by name, key, or content…"
                className="w-full h-9 pl-9 pr-8 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile save/logout */}
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
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-6 py-6 space-y-3">
          {filteredSections.map((section) => {
            const fields = grouped[section];
            if (!fields || fields.length === 0) return null;
            const isOpen = openSections[section] ?? false;
            const editCount = fields.filter((f) => editedKeys.has(f.key)).length;

            // Filter fields by search
            const visibleFields = search
              ? fields.filter(
                  (f) =>
                    f.label.toLowerCase().includes(searchLower) ||
                    f.key.toLowerCase().includes(searchLower) ||
                    (edited[f.key] ?? dbValues[f.key] ?? f.defaultValue).toLowerCase().includes(searchLower)
                )
              : fields;

            const shouldOpen = isOpen || (search.length > 0 && visibleFields.length > 0);

            return (
              <div
                key={section}
                ref={(el) => { sectionRefs.current[section] = el; }}
                className="rounded-xl border border-border bg-card overflow-hidden scroll-mt-20"
              >
                {/* Section header — always visible, acts as toggle */}
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors text-left"
                >
                  <span className="text-xl">{sectionIcons[section] || "📄"}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-display font-bold text-foreground">
                      {sectionLabels[section] || section}
                    </h2>
                    <p className="text-[11px] text-muted-foreground">
                      {visibleFields.length} field{visibleFields.length !== 1 ? "s" : ""}
                      {editCount > 0 && (
                        <span className="text-primary ml-1.5 font-medium">
                          · {editCount} unsaved
                        </span>
                      )}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      shouldOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Collapsible fields */}
                {shouldOpen && (
                  <div className="border-t border-border divide-y divide-border">
                    {visibleFields.map((field) => {
                      const currentValue = edited[field.key] ?? dbValues[field.key] ?? field.defaultValue;
                      const isEdited = editedKeys.has(field.key);

                      return (
                        <div
                          key={field.key}
                          className={cn(
                            "px-5 py-3.5 transition-colors",
                            isEdited && "bg-primary/[0.03]"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <label className="text-xs font-semibold text-foreground">
                              {field.label}
                            </label>
                            {isEdited && (
                              <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                edited
                              </span>
                            )}
                          </div>
                          <AutoResizeTextarea
                            value={currentValue}
                            onChange={(val) => handleChange(field.key, val)}
                          />
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

/** Auto-resizing textarea that supports Enter for new lines */
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
