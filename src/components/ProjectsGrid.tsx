"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  id: number;
  name: string;
  category: string;
  description: string | null;
  img: string;
  createdAt: Date;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Esc key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => setSelectedProject(project)}
            className="group relative aspect-[16/10] bg-stone-200 overflow-hidden border border-stone-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
          >
            <Image 
              src={project.img || "/dummygorsel/factory_workshop.png"}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Hover overlay with description */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/45 to-transparent flex flex-col justify-end p-8 transition-colors duration-500 group-hover:from-stone-950/98">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
                {project.category}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-white">
                {project.name}
              </h3>
              {project.description && (
                <p className="text-xs text-stone-300 mt-3 line-clamp-3 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Premium Detail Modal Lightbox */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-stone-950/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedProject(null)}
        >
          {/* Modal Content Box */}
          <div 
            className="bg-white max-w-4xl w-full max-h-[90vh] md:max-h-[80vh] flex flex-col md:flex-row shadow-2xl rounded overflow-hidden relative transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} // stop close on clicking inside content
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur border border-stone-200 text-stone-700 rounded-full flex items-center justify-center hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors shadow-sm cursor-pointer"
              aria-label="Kapat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left side: Full Size Image */}
            <div className="w-full md:w-1/2 relative h-[250px] md:h-auto min-h-[250px] md:min-h-full bg-stone-100">
              <Image 
                src={selectedProject.img || "/dummygorsel/factory_workshop.png"}
                alt={selectedProject.name}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            </div>

            {/* Right side: Project Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4 rounded border border-amber-100">
                  {selectedProject.category}
                </span>
                
                <h2 className="text-2xl md:text-3xl font-serif text-stone-900 leading-tight font-bold mb-6">
                  {selectedProject.name}
                </h2>
                
                <div className="w-12 h-1 bg-amber-700 mb-6"></div>
                
                <p className="text-stone-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {selectedProject.description || "Bu proje için detaylı açıklama girilmemiştir."}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
