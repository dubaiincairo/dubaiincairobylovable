import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, LogOut, ArrowLeft } from "lucide-react";

interface ContentRow {
  id: string;
  section: string;
  key: string;
  value: string;
  label: string;
}

const sectionOrder = ["hero", "stats", "about", "founder", "contact", "footer"];
const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  stats: "Statistics",
  about: "About Section",
  founder: "Founder Section",
  contact: "Contact Section",
  footer: "Footer",
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState<ContentRow[]>([]);
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

      const { data } = await supabase.from("site_content").select("*").order("section");
      if (data) setContent(data as ContentRow[]);
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

    for (const [key, value] of updates) {
      await supabase
        .from("site_content")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key);
    }

    setSaving(false);
    setEdited({});
    toast({ title: "Content saved", description: `${updates.length} field(s) updated successfully.` });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const grouped = sectionOrder.reduce<Record<string, ContentRow[]>>((acc, section) => {
    acc[section] = content.filter((c) => c.section === section);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const hasEdits = Object.keys(edited).length > 0;

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
          const items = grouped[section];
          if (!items || items.length === 0) return null;

          return (
            <div key={section}>
              <h2 className="text-xl font-display font-bold mb-6 text-primary">
                {sectionLabels[section] || section}
              </h2>
              <div className="space-y-5">
                {items.map((item) => {
                  const currentValue = edited[item.key] ?? item.value;
                  const isLong = item.value.length > 100;

                  return (
                    <div key={item.key} className="p-4 rounded-xl border border-border bg-card">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {item.label}
                        <span className="text-xs text-muted-foreground ml-2">({item.key})</span>
                      </label>
                      {isLong ? (
                        <Textarea
                          value={currentValue}
                          onChange={(e) => handleChange(item.key, e.target.value)}
                          rows={4}
                          className="bg-background border-border"
                        />
                      ) : (
                        <Input
                          value={currentValue}
                          onChange={(e) => handleChange(item.key, e.target.value)}
                          className="bg-background border-border"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {content.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No content entries found. Seed the database first.</p>
        )}
      </main>
    </div>
  );
};

export default Admin;
