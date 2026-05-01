import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Tech from "./pages/Tech";
import Studios from "./pages/Studios";
import WhatsAppButton from "./components/WhatsAppButton";
import FaviconUpdater from "./components/FaviconUpdater";
import { ContactModalProvider } from "./context/ContactModalContext";
import { ContactModal } from "./components/ContactModal";
import { SpeedInsights } from "@vercel/speed-insights/react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SpeedInsights />
      <WhatsAppButton />
      <SiteContentProvider>
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
            <Route path="/partnerships" element={<OdooPartner />} />
            <Route path="/odoo-partner" element={<OdooPartner />} />
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
