import { useSEO } from "@/hooks/useSEO";
import PageTransition from "@/components/PageTransition";
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
import GoogleBusinessWidget from "@/components/GoogleBusinessWidget";

const Index = () => {
  useSEO({ titleKey: "seo_home_title", descriptionKey: "seo_home_description", canonical: "/", ogImageKey: "seo_home_og_image" });

  return (
    <PageTransition>
      <main id="main-content">
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
      </main>
    </PageTransition>
  );
};

export default Index;
