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

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://antanox.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Antanox — Proprietary Infrastructure. Engineered for Consequence.",
  description:
    "Digital architecture and security intelligence for organizations where failure is not an option.",
  keywords: [
    "digital architecture",
    "security intelligence",
    "Penetration testing",
    "MITRE ATT&CK",
    "ARS Score",
    "infosec",
    "cybersecurity",
  ],
  authors: [{ name: "Antanox Technologies" }],
  creator: "Antanox Technologies",
  publisher: "Antanox Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Antanox",
    title: "Antanox — Proprietary Infrastructure. Engineered for Consequence.",
    description:
      "Digital architecture and security intelligence for organizations where failure is not an option.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Antanox — Proprietary Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@antanox",
    creator: "@antanox",
    title: "Antanox — Proprietary Infrastructure",
    description:
      "Digital architecture and security intelligence for organizations where failure is not an option.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
