// Structured content for the /hospitalityapi dashboard.
// A generic capability showcase for the Hospitality Financial Connector —
// an Odoo 19 module that bridges any hotel PMS to Odoo Accounting.
// Static marketing/technical content; intentionally not wired through the CMS.
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

export const chapters: Chapter[] = [
  {
    id: "executive-overview",
    number: 1,
    title: "Executive Overview",
    summary: "What the connector does, the value it delivers, and how it fits together.",
    icon: LayoutDashboard,
    blocks: [
      { kind: "section", text: "1.1 What the Connector Does" },
      {
        kind: "text",
        text: "The Hospitality Financial Connector is a custom Odoo 19 module (`odoo_pms_connector`) that creates a fully automated financial bridge between your hotel's Property Management System (PMS) and Odoo Accounting. It removes manual data re-entry between the front-office system and the accounting platform, so every revenue, receipt, payment, journal adjustment, and incidental charge recorded in your PMS is reflected in Odoo accurately and automatically.",
      },
      {
        kind: "text",
        text: "Whatever PMS your property runs, the connector reads its financial data through the PMS API, transforms it into proper Odoo accounting entries, and posts them — turning a slow, error-prone manual process into a hands-off daily routine.",
      },
      { kind: "section", text: "1.2 Business Value" },
      {
        kind: "table",
        headers: ["Business Value", "What It Means for You"],
        rows: [
          ["Eliminates manual re-entry", "Every PMS transaction posts to Odoo automatically, within minutes of each scheduled sync."],
          ["Real-time financial visibility", "Managers and finance teams see posted invoices, payments, and balances the same day — no waiting for month-end."],
          ["Multi-property support", "A single Odoo instance manages many hotels, each with its own company, chart of accounts, journals, and PMS connection."],
          ["E-invoicing ready", "Invoices carry the guest, tax, and folio data needed for regional e-invoicing compliance (such as Saudi ZATCA Phase 2)."],
          ["Automated reconciliation", "A scheduled job matches outstanding payments and credit notes against open invoices, shrinking the AR aging backlog."],
          ["Full audit trail", "Every API call, payload, and response is logged for complete traceability."],
        ],
      },
      { kind: "section", text: "1.3 How the Architecture Works" },
      {
        kind: "text",
        text: "The connector follows a pull-based pattern: Odoo is the master accounting system, and your PMS stays the source of truth for hospitality transactions. On a schedule — or on demand — Odoo calls the PMS API, downloads transactions for a date range, transforms them into accounting entries, and posts them.",
      },
      {
        kind: "table",
        headers: ["Your PMS (Source)", "Odoo 19 Accounting (Target)"],
        rows: [
          ["Sales / revenue records", "Customer invoices (`out_invoice` / `out_refund`)"],
          ["Guest & city-ledger receipts", "Inbound payments (`account.payment`)"],
          ["Refunds & general expenses", "Outbound payments (`account.payment`)"],
          ["General journal entries", "Journal entries (`account.move` – entry)"],
          ["Incidental invoices", "Customer invoices + immediate payment registration"],
        ],
      },
      {
        kind: "callout",
        tone: "note",
        text: "The connector is a one-way pull: PMS → Odoo. No data is ever written back to your PMS.",
      },
    ],
  },
  {
    id: "business-perspective",
    number: 2,
    title: "Business Perspective",
    summary: "Workflows, user roles, and real-world hospitality scenarios.",
    icon: Briefcase,
    blocks: [
      { kind: "section", text: "2.1 Operational Workflows" },
      { kind: "subheading", text: "2.1.1 Nightly Automated Sync" },
      {
        kind: "text",
        text: "A scheduled job runs every morning and syncs the previous day's data for all active properties. By the time your accounting team arrives, the prior day's revenue is already posted in Odoo, ready for review and reporting.",
      },
      { kind: "subheading", text: "2.1.2 On-Demand Manual Sync" },
      {
        kind: "text",
        text: "When you need immediate reconciliation — after a large group checkout, or at the end of a fiscal period — a user can trigger a manual sync. The wizard lets you pick specific properties, a custom date range, and which transaction types to include.",
      },
      { kind: "section", text: "2.2 Impact on Reservations, Accounting & Reporting" },
      {
        kind: "text",
        text: "Reservations — Each room folio in your PMS maps to a customer invoice in Odoo, carrying the guest name, room number, check-in / check-out dates, rate plan, and folio number for full traceability.",
      },
      {
        kind: "text",
        text: "Accounting — Revenue is split by charge category (room, F&B, laundry, and so on) and mapped to the correct Odoo income accounts. Taxes are applied automatically through a configurable tax mapping.",
      },
      {
        kind: "text",
        text: "Reporting — Because every transaction is posted with PMS metadata, finance teams can filter Odoo reports by property, reservation, folio, guest, or business source — insight your PMS reports alone can't give you.",
      },
      { kind: "section", text: "2.3 User Roles & Responsibilities" },
      {
        kind: "table",
        headers: ["Role", "Responsibilities", "Access Level"],
        rows: [
          ["Accounting Manager (Admin)", "Configures credentials and mappings, triggers manual syncs, reviews logs", "Full access to the connector menu"],
          ["Accountant (User)", "Reviews posted invoices and payments, handles reconciliation, investigates sync errors", "Read access to logs; read / write on accounting entries"],
          ["Hotel Operations (User)", "Works only in the PMS — never touches the connector", "No Odoo access required"],
          ["IT / Developer (Admin)", "Module updates, server maintenance, API troubleshooting", "Hosting / SSH / developer mode"],
        ],
      },
      { kind: "section", text: "2.4 Real-World Scenarios" },
      { kind: "subheading", text: "Scenario A — Standard Guest Checkout" },
      {
        kind: "text",
        text: "A guest checks out after a three-night stay and the front desk posts the bill in the PMS.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "The PMS records the checkout as one sales record with room charges and tax detail lines.",
          "Next morning, the scheduled job pulls the previous day's data.",
          "The connector creates a customer invoice in Odoo under the correct property, with the folio and reservation number stamped on it.",
          "If the guest paid at checkout, a receipt (inbound payment) is created and linked to the invoice automatically.",
          "The invoice is posted and confirmed — finance has nothing to do.",
        ],
      },
      { kind: "subheading", text: "Scenario B — OTA Booking (Virtual Credit Card)" },
      {
        kind: "text",
        text: "An online travel agency booking is fulfilled and paid via a Virtual Credit Card (VCC).",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "The PMS records the receipt against a city-ledger receivable account.",
          "The connector creates an inbound payment posted to the city-ledger receivable defined in the account mapping.",
          "Any subsequent OTA commission is posted as a separate journal entry.",
        ],
      },
      { kind: "subheading", text: "Scenario C — Advance Deposit" },
      { kind: "text", text: "A guest pays a deposit before arrival." },
      {
        kind: "list",
        ordered: true,
        items: [
          "The PMS records an advance-deposit receipt.",
          "The connector creates an inbound payment mapped to an advance-deposit liability account.",
          "At checkout, the automated reconciliation job offsets the deposit against the final invoice.",
        ],
      },
      { kind: "subheading", text: "Scenario D — Refund / Cancellation" },
      { kind: "text", text: "A guest cancels and is owed a refund." },
      {
        kind: "list",
        ordered: true,
        items: [
          "The PMS records a guest refund or an advance-deposit refund.",
          "The connector creates an outbound payment mapped to the appropriate account.",
          "If the original invoice was reversed in the PMS, a credit note (`out_refund`) is created in Odoo.",
        ],
      },
    ],
  },
  {
    id: "financial-flow",
    number: 3,
    title: "Financial & Accounting Flow",
    summary: "How revenue, payments, mapping, and reconciliation are handled.",
    icon: Receipt,
    blocks: [
      { kind: "section", text: "3.1 Revenue Recognition" },
      {
        kind: "text",
        text: "Revenue is recognized on the posting date returned by your PMS. For checkout invoices that is the checkout date; for ongoing folios it is the date the charge was posted.",
      },
      {
        kind: "text",
        text: "Each invoice line maps to a charge category in your PMS. The connector looks up the account mapping by the PMS charge-header ID and uses the matching Odoo income account. If no mapping exists yet, it falls back to:",
      },
      {
        kind: "list",
        items: [
          "The default account of the property's fallback journal, or",
          "The first income account in the company's chart of accounts.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        text: "Best practice: map every PMS charge category before going live. Pull the master data once to auto-populate the mapping table, then assign an Odoo account to each row.",
      },
      { kind: "section", text: "3.2 Payment Handling" },
      {
        kind: "table",
        headers: ["PMS Transaction", "Odoo Payment Type", "Journal", "Account Used"],
        rows: [
          ["Guest payment", "Inbound (customer)", "Cash or Bank", "Guest-ledger receivable"],
          ["Advance deposit", "Inbound (customer)", "Cash or Bank", "Advance-deposit liability"],
          ["City-ledger receipt", "Inbound (customer)", "Bank", "City-ledger receivable"],
          ["Guest refund", "Outbound (customer)", "Cash or Bank", "Guest-ledger receivable"],
          ["Advance-deposit refund", "Outbound (customer)", "Cash or Bank", "Advance-deposit liability"],
          ["City-ledger refund", "Outbound (customer)", "Bank", "City-ledger receivable"],
          ["General expense", "Outbound (customer)", "Cash or Bank", "Paid-out account"],
        ],
      },
      {
        kind: "text",
        text: "Journal selection — the connector inspects the PMS payment-method name: cash methods route to the Cash journal, everything else to the Bank journal of that property's company. This rule is fully extensible (see Chapter 6).",
      },
      { kind: "section", text: "3.3 Mapping PMS Data to Odoo" },
      { kind: "subheading", text: "3.3.1 Account Mapping" },
      {
        kind: "text",
        text: "The account mapping is the heart of revenue routing. It links each PMS charge-header ID to an Odoo income, liability, or receivable account.",
      },
      {
        kind: "table",
        headers: ["Field", "Source", "Purpose"],
        rows: [
          ["`pms_account_header_id`", "PMS charge-header ID", "Unique ID from the PMS — the primary lookup key"],
          ["`pms_account_header_name`", "PMS charge name", "Human-readable name (Room Charge, F&B, City Ledger, …) — also drives special accounts"],
          ["`account_id`", "Odoo account", "Target income / liability / receivable account"],
          ["`account_group_id`", "Odoo account group", "Optional grouping for reporting"],
        ],
      },
      {
        kind: "text",
        text: "Special charge names drive AR routing: Guest Ledger → guest receivable; City Ledger → corporate / OTA receivable; Advance From Guest → advance-deposit liability; Paid Out → general expense account.",
      },
      { kind: "subheading", text: "3.3.2 Tax Mapping" },
      {
        kind: "text",
        text: "The tax mapping links each PMS tax to an Odoo tax object — by tax ID first, then by name. It covers VAT and any local levies, such as a municipality or tourism fee.",
      },
      { kind: "subheading", text: "3.3.3 Payment-Method Mapping" },
      {
        kind: "text",
        text: "An optional payment-method mapping handles cases where specific methods — particular card types, for example — should route to dedicated journals, rather than relying on the default cash / bank rule.",
      },
      { kind: "section", text: "3.4 Reconciliation" },
      { kind: "subheading", text: "3.4.1 Automatic Reconciliation" },
      {
        kind: "text",
        text: "A daily reconciliation job finds posted, unpaid or partially-paid customer invoices and applies any outstanding credits for the same customer — automatically doing what Odoo's \"Apply Outstanding Credits\" button does by hand.",
      },
      {
        kind: "text",
        text: "This handles the common hospitality case where a payment arrives in the PMS before, or independently of, the invoice — leaving a credit balance that needs to be offset.",
      },
      { kind: "subheading", text: "3.4.2 Manual Reconciliation" },
      {
        kind: "text",
        text: "For anything the job can't match automatically, accountants use Odoo's standard outstanding-credits widget on the invoice to select the right payment.",
      },
      { kind: "section", text: "3.5 Edge Cases" },
      { kind: "subheading", text: "3.5.1 Refund Detection" },
      {
        kind: "text",
        text: "If a PMS sales record has a negative total, the connector creates a credit note (`out_refund`) instead of an invoice, using absolute values on the lines — Odoo's credit-note logic handles the sign.",
      },
      { kind: "subheading", text: "3.5.2 Duplicate Prevention" },
      {
        kind: "text",
        text: "Before creating any record, the connector checks for an existing one with the same PMS transaction ID, property, and type. If found, it is skipped — so the sync is fully idempotent and can be safely re-run for the same dates.",
      },
      {
        kind: "callout",
        tone: "note",
        text: "A database-level constraint also enforces this uniqueness, as a final safety net behind the application check.",
      },
      { kind: "subheading", text: "3.5.3 No-Show & Cancellation" },
      {
        kind: "text",
        text: "A no-show with a non-refundable charge appears as a normal sales record and is processed as a normal invoice. If the property later waives the charge, a credit note is issued — either in the PMS (it syncs as a negative amount) or directly in Odoo.",
      },
      { kind: "subheading", text: "3.5.4 Layered Taxes" },
      {
        kind: "text",
        text: "Where a property applies more than one tax — for example a municipality or tourism fee on top of VAT — each is mapped to its own Odoo tax object, with the correct \"include in base\" behaviour so they layer in the right order.",
      },
    ],
  },
  {
    id: "technical-architecture",
    number: 4,
    title: "Technical Architecture",
    summary: "Module structure, data flow, the API layer, and Odoo data models.",
    icon: Network,
    blocks: [
      { kind: "section", text: "4.1 Module Structure" },
      {
        kind: "table",
        headers: ["File / Directory", "Purpose"],
        rows: [
          ["`__manifest__.py`", "Module metadata, dependencies (base, account, analytic), data declarations"],
          ["`__init__.py`", "Package entry point — imports models, wizards, services"],
          ["`models/pms_credentials.py`", "Per-property connection profile: credentials, journal config, test / pull actions"],
          ["`models/pms_mapping.py`", "Three mapping models: account, tax, payment method"],
          ["`models/pms_sync_log.py`", "Sync audit log with request / response payloads"],
          ["`models/account_move.py`", "Extends `account.move` and `account.payment` with PMS fields; reconciliation job"],
          ["`models/company.py`", "Links each Odoo company to its property"],
          ["`services/pms_api_service.py`", "HTTP client for the PMS API: authentication and data fetching"],
          ["`wizards/pms_sync_wizard.py`", "Core sync orchestrator: processes all five transaction types"],
          ["`data/ir_cron_data.xml`", "Two scheduled jobs: daily sync + daily reconciliation"],
          ["`security/ir.model.access.csv`", "Access rights — connector models restricted to the Accounting Manager group"],
          ["`i18n/`", "UI translations"],
          ["`views/`", "View definitions for credentials, mappings, logs, invoices, payments, menus"],
        ],
      },
      { kind: "section", text: "4.2 Data Flow, Step by Step" },
      {
        kind: "list",
        ordered: true,
        items: [
          "A scheduled job (or the manual wizard) starts a sync for each active property.",
          "The connector authenticates with the PMS API if it holds no valid session token.",
          "It requests transaction data for the chosen date range, one category at a time.",
          "The raw request and response are written to the sync log.",
          "Each record is checked for duplicates, its customer is resolved, accounts and taxes are mapped, and the Odoo record is created and posted.",
          "The daily reconciliation job then offsets any matching credit balances against open invoices.",
        ],
      },
      { kind: "section", text: "4.3 The API Layer" },
      {
        kind: "text",
        text: "The connector talks to the PMS over HTTPS: one call authenticates and returns a session token, and a second endpoint serves every category of financial data, selected by a request parameter.",
      },
      { kind: "subheading", text: "4.3.1 Transaction Categories" },
      {
        kind: "table",
        headers: ["Category", "Data Returned", "Odoo Processor"],
        rows: [
          ["Sales", "Checkout / folio invoices", "`_process_sales()`"],
          ["Receipts", "Inbound payments from guests and city ledger", "`_process_receipts()`"],
          ["Payments", "Outbound payments, refunds, expenses", "`_process_payments()`"],
          ["Journals", "Folio and city-ledger transfers", "`_process_journals()`"],
          ["Incidentals", "Non-room charges (F&B, laundry, …) with immediate payment", "`_process_incidentals()`"],
          ["Master data", "Charge categories and tax types, for mapping setup", "`_process_config_data()`"],
        ],
      },
      { kind: "section", text: "4.4 Authentication & Security" },
      {
        kind: "list",
        items: [
          "Each property authenticates with its own session token, stored in the `pms.credentials` model.",
          "Passwords use Odoo's password field type; pair this with database encryption and restricted DB access.",
          "All API calls run over HTTPS — the connector never falls back to plain HTTP.",
          "Credentials are never written to logs — only the session token and property code appear in request payloads.",
          "Every connector model requires the Accounting Manager group; other staff cannot see or trigger syncs.",
        ],
      },
      { kind: "section", text: "4.5 Odoo Data Model" },
      { kind: "subheading", text: "Extended: account.move" },
      {
        kind: "table",
        headers: ["Field", "Type", "Description"],
        rows: [
          ["`pms_tran_id`", "Char", "Unique transaction ID from the PMS — the deduplication key"],
          ["`pms_hotel_id`", "Many2one → pms.credentials", "Links the record to its originating property"],
          ["`pms_reference`", "Char", "Reservation number"],
          ["`pms_folio_number`", "Char", "Folio number"],
          ["`pms_guest_name`", "Char", "Guest name from the PMS"],
          ["`pms_checkin_date` / `checkout_date`", "Date", "Reservation dates — used to compute the number of nights"],
          ["`pms_number_of_nights`", "Integer (computed)", "Checkout minus check-in, in days"],
          ["`pms_business_source`", "Char", "Business source / OTA channel"],
        ],
      },
    ],
  },
  {
    id: "installation",
    number: 5,
    title: "Installation & Deployment",
    summary: "Requirements and a step-by-step path to going live.",
    icon: Rocket,
    blocks: [
      { kind: "section", text: "5.1 Requirements" },
      {
        kind: "table",
        headers: ["Requirement", "Detail"],
        rows: [
          ["Odoo version", "Odoo 19 (Enterprise or Community)"],
          ["Hosting", "Cloud-hosted or self-hosted, with outbound HTTPS access to the PMS API"],
          ["Odoo modules", "`base`, `account`, `analytic` — installed first"],
          ["Network", "Outbound HTTPS (port 443) to the PMS endpoint must be open"],
          ["PMS access", "An active PMS subscription with financial / accounting API access enabled"],
        ],
      },
      { kind: "section", text: "5.2 Setup Guide" },
      { kind: "subheading", text: "Step 1 — Deploy the Module" },
      {
        kind: "list",
        items: [
          "Add the connector module to your Odoo addons path.",
          "Rebuild or restart Odoo so the module appears in the Apps list.",
        ],
      },
      { kind: "subheading", text: "Step 2 — Install the Module" },
      {
        kind: "list",
        items: [
          "Open Apps as an administrator and install the connector.",
          "The connector menu appears under the Accounting application.",
        ],
      },
      { kind: "subheading", text: "Step 3 — Configure Companies" },
      {
        kind: "list",
        items: [
          "Ensure each hotel property has its own Odoo company.",
          "Link each company to its property record so syncs route correctly.",
        ],
      },
      { kind: "subheading", text: "Step 4 — Configure Credentials" },
      {
        kind: "list",
        items: [
          "Open each property's credentials record and enter its name, code, and PMS API login.",
          "Set the fallback journal and the transfer journal.",
          "Click Test Connection to confirm the session token is obtained and saved.",
        ],
      },
      { kind: "subheading", text: "Step 5 — Pull Master Data & Map" },
      {
        kind: "list",
        items: [
          "Click Pull Master Data to auto-populate the account and tax mapping tables.",
          "Assign an Odoo account to every charge category — especially the special ones: Guest Ledger, City Ledger, Advance From Guest, Paid Out.",
          "Assign an Odoo tax to every PMS tax.",
        ],
      },
      { kind: "subheading", text: "Step 6 — Validate" },
      {
        kind: "list",
        items: [
          "Run a manual sync for one property over a short past date range.",
          "Check the sync logs — every entry should show success.",
          "Open Customers → Invoices and confirm the records were created with PMS data populated.",
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        text: "Always run the first sync on a test or staging environment before going live, and confirm the mappings produce the GL postings you expect.",
      },
      { kind: "section", text: "5.3 Scheduled Jobs" },
      {
        kind: "text",
        text: "Two scheduled jobs drive the connector — a daily sync and a daily reconciliation. Confirm both are active and adjust their run times to suit your team's routine.",
      },
    ],
  },
  {
    id: "configuration",
    number: 6,
    title: "Configuration & Customization",
    summary: "Tuning the connector and onboarding new properties.",
    icon: SlidersHorizontal,
    blocks: [
      { kind: "section", text: "6.1 Key Settings" },
      {
        kind: "table",
        headers: ["Setting", "Effect"],
        rows: [
          ["Fallback Journal", "Used when no specific journal is found for a transaction. Must belong to the property's company."],
          ["Transfer Journal", "Used for city-ledger and folio transfer entries — typically a general journal."],
          ["Analytic Account", "If set, every line for this property carries a 100% analytic distribution — enabling per-property profitability reporting."],
          ["Active toggle", "Inactive properties are skipped by the scheduled sync."],
        ],
      },
      { kind: "section", text: "6.2 Extending Payment Logic" },
      {
        kind: "text",
        text: "Out of the box, payments route to a Cash or Bank journal based on the PMS payment-method name. To send a specific method to its own journal — a particular card type, for example — the routing logic is a small, well-isolated piece of code:",
      },
      {
        kind: "code",
        label: "Custom journal routing",
        code: `# Example: route a specific card type to its own journal
if "VISA" in payment_method_name.upper():
    journal = self.env["account.journal"].sudo().search(
        [("name", "ilike", "Visa"), ("company_id", "=", company.id)],
        limit=1,
    ) or journal`,
      },
      {
        kind: "callout",
        tone: "tip",
        text: "For more elaborate setups, the payment-method mapping table can drive journal selection entirely from configuration — no code required.",
      },
      { kind: "section", text: "6.3 Adding a New Property" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Create a new company in Odoo and set up (or copy) its chart of accounts.",
          "Create a credentials record with the new property's PMS code and API login.",
          "Test the connection and pull master data.",
          "Map all accounts and taxes.",
          "Link the company to the new credentials record.",
          "The scheduled sync picks up the new property automatically from its next run.",
        ],
      },
      { kind: "section", text: "6.4 Disabling a Transaction Type" },
      {
        kind: "text",
        text: "Any of the five transaction types can be switched off per-run in the manual sync wizard. To disable a type permanently for the scheduled sync, pass the corresponding flag from the cron entry point.",
      },
    ],
  },
  {
    id: "user-guide",
    number: 7,
    title: "User Guide",
    summary: "The day-to-day routine for your accounting team.",
    icon: BookOpen,
    blocks: [
      { kind: "section", text: "7.1 Daily Routine" },
      { kind: "subheading", text: "Morning Check — after the sync runs" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Open the sync logs and confirm every property shows success for the previous day.",
          "If any show failed or partial, see Chapter 8.",
          "Review the new invoices and receipts under Customers.",
        ],
      },
      { kind: "subheading", text: "Midday Check — after reconciliation runs" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Filter for invoices that are still \"In Payment\" or \"Not Paid\".",
          "Confirm invoices with a received payment have moved to \"In Payment\" or \"Paid\".",
          "For anything still outstanding, apply the outstanding credit by hand from the invoice.",
        ],
      },
      { kind: "section", text: "7.2 Running a Manual Sync" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Open the manual sync wizard.",
          "Select one or more properties.",
          "Set the date range.",
          "Tick the transaction types to include.",
          "Start the sync, then review the result notification and the logs.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        text: "Onboarding historical data for a new property? Run the manual sync in monthly chunks to avoid API timeouts.",
      },
      { kind: "section", text: "7.3 Reviewing a Synced Invoice" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Open any customer invoice.",
          "The header shows the property, transaction ID, reservation, and folio number.",
          "A dedicated tab shows full guest, room, rate-plan, and address detail from the PMS.",
          "Invoice lines show the revenue categories; the tax section shows the mapped Odoo taxes.",
        ],
      },
      { kind: "section", text: "7.4 The Accounting Summary" },
      {
        kind: "text",
        text: "An accounting summary view groups every posted line by date and account — a quick daily picture of revenue and cash movement across all properties, with date filters and grouping controls.",
      },
      { kind: "section", text: "7.5 Error Messages" },
      {
        kind: "table",
        headers: ["Message", "What to Do"],
        rows: [
          ["Sync completed with errors", "Open the sync logs, find the failed entry, and read its error message. Escalate to IT if it is technical."],
          ["Connection failed", "The PMS API is unreachable or the credentials are wrong. Check connectivity, re-enter the password, and test again."],
          ["No sales journal found", "The property's company needs a Sales journal — create one under Accounting → Configuration → Journals."],
          ["No payment method found", "The Cash or Bank journal has no payment method configured — enable one in the journal settings."],
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
      { kind: "section", text: "8.1 Common Issues" },
      {
        kind: "table",
        headers: ["Symptom", "Likely Cause", "Resolution"],
        rows: [
          ["Session token rejected after a few days", "PMS session tokens expire", "Click Test Connection to refresh the token"],
          ["Invoice line has no account", "Charge category not yet mapped", "Open the account mapping and assign an Odoo account to that row"],
          ["Tax missing on an invoice", "Tax not mapped, or a tax-ID mismatch", "Open the tax mapping and verify it matches the PMS tax"],
          ["Duplicate-record error", "Two sync runs overlapped", "The duplicate check prevents this in normal use; the second run can be safely ignored"],
          ["Customer receivable mismatch", "Customer created before the mapping was set", "Re-sync — the connector refreshes the customer's receivable account each run"],
          ["API server error", "A temporary PMS-side issue", "Wait a few minutes and retry; if it persists, contact your PMS provider"],
          ["Empty response", "No data for that date range", "Normal — confirm the dates cover real activity"],
        ],
      },
      { kind: "section", text: "8.2 Logs & Debugging" },
      { kind: "subheading", text: "8.2.1 Sync Logs" },
      {
        kind: "text",
        text: "Every API call is logged with the property, category, date range, status, and full request and response — the first place to look when a sync fails.",
      },
      { kind: "subheading", text: "8.2.2 Server Logs" },
      {
        kind: "text",
        text: "For deeper debugging, the module writes to the Odoo server log under each file's logger name; search for connector-related lines to find connection and fetch exceptions.",
      },
      { kind: "subheading", text: "8.2.3 Developer Mode" },
      {
        kind: "text",
        text: "With Odoo developer mode on, you can open the scheduled jobs directly and run either of them manually for testing.",
      },
      { kind: "section", text: "8.3 Recovery" },
      { kind: "subheading", text: "Re-syncing After a Failure" },
      {
        kind: "text",
        text: "Because the sync is idempotent, you can safely re-run it for any date range — existing records are skipped and only the missing ones are created.",
      },
      { kind: "subheading", text: "Fixing a Wrong Account" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Reset the affected invoices to draft.",
          "Correct the account mapping.",
          "Delete and re-add the lines, or delete the invoice and re-sync.",
        ],
      },
      {
        kind: "callout",
        tone: "important",
        text: "Never reset to draft an invoice already sent to a customer or submitted for e-invoicing — issue a credit note instead.",
      },
      { kind: "section", text: "8.4 Monitoring" },
      {
        kind: "list",
        items: [
          "Alert the accounting manager whenever a sync log entry fails.",
          "Review the sync logs weekly as part of the month-end close.",
          "Watch each property's last-sync date — if it stops advancing, the session token has likely expired.",
        ],
      },
    ],
  },
  {
    id: "maintenance",
    number: 9,
    title: "Maintenance & Support",
    summary: "Routine upkeep, performance, backups, and upgrades.",
    icon: LifeBuoy,
    blocks: [
      { kind: "section", text: "9.1 Routine Tasks" },
      {
        kind: "table",
        headers: ["Frequency", "Task", "How"],
        rows: [
          ["Daily", "Review sync logs", "Confirm every property shows success for the previous day"],
          ["Weekly", "Check job health", "Confirm both scheduled jobs are running on time"],
          ["Monthly", "Refresh session tokens", "Run Test Connection on each property"],
          ["Monthly", "Archive old logs", "Archive sync logs older than 90 days to keep the database lean"],
          ["As needed", "Re-pull master data", "When the PMS adds new charge categories, pull and map the new rows"],
        ],
      },
      { kind: "section", text: "9.2 Performance" },
      {
        kind: "list",
        items: [
          "Key fields are indexed, keeping duplicate checks fast even across hundreds of thousands of records.",
          "The reconciliation job processes invoices in batches; add a date filter if volume grows large.",
          "Sync long historical ranges in weekly chunks to avoid API timeouts.",
        ],
      },
      { kind: "section", text: "9.3 Backups & Data Integrity" },
      {
        kind: "list",
        items: [
          "Keep automated daily database backups — most managed Odoo hosts include these.",
          "The transaction-ID uniqueness constraint is the core data-integrity guard — never disable it.",
          "Before a major Odoo upgrade, export the account, tax, and credentials mappings as a manual backup.",
        ],
      },
      { kind: "section", text: "9.4 Upgrades" },
      {
        kind: "list",
        items: [
          "Odoo version upgrades need a code review and a test pass — the integration patterns are stable, but Odoo ORM and view changes may need attention.",
          "If your PMS changes its API, only the API-service layer needs adjusting — the accounting logic is unaffected.",
          "The module relies only on standard libraries, so dependency upkeep is minimal.",
        ],
      },
    ],
  },
  {
    id: "development",
    number: 10,
    title: "Development Guide",
    summary: "Key classes, methods, field mapping, and the testing approach.",
    icon: Code2,
    blocks: [
      { kind: "section", text: "10.1 Key Classes & Methods" },
      { kind: "subheading", text: "PMS API Service" },
      {
        kind: "table",
        headers: ["Method", "Description"],
        rows: [
          ["`authenticate()`", "Authenticates with the PMS and stores the session token, working date, and currency on the credentials record."],
          ["`fetch_data(category, from_date, to_date)`", "Requests one transaction category for a date range, logs the exchange, and returns the parsed response."],
        ],
      },
      { kind: "subheading", text: "Sync Wizard — Processing Methods" },
      {
        kind: "table",
        headers: ["Method", "Description"],
        rows: [
          ["`action_sync()`", "Orchestrator: iterates properties, authenticates, and calls each processor based on the selected types."],
          ["`_process_sales()`", "Creates customer invoices or credit notes with line items, taxes, and guest metadata."],
          ["`_process_receipts()`", "Creates and posts inbound payments, adjusting the credit account per mapping."],
          ["`_process_payments()`", "Creates and posts outbound payments, adjusting the debit account per mapping."],
          ["`_process_journals()`", "Creates journal entries with balanced debit / credit lines."],
          ["`_process_incidentals()`", "Creates an invoice and immediately registers full payment."],
          ["`_get_or_create_partner()`", "Resolves or creates the customer, handling the company / individual hierarchy for corporate guests."],
          ["`_parse_amount()` / `_parse_date()`", "Robust parsers for amounts and dates returned in varied formats."],
        ],
      },
      { kind: "section", text: "10.2 Adding a New Transaction Type" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Add the new category to the API service.",
          "Add a matching option to the sync log model.",
          "Add a toggle to the sync wizard.",
          "Wire the toggle into the orchestrator.",
          "Implement a processor method following the existing pattern.",
          "Expose the toggle in the wizard view.",
        ],
      },
      { kind: "section", text: "10.3 PMS Field Mapping" },
      {
        kind: "text",
        text: "Whatever field names your PMS uses, the connector's API layer maps each one to a clear Odoo field. The core mapping is:",
      },
      {
        kind: "table",
        headers: ["PMS Data", "Odoo Field", "Notes"],
        rows: [
          ["Transaction ID", "`pms_tran_id`", "Unique identifier and deduplication key"],
          ["Posting date", "`invoice_date`", "Date the invoice is posted"],
          ["Check-in / check-out", "`pms_checkin_date` / `pms_checkout_date`", "Drives the night count"],
          ["Reservation number", "`pms_reference`", "Primary guest reference"],
          ["Folio number", "`pms_folio_number`", "The guest's running bill"],
          ["Guest name", "`pms_guest_name`", "As recorded in the PMS"],
          ["Room number", "`pms_room_number`", "Room assigned to the stay"],
          ["Rate plan", "`pms_rate_plan`", "Rate / package code"],
          ["Business source", "`pms_business_source`", "OTA or channel the booking came from"],
          ["Guest contact", "`pms_email` / `pms_phone` / `pms_address`", "Used for the Odoo customer record"],
        ],
      },
      { kind: "section", text: "10.4 Testing" },
      { kind: "subheading", text: "Unit Tests" },
      {
        kind: "list",
        items: [
          "Cover the amount and date parsers with edge cases — empty values, zero, negatives, and varied formats.",
          "Cover customer resolution for both individual and corporate guests.",
        ],
      },
      { kind: "subheading", text: "Integration Tests" },
      {
        kind: "list",
        items: [
          "Run the sync against a staging Odoo connected to real PMS credentials.",
          "Reconcile the postings against a known PMS daily report for the same dates.",
          "Run the same sync twice to confirm idempotency.",
          "Create an invoice and a matching payment, then run reconciliation manually.",
        ],
      },
    ],
  },
  {
    id: "security-compliance",
    number: 11,
    title: "Security & Compliance",
    summary: "Data protection, API security, access control, and e-invoicing.",
    icon: ShieldCheck,
    blocks: [
      { kind: "section", text: "11.1 Data Protection" },
      {
        kind: "list",
        items: [
          "PMS credentials are stored in Odoo and reachable only by the Accounting Manager role.",
          "Guest personal data synced from the PMS is held as standard Odoo customer fields, under Odoo's privacy controls.",
          "Sync log payloads contain API responses including guest data — keep log access restricted.",
          "Review log records for personal data before exporting or sharing them.",
        ],
      },
      { kind: "section", text: "11.2 API Security" },
      {
        kind: "list",
        items: [
          "All PMS communication uses HTTPS / TLS — there is no plain-HTTP fallback.",
          "The session token is short-lived and refreshed on each authentication.",
          "Credentials never appear in log payloads — only the session token and property code.",
          "For production, encrypt the Odoo database at rest.",
        ],
      },
      { kind: "section", text: "11.3 Access Control" },
      {
        kind: "table",
        headers: ["Model", "Allowed Group", "Notes"],
        rows: [
          ["Credentials", "Accounting Manager", "Full control — only managers see or edit property credentials"],
          ["Account mapping", "Accounting Manager", "Full control"],
          ["Tax mapping", "Accounting Manager", "Full control"],
          ["Sync logs", "Accounting Manager", "Effectively read-only in practice"],
        ],
      },
      { kind: "section", text: "11.4 E-Invoicing Compliance" },
      {
        kind: "text",
        text: "The connector populates every field a tax authority's e-invoicing system needs, drawn straight from the PMS:",
      },
      {
        kind: "list",
        items: [
          "Buyer (guest) name and address.",
          "Buyer tax / ID number for corporate guests.",
          "Invoice date and line-level taxes.",
        ],
      },
      {
        kind: "text",
        text: "Pair the connector with Odoo's regional e-invoicing module — for example the Saudi ZATCA Phase 2 module — and the connector supplies the data while that module handles generation, signing, and submission.",
      },
    ],
  },
  {
    id: "appendices",
    number: 12,
    title: "Appendices",
    summary: "Glossary, a sample API exchange, the multi-property model, and a go-live checklist.",
    icon: FileText,
    blocks: [
      { kind: "section", text: "Appendix A — Glossary of Terms" },
      {
        kind: "table",
        headers: ["Term", "Definition"],
        rows: [
          ["PMS", "Property Management System — the front-office software that runs the hotel."],
          ["Folio", "A guest's running bill in the PMS — analogous to a tab or account."],
          ["City Ledger", "Receivables for corporate accounts and OTAs, settled after the stay rather than at checkout."],
          ["Guest Ledger", "Receivables for in-house guests."],
          ["OTA", "Online Travel Agency — Booking.com, Expedia, Agoda, and the like."],
          ["VCC", "Virtual Credit Card — a single-use card an OTA issues to pay the hotel."],
          ["Session token", "The short-lived key returned by the PMS API after authentication."],
          ["Idempotent", "An operation that can run repeatedly on the same data without creating duplicates or errors."],
          ["`out_invoice` / `out_refund`", "Odoo's identifiers for a customer invoice and a customer credit note."],
          ["E-invoicing", "Electronic invoice submission to a tax authority's platform (for example, Saudi ZATCA)."],
        ],
      },
      { kind: "section", text: "Appendix B — Sample API Exchange" },
      {
        kind: "text",
        text: "A simplified view of the two calls the connector makes — authenticate, then pull data. Exact field names vary by PMS; the connector's API layer adapts to each.",
      },
      {
        kind: "code",
        label: "1 · Authenticate",
        code: `POST  /auth
{
  "username":      "<api-user>",
  "password":      "<api-secret>",
  "property_code": "<your-property-code>"
}

Response:
{ "auth_token": "<session-token>" }`,
      },
      {
        kind: "code",
        label: "2 · Pull transaction data",
        code: `POST  /transactions
{
  "auth_token":    "<session-token>",
  "property_code": "<your-property-code>",
  "category":      "sales",
  "from_date":     "2025-01-01",
  "to_date":       "2025-01-31"
}`,
      },
      { kind: "section", text: "Appendix C — The Multi-Property Model" },
      {
        kind: "text",
        text: "One Odoo instance scales to an entire hotel group. Each property is independent end to end:",
      },
      {
        kind: "list",
        items: [
          "Its own Odoo company and chart of accounts.",
          "Its own PMS credentials and property code.",
          "Its own account, tax, and journal mappings.",
          "Its own analytic account, for per-property profit reporting.",
        ],
      },
      {
        kind: "text",
        text: "The scheduled sync simply loops over every active property — so adding the next hotel is a configuration step, not a development one.",
      },
      { kind: "section", text: "Appendix D — Go-Live Checklist" },
      {
        kind: "text",
        text: "Use this checklist when onboarding a property or validating a fresh install.",
      },
      {
        kind: "table",
        headers: ["Task", "Where in Odoo"],
        rows: [
          ["Company created and configured", "Settings → Companies"],
          ["Chart of accounts set up", "Accounting → Configuration → Chart of Accounts"],
          ["Sales, Cash, and Bank journals exist", "Accounting → Configuration → Journals"],
          ["Credentials record created", "Connector → Configuration"],
          ["Test Connection succeeded", "Credentials form"],
          ["Master data pulled", "Credentials form"],
          ["Every charge category mapped to an account", "Connector → Account Mapping"],
          ["Special accounts mapped (Guest Ledger, City Ledger, Advance, Paid Out)", "Connector → Account Mapping"],
          ["Every tax mapped", "Connector → Tax Mapping"],
          ["Company linked to its credentials record", "Settings → Companies"],
          ["Test sync completed successfully", "Connector → Manual Sync"],
          ["Scheduled jobs active", "Settings → Technical → Scheduled Actions"],
        ],
      },
    ],
  },
];
