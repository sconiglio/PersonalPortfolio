import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { SmoothScrollProvider } from "../components/providers/SmoothScrollProvider";
import VisitorTracker from "../components/analytics/VisitorTracker";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://YOUR_DOMAIN.com"),
  title: "YOUR_NAME - YOUR_TITLE",
  description:
    "Portfolio website showcasing my work in YOUR_EXPERTISE and YOUR_FIELD",
  keywords: [
    "YOUR_NAME",
    "YOUR_TITLE",
    "YOUR_EXPERTISE",
    "Portfolio",
    "YOUR_SKILLS",
  ],
  authors: [{ name: "YOUR_NAME" }],
  creator: "YOUR_NAME",
  publisher: "YOUR_NAME",
  openGraph: {
    title: "YOUR_NAME - YOUR_TITLE",
    description: "Learn more about YOUR_NAME - YOUR_TITLE and YOUR_EXPERTISE",
    url: "https://YOUR_DOMAIN.com",
    siteName: "YOUR_NAME Portfolio",
    images: [
      {
        url: "https://YOUR_DOMAIN.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "YOUR_NAME - YOUR_TITLE",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOUR_NAME - YOUR_TITLE",
    description: "Learn more about YOUR_NAME - YOUR_TITLE and YOUR_EXPERTISE",
    images: ["https://YOUR_DOMAIN.com/og-image.png"],
    creator: "@YOUR_TWITTER_HANDLE",
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
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://YOUR_DOMAIN.com",
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
        />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SmoothScrollProvider>
            <VisitorTracker />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
