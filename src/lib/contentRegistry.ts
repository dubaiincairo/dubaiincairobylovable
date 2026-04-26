// Central registry of ALL editable content keys on the website.
// The admin panel uses this as source of truth — fields appear even if not yet in DB.

export interface ContentField {
  section: string;
  key: string;
  label: string;
  defaultValue: string;
  type?: "text" | "upload"; // "upload" renders a file-picker instead of a textarea
}

export const sectionOrder = [
  "nav", "hero", "stats", "about", "edges", "values", "services",
  "founder", "clients", "tech", "google", "legal", "contact", "footer",
  "careers", "odoo", "yanolja",
];

export const sectionLabels: Record<string, string> = {
  nav: "Navigation",
  hero: "Hero Section",
  stats: "Statistics",
  about: "About Section",
  edges: "Why We're Different",
  values: "Our Values",
  services: "Services / Studios",
  founder: "Founder Section",
  clients: "Clients Section",
  tech: "Tech Stack",
  google: "We're on Google",
  legal: "Legal & Registration",
  contact: "Contact Section",
  footer: "Footer",
  careers: "Careers Page",
  odoo: "Partnerships — Odoo",
  yanolja: "Partnerships — Yanolja Cloud",
};

export const contentRegistry: ContentField[] = [
  // ── Nav ──
  { section: "nav", key: "nav_favicon_url", label: "Favicon (browser tab icon)", defaultValue: "/favicon.svg", type: "upload" },
  { section: "nav", key: "nav_brand_1", label: "Brand Word 1", defaultValue: "Dubai" },
  { section: "nav", key: "nav_brand_2", label: "Brand Word 2 (connector)", defaultValue: "in" },
  { section: "nav", key: "nav_brand_3", label: "Brand Word 3", defaultValue: "Cairo" },
  { section: "nav", key: "nav_link_1", label: "Nav Link 1 (→ About)",    defaultValue: "About" },
  { section: "nav", key: "nav_link_2", label: "Nav Link 2 (→ Our Work)", defaultValue: "Our Work" },
  { section: "nav", key: "nav_link_3", label: "Nav Link 3 (→ Team)",     defaultValue: "Team" },
  { section: "nav", key: "nav_link_4", label: "Nav Link 4 (→ Services)", defaultValue: "Services" },
  { section: "nav", key: "nav_link_5", label: "Nav Link 5 (→ Contact)",  defaultValue: "Contact" },
  { section: "nav", key: "nav_cta", label: "Nav CTA Button", defaultValue: "Get Started" },

  // ── Hero ──
  { section: "hero", key: "hero_tagline", label: "Tagline Badge", defaultValue: "Dubai's Quality · Cairo's Reach" },
  { section: "hero", key: "hero_headline", label: "Main Headline", defaultValue: "Data-Powered Growth. Science-Fueled Success." },
  { section: "hero", key: "hero_subheadline", label: "Sub-headline", defaultValue: "We help ambitious businesses grow through the internet — with proven systems, measurable results, and a commitment to doing things differently." },
  { section: "hero", key: "hero_cta_primary", label: "Primary CTA Button", defaultValue: "Explore Our Services" },
  { section: "hero", key: "hero_cta_secondary", label: "Secondary CTA Button", defaultValue: "Talk to Our Team" },
  // Dashboard card (centre of visual)
  { section: "hero", key: "hero_card_label",    label: "Visual Card — Label",       defaultValue: "Growth Analytics" },
  { section: "hero", key: "hero_card_trend",    label: "Visual Card — Trend Badge", defaultValue: "+34% ↑" },
  { section: "hero", key: "hero_card_value",    label: "Visual Card — Number",      defaultValue: "216+" },
  { section: "hero", key: "hero_card_sublabel", label: "Visual Card — Sub-label",   defaultValue: "Projects Delivered" },
  // Floating stat chips (4 independent chips around the card)
  { section: "hero", key: "hero_float_1_value", label: "Chip 1 — Number", defaultValue: "5.0 ★" },
  { section: "hero", key: "hero_float_1_label", label: "Chip 1 — Label",  defaultValue: "Google Rating" },
  { section: "hero", key: "hero_float_2_value", label: "Chip 2 — Number", defaultValue: "50+" },
  { section: "hero", key: "hero_float_2_label", label: "Chip 2 — Label",  defaultValue: "Happy Clients" },
  { section: "hero", key: "hero_float_3_value", label: "Chip 3 — Number", defaultValue: "5 Yrs" },
  { section: "hero", key: "hero_float_3_label", label: "Chip 3 — Label",  defaultValue: "In Business" },
  { section: "hero", key: "hero_float_4_value", label: "Chip 4 — Number", defaultValue: "100%" },
  { section: "hero", key: "hero_float_4_label", label: "Chip 4 — Label",  defaultValue: "Digital-First" },

  // ── Stats ──
  { section: "stats", key: "stat_projects", label: "Stat 1 Value", defaultValue: "216" },
  { section: "stats", key: "stat_projects_label", label: "Stat 1 Label", defaultValue: "Successful Projects" },
  { section: "stats", key: "stat_clients", label: "Stat 2 Value", defaultValue: "36+" },
  { section: "stats", key: "stat_clients_label", label: "Stat 2 Label", defaultValue: "Clients Served" },
  { section: "stats", key: "stat_years", label: "Stat 3 Value", defaultValue: "4+" },
  { section: "stats", key: "stat_years_label", label: "Stat 3 Label", defaultValue: "Years of Growth" },
  { section: "stats", key: "stat_digital", label: "Stat 4 Value", defaultValue: "100%" },
  { section: "stats", key: "stat_digital_label", label: "Stat 4 Label", defaultValue: "Digital Operation" },

  // ── About ──
  { section: "about", key: "about_subtitle",          label: "Section Subtitle",            defaultValue: "Who We Are" },
  { section: "about", key: "about_headline",          label: "Section Headline",            defaultValue: "A Digital Agency Built on Science, Not Guesswork" },
  { section: "about", key: "about_body",              label: "Body Paragraph 1",            defaultValue: "Since March 2021, Dubai'nCairo has been helping brands grow online through data-driven marketing and eBusiness solutions." },
  { section: "about", key: "about_body_2",            label: "Body Paragraph 2",            defaultValue: "We are 100% digital by design. No physical overhead. No wasted time. Just a focused, talented team — available to you from anywhere." },
  // Process steps (right column)
  { section: "about", key: "about_step_1_num",   label: "Step 1 — Number",      defaultValue: "01" },
  { section: "about", key: "about_step_1_title", label: "Step 1 — Title",       defaultValue: "Strategy & Research" },
  { section: "about", key: "about_step_1_desc",  label: "Step 1 — Description", defaultValue: "We start with data — auditing your market, competitors, and audience before writing a single line of copy or launching a single campaign." },
  { section: "about", key: "about_step_2_num",   label: "Step 2 — Number",      defaultValue: "02" },
  { section: "about", key: "about_step_2_title", label: "Step 2 — Title",       defaultValue: "Build & Execute" },
  { section: "about", key: "about_step_2_desc",  label: "Step 2 — Description", defaultValue: "Every channel, every creative, every system is built with precision — designed to work together as one growth engine, not isolated experiments." },
  { section: "about", key: "about_step_3_num",   label: "Step 3 — Number",      defaultValue: "03" },
  { section: "about", key: "about_step_3_title", label: "Step 3 — Title",       defaultValue: "Optimise & Scale" },
  { section: "about", key: "about_step_3_desc",  label: "Step 3 — Description", defaultValue: "Continuous testing, real-time analytics, and ruthless focus on what moves the needle. When something works, we scale it fast." },
  // Dashboard visual
  { section: "about", key: "about_dash_header",       label: "Dashboard — Header Label",    defaultValue: "Growth Intelligence" },
  { section: "about", key: "about_dash_title",        label: "Dashboard — Title",           defaultValue: "Performance Overview" },
  { section: "about", key: "about_dash_funnel",       label: "Dashboard — Funnel Label",    defaultValue: "Conversion Funnel Analysis" },
  { section: "about", key: "about_dash_funnel_tag",   label: "Dashboard — Funnel Tag",      defaultValue: "↑ Optimised" },
  { section: "about", key: "about_dash_footer_left",  label: "Dashboard — Footer Left",     defaultValue: "216 campaigns analysed" },
  { section: "about", key: "about_dash_footer_right", label: "Dashboard — Footer Right",    defaultValue: "Data-Driven · Always On" },
  { section: "about", key: "about_dash_badge",        label: "Dashboard — Floating Badge",  defaultValue: "Science-Fueled" },
  // Metric chips (grouped as Metric 1 / 2 / 3 in admin)
  { section: "about", key: "about_metric_1_label", label: "Metric 1 — Label", defaultValue: "ROAS" },
  { section: "about", key: "about_metric_1_value", label: "Metric 1 — Value", defaultValue: "3.8×" },
  { section: "about", key: "about_metric_1_sub",   label: "Metric 1 — Sub",   defaultValue: "Avg. return" },
  { section: "about", key: "about_metric_2_label", label: "Metric 2 — Label", defaultValue: "CVR" },
  { section: "about", key: "about_metric_2_value", label: "Metric 2 — Value", defaultValue: "4.2%" },
  { section: "about", key: "about_metric_2_sub",   label: "Metric 2 — Sub",   defaultValue: "Conv. rate" },
  { section: "about", key: "about_metric_3_label", label: "Metric 3 — Label", defaultValue: "Growth" },
  { section: "about", key: "about_metric_3_value", label: "Metric 3 — Value", defaultValue: "+127%" },
  { section: "about", key: "about_metric_3_sub",   label: "Metric 3 — Sub",   defaultValue: "YoY revenue" },

  // ── Edges ──
  { section: "edges", key: "edges_subtitle", label: "Section Subtitle", defaultValue: "Why We're Different" },
  { section: "edges", key: "edges_headline", label: "Section Headline", defaultValue: "A Smarter Way to Grow Your Business Online" },
  ...Array.from({ length: 6 }, (_, i) => [
    { section: "edges", key: `edge_${i+1}_title`, label: `Card ${i+1} Title`, defaultValue: `Edge ${i+1}` },
    { section: "edges", key: `edge_${i+1}_desc`, label: `Card ${i+1} Description`, defaultValue: "" },
  ]).flat(),

  // ── Values ──
  { section: "values", key: "values_subtitle", label: "Section Subtitle", defaultValue: "What We Stand For" },
  { section: "values", key: "values_headline", label: "Section Headline", defaultValue: "The Principles Behind Every Project" },
  ...Array.from({ length: 6 }, (_, i) => [
    { section: "values", key: `value_${i+1}_title`, label: `Value ${i+1} Title`, defaultValue: `Value ${i+1}` },
    { section: "values", key: `value_${i+1}_desc`, label: `Value ${i+1} Description`, defaultValue: "" },
  ]).flat(),

  // ── Services ──
  { section: "services", key: "services_subtitle", label: "Section Subtitle", defaultValue: "Our Studios" },
  { section: "services", key: "services_headline", label: "Section Headline", defaultValue: "Six Specialized Studios. One Unified Vision." },
  ...Array.from({ length: 6 }, (_, i) => [
    { section: "services", key: `service_${i+1}_title`, label: `Studio ${i+1} Title`, defaultValue: `Service ${i+1}` },
    { section: "services", key: `service_${i+1}_desc`, label: `Studio ${i+1} Description`, defaultValue: "" },
  ]).flat(),

  // ── Founder ──
  { section: "founder", key: "founder_subtitle", label: "Section Subtitle", defaultValue: "A Message from Our Founder" },
  { section: "founder", key: "founder_headline", label: "Section Headline", defaultValue: "Built by Someone Who's Been in the Trenches" },
  { section: "founder", key: "founder_body", label: "Founder Body", defaultValue: "Abdullah Hassan Al-Fawali founded Dubai in Cairo with a bold vision." },
  { section: "founder", key: "founder_quote", label: "Founder Quote", defaultValue: "I believe that continuous learning is the key to success in business." },
  { section: "founder", key: "founder_attribution", label: "Quote Attribution", defaultValue: "— Abdullah Al-Fawali, CEO & Founder" },

  // ── Clients ──
  { section: "clients", key: "clients_subtitle", label: "Section Subtitle", defaultValue: "Success Partners" },
  { section: "clients", key: "clients_headline", label: "Section Headline", defaultValue: "Trusted by Brands That Mean Business" },
  { section: "clients", key: "clients_description", label: "Section Description", defaultValue: "From global pharmaceutical giants to beloved local names." },
  { section: "clients", key: "clients_list", label: "Client Names (one per line or comma-separated)", defaultValue: "Novartis,Sanofi,Roche" },

  // ── Tech ──
  { section: "tech", key: "tech_subtitle", label: "Section Subtitle", defaultValue: "Our Tech Stack" },
  { section: "tech", key: "tech_headline", label: "Section Headline", defaultValue: "Integrated Solutions. Proven Tools." },
  ...Array.from({ length: 6 }, (_, i) => [
    { section: "tech", key: `tech_${i+1}_label`, label: `Category ${i+1} Label`, defaultValue: `Category ${i+1}` },
    { section: "tech", key: `tech_${i+1}_tools`, label: `Category ${i+1} Tools (comma-separated)`, defaultValue: "" },
  ]).flat(),

  // ── Google ──
  { section: "google", key: "google_badge",         label: "Section Badge",           defaultValue: "We're on Google" },
  { section: "google", key: "google_headline",      label: "Section Headline",        defaultValue: "We're on Google" },
  { section: "google", key: "google_subtext",       label: "Section Subtext",         defaultValue: "At the heart of Cairo where movement never stops and ideas move faster." },
  { section: "google", key: "google_biz_name",      label: "Business Name",           defaultValue: "Dubai in Cairo" },
  { section: "google", key: "google_biz_category",  label: "Business Category",       defaultValue: "Marketing Studios" },
  { section: "google", key: "google_rating",        label: "Rating (number)",         defaultValue: "5.0" },
  { section: "google", key: "google_address",       label: "Address",                 defaultValue: "100 Al-Mirghany Street, Abu Dhabi Bank Building, 1st Floor, Heliopolis, Cairo" },
  { section: "google", key: "google_maps_link",     label: "Google Maps URL",         defaultValue: "https://maps.app.goo.gl/BVYf5XUFXJyoW1gQ9" },
  { section: "google", key: "google_maps_embed",    label: "Maps Embed URL",          defaultValue: "https://maps.google.com/maps?q=Dubai+in+Cairo+Marketing+Studios,+100+El-Sayed+El-Merghany,+Heliopolis,+Cairo,+Egypt&output=embed&z=16" },
  { section: "google", key: "google_cta",           label: "Open Maps Button Text",   defaultValue: "Open in Google Maps" },

  // ── Legal ──
  { section: "legal", key: "legal_subtitle", label: "Section Subtitle", defaultValue: "Registered, Licensed & Ready to Operate" },
  { section: "legal", key: "legal_company_name", label: "Company Name", defaultValue: "Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC" },
  { section: "legal", key: "legal_company_type", label: "Company Type", defaultValue: "A Limited Liability Company" },
  { section: "legal", key: "legal_reg_label", label: "Registration Label", defaultValue: "Commercial Registration" },
  { section: "legal", key: "legal_reg", label: "Registration Number", defaultValue: "163772" },
  { section: "legal", key: "legal_membership_label", label: "Membership Label", defaultValue: "Membership No." },
  { section: "legal", key: "legal_membership", label: "Membership Number", defaultValue: "4568" },
  { section: "legal", key: "legal_tax_label", label: "Tax Label", defaultValue: "Tax Registration" },
  { section: "legal", key: "legal_tax", label: "Tax Number", defaultValue: "168-626-168" },
  { section: "legal", key: "legal_sector_label", label: "Sector Label", defaultValue: "Sector" },
  { section: "legal", key: "legal_sector", label: "Sector Value", defaultValue: "IT & Telecom" },
  { section: "legal", key: "legal_address", label: "Address", defaultValue: "100 Al-Mirghany Street, Abu Dhabi Bank Building, 1st Floor, Heliopolis, Cairo" },

  // ── Contact ──
  { section: "contact", key: "contact_subtitle", label: "Section Subtitle", defaultValue: "Get Started" },
  { section: "contact", key: "contact_headline", label: "Contact Headline", defaultValue: "Ready to Grow? Let's Build Something Real." },
  { section: "contact", key: "contact_subtext", label: "Contact Subtext", defaultValue: "We're committed to delivering the best digital marketing and eCommerce services." },
  { section: "contact", key: "contact_name_label", label: "Name Field Label", defaultValue: "Name *" },
  { section: "contact", key: "contact_name_placeholder", label: "Name Placeholder", defaultValue: "Your name" },
  { section: "contact", key: "contact_email_label", label: "Email Field Label", defaultValue: "Email *" },
  { section: "contact", key: "contact_email_placeholder", label: "Email Placeholder", defaultValue: "you@company.com" },
  { section: "contact", key: "contact_phone_label", label: "Phone Field Label", defaultValue: "Phone (optional)" },
  { section: "contact", key: "contact_phone_placeholder", label: "Phone Placeholder", defaultValue: "+1 234 567 890" },
  { section: "contact", key: "contact_message_label", label: "Message Field Label", defaultValue: "Message *" },
  { section: "contact", key: "contact_message_placeholder", label: "Message Placeholder", defaultValue: "Tell us about your project and goals..." },
  { section: "contact", key: "contact_cta", label: "Submit Button Text", defaultValue: "Start a Project" },
  { section: "contact", key: "contact_success_title", label: "Success Title", defaultValue: "Thank You!" },
  { section: "contact", key: "contact_success_msg", label: "Success Message", defaultValue: "We'll get back to you within 24 hours." },
  { section: "contact", key: "contact_success_btn", label: "Send Another Button", defaultValue: "Send Another Message" },
  { section: "contact", key: "contact_trust_1", label: "Trust Signal 1", defaultValue: "Response within 24 hours" },
  { section: "contact", key: "contact_trust_2", label: "Trust Signal 2", defaultValue: "Free consultation call" },
  { section: "contact", key: "contact_location_1", label: "Location 1", defaultValue: "Cairo, Egypt" },
  { section: "contact", key: "contact_location_2", label: "Location 2", defaultValue: "Dubai, UAE" },

  // ── Footer ──
  { section: "footer", key: "footer_tagline", label: "Footer Tagline", defaultValue: "From Dubai to Cairo, we transferred the scope, the challenges, and the quality." },
  { section: "footer", key: "footer_copyright", label: "Copyright Text", defaultValue: "© 2025 Dubai in Cairo for Digital Marketing & eBusiness Solutions LLC · All Rights Reserved" },

  // ── Careers Page ──
  // Hero
  { section: "careers", key: "careers_hero_badge",      label: "Hero — Badge",           defaultValue: "We're Hiring" },
  { section: "careers", key: "careers_hero_headline_1", label: "Hero — Headline Line 1", defaultValue: "Build the Future of" },
  { section: "careers", key: "careers_hero_headline_2", label: "Hero — Headline Line 2 (gold)", defaultValue: "Marketing with AI" },
  { section: "careers", key: "careers_hero_body",       label: "Hero — Body Text",       defaultValue: "At Dubai in Cairo, we don't just deliver marketing solutions — we engineer growth using data, creativity, and AI-powered innovation. We're looking for ambitious, forward-thinking professionals who operate at the intersection of strategy, creativity, and technology." },
  { section: "careers", key: "careers_hero_pill_1",     label: "Hero — Pill Badge 1",    defaultValue: "✦ AUS Graduates Preferred" },
  { section: "careers", key: "careers_hero_pill_2",     label: "Hero — Pill Badge 2",    defaultValue: "✦ Gulf Experience Required" },
  // Why Join
  { section: "careers", key: "careers_why_badge",           label: "Why Join — Badge",            defaultValue: "Why Dubai in Cairo" },
  { section: "careers", key: "careers_why_headline",        label: "Why Join — Headline",         defaultValue: "More Than a Job." },
  { section: "careers", key: "careers_why_headline_accent", label: "Why Join — Headline (gold)",  defaultValue: "A Career Accelerator." },
  { section: "careers", key: "careers_why_1_title", label: "Why Join Card 1 — Title", defaultValue: "Regional & International Brands" },
  { section: "careers", key: "careers_why_1_desc",  label: "Why Join Card 1 — Desc",  defaultValue: "Work on campaigns that reach audiences across the Middle East and beyond." },
  { section: "careers", key: "careers_why_2_title", label: "Why Join Card 2 — Title", defaultValue: "AI-First Culture" },
  { section: "careers", key: "careers_why_2_desc",  label: "Why Join Card 2 — Desc",  defaultValue: "We deploy AI tools across every workflow — you'll work at the frontier of marketing technology." },
  { section: "careers", key: "careers_why_3_title", label: "Why Join Card 3 — Title", defaultValue: "Real Career Growth" },
  { section: "careers", key: "careers_why_3_desc",  label: "Why Join Card 3 — Desc",  defaultValue: "High-growth environment with mentorship, real ownership, and tangible progression paths." },
  { section: "careers", key: "careers_why_4_title", label: "Why Join Card 4 — Title", defaultValue: "Cutting-Edge Toolkit" },
  { section: "careers", key: "careers_why_4_desc",  label: "Why Join Card 4 — Desc",  defaultValue: "Access to the latest marketing, analytics, and creative technology platforms." },
  // Open Positions
  { section: "careers", key: "careers_jobs_badge",   label: "Open Positions — Badge",   defaultValue: "Open Positions" },
  { section: "careers", key: "careers_jobs_headline", label: "Open Positions — Headline", defaultValue: "Find Your Role" },
  { section: "careers", key: "careers_jobs_subtext",  label: "Open Positions — Subtext", defaultValue: "Click any position to view full details" },
  // Preferred Qualifications (shown inside every job accordion)
  { section: "careers", key: "careers_pref_title", label: "Preferred Quals — Title", defaultValue: "Preferred Qualifications" },
  { section: "careers", key: "careers_pref_1",     label: "Preferred Quals — Item 1", defaultValue: "AUS graduates are preferred" },
  { section: "careers", key: "careers_pref_2",     label: "Preferred Quals — Item 2", defaultValue: "Gulf experience is a must" },
  // How to Apply CTA
  { section: "careers", key: "careers_apply_badge",    label: "How to Apply — Badge",    defaultValue: "How to Apply" },
  { section: "careers", key: "careers_apply_headline", label: "How to Apply — Headline", defaultValue: "Ready to Join Us?" },
  { section: "careers", key: "careers_apply_body",     label: "How to Apply — Body",     defaultValue: "Send your CV and portfolio (if applicable) to our careers inbox. Include the position title and your name in the subject line." },
  { section: "careers", key: "careers_apply_email",    label: "How to Apply — Email",    defaultValue: "careers@dubaicairo.com" },
  { section: "careers", key: "careers_apply_subject",  label: "How to Apply — Subject Hint", defaultValue: "[Position Title] – Your Name" },

  // ── Partnerships page — shared header ──
  { section: "odoo", key: "partnerships_badge",    label: "Page Badge",    defaultValue: "Strategic Partnerships" },
  { section: "odoo", key: "partnerships_headline", label: "Page Headline", defaultValue: "Our Technology Partners" },
  { section: "odoo", key: "partnerships_subtext",  label: "Page Subtext",  defaultValue: "We have built deep implementation expertise across two technology ecosystems — Odoo for ERP and business automation, and Yanolja Cloud for hospitality management." },

  // ── Odoo — Hero ──
  { section: "odoo", key: "odoo_hero_badge",    label: "Hero — Badge",              defaultValue: "ERP Partnership" },
  { section: "odoo", key: "odoo_hero_h1",       label: "Hero — Headline Line 1",    defaultValue: "We are a" },
  { section: "odoo", key: "odoo_hero_h1_accent",label: "Hero — Headline Gold",      defaultValue: "Verified Odoo" },
  { section: "odoo", key: "odoo_hero_h1_end",   label: "Hero — Headline Line 3",    defaultValue: "Partner" },
  { section: "odoo", key: "odoo_hero_body_1",   label: "Hero — Paragraph 1",        defaultValue: "We are now a verified Odoo partner, enabling our clients to operate within a fully integrated, closed-loop ecosystem that connects eCommerce, digital marketing, and backend operations. We believe that impactful marketing cannot exist in isolation — real, scalable results require a robust ERP system that digitally manages and synchronizes all operational processes." },
  { section: "odoo", key: "odoo_hero_body_2",   label: "Hero — Paragraph 2",        defaultValue: "That's why we've established a dedicated Odoo studio, specializing in implementation, customization, and API development, ensuring seamless integration between your business operations and your marketing engine." },
  { section: "odoo", key: "odoo_badge_label",   label: "Logo Card — Badge Label",   defaultValue: "Verified Partner" },

  // ── Odoo — Service Tags (logo card chips) ──
  { section: "odoo", key: "odoo_tag_1", label: "Service Tag 1", defaultValue: "ERP Architecture & Solution Design" },
  { section: "odoo", key: "odoo_tag_2", label: "Service Tag 2", defaultValue: "Training & Enablement Programs" },
  { section: "odoo", key: "odoo_tag_3", label: "Service Tag 3", defaultValue: "Business Analysis & Process Re-engineering" },
  { section: "odoo", key: "odoo_tag_4", label: "Service Tag 4", defaultValue: "Data Migration & Structuring" },
  { section: "odoo", key: "odoo_tag_5", label: "Service Tag 5", defaultValue: "Go-Live Support & Change Management" },
  { section: "odoo", key: "odoo_tag_6", label: "Service Tag 6", defaultValue: "Performance Optimization & Audits" },
  { section: "odoo", key: "odoo_tag_7", label: "Service Tag 7", defaultValue: "Reporting & BI Dashboards" },
  { section: "odoo", key: "odoo_tag_8", label: "Service Tag 8", defaultValue: "Productization & Module Development" },

  // ── Odoo — Suites section header ──
  { section: "odoo", key: "odoo_suites_badge",    label: "Suites — Badge",           defaultValue: "Odoo Studio" },
  { section: "odoo", key: "odoo_suites_h2",       label: "Suites — Headline",        defaultValue: "Nine Integrated Suites." },
  { section: "odoo", key: "odoo_suites_h2_accent",label: "Suites — Headline (gold)", defaultValue: "One Unified Platform." },

  // ── Odoo — 9 Suites ──
  { section: "odoo", key: "odoo_suite_1_title", label: "Suite 1 — Title",       defaultValue: "Odoo eCommerce & Website Suite" },
  { section: "odoo", key: "odoo_suite_1_desc",  label: "Suite 1 — Description", defaultValue: "The Odoo eCommerce & Website Suite provides a fully integrated platform to build, manage, and scale online stores and websites, seamlessly connected with backend operations such as inventory, sales, and customer data—making it the core foundation for any digital commerce strategy." },
  { section: "odoo", key: "odoo_suite_2_title", label: "Suite 2 — Title",       defaultValue: "Odoo Marketing Automation Suite" },
  { section: "odoo", key: "odoo_suite_2_desc",  label: "Suite 2 — Description", defaultValue: "The Odoo Marketing Suite empowers businesses to design, automate, and analyze multi-channel campaigns—including email, SMS, and social marketing—turning traffic into conversions through data-driven engagement and lifecycle automation." },
  { section: "odoo", key: "odoo_suite_3_title", label: "Suite 3 — Title",       defaultValue: "Odoo Sales & CRM Suite" },
  { section: "odoo", key: "odoo_suite_3_desc",  label: "Suite 3 — Description", defaultValue: "The Odoo Sales & CRM Suite manages the full customer journey from lead acquisition to deal closure, enabling precise pipeline tracking, customer segmentation, and revenue forecasting—critical for aligning marketing efforts with actual sales outcomes." },
  { section: "odoo", key: "odoo_suite_4_title", label: "Suite 4 — Title",       defaultValue: "Odoo Inventory & Supply Chain Suite" },
  { section: "odoo", key: "odoo_suite_4_desc",  label: "Suite 4 — Description", defaultValue: "The Odoo Inventory & Supply Chain Suite ensures real-time stock visibility and efficient order fulfillment, directly impacting customer experience, delivery performance, and the scalability of eCommerce operations." },
  { section: "odoo", key: "odoo_suite_5_title", label: "Suite 5 — Title",       defaultValue: "Odoo Accounting Suite" },
  { section: "odoo", key: "odoo_suite_5_desc",  label: "Suite 5 — Description", defaultValue: "The Odoo Accounting Suite provides real-time financial tracking, invoicing, and reconciliation, enabling accurate measurement of marketing ROI, profitability, and overall business performance." },
  { section: "odoo", key: "odoo_suite_6_title", label: "Suite 6 — Title",       defaultValue: "Odoo POS & Retail Suite" },
  { section: "odoo", key: "odoo_suite_6_desc",  label: "Suite 6 — Description", defaultValue: "The Odoo POS & Retail Suite connects offline and online sales channels, creating an omnichannel experience where customer data, inventory, and transactions are fully synchronized." },
  { section: "odoo", key: "odoo_suite_7_title", label: "Suite 7 — Title",       defaultValue: "Odoo Project & Services Suite" },
  { section: "odoo", key: "odoo_suite_7_desc",  label: "Suite 7 — Description", defaultValue: "The Odoo Project Suite supports execution and delivery of digital services, campaigns, and internal workflows, ensuring structured project management and operational efficiency." },
  { section: "odoo", key: "odoo_suite_8_title", label: "Suite 8 — Title",       defaultValue: "Odoo HR & Workforce Suite" },
  { section: "odoo", key: "odoo_suite_8_desc",  label: "Suite 8 — Description", defaultValue: "The Odoo HR Suite manages recruitment, performance, and team operations, supporting the human infrastructure behind marketing, sales, and eCommerce execution." },
  { section: "odoo", key: "odoo_suite_9_title", label: "Suite 9 — Title",       defaultValue: "Odoo Manufacturing Suite" },
  { section: "odoo", key: "odoo_suite_9_desc",  label: "Suite 9 — Description", defaultValue: "The Odoo Manufacturing Suite enables production planning and control, becoming relevant in eCommerce businesses that rely on in-house manufacturing or custom product workflows." },

  // ── Odoo — CTA ──
  { section: "odoo", key: "odoo_cta_badge", label: "CTA — Badge",    defaultValue: "Start the Conversation" },
  { section: "odoo", key: "odoo_cta_h2",    label: "CTA — Headline", defaultValue: "Ready to Build Your Integrated Ecosystem?" },
  { section: "odoo", key: "odoo_cta_body",  label: "CTA — Body",     defaultValue: "Let's connect your marketing engine to a fully synchronized ERP backend. Our Odoo studio handles everything from initial scoping to go-live." },
  { section: "odoo", key: "odoo_cta_btn",   label: "CTA — Button",   defaultValue: "Get in Touch" },

  // ── Yanolja — Hero ──
  { section: "yanolja", key: "yan_hero_badge",    label: "Hero — Badge",           defaultValue: "Hospitality Technology" },
  { section: "yanolja", key: "yan_hero_h2",       label: "Hero — Headline",        defaultValue: "Yanolja Cloud" },
  { section: "yanolja", key: "yan_hero_h2_accent",label: "Hero — Headline (gold)", defaultValue: "Partnership" },
  { section: "yanolja", key: "yan_hero_body",     label: "Hero — Paragraph",       defaultValue: "We have also expanded our capabilities into the hospitality technology sector through our work with Yanolja Cloud and its suite of cloud-based management solutions. Over the past 12 months, we have built extensive hands-on experience implementing and integrating these systems across hospitality properties in Saudi Arabia, enabling fully digital, streamlined operations aligned with modern guest experiences. This practical exposure has positioned us as specialized implementors in hospitality tech, and we are now actively scaling these capabilities into new markets beyond Saudi Arabia." },
  { section: "yanolja", key: "yan_badge_label",   label: "Logo Card — Badge Label",defaultValue: "Specialized Implementor" },

  // ── Yanolja — Tags ──
  { section: "yanolja", key: "yan_tag_1", label: "Tag 1", defaultValue: "12 Months Hands-On Experience" },
  { section: "yanolja", key: "yan_tag_2", label: "Tag 2", defaultValue: "Saudi Arabia Market" },
  { section: "yanolja", key: "yan_tag_3", label: "Tag 3", defaultValue: "Cloud-Based Implementation" },
  { section: "yanolja", key: "yan_tag_4", label: "Tag 4", defaultValue: "Hospitality Tech Integration" },

  // ── Yanolja — Suites section header ──
  { section: "yanolja", key: "yan_suites_badge",    label: "Suites — Badge",           defaultValue: "eZee Suite" },
  { section: "yanolja", key: "yan_suites_h2",       label: "Suites — Headline",        defaultValue: "Eight Integrated Solutions." },
  { section: "yanolja", key: "yan_suites_h2_accent",label: "Suites — Headline (gold)", defaultValue: "One Hospitality Platform." },

  // ── Yanolja — 8 Products ──
  { section: "yanolja", key: "yan_suite_1_title", label: "Product 1 — Title",       defaultValue: "eZee Absolute (Cloud PMS)" },
  { section: "yanolja", key: "yan_suite_1_desc",  label: "Product 1 — Description", defaultValue: "eZee Absolute is a comprehensive cloud-based Property Management System that centralizes all hotel operations—from reservations and front office to housekeeping, billing, and reporting—enabling properties to operate efficiently through a single, fully integrated digital platform." },
  { section: "yanolja", key: "yan_suite_2_title", label: "Product 2 — Title",       defaultValue: "eZee Centrix (Channel Manager)" },
  { section: "yanolja", key: "yan_suite_2_desc",  label: "Product 2 — Description", defaultValue: "eZee Centrix is a real-time channel management solution that connects hospitality properties to global OTAs, synchronizing rates and inventory across all platforms to eliminate overbookings, maintain rate parity, and maximize online visibility." },
  { section: "yanolja", key: "yan_suite_3_title", label: "Product 3 — Title",       defaultValue: "eZee Reservation (Booking Engine)" },
  { section: "yanolja", key: "yan_suite_3_desc",  label: "Product 3 — Description", defaultValue: "eZee Reservation is a direct booking engine that empowers hotels to capture commission-free reservations through their own website, offering a seamless user experience fully synchronized with live availability and pricing." },
  { section: "yanolja", key: "yan_suite_4_title", label: "Product 4 — Title",       defaultValue: "Central Reservation System (CRS)" },
  { section: "yanolja", key: "yan_suite_4_desc",  label: "Product 4 — Description", defaultValue: "The Central Reservation System acts as a unified control layer for managing bookings, rates, and inventory across multiple properties and channels, ensuring consistency, scalability, and centralized operational control." },
  { section: "yanolja", key: "yan_suite_5_title", label: "Product 5 — Title",       defaultValue: "eZee Optimus (Restaurant POS)" },
  { section: "yanolja", key: "yan_suite_5_desc",  label: "Product 5 — Description", defaultValue: "eZee Optimus is a cloud-based POS solution designed for hospitality F&B operations, streamlining order management, billing, and reporting while seamlessly integrating with the PMS for a unified guest experience." },
  { section: "yanolja", key: "yan_suite_6_title", label: "Product 6 — Title",       defaultValue: "Hotel Website Builder" },
  { section: "yanolja", key: "yan_suite_6_desc",  label: "Product 6 — Description", defaultValue: "The Hotel Website Builder is a purpose-built platform for creating high-performance hospitality websites, combining modern design, SEO optimization, and direct booking capabilities to strengthen digital presence and increase direct revenue." },
  { section: "yanolja", key: "yan_suite_7_title", label: "Product 7 — Title",       defaultValue: "Revenue Management System (RMS)" },
  { section: "yanolja", key: "yan_suite_7_desc",  label: "Product 7 — Description", defaultValue: "The Revenue Management System leverages data-driven insights and demand forecasting to dynamically optimize pricing strategies, helping properties maximize occupancy, revenue, and overall profitability." },
  { section: "yanolja", key: "yan_suite_8_title", label: "Product 8 — Title",       defaultValue: "Payment Solutions" },
  { section: "yanolja", key: "yan_suite_8_desc",  label: "Product 8 — Description", defaultValue: "Integrated payment solutions enable secure, seamless transactions across all touchpoints—from online bookings to on-site billing—ensuring efficient financial operations and a frictionless guest payment experience." },

  // ── Yanolja — CTA ──
  { section: "yanolja", key: "yan_cta_badge", label: "CTA — Badge",    defaultValue: "Scale Your Hospitality Tech" },
  { section: "yanolja", key: "yan_cta_h2",    label: "CTA — Headline", defaultValue: "Ready to Digitize Your Hospitality Operations?" },
  { section: "yanolja", key: "yan_cta_body",  label: "CTA — Body",     defaultValue: "Our hospitality tech team brings 12 months of hands-on implementation experience across Saudi Arabia. Let's bring that expertise to your property." },
  { section: "yanolja", key: "yan_cta_btn",   label: "CTA — Button",   defaultValue: "Get in Touch" },
];
