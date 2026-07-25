import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteLoader from "@/components/RouteLoader";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
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

import { getContactSettings } from '@/app/actions/contact';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactRes = await getContactSettings();
  const contactSettings = contactRes.success ? contactRes.data : null;

  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable}`}>
      <body className="bg-stone-50 text-stone-900 antialiased">
        <RouteLoader />
        <Navbar />
        {children}
        <Footer settings={contactSettings} />
      </body>
    </html>
  );
}
