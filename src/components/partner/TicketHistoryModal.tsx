import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
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
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

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

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0a0d14]/95 border-border/60 text-foreground backdrop-blur-xl"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-display font-semibold flex items-center justify-between">
            <span>{t.historyTitle}</span>
            <span className="text-xs font-mono font-normal px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {tickets.length} {lang === "ar" ? "تذاكر" : "Tickets"}
            </span>
          </DialogTitle>
        </DialogHeader>

        {tickets.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-30 text-primary" />
            <p>{t.historyEmpty}</p>
          </div>
        ) : (
          <div className="space-y-4 mt-3">
            {tickets.map((ticket) => {
              const meta = SYSTEM_META[ticket.system as TicketSystem] || SYSTEM_META.odoo;
              return (
                <div
                  key={ticket.ticket_number}
                  className="p-4 rounded-xl border border-border/60 bg-card/40 hover:bg-card/70 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-md text-xs font-semibold"
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
                      <Badge variant="outline" className="text-[11px] capitalize border-border/60">
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{ticket.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 whitespace-pre-line">
                      {ticket.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground gap-2 pt-1">
                    <div className="flex items-center gap-3">
                      <span>
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
                      <span className="font-mono">
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
