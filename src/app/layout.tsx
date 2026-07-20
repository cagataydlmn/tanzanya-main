import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteLoader from "@/components/RouteLoader";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
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
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="bg-stone-50 text-stone-900 antialiased">
        <RouteLoader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
