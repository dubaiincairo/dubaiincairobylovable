import { useState, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X, Upload, CheckCircle2, Loader2,
  User, MapPin, GraduationCap, FileText,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// ── Constants ─────────────────────────────────────────────────────────────────

const MENA_COUNTRIES = [
  "Egypt", "Saudi Arabia", "United Arab Emirates", "Kuwait", "Qatar",
  "Bahrain", "Oman", "Jordan", "Lebanon", "Libya", "Tunisia", "Algeria",
  "Morocco", "Sudan", "Iraq", "Syria", "Palestine", "Yemen",
];

const OTHER_COUNTRIES = [
  "Afghanistan", "Albania", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bangladesh", "Belarus", "Belgium", "Bolivia",
  "Brazil", "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chile", "China",
  "Colombia", "Croatia", "Czech Republic", "Denmark", "Ecuador", "Ethiopia",
  "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Hungary",
  "India", "Indonesia", "Iran", "Ireland", "Israel", "Italy", "Japan",
  "Kazakhstan", "Kenya", "Malaysia", "Mexico", "Netherlands", "New Zealand",
  "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland",
  "Portugal", "Romania", "Russia", "Rwanda", "Senegal", "Serbia",
  "Singapore", "Slovakia", "South Africa", "South Korea", "Spain",
  "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Tanzania", "Thailand",
  "Turkey", "Uganda", "Ukraine", "United Kingdom", "United States",
  "Uzbekistan", "Venezuela", "Vietnam", "Zimbabwe",
].sort();

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));

const THIS_YEAR = new Date().getFullYear();
const BIRTH_YEARS = Array.from(
  { length: THIS_YEAR - 1944 },
  (_, i) => String(THIS_YEAR - 18 - i),
);
const GRAD_YEARS = Array.from(
  { length: THIS_YEAR - 1969 },
  (_, i) => String(THIS_YEAR - i),
);

// ── Shared Styles ─────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-secondary/60 border border-border rounded-lg px-3 py-2.5 text-sm " +
  "text-foreground placeholder:text-muted-foreground/50 " +
  "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors";

const labelCls =
  "block text-[10px] font-semibold uppercase tracking-widest text-primary mb-1.5";

const sectionCls =
  "flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest " +
  "text-muted-foreground mt-6 mb-4 pb-2 border-b border-border/50";

// ── FileZone (standalone so it keeps its own drag state across renders) ────────

type FileZoneProps = {
  label: string;
  required?: boolean;
  file: File | null;
  onFile: (f: File | null) => void;
  error?: string;
};

const FileZone = ({ label, required, file, onFile, error }: FileZoneProps) => {
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <span className={labelCls}>
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </span>

      <div
        role="button"
        tabIndex={0}
        onClick={() => ref.current?.click()}
        onKeyDown={e => e.key === "Enter" && ref.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files[0];
          if (f) onFile(f);
        }}
        className={[
          "cursor-pointer rounded-xl border-2 border-dashed px-4 py-5 text-center transition-all duration-200 outline-none",
          drag
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/40 hover:bg-primary/5",
          error ? "border-red-400/60" : "",
          file ? "border-primary/40 bg-primary/5" : "",
        ].join(" ")}
      >
        {file ? (
          <div className="flex items-center justify-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm text-foreground font-medium truncate max-w-[220px]">
              {file.name}
            </span>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onFile(null); }}
              className="shrink-0 w-5 h-5 rounded-full bg-secondary flex items-center justify-center
                         text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Remove file"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Upload className="w-3.5 h-3.5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">Click to upload</span> or drag &amp; drop
            </p>
            <p className="text-[11px] text-muted-foreground/50">JPG, PNG or PDF · Max 5 MB</p>
          </div>
        )}

        <input
          ref={ref}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="text-[11px] text-red-400 mt-1">{error}</p>}
    </div>
  );
};

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  jobTitle: string;
  jobId: string;
  onClose: () => void;
};

type FormState = {
  firstName: string; lastName: string;
  birthDay: string; birthMonth: string; birthYear: string;
  email: string; mobile: string;
  country: string; city: string; address: string;
  degree: string; gradYear: string;
  linkedin: string; instapay: string;
};

const EMPTY: FormState = {
  firstName: "", lastName: "",
  birthDay: "", birthMonth: "", birthYear: "",
  email: "", mobile: "",
  country: "", city: "", address: "",
  degree: "", gradYear: "",
  linkedin: "", instapay: "",
};

// ── Main Component ────────────────────────────────────────────────────────────

const ApplyModal = ({ jobTitle, jobId, onClose }: Props) => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack]   = useState<File | null>(null);
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const field =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));

  const selectField =
    (key: keyof FormState) =>
    (value: string) =>
      setForm(f => ({ ...f, [key]: value }));

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.mobile.trim()) e.mobile = "Required";
    if (!form.country)       e.country = "Please select your country";
    if (!idFront)  e.idFront = "Please upload the front view of your ID";
    if (!idBack)   e.idBack  = "Please upload the back view of your ID";
    return e;
  };

  // ── File upload helper ──────────────────────────────────────────────────────
  const uploadFile = async (file: File, suffix: string): Promise<string> => {
    const ext  = file.name.split(".").pop() ?? "jpg";
    const path = `${jobId || "general"}/${Date.now()}-${suffix}.${ext}`;
    const { data, error } = await supabase.storage.from("applications").upload(path, file);
    if (error) throw error;
    return data.path;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(() => {
        document.querySelector("[data-field-error]")?.scrollIntoView({
          behavior: "smooth", block: "center",
        });
      }, 50);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const [frontPath, backPath] = await Promise.all([
        idFront ? uploadFile(idFront, "id-front") : Promise.resolve(""),
        idBack  ? uploadFile(idBack,  "id-back")  : Promise.resolve(""),
      ]);

      const monthIndex = MONTHS.indexOf(form.birthMonth) + 1;
      const dob =
        form.birthYear && form.birthMonth && form.birthDay
          ? `${form.birthYear}-${String(monthIndex).padStart(2, "0")}-${form.birthDay}`
          : null;

      const { error } = await supabase.from("job_applications").insert([{
        job_id:          jobId || null,
        job_title:       jobTitle,
        first_name:      form.firstName.trim(),
        last_name:       form.lastName.trim(),
        date_of_birth:   dob,
        email:           form.email.trim(),
        mobile:          form.mobile.trim(),
        country:         form.country,
        city:            form.city.trim(),
        address:         form.address.trim(),
        bachelor_degree: form.degree.trim(),
        graduation_year: form.gradYear || null,
        linkedin_url:    form.linkedin.trim(),
        instapay_link:   form.instapay.trim(),
        id_front_url:    frontPath,
        id_back_url:     backPath,
      }]);

      if (error) throw error;
      // Fire email notification (non-blocking)
      supabase.functions.invoke("send-notification", {
        body: {
          type: "application",
          data: {
            job_title:  jobTitle,
            first_name: form.firstName.trim(),
            last_name:  form.lastName.trim(),
            email:      form.email.trim(),
            mobile:     form.mobile.trim(),
            country:    form.country,
            city:       form.city.trim(),
            degree:     form.degree.trim(),
            grad_year:  form.gradYear,
            linkedin:   form.linkedin.trim(),
          },
        },
      }).catch(() => {});
      setSuccess(true);

    } catch (err) {
      console.error("Application submit error:", err);
      setErrors({ submit: "Something went wrong. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <DialogPrimitive.Root open onOpenChange={open => !open && onClose()}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
          <DialogPrimitive.Content asChild onOpenAutoFocus={e => e.preventDefault()}>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div
                className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 text-center shadow-2xl"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 22, stiffness: 260 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30
                             flex items-center justify-center mx-auto mb-5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.15 }}
                >
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </motion.div>

                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Application Submitted!
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-1">
                  Thank you,{" "}
                  <span className="text-foreground font-medium">{form.firstName}</span>.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  We've received your application for{" "}
                  <span className="text-primary font-medium">{jobTitle}</span>.
                  Our team will review it and reach out to you soon.
                </p>

                <button
                  onClick={onClose}
                  className="px-7 py-2.5 bg-primary text-primary-foreground font-display
                             font-semibold text-sm rounded-lg hover:brightness-110 transition-all shimmer-btn"
                >
                  Done
                </button>
              </motion.div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  // ── Form screen ─────────────────────────────────────────────────────────────
  return (
    <DialogPrimitive.Root open onOpenChange={open => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Backdrop */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <DialogPrimitive.Content asChild onOpenAutoFocus={e => e.preventDefault()}>
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
            <motion.div
              className="w-full sm:max-w-xl bg-card border border-border
                         rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col"
              style={{ maxHeight: "92vh" }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.85 }}
            >
              {/* ── Header ─────────────────────────────────────────────────── */}
              <div
                className="flex items-start justify-between px-6 py-5 border-b border-border/60 shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(38 80% 55% / 0.06) 0%, transparent 60%)",
                }}
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-1 block">
                    Job Application
                  </span>
                  <DialogPrimitive.Title className="font-display font-bold text-base text-foreground leading-snug max-w-[340px]">
                    {jobTitle}
                  </DialogPrimitive.Title>
                </div>
                <DialogPrimitive.Close
                  className="mt-0.5 ml-4 w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                             text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </DialogPrimitive.Close>
              </div>

              {/* ── Scrollable Form ─────────────────────────────────────────── */}
              <form onSubmit={handleSubmit} noValidate className="overflow-y-auto flex-1">
                <div className="px-6 pb-4">

                  {/* ── Section 1: Personal Information ── */}
                  <p className={sectionCls}>
                    <User className="w-3 h-3" /> Personal Information
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        className={`${inputCls} ${errors.firstName ? "border-red-400/60" : ""}`}
                        placeholder="Ahmed"
                        value={form.firstName}
                        onChange={field("firstName")}
                        autoComplete="given-name"
                      />
                      {errors.firstName && (
                        <p className="text-[11px] text-red-400 mt-1" data-field-error>
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelCls}>
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        className={`${inputCls} ${errors.lastName ? "border-red-400/60" : ""}`}
                        placeholder="Hassan"
                        value={form.lastName}
                        onChange={field("lastName")}
                        autoComplete="family-name"
                      />
                      {errors.lastName && (
                        <p className="text-[11px] text-red-400 mt-1" data-field-error>
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="mt-3">
                    <label className={labelCls}>Date of Birth</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Select value={form.birthDay} onValueChange={selectField("birthDay")}>
                        <SelectTrigger className="bg-secondary/60 border-border text-sm h-10">
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS.map(d => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={form.birthMonth} onValueChange={selectField("birthMonth")}>
                        <SelectTrigger className="bg-secondary/60 border-border text-sm h-10">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {MONTHS.map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={form.birthYear} onValueChange={selectField("birthYear")}>
                        <SelectTrigger className="bg-secondary/60 border-border text-sm h-10">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {BIRTH_YEARS.map(y => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* ── Section 2: Contact & Location ── */}
                  <p className={sectionCls}>
                    <MapPin className="w-3 h-3" /> Contact &amp; Location
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className={labelCls}>
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        className={`${inputCls} ${errors.email ? "border-red-400/60" : ""}`}
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={field("email")}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 mt-1" data-field-error>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={labelCls}>
                        Mobile Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`${inputCls} ${errors.mobile ? "border-red-400/60" : ""}`}
                        placeholder="+20 100 000 0000"
                        value={form.mobile}
                        onChange={field("mobile")}
                        autoComplete="tel"
                      />
                      {errors.mobile && (
                        <p className="text-[11px] text-red-400 mt-1" data-field-error>
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={labelCls}>
                        Country of Residence <span className="text-red-400">*</span>
                      </label>
                      <Select value={form.country} onValueChange={selectField("country")}>
                        <SelectTrigger
                          className={`bg-secondary/60 border-border text-sm h-10
                            ${errors.country ? "border-red-400/60" : ""}`}
                        >
                          <SelectValue placeholder="Select your country…" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Middle East &amp; North Africa</SelectLabel>
                            {MENA_COUNTRIES.map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectSeparator />
                          <SelectGroup>
                            <SelectLabel>All Countries</SelectLabel>
                            {OTHER_COUNTRIES.map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <p className="text-[11px] text-red-400 mt-1" data-field-error>
                          {errors.country}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>City of Residence</label>
                        <input
                          className={inputCls}
                          placeholder="Cairo"
                          value={form.city}
                          onChange={field("city")}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Home Address</label>
                        <input
                          className={inputCls}
                          placeholder="Street, District"
                          value={form.address}
                          onChange={field("address")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Section 3: Professional Background ── */}
                  <p className={sectionCls}>
                    <GraduationCap className="w-3 h-3" /> Professional Background
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className={labelCls}>Bachelor's Degree &amp; Field of Study</label>
                      <input
                        className={inputCls}
                        placeholder="e.g. Bachelor's in Business Administration"
                        value={form.degree}
                        onChange={field("degree")}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Year of Graduation</label>
                      <Select value={form.gradYear} onValueChange={selectField("gradYear")}>
                        <SelectTrigger className="bg-secondary/60 border-border text-sm h-10">
                          <SelectValue placeholder="Select year…" />
                        </SelectTrigger>
                        <SelectContent>
                          {GRAD_YEARS.map(y => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className={labelCls}>LinkedIn Profile URL</label>
                      <input
                        type="url"
                        className={inputCls}
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={form.linkedin}
                        onChange={field("linkedin")}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>InstaPay Account Link</label>
                      <input
                        className={inputCls}
                        placeholder="Paste your InstaPay link here"
                        value={form.instapay}
                        onChange={field("instapay")}
                      />
                    </div>
                  </div>

                  {/* ── Section 4: Identity Documents ── */}
                  <p className={sectionCls}>
                    <FileText className="w-3 h-3" /> Identity Documents
                  </p>

                  <div className="space-y-3 pb-2">
                    <FileZone
                      label="Egyptian National ID — Front View"
                      required
                      file={idFront}
                      onFile={f => {
                        setIdFront(f);
                        setErrors(prev => ({ ...prev, idFront: "" }));
                      }}
                      error={errors.idFront}
                    />
                    <FileZone
                      label="Egyptian National ID — Back View"
                      required
                      file={idBack}
                      onFile={f => {
                        setIdBack(f);
                        setErrors(prev => ({ ...prev, idBack: "" }));
                      }}
                      error={errors.idBack}
                    />
                  </div>

                  {/* General error */}
                  {errors.submit && (
                    <div className="mt-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                      {errors.submit}
                    </div>
                  )}
                </div>

                {/* ── Sticky Footer ─────────────────────────────────────────── */}
                <div className="sticky bottom-0 px-6 py-4 bg-card border-t border-border/60 shrink-0">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary text-primary-foreground font-display font-semibold
                               text-sm rounded-lg hover:brightness-110 transition-all shimmer-btn glow-gold
                               disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Application…
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground/60 mt-2">
                    Fields marked <span className="text-red-400">*</span> are required
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ApplyModal;
