import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fintrackr-lg.vercel.app"),
  title: {
    default: "FinTrackr — Smart Personal Finance Tracker",
    template: "%s | FinTrackr",
  },
  description:
    "Track your income, expenses, and savings effortlessly with FinTrackr — a modern personal finance dashboard built for simplicity and insight.",
  keywords: [
    "FinTrackr",
    "personal finance app",
    "expense tracker",
    "income management",
    "budget planner",
    "Next.js finance app",
    "Lakshay Garg",
  ],
  authors: [{ name: "Lakshay Garg" }],
  creator: "Lakshay Garg",
  publisher: "FinTrackr",
  alternates: {
    canonical: "https://fintrackr-lg.vercel.app",
  },
  openGraph: {
    title: "FinTrackr — Smart Personal Finance Dashboard",
    description:
      "Visualize your income and expenses effortlessly. FinTrackr helps you stay in control of your finances with a clean, modern dashboard.",
    url: "https://fintrackr-lg.vercel.app",
    siteName: "FinTrackr",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://fintrackr-lg.vercel.app/og-image.png", // Create this image under /public/
        width: 1200,
        height: 630,
        alt: "FinTrackr — Modern Personal Finance Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinTrackr — Smart Personal Finance Tracker",
    description:
      "Track and manage your finances like a pro. Built by Lakshay Garg.",
    creator: "@LakshayGar80312",
    images: ["https://fintrackr-lg.vercel.app/og-image.png"],
  },
  themeColor: "#4F46E5", // Indigo brand color
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50 text-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}
