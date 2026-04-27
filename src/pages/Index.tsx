import { motion } from "framer-motion";
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
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-28 -left-16 h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-[120px]"
        animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0], opacity: [0.55, 0.72, 0.5, 0.55] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[140px]"
        animate={{ x: [0, -50, 30, 0], y: [0, 20, -25, 0], opacity: [0.45, 0.6, 0.38, 0.45] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <Navbar />
      <HeroSection />
      <AnimatedSection delay={0.05}><StatsSection /></AnimatedSection>
      <AnimatedSection delay={0.08}><AboutSection /></AnimatedSection>
      <AnimatedSection delay={0.11}><WhyDifferentSection /></AnimatedSection>
      <AnimatedSection delay={0.14}><ClientsSection /></AnimatedSection>
      <AnimatedSection delay={0.17}><HighlightsSection /></AnimatedSection>
      <AnimatedSection delay={0.2}><ValuesSection /></AnimatedSection>
      <AnimatedSection delay={0.23}><FounderSection /></AnimatedSection>
      <AnimatedSection delay={0.26}><TestimonialsSection /></AnimatedSection>
      <AnimatedSection delay={0.29}><TechStackTeaser /></AnimatedSection>
      <AnimatedSection delay={0.32}><BankAccountsSection /></AnimatedSection>
      <AnimatedSection delay={0.35}><ContactSection /></AnimatedSection>
      <AnimatedSection delay={0.38}><GoogleBusinessWidget /></AnimatedSection>
      <Footer />
    </div>
  );
};

export default Index;
