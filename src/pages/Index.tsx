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
