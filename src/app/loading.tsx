import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50/90 backdrop-blur-sm text-stone-900">
      <div className="flex flex-col items-center text-center space-y-6">
        
        {/* Animated Claw Hammer SVG */}
        <div className="relative">
          <svg className="w-16 h-16 text-amber-700 animate-hammer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* Claw Hammer Head */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15 5 4 4" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.5 4.5 19.5 2.5a1 1 0 0 0-1.4 0l-6.5 6.5 4 4 6.5-6.5a1 1 0 0 0 0-1.4z" />
            {/* Handle */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.5 9.5-8.5 8.5v3h3l8.5-8.5" />
          </svg>
        </div>
        
        {/* Brand details */}
        <div className="space-y-2 flex flex-col items-center">
          <Image 
            src="/logo/StarDecorLogo_page-0002.png"
            alt="Tanzanya Logo"
            width={160}
            height={50}
            priority
            className="h-10 w-auto object-contain mb-1"
          />
          <div className="w-12 h-[2px] bg-amber-700 mx-auto"></div>
          <p className="text-xs text-stone-500 font-medium uppercase tracking-widest animate-pulse mt-2">
            Preparing Designs...
          </p>
        </div>

      </div>
    </div>
  );
}
