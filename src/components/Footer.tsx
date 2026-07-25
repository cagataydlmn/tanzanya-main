"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import SocialIcon from '@/components/SocialIcon';

export default function Footer({ settings }: { settings?: any }) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  let socialLinks: any[] = [];
  try {
    socialLinks = settings?.socialLinks 
      ? (typeof settings.socialLinks === 'string' ? JSON.parse(settings.socialLinks) : settings.socialLinks) 
      : [];
  } catch(e) {}

  return (
    <footer className="bg-stone-900 text-stone-300 pt-20 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="space-y-6 lg:col-span-3">
            <Link href="/" className="flex items-center block">
              <Image 
                src="/logo/logo.jpeg"
                alt="Tanzanya Logo"
                width={160}
                height={50}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-stone-400">
              Geleneksel ahşap ustalığını modern tasarım vizyonuyla birleştirerek, yaşam ve çalışma alanlarınıza değer katan anahtar teslim mobilya çözümleri sunuyoruz.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((link: any, index: number) => {
                return (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-500 transition-colors" title={link.platform}>
                    <span className="sr-only">{link.platform}</span>
                    <SocialIcon platform={link.platform} className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Bağlantılar</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-amber-500 transition-colors">Kurumsal</Link></li>
              <li><Link href="/services" className="hover:text-amber-500 transition-colors">Hizmetlerimiz</Link></li>
              <li><Link href="/projects" className="hover:text-amber-500 transition-colors">Referans Projeler</Link></li>
              <li><Link href="/gallery" className="hover:text-amber-500 transition-colors">Galeri</Link></li>
              <li><Link href="/production" className="hover:text-amber-500 transition-colors">Üretim Tesisimiz</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">İletişim</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{settings?.address || 'Mikocheni B, Rose Garden Road, Uzima Street, Kinondoni District, Dar es Salaam, Tanzania'}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{settings?.phone1 || '0 651 137 287'}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{settings?.email || 'stardecortz@gmail.com'}</span>
              </li>
            </ul>
          </div>

          {/* Map Location */}
          <div className="lg:col-span-4 h-[250px] w-full rounded-lg overflow-hidden bg-stone-800 border border-stone-800 relative">
            <iframe 
              src={settings?.mapIframe || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.062996987857!2d39.2519711!3d-6.7621734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4d7b36781765%3A0x212569b7181875a7!2sersanfurnitureTZ!5e0!3m2!1str!2str!4v1784646295368!5m2!1str!2str"} 
              className="absolute inset-0 w-full h-full border-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>&copy; {currentYear} Tanzanya Mobilya & Dekorasyon. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-amber-500 transition-colors">Gizlilik Politikası</Link>
            <Link href="/terms" className="hover:text-amber-500 transition-colors">Kullanım Şartları</Link>
            <Link href="/kvkk" className="hover:text-amber-500 transition-colors">KVKK Aydınlatma Metni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
