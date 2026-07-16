"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-stone-900 text-stone-300 pt-20 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-serif font-bold text-white tracking-tight block">
              TANZANYA.
            </Link>
            <p className="text-sm leading-relaxed text-stone-400">
              Geleneksel ahşap ustalığını modern tasarım vizyonuyla birleştirerek, yaşam ve çalışma alanlarınıza değer katan anahtar teslim mobilya çözümleri sunuyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Hızlı Bağlantılar</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-amber-500 transition-colors">Kurumsal</Link></li>
              <li><Link href="/services" className="hover:text-amber-500 transition-colors">Hizmetlerimiz</Link></li>
              <li><Link href="/products" className="hover:text-amber-500 transition-colors">Ürünlerimiz</Link></li>
              <li><Link href="/projects" className="hover:text-amber-500 transition-colors">Referans Projeler</Link></li>
              <li><Link href="/gallery" className="hover:text-amber-500 transition-colors">Galeri</Link></li>
              <li><Link href="/blog" className="hover:text-amber-500 transition-colors">Blog & Haberler</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Müşteri Hizmetleri</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/production" className="hover:text-amber-500 transition-colors">Üretim Tesisimiz</Link></li>
              <li><Link href="/faq" className="hover:text-amber-500 transition-colors">Sık Sorulan Sorular</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 transition-colors">İletişim</Link></li>
              <li><Link href="/quote" className="hover:text-amber-500 transition-colors">Teklif Al</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">İletişim</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Organize Sanayi Bölgesi, Mobilyacılar Cad. No: 42 İnegöl / Bursa</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+90 (224) 555 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@tanzanyamobilya.com</span>
              </li>
            </ul>
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
