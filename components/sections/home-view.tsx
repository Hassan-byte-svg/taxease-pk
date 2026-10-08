import { AppShowcase } from "@/components/sections/app-showcase";
import { DeadlineBanner } from "@/components/sections/deadline-banner";
import { FaqSection } from "@/components/sections/faq-section";
import { FeatureBento } from "@/components/sections/feature-bento";
import { HomeHero } from "@/components/sections/home-hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PricingSection } from "@/components/sections/pricing-section";
import { SalaryCalculator } from "@/components/sections/salary-calculator";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustMarquee } from "@/components/sections/trust-marquee";

export function HomeView() {
  return (
    <main id="content">
      <HomeHero />
      <TrustMarquee />
      <HowItWorks />
      <FeatureBento />
      <PricingSection />
      <SalaryCalculator />
      <AppShowcase />
      <Testimonials />
      <FaqSection />
      <DeadlineBanner />
    </main>
  );
}
