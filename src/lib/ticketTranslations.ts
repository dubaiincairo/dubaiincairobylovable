export const ticketTranslations = {
  en: {
    portalBadge: "Executive Support & Operations Desk",
    portalTitle: "Partner & Client Portal",
    portalSubtitle: "Select an operational workflow below to submit client support tickets or log freelancer work hours.",
    systemsStatusLive: "Support Desk Online · Normal Operations",
    tabTickets: "Client Support Tickets",
    tabTicketsSub: "Submit tickets for Odoo, eZee & Ozoo",
    tabWorksheet: "Freelancer Worksheet",
    tabWorksheetSub: "Weekly time tracking & task logs",
    myTicketsBtn: "My Recent Tickets",

    // System selection
    selectSystemTitle: "1. Select Affected Software Platform",
    selectSystemDesc: "Choose the exact platform experiencing the incident or requiring assistance.",
    
    // Quick Templates
    quickTemplatesTitle: "Quick Issue Templates (Click to Auto-Fill):",
    templateFolioSyncTitle: "[Sync] Folio Not Posting to Odoo",
    templateFolioSyncDesc: `Incident Summary: Folio failed to post from eZee to Odoo automatically.
• Steps to reproduce: Completed guest checkout in eZee PMS for Folio #...
• Expected result: Folio journal entry created in Odoo within 60 seconds.
• Actual result: Folio status remains pending; error message: "Sync timeout / Connector validation error".`,
    
    templateVatCalcTitle: "[Invoicing] VAT & Tax Calculation Mismatch",
    templateVatCalcDesc: `Incident Summary: Tax calculation discrepancy between PMS invoice and Odoo fiscal position.
• Steps to reproduce: Generated final bill with 15% VAT for Room #...
• Expected result: Exact match between eZee total invoice and Odoo draft invoice.
• Actual result: Discrepancy of ... SAR observed in tax subtotal.`,
    
    templateRoomRateTitle: "[Rates] Room Rate or Availability Discrepancy",
    templateRoomRateDesc: `Incident Summary: Rates or inventory updated in channel manager not reflected in PMS.
• Steps to reproduce: Updated rate plan for Deluxe Suites across dates ...
• Expected result: Available rooms updated instantly on all portals.
• Actual result: Closed dates still accepting bookings / rates showing legacy pricing.`,

    templateGuestCheckinTitle: "[eZee PMS] Frontdesk Guest Check-in Error",
    templateGuestCheckinDesc: `Incident Summary: Frontdesk staff unable to process guest check-in.
• Steps to reproduce: Clicked Check-in button on Reservation #...
• Expected result: Keycard encoded and folio activated.
• Actual result: Screen froze with loading spinner / error popup.`,

    // Branch selection
    branchTitle: "2. Hotel / Business Branch",
    branchDesc: "Select the operational branch or property affected.",
    quickBranchLabel: "Quick Select:",
    branchSelectPlaceholder: "Select branch location...",
    customBranchPlaceholder: "Enter custom branch or facility name...",

    // URL & Context
    urlTitle: "3. Incident URL or Screen Location",
    urlPlaceholder: "https://erp.swissbluehotels.com/web#menu_id=... or screen link",
    urlHelper: "Paste the exact browser link or screen path where the issue occurred.",
    pasteUrlBtn: "Paste from Clipboard",
    validUrlBadge: "Valid URL format",

    // Priority
    priorityTitle: "4. Incident Priority & SLA",
    priorityNormal: "Normal",
    priorityNormalDesc: "Routine inquiry or minor question (SLA: 24-48h)",
    priorityMedium: "Medium",
    priorityMediumDesc: "Operational impact with workaround (SLA: 12-24h)",
    priorityHigh: "High",
    priorityHighDesc: "Major workflow blocked / partial outage (SLA: 4-8h)",
    priorityCritical: "Critical Blocker",
    priorityCriticalDesc: "System down / check-in stopped / total blocker (SLA: < 2h)",

    // Title & Description
    ticketSummaryTitle: "5. Ticket Summary & Full Description",
    ticketSummaryPlaceholder: "e.g. Invoices failing to synchronize from eZee to Odoo after checkout",
    descPlaceholder: `Please describe the incident in detail:
• What were you doing when the issue occurred?
• What was the expected result?
• What actually happened? (Include any error codes or messages shown)`,
    charCount: "characters",

    // Attachments
    attachmentsTitle: "6. Attachments (Screenshots & Video Recording)",
    attachmentsDesc: "Visual proof accelerates issue diagnosis and resolution.",
    screenshotLabel: "Upload Screenshot (PNG, JPG, WebP)",
    screenshotDragActive: "Drop screenshot here...",
    screenshotPrompt: "Drag & drop screenshot here, or click to browse",
    screenshotSubtext: "Supported: JPG, PNG, WebP (Max 10MB) — Tip: Press ⌘+V to paste directly from clipboard",
    pastedScreenshotSuccess: "Screenshot captured from clipboard!",
    tabVideoFile: "Upload Video File",
    tabLoomLink: "Paste Cloud / Loom Link",
    screenRecordingLabel: "Screen Recording (Video File or Loom Link)",
    videoUploadPrompt: "Upload video file (MP4, WebM, MOV)",
    videoUploadSubtext: "Drag & drop or click to upload (Max 50MB)",
    orPasteLoom: "Paste Loom / Google Drive / CleanShot Link",
    loomPlaceholder: "https://www.loom.com/share/... or Google Drive URL",
    removeFile: "Remove file",

    // Submitter Info
    submitterTitle: "7. Submitter Contact Information",
    submitterDesc: "We will send status updates and ticket notifications to this address.",
    nameLabel: "Your Full Name *",
    namePlaceholder: "e.g. Ahmed Al-Mansoor",
    emailLabel: "Work Email Address *",
    emailPlaceholder: "name@swissbluehotels.com",
    phoneLabel: "Phone / WhatsApp Number (Optional)",
    phonePlaceholder: "+966 50 123 4567",
    rememberMeLabel: "Remember my contact details on this device for future tickets",

    // Actions
    submitBtn: "Submit Support Ticket",
    submittingBtn: "Submitting & Dispatched Alerts...",
    shortcutHint: "Press ⌘ + Enter to submit",

    // Alerts & Notifications
    errorSystem: "Please select an affected system (Odoo, eZee, or Ozoo).",
    errorBranch: "Please select or enter the branch location.",
    errorTitle: "Please enter a brief ticket summary.",
    errorDesc: "Please provide a detailed description of the issue.",
    errorEmail: "Please provide a valid work email address for notifications.",
    errorName: "Please enter your name.",

    // Success Modal
    successHeading: "Ticket Submitted Successfully!",
    successSubheading: "Your incident has been logged and high-priority notifications have been sent.",
    ticketIdLabel: "Official Ticket ID",
    copyTicketId: "Copy ID",
    copied: "Copied!",
    notificationSentNote: "Confirmation email and SMS/Webhook dispatched to technical lead and your inbox.",
    estimatedSla: "Guaranteed Response SLA",
    whatsappAction: "Notify via Direct WhatsApp",
    copySummaryBtn: "Copy Ticket Summary",
    copiedSummary: "Summary Copied to Clipboard!",
    submitAnother: "Submit Another Ticket",
    closeModal: "Done",

    // Timeline Steps
    stepTimeline1: "Ticket Logged",
    stepTimeline1Sub: "Recorded in system",
    stepTimeline2: "Team Dispatched",
    stepTimeline2Sub: "On-call alerts sent",
    stepTimeline3: "Diagnostics",
    stepTimeline3Sub: "Replicating error",
    stepTimeline4: "Resolved",
    stepTimeline4Sub: "Fix verified",

    // History Modal
    historyTitle: "My Submitted Tickets",
    historyEmpty: "No tickets recorded on this device yet.",
    historyFilterAll: "All Platforms",
    historyBranch: "Branch:",
    historyUrl: "URL:",
    historyPriority: "Priority:",
    historyStatus: "Status:",
    historyDate: "Submitted on:",
  },
  ar: {
    portalBadge: "منظومة الدعم الفني والعمليات التنفيذية",
    portalTitle: "بوابة الشركاء والعملاء التنفيذية",
    portalSubtitle: "حدد نوع المعاملة المطلوبة أدناه لرفع تذاكر الدعم الفني للعملاء أو تسجيل ساعات إنجاز المستقلين.",
    systemsStatusLive: "فريق الدعم الفني متصل · العمليات منتظمة",
    tabTickets: "تذاكر الدعم الفني للعملاء",
    tabTicketsSub: "رفع ومتابعة تذاكر أودو وإيزي وأوزو",
    tabWorksheet: "سجل أعمال المستقلين",
    tabWorksheetSub: "جدول تتبع الساعات وإنجاز المهام الأسبوعي",
    myTicketsBtn: "تذاكري السابقة",

    // System selection
    selectSystemTitle: "1. حدد النظام البرمجي المعني بالطلب",
    selectSystemDesc: "اختر المنظومة أو الواجهة التي حدثت بها المشكلة أو تحتاج إلى دعم فني متخصص.",

    // Quick Templates
    quickTemplatesTitle: "نماذج سريعة لمشاكل شائعة (اضغط للتعبئة التلقائية):",
    templateFolioSyncTitle: "[مزامنة] عدم ترحيل الفاتورة إلى أودو",
    templateFolioSyncDesc: `ملخص البلاغ: فشل الترحيل التلقائي للفاتورة من نظام إيزي إلى أودو بعد إجراء المغادرة.
• خطوات الحدوث: تم إتمام عملية تسجيل المغادرة في نظام إيزي للفاتورة رقم #...
• النتيجة المتوقعة: إنشاء قيد وفاتورة مسودة في أودو خلال 60 ثانية.
• ما حدث فعلياً: ظلت حالة الفاتورة معلقة وظهر تنبيه يفيد بـ "Sync timeout / خطأ في مطابقة الحسابات".`,

    templateVatCalcTitle: "[فواتير] خطأ في احتساب ضريبة القيمة المضافة",
    templateVatCalcDesc: `ملخص البلاغ: عدم تطابق احتساب الضريبة (15%) بين الفاتورة في نظام الفندق وإشعار أودو.
• خطوات الحدوث: إصدار فاتورة الحساب النهائي للغرفة رقم #...
• النتيجة المتوقعة: تطابق تام لإجمالي الضريبة بين النظامين.
• ما حدث فعلياً: وجود فارق في خانة الضريبة بمقدار ... ريال.`,

    templateRoomRateTitle: "[أسعار] عدم تطابق أسعار الغرف أو التوافر",
    templateRoomRateDesc: `ملخص البلاغ: تحديث التوافر أو الأسعار في مدير القنوات لم ينعكس في نظام الفندق.
• خطوات الحدوث: تعديل خطة أسعار الأجنحة للفترة من ... إلى ...
• النتيجة المتوقعة: إغلاق التوافر وتحديث الأسعار فورياً على كافة المنصات.
• ما حدث فعلياً: استمرار قبول حجوزات على التواريخ المغلقة أو ظهور الأسعار القديمة.`,

    templateGuestCheckinTitle: "[إيزي الفندقي] تعطل تسجيل دخول النزيل بالاستقبال",
    templateGuestCheckinDesc: `ملخص البلاغ: موظف الاستقبال غير قادر على إتمام تسجيل دخول النزيل.
• خطوات الحدوث: الضغط على زر تسجيل الدخول للحجز رقم #...
• النتيجة المتوقعة: ترميز بطاقة الغرفة وتفعيل الفاتورة.
• ما حدث فعلياً: تجمد الشاشة أو ظهور نافذة خطأ تمنع إتمام الإجراء.`,

    // Branch selection
    branchTitle: "2. الفرع أو المنشأة الفندقية",
    branchDesc: "اختر الموقع أو الفرع المتأثر بالمشكلة.",
    quickBranchLabel: "اختيار سريع:",
    branchSelectPlaceholder: "اختر الفرع المتأثر...",
    customBranchPlaceholder: "اكتب اسم الفرع أو الموقع بالتفصيل...",

    // URL & Context
    urlTitle: "3. رابط الصفحة أو مسار الشاشة (URL)",
    urlPlaceholder: "https://erp.swissbluehotels.com/web#menu_id=... أو رابط الشاشة",
    urlHelper: "ضع رابط الشاشة أو الصفحة المباشرة التي ظهرت بها المشكلة لتسريع الفحص.",
    pasteUrlBtn: "لصق من الحافظة",
    validUrlBadge: "رابط صالح",

    // Priority
    priorityTitle: "4. مستوى الأهمية ودرجة الطوارئ المعتمدة",
    priorityNormal: "عادي / روتيني",
    priorityNormalDesc: "استفسار روتيني أو تعديل غير عاجل (خلال 24-48 ساعة)",
    priorityMedium: "متوسط الأهمية",
    priorityMediumDesc: "تأثير جزئي على سير العمل مع وجود بديل مؤقت (خلال 12-24 ساعة)",
    priorityHigh: "عالي الأولوية",
    priorityHighDesc: "تعطل مسار عمل أساسي أو خلل وظيفي بارز (خلال 4-8 ساعات)",
    priorityCritical: "حرج جداً (توقف كلي)",
    priorityCriticalDesc: "توقف النظام كلياً أو تعطل تسجيل الدخول للنزلاء (استجابة فورية < ساعتين)",

    // Title & Description
    ticketSummaryTitle: "5. ملخص المشكلة والتفاصيل الكاملة",
    ticketSummaryPlaceholder: "مثال: فشل ترحيل الفواتير آلياً من نظام إيزي إلى أودو بعد الخروج",
    descPlaceholder: `يرجى تدوين تفاصيل الخلل بدقة:
• ماذا كنت تفعل بالضبط عند حدوث المشكلة؟
• ما هي النتيجة التي كنت تتوقعها؟
• ماذا حدث فعلياً؟ (مع ذكر أي رسائل خطأ ظهرت على الشاشة)`,
    charCount: "حرف",

    // Attachments
    attachmentsTitle: "6. المرفقات (لقطات الشاشة والتسجيل المرئي)",
    attachmentsDesc: "المرفقات المرئية تختصر زمن التشخيص والحل بنسبة تزيد عن 80%.",
    screenshotLabel: "رفع لقطة شاشة (Screenshot - صورة)",
    screenshotDragActive: "أفلت لقطة الشاشة هنا...",
    screenshotPrompt: "اسحب وأفلت لقطة الشاشة هنا، أو اضغط للاختيار",
    screenshotSubtext: "الملفات المدعومة: PNG, JPG, WebP (حتى 10 ميجابايت) — تلميح: يمكنك الضغط على ⌘+V للصق لقطة الشاشة من الحافظة مباشرة",
    pastedScreenshotSuccess: "تم التقاط ولصق لقطة الشاشة من الحافظة بنجاح!",
    tabVideoFile: "رفع ملف فيديو مباشر",
    tabLoomLink: "وضع رابط سحابي (Loom / Drive)",
    screenRecordingLabel: "تسجيل الشاشة بالفيديو (ملف أو رابط لوم)",
    videoUploadPrompt: "رفع فيديو توضيحي (MP4, WebM, MOV)",
    videoUploadSubtext: "اسحب وأفلت ملف الفيديو أو اضغط للاختيار (حتى 50 ميجابايت)",
    orPasteLoom: "أو ضع رابط تسجيل فيديو سحابي (Loom / Drive / CleanShot)",
    loomPlaceholder: "https://www.loom.com/share/... أو رابط Google Drive",
    removeFile: "حذف الملف",

    // Submitter Info
    submitterTitle: "7. بيانات مقدم التذكرة للتواصل والإشعارات",
    submitterDesc: "سيتم إرسال إشعارات التحديث وتأكيد استلام التذكرة إلى هذا البريد فوراً.",
    nameLabel: "الاسم الكامل *",
    namePlaceholder: "مثال: أحمد المنصور",
    emailLabel: "البريد الإلكتروني المهني *",
    emailPlaceholder: "name@swissbluehotels.com",
    phoneLabel: "رقم الجوال أو واتساب (اختياري)",
    phonePlaceholder: "966501234567+",
    rememberMeLabel: "حفظ بيانات التواصل على هذا الجهاز لتسهيل رفع التذاكر القادمة",

    // Actions
    submitBtn: "إرسال تذكرة الدعم الفني المعتمدة",
    submittingBtn: "جاري الرفع وتفعيل الإشعارات الفورية...",
    shortcutHint: "اضغط ⌘ + Enter للإرسال السريع",

    // Alerts & Notifications
    errorSystem: "يرجى تحديد النظام المعني (أودو، إيزي، أو أوزو).",
    errorBranch: "يرجى اختيار أو تدوين الفرع المتأثر.",
    errorTitle: "يرجى إدخال ملخص مختصر للمشكلة.",
    errorDesc: "يرجى تدوين تفاصيل المشكلة وخطوات حدوثها.",
    errorEmail: "يرجى إدخال بريد إلكتروني صحيح لاستلام إشعارات التذكرة.",
    errorName: "يرجى كتابة الاسم الكامل.",

    // Success Modal
    successHeading: "تم استلام التذكرة وتفعيل الإشعارات بنجاح!",
    successSubheading: "تم تسجيل البلاغ في المنظومة وإرسال إشعار فوري لفريق الدعم ولبريدك الإلكتروني.",
    ticketIdLabel: "رقم التذكرة المرجعي (Ticket ID)",
    copyTicketId: "نسخ رقم التذكرة",
    copied: "تم النسخ!",
    notificationSentNote: "تم إرسال نسخة إلكترونية وتأكيد الاستلام إلى بريدك وإلى إدارة العمليات المركزية.",
    estimatedSla: "زمن الاستجابة المعتمد لهذا المستوى",
    whatsappAction: "إشعار فريق الدعم عبر واتساب مباشرة",
    copySummaryBtn: "نسخ ملخص التذكرة بالكامل",
    copiedSummary: "تم نسخ ملخص التذكرة إلى الحافظة!",
    submitAnother: "رفع تذكرة دعم فني جديدة",
    closeModal: "إغلاق",

    // Timeline Steps
    stepTimeline1: "استلام التذكرة",
    stepTimeline1Sub: "تم التوثيق في النظام",
    stepTimeline2: "توجيه الفريق",
    stepTimeline2Sub: "إشعار المهندس المناوب",
    stepTimeline3: "الفحص البرمجي",
    stepTimeline3Sub: "إعادة إنتاج الخلل",
    stepTimeline4: "اكتمال الحل",
    stepTimeline4Sub: "اعتماد المعالجة",

    // History Modal
    historyTitle: "سجل التذاكر السابقة",
    historyEmpty: "لا توجد تذاكر محفوظة على هذا المتصفح حالياً.",
    historyFilterAll: "كافة المنظومات",
    historyBranch: "الفرع:",
    historyUrl: "الرابط:",
    historyPriority: "الأولوية:",
    historyStatus: "الحالة:",
    historyDate: "تاريخ الرفع:",
  },
};
