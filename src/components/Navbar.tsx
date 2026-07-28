"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu when clicking outside of the navbar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isMobileMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Production', href: '/production' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm transition-all duration-500">
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 md:py-6 max-w-[1600px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center shrink-0 mr-8"
        >
          <Image
            src="/logo/StarDecorLogo_page-0002.jpg"
            alt="Tanzanya Logo"
            width={160}
            height={50}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm uppercase tracking-widest transition-colors whitespace-nowrap ${isActive ? 'text-amber-700' : 'text-stone-600 hover:text-amber-700'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/quote"
            className="hidden sm:inline-flex items-center justify-center px-8 py-3 bg-stone-900 text-white font-medium text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:bg-amber-700 hover:shadow-luxury"
          >
            Get A Quote
          </Link>

          <button
            className="xl:hidden p-2 text-stone-900 hover:bg-stone-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200 shadow-lg flex flex-col max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-6 py-4 border-b border-stone-100 font-medium text-sm uppercase tracking-widest transition-colors ${isActive ? 'bg-stone-50 text-amber-700' : 'text-stone-700 hover:bg-stone-50'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="p-6 sm:hidden">
            <Link
              href="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center px-8 py-4 bg-stone-900 text-white font-semibold text-sm uppercase tracking-wider transition-colors hover:bg-amber-700"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
