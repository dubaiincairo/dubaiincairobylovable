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
    branchTitle: "2. Branch / Property",
    branchDesc: "Select the operational branch or property affected.",
    quickBranchLabel: "Quick Select:",
    branchSelectPlaceholder: "Select branch...",
    customBranchPlaceholder: "Enter branch name...",

    // URL & Context
    urlTitle: "3. Incident URL",
    urlPlaceholder: "https://... or page URL",
    urlHelper: "Paste the page link where the issue occurred.",
    pasteUrlBtn: "Paste from Clipboard",
    validUrlBadge: "Valid URL",

    // Priority
    priorityTitle: "4. Priority",
    priorityNormal: "Normal",
    priorityNormalDesc: "Routine inquiry or minor issue",
    priorityMedium: "Medium",
    priorityMediumDesc: "Operational impact with workaround",
    priorityHigh: "High",
    priorityHighDesc: "Major workflow blocked",
    priorityCritical: "Critical",
    priorityCriticalDesc: "System down or urgent blocker",

    // Title & Description
    ticketSummaryTitle: "5. Ticket Summary",
    ticketSummaryPlaceholder: "Brief summary of the issue",
    descPlaceholder: `Please describe the incident in detail:
• What were you doing when the issue occurred?
• What was the expected result?
• What actually happened? (Include any error codes or messages shown)`,
    charCount: "characters",

    // Attachments
    attachmentsTitle: "6. Attachments",
    attachmentsDesc: "Attach a screenshot or screen recording to accelerate resolution.",
    screenshotLabel: "Screenshot",
    screenshotDragActive: "Drop screenshot here...",
    screenshotPrompt: "Drop screenshot here, or click to browse",
    screenshotSubtext: "JPG, PNG, WebP up to 10MB · Paste with ⌘+V or Ctrl+V",
    pastedScreenshotSuccess: "Screenshot captured from clipboard!",
    tabVideoFile: "Upload Video",
    tabLoomLink: "Video Link",
    screenRecordingLabel: "Screen Recording",
    videoUploadPrompt: "Upload Video (MP4, WebM, MOV)",
    videoUploadSubtext: "Drop video or click to upload (Max 50MB)",
    orPasteLoom: "Paste Video Link",
    loomPlaceholder: "https://loom.com/share/... or Google Drive URL",
    removeFile: "Remove file",

    // Submitter Info
    submitterTitle: "7. Contact Information",
    submitterDesc: "We will send status updates and ticket notifications to this address.",
    nameLabel: "Full Name *",
    namePlaceholder: "e.g. Ahmed Al-Mansoor",
    emailLabel: "Work Email *",
    emailPlaceholder: "name@swissbluehotels.com",
    phoneLabel: "Phone / WhatsApp (Optional)",
    phonePlaceholder: "+966 50 123 4567",
    rememberMeLabel: "Remember my details on this device",

    // Actions
    submitBtn: "Submit Ticket",
    submittingBtn: "Submitting Ticket...",
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
• ما حدث فعلياً: ظلت حالة الفاتورة معلقة وظهر تنبيه يفيد بـ "مهلة المزامنة انتهت / خطأ في مطابقة الحسابات".`,

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
    branchTitle: "2. المنشأة أو الفرع",
    branchDesc: "اختر الموقع أو الفرع المتأثر بالمشكلة.",
    quickBranchLabel: "اختيار سريع:",
    branchSelectPlaceholder: "اختر الفرع المتأثر...",
    customBranchPlaceholder: "اكتب اسم الفرع أو الموقع بالتفصيل...",

    // URL & Context
    urlTitle: "3. رابط الشاشة أو الصفحة",
    urlPlaceholder: "رابط الصفحة أو مسار الشاشة المباشر...",
    urlHelper: "ضع رابط الشاشة أو الصفحة المباشرة التي ظهرت بها المشكلة لتسريع الفحص.",
    pasteUrlBtn: "لصق من الحافظة",
    validUrlBadge: "رابط صالح",

    // Priority
    priorityTitle: "4. درجة الأولوية",
    priorityNormal: "عادي",
    priorityNormalDesc: "استفسار روتيني أو طلب غير عاجل",
    priorityMedium: "متوسط",
    priorityMediumDesc: "تأثير جزئي على سير العمل مع وجود بديل مؤقت",
    priorityHigh: "عالي",
    priorityHighDesc: "تعطل مسار عمل أساسي أو خلل وظيفي بارز",
    priorityCritical: "حرج",
    priorityCriticalDesc: "توقف النظام كلياً أو عطل حرج",

    // Title & Description
    ticketSummaryTitle: "5. ملخص المشكلة",
    ticketSummaryPlaceholder: "مثال: فشل ترحيل الفواتير آلياً من نظام إيزي إلى أودو بعد الخروج",
    descPlaceholder: `يرجى تدوين تفاصيل الخلل بدقة:
• ماذا كنت تفعل بالضبط عند حدوث المشكلة؟
• ما هي النتيجة التي كنت تتوقعها؟
• ماذا حدث فعلياً؟ (مع ذكر أي رسائل خطأ ظهرت على الشاشة)`,
    charCount: "حرف",

    // Attachments
    attachmentsTitle: "6. المرفقات",
    attachmentsDesc: "إرفاق لقطة شاشة أو تسجيل فيديو لتسريع الفحص والمعالجة.",
    screenshotLabel: "لقطة شاشة",
    screenshotDragActive: "أفلت لقطة الشاشة هنا...",
    screenshotPrompt: "اسحب لقطة الشاشة أو اضغط للاختيار",
    screenshotSubtext: "ملفات PNG أو JPG حتى 10 ميجابايت · أو لصق (⌘+V / Ctrl+V)",
    pastedScreenshotSuccess: "تم التقاط ولصق لقطة الشاشة من الحافظة بنجاح!",
    tabVideoFile: "رفع فيديو",
    tabLoomLink: "رابط فيديو",
    screenRecordingLabel: "تسجيل الشاشة",
    videoUploadPrompt: "رفع فيديو (MP4, WebM, MOV)",
    videoUploadSubtext: "اسحب الفيديو أو اضغط للاختيار (حتى 50 ميجابايت)",
    orPasteLoom: "وضع رابط فيديو سحابي",
    loomPlaceholder: "رابط تسجيل الفيديو السحابي المباشر...",
    removeFile: "حذف الملف",

    // Submitter Info
    submitterTitle: "7. بيانات التواصل",
    submitterDesc: "سيتم إرسال إشعارات التحديث وتأكيد استلام التذكرة إلى هذا البريد فوراً.",
    nameLabel: "الاسم بالكامل *",
    namePlaceholder: "مثال: أحمد المنصور",
    emailLabel: "البريد المهني *",
    emailPlaceholder: "name@example.com",
    phoneLabel: "الهاتف / واتساب (اختياري)",
    phonePlaceholder: "966501234567+",
    rememberMeLabel: "حفظ بيانات التواصل على هذا الجهاز لتسهيل رفع التذاكر القادمة",

    // Actions
    submitBtn: "إرسال التذكرة",
    submittingBtn: "جاري إرسال التذكرة وتفعيل الإشعارات...",
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
    ticketIdLabel: "رقم التذكرة المرجعي",
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
