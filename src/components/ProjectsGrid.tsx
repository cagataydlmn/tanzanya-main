"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/lib/slug';

interface Project {
  id: number;
  name: string;
  category: string;
  description: string | null;
  img: string;
  images?: string[] | unknown;
  metaTitle?: string | null;
  createdAt: Date;
}

interface ProjectsGridProps {
  projects: Project[];
}

interface LightboxState {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  projectTitle: string;
  category: string;
}

function ProjectCard({ 
  project, 
  onOpenLightbox 
}: { 
  project: Project; 
  onOpenLightbox: (images: string[], startIndex: number, projectTitle: string, category: string) => void;
}) {
  const projectSlug = `${slugify(project.name)}-${project.id}`;
  
  // Safely extract images array
  let rawImages: string[] = [];
  if (Array.isArray(project.images) && project.images.length > 0) {
    rawImages = project.images;
  } else if (typeof project.images === 'string') {
    try {
      const parsed = JSON.parse(project.images);
      if (Array.isArray(parsed)) rawImages = parsed;
    } catch {
      rawImages = [project.images];
    }
  }

  if (rawImages.length === 0 && project.img) {
    rawImages = [project.img];
  }

  const images = rawImages.filter(Boolean);
  const [currentIdx, setCurrentIdx] = useState(0);
  const hasMultiple = images.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx(index);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenLightbox(images, currentIdx, project.name, project.category);
  };

  return (
    <div className="group relative aspect-[16/10] bg-stone-900 overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-700 hover:-translate-y-1.5 rounded-sm block">
      {/* Current Image with Link */}
      <Link href={`/projects/${projectSlug}`} className="absolute inset-0 block">
        <Image 
          src={images[currentIdx] || "/dummygorsel/factory_workshop.png"}
          alt={project.metaTitle || `${project.name} - Photo ${currentIdx + 1}`}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
        />
      </Link>

      {/* Top Bar: Photo Counter & Quick Lightbox Zoom */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
        {hasMultiple ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-950/75 backdrop-blur-md text-white text-[10px] font-semibold border border-white/10 shadow-sm pointer-events-auto">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {currentIdx + 1} / {images.length}
          </span>
        ) : <div />}

        <button
          type="button"
          onClick={handleExpandClick}
          className="pointer-events-auto opacity-0 group-hover:opacity-100 w-8 h-8 rounded bg-stone-950/75 backdrop-blur-md text-white hover:text-amber-400 flex items-center justify-center border border-white/10 transition-all hover:scale-110 cursor-pointer shadow"
          title="Tüm Görselleri Tam Ekran İncele"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>

      {/* Prev / Next Carousel Navigation Arrows */}
      {hasMultiple && (
        <div className="absolute inset-y-0 left-2 right-2 flex justify-between items-center z-20 pointer-events-none">
          <button
            type="button"
            onClick={handlePrev}
            className="pointer-events-auto opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-stone-950/70 hover:bg-amber-700 text-white flex items-center justify-center backdrop-blur-sm transition-all -translate-x-2 group-hover:translate-x-0 cursor-pointer shadow-md"
            aria-label="Önceki Görsel"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="pointer-events-auto opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-stone-950/70 hover:bg-amber-700 text-white flex items-center justify-center backdrop-blur-sm transition-all translate-x-2 group-hover:translate-x-0 cursor-pointer shadow-md"
            aria-label="Sonraki Görsel"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Bottom Dots Indicator */}
      {hasMultiple && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
          {images.slice(0, 6).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={(e) => handleDotClick(e, dotIdx)}
              className={`pointer-events-auto transition-all rounded-full ${
                dotIdx === currentIdx 
                  ? 'w-4 h-1.5 bg-amber-500' 
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Görsel ${dotIdx + 1}`}
            />
          ))}
          {images.length > 6 && (
            <span className="text-[9px] text-white/70 self-center font-bold">+{images.length - 6}</span>
          )}
        </div>
      )}

      {/* Hover overlay with category, title & description */}
      <Link 
        href={`/projects/${projectSlug}`}
        className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/30 to-transparent flex flex-col justify-end p-6 transition-colors duration-700 z-10 pointer-events-auto"
      >
        <span className="text-amber-500 text-[10px] font-medium uppercase tracking-[0.2em] mb-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
          {project.category}
        </span>
        <h3 className="text-xl md:text-2xl font-serif text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-1">
          {project.name}
        </h3>
        {project.description && (
          <p className="text-xs text-stone-300 mt-2 line-clamp-2 max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-700 ease-in-out delay-100 font-light leading-relaxed">
            {project.description}
          </p>
        )}
      </Link>
    </div>
  );
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    projectTitle: '',
    category: '',
  });

  const openLightbox = (images: string[], startIndex: number, projectTitle: string, category: string) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: startIndex,
      projectTitle,
      category,
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.images.length - 1,
    }));
  };

  const handleLightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex < prev.images.length - 1 ? prev.currentIndex + 1 : 0,
    }));
  };

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.isOpen) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setLightbox((prev) => ({
          ...prev,
          currentIndex: prev.currentIndex < prev.images.length - 1 ? prev.currentIndex + 1 : 0,
        }));
      } else if (e.key === 'ArrowLeft') {
        setLightbox((prev) => ({
          ...prev,
          currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.images.length - 1,
        }));
      }
    };

    if (lightbox.isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightbox.isOpen]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onOpenLightbox={openLightbox} 
          />
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightbox.isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-stone-950/95 backdrop-blur-md p-4 md:p-8 select-none"
          onClick={closeLightbox}
        >
          {/* Header */}
          <div className="flex justify-between items-center text-white z-20">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-950/60 border border-amber-800/40 rounded">
                {lightbox.category}
              </span>
              <span className="text-xs font-medium text-stone-400">
                {lightbox.currentIndex + 1} / {lightbox.images.length}
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

          {/* Main Photo Showcase */}
          <div className="relative flex-1 w-full flex items-center justify-center my-4">
            {lightbox.images.length > 1 && (
              <button 
                onClick={handleLightboxPrev}
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
                src={lightbox.images[lightbox.currentIndex]}
                alt={lightbox.projectTitle}
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </div>

            {lightbox.images.length > 1 && (
              <button 
                onClick={handleLightboxNext}
                className="absolute right-2 md:right-6 z-20 w-12 h-12 bg-white/10 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Sonraki Görsel"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Footer with Thumbnails */}
          <div className="z-20 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base md:text-lg font-serif font-bold text-white mb-3">
              {lightbox.projectTitle}
            </h3>

            {lightbox.images.length > 1 && (
              <div className="flex justify-center gap-2 overflow-x-auto max-w-2xl mx-auto py-1">
                {lightbox.images.map((img, thumbIdx) => (
                  <button
                    key={thumbIdx}
                    type="button"
                    onClick={() => setLightbox((prev) => ({ ...prev, currentIndex: thumbIdx }))}
                    className={`relative w-14 h-10 rounded overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      thumbIdx === lightbox.currentIndex 
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
    </>
  );
}

