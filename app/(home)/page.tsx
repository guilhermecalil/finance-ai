import ImpactSection from "@/app/_components/landing/ImpactSection";
import { CallToActionSection } from "../_components/landing/CallToActionSection";
import { FeaturesSection } from "../_components/landing/FeaturesSection";
import { Footer } from "../_components/landing/Footer";
import { Header } from "../_components/landing/Header";
import HeroSection from "../_components/landing/HeroSection";
import InfoStepsSection from "../_components/landing/InfoStepsSection";
import { PricingSection } from "../_components/landing/PricingSection";
import ScrollToTop from "../_components/ScrollToTop";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Header Moderno */}
      <Header />
      {/* Hero Section Revolucionário */}
      <HeroSection />
      {/* Features Section Moderno */}
      <FeaturesSection />
      {/* Pricing Section Premium */}
      <PricingSection />
      {/* Impact Section */}
      <ImpactSection />
      {/* Info Sction */}
      <InfoStepsSection />
      {/* CTA Final */}
      <CallToActionSection />
      {/* Scrool to Top */}
      <ScrollToTop />
      {/* Footer */}
      <Footer />
    </main>
  );
}
