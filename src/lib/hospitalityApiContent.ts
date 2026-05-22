// Structured content for the /hospitalityapi dashboard.
// Source: eZee–Odoo Integration Connector — Technical & Operations Manual (v5.1).
// This is a static technical manual rendered as a dashboard; it is intentionally
// not wired through the CMS contentRegistry.
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Briefcase,
  Receipt,
  Network,
  Rocket,
  SlidersHorizontal,
  BookOpen,
  Wrench,
  LifeBuoy,
  Code2,
  ShieldCheck,
  FileText,
} from "lucide-react";

export type Block =
  | { kind: "section"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "text"; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "callout"; tone: "note" | "tip" | "warning" | "important"; text: string }
  | { kind: "code"; label?: string; code: string };

export interface Chapter {
  id: string;
  number: number;
  title: string;
  summary: string;
  icon: LucideIcon;
  blocks: Block[];
}

export const projectMeta = {
  documentVersion: "5.1 — Production Release",
  platform: "Odoo 19 / eZee Absolute PMS",
  scope: "Multi-Property Hotel Group — WD Group (Saudi Arabia)",
  preparedBy: "Dubai in Cairo for Digital Marketing & eCommerce",
};

export const projectStats = [
  { value: "6", label: "Hotel properties — WD Group" },
  { value: "5", label: "Transaction types synced" },
  { value: "Odoo 19", label: "Paired with eZee Absolute PMS" },
  { value: "12", label: "Chapters in the manual" },
];

export const chapters: Chapter[] = [
  {
    id: "executive-overview",
    number: 1,
    title: "Executive Overview",
    summary: "What the connector does, the value it delivers, and how the architecture fits together.",
    icon: LayoutDashboard,
    blocks: [
      { kind: "section", text: "1.1 Purpose of the Connector" },
      {
        kind: "text",
        text: "The eZee–Odoo Integration Connector is a custom Odoo 19 module (`odoo_ezee_pms_integration`) that creates a fully automated, one-directional financial bridge between the eZee Absolute Property Management System (PMS) and Odoo Accounting. It eliminates manual data re-entry between the front-office hotel management system and the enterprise accounting platform, ensuring that every revenue, receipt, payment, journal adjustment, and incidental charge recorded in eZee is accurately and automatically reflected in Odoo.",
      },
      {
        kind: "text",
        text: "Before this connector existed, accounting staff had to manually extract reports from eZee and re-enter them into Odoo — a process prone to transcription errors, delays, and reconciliation gaps. The connector resolves this entirely.",
      },
      { kind: "section", text: "1.2 Business Value & Use Cases" },
      {
        kind: "table",
        headers: ["Business Value", "Description"],
        rows: [
          ["Eliminates manual re-entry", "All PMS transactions auto-post to Odoo within minutes of the scheduled sync."],
          ["Real-time financial visibility", "Hotel managers and finance teams see posted invoices, payments, and balances the same day — no waiting for month-end reconciliation."],
          ["Multi-property support", "A single Odoo instance manages six independent hotel companies under the WD Group umbrella, each with its own chart of accounts, journals, and eZee hotel code."],
          ["ZATCA e-invoicing ready", "Invoices carry all required guest, tax, and folio data to support Saudi ZATCA Phase 2 compliance via the `l10n_sa_edi` module."],
          ["Automated reconciliation", "A scheduled cron job matches outstanding credit notes and payments against open invoices, reducing the AR aging backlog."],
          ["Full audit trail", "Every API call, payload, and response is logged in the Sync Logs screen for full traceability and debugging."],
        ],
      },
      { kind: "section", text: "1.3 System Architecture Overview" },
      {
        kind: "text",
        text: "The connector follows a pull-based integration pattern: Odoo is the master accounting system and eZee is the source-of-truth for hospitality transactions. At scheduled intervals (or on demand), Odoo reaches out to the eZee FAS API, downloads transaction data for a specified date range, transforms it into Odoo accounting entries, and posts them.",
      },
      {
        kind: "table",
        headers: ["eZee Absolute PMS (Source)", "Odoo 19 Accounting (Target)"],
        rows: [
          ["Sales / revenue records", "Customer invoices (`out_invoice` / `out_refund`)"],
          ["Receipts from guests & city ledger", "Inbound payments (`account.payment`)"],
          ["Refunds & general expenses", "Outbound payments (`account.payment`)"],
          ["General journal entries", "Journal entries (`account.move` – entry)"],
          ["Incidental invoices", "Customer invoices + immediate payment registration"],
        ],
      },
      {
        kind: "callout",
        tone: "note",
        text: "The connector is a one-way pull: eZee → Odoo. No data is ever written back to eZee from Odoo.",
      },
    ],
  },
  {
    id: "business-perspective",
    number: 2,
    title: "Business Perspective",
    summary: "Operational workflows, user roles, and real-world hospitality scenarios.",
    icon: Briefcase,
    blocks: [
      { kind: "section", text: "2.1 Operational Workflows Enabled by the Integration" },
      { kind: "subheading", text: "2.1.1 Nightly Automated Sync" },
      {
        kind: "text",
        text: "A scheduled Odoo cron job runs at 10:00 AM daily and syncs the previous day's data for all active hotels. By the time the accounting team arrives in the morning, the prior day's revenue is already posted in Odoo, ready for review and reporting.",
      },
      { kind: "subheading", text: "2.1.2 On-Demand Manual Sync" },
      {
        kind: "text",
        text: "When immediate reconciliation is needed — for example, after a large group checkout or at the end of a fiscal period — users can trigger a manual sync from the eZee Gateway menu. The sync wizard allows selection of specific hotels, a custom date range, and which transaction types to include.",
      },
      { kind: "section", text: "2.2 Impact on Reservations, Accounting, and Reporting" },
      {
        kind: "text",
        text: "Reservations — Each room folio in eZee maps to a customer invoice in Odoo. The guest name, room number, check-in / check-out dates, rate plan, and folio number are all stored on the invoice for full traceability.",
      },
      {
        kind: "text",
        text: "Accounting — Revenue is automatically split by charge category (room charge, F&B, laundry, etc.) and mapped to the correct Odoo income accounts via the Account Mapping table. Taxes (VAT 15%, Municipality Fee) are applied through the Tax Mapping table.",
      },
      {
        kind: "text",
        text: "Reporting — Because all transactions are posted with PMS metadata fields, finance teams can filter Odoo reports by hotel, reservation number, folio, guest, or business source — capabilities not available in eZee's own reports.",
      },
      { kind: "section", text: "2.3 User Roles and Responsibilities" },
      {
        kind: "table",
        headers: ["Role", "Responsibilities", "Access Level"],
        rows: [
          ["Accounting Manager (Admin)", "Configure credentials and mappings, trigger manual syncs, review logs", "Full access to the eZee Gateway menu"],
          ["Accountant (User)", "Review posted invoices and payments, handle reconciliation, investigate sync errors", "Read access to sync logs; read / write on accounting entries"],
          ["Hotel Operations (User)", "Does not interact with the connector directly; works only in eZee", "No Odoo access required"],
          ["IT / Developer (Admin)", "Module updates, server maintenance, troubleshooting API failures", "Odoo.sh / SSH / developer mode"],
        ],
      },
      { kind: "section", text: "2.4 Real-Life Use Cases" },
      { kind: "subheading", text: "Use Case A — Standard Guest Checkout" },
      {
        kind: "text",
        text: "Scenario: a guest checks out of SwissBlue Hotel Jeddah after a 3-night stay. The front desk posts the bill in eZee.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "eZee records the checkout: one sales record with room charges and VAT detail lines.",
          "Next morning, the Odoo cron job pulls the previous day's data.",
          "The connector creates a customer invoice in Odoo under the SwissBlue Jeddah company, with the folio and reservation number stamped on the record.",
          "If the guest paid at checkout, a receipt (inbound payment) is also created and linked to the invoice via automatic reconciliation.",
          "The invoice is automatically posted (confirmed). Finance has nothing to do.",
        ],
      },
      { kind: "subheading", text: "Use Case B — OTA Booking (Booking.com VCC)" },
      {
        kind: "text",
        text: "Scenario: a Booking.com reservation is fulfilled. Payment is received via Virtual Credit Card (VCC).",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "eZee records the receipt under type \"Received From Cityledger\" against a City Ledger AR account.",
          "The connector creates an inbound payment and posts it to the City Ledger receivable account defined in the Account Mapping table.",
          "The subsequent commission debit (if applicable) is posted as a separate journal entry.",
        ],
      },
      { kind: "subheading", text: "Use Case C — Advance Deposit" },
      { kind: "text", text: "Scenario: a guest pays a deposit before arrival." },
      {
        kind: "list",
        ordered: true,
        items: [
          "eZee records an \"Advance Deposit\" receipt.",
          "The connector creates an inbound payment mapped to the \"Advance From Guest\" liability account.",
          "At checkout, when the full invoice is created, the automated reconciliation cron offsets the advance deposit against it.",
        ],
      },
      { kind: "subheading", text: "Use Case D — Refund / Cancellation" },
      { kind: "text", text: "Scenario: a guest cancels and is entitled to a refund." },
      {
        kind: "list",
        ordered: true,
        items: [
          "eZee records a \"Guest Refund\" or \"Advance Deposit Refund\".",
          "The connector creates an outbound payment of type customer, mapped to the appropriate GL account.",
          "If the original invoice was also reversed in eZee, a credit note (`out_refund`) is created in Odoo.",
        ],
      },
    ],
  },
  {
    id: "financial-flow",
    number: 3,
    title: "Financial & Accounting Flow",
    summary: "How revenue, payments, mappings, and reconciliation are handled.",
    icon: Receipt,
    blocks: [
      { kind: "section", text: "3.1 Revenue Recognition Logic" },
      {
        kind: "text",
        text: "Revenue is recognized on the invoice date returned by eZee (the `record_date` field of the sales record). For checkout invoices this is the checkout date; for ongoing folios it is the date the revenue charge was posted in eZee.",
      },
      {
        kind: "text",
        text: "Each invoice detail line maps to a charge header in eZee. The connector looks up the Account Mapping table by `pms_account_header_id`. If a mapping is found, the corresponding Odoo income account is used. If no mapping exists, the fallback is:",
      },
      {
        kind: "list",
        items: [
          "The Default Account of the hotel's Fallback Journal (configured on the PMS Credentials form), or",
          "The first income-type account found in the company's chart of accounts.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        text: "Best practice: ensure all eZee charge headers are mapped before going live. Run \"Pull Master Data\" to auto-populate the Account Mapping table, then assign an Odoo account to each row.",
      },
      { kind: "section", text: "3.2 Payment Handling" },
      {
        kind: "table",
        headers: ["eZee Type", "Odoo Payment Type", "Journal", "Account Used"],
        rows: [
          ["Received From Guest", "Inbound (customer)", "Cash or Bank", "Guest Ledger receivable"],
          ["Advance Deposit", "Inbound (customer)", "Cash or Bank", "Advance From Guest liability"],
          ["Received From Cityledger", "Inbound (customer)", "Bank", "City Ledger receivable"],
          ["Guest Refund", "Outbound (customer)", "Cash or Bank", "Guest Ledger receivable"],
          ["Advance Deposit Refund", "Outbound (customer)", "Cash or Bank", "Advance From Guest liability"],
          ["Cityledger Refund", "Outbound (customer)", "Bank", "City Ledger receivable"],
          ["General Expense", "Outbound (customer)", "Cash or Bank", "Paid Out account"],
        ],
      },
      {
        kind: "text",
        text: "Journal selection logic — the connector checks whether the eZee payment method name contains \"CASH\". If so, it picks the Cash journal; otherwise it picks the Bank journal of the hotel's company. This logic can be extended — see Chapter 6.",
      },
      { kind: "section", text: "3.3 Mapping Between eZee and Odoo Financial Entities" },
      { kind: "subheading", text: "3.3.1 Account Mapping (pms.account.mapping)" },
      {
        kind: "text",
        text: "This table is the heart of revenue mapping. It connects eZee's charge header IDs (`headerid` in the config API) to Odoo's income accounts.",
      },
      {
        kind: "table",
        headers: ["Field", "Source", "Purpose"],
        rows: [
          ["`pms_account_header_id`", "eZee `headerid`", "Unique numeric ID from eZee config data — the primary lookup key"],
          ["`pms_account_header_name`", "eZee header name", "Human-readable name (Room Charge, F&B, City Ledger, etc.) — also used for special AR accounts"],
          ["`account_id`", "Odoo account", "Target income / liability / receivable account in Odoo"],
          ["`account_group_id`", "Odoo account group", "Optional grouping for reporting"],
        ],
      },
      {
        kind: "text",
        text: "Special header names used for AR routing: \"Guest Ledger\" → guest receivable account; \"City Ledger\" → corporate / OTA receivable account; \"Advance From Guest\" → advance deposit liability; \"Paid Out\" → general expense account.",
      },
      { kind: "subheading", text: "3.3.2 Tax Mapping (pms.tax.mapping)" },
      {
        kind: "text",
        text: "Maps eZee tax identifiers to Odoo tax objects. The connector looks up by `pms_tax_id` first, then falls back to matching by `pms_tax_name` against Odoo's `account.tax` records.",
      },
      { kind: "subheading", text: "3.3.3 Payment Method Mapping (pms.payment.mapping)" },
      {
        kind: "text",
        text: "Available but currently superseded by the Cash / Bank auto-detection logic. Useful for complex scenarios where specific payment methods (e.g., specific card types) should route to dedicated journals.",
      },
      { kind: "section", text: "3.4 Reconciliation Workflows" },
      { kind: "subheading", text: "3.4.1 Automatic Reconciliation Cron" },
      {
        kind: "text",
        text: "A second cron job (Scheduled Reconcile) runs daily at 12:00 noon. It finds all posted, unpaid or partially-paid customer invoices and applies any outstanding credits for the same partner — automatically simulating Odoo's \"Apply Outstanding Credits\" button.",
      },
      {
        kind: "text",
        text: "This handles the common hospitality scenario where a payment (receipt) arrives in eZee before or independently of the invoice, creating a credit balance on the partner account that needs to be offset against the invoice.",
      },
      { kind: "subheading", text: "3.4.2 Manual Reconciliation" },
      {
        kind: "text",
        text: "For complex cases not handled by the cron, accountants can open any invoice in Odoo and use the standard \"Outstanding Credits\" widget to manually select the matching payment.",
      },
      { kind: "section", text: "3.5 Edge Cases" },
      { kind: "subheading", text: "3.5.1 Negative Invoices (Refund Detection)" },
      {
        kind: "text",
        text: "The connector checks the `total_amount` of the eZee sales record. If it is negative, the `move_type` is set to `out_refund` (credit note) instead of `out_invoice`. The invoice lines use absolute values — Odoo's credit note logic handles the sign reversal.",
      },
      { kind: "subheading", text: "3.5.2 Duplicate Prevention" },
      {
        kind: "text",
        text: "Before creating any record, the connector searches for an existing record with the same `pms_tran_id` + `pms_hotel_id` + `move_type` / `payment_type` combination. If found, the record is skipped. This makes the sync fully idempotent — it can be re-run for the same dates without creating duplicates.",
      },
      {
        kind: "callout",
        tone: "note",
        text: "A database-level SQL constraint also enforces uniqueness on (`pms_tran_id`, `pms_hotel_id`, `move_type`) and will raise an error if the application-level check somehow fails.",
      },
      { kind: "subheading", text: "3.5.3 No-Show / Cancellation" },
      {
        kind: "text",
        text: "If a no-show invoice exists in eZee with a non-refundable charge, it appears as a standard sales record and is processed as a normal invoice, with the guest as the debtor. If the property later waives the charge, a credit note must be issued — either in eZee (which syncs as a negative amount) or directly in Odoo.",
      },
      { kind: "subheading", text: "3.5.4 Municipality Fee (2.5%)" },
      {
        kind: "text",
        text: "The eZee config API may return the Municipality Fee as a separate tax line in the detail records. Ensure it is mapped in the Tax Mapping table to the correct Odoo tax object — typically a 2.5% sales tax with \"include in base\" = True, applying after the 15% VAT.",
      },
    ],
  },
  {
    id: "technical-architecture",
    number: 4,
    title: "Technical Architecture",
    summary: "Module structure, data flow, API endpoints, and Odoo data models.",
    icon: Network,
    blocks: [
      { kind: "section", text: "4.1 Module File Structure" },
      {
        kind: "table",
        headers: ["File / Directory", "Purpose"],
        rows: [
          ["`__manifest__.py`", "Module metadata, dependencies (base, account, analytic), data file declarations"],
          ["`__init__.py`", "Package entry point — imports models, wizards, services"],
          ["`models/pms_credentials.py`", "Hotel connection profile: credentials, journal config, test / pull actions"],
          ["`models/pms_mapping.py`", "Three mapping models: account, tax, payment method"],
          ["`models/pms_sync_log.py`", "Sync audit log with request / response payloads"],
          ["`models/account_move.py`", "Extends `account.move` and `account.payment` with PMS / eZee fields; reconciliation cron"],
          ["`models/company.py`", "Adds a `hotel_id` field to `res.company` for property association"],
          ["`services/ezee_api_service.py`", "HTTP client for the eZee FAS API: login, fetch_data"],
          ["`wizards/pms_sync_wizard.py`", "Core sync orchestrator: processes all five transaction types"],
          ["`data/ir_cron_data.xml`", "Two scheduled jobs: daily sync + daily reconciliation"],
          ["`data/demo_data.xml`", "Pre-configured hotel credentials for all WD Group properties"],
          ["`security/ir.model.access.csv`", "Access rights — all PMS models restricted to `account.group_account_manager`"],
          ["`i18n/ar_001.po`", "Full Arabic translation of all UI labels and field strings"],
          ["`views/`", "XML view definitions for credentials, mappings, logs, invoices, payments, menus"],
        ],
      },
      { kind: "section", text: "4.2 Data Flow — Step by Step" },
      {
        kind: "list",
        ordered: true,
        items: [
          "A cron trigger (or the manual wizard) invokes `action_scheduled_sync()` on `pms.credentials`.",
          "For each hotel, `PMSSyncWizard.action_sync()` is called with the date range.",
          "`eZeeAPIService.login()` runs if no `auth_code` exists. On success, `auth_code`, `working_date`, and `currency_code` are persisted on the credentials record.",
          "`eZeeAPIService.fetch_data(api_type, from_date, to_date)` sends a POST request to the eZee FAS API with the `auth_code` and `requestfor` parameter.",
          "The raw JSON response is logged to `pms.sync.log` (both the request payload and the full response text).",
          "The wizard's `_process_*` method iterates the response data array, checks for duplicates, resolves partners, maps accounts and taxes, builds Odoo record values, then creates and posts the record.",
          "The nightly reconciliation cron (`cron_apply_outstanding_credits`) runs at noon to offset any matching credit balances against open invoices.",
        ],
      },
      { kind: "section", text: "4.3 API Endpoints Used" },
      {
        kind: "table",
        headers: ["Endpoint", "Method", "Purpose"],
        rows: [
          ["`live.ipms247.com/.../service.quickbook`", "POST (XML)", "`FAS_Login_User` — authenticate and obtain `auth_code`"],
          ["`live.ipms247.com/.../service.PMSAccountAPI`", "POST (JSON)", "All five data-pull operations (the `requestfor` parameter selects the type)"],
        ],
      },
      { kind: "subheading", text: "4.3.1 requestfor Values" },
      {
        kind: "table",
        headers: ["requestfor", "Data Returned", "Odoo Processor"],
        rows: [
          ["`XERO_GET_TRANSACTION_DATA`", "Sales / checkout invoices", "`_process_sales()`"],
          ["`XERO_GET_RECEIPT_DATA`", "Inbound receipts from guests and city ledger", "`_process_receipts()`"],
          ["`XERO_GET_PAYMENT_DATA`", "Outbound payments / refunds / expenses", "`_process_payments()`"],
          ["`XERO_GENERAL_JOURNAL_INFO`", "Debt / folio transfers, city ledger transfers", "`_process_journals()`"],
          ["`XERO_INCIDENTAL_INVOICE`", "Non-room charges (F&B, laundry, etc.) with immediate payment", "`_process_incidentals()`"],
          ["`XERO_GET_CONFIG_DATA`", "Charge headers, tax types (for mapping population)", "`_process_config_data()`"],
        ],
      },
      { kind: "section", text: "4.4 Authentication & Security" },
      {
        kind: "list",
        items: [
          "Authentication uses a per-hotel session token (`auth_code`) obtained via an XML login request. Tokens are stored in Odoo's database in the `pms.credentials` model.",
          "Passwords are stored in Odoo's password field type (obfuscated in the UI). Use Odoo.sh environment encryption and restrict DB access accordingly.",
          "All API calls use HTTPS to eZee's live production endpoint.",
          "No eZee credentials are ever logged — the request payload logged to `pms.sync.log` contains only the `auth_code` and `hotel_code`, never the username or password.",
          "Odoo access rights: all PMS models require the Account Manager group. Non-accounting staff cannot see or trigger sync operations.",
        ],
      },
      { kind: "section", text: "4.5 Data Models and Key Fields" },
      { kind: "subheading", text: "Extended: account.move (Customer Invoices & Journal Entries)" },
      {
        kind: "table",
        headers: ["Field", "Type", "Description"],
        rows: [
          ["`pms_tran_id`", "Char", "Unique transaction ID from eZee (`record_id` / `tranId`)"],
          ["`pms_hotel_id`", "Many2one → pms.credentials", "Links the record to the originating hotel"],
          ["`pms_reference`", "Char", "Reservation number (primary guest reference)"],
          ["`ezee_folio_number`", "Char", "eZee folio number"],
          ["`ezee_guest_name`", "Char", "Guest name as recorded in eZee"],
          ["`ezee_checkin_date` / `checkout_date`", "Date", "Reservation dates — used to compute number of nights"],
          ["`ezee_number_of_nights`", "Integer (computed)", "Checkout minus check-in, in days"],
          ["`bussiness_source_name`", "Char", "Business source / OTA channel name"],
        ],
      },
    ],
  },
  {
    id: "installation",
    number: 5,
    title: "Installation & Deployment",
    summary: "Environment requirements and the full step-by-step deployment guide.",
    icon: Rocket,
    blocks: [
      { kind: "section", text: "5.1 Environment Requirements" },
      {
        kind: "table",
        headers: ["Requirement", "Detail"],
        rows: [
          ["Odoo version", "Odoo 19 (Enterprise or Community)"],
          ["Hosting", "Odoo.sh (recommended) or self-hosted with outbound HTTPS access to `live.ipms247.com`"],
          ["Python dependencies", "`requests`, `json`, `xml.etree.ElementTree` — all included in the standard Odoo / Python distribution"],
          ["Required Odoo modules", "`base`, `account`, `analytic` — must be installed before this module"],
          ["Firewall / network", "Outbound HTTPS (port 443) to `live.ipms247.com` must be open"],
          ["eZee license", "The hotel must have an active eZee Absolute PMS subscription with FAS API access enabled"],
        ],
      },
      { kind: "section", text: "5.2 Step-by-Step Setup Guide" },
      { kind: "subheading", text: "Step 1 — Deploy the Module" },
      {
        kind: "list",
        items: [
          "Copy the `odoo_ezee_pms_integration` directory to your Odoo addons path.",
          "On Odoo.sh: commit and push to the relevant branch. The module appears in the module list after the build completes.",
          "On self-hosted: restart the Odoo service and update the addons list.",
        ],
      },
      { kind: "subheading", text: "Step 2 — Install the Module" },
      {
        kind: "list",
        items: [
          "Log in to Odoo with an Administrator account.",
          "Navigate to Apps → search for \"eZee Absolute PMS Integration\".",
          "Click Install. The module installs along with its dependencies.",
          "After installation, the eZee Gateway menu appears under the Accounting application.",
        ],
      },
      { kind: "subheading", text: "Step 3 — Configure Companies" },
      {
        kind: "list",
        items: [
          "For each hotel property, ensure a corresponding Odoo company exists.",
          "Navigate to Settings → Companies and open each company.",
          "On the company form, assign the correct Hotel (`pms.credentials` record) in the Hotel field — this links the company to the hotel for all sync operations.",
        ],
      },
      { kind: "subheading", text: "Step 4 — Configure PMS Credentials" },
      {
        kind: "list",
        items: [
          "Navigate to Accounting → eZee Gateway → PMS Configuration.",
          "Open each hotel credential record and verify: Hotel Name, Hotel Code, Username, Password.",
          "Set the Fallback Journal (typically the sales journal for that company).",
          "Set the Debt Transfer Journal (used for city ledger transfer journal entries — typically a General Journal).",
          "Click Test Connection. A success notification confirms the `auth_code` was obtained and saved.",
        ],
      },
      { kind: "subheading", text: "Step 5 — Pull Master Data & Configure Mappings" },
      {
        kind: "list",
        items: [
          "From the PMS Configuration form, click Pull Master Data. This calls the `XERO_GET_CONFIG_DATA` API and populates the Account Mapping and Tax Mapping tables.",
          "Navigate to eZee Gateway → Account Mapping. For each row, select the corresponding Odoo Account (and optionally an Account Group).",
          "Map the critical AR header names: Guest Ledger → Guest Ledger receivable; City Ledger → City Ledger receivable; Advance From Guest → Advance Deposits liability; Paid Out → Paid Out / miscellaneous expense.",
          "Navigate to eZee Gateway → Tax Mapping and assign Odoo tax objects to each PMS tax (e.g., VAT 15%, Municipality Fee 2.5%).",
        ],
      },
      { kind: "subheading", text: "Step 6 — Validate & Test" },
      {
        kind: "list",
        items: [
          "Trigger a Manual Sync from eZee Gateway → Manual Sync.",
          "Select one hotel, set a short past date range (e.g., 2 days), and enable all sync options.",
          "Click Start Sync.",
          "Navigate to eZee Gateway → Sync Logs and verify all log entries show status = Success.",
          "Navigate to Accounting → Customers → Invoices and confirm invoices were created with eZee Info populated.",
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        text: "Run the first sync on a test / staging environment before going live on production. Verify that account mappings produce the expected GL postings.",
      },
      { kind: "section", text: "5.3 Cron Job Verification" },
      {
        kind: "text",
        text: "Navigate to Settings → Technical → Automation → Scheduled Actions (with developer mode enabled). Verify that two active crons exist:",
      },
      {
        kind: "list",
        items: [
          "PMS: Scheduled Sync (All Hotels) — runs daily at 10:00 AM.",
          "Scheduled Reconcile — runs daily at 12:00 PM.",
        ],
      },
      { kind: "text", text: "Adjust the `nextcall` dates and times to match your preferred schedule." },
    ],
  },
  {
    id: "configuration",
    number: 6,
    title: "Configuration & Customization",
    summary: "Tuning module settings, extending logic, and onboarding new hotels.",
    icon: SlidersHorizontal,
    blocks: [
      { kind: "section", text: "6.1 Module Configuration Inside Odoo" },
      { kind: "subheading", text: "PMS Credentials — Key Settings" },
      {
        kind: "table",
        headers: ["Setting", "Effect"],
        rows: [
          ["Fallback Journal", "Used when no specific journal is found for a transaction type. Must be a journal of the hotel's company."],
          ["Debt Transfer Journal", "Used specifically for the \"Cityledger Transfer\" journal type — typically a General Journal with a meaningful name like \"City Ledger Transfers\"."],
          ["Analytic Account", "If set, all invoice and journal entry lines for this hotel carry an analytic distribution of 100% to this account — enabling per-hotel profitability reporting."],
          ["Active toggle", "Inactive hotels are excluded from the scheduled sync."],
        ],
      },
      { kind: "section", text: "6.2 Extending Payment Method Logic" },
      {
        kind: "text",
        text: "The current journal selection for payments is based on whether the eZee payment method name contains \"CASH\". To support additional methods (e.g., route \"VISA\" to a specific journal), modify the `_process_receipts()` and `_process_payments()` methods in `wizards/pms_sync_wizard.py`:",
      },
      {
        kind: "code",
        label: "pms_sync_wizard.py",
        code: `# Example: route VISA payments to a dedicated Visa journal
if "VISA" in str(record.get("reference14")).upper():
    journal_id = self.env["account.journal"].sudo().search(
        [("name", "ilike", "Visa"), ("company_id", "=", company.id)],
        limit=1,
    ) or journal_id`,
      },
      {
        kind: "callout",
        tone: "tip",
        text: "Alternatively, fully activate the `pms.payment.mapping` model to drive journal selection from a configurable table rather than from code.",
      },
      { kind: "section", text: "6.3 Adding a New Hotel Property" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Create a new company in Odoo Settings → Companies.",
          "Set up the chart of accounts for the new company (or copy it from an existing hotel company).",
          "Create a new PMS Credentials record with the new hotel's eZee code, username, and password.",
          "Click Test Connection, then Pull Master Data.",
          "Map all accounts and taxes.",
          "Go to Settings → Companies → the new company → set the Hotel field to the new credentials record.",
          "The cron automatically includes the new hotel from its next run.",
        ],
      },
      { kind: "section", text: "6.4 Disabling a Transaction Type" },
      {
        kind: "text",
        text: "In the Manual Sync wizard, simply uncheck the relevant option. For the scheduled cron, `action_scheduled_sync()` always syncs all five types — to disable a type permanently from the cron, modify `action_scheduled_sync()` in `pms_credentials.py` to pass sync flags to the wizard.",
      },
    ],
  },
  {
    id: "user-guide",
    number: 7,
    title: "User Guide (Operational Manual)",
    summary: "The day-to-day operational manual for the accounting team.",
    icon: BookOpen,
    blocks: [
      { kind: "section", text: "7.1 Daily Workflow for the Accounting Team" },
      { kind: "subheading", text: "Morning Check (10:30 AM — after the sync cron runs)" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Navigate to Accounting → eZee Gateway → Sync Logs.",
          "Filter by today's date and verify all entries for all hotels show Status = Success.",
          "If any show Failed or Partial, see Chapter 8 for troubleshooting.",
          "Navigate to Accounting → Customers → Invoices, filter by today's date, and review the new invoices from eZee.",
          "Navigate to Accounting → Customers → Payments and review the new receipts.",
        ],
      },
      { kind: "subheading", text: "Reconciliation Check (12:30 PM — after the reconciliation cron)" },
      {
        kind: "list",
        ordered: true,
        items: [
          "In Accounting → Customers → Invoices, filter for invoices that are \"In Payment\" or still \"Not Paid\".",
          "For invoices where a payment was received, check that `payment_state` has moved to \"In Payment\" or \"Paid\".",
          "For any that remain outstanding despite a received payment, manually apply the outstanding credit from the invoice form.",
        ],
      },
      { kind: "section", text: "7.2 Triggering a Manual Sync" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Go to Accounting → eZee Gateway → Manual Sync.",
          "In the Hotels field, select one or more hotels.",
          "Set From Date and To Date to the required range.",
          "Check or uncheck the transaction types you want to sync.",
          "Click Start Sync.",
          "A notification appears: \"Sync Complete\" (green) or \"Sync Completed with Errors\" (red).",
          "Review the Sync Logs for details.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        text: "For historical data loads (onboarding a new hotel), use the manual sync with a broad date range — sync in monthly chunks to avoid timeout issues.",
      },
      { kind: "section", text: "7.3 Reviewing a Synced Invoice" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Open any customer invoice in Odoo.",
          "The header shows Hotel, Transaction ID, Reservation Number, and Folio Number — sourced from eZee.",
          "Click the eZee Info tab to see full guest details, room information, rate plan, marketing data, and address.",
          "Invoice lines show the revenue categories and amounts mapped from eZee charge headers.",
          "The Tax section reflects the mapped Odoo taxes (VAT 15%, Municipality Fee, etc.).",
        ],
      },
      { kind: "section", text: "7.4 Understanding the Accounting Summary View" },
      {
        kind: "text",
        text: "Navigate to Accounting → eZee Gateway → Accounting Summary. This view shows all journal entry lines grouped by date and account — a quick overview of daily hotel revenue and cash movements. Use the Date filter and the Group By controls to customize the view.",
      },
      { kind: "section", text: "7.5 Error Handling for Users" },
      {
        kind: "table",
        headers: ["Notification Message", "What to Do"],
        rows: [
          ["Sync Completed with Errors", "Open Sync Logs and look for failed entries. Click the failed log record to see the error message. Contact IT if the error is technical."],
          ["Connection Failed", "The eZee API is unreachable or the credentials are wrong. Check internet access, re-enter the password, and click Test Connection again."],
          ["No sales journal found", "The hotel's company is missing a Sales journal. Go to Accounting → Configuration → Journals and create one of type \"Sales\" for that company."],
          ["No payment method found", "The Cash or Bank journal has no payment methods configured. Open the journal settings and ensure at least one inbound / outbound payment method is active."],
        ],
      },
    ],
  },
  {
    id: "troubleshooting",
    number: 8,
    title: "Error Handling & Troubleshooting",
    summary: "Diagnosing, debugging, and recovering from sync issues.",
    icon: Wrench,
    blocks: [
      { kind: "section", text: "8.1 Common Issues and Root Causes" },
      {
        kind: "table",
        headers: ["Symptom", "Root Cause", "Resolution"],
        rows: [
          ["Auth code invalid after some days", "eZee session tokens expire periodically", "Click Test Connection on the PMS Credentials form to refresh the `auth_code`"],
          ["Invoice line has no account", "Account Mapping not set for that eZee header ID", "Open Account Mapping, find the row with the missing account, and assign an Odoo account"],
          ["Tax not applied on invoice", "Tax Mapping not set or eZee tax ID mismatch", "Open Tax Mapping for the hotel and verify `pms_tax_id` matches the value in the eZee config response"],
          ["Duplicate key error on constraint", "Concurrent sync runs, or a retry after a partial failure", "The application-level duplicate check should prevent this; if it occurs, check whether two cron runs overlapped — the second can be ignored"],
          ["Partner receivable account mismatch", "The partner was created before the mapping was configured", "Re-sync: the connector updates the partner receivable account on each run"],
          ["HTTP 500 from the eZee API", "An eZee server-side error — usually temporary", "Wait 15 minutes and retry the manual sync. If it persists, contact eZee support"],
          ["Sync log shows an empty response", "No data for the requested date range", "Normal — no action required. Verify the dates match a period with actual hotel activity"],
        ],
      },
      { kind: "section", text: "8.2 Logs and Debugging" },
      { kind: "subheading", text: "8.2.1 Sync Logs (UI)" },
      {
        kind: "text",
        text: "Every API call is logged at Accounting → eZee Gateway → Sync Logs. Each record shows the hotel, API type, date range, status, full request JSON, and full response JSON. This is the first place to look when a sync fails.",
      },
      { kind: "subheading", text: "8.2.2 Odoo Server Logs" },
      {
        kind: "text",
        text: "For deeper debugging, check the Odoo server logs. The module logs under the name of each file (e.g., `odoo.addons.odoo_ezee_pms_integration.services.ezee_api_service`). Look for lines containing \"eZee\" to find connection and fetch exceptions.",
      },
      {
        kind: "list",
        items: [
          "On Odoo.sh: navigate to the branch → Logs → download or stream the most recent log file.",
          "Self-hosted: check `/var/log/odoo/odoo.log` or the systemd journal.",
        ],
      },
      { kind: "subheading", text: "8.2.3 Enabling Debug Mode in Odoo" },
      {
        kind: "list",
        items: [
          "Append `?debug=1` to any Odoo URL, or go to Settings → Developer Tools → Activate developer mode.",
          "In debug mode, the Scheduled Actions menu is available under Settings → Technical → Automation.",
          "You can manually trigger a cron there by opening the record and clicking Run Manually.",
        ],
      },
      { kind: "section", text: "8.3 Recovery Procedures" },
      { kind: "subheading", text: "Re-syncing After a Failure" },
      {
        kind: "text",
        text: "Because the sync is fully idempotent (duplicate records are skipped), you can safely re-run a manual sync for any date range. Records that already exist are skipped; only missing records are created.",
      },
      { kind: "subheading", text: "Fixing a Wrong Account Assignment" },
      { kind: "text", text: "If invoices were posted with the wrong accounts due to missing mappings:" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Reset the affected invoices to draft (`button_draft`).",
          "Correct the account mapping.",
          "Delete the wrong invoice lines and re-add them, or simply delete the invoice and re-sync.",
        ],
      },
      {
        kind: "callout",
        tone: "important",
        text: "Do not reset to draft any invoice that has already been sent to a customer or submitted for ZATCA e-invoicing. Create a credit note instead.",
      },
      { kind: "section", text: "8.4 Monitoring Recommendations" },
      {
        kind: "list",
        items: [
          "Set up an Odoo activity or email notification to alert the accounting manager when a sync log entry has status = Failed.",
          "Review the sync logs weekly as part of the month-end close checklist.",
          "Monitor the eZee `working_date` field on each credentials record — if it is stale (not updating to today's date after a sync), the `auth_code` may have expired.",
        ],
      },
    ],
  },
  {
    id: "maintenance",
    number: 9,
    title: "Maintenance & Support",
    summary: "Routine maintenance, performance, backups, and version upgrades.",
    icon: LifeBuoy,
    blocks: [
      { kind: "section", text: "9.1 Routine Maintenance Tasks" },
      {
        kind: "table",
        headers: ["Frequency", "Task", "How"],
        rows: [
          ["Daily", "Review sync logs", "Check that all hotel logs show Success for yesterday's date"],
          ["Weekly", "Check cron health", "Settings → Technical → Scheduled Actions → verify `nextcall` is updating"],
          ["Monthly", "Refresh auth tokens", "Open each PMS Credentials record → Test Connection"],
          ["Monthly", "Archive old sync logs", "Delete or archive sync log records older than 90 days to maintain DB performance"],
          ["Per eZee update", "Re-pull master data", "If eZee adds new charge categories, run Pull Master Data and map the new rows"],
        ],
      },
      { kind: "section", text: "9.2 Performance Optimization" },
      {
        kind: "list",
        items: [
          "The `pms_tran_id` and `pms_hotel_id` fields are indexed at the database level, ensuring fast duplicate checks even with hundreds of thousands of records.",
          "The reconciliation cron processes invoices in batches. If performance degrades as invoice volume grows, add a date filter to process only recent invoices.",
          "Sync large historical date ranges in weekly chunks (not months at once) to avoid HTTP timeouts on the eZee API.",
        ],
      },
      { kind: "section", text: "9.3 Backup and Data Integrity" },
      {
        kind: "list",
        items: [
          "Odoo.sh: automated daily backups are included in the subscription. Verify backup status in the Odoo.sh dashboard.",
          "Self-hosted: implement PostgreSQL `pg_dump` backups at least once daily.",
          "The `pms_tran_id` uniqueness constraint is the primary data-integrity guard. Do not disable it.",
          "Before a major Odoo upgrade, export the `pms.account.mapping`, `pms.tax.mapping`, and `pms.credentials` records to a spreadsheet as a manual backup.",
        ],
      },
      { kind: "section", text: "9.4 Version Upgrades" },
      {
        kind: "list",
        items: [
          "Odoo version upgrades (e.g., 19 → 20): the module will require code review and testing. The eZee API endpoints and field references are unlikely to change, but Odoo ORM changes may affect model inheritance and view syntax.",
          "eZee API changes: monitor the eZee release notes. The `requestfor` values and response field names (`reference1`, `reference2`, etc.) are the most likely to change.",
          "Python dependency updates: the module uses only standard-library modules (`requests`, `json`, `xml`), maintained by the Odoo / Python ecosystem automatically.",
        ],
      },
    ],
  },
  {
    id: "development",
    number: 10,
    title: "Development Guide",
    summary: "Key classes, methods, field references, and the testing strategy.",
    icon: Code2,
    blocks: [
      { kind: "section", text: "10.1 Key Classes and Methods" },
      { kind: "subheading", text: "eZeeAPIService (services/ezee_api_service.py)" },
      {
        kind: "table",
        headers: ["Method", "Description"],
        rows: [
          ["`__init__(credentials)`", "Initializes with a `pms.credentials` recordset and sets the base URLs."],
          ["`login()`", "Sends the XML login request. On success, persists `auth_code`, `working_date`, and `currency_code` to the credentials record. Returns (bool, message)."],
          ["`fetch_data(api_type, from_date, to_date)`", "Builds the JSON payload, posts to PMSAccountAPI, logs to `pms.sync.log`, and returns parsed JSON or None."],
        ],
      },
      { kind: "subheading", text: "PMSSyncWizard (wizards/pms_sync_wizard.py) — Core Processing Methods" },
      {
        kind: "table",
        headers: ["Method", "Description"],
        rows: [
          ["`action_sync()`", "Orchestrator: iterates hotels, logs in, and calls each `_process_*` method based on the wizard flags."],
          ["`_process_sales(hotel, data)`", "Processes `XERO_GET_TRANSACTION_DATA`: creates `out_invoice` or `out_refund` with line items, taxes, and guest metadata."],
          ["`_process_receipts(hotel, data)`", "Processes `XERO_GET_RECEIPT_DATA`: creates an inbound `account.payment`, posts it, and adjusts the credit account per mapping."],
          ["`_process_payments(hotel, data)`", "Processes `XERO_GET_PAYMENT_DATA`: creates an outbound `account.payment`, posts it, and adjusts the debit account per mapping."],
          ["`_process_journals(hotel, data)`", "Processes `XERO_GENERAL_JOURNAL_INFO`: creates an `account.move` of type entry with Dr / Cr lines."],
          ["`_process_incidentals(hotel, data)`", "Processes `XERO_INCIDENTAL_INVOICE`: creates an invoice and immediately registers full payment."],
          ["`_get_or_create_partner(record, hotel)`", "Resolves or creates a `res.partner`. Handles the company / person hierarchy for corporate guests."],
          ["`_parse_ezee_amount(value)`", "Robust float parser: handles None, int, float, and comma-formatted strings."],
          ["`_parse_ezee_date(date_str)`", "Tries YYYY-MM-DD then DD/MM/YYYY formats. Returns a Python date or False."],
        ],
      },
      { kind: "section", text: "10.2 How to Add a New Transaction Type" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Add the new eZee `requestfor` value to the `request_for_map` dictionary in `eZeeAPIService.fetch_data()`.",
          "Add a new `api_type` selection option in `pms_sync_log.py`.",
          "Add a `sync_newtype` Boolean field to `PMSSyncWizard`.",
          "Add the condition and call in `PMSSyncWizard.action_sync()`.",
          "Implement `_process_newtype(hotel, data)`, following the pattern of the existing methods.",
          "Add the field to the wizard view XML.",
        ],
      },
      { kind: "section", text: "10.3 eZee API Response Field Reference" },
      {
        kind: "text",
        text: "The eZee FAS API uses numbered reference fields (`reference1` through `reference27`+) rather than named fields. The mapping for sales records is:",
      },
      {
        kind: "table",
        headers: ["eZee Field", "Maps To", "Description"],
        rows: [
          ["`record_id`", "`pms_tran_id`", "Unique transaction identifier"],
          ["`record_date`", "`invoice_date`", "Date to post the invoice"],
          ["`reference1`", "`ezee_checkin_date`", "Check-in date (DD/MM/YYYY)"],
          ["`reference2`", "`ezee_checkout_date`", "Check-out date (DD/MM/YYYY)"],
          ["`reference3`", "`pms_reference`", "Reservation number"],
          ["`reference4`", "`ezee_folio_number`", "Folio number"],
          ["`reference5`", "`ezee_guest_name`", "Guest name"],
          ["`reference6`", "`ezee_rate_plan`", "Rate plan code"],
          ["`reference7`", "`ezee_source`", "Business source / OTA name"],
          ["`reference8`", "`ezee_bill_no`", "Bill number"],
          ["`reference9`", "`ezee_bill_name`", "Bill-to name"],
          ["`reference10`", "`bussiness_source_name`", "Business source name / OTA voucher"],
          ["`reference13`", "`ezee_room_number`", "Room number"],
          ["`reference14`", "`ezee_type`", "Room type / payment method (context-dependent)"],
          ["`reference17`", "`ezee_company_tax_id`", "Identity card type (corporate vs. individual guest)"],
          ["`reference19`", "`ezee_email`", "Guest email address"],
          ["`reference21`", "`ezee_address_line2`", "Phone number"],
          ["`reference22`", "`ezee_address`", "Address (composite)"],
          ["`reference23`–`25`", "`ezee_address1/2/3`", "Address lines 1–3"],
          ["`reference26`", "`ezee_country`", "Country"],
        ],
      },
      { kind: "section", text: "10.4 Testing Strategy" },
      { kind: "subheading", text: "Unit Testing" },
      {
        kind: "list",
        items: [
          "Test `_parse_ezee_amount()` with edge cases: None, 0, \"1,234.56\", \"-500\", float, int.",
          "Test `_parse_ezee_date()` with both date formats and invalid strings.",
          "Test `_get_or_create_partner()` with company vs. individual guest scenarios.",
        ],
      },
      { kind: "subheading", text: "Integration Testing" },
      {
        kind: "list",
        items: [
          "Use the Manual Sync wizard on a staging Odoo instance pointed at real eZee credentials.",
          "Verify account postings against a known eZee daily report for the same date range.",
          "Test idempotency by running the same sync twice and confirming no duplicate records are created.",
          "Test the reconciliation cron by creating an invoice and a matching payment for the same partner, then running the cron manually.",
        ],
      },
    ],
  },
  {
    id: "security-compliance",
    number: 11,
    title: "Security & Compliance",
    summary: "Data protection, API security, access control, and ZATCA compliance.",
    icon: ShieldCheck,
    blocks: [
      { kind: "section", text: "11.1 Data Protection Practices" },
      {
        kind: "list",
        items: [
          "eZee credentials (username, password) are stored in the Odoo database. Access to the `pms.credentials` model requires the Account Manager role.",
          "Guest personal data (name, email, address, phone) synced from eZee is stored as Odoo partner fields, subject to Odoo's standard data-privacy controls.",
          "Sync log payloads contain API responses including guest data. Restrict access to the Sync Logs model to the Account Manager group (as configured in `ir.model.access.csv`).",
          "Do not export or share sync log records externally without first reviewing them for personal data.",
        ],
      },
      { kind: "section", text: "11.2 API Security" },
      {
        kind: "list",
        items: [
          "All communication with eZee uses HTTPS (TLS). The connector does not support or fall back to plain HTTP.",
          "The `auth_code` token is a session token, not a permanent key. It is refreshed on each login call.",
          "Credentials are never included in log payloads — only `auth_code` and `hotel_code` appear in request logs.",
          "For production deployments, the Odoo database should be encrypted at rest (Odoo.sh provides this by default).",
        ],
      },
      { kind: "section", text: "11.3 Access Control & Permissions" },
      {
        kind: "table",
        headers: ["Model", "Allowed Group", "Notes"],
        rows: [
          ["`pms.credentials`", "Account Manager", "Full CRUD — only accounting managers can see or modify hotel credentials"],
          ["`pms.account.mapping`", "Account Manager", "Full CRUD"],
          ["`pms.tax.mapping`", "Account Manager", "Full CRUD"],
          ["`pms.sync.log`", "Account Manager", "Full CRUD — in practice logs are read-only (no UI create / edit buttons)"],
          ["`pms.sync.wizard`", "Account Manager", "Full CRUD — transient model for the sync wizard"],
        ],
      },
      { kind: "section", text: "11.4 ZATCA Compliance Notes" },
      {
        kind: "text",
        text: "Invoices created by the connector carry the ZATCA-required data fields, populated from eZee:",
      },
      {
        kind: "list",
        items: [
          "Buyer (guest) name — from `ezee_guest_name`.",
          "Buyer address — from `ezee_address`, `ezee_address1/2/3`, `ezee_country`.",
          "Buyer VAT / ID number — from `ezee_tax_number` (for corporate guests).",
          "Invoice date — from the eZee `record_date`.",
          "Line-level taxes — from the Tax Mapping table.",
        ],
      },
      {
        kind: "text",
        text: "For full ZATCA Phase 2 compliance, the `l10n_sa_edi` module must also be configured. The eZee–Odoo connector provides the data; `l10n_sa_edi` handles the XML generation, signing, and submission to the ZATCA platform.",
      },
    ],
  },
  {
    id: "appendices",
    number: 12,
    title: "Appendices",
    summary: "Glossary, sample API payloads, hotel list, and onboarding checklist.",
    icon: FileText,
    blocks: [
      { kind: "section", text: "Appendix A — Glossary of Terms" },
      {
        kind: "table",
        headers: ["Term", "Definition"],
        rows: [
          ["PMS", "Property Management System — the front-office hotel software (eZee Absolute in this context)."],
          ["FAS API", "Financial Accounting System API — eZee's interface for extracting accounting data."],
          ["Folio", "A guest's running bill in the PMS — analogous to a tab or account."],
          ["City Ledger", "Accounts receivable for corporate accounts and OTAs — invoices settled later rather than at checkout."],
          ["Guest Ledger", "Accounts receivable for individual guests staying in the hotel (in-house accounts)."],
          ["OTA", "Online Travel Agency — e.g., Booking.com, Expedia, Agoda."],
          ["VCC", "Virtual Credit Card — a single-use card issued by an OTA to pay the hotel."],
          ["`auth_code`", "The session authentication token returned by eZee after a successful login."],
          ["`pms_tran_id`", "The eZee transaction ID stored on each Odoo record — the primary deduplication key."],
          ["Idempotent", "A sync operation that can be run multiple times on the same data without creating duplicates or errors."],
          ["ZATCA", "Zakat, Tax and Customs Authority — Saudi Arabia's tax authority and e-invoicing regulator."],
          ["`l10n_sa_edi`", "Odoo's official Saudi e-invoicing module for ZATCA Phase 2 compliance."],
          ["`out_invoice`", "Odoo's internal identifier for a customer invoice."],
          ["`out_refund`", "Odoo's internal identifier for a customer credit note (refund)."],
          ["entry", "Odoo's internal identifier for a manual journal entry (neither invoice nor payment)."],
        ],
      },
      { kind: "section", text: "Appendix B — eZee API Sample Payloads" },
      {
        kind: "code",
        label: "Login Request (XML)",
        code: `<FAS_Interface_Request>
  <Request_Type>FAS_Login_User</Request_Type>
  <Authentication>
    <UserName>your_username</UserName>
    <UserPassword>your_password</UserPassword>
    <HotelCode>22888</HotelCode>
  </Authentication>
</FAS_Interface_Request>`,
      },
      {
        kind: "code",
        label: "Sales Data Request (JSON POST to PMSAccountAPI)",
        code: `{
  "auth_code": "74428056904ee46782-f82c-11f0-9",
  "hotel_code": "22888",
  "requestfor": "XERO_GET_TRANSACTION_DATA",
  "fromdate": "2025-01-01",
  "todate": "2025-01-31",
  "ischeckout": "false"
}`,
      },
      { kind: "section", text: "Appendix C — Pre-Configured Hotels (WD Group)" },
      {
        kind: "table",
        headers: ["Property", "Hotel Code", "Notes"],
        rows: [
          ["SwissBlue Hotel Jeddah", "22888", "Full hotel; primary test property"],
          ["SwissBlue Serviced Apartments — Alsamer District", "59068", "Serviced apartments"],
          ["SwissBlue Serviced Apartments — Alzahraa District", "59081", "Serviced apartments"],
          ["Vinas Riyadh Serviced Apartments", "59208", "Riyadh property"],
          ["Tulip Alrawdah Serviced Apartments", "59207", "Riyadh property"],
          ["SwissBlue Apartment Hotel Jazan", "59557", "Jazan property"],
        ],
      },
      { kind: "section", text: "Appendix D — Key Configuration Checklist" },
      {
        kind: "text",
        text: "Use this checklist when onboarding a new hotel or troubleshooting a fresh installation.",
      },
      {
        kind: "table",
        headers: ["Task", "Location in Odoo"],
        rows: [
          ["Company created and configured", "Settings → Companies"],
          ["Chart of accounts set up", "Accounting → Configuration → Chart of Accounts"],
          ["Sales journal exists for the company", "Accounting → Configuration → Journals"],
          ["Cash and Bank journals exist for the company", "Accounting → Configuration → Journals"],
          ["PMS Credentials record created", "eZee Gateway → PMS Configuration"],
          ["Test Connection succeeded", "PMS Credentials form → Test Connection"],
          ["Pull Master Data succeeded", "PMS Credentials form → Pull Master Data"],
          ["All account-mapping rows have an Odoo account assigned", "eZee Gateway → Account Mapping"],
          ["Special accounts mapped: Guest Ledger, City Ledger, Advance From Guest, Paid Out", "eZee Gateway → Account Mapping"],
          ["Tax-mapping rows have an Odoo tax assigned", "eZee Gateway → Tax Mapping"],
          ["Company Hotel field set to the credentials record", "Settings → Companies → Hotel field"],
          ["Test manual sync completed successfully", "eZee Gateway → Manual Sync"],
          ["Cron jobs active and `nextcall` set correctly", "Settings → Technical → Scheduled Actions"],
        ],
      },
    ],
  },
];
