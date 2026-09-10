export type TicketSystem = "odoo" | "ezee" | "ozoo";

export type TicketPriority = "normal" | "medium" | "high" | "critical";

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

export interface ClientTicket {
  id?: string;
  ticket_number: string;
  system: TicketSystem;
  branch: string;
  issue_url?: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  screenshot_url?: string;
  screen_recording_url?: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  created_at?: string;
}

export interface TicketFormState {
  system: TicketSystem;
  branch: string;
  customBranch: string;
  issueUrl: string;
  title: string;
  description: string;
  priority: TicketPriority;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  screenRecordingLink: string;
  rememberMe: boolean;
}

export const BRANCH_OPTIONS_EN = [
  { id: "swiss_blue_khobar", label: "Swiss Blue Al Khobar (فندق سويس بلو الخبر)" },
  { id: "swiss_blue_riyadh", label: "Swiss Blue Riyadh (فندق سويس بلو الرياض)" },
  { id: "swiss_blue_jeddah", label: "Swiss Blue Jeddah (فندق سويس بلو جدة)" },
  { id: "swiss_blue_jubail", label: "Swiss Blue Al Jubail (فندق سويس بلو الجبيل)" },
  { id: "wd_group_hq", label: "WD Group Headquarters (المقر الرئيسي لمجموعة WD)" },
  { id: "other", label: "Other Branch / Location (فرع أو موقع آخر)" },
];

export const SYSTEM_META: Record<
  TicketSystem,
  {
    nameEn: string;
    nameAr: string;
    subtitleEn: string;
    subtitleAr: string;
    color: string;
    accentBg: string;
    badge: string;
  }
> = {
  odoo: {
    nameEn: "Odoo ERP",
    nameAr: "نظام أودو (Odoo ERP)",
    subtitleEn: "Accounting, Invoicing, Inventory, HR & Operations",
    subtitleAr: "المحاسبة، الفواتير، المخزون، الموارد البشرية والعمليات",
    color: "#a24689",
    accentBg: "from-[#a24689]/20 via-[#a24689]/5 to-transparent",
    badge: "ERP & POS",
  },
  ezee: {
    nameEn: "eZee Hospitality",
    nameAr: "نظام إيزي الفندقي (eZee PMS)",
    subtitleEn: "Frontdesk PMS, Reservations & Channel Manager",
    subtitleAr: "إدارة الفنادق والغرف، الحجوزات ومدير القنوات",
    color: "#0284c7",
    accentBg: "from-[#0284c7]/20 via-[#0284c7]/5 to-transparent",
    badge: "PMS & Hotel",
  },
  ozoo: {
    nameEn: "Ozoo Connector",
    nameAr: "مربط أوزو (Ozoo Connector)",
    subtitleEn: "Real-time sync middleware connecting eZee & Odoo",
    subtitleAr: "المحول الذكي للربط اللحظي بين نظام إيزي وأودو",
    color: "#f59e0b",
    accentBg: "from-[#f59e0b]/20 via-[#f59e0b]/5 to-transparent",
    badge: "Middleware Sync",
  },
};
