import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteLoader from "@/components/RouteLoader";
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
  title: {
    default: "Tanzanya Mobilya & Dekorasyon",
    template: "%s | Tanzanya Mobilya & Dekorasyon",
  },
  description: "Kurumsal Mobilya Üretim ve İç Mimarlık Hizmetleri. Ev, ofis, okul ve ticari alanlar için yüksek kaliteli ve özel tasarım ahşap mobilya çözümleri.",
  keywords: ["mobilya üretimi", "iç mimarlık", "özel tasarım mobilya", "kurumsal mobilya", "ahşap dekorasyon", "tanzanya mobilya", "anahtar teslim dekorasyon"],
  authors: [{ name: "Tanzanya Mobilya" }],
  creator: "Tanzanya Mobilya",
  publisher: "Tanzanya Mobilya",
  openGraph: {
    title: "Tanzanya Mobilya & Dekorasyon",
    description: "Kurumsal Mobilya Üretim ve İç Mimarlık Hizmetleri",
    url: "https://tanzanyamobilya.com",
    siteName: "Tanzanya Mobilya",
    locale: "tr_TR",
    type: "website",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-stone-50 text-stone-900 antialiased">
        <RouteLoader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
