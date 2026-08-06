"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSlides } from '@/app/actions/slides';

export interface Slide {
  id?: number;
  subtitle: string;
  title: string;
  desc: string;
  bg: string;
  metaTitle?: string | null;
}

interface HeroSliderProps {
  initialSlides?: Slide[];
}

export default function HeroSlider({ initialSlides = [] }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(initialSlides);

  useEffect(() => {
    if (initialSlides.length > 0) {
      setSlides(initialSlides);
    } else {
      async function loadSlides() {
        const res = await getSlides();
        if (res.success && res.data && res.data.length > 0) {
          setSlides(res.data);
        }
      }
      loadSlides();
    }
  }, [initialSlides]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <section className="relative h-[460px] md:h-[540px] lg:h-[580px] max-h-[640px] w-full max-w-[1920px] mx-auto flex flex-col justify-center items-center px-6 overflow-hidden bg-stone-950">
        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center text-center animate-pulse space-y-4">
          <div className="h-4 w-32 bg-stone-800 rounded"></div>
          <div className="h-10 w-3/4 bg-stone-800 rounded"></div>
          <div className="h-4 w-1/2 bg-stone-800 rounded"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[460px] md:h-[540px] lg:h-[580px] max-h-[640px] w-full max-w-[1920px] mx-auto flex flex-col justify-center items-center px-6 overflow-hidden bg-stone-950">

      {/* Background Slides with Dual-Layer Optimization */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
        >
          {/* Layer 1: Blurred background fill to prevent edge gaps */}
          <Image
            src={slide.bg}
            alt=""
            fill
            priority={index === 0}
            unoptimized
            aria-hidden="true"
            className="object-cover blur-2xl scale-110 opacity-50"
          />

          {/* Layer 2: Main crisp image centered */}
          <Image
            src={slide.bg}
            alt={slide.metaTitle || slide.title}
            fill
            priority={index === 0}
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Layer 3: Multi-stage gradient mask for premium dark contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full h-[380px] md:h-[320px] flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-x-0 bottom-4 top-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out ${index === currentSlide
              ? "opacity-100 scale-100 pointer-events-auto z-10"
              : "opacity-0 scale-[0.97] pointer-events-none z-0"
              }`}
          >
            <div className="inline-block px-3 py-1 border-b border-amber-600/30 text-amber-500 text-xs md:text-sm uppercase tracking-[0.2em] mb-4 md:mb-6 font-semibold">
              {slide.subtitle}
            </div>

            <h1 className="text-2xl md:text-5xl font-serif text-white leading-tight font-bold tracking-tight px-2">
              {slide.title}
            </h1>

            <p className="text-xs md:text-base text-stone-300 max-w-xl md:max-w-2xl mx-auto leading-relaxed mt-3 md:mt-4 mb-6 md:mb-8 px-4">
              {slide.desc}
            </p>

            {/* Action Buttons - Compact horizontal layout on all screen sizes */}
            <div className="flex flex-row gap-3 md:gap-4 justify-center w-full px-4">
              <Link
                href="/quote"
                className="px-5 py-3 md:px-8 md:py-4 bg-amber-700 text-white font-semibold text-xs md:text-sm uppercase tracking-wider transition-all hover:bg-amber-800 shadow-md hover:shadow-amber-900/20 whitespace-nowrap"
              >
                Get A Quote
              </Link>
              <Link
                href="/projects"
                className="px-5 py-3 md:px-8 md:py-4 bg-transparent border border-stone-400 text-white font-semibold text-xs md:text-sm uppercase tracking-wider transition-all hover:bg-white hover:text-stone-900 hover:border-white whitespace-nowrap"
              >
                Projects
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-8 h-[3px] transition-all cursor-pointer rounded-full ${index === currentSlide ? "bg-amber-500" : "bg-white/20 hover:bg-white/50"
                }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}

    </section>
  );
}
