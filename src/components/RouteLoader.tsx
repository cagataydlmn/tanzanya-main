"use client";

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function RouteLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Pathname veya query parametreleri değiştiğinde yükleme ekranını kapat
  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Tıklanan eleman veya onun üst elemanlarında link (<a>) ara
      const anchor = target.closest('a');

      if (anchor) {
        const href = anchor.getAttribute('href');
        const targetAttr = anchor.getAttribute('target');

        // Sadece dahili, aynı sekmede açılan ve mevcut olmayan sayfa yönlendirmelerini yakala
        if (
          href && 
          href.startsWith('/') && 
          !href.startsWith('/#') && 
          targetAttr !== '_blank' &&
          href !== pathname
        ) {
          setLoading(true);
        }
      }
    };

    // Global klik dinleyicisi ekle
    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50/90 backdrop-blur-sm text-stone-900">
      <div className="flex flex-col items-center text-center space-y-6">
        
        {/* Animated Hammer */}
        <div className="relative">
          <svg className="w-16 h-16 text-amber-700 animate-hammer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15 5 4 4" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.5 4.5 19.5 2.5a1 1 0 0 0-1.4 0l-6.5 6.5 4 4 6.5-6.5a1 1 0 0 0 0-1.4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.5 9.5-8.5 8.5v3h3l8.5-8.5" />
          </svg>
        </div>
        
        {/* Brand details */}
        <div className="space-y-2 flex flex-col items-center">
          <Image 
            src="/logo/StarDecorLogo_page-0002.jpg"
            alt="Tanzanya Logo"
            width={160}
            height={50}
            priority
            className="h-10 w-auto object-contain mb-1 rounded-md"
          />
          <div className="w-12 h-[2px] bg-amber-700 mx-auto"></div>
          <p className="text-xs text-stone-500 font-medium uppercase tracking-widest animate-pulse mt-2">
            Tasarımlar Hazırlanıyor...
          </p>
        </div>

      </div>
    </div>
  );
}

export default function RouteLoader() {
  return (
    <Suspense fallback={null}>
      <RouteLoaderInner />
    </Suspense>
  );
}
