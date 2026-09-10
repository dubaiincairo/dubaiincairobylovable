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
  { id: "swiss_blue_khobar", label: "Swiss Blue Al Khobar" },
  { id: "swiss_blue_riyadh", label: "Swiss Blue Riyadh" },
  { id: "swiss_blue_jeddah", label: "Swiss Blue Jeddah" },
  { id: "swiss_blue_jubail", label: "Swiss Blue Al Jubail" },
  { id: "wd_group_hq", label: "WD Group Headquarters" },
  { id: "other", label: "Other Branch / Location" },
];

export const BRANCH_OPTIONS_AR = [
  { id: "swiss_blue_khobar", label: "فندق سويس بلو الخبر" },
  { id: "swiss_blue_riyadh", label: "فندق سويس بلو الرياض" },
  { id: "swiss_blue_jeddah", label: "فندق سويس بلو جدة" },
  { id: "swiss_blue_jubail", label: "فندق سويس بلو الجبيل" },
  { id: "wd_group_hq", label: "المقر الرئيسي لمجموعة دبليو دي للأعمال" },
  { id: "other", label: "فرع أو موقع آخر" },
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
    badgeEn: string;
    badgeAr: string;
    tagsEn: string[];
    tagsAr: string[];
  }
> = {
  odoo: {
    nameEn: "Odoo ERP",
    nameAr: "نظام أودو للمؤسسات",
    subtitleEn: "Accounting, Invoicing, Inventory, HR & Operations",
    subtitleAr: "المحاسبة، الفواتير، المخزون، الموارد البشرية والعمليات",
    color: "#a24689",
    accentBg: "from-[#a24689]/20 via-[#a24689]/5 to-transparent",
    badgeEn: "ERP & POS",
    badgeAr: "إدارة المؤسسات",
    tagsEn: ["Invoicing", "POS", "Inventory", "Accounting"],
    tagsAr: ["الفواتير", "نقاط البيع", "المخزون", "المحاسبة"],
  },
  ezee: {
    nameEn: "eZee Hospitality",
    nameAr: "نظام إيزي الفندقي",
    subtitleEn: "Frontdesk PMS, Reservations & Channel Manager",
    subtitleAr: "إدارة الفنادق والغرف، الحجوزات ومدير القنوات",
    color: "#0284c7",
    accentBg: "from-[#0284c7]/20 via-[#0284c7]/5 to-transparent",
    badgeEn: "PMS & Hotel",
    badgeAr: "إدارة الفنادق",
    tagsEn: ["Frontdesk PMS", "Folios", "Rate Plans"],
    tagsAr: ["مكتب الاستقبال", "الحسابات والنزلاء", "خطط الأسعار"],
  },
  ozoo: {
    nameEn: "Ozoo Connector",
    nameAr: "مربط أوزو للربط اللحظي",
    subtitleEn: "Real-time sync middleware connecting eZee & Odoo",
    subtitleAr: "المحول الذكي للربط اللحظي بين نظام إيزي وأودو",
    color: "#f59e0b",
    accentBg: "from-[#f59e0b]/20 via-[#f59e0b]/5 to-transparent",
    badgeEn: "Middleware Sync",
    badgeAr: "الربط اللحظي",
    tagsEn: ["Live Sync", "Middleware", "Webhooks"],
    tagsAr: ["مزامنة لحظية", "الربط البرمجي", "إشعارات الويب"],
  },
};
