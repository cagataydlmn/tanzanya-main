"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ProjectGalleryViewProps {
  images: string[];
  projectName: string;
  category: string;
}

export default function ProjectGalleryView({
  images,
  projectName,
  category,
}: ProjectGalleryViewProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const safeImages = images && images.length > 0 
    ? images 
    : ["/dummygorsel/factory_workshop.png"];

  const openLightbox = (index: number) => {
    setLightboxIdx(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIdx((prev) => (prev > 0 ? prev - 1 : safeImages.length - 1));
  }, [safeImages.length]);

  const handleNext = useCallback(() => {
    setLightboxIdx((prev) => (prev < safeImages.length - 1 ? prev + 1 : 0));
  }, [safeImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    if (lightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen, closeLightbox, handleNext, handlePrev]);


  return (
    <div className="space-y-4 mb-10">
      {/* 1. Main Showcase Image */}
      <div 
        onClick={() => openLightbox(activeIdx)}
        className="relative aspect-[16/10] md:aspect-[21/9] w-full rounded-xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 group cursor-pointer"
      >
        <Image 
          src={safeImages[activeIdx]}
          alt={`${projectName} - Image ${activeIdx + 1}`}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent pointer-events-none" />

        {/* Floating Zoom & Counter Badges */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {safeImages.length > 1 && (
            <span className="px-3 py-1 bg-stone-950/75 backdrop-blur-md border border-white/10 text-white text-xs font-semibold rounded-md shadow">
              {activeIdx + 1} / {safeImages.length}
            </span>
          )}
          <span className="w-8 h-8 rounded-md bg-stone-950/75 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:text-amber-400 transition-colors shadow">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </span>
        </div>

        {/* In-Showcase Arrow Controls if multiple */}
        {safeImages.length > 1 && (
          <div className="absolute inset-y-0 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx((prev) => (prev > 0 ? prev - 1 : safeImages.length - 1));
              }}
              className="pointer-events-auto w-11 h-11 rounded-full bg-stone-950/60 hover:bg-amber-700 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg -translate-x-2 group-hover:translate-x-0"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx((prev) => (prev < safeImages.length - 1 ? prev + 1 : 0));
              }}
              className="pointer-events-auto w-11 h-11 rounded-full bg-stone-950/60 hover:bg-amber-700 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg translate-x-2 group-hover:translate-x-0"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 2. Horizontal Thumbnails Strip (if > 1 image) */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {safeImages.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                idx === activeIdx 
                  ? 'border-amber-600 scale-105 shadow-md ring-2 ring-amber-600/30' 
                  : 'border-stone-200 opacity-60 hover:opacity-100'
              }`}
            >
              <Image 
                src={url} 
                alt="" 
                fill 
                unoptimized 
                sizes="120px"
                className="object-cover" 
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-stone-950/95 backdrop-blur-md p-4 md:p-8 select-none"
          onClick={closeLightbox}
        >
          {/* Lightbox Header */}
          <div className="flex justify-between items-center text-white z-20">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-950/60 border border-amber-800/40 rounded">
                {category}
              </span>
              <span className="text-xs font-medium text-stone-400">
                {lightboxIdx + 1} / {safeImages.length}
              </span>
            </div>

            <button 
              onClick={closeLightbox}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lightbox Center Image Showcase */}
          <div className="relative flex-1 w-full flex items-center justify-center my-4">
            {safeImages.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 md:left-6 z-20 w-12 h-12 bg-white/10 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Önceki Görsel"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <div 
              className="relative w-full h-full max-w-5xl max-h-[72vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={safeImages[lightboxIdx]}
                alt={projectName}
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </div>

            {safeImages.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 md:right-6 z-20 w-12 h-12 bg-white/10 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Sonraki Görsel"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Lightbox Footer with Project Title & Thumbnails */}
          <div className="z-20 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base md:text-lg font-serif font-bold text-white mb-3">
              {projectName}
            </h3>

            {safeImages.length > 1 && (
              <div className="flex justify-center gap-2 overflow-x-auto max-w-2xl mx-auto py-1">
                {safeImages.map((img, thumbIdx) => (
                  <button
                    key={thumbIdx}
                    type="button"
                    onClick={() => setLightboxIdx(thumbIdx)}
                    className={`relative w-14 h-10 rounded overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      thumbIdx === lightboxIdx 
                        ? 'border-amber-500 scale-105 opacity-100 ring-2 ring-amber-500/30' 
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt="" 
                      fill 
                      unoptimized 
                      className="object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
