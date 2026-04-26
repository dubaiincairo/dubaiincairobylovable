import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Briefcase, Landmark, Mail, MessageSquare, Star, Clock, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type ActivityEntry = {
  id: string;
  user_email: string | null;
  action: string;
  entity_type: string;
  entity_label: string | null;
  fields_changed: number | null;
  created_at: string;
};

type Stats = {
  contacts: number;
  caseStudies: number;
  jobs: number;
  banks: number;
  testimonials: number;
  activity: ActivityEntry[];
};

const actionColor: Record<string, string> = {
  created:     "text-green-500 bg-green-500/10",
  updated:     "text-blue-500  bg-blue-500/10",
  deleted:     "text-red-500   bg-red-500/10",
  published:   "text-primary   bg-primary/10",
  unpublished: "text-muted-foreground bg-muted",
};

const entityIcon: Record<string, typeof BookOpen> = {
  content:     TrendingUp,
  case_study:  BookOpen,
  job:         Briefcase,
  bank:        Landmark,
  testimonial: Star,
};

export function DashboardPanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [
        { count: contacts },
        { count: caseStudies },
        { count: jobs },
        { count: banks },
        { count: testimonials },
        { data: activity },
      ] = await Promise.all([
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("case_studies").select("*", { count: "exact", head: true }),
        supabase.from("job_listings").select("*", { count: "exact", head: true }),
        supabase.from("bank_accounts").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("admin_activity_log").select("*").order("created_at", { ascending: false }).limit(20),
      ]);

      setStats({
        contacts: contacts ?? 0,
        caseStudies: caseStudies ?? 0,
        jobs: jobs ?? 0,
        banks: banks ?? 0,
        testimonials: testimonials ?? 0,
        activity: (activity ?? []) as ActivityEntry[],
      });
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-muted" />
        ))}
      </div>
    </main>
  );

  const statCards = [
    { label: "Contact Messages", value: stats!.contacts,     icon: Mail,        color: "text-blue-500  bg-blue-500/10",   href: "contacts" },
    { label: "Case Studies",     value: stats!.caseStudies,  icon: BookOpen,    color: "text-amber-500 bg-amber-500/10",  href: "case-studies" },
    { label: "Job Listings",     value: stats!.jobs,         icon: Briefcase,   color: "text-green-500 bg-green-500/10",  href: "jobs" },
    { label: "Bank Accounts",    value: stats!.banks,        icon: Landmark,    color: "text-purple-500 bg-purple-500/10",href: "banks" },
    { label: "Testimonials",     value: stats!.testimonials, icon: Star,        color: "text-primary   bg-primary/10",    href: "testimonials" },
  ];

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 space-y-6">
      <div>
        <h2 className="font-display font-bold text-lg">Dashboard</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Overview of your CMS content</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold">{s.value}</div>
                <div className="text-[11px] text-muted-foreground leading-tight">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity log */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-display font-semibold">Recent Activity</h3>
        </div>
        {stats!.activity.length === 0 ? (
          <div className="py-12 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-30" />
            <p className="text-sm text-muted-foreground">No activity yet. Changes you make will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {stats!.activity.map((entry) => {
              const Icon = entityIcon[entry.entity_type] ?? TrendingUp;
              const colorClass = actionColor[entry.action] ?? "text-muted-foreground bg-muted";
              return (
                <div key={entry.id} className="flex items-start gap-3 px-5 py-3">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${colorClass}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-snug">
                      <span className="font-semibold capitalize">{entry.action}</span>
                      {" · "}
                      <span className="text-muted-foreground">{entry.entity_label ?? entry.entity_type}</span>
                      {entry.fields_changed ? (
                        <span className="text-muted-foreground"> ({entry.fields_changed} field{entry.fields_changed !== 1 ? "s" : ""})</span>
                      ) : null}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {entry.user_email ?? "Admin"}
                      {" · "}
                      {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
