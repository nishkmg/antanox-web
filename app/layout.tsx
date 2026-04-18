import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antanox — Proprietary Infrastructure. Engineered for Consequence.",
  description:
    "Digital architecture and security intelligence for organizations where failure is not an option.",
  keywords: [
    "digital architecture",
    "security intelligence",
    "Penetration testing",
    "MITRE ATT&CK",
    "ARS Score",
  ],
  authors: [{ name: "Antanox Technologies" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://antanox.com",
    siteName: "Antanox",
    title: "Antanox — Proprietary Infrastructure. Engineered for Consequence.",
    description:
      "Digital architecture and security intelligence for organizations where failure is not an option.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antanox — Proprietary Infrastructure",
    description:
      "Digital architecture and security intelligence for organizations where failure is not an option.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
