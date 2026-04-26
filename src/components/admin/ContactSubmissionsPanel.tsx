import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Trash2, Phone, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow, format } from "date-fns";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

export function ContactSubmissionsPanel() {
  const { toast } = useToast();
  const [list, setList] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setList(data as Submission[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from "${name}"? This cannot be undone.`)) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    setList((prev) => prev.filter((s) => s.id !== id));
    toast({ title: "Message deleted" });
  };

  if (loading) return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-muted" />)}
      </div>
    </main>
  );

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-lg">Contact Messages</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {list.length} total message{list.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <Mail className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((s) => {
            const isOpen = expanded === s.id;
            return (
              <div key={s.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/30 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : s.id)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-display font-bold text-sm">
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">{s.name}</span>
                      <span className="text-xs text-muted-foreground">{s.email}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{s.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-muted-foreground hidden sm:block">
                      {formatDistanceToNow(new Date(s.created_at), { addSuffix: true })}
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border px-4 py-4 space-y-3 bg-muted/10">
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> {s.email}
                      </span>
                      {s.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3" /> {s.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {format(new Date(s.created_at), "dd MMM yyyy, HH:mm")}
                      </span>
                    </div>
                    <div className="rounded-lg bg-background border border-border p-3">
                      <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{s.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={`mailto:${s.email}?subject=Re: Your message to Dubai in Cairo`}>
                          <Mail className="w-3.5 h-3.5 mr-1.5" /> Reply via Email
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30"
                        onClick={() => handleDelete(s.id, s.name)}
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
