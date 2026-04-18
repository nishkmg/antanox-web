import type { Metadata } from "next";

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
  return <>{children}</>;
}
