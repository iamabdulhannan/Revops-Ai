import {
  HeroSection,
  HowItWorks,
  FeatureGrid,
  PlatformCapabilities,
  AppEcosystem,
  WhoItsFor,
  SocialProof,
  PricingTable,
  CTASection,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeatureGrid />
      <PlatformCapabilities />
      <AppEcosystem />
      <WhoItsFor />
      <SocialProof />
      <PricingTable />
      <CTASection />
    </>
  );
}
