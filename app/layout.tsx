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

const description =
  "Webbriks is a global creative agency: websites, online stores, Meta & Google ads and product photo & video that grow your business.";

// Link previews: every page shares app/opengraph-image.jpg unless its folder has its own
// (careers, pricing, portfolio and case studies do). metadataBase turns those into full URLs.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.webbriks.com"),
  title: "Webbriks | Global Creative Agency",
  description,
  // No og:title / og:description here on purpose: children would inherit them. Without them, apps fall back to
  // each page's own <title> and meta description, so a shared careers link reads "Careers | Webbriks".
  openGraph: { type: "website", siteName: "Webbriks", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
