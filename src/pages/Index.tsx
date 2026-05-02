import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import WhyDifferentSection from "@/components/WhyDifferentSection";
import ValuesSection from "@/components/ValuesSection";
import FounderSection from "@/components/FounderSection";
import ClientsSection from "@/components/ClientsSection";
import HighlightsSection from "@/components/HighlightsSection";
import TechStackTeaser from "@/components/TechStackTeaser";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import BankAccountsSection from "@/components/BankAccountsSection";
import Footer from "@/components/Footer";
import GoogleBusinessWidget from "@/components/GoogleBusinessWidget";

const Index = () => {
  useSEO({
    title: "Dubai in Cairo — Digital Marketing & eBusiness Agency in Cairo, Egypt",
    description: "Dubai in Cairo is Cairo's leading digital marketing and eBusiness solutions agency. Data-driven growth, eCommerce, branding, and Odoo ERP across Egypt and the Middle East. شركة دبي في القاهرة للتسويق الرقمي.",
    canonical: "/",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <WhyDifferentSection />
      <ClientsSection />
      <HighlightsSection />
      <ValuesSection />
      <FounderSection />
      <TestimonialsSection />
      <TechStackTeaser />
      <BankAccountsSection />
      <ContactSection />
      <GoogleBusinessWidget />
      <Footer />
    </div>
  );
};

export default Index;
