import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SiteContentProvider } from "@/hooks/useSiteContent";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./pages/CaseStudy";
import Careers from "./pages/Careers";
import Investors from "./pages/Investors";
import OdooPartner from "./pages/OdooPartner";
import OdooPartnerPage from "./pages/OdooPartnerPage";
import YanoljaPartnerPage from "./pages/YanoljaPartnerPage";
import ZohoPartnerPage from "./pages/ZohoPartnerPage";
import Tech from "./pages/Tech";
import Studios from "./pages/Studios";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerTimeTracker from "./pages/PartnerTimeTracker";
import HospitalityApi from "./pages/HospitalityApi";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieBanner from "./components/CookieBanner";
import FaviconUpdater from "./components/FaviconUpdater";
import SkipToMain from "./components/SkipToMain";
import ScrollToTop from "./components/ScrollToTop";
import ContentGate from "./components/ContentGate";
import { ContactModalProvider } from "./context/ContactModalContext";
import { ContactModal } from "./components/ContactModal";
import GoogleIntegrations from "./components/GoogleIntegrations";

const queryClient = new QueryClient();

const CHROMELESS_PATHS = ["/login", "/admin", "/reset-password", "/partner"];

const AnimatedRoutes = () => {
  const location = useLocation();
  const showChrome = !CHROMELESS_PATHS.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <ScrollToTop />
      {showChrome && (
        <>
          <Navbar />
          {/* Top fade: solid background under the navbar fading to transparent
              below, so page content scrolling up doesn't visually overlap the
              navbar even with its semi-transparent backdrop. */}
          <div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-[110px] pointer-events-none z-40"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 50%, transparent 100%)",
            }}
          />
        </>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/investors" element={<Investors />} />
          {/* Partnerships — redirect legacy /partnerships to Odoo page */}
          <Route path="/partnerships" element={<Navigate to="/partnerships/odoo" replace />} />
          <Route path="/odoo-partner" element={<Navigate to="/partnerships/odoo" replace />} />
          <Route path="/partnerships/odoo" element={<OdooPartnerPage />} />
          <Route path="/partnerships/yanolja" element={<YanoljaPartnerPage />} />
          <Route path="/partnerships/zoho" element={<ZohoPartnerPage />} />
          <Route path="/studios" element={<Studios />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/hospitalityapi" element={<HospitalityApi />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/partner" element={<PartnerTimeTracker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {showChrome && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteContentProvider>
        <GoogleIntegrations />
        <ContactModalProvider>
          <ContactModal />
          <FaviconUpdater />
          <BrowserRouter>
            <SkipToMain />
            <CookieBanner />
            <ContentGate>
              <AnimatedRoutes />
            </ContentGate>
            <WhatsAppButton />
          </BrowserRouter>
        </ContactModalProvider>
      </SiteContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
