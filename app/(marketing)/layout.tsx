import type { Metadata } from "next";
import Providers from "@/components/Providers";
import TerminalTrigger from "@/components/terminal/TerminalTrigger";

export const metadata: Metadata = {
  title: "Antanox — Proprietary Infrastructure. Engineered for Consequence.",
  description:
    "Digital architecture and security intelligence for organizations where failure is not an option.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers />
      {children}
      <TerminalTrigger />
    </>
  );
}
