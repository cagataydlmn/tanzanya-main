import type { Metadata } from 'next';
import { getProjects } from '@/app/actions/projects';
import ProjectsGrid from '@/components/ProjectsGrid';

export const metadata: Metadata = {
  title: "Projelerimiz",
  description: "Otel, konut, ofis, eğitim, sağlık ve restoran mobilyaları başta olmak üzere tamamladığımız nitelikli anahtar teslim projelerimiz.",
};

export default async function Projects() {
  const response = await getProjects();
  const projects = response.success && response.data ? response.data : [];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Referans Projelerimiz</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto">
            Ev, ofis, otel, eğitim ve ticari alanlar için tasarlayıp ürettiğimiz, estetik ve kaliteyi bir araya getiren örnek uygulamalarımız.
          </p>
        </div>

        {/* Projects Grid Component */}
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200">
            <p className="text-stone-500">Henüz eklenmiş bir referans proje bulunamadı.</p>
          </div>
        ) : (
          <ProjectsGrid projects={projects as any} />
        )}

      </div>
    </div>
  );
}
