"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  img: string;
  createdAt: Date;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

const getMasonrySize = (index: number) => {
  const sizes = [
    "col-span-1 md:col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 md:col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1"
  ];
  return sizes[index % sizes.length];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1));
      }
    };

    if (activeIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // lock background scroll
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeIndex, items.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
        {items.map((img, i) => (
          <div 
            key={img.id} 
            onClick={() => setActiveIndex(i)}
            className={`group relative bg-stone-200 overflow-hidden cursor-pointer shadow-sm ${getMasonrySize(i)}`}
          >
            <Image 
              src={img.img || "/dummygorsel/factory_workshop.png"}
              alt={img.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Hover overlay with title & category */}
            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/70 transition-colors duration-300 flex flex-col items-center justify-center p-4">
              <span className="text-white opacity-0 group-hover:opacity-100 font-serif text-base md:text-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-center font-bold px-2">
                {img.title}
              </span>
              <span className="text-amber-500 opacity-0 group-hover:opacity-100 text-xs uppercase tracking-widest mt-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-bold">
                {img.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-stone-950/90 backdrop-blur-md p-4 md:p-8 select-none transition-opacity duration-300"
          onClick={() => setActiveIndex(null)}
        >
          {/* Lightbox Header Controls */}
          <div className="flex justify-between items-center text-white z-20">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              {activeIndex + 1} / {items.length}
            </span>
            <button 
              onClick={() => setActiveIndex(null)}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Core Lightbox Image & Arrow Controls */}
          <div className="relative flex-1 w-full flex items-center justify-center my-4">
            
            {/* Left Navigation Arrow */}
            <button 
              onClick={handlePrev}
              className="absolute left-2 md:left-4 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Önceki Görsel"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Centered Image (Protects original ratio) */}
            <div 
              className="relative w-full h-full max-w-5xl max-h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // prevent close when clicking image
            >
              <Image 
                src={items[activeIndex].img || "/dummygorsel/factory_workshop.png"}
                alt={items[activeIndex].title}
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </div>

            {/* Right Navigation Arrow */}
            <button 
              onClick={handleNext}
              className="absolute right-2 md:right-4 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Sonraki Görsel"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>

          {/* Lightbox Footer Details */}
          <div className="text-center text-white z-20 mt-2">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest block mb-1">
              {items[activeIndex].category}
            </span>
            <h3 className="text-lg md:text-xl font-serif font-bold tracking-wide">
              {items[activeIndex].title}
            </h3>
          </div>

        </div>
      )}
    </>
  );
}
