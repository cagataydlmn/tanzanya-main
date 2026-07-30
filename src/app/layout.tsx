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
    default: "Star Decor | Premium Furniture & Interior Design",
    template: "%s | Star Decor Tanzania",
  },
  description: "Leading furniture manufacturing and interior design services in Dar es Salaam, Tanzania. High-quality, custom wooden furniture solutions for homes, offices, hotels, and commercial spaces.",
  keywords: [
    "furniture Tanzania",
    "interior design Dar es Salaam",
    "custom furniture Tanzania",
    "office furniture Dar es Salaam",
    "Star Decor Tanzania",
    "luxury wooden furniture",
    "hotel furniture Tanzania"
  ],
  authors: [{ name: "Star Decor" }],
  creator: "Star Decor",
  publisher: "Star Decor",
  icons: {
    icon: '/logo/StarDecorLogo_page-0009.jpg',
    shortcut: '/logo/StarDecorLogo_page-0009.jpg',
    apple: '/logo/StarDecorLogo_page-0009.jpg',
  },
  openGraph: {
    title: "Star Decor | Premium Furniture & Interior Design in Tanzania",
    description: "Leading furniture manufacturing and interior design services in Dar es Salaam, Tanzania.",
    url: "https://stardecortz.com",
    siteName: "Star Decor",
    locale: "en_TZ",
    type: "website",
    images: [{ url: '/logo/StarDecorLogo_page-0009.jpg' }],
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
