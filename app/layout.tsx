import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const siteUrl = "https://100xlift.com";

export const metadata: Metadata = {
  title: "100XLift",
  description: "100XLift digital systems for growth-focused businesses",
  metadataBase: new URL(siteUrl),
  applicationName: "100XLift",
  keywords: [
    "100XLift",
    "website development",
    "web design",
    "landing page design",
    "UI UX design",
    "SEO",
    "branding",
    "digital systems",
    "case studies",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "100XLift",
    description: "100XLift digital systems for growth-focused businesses",
    siteName: "100XLift",
    images: [
      {
        url: "/100xlift-building.png",
        width: 1200,
        height: 630,
        alt: "100XLift building showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "100XLift",
    description: "100XLift digital systems for growth-focused businesses",
    images: ["/100xlift-building.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7ef" },
  ],
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
      className={cn("h-full", "scroll-smooth", "antialiased", "dark", inter.variable)}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[var(--page-bg)] text-[var(--page-fg)] transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--accent-lime)] focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
