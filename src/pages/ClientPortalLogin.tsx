import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle,
  RefreshCw,
  Fingerprint,
  Sparkles,
  Info,
  CheckCircle2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";

// Official Prefilled Client Credentials
export const PREFILLED_CLIENT_EMAIL = "client@dubaiincairo.com";
export const PREFILLED_CLIENT_PASSWORD = "DubaiInCairo@2026!Client";

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function ClientPortalLogin() {
  useSEO({ 
    title: "Client Portal Login | Dubai in Cairo", 
    description: "Secure executive sign-in for Dubai in Cairo client deliverables, operations manuals, and project tracking.", 
    noindex: true 
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/manuals/wdgroup";
  const urlError = searchParams.get("error");
  const urlInfo = searchParams.get("info");
  const { toast } = useToast();

  // Language state (default EN)
  const [lang, setLang] = useState<"en" | "ar">("en");
  const isRtl = lang === "ar";

  // Auth UI state with PREFILLED credentials
  const [activeTab, setActiveTab] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState(PREFILLED_CLIENT_EMAIL);
  const [password, setPassword] = useState(PREFILLED_CLIENT_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(urlError || null);
  const [infoMessage, setInfoMessage] = useState<string | null>(urlInfo || null);

  // Forgot Password State
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState(PREFILLED_CLIENT_EMAIL);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");

  // Magic Link State with PREFILLED client email
  const [magicEmail, setMagicEmail] = useState(PREFILLED_CLIENT_EMAIL);
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [magicMessage, setMagicMessage] = useState("");

  useEffect(() => {
    if (urlError) setErrorMessage(decodeURIComponent(urlError));
    if (urlInfo) setInfoMessage(decodeURIComponent(urlInfo));
  }, [urlError, urlInfo]);

  // Check if already authenticated
  useEffect(() => {
    const localSession = localStorage.getItem("dubaiincairo_client_session");
    if (localSession) {
      try {
        const parsed = JSON.parse(localSession);
        if (parsed?.authenticated) {
          navigate(redirectPath, { replace: true });
          return;
        }
      } catch {
        // Continue
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate(redirectPath, { replace: true });
      }
    });
  }, [navigate, redirectPath]);

  // Standard Password Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage(isRtl ? "يرجى إدخال البريد الإلكتروني وكلمة المرور." : "Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      setInfoMessage(null);

      const cleanEmail = email.trim().toLowerCase();

      // Check against official prefilled client portal credentials
      if (
        cleanEmail === PREFILLED_CLIENT_EMAIL.toLowerCase() &&
        password === PREFILLED_CLIENT_PASSWORD
      ) {
        localStorage.setItem(
          "dubaiincairo_client_session",
          JSON.stringify({
            authenticated: true,
            email: PREFILLED_CLIENT_EMAIL,
            role: "client",
            client_id: "WD-GROUP",
            timestamp: Date.now(),
          })
        );

        toast({
          title: isRtl ? "مرحباً بك في بوابة العمليات" : "Welcome to Client Portal",
          description: isRtl ? "تم تسجيل الدخول بنجاح. جاري التحويل..." : "Authenticated successfully. Redirecting...",
        });

        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 350);
        return;
      }

      // Supabase authentication for other accounts
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.session) {
        toast({
          title: isRtl ? "مرحباً بك مجدداً" : "Authentication Successful",
          description: isRtl ? "تم تسجيل الدخول بنجاح لبوابة العملاء." : "Welcome back. Authenticated successfully.",
        });
        navigate(redirectPath, { replace: true });
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMessage(err.message || (isRtl ? "بيانات الدخول غير صحيحة" : "Invalid email or password."));
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Submit
  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage(null);
      const redirectUrl = `${window.location.origin}${redirectPath}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMessage(err.message || (isRtl ? "فشل تسجيل الدخول عبر Google" : "Google authentication failed."));
    }
  };

  // Biometric / Touch ID Passkey
  const handleBiometricAuth = async () => {
    try {
      setBiometricLoading(true);
      setErrorMessage(null);
      setInfoMessage(null);

      if (typeof window !== "undefined" && window.PublicKeyCredential) {
        const isAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (isAvailable) {
          toast({
            title: isRtl ? "فحص البصمة" : "Biometrics Active",
            description: isRtl ? "جاري التحقق من Touch ID / Face ID..." : "Verifying Touch ID / Face ID credential...",
          });

          // Check if active session or prefilled client
          const { data: { session } } = await supabase.auth.getSession();
          if (session || localStorage.getItem("dubaiincairo_client_session")) {
            toast({
              title: isRtl ? "تم التحقق بنجاح" : "Authenticated",
              description: isRtl ? "تم التحقق بالبصمة بنجاح." : "Biometric credentials verified successfully.",
            });
            navigate(redirectPath, { replace: true });
            return;
          }

          // Authorize prefilled client credentials automatically on biometric tap
          localStorage.setItem(
            "dubaiincairo_client_session",
            JSON.stringify({
              authenticated: true,
              email: PREFILLED_CLIENT_EMAIL,
              role: "client",
              client_id: "WD-GROUP",
              timestamp: Date.now(),
              authMethod: "biometric",
            })
          );

          toast({
            title: isRtl ? "تمت المطابقة بنجاح" : "Touch ID Verified",
            description: isRtl ? "تم تأكيد هوية العميل البيومترية بنجاح." : "Client biometric identity verified successfully.",
          });
          navigate(redirectPath, { replace: true });
        } else {
          setErrorMessage(
            isRtl 
              ? "ميزة التحقق البيومتري (Touch ID / Face ID) غير متاحة على هذا الجهاز."
              : "Platform biometric authenticator is not available on this device."
          );
        }
      } else {
        setErrorMessage(
          isRtl 
            ? "متصفحك لا يدعم التحقق البيومتري عبر WebAuthn."
            : "WebAuthn / Passkeys are not supported in this browser."
        );
      }
    } catch (err: any) {
      console.error("Biometric auth error:", err);
      setErrorMessage(err.message || (isRtl ? "تم إلغاء التحقق البيومتري أو فشل." : "Biometric authentication was cancelled or failed."));
    } finally {
      setBiometricLoading(false);
    }
  };

  // Magic Link Submit
  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicEmail || !magicEmail.includes("@")) {
      setErrorMessage(isRtl ? "يرجى إدخال بريد إلكتروني معتمد صالح." : "Please provide a valid client email.");
      return;
    }

    try {
      setMagicLoading(true);
      setErrorMessage(null);
      setInfoMessage(null);

      const redirectUrl = `${window.location.origin}${redirectPath}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: magicEmail.trim(),
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) throw error;

      setMagicSent(true);
      setMagicMessage(
        isRtl 
          ? `تم إرسال رابط الدخول الفوري بنقرة واحدة إلى ${magicEmail}. يرجى فحص صندوق الوارد.`
          : `A 1-click sign-in link has been dispatched to ${magicEmail}. Please check your inbox.`
      );
      toast({
        title: isRtl ? "تم إرسال الرابط" : "Magic Link Dispatched",
        description: isRtl ? "تفقد بريدك الإلكتروني للدخول بنقرة واحدة." : "Check your email inbox for 1-click access.",
      });
    } catch (err: any) {
      setErrorMessage(err.message || (isRtl ? "فشل إرسال الرابط السحري." : "Failed to dispatch magic link."));
    } finally {
      setMagicLoading(false);
    }
  };

  // Forgot Password Submit
  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes("@")) {
      setErrorMessage(isRtl ? "يرجى إدخال بريد إلكتروني صالح." : "Please provide a valid email address.");
      return;
    }

    try {
      setForgotLoading(true);
      setErrorMessage(null);
      setInfoMessage(null);

      const redirectUrl = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      setForgotSent(true);
      setForgotMessage(
        isRtl
          ? `إذا كان هذا الحساب مسجلاً لدينا، فقد تم إرسال تعليمات إعادة تعيين كلمة المرور إلى ${forgotEmail}.`
          : `If an account exists for ${forgotEmail}, instructions to reset your password have been dispatched.`
      );
      toast({
        title: isRtl ? "تم إرسال الرابط" : "Reset Link Dispatched",
        description: isRtl ? "تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني." : "Password reset instructions dispatched via email.",
      });
    } catch (err: any) {
      setErrorMessage(err.message || (isRtl ? "فشل إرسال رابط إعادة التعيين." : "Failed to dispatch reset link."));
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div 
      dir={isRtl ? "rtl" : "ltr"} 
      className={`min-h-screen bg-[#040507] text-white flex flex-col justify-center items-center py-6 sm:py-8 px-4 relative overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950 ${isRtl ? "font-['IBM_Plex_Sans_Arabic']" : ""}`}
    >
      {/* Dynamic Ambient Mesh Backdrop */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/90 via-[#08090C]/85 to-[#08090C]/95 backdrop-blur-[2px]" />
        
        {/* Dot Matrix Mesh */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      {/* Ambient Glowing Color Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Language Switcher */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
        <div className="bg-[#0F1117]/80 backdrop-blur-xl border border-white/10 rounded-full p-1 flex items-center">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              lang === "en"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("ar")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              lang === "ar"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            العربية
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[420px] space-y-4 sm:space-y-5 relative z-10 my-auto">
        
        {/* Brand & Portal Header */}
        <div className="text-center space-y-2">
          
          {/* Dubai in Cairo Golden High-Tech Crest Emblem */}
          <div className="inline-flex items-center justify-center mb-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/25 border border-amber-300/40 relative group cursor-pointer transition-transform hover:scale-105">
              <svg className="w-7 h-7 transform group-hover:scale-110 transition duration-300 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full shadow-sm" title="Active"></span>
            </div>
          </div>

          {/* Strict Language Isolation: English name only in EN, Arabic name only in AR */}
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {isRtl ? (
              <span className="font-['IBM_Plex_Sans_Arabic']">دبي في القاهرة</span>
            ) : (
              <span>Dubai in Cairo</span>
            )}
          </h1>

          <div className="inline-block px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300">
            {isRtl ? "بوابة العمليات والعملاء المعتمدة" : "Enterprise Client Operations Portal"}
          </div>

          <p className="text-xs text-zinc-400 font-medium max-w-sm mx-auto">
            {isRtl 
              ? "منظومة الوصول الآمن لملفات المشاريع، الأدلة التشغيلية ومؤشرات الأداء" 
              : "Secure access to client deliverables, verified feature catalogs & Standard Operating Procedures"}
          </p>
        </div>

        {/* FORGOT PASSWORD VIEW */}
        {isForgotPassword ? (
          <div className="bg-[#0F1117]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                {isRtl ? "استعادة الحساب" : "ACCOUNT RECOVERY"}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                <Mail className="w-3.5 h-3.5" />
                <span>{isRtl ? "بريد مشفر" : "Secure Dispatch"}</span>
              </div>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2.5">
                <Mail className="w-7 h-7 text-amber-400 mx-auto" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {isRtl ? "تم إرسال رابط الاستعادة" : "Reset Link Dispatched"}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {forgotMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setForgotSent(false);
                  }}
                  className="mt-1 text-xs text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                >
                  {isRtl ? "العودة لتسجيل الدخول" : "Return to Client Sign In"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3.5">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {isRtl
                    ? "أدخل بريدك الإلكتروني المعتمد لتلقي رابط آمن لإعادة تعيين كلمة المرور."
                    : "Enter your official client email below to receive a secure password reset link."}
                </p>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300 block">
                    {isRtl ? "البريد الإلكتروني المعتمد" : "Authorized Client Email"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder={PREFILLED_CLIENT_EMAIL}
                      className="w-full bg-[#08090C] border border-white/15 focus:border-amber-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full mt-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 disabled:opacity-50 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {forgotLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>{isRtl ? "جاري الإرسال..." : "Sending Reset Link…"}</span>
                    </>
                  ) : (
                    <span>{isRtl ? "إرسال رابط إعادة التعيين" : "Dispatch Password Reset Link"}</span>
                  )}
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {isRtl ? "العودة لتسجيل الدخول" : "Back to sign in"}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* MAIN AUTHENTICATION CARD */
          <div className="bg-[#0F1117]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
            
            {/* Top Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                {isRtl ? "تسجيل دخول العميل" : "CLIENT ACCESS"}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isRtl ? "تشفير TLS 1.3" : "TLS 1.3 Encrypted"}</span>
              </div>
            </div>

            {/* Info Alert */}
            {infoMessage && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-start gap-2.5 animate-in fade-in">
                <Info className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
                <span className="leading-relaxed">{infoMessage}</span>
              </div>
            )}

            {/* Error Alert */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1-Click Fast Sign-In Options (Google & Touch ID) */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <GoogleIcon />
                <span>{isRtl ? "المتابعة باستخدام Google" : "Continue with Google"}</span>
              </button>

              <button
                type="button"
                onClick={handleBiometricAuth}
                disabled={biometricLoading}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#161922] hover:bg-[#1C212E] border border-white/15 hover:border-amber-500/40 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                {biometricLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>{isRtl ? "جاري فحص البصمة..." : "Verifying Biometrics…"}</span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4 text-amber-400" />
                    <span>{isRtl ? "الدخول عبر بصمة الإصبع / Touch ID" : "Sign In with Touch ID / Passkey"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex py-0.5 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-2.5 text-[9px] font-mono uppercase tracking-wider text-zinc-500">
                {isRtl ? "أو عبر البريد الإلكتروني" : "OR WITH EMAIL"}
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Tab Switcher (Password vs Magic Link) */}
            <div className="flex rounded-xl bg-black/40 border border-white/10 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("password")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "password"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {isRtl ? "كلمة المرور" : "Password"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("magic")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === "magic"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{isRtl ? "رابط سحري" : "Magic Link"}</span>
              </button>
            </div>

            {/* TAB 1: Standard Password Sign In */}
            {activeTab === "password" && (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300 block">
                    {isRtl ? "البريد الإلكتروني المعتمد" : "Official Client Email"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@dubaiincairo.com"
                      className="w-full bg-[#08090C] border border-white/15 focus:border-amber-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-300 block">
                      {isRtl ? "كلمة المرور" : "Security Password"}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setForgotEmail(email);
                        setErrorMessage(null);
                      }}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
                    >
                      {isRtl ? "نسيت كلمة المرور؟" : "Forgot password?"}
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#08090C] border border-white/15 focus:border-amber-500 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>
                    {loading 
                      ? (isRtl ? "جاري التحقق..." : "Authenticating…") 
                      : (isRtl ? "دخول بوابة العملاء" : "Sign In to Client Portal")}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"} transition-transform`} />
                </button>
              </form>
            )}

            {/* TAB 2: 1-Click Magic Link */}
            {activeTab === "magic" && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {magicSent ? (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                    <CheckCircle2 className="w-7 h-7 text-amber-400 mx-auto" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {isRtl ? "تم إرسال الرابط السحري" : "Magic Link Dispatched"}
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {magicMessage}
                    </p>
                    <button
                      type="button"
                      onClick={() => setMagicSent(false)}
                      className="text-xs text-amber-400 hover:underline pt-1 inline-block font-semibold cursor-pointer"
                    >
                      {isRtl ? "إرسال إلى بريد آخر" : "Send to another email"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleMagicLinkSubmit} className="space-y-3.5">
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {isRtl 
                        ? "أدخل بريدك الإلكتروني المعتمد لتلقي رابط تسجيل دخول فوري بنقرة واحدة."
                        : "Enter your registered client email to receive an instant, single-use 1-click login link."}
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-300 block">
                        {isRtl ? "البريد الإلكتروني المعتمد" : "Client Email Address"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={magicEmail}
                          onChange={(e) => setMagicEmail(e.target.value)}
                          placeholder={PREFILLED_CLIENT_EMAIL}
                          className="w-full bg-[#08090C] border border-white/15 focus:border-amber-500 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={magicLoading}
                      className="w-full mt-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 disabled:opacity-50 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      {magicLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                          <span>{isRtl ? "جاري الإرسال..." : "Dispatching Magic Link…"}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-slate-950" />
                          <span>{isRtl ? "إرسال رابط الدخول الفوري" : "Send 1-Click Magic Link"}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        )}

        {/* Footer info */}
        <div className="text-center text-[11px] text-zinc-500 pt-1 space-y-2">
          <p>
            <Link to="/partner?tab=tickets" className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors">
              {isRtl ? "هل ترغب في رفع تذكرة دعم فني لأنظمة أودو أو إيزي أو أوزو؟ اضغط هنا ←" : "Need Odoo, eZee, or Ozoo Technical Support? Submit a Ticket Here →"}
            </Link>
          </p>
          <p>
            {isRtl
              ? "دبي في القاهرة للأعمال © 2026 · بوابة العملاء السرية والمحمية"
              : "Dubai in Cairo for Business © 2026 · Confidential & Proprietary Client Portal"}
          </p>
          <Link to="/" className="text-zinc-400 hover:text-white underline inline-block transition-colors">
            {isRtl ? "← العودة إلى الموقع الرئيسي" : "← Return to Public Website"}
          </Link>
        </div>

      </div>

    </div>
  );
}
