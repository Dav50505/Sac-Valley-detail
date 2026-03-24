import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import {
  siteDescription,
  siteKeywords,
  siteName,
  siteTitle,
  siteUrl,
  socialImagePath,
} from "@/lib/site";
import "./globals.css";

const headingFont = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [...siteKeywords],
  category: "automotive",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    images: [
      {
        url: socialImagePath,
        width: 1200,
        height: 630,
        alt: `${siteName} social share image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImagePath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}
