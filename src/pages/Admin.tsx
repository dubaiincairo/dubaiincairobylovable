import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, LogOut, ArrowLeft } from "lucide-react";
import { contentRegistry, sectionOrder, sectionLabels } from "@/lib/contentRegistry";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dbValues, setDbValues] = useState<Record<string, string>>({});
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

    // Update local state
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const hasEdits = Object.keys(edited).length > 0;

  // Group registry fields by section
  const grouped = sectionOrder.reduce<Record<string, typeof contentRegistry>>((acc, section) => {
    acc[section] = contentRegistry.filter((f) => f.section === section);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </a>
            <h1 className="font-display font-bold text-lg">
              <span className="text-gradient-gold">Content</span> Manager
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {hasEdits && (
              <Button onClick={handleSave} disabled={saving} size="sm" className="glow-gold font-display">
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4 mr-1" />}
                Save Changes
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {sectionOrder.map((section) => {
          const fields = grouped[section];
          if (!fields || fields.length === 0) return null;

          return (
            <div key={section}>
              <h2 className="text-xl font-display font-bold mb-6 text-primary">
                {sectionLabels[section] || section}
              </h2>
              <div className="space-y-5">
                {fields.map((field) => {
                  const currentValue = edited[field.key] ?? dbValues[field.key] ?? field.defaultValue;

                  return (
                    <div key={field.key} className="p-4 rounded-xl border border-border bg-card">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {field.label}
                        <span className="text-xs text-muted-foreground ml-2">({field.key})</span>
                      </label>
                      <AutoResizeTextarea
                        value={currentValue}
                        onChange={(val) => handleChange(field.key, val)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
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
    el.style.height = Math.max(40, el.scrollHeight) + "px";
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
