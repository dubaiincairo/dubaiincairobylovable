import { useSEO } from "@/hooks/useSEO";
import { useT } from "@/hooks/useT";
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
import SectionIndicator from "@/components/SectionIndicator";

const Index = () => {
  useSEO({ titleKey: "seo_home_title", descriptionKey: "seo_home_description", canonical: "/", ogImageKey: "seo_home_og_image" });
  const t = useT();

  const sections = [
    { id: "hero",         label: t("Home",         "الرئيسية") },
    { id: "about",        label: t("About",        "من نحن") },
    { id: "why",          label: t("Why Us",       "لماذا نحن") },
    { id: "work",         label: t("Clients",      "العملاء") },
    { id: "highlights",   label: t("Case Studies", "قصص النجاح") },
    { id: "team",         label: t("Founder",      "المؤسّس") },
    { id: "testimonials", label: t("Reviews",      "آراء العملاء") },
    { id: "contact",      label: t("Contact",      "تواصل معنا") },
  ];

  return (
    <PageTransition>
      <SectionIndicator sections={sections} />
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
