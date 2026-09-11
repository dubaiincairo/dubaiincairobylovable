import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LifeBuoy,
  Trash2,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  ImageIcon,
  Video,
  Building2,
  AlertTriangle,
  Mail,
  Copy,
  Check,
  MessageCircle,
  X,
  Layers,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow, format } from "date-fns";

export type AdminTicket = {
  id: string;
  ticket_number: string;
  system: "odoo" | "ezee" | "ozoo" | string;
  branch: string;
  priority: "critical" | "high" | "medium" | "low" | string;
  status: "open" | "in_progress" | "resolved" | string;
  title: string;
  description: string;
  issue_url?: string | null;
  screenshot_url?: string | null;
  screen_recording_url?: string | null;
  client_name: string;
  client_email: string;
  client_phone?: string | null;
  created_at: string;
  source_table: "client_tickets" | "contact_submissions";
};

export function SupportTicketsPanel() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [systemFilter, setSystemFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const loadTickets = async () => {
    setLoading(true);
    const collected: AdminTicket[] = [];

    // 1. Try fetching from dedicated client_tickets table
    try {
      const { data: clientTickets } = await supabase
        .from("client_tickets" as any)
        .select("*")
        .order("created_at", { ascending: false });

      if (clientTickets && Array.isArray(clientTickets)) {
        clientTickets.forEach((t: any) => {
          collected.push({
            id: t.id,
            ticket_number: t.ticket_number || `TK-${t.id.slice(0, 6)}`,
            system: (t.system || "odoo").toLowerCase(),
            branch: t.branch || "Unspecified Branch",
            priority: (t.priority || "medium").toLowerCase(),
            status: t.status || "open",
            title: t.title || "Support Ticket",
            description: t.description || "",
            issue_url: t.issue_url,
            screenshot_url: t.screenshot_url,
            screen_recording_url: t.screen_recording_url,
            client_name: t.client_name || "Anonymous",
            client_email: t.client_email || "",
            client_phone: t.client_phone,
            created_at: t.created_at || new Date().toISOString(),
            source_table: "client_tickets",
          });
        });
      }
    } catch {
      // Table might not exist yet; proceed to fallback
    }

    // 2. Fetch from contact_submissions where message starts with [CLIENT TICKET
    try {
      const { data: submissions } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (submissions && Array.isArray(submissions)) {
        submissions.forEach((sub: any) => {
          const msg = sub.message || "";
          if (msg.includes("[CLIENT TICKET")) {
            const ticketNumMatch = msg.match(/\[CLIENT TICKET\s+([^\]]+)\]/i);
            const ticketNum = ticketNumMatch ? ticketNumMatch[1].trim() : `TK-${sub.id.slice(0, 6)}`;

            // Deduplicate if already loaded from client_tickets
            if (collected.some((t) => t.ticket_number === ticketNum)) return;

            const systemMatch = msg.match(/System:\s*([^\n]+)/i);
            const branchMatch = msg.match(/Branch:\s*([^\n]+)/i);
            const priorityMatch = msg.match(/Priority:\s*([^\n]+)/i);
            const urlMatch = msg.match(/Issue URL:\s*([^\n]+)/i);
            const titleMatch = msg.match(/Title:\s*([^\n]+)/i);
            const screenshotMatch = msg.match(/Screenshot:\s*([^\n]+)/i);
            const recordingMatch = msg.match(/Screen Recording:\s*([^\n]+)/i);

            let description = "";
            const descMatch = msg.match(/Description:\s*\n([\s\S]*?)(?=\n\nScreenshot:|$)/i);
            if (descMatch) {
              description = descMatch[1].trim();
            } else {
              description = msg;
            }

            const issueUrl = urlMatch && urlMatch[1].trim() !== "N/A" ? urlMatch[1].trim() : null;
            const screenshotUrl =
              screenshotMatch &&
              screenshotMatch[1].trim() !== "None" &&
              !screenshotMatch[1].trim().startsWith("local://")
                ? screenshotMatch[1].trim()
                : null;
            const recordingUrl =
              recordingMatch &&
              recordingMatch[1].trim() !== "None" &&
              !recordingMatch[1].trim().startsWith("local://")
                ? recordingMatch[1].trim()
                : null;

            collected.push({
              id: sub.id,
              ticket_number: ticketNum,
              system: (systemMatch ? systemMatch[1].trim().toLowerCase() : "odoo"),
              branch: branchMatch ? branchMatch[1].trim() : "Unspecified Branch",
              priority: (priorityMatch ? priorityMatch[1].trim().toLowerCase() : "medium"),
              status: "open",
              title: titleMatch ? titleMatch[1].trim() : "Support Ticket",
              description,
              issue_url: issueUrl,
              screenshot_url: screenshotUrl,
              screen_recording_url: recordingUrl,
              client_name: sub.name || "Client",
              client_email: sub.email || "",
              client_phone: sub.phone || null,
              created_at: sub.created_at,
              source_table: "contact_submissions",
            });
          }
        });
      }
    } catch {
      // Ignore
    }

    // Sort newest first
    collected.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setTickets(collected);
    setLoading(false);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleDelete = async (ticket: AdminTicket) => {
    if (!confirm(`Delete ticket "${ticket.ticket_number}" from ${ticket.client_name}? This cannot be undone.`)) {
      return;
    }

    try {
      if (ticket.source_table === "client_tickets") {
        await supabase.from("client_tickets" as any).delete().eq("id", ticket.id);
      } else {
        await supabase.from("contact_submissions").delete().eq("id", ticket.id);
      }
      setTickets((prev) => prev.filter((t) => t.id !== ticket.id));
      toast({ title: "Ticket deleted successfully" });
    } catch {
      toast({ title: "Failed to delete ticket", variant: "destructive" });
    }
  };

  const handleCopySummary = (t: AdminTicket) => {
    const summary = `[TICKET ${t.ticket_number}]
System: ${t.system.toUpperCase()}
Branch: ${t.branch}
Priority: ${t.priority.toUpperCase()}
Client: ${t.client_name} (${t.client_email}${t.client_phone ? ` · ${t.client_phone}` : ""})
Title: ${t.title}
URL: ${t.issue_url || "N/A"}

Description:
${t.description}

${t.screenshot_url ? `Screenshot: ${t.screenshot_url}\n` : ""}${t.screen_recording_url ? `Recording: ${t.screen_recording_url}\n` : ""}`;

    navigator.clipboard.writeText(summary);
    setCopiedId(t.id);
    toast({ title: "Ticket summary copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filtered tickets
  const filtered = tickets.filter((t) => {
    if (systemFilter !== "all" && t.system !== systemFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.ticket_number.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.branch.toLowerCase().includes(q) ||
      t.client_name.toLowerCase().includes(q) ||
      t.client_email.toLowerCase().includes(q)
    );
  });

  const getSystemBadge = (system: string) => {
    const s = system.toLowerCase();
    if (s.includes("odoo")) {
      return (
        <Badge className="bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[11px] font-semibold">
          Odoo
        </Badge>
      );
    }
    if (s.includes("ezee")) {
      return (
        <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold">
          eZee Absolute
        </Badge>
      );
    }
    if (s.includes("ozoo")) {
      return (
        <Badge className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px] font-semibold">
          Ozoo Connector
        </Badge>
      );
    }
    return <Badge variant="outline">{system.toUpperCase()}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const p = priority.toLowerCase();
    if (p === "critical") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded-full border border-red-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          Critical
        </span>
      );
    }
    if (p === "high") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded-full border border-orange-500/30">
          High
        </span>
      );
    }
    if (p === "medium") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
          Medium
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-300 bg-blue-500/15 px-2 py-0.5 rounded-full border border-blue-500/30">
        Low
      </span>
    );
  };

  const stats = {
    total: tickets.length,
    odoo: tickets.filter((t) => t.system.includes("odoo")).length,
    ezee: tickets.filter((t) => t.system.includes("ezee")).length,
    ozoo: tickets.filter((t) => t.system.includes("ozoo")).length,
    critical: tickets.filter((t) => t.priority === "critical" || t.priority === "high").length,
  };

  if (loading) {
    return (
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-6 py-6">
        <div className="space-y-3 animate-pulse">
          <div className="h-20 rounded-xl bg-muted" />
          <div className="h-14 rounded-xl bg-muted" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-muted" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-6 py-6 space-y-6 overflow-y-auto">
      {/* Header & Metrics */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 text-primary" />
              Client Support Tickets
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time issues submitted by hotel and factory partners across Odoo, eZee, and Ozoo.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={loadTickets}
            className="self-start sm:self-auto h-8 text-xs gap-1.5"
          >
            Refresh Queue
          </Button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-border/80 bg-card/60 p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
              {stats.total}
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Total Tickets</p>
              <p className="text-sm font-bold text-foreground">All Systems</p>
            </div>
          </div>

          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
              {stats.odoo}
            </div>
            <div>
              <p className="text-[11px] text-purple-300/80">Odoo Tickets</p>
              <p className="text-sm font-bold text-purple-200">ERP & POS</p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
              {stats.ezee}
            </div>
            <div>
              <p className="text-[11px] text-emerald-300/80">eZee Tickets</p>
              <p className="text-sm font-bold text-emerald-200">PMS & Booking</p>
            </div>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center font-bold">
              {stats.critical}
            </div>
            <div>
              <p className="text-[11px] text-red-300/80">Urgent Priority</p>
              <p className="text-sm font-bold text-red-200">Critical / High</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket #, title, client, branch..."
            className="pl-9 h-9 text-xs bg-card border-border/80"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* System filter */}
          <select
            value={systemFilter}
            onChange={(e) => setSystemFilter(e.target.value)}
            className="h-9 rounded-lg border border-border/80 bg-card px-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
          >
            <option value="all">All Systems</option>
            <option value="odoo">Odoo</option>
            <option value="ezee">eZee Absolute</option>
            <option value="ozoo">Ozoo Connector</option>
          </select>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="h-9 rounded-lg border border-border/80 bg-card px-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Ticket List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/40">
          <LifeBuoy className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-sm font-semibold text-foreground">No support tickets found</p>
          <p className="text-xs text-muted-foreground mt-1">
            {tickets.length === 0
              ? "When clients submit tickets from the Partner Portal (/partner), they will appear here."
              : "No tickets match your search or filter criteria."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => {
            const isOpen = expandedId === t.id;
            return (
              <div
                key={t.id}
                className="rounded-2xl border border-border/80 bg-card hover:border-border transition-all shadow-sm overflow-hidden"
              >
                {/* Collapsed Header Bar */}
                <button
                  onClick={() => setExpandedId(isOpen ? null : t.id)}
                  className="w-full text-left p-4 flex items-start gap-3.5 hover:bg-muted/20 transition-colors"
                >
                  <div className="pt-0.5">{getSystemBadge(t.system)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs font-bold text-primary">{t.ticket_number}</span>
                      {getPriorityBadge(t.priority)}
                      <span className="text-xs text-muted-foreground flex items-center gap-1 truncate max-w-[220px]">
                        <Building2 className="w-3 h-3 text-muted-foreground shrink-0" />
                        {t.branch}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-foreground truncate">{t.title}</h4>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5 flex-wrap">
                      <span>{t.client_name}</span>
                      <span>·</span>
                      <span>{t.client_email}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(t.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 pt-1 text-muted-foreground">
                    {t.screenshot_url && <ImageIcon className="w-4 h-4 text-primary" title="Screenshot attached" />}
                    {t.screen_recording_url && <Video className="w-4 h-4 text-emerald-400" title="Video attached" />}
                    {isOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                  </div>
                </button>

                {/* Expanded Details Body */}
                {isOpen && (
                  <div className="border-t border-border/80 bg-muted/10 p-5 space-y-4 animate-in fade-in">
                    {/* Meta Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-muted-foreground">Affected Branch:</span>
                        <p className="font-medium text-foreground flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          {t.branch}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-muted-foreground">Submission Time:</span>
                        <p className="font-medium text-foreground flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          {format(new Date(t.created_at), "dd MMM yyyy, HH:mm:ss")}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-muted-foreground">Client Submitter:</span>
                        <p className="font-medium text-foreground">
                          {t.client_name} ({t.client_email})
                        </p>
                      </div>

                      {t.client_phone && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-muted-foreground">Contact Phone:</span>
                          <p className="font-medium text-foreground flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            {t.client_phone}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Incident URL */}
                    {t.issue_url && (
                      <div className="p-3 rounded-xl bg-background border border-border/80 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                            Direct Issue Link
                          </span>
                          <p className="text-xs font-mono text-primary truncate mt-0.5">{t.issue_url}</p>
                        </div>
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 shrink-0" asChild>
                          <a href={t.issue_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3" /> Open
                          </a>
                        </Button>
                      </div>
                    )}

                    {/* Description Box */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-muted-foreground">Full Problem Description:</span>
                      <div className="rounded-xl bg-background border border-border/80 p-3.5 text-xs sm:text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                        {t.description}
                      </div>
                    </div>

                    {/* Attachments Section */}
                    {(t.screenshot_url || t.screen_recording_url) && (
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-semibold text-muted-foreground">Attached Proof:</span>
                        <div className="flex flex-wrap gap-3 items-center">
                          {t.screenshot_url && (
                            <button
                              onClick={() => setPreviewImage(t.screenshot_url || null)}
                              className="group flex items-center gap-2.5 p-2 rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-all text-xs text-foreground"
                            >
                              {brokenImages[t.id] ? (
                                <div className="w-10 h-10 rounded-lg bg-muted/60 border border-border/80 flex items-center justify-center text-muted-foreground shrink-0">
                                  <ImageIcon className="w-5 h-5 text-muted-foreground/60" />
                                </div>
                              ) : (
                                <img
                                  src={t.screenshot_url}
                                  alt="Screenshot"
                                  onError={() => setBrokenImages((prev) => ({ ...prev, [t.id]: true }))}
                                  className="w-10 h-10 rounded-lg object-cover border border-border/80 group-hover:scale-105 transition-transform shrink-0 bg-background"
                                />
                              )}
                              <span className="font-medium group-hover:text-primary transition-colors">
                                {brokenImages[t.id] ? "Attachment Unreadable" : "View Screenshot"}
                              </span>
                            </button>
                          )}

                          {t.screen_recording_url && (
                            <a
                              href={t.screen_recording_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors text-xs font-medium"
                            >
                              <Video className="w-4 h-4 text-emerald-400" />
                              Watch Screen Recording
                              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border/60">
                      <div className="flex flex-wrap gap-2">
                        {/* Email Submitter */}
                        <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5" asChild>
                          <a
                            href={`mailto:${t.client_email}?subject=Update on Support Ticket ${t.ticket_number}: ${encodeURIComponent(
                              t.title
                            )}`}
                          >
                            <Mail className="w-3.5 h-3.5" /> Email Submitter
                          </a>
                        </Button>

                        {/* WhatsApp Submitter if phone exists */}
                        {t.client_phone && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs gap-1.5 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                            asChild
                          >
                            <a
                              href={`https://wa.me/${t.client_phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `مرحباً ${t.client_name}، نتواصل معك بخصوص تذكرة الدعم الفني رقم ${t.ticket_number} (${t.title}).`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                            </a>
                          </Button>
                        )}

                        {/* Copy Summary */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopySummary(t)}
                          className="h-8 text-xs gap-1.5"
                        >
                          {copiedId === t.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                          <span>{copiedId === t.id ? "Copied" : "Copy Ticket"}</span>
                        </Button>
                      </div>

                      {/* Delete */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(t)}
                        className="h-8 text-xs gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Screenshot Fullscreen Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[92vh] bg-card rounded-2xl p-3.5 border border-border shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-2.5 mb-2.5 border-b border-border/60 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-primary" /> Screenshot Proof
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5" asChild>
                  <a href={previewImage} download="support-ticket-screenshot.png">
                    Download Image
                  </a>
                </Button>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-1.5 rounded-lg bg-muted/60 hover:bg-muted text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <img
              src={previewImage}
              alt="Screenshot Preview"
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain bg-background/50"
            />
          </div>
        </div>
      )}
    </main>
  );
}
