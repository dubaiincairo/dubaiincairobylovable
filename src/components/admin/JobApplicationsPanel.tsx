import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Briefcase, Trash2, Mail, Phone, MapPin, GraduationCap,
  Calendar, ChevronDown, ChevronUp, Search, X, ExternalLink,
  User, CreditCard, Filter, Download, FileText, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

type Application = {
  id: string;
  job_id: string | null;
  job_title: string | null;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  email: string;
  country: string | null;
  city: string | null;
  mobile: string;
  address: string | null;
  bachelor_degree: string | null;
  linkedin_url: string | null;
  instapay_link: string | null;
  graduation_year: string | null;
  id_front_url: string | null;
  id_back_url: string | null;
  resume_url: string | null;
  created_at: string | null;
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function initials(a: Application) {
  return `${a.first_name.charAt(0)}${a.last_name.charAt(0)}`.toUpperCase();
}

function fullName(a: Application) {
  return `${a.first_name} ${a.last_name}`;
}

function InfoChip({ icon: Icon, text }: { icon: typeof Mail; text: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Icon className="w-3 h-3 shrink-0" />
      {text}
    </span>
  );
}

// ─── storage file preview ─────────────────────────────────────────────────────
// Accepts either a bare storage path (e.g. "general/abc.jpg") or a full URL.
// Generates a 1-hour signed URL so private-bucket files are always viewable.

function StorageFile({ storagePath, label }: { storagePath: string; label: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      // Already a full URL — use it directly
      if (storagePath.startsWith("http")) {
        setUrl(storagePath);
        return;
      }
      // Bare storage path — generate a signed URL (valid 1 h)
      const { data, error } = await supabase.storage
        .from("applications")
        .createSignedUrl(storagePath, 3600);
      if (cancelled) return;
      if (error || !data?.signedUrl) { setErr(true); return; }
      setUrl(data.signedUrl);
    }

    resolve();
    return () => { cancelled = true; };
  }, [storagePath]);

  const isPdf =
    storagePath.toLowerCase().endsWith(".pdf") ||
    (url ?? "").toLowerCase().includes(".pdf");

  if (err) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-destructive/30 bg-destructive/5 text-xs text-destructive">
        <FileText className="w-3.5 h-3.5 shrink-0" />
        <span>Could not load {label}</span>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="w-32 h-20 rounded-lg border border-border bg-muted animate-pulse" />
    );
  }

  if (isPdf) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted hover:border-primary/40 hover:bg-primary/5 transition-colors text-xs font-medium"
      >
        <FileText className="w-4 h-4 text-primary shrink-0" />
        <span className="truncate max-w-[140px]">{label}</span>
        <Eye className="w-3.5 h-3.5 text-muted-foreground ml-auto shrink-0" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-lg border border-border overflow-hidden w-32 h-20 bg-muted hover:border-primary/40 transition-colors block"
    >
      <img
        src={url}
        alt={label}
        className="w-full h-full object-cover"
        onError={() => setErr(true)}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <Eye className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="absolute bottom-0 inset-x-0 bg-background/80 text-center py-0.5">
        <span className="text-[10px] font-semibold text-muted-foreground">{label}</span>
      </div>
    </a>
  );
}

// ─── single application card ──────────────────────────────────────────────────

function ApplicationCard({
  app,
  isOpen,
  onToggle,
  onDelete,
}: {
  app: Application;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: (id: string, name: string) => void;
}) {
  const appliedAt = app.created_at ? new Date(app.created_at) : null;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* ── Row header ── */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/30 transition-colors"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-display font-bold text-sm">
          {initials(app)}
        </div>

        {/* Name + role */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-foreground">{fullName(app)}</span>
            {app.job_title && (
              <span className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                {app.job_title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <InfoChip icon={Mail} text={app.email} />
            <InfoChip icon={Phone} text={app.mobile} />
          </div>
        </div>

        {/* Date + toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {appliedAt && (
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-muted-foreground">
                {format(appliedAt, "dd MMM yyyy")}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {format(appliedAt, "HH:mm")}
              </p>
            </div>
          )}
          {isOpen
            ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {/* ── Expanded detail ── */}
      {isOpen && (
        <div className="border-t border-border bg-muted/10">

          {/* Timestamp bar */}
          {appliedAt && (
            <div className="flex items-center gap-2 px-5 py-2.5 bg-muted/30 border-b border-border">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Applied on&nbsp;
                <span className="font-semibold text-foreground">
                  {format(appliedAt, "EEEE, dd MMMM yyyy 'at' HH:mm")}
                </span>
                &nbsp;·&nbsp;{formatDistanceToNow(appliedAt, { addSuffix: true })}
              </span>
            </div>
          )}

          <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Personal Info */}
            <section className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Personal Info
              </p>
              <DetailRow icon={User} label="Full Name" value={fullName(app)} />
              {app.date_of_birth && (
                <DetailRow icon={Calendar} label="Date of Birth" value={app.date_of_birth} />
              )}
              <DetailRow icon={Mail} label="Email" value={app.email} href={`mailto:${app.email}`} />
              <DetailRow icon={Phone} label="Mobile" value={app.mobile} href={`tel:${app.mobile}`} />
              {(app.city || app.country) && (
                <DetailRow
                  icon={MapPin}
                  label="Location"
                  value={[app.city, app.country].filter(Boolean).join(", ")}
                />
              )}
              {app.address && (
                <DetailRow icon={MapPin} label="Address" value={app.address} />
              )}
            </section>

            {/* Education & Links */}
            <section className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Education & Links
              </p>
              {app.bachelor_degree && (
                <DetailRow icon={GraduationCap} label="Bachelor's Degree" value={app.bachelor_degree} />
              )}
              {app.graduation_year && (
                <DetailRow icon={GraduationCap} label="Graduation Year" value={app.graduation_year} />
              )}
              {app.linkedin_url && (
                <DetailRow icon={ExternalLink} label="LinkedIn" value="View Profile" href={app.linkedin_url} />
              )}
              {app.instapay_link && (
                <DetailRow icon={CreditCard} label="InstaPay" value={app.instapay_link} />
              )}
            </section>
          </div>

          {/* ID documents + Resume */}
          {(app.id_front_url || app.id_back_url || app.resume_url) && (
            <div className="px-5 pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Uploaded Documents
              </p>
              <div className="flex gap-3 flex-wrap">
                {app.id_front_url && (
                  <StorageFile storagePath={app.id_front_url} label="ID Front" />
                )}
                {app.id_back_url && (
                  <StorageFile storagePath={app.id_back_url} label="ID Back" />
                )}
                {app.resume_url && (
                  <StorageFile storagePath={app.resume_url} label="CV / Resume" />
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="px-5 pb-4 flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" asChild>
              <a href={`mailto:${app.email}?subject=Re: Your Application for ${app.job_title ?? "the position"} at Dubai in Cairo`}>
                <Mail className="w-3.5 h-3.5 mr-1.5" /> Reply via Email
              </a>
            </Button>
            {app.mobile && (
              <Button size="sm" variant="outline" asChild>
                <a href={`tel:${app.mobile}`}>
                  <Phone className="w-3.5 h-3.5 mr-1.5" /> Call
                </a>
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30 ml-auto"
              onClick={() => onDelete(app.id, fullName(app))}
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── detail row ───────────────────────────────────────────────────────────────

function DetailRow({
  icon: Icon, label, value, href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide leading-none mb-0.5">{label}</p>
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-xs text-foreground break-words">{value}</p>
        )}
      </div>
    </div>
  );
}

// ─── main panel ───────────────────────────────────────────────────────────────

export function JobApplicationsPanel() {
  const { toast } = useToast();
  const [list, setList]         = useState<Application[]>([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch]     = useState("");
  const [filterJob, setFilterJob] = useState<string>("all");

  const load = async () => {
    const { data } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setList(data as Application[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const jobTitles = useMemo(() => {
    const titles = [...new Set(list.map((a) => a.job_title).filter(Boolean) as string[])];
    return titles.sort();
  }, [list]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return list.filter((a) => {
      if (filterJob !== "all" && a.job_title !== filterJob) return false;
      if (!q) return true;
      return (
        fullName(a).toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.mobile.toLowerCase().includes(q) ||
        (a.job_title ?? "").toLowerCase().includes(q) ||
        (a.city ?? "").toLowerCase().includes(q) ||
        (a.country ?? "").toLowerCase().includes(q) ||
        (a.bachelor_degree ?? "").toLowerCase().includes(q)
      );
    });
  }, [list, search, filterJob]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete application from "${name}"? This cannot be undone.`)) return;
    await supabase.from("job_applications").delete().eq("id", id);
    setList((prev) => prev.filter((a) => a.id !== id));
    if (expanded === id) setExpanded(null);
    toast({ title: "Application deleted" });
  };

  if (loading) return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6">
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-muted" />
        ))}
      </div>
    </main>
  );

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 overflow-y-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <h2 className="font-display font-bold text-lg">Job Applications</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {list.length} total · {filtered.length} shown
            {filterJob !== "all" && ` · filtered by "${filterJob}"`}
          </p>
        </div>
        {/* Export CSV (simple) */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const headers = ["Name", "Email", "Mobile", "Job Title", "City", "Country", "Degree", "Applied At"];
            const rows = filtered.map((a) => [
              fullName(a), a.email, a.mobile, a.job_title ?? "",
              a.city ?? "", a.country ?? "", a.bachelor_degree ?? "",
              a.created_at ? format(new Date(a.created_at), "dd MMM yyyy HH:mm") : "",
            ]);
            const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "job-applications.csv"; a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, role…"
            className="w-full h-9 pl-9 pr-8 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Job title filter */}
        {jobTitles.length > 1 && (
          <div className="relative">
            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <select
              value={filterJob}
              onChange={(e) => setFilterJob(e.target.value)}
              className={cn(
                "h-9 pl-8 pr-3 rounded-lg border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none",
                filterJob !== "all" && "border-primary/50 text-primary"
              )}
            >
              <option value="all">All Roles</option>
              {jobTitles.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Stats row */}
      {jobTitles.length > 0 && filterJob === "all" && !search && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {jobTitles.map((title) => {
            const count = list.filter((a) => a.job_title === title).length;
            return (
              <button
                key={title}
                onClick={() => setFilterJob(title)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-xs font-medium text-muted-foreground transition-colors"
              >
                <Briefcase className="w-3 h-3" />
                {title}
                <span className="w-4 h-4 rounded-full bg-background flex items-center justify-center text-[10px] font-bold text-foreground">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <Briefcase className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground mb-1">
            {list.length === 0 ? "No applications yet." : "No applications match your filter."}
          </p>
          {(search || filterJob !== "all") && (
            <button
              onClick={() => { setSearch(""); setFilterJob("all"); }}
              className="mt-1 text-xs text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              isOpen={expanded === app.id}
              onToggle={() => setExpanded(expanded === app.id ? null : app.id)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}
