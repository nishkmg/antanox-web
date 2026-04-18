import type { Metadata } from "next";
import Hero from "@/components/marketing/Hero";
import ServicesGrid from "@/components/marketing/ServicesGrid";
import PulseFeature from "@/components/marketing/PulseFeature";
import ProtocolSteps from "@/components/marketing/ProtocolSteps";
import ArchitectureToggle from "@/components/marketing/ArchitectureToggle";
import EngagementsGrid from "@/components/marketing/EngagementsGrid";
import FooterCTA from "@/components/marketing/FooterCTA";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Antanox — Proprietary Infrastructure. Engineered for Consequence.",
  description:
    "Digital architecture and security intelligence for organizations where failure is not an option.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <PulseFeature />
      <ProtocolSteps />
      <ArchitectureToggle />
      <EngagementsGrid />
      <FooterCTA />
      <Footer />
    </main>
  );
}
