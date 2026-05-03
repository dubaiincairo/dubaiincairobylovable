import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SiteContentProvider } from "@/hooks/useSiteContent";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./pages/CaseStudy";
import Careers from "./pages/Careers";
import OdooPartner from "./pages/OdooPartner";
import OdooPartnerPage from "./pages/OdooPartnerPage";
import YanoljaPartnerPage from "./pages/YanoljaPartnerPage";
import ZohoPartnerPage from "./pages/ZohoPartnerPage";
import Tech from "./pages/Tech";
import Studios from "./pages/Studios";
import WhatsAppButton from "./components/WhatsAppButton";
import FaviconUpdater from "./components/FaviconUpdater";
import { ContactModalProvider } from "./context/ContactModalContext";
import { ContactModal } from "./components/ContactModal";
import GoogleIntegrations from "./components/GoogleIntegrations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WhatsAppButton />
      <SiteContentProvider>
        <GoogleIntegrations />
        <ContactModalProvider>
          <ContactModal />
          <FaviconUpdater />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudy />} />
            <Route path="/careers" element={<Careers />} />
            {/* Partnerships — redirect legacy /partnerships to Odoo page */}
            <Route path="/partnerships" element={<Navigate to="/partnerships/odoo" replace />} />
            <Route path="/odoo-partner" element={<Navigate to="/partnerships/odoo" replace />} />
            <Route path="/partnerships/odoo" element={<OdooPartnerPage />} />
            <Route path="/partnerships/yanolja" element={<YanoljaPartnerPage />} />
            <Route path="/partnerships/zoho" element={<ZohoPartnerPage />} />
            <Route path="/studios" element={<Studios />} />
            <Route path="/tech" element={<Tech />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </ContactModalProvider>
      </SiteContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
