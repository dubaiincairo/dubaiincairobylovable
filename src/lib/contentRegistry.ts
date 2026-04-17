// Central registry of ALL editable content keys on the website.
// The admin panel uses this as source of truth — fields appear even if not yet in DB.

export interface ContentField {
  section: string;
  key: string;
  label: string;
  defaultValue: string;
}

export const sectionOrder = [
  "nav", "hero", "stats", "about", "edges", "values", "services",
  "founder", "clients", "tech", "google", "legal", "contact", "footer",
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
};

export const contentRegistry: ContentField[] = [
  // ── Nav ──
  { section: "nav", key: "nav_brand_1", label: "Brand Word 1", defaultValue: "Dubai" },
  { section: "nav", key: "nav_brand_2", label: "Brand Word 2 (connector)", defaultValue: "in" },
  { section: "nav", key: "nav_brand_3", label: "Brand Word 3", defaultValue: "Cairo" },
  { section: "nav", key: "nav_link_1", label: "Nav Link 1", defaultValue: "About" },
  { section: "nav", key: "nav_link_2", label: "Nav Link 2", defaultValue: "Services" },
  { section: "nav", key: "nav_link_3", label: "Nav Link 3", defaultValue: "Our Work" },
  { section: "nav", key: "nav_link_4", label: "Nav Link 4", defaultValue: "Team" },
  { section: "nav", key: "nav_link_5", label: "Nav Link 5", defaultValue: "Contact" },
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
];
