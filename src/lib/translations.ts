// Arabic translations of the keys in `src/lib/contentRegistry.ts`.
//
// Workflow:
//   1. useSiteContent.get(key, fallback) checks the current locale
//      (via LocaleContext). When locale === "ar", it consults this dict
//      first. If a non-empty Arabic value exists, it wins over Supabase
//      and Sanity. Otherwise it falls through to the existing chain.
//   2. Only keys that need translation are listed. Brand fragments,
//      partner names ("Odoo", "Zoho"), phone numbers, registration
//      numbers, and stat *values* (numbers like "216+", "+34% ↑") stay
//      in their canonical form.
//   3. Future pages: append their key translations to the same map. No
//      structural change needed.
//
// Tone notes:
//   - GCC-friendly Modern Standard Arabic, kept warm and direct.
//   - Western numerals are used throughout (preferred in modern GCC
//     business/marketing contexts).

export const arabicTranslations: Record<string, string> = {
  // ──────────────── Navigation ────────────────
  nav_brand_1: "دبي",
  nav_brand_2: "في",
  nav_brand_3: "القاهرة",
  nav_link_home: "الرئيسية",
  nav_link_services: "خدماتنا",
  nav_link_studios: "الاستوديوهات",
  nav_link_tech: "التقنيات",
  nav_link_faq: "الأسئلة الشائعة",
  nav_link_company: "الشركة",
  nav_link_careers: "الوظائف",
  nav_link_investors: "المستثمرون",
  nav_link_partnerships: "الشراكات",
  nav_cta: "ابدأ الآن",

  // ──────────────── Hero ────────────────
  hero_tagline: "جودة دبي · امتداد القاهرة",
  hero_headline: "نموٌّ تقوده البيانات. نجاحٌ يقوده العلم.",
  hero_subheadline:
    "نُساعد الشركات الطموحة على النمو عبر الإنترنت — بأنظمةٍ مُجرَّبة، ونتائج قابلة للقياس، والتزامٍ بأن نصنع الفرق.",
  hero_cta_primary: "اكتشف خدماتنا",
  hero_cta_secondary: "تحدّث مع فريقنا",
  hero_card_label: "تحليلات النمو",
  hero_card_sublabel: "مشروع منجز",
  hero_float_1_label: "تقييم جوجل",
  hero_float_2_label: "عميل سعيد",
  hero_float_3_value: "5 سنوات",
  hero_float_3_label: "في السوق",
  hero_float_4_label: "رقمي بالكامل",

  // ──────────────── Stats ────────────────
  stat_projects_label: "مشروع ناجح",
  stat_clients_label: "عميل خدمناه",
  stat_years_label: "سنوات من النمو",
  stat_digital_label: "تشغيل رقمي",

  // ──────────────── About ────────────────
  about_subtitle: "من نحن",
  about_headline: "وكالة رقمية مبنيّة على العلم، لا على التخمين",
  about_body:
    "تأسّست «دبي في القاهرة» عام 2021، وهي وكالةٌ مقرّها القاهرة متخصّصة في التسويق الرقمي وحلول الأعمال الإلكترونية للشركات الطموحة في مصر والشرق الأوسط.",
  about_step_1_title: "الاستراتيجية والبحث",
  about_step_1_desc:
    "نبدأ بالبيانات — ندرس السوق والمنافسين والجمهور المستهدف قبل كتابة أيّ رسالة تسويقية أو إطلاق أيّ حملة.",
  about_step_2_title: "البناء والتنفيذ",
  about_step_2_desc:
    "كلّ قناة، وكلّ تصميم، وكلّ نظام يُبنى بدقّة — مصمَّمٌ ليعمل كمحرّك نموٍّ واحدٍ متكامل، لا تجاربَ متفرّقة.",
  about_step_3_title: "التحسين والتوسيع",
  about_step_3_desc:
    "اختبارٌ مستمر، وتحليلاتٌ لحظية، وتركيزٌ دقيق على ما يصنع الفارق. حين ينجح شيءٌ ما، نُوسّعه بسرعة.",

  // ──────────────── Why We're Different ────────────────
  edges_subtitle: "ما يميّزنا",
  edges_headline: "طريقةٌ أذكى لتنمية أعمالك عبر الإنترنت",
  edge_1_title: "عملياتٌ مدعومة بالذكاء",
  edge_1_desc:
    "نستفيد من أحدث أدوات الذكاء الاصطناعي ونظامِ إدارةٍ إلكتروني صارم لتبسيط سير العمل. وبدمج التقنيات الناشئة مع التتبّع المؤتمت، نُقدّم مشاريع عالية الجودة بسرعةٍ أكبر، ولا يفوتنا أيّ تفصيل.",
  edge_2_title: "خبرةٌ عالمية نخبوية",
  edge_2_desc:
    "يربطك نموذجنا الفريد بشبكةٍ مختارة من أكثر من 80 متخصّصًا للمشاريع في مجالات التسويق الرقمي والتجارة الإلكترونية. هذا الهيكل المرن يُتيح لنا الحفاظ على جودةٍ بمستوى الخبراء مع إبقاء التكلفة رشيدة — كفاءاتٌ عُليا دون أعباء الوكالات التقليدية.",
  edge_3_title: "قيمةٌ مرتبطة بالأداء",
  edge_3_desc:
    "نؤمن بالشفافية الكاملة، من تسعيرنا التنافسي إلى تقاريرنا المدعومة بالبيانات. كلّ مبادرة مرتبطة بمؤشّرات أداءٍ واضحة ورؤى قابلة للتنفيذ، ونمرّر إليك التوفير التشغيلي مباشرةً مع إبقائك على اطّلاعٍ دقيق بكيفية تحقيق استثمارك للنمو.",

  // ──────────────── What We Stand For ────────────────
  values_subtitle: "ما نؤمن به",
  values_headline: "مبادئُ تُشكّل منهجنا",
  value_1_title: "الوضوح أساسٌ لكلّ شيء",
  value_1_desc:
    "نؤمن بأنّ التسويق المؤثّر يُبنى على وضوح الفكرة وفهمٍ مشترك. عبر التواصل المفتوح والمواءمة المستمرّة حول أهدافك الجوهرية، نضمن أن كلّ استراتيجيةٍ تنطلق من أساسٍ من الصدق والشفافية.",
  value_2_title: "شركاء، لا مقدّمي خدمات",
  value_2_desc:
    "أعمقُ النتائج تأتي من شراكةٍ حقيقية، لا من تقديم خدمةٍ بصيغة معاملة. فلسفتنا أن نندمج بعمقٍ في رؤيتك. لا نُنفّذ مهامًا فحسب — بل نتحمّل مسؤوليةً شخصية ومُشتركة عن نموّك المستدام.",
  value_3_title: "التطوّر بمرونة",
  value_3_desc:
    "النموّ المستدام يتطلّب ثقافةَ اختبارٍ وتكيّفٍ وقبولٍ للتغيير. حين نُقدّر القدرة على استكشاف قنواتٍ جديدة ومواكبة اتجاهات السوق المتغيّرة، نحتفظ بمساحةٍ كافية لتوسيع ما يعمل وتنقيح ما لا يعمل بذكاء.",

  // ──────────────── Founder ────────────────
  founder_subtitle: "كلمةٌ من المؤسّس",
  founder_headline: "بُنيت على يد من خاض التجربة من الميدان.",
  founder_body:
    "أسّس الفولي «دبي في القاهرة» انطلاقًا من رؤيةٍ جريئة: عالمٌ رقمي حافلٌ بالفرص، وإيمانٌ بقدرة التكنولوجيا على إعادة تشكيل طريقة عمل الشركات ونموّها.",
  founder_quote:
    "أؤمن بأنّ التعلّم المتواصل هو مفتاح النجاح في الأعمال. لذلك أنهيت أكثر من 50 دورةً متخصّصة في الأعمال الإلكترونية، ولن أتوقّف عن التطوّر، ولن نتوقّف نحن أيضًا.",
  founder_attribution: "— عبد الله حسن الفولي، الرئيس التنفيذي والشريك المؤسّس",
  founder_cta_label: "احجز استشارة",

  // ──────────────── Clients ────────────────
  clients_subtitle: "شركاء النجاح",
  clients_headline: "ثقةُ علاماتٍ تجاريةٍ ذات وزن",
  clients_description:
    "من شركات الأدوية العالمية إلى أبرز العلامات المحليّة المحبوبة.",

  // ──────────────── Testimonials ────────────────
  testimonials_subtitle: "ما يقوله العملاء",
  testimonials_headline: "ثقةُ القادة.\nتزكيةُ الأقران.",
  testimonials_subtext:
    "توصياتٌ حقيقية من عملاء وزملاء — مأخوذةٌ مباشرةً من لينكدإن.",

  // ──────────────── Tech Stack Teaser ────────────────
  tech_subtitle: "منظومتنا التقنية",
  tech_headline: "حلولٌ متكاملة. أدواتٌ مُجرَّبة.",
  tech_teaser_desc:
    "41 أداةً رائدة في مجالها عبر 3 طبقاتٍ ذكية — مُصمَّمةٌ لقيادة النموّ والعمليات والابتكار.",

  // ──────────────── Legal Strip (Bank Accounts panel) ────────────────
  legal_subtitle: "مُسجَّلة ومُرخّصة وجاهزة للعمل",
  legal_company_name:
    "شركة دبي في القاهرة للتسويق الرقمي وحلول الأعمال الإلكترونية ش.ذ.م.م",
  legal_reg_label: "السجل التجاري",
  legal_membership_label: "غرفة تكنولوجيا المعلومات والاتصالات",
  legal_tax_label: "البطاقة الضريبية",
  legal_sector_label: "القطاع المُرخَّص",
  legal_sector: "حلول الأعمال الإلكترونية",

  // ──────────────── Contact Section ────────────────
  contact_subtitle: "ابدأ الآن",
  contact_headline: "جاهزٌ للنموّ؟\nلنبني معًا.",
  contact_subtext:
    "نلتزم بتقديم أفضل خدمات التسويق الرقمي والتجارة الإلكترونية بأثرٍ قابل للقياس، وتنفيذٍ مرن، وأسعارٍ تنافسية.",
  contact_trust_1: "ردٌّ خلال 24 ساعة",
  contact_trust_2: "استشارة مجانية",
  contact_trust_3: "تسعيرٌ شفّاف",
  contact_name_label: "الاسم *",
  contact_name_placeholder: "اسمك الكامل",
  contact_email_label: "البريد الإلكتروني *",
  contact_email_placeholder: "you@company.com",
  contact_phone_label: "رقم الجوال *",
  contact_phone_placeholder: "100 000 0000",
  contact_service_label: "الخدمة المطلوبة",
  contact_message_label: "الرسالة *",
  contact_message_placeholder: "أخبرنا عن مشروعك وأهدافك...",
  contact_cta: "ابدأ مشروعك",
  contact_success_title: "شكرًا لك!",
  contact_success_msg: "سنتواصل معك خلال 24 ساعة.",
  contact_success_btn: "إرسال رسالة أخرى",
  contact_modal_title: "لنبني معًا",

  // ──────────────── Google Business Card ────────────────
  google_biz_name: "دبي في القاهرة",
  google_biz_category: "وكالة تسويق رقمي",
  google_address: "100 شارع الميرغني، مصر الجديدة، القاهرة",
  google_cta: "اعرض على خرائط جوجل",

  // ──────────────── Footer ────────────────
  footer_tagline:
    "من دبي إلى القاهرة، نقلنا الرؤية، والتحدّيات، والجودة.",
  footer_explore_label: "تصفّح",
  footer_partnerships_label: "الشراكات",
  footer_copyright:
    "© 2025 شركة دبي في القاهرة للتسويق الرقمي وحلول الأعمال الإلكترونية ش.ذ.م.م · جميع الحقوق محفوظة",

  // ──────────────── WhatsApp Chat Widget ────────────────
  wa_teaser_title: "👋 مرحبًا! هل نبدأ محادثة؟",
  wa_teaser_cta: "اضغط للمحادثة ←",
  wa_header_name: "دبي في القاهرة",
  wa_header_status: "نردّ عادةً خلال ساعة",
  wa_opener_text: "👋 أهلًا بك! كيف يمكننا مساعدتك اليوم؟",
  wa_opener_hint: "اختر من القائمة أدناه",
  wa_reply_1_label: "أودّ مناقشة مشروع",
  wa_reply_1_message: "مرحبًا! أودّ مناقشة مشروع مع فريقكم.",
  wa_reply_2_label: "أحتاج استشارة مجانية",
  wa_reply_2_message: "مرحبًا! أودّ حجز استشارة مجانية مدّتها 30 دقيقة.",
  wa_reply_3_label: "لديّ سؤال سريع",
  wa_reply_3_message: "مرحبًا! لديّ سؤال حول خدماتكم.",
  wa_reply_4_label: "أبحث عن شراكة",
  wa_reply_4_message: "مرحبًا! أرغب في استكشاف شراكة مع دبي في القاهرة.",
  wa_footer_note: "تفتح كل خيار محادثة واتساب مع الرسالة جاهزة للإرسال",

  // ──────────────── SEO ────────────────
  seo_home_title:
    "دبي في القاهرة — وكالة تسويق رقمي وأعمال إلكترونية في القاهرة، مصر",
  seo_home_description:
    "دبي في القاهرة هي الوكالة الرائدة في القاهرة للتسويق الرقمي وحلول الأعمال الإلكترونية. نقدّم نموًّا قائمًا على البيانات، وتجارة إلكترونية، وعلامات تجارية، وحلول Odoo ERP في مصر والشرق الأوسط.",
};

/**
 * Lookup helper — returns undefined when the key isn't translated, so
 * callers can fall through to the existing English source chain.
 */
export const getTranslation = (locale: string, key: string): string | undefined => {
  if (locale !== "ar") return undefined;
  return arabicTranslations[key];
};
