import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/lib/slug';

interface Project {
  id: number;
  name: string;
  category: string;
  description: string | null;
  img: string;
  metaTitle?: string | null;
  createdAt: Date;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => {
        const projectSlug = `${slugify(project.name)}-${project.id}`;

        return (
          <Link 
            key={project.id} 
            href={`/projects/${projectSlug}`}
            className="group relative aspect-[16/10] bg-stone-900 overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-700 hover:-translate-y-2 rounded-sm block"
          >
            <Image 
              src={project.img || "/dummygorsel/factory_workshop.png"}
              alt={project.metaTitle || project.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
            />
            {/* Hover overlay with category & description */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/20 to-transparent flex flex-col justify-end p-8 transition-colors duration-700">
              <span className="text-amber-500 text-[10px] font-medium uppercase tracking-[0.2em] mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {project.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {project.name}
              </h3>
              {project.description && (
                <p className="text-xs text-stone-300 mt-4 line-clamp-3 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-700 ease-in-out delay-100 font-light leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
