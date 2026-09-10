export const ticketTranslations = {
  en: {
    portalBadge: "Executive Support & Operations",
    portalTitle: "Partner & Client Portal",
    portalSubtitle: "Select an operational workflow below to submit client support tickets or log freelancer work hours.",
    tabTickets: "Client Support Tickets",
    tabTicketsSub: "Submit tickets for Odoo, eZee & Ozoo",
    tabWorksheet: "Freelancer Worksheet",
    tabWorksheetSub: "Weekly time tracking & task logs",
    myTicketsBtn: "My Recent Tickets",
    
    // System selection
    selectSystemTitle: "1. Select Affected Software System",
    selectSystemDesc: "Choose the exact platform experiencing the incident or requiring assistance.",
    
    // Branch selection
    branchTitle: "2. Hotel / Business Branch",
    branchDesc: "Select the operational branch or property affected.",
    branchSelectPlaceholder: "Select branch location...",
    customBranchPlaceholder: "Enter custom branch or facility name...",

    // URL & Context
    urlTitle: "3. Incident URL or Screen Location",
    urlPlaceholder: "https://erp.swissbluehotels.com/web#menu_id=... or specific page URL",
    urlHelper: "Paste the exact browser link or screen path where the issue occurred.",

    // Priority
    priorityTitle: "4. Incident Priority & Urgency",
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

    // Attachments
    attachmentsTitle: "6. Attachments (Screenshots & Video Recording)",
    attachmentsDesc: "Visual proof accelerates issue diagnosis and resolution.",
    screenshotLabel: "Upload Screenshot (PNG, JPG, WebP)",
    screenshotDragActive: "Drop screenshot here...",
    screenshotPrompt: "Drag & drop screenshot here, or click to browse",
    screenshotSubtext: "Supported: JPG, PNG, WebP (Max 10MB)",
    screenRecordingLabel: "Screen Recording (Video File or Loom Link)",
    videoUploadPrompt: "Upload video file (MP4, WebM, MOV)",
    videoUploadSubtext: "Drag & drop or click to upload (Max 50MB)",
    orPasteLoom: "OR Paste Cloud Video / Loom / Drive Link",
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
    notificationSentNote: "A confirmation notification has been dispatched to your email and the technical team.",
    estimatedSla: "Estimated Response SLA",
    whatsappAction: "Notify via Direct WhatsApp",
    submitAnother: "Submit Another Ticket",
    closeModal: "Done",

    // History Modal
    historyTitle: "My Submitted Tickets",
    historyEmpty: "No tickets recorded on this device yet.",
    historyBranch: "Branch:",
    historyUrl: "URL:",
    historyPriority: "Priority:",
    historyStatus: "Status:",
    historyDate: "Submitted on:",
  },
  ar: {
    portalBadge: "الدعم التشغيلي والفني المعتمد",
    portalTitle: "بوابة الشركاء والعملاء التنفيذية",
    portalSubtitle: "حدد نوع المعاملة المطلوبة أدناه لرفع تذاكر الدعم الفني للعملاء أو تسجيل ساعات إنجاز المستقلين.",
    tabTickets: "تذاكر الدعم الفني للعملاء",
    tabTicketsSub: "رفع ومتابعة تذاكر أودو وإيزي وأوزو",
    tabWorksheet: "سجل أعمال المستقلين",
    tabWorksheetSub: "جدول تتبع الساعات وإنجاز المهام الأسبوعي",
    myTicketsBtn: "تذاكري السابقة",

    // System selection
    selectSystemTitle: "1. حدد النظام البرمجي المعني بالطلب",
    selectSystemDesc: "اختر النظام أو الواجهة التي حدثت بها المشكلة أو تحتاج إلى دعم فني متخصص.",

    // Branch selection
    branchTitle: "2. الفرع أو المنشأة الفندقية",
    branchDesc: "اختر الموقع أو الفرع المتأثر بالمشكلة.",
    branchSelectPlaceholder: "اختر الفرع المتأثر...",
    customBranchPlaceholder: "اكتب اسم الفرع أو الموقع بالتفصيل...",

    // URL & Context
    urlTitle: "3. رابط الصفحة أو مسار الشاشة (URL)",
    urlPlaceholder: "https://erp.swissbluehotels.com/web#menu_id=... أو رابط الشاشة",
    urlHelper: "ضع رابط الشاشة أو الصفحة المباشرة التي ظهرت بها المشكلة لتسريع الفحص.",

    // Priority
    priorityTitle: "4. مستوى الأهمية ودرجة الطوارئ",
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

    // Attachments
    attachmentsTitle: "6. المرفقات (لقطات الشاشة والتسجيل المرئي)",
    attachmentsDesc: "المرفقات المرئية تختصر زمن التشخيص والحل بنسبة تزيد عن 80%.",
    screenshotLabel: "رفع لقطة شاشة (Screenshot - صورة)",
    screenshotDragActive: "أفلت لقطة الشاشة هنا...",
    screenshotPrompt: "اسحب وأفلت لقطة الشاشة هنا، أو اضغط للاختيار",
    screenshotSubtext: "الملفات المدعومة: PNG, JPG, WebP (حتى 10 ميجابايت)",
    screenRecordingLabel: "تسجيل الشاشة بالفيديو (ملف أو رابط لوم)",
    videoUploadPrompt: "رفع فيديو توضيحي (MP4, WebM, MOV)",
    videoUploadSubtext: "اسحب وأفلت ملف الفيديو أو اضغط للاختيار (حتى 50 ميجابايت)",
    orPasteLoom: "أو ضع رابط تسجيل فيديو سحابي (Loom / Drive)",
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
    submitBtn: "إرسال تذكرة الدعم الفني",
    submittingBtn: "جاري الإرسال وتفعيل الإشعارات الفورية...",

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
    submitAnother: "رفع تذكرة دعم فني جديدة",
    closeModal: "إغلاق",

    // History Modal
    historyTitle: "سجل التذاكر السابقة",
    historyEmpty: "لا توجد تذاكر محفوظة على هذا المتصفح حالياً.",
    historyBranch: "الفرع:",
    historyUrl: "الرابط:",
    historyPriority: "الأولوية:",
    historyStatus: "الحالة:",
    historyDate: "تاريخ الرفع:",
  },
};
