import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/lib/slug';

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => {
        const projectSlug = `${slugify(project.name)}-${project.id}`;

        return (
          <Link 
            key={project.id} 
            href={`/projects/${projectSlug}`}
            className="group relative aspect-[16/10] bg-stone-200 overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 rounded block"
          >
            <Image 
              src={project.img || "/dummygorsel/factory_workshop.png"}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Hover overlay with category & description */}
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
          </Link>
        );
      })}
    </div>
  );
}
