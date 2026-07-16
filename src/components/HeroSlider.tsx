"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      subtitle: "Kurumsal Üretici & İç Mimarlık",
      title: "Geleneksel Ustalık, Modern Tasarım",
      desc: "Ev, ofis, okul ve ticari projeleriniz için kendi tesislerimizde ürettiğimiz; estetiği ve kaliteyi bir araya getiren anahtar teslim ahşap ve mobilya çözümleri.",
      bg: "bg-stone-100" // Normalde url('/images/slider1.jpg') tarzı bir şey olur. Şimdilik renk mock.
    },
    {
      subtitle: "Kendi Fabrikamızdan",
      title: "Sıfır Hata, Yüksek Kalite",
      desc: "5000 m² üretim tesisimizde, son teknoloji makine parkurumuz ve deneyimli ustalarımızla hayallerinizi ahşaba işliyoruz.",
      bg: "bg-stone-200"
    },
    {
      subtitle: "Anahtar Teslim Projeler",
      title: "Tasarımından Montajına Kadar",
      desc: "Otel, restoran ve ofis projelerinizde iç mimari tasarım, üretim ve saha montajını tek elden kusursuzca yönetiyoruz.",
      bg: "bg-stone-300"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 saniyede bir değişir
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 py-20 border-b border-gray-200 overflow-hidden">
      
      {/* Background Slides (Mocked with colors for now, later replaced with Images) */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${slide.bg} ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Eğer resim koyarsanız buraya bir overlay karanlık katman eklenebilir. Örneğin: bg-black/40 */}
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center gap-10">
        
        <div className="space-y-6 min-h-[200px] flex flex-col justify-center items-center">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 transform-none" : "opacity-0 translate-y-8 pointer-events-none"
              }`}
            >
              <div className="inline-block px-4 py-2 border-b border-stone-400 text-stone-700 text-sm uppercase tracking-[0.2em] mb-4">
                {slide.subtitle}
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
                {slide.title.split(', ').map((text, i, arr) => (
                  <span key={i}>
                    {text}
                    {i !== arr.length - 1 && <>, <br className="hidden md:block" /></>}
                  </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl text-stone-700 max-w-2xl mx-auto leading-relaxed mt-6">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-16 md:mt-24 relative z-20">
          <Link 
            href="/quote" 
            className="px-10 py-4 bg-stone-900 text-white font-semibold text-sm uppercase tracking-wider transition-colors hover:bg-amber-800"
          >
            Hemen Teklif Al
          </Link>
          <Link 
            href="/projects" 
            className="px-10 py-4 bg-white/50 backdrop-blur-sm border border-stone-400 text-stone-900 font-semibold text-sm uppercase tracking-wider transition-colors hover:bg-white"
          >
            Referans Projelerimiz
          </Link>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 transition-colors ${
                index === currentSlide ? "bg-amber-700" : "bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
