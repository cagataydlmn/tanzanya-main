"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check auth status on mount
    const authStatus = localStorage.getItem('tanzanyaAdminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@tanzanya.com' && password === '12345678') {
      localStorage.setItem('tanzanyaAdminAuth', 'true');
      setIsAuthenticated(true);
      router.push('/admin');
    } else {
      setError('Hatalı e-posta veya şifre girdiniz.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tanzanyaAdminAuth');
    setIsAuthenticated(false);
    router.push('/admin');
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 001 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Hero Slider", href: "/admin/slides", icon: "M7 4v16M17 4v16M3 8h18M3 16h18" },
    { name: "Gelen Teklifler", href: "/admin/quotes", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { name: "Projeler", href: "/admin/projects", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { name: "Galeri", href: "/admin/gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "Blog", href: "/admin/blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0012.586 3H12" }
  ];

  // Prevent flash of content while checking auth
  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center">Yükleniyor...</div>;
  }

  // Show Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white border border-stone-200 shadow-xl p-8 md:p-12">
          <div className="flex flex-col items-center mb-8">
            <Image 
              src="/logo/logo.jpeg"
              alt="Tanzanya Logo"
              width={180}
              height={55}
              className="h-12 w-auto object-contain mb-3"
            />
            <p className="text-stone-500 text-xs uppercase tracking-widest">Yönetim Paneli Girişi</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">E-Posta Adresi</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors" 
                placeholder="admin@tanzanya.com" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">Şifre</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors" 
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-stone-900 text-white font-bold text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors mt-4"
            >
              Giriş Yap
            </button>

            <div className="text-center mt-6">
              <Link href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
                ← Siteye Dön
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Show Admin Dashboard if authenticated
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex-shrink-0 shadow-xl z-20">
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <Link href="/admin" className="flex flex-col gap-2">
            <Image 
              src="/logo/logo.jpeg"
              alt="Tanzanya Logo"
              width={130}
              height={40}
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <span className="block text-[10px] font-sans text-amber-500 font-normal tracking-widest mt-1">YÖNETİM PANELİ</span>
          </Link>
          <Link href="/" className="md:hidden p-2 text-stone-500 hover:text-white" title="Siteye Dön">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                  isActive 
                    ? 'bg-amber-700 text-white' 
                    : 'text-stone-400 hover:bg-stone-800 hover:text-stone-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-stone-800 hover:text-red-300 transition-colors rounded mb-2 text-left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium text-sm">Çıkış Yap</span>
          </button>

          <Link href="/" className="hidden md:flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium text-sm">Siteye Dön</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-stone-200 px-8 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-serif text-stone-900">
            {menuItems.find(m => m.href === pathname)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center text-stone-600 font-bold" title="Admin">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8 relative">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
