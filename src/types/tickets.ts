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
  { id: "swiss_blue_jeddah", label: "SwissBlue Hotel Jeddah" },
  { id: "swiss_blue_jazan", label: "SwissBlue Apartment Hotel Jazan" },
  { id: "swiss_blue_alzahra", label: "SwissBlue Serviced Apartments Alzahra (Jeddah)" },
  { id: "swiss_blue_alsamer", label: "SwissBlue Serviced Apartments Alsamer (Jeddah)" },
  { id: "vinas_riyadh", label: "Vinas Riyadh Serviced Apartments" },
  { id: "tulip_alrawdha", label: "Tulip Alrawdha Serviced Apartments (Riyadh)" },
  { id: "greenwood_factory", label: "GreenWood Factory for Furniture & Decor (Najran)" },
  { id: "national_factory", label: "National Factory for Furniture & Aluminum (Riyadh)" },
  { id: "watan_designs_factory", label: "Watan Designs Furniture Factory (Riyadh)" },
  { id: "other", label: "Other Location / Branch" },
];

export const BRANCH_OPTIONS_AR = [
  { id: "swiss_blue_jeddah", label: "فندق سويس بلو جدة" },
  { id: "swiss_blue_jazan", label: "سويس بلو للشقق الفندقية جازان" },
  { id: "swiss_blue_alzahra", label: "سويس بلو للشقق المخدومة الزهراء (جدة)" },
  { id: "swiss_blue_alsamer", label: "سويس بلو للشقق المخدومة السامر (جدة)" },
  { id: "vinas_riyadh", label: "شقق فيناس المخدومة الرياض" },
  { id: "tulip_alrawdha", label: "شقق توليب الروضة المخدومة (الرياض)" },
  { id: "greenwood_factory", label: "مصنع الأخشاب الخضراء للأثاث والديكورات (نجران)" },
  { id: "national_factory", label: "المصنع الوطني للأثاث والألومنيوم (الرياض)" },
  { id: "watan_designs_factory", label: "مصنع تصاميم الوطن للأثاث (الرياض)" },
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
