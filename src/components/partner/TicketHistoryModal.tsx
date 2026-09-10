import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  Copy,
  Check,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Layers,
  Building2,
  Calendar,
} from "lucide-react";
import { ClientTicket, SYSTEM_META, TicketSystem } from "@/types/tickets";
import { ticketTranslations } from "@/lib/ticketTranslations";

interface Props {
  open: boolean;
  onClose: () => void;
  tickets: ClientTicket[];
  lang: "en" | "ar";
}

export default function TicketHistoryModal({ open, onClose, tickets, lang }: Props) {
  const t = ticketTranslations[lang];
  const isRtl = lang === "ar";
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterSystem, setFilterSystem] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">Resolved</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40">In Progress</Badge>;
      case "closed":
        return <Badge className="bg-zinc-500/20 text-zinc-300 border-zinc-500/40">Closed</Badge>;
      default:
        return <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40">Open</Badge>;
    }
  };

  const filteredTickets = tickets.filter((tkt) => {
    const matchesSystem = filterSystem === "all" || tkt.system === filterSystem;
    const matchesSearch =
      searchQuery === "" ||
      tkt.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tkt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tkt.branch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSystem && matchesSearch;
  });

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-3xl max-h-[88vh] overflow-y-auto bg-[#0a0d14]/95 border-border/80 text-foreground backdrop-blur-2xl rounded-3xl p-6"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <DialogHeader className="pb-3 border-b border-border/60">
          <DialogTitle className="text-xl md:text-2xl font-display font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t.historyTitle}
            </span>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
              {tickets.length} {lang === "ar" ? "تذاكر مسجلة" : "Logged"}
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? "بحث برقم التذكرة أو العنوان أو الفرع..." : "Search by ID, title, or branch..."}
              className="bg-background/80 border-border/70 ps-9 h-10 text-xs rounded-xl"
            />
          </div>

          {/* System filter pills */}
          <div className="inline-flex rounded-xl border border-border/70 bg-card/50 p-1 text-xs gap-1 shrink-0 overflow-x-auto">
            {["all", "odoo", "ezee", "ozoo"].map((sys) => (
              <button
                type="button"
                key={sys}
                onClick={() => setFilterSystem(sys)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors uppercase text-[11px] ${
                  filterSystem === sys
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {sys === "all" ? t.historyFilterAll : sys}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground text-sm space-y-2">
            <Clock className="w-12 h-12 mx-auto opacity-30 text-primary" />
            <p className="font-medium">{t.historyEmpty}</p>
            {searchQuery && (
              <p className="text-xs opacity-75">
                {isRtl ? "لا توجد نتائج تطابق معايير البحث." : "No results match your search filter."}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3.5 mt-2">
            {filteredTickets.map((ticket) => {
              const meta = SYSTEM_META[ticket.system as TicketSystem] || SYSTEM_META.odoo;
              return (
                <div
                  key={ticket.ticket_number}
                  className="p-4 rounded-2xl border border-border/70 bg-card/40 hover:bg-card/75 transition-all space-y-3 shadow-sm hover:border-primary/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-lg text-xs font-bold"
                        style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
                      >
                        {isRtl ? meta.nameAr : meta.nameEn}
                      </span>
                      <span className="font-mono text-xs font-bold text-foreground/90">
                        #{ticket.ticket_number}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => handleCopy(ticket.ticket_number)}
                        title="Copy Ticket ID"
                      >
                        {copiedId === ticket.ticket_number ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(ticket.status || "open")}
                      <Badge variant="outline" className="text-[11px] capitalize border-border/60 font-mono">
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{ticket.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-3 mt-1.5 whitespace-pre-line leading-relaxed">
                      {ticket.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground gap-2 pt-1 border-t border-border/30">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-primary" />
                        <strong className="text-foreground/70">{t.historyBranch}</strong> {ticket.branch}
                      </span>
                      {ticket.issue_url && (
                        <a
                          href={ticket.issue_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Link</span>
                        </a>
                      )}
                    </div>
                    {ticket.created_at && (
                      <span className="font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(ticket.created_at).toLocaleDateString(isRtl ? "ar-EG" : "en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
