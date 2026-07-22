import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjects, getProjectById } from '@/app/actions/projects';
import { slugify, parseIdFromSlug } from '@/lib/slug';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try ID extraction or match slug
  const id = parseIdFromSlug(slug);
  let project = null;

  if (id) {
    const res = await getProjectById(id);
    if (res.success && res.data) project = res.data;
  }

  if (!project) {
    const allRes = await getProjects();
    if (allRes.success && allRes.data) {
      project = allRes.data.find(p => slugify(p.name) === slug || `${slugify(p.name)}-${p.id}` === slug) || null;
    }
  }

  if (!project) return { title: "Proje Bulunamadı | Tanzanya Mobilya" };

  const pageTitle = project.metaTitle || `${project.name} - ${project.category} Projesi | Tanzanya Mobilya`;
  const pageDesc = project.metaDesc || (project.description 
    ? project.description.slice(0, 160) 
    : `${project.name} özel tasarım ahşap mobilya ve iç mimarlık projesi.`);

  return {
    title: pageTitle,
    description: pageDesc,
    ...(project.metaKeys ? { keywords: project.metaKeys } : {}),
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      images: [{ url: project.img }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: [project.img],
    }
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  const id = parseIdFromSlug(slug);
  let project = null;

  if (id) {
    const res = await getProjectById(id);
    if (res.success && res.data) project = res.data;
  }

  if (!project) {
    const allRes = await getProjects();
    if (allRes.success && allRes.data) {
      project = allRes.data.find(p => slugify(p.name) === slug || `${slugify(p.name)}-${p.id}` === slug) || null;
    }
  }

  if (!project) notFound();

  // Önerilen diğer projeler
  const allProjectsRes = await getProjects();
  const relatedProjects = allProjectsRes.success && allProjectsRes.data 
    ? allProjectsRes.data.filter(p => p.id !== project.id).slice(0, 3) 
    : [];

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      
      {/* 1. Hero Header Banner */}
      <section className="relative bg-stone-950 text-white pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute inset-0 opacity-20">
          <Image 
            src={project.img} 
            alt={project.metaTitle || project.name} 
            fill 
            unoptimized 
            className="object-cover blur-3xl scale-125"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950 to-stone-950" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center md:text-left">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-white transition-colors">Projelerimiz</Link>
            <span>/</span>
            <span className="text-amber-500 font-medium truncate">{project.name}</span>
          </nav>

          <div className="inline-block px-3 py-1 bg-amber-900/60 border border-amber-600/40 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 rounded">
            {project.category}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl">
            {project.name}
          </h1>
        </div>
      </section>

      {/* 2. Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 md:-mt-16 relative z-20">
        
        {/* Full-width Unconstrained Photo Showcase */}
        <div className="relative aspect-[16/10] md:aspect-[21/9] w-full rounded-xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 mb-10 group">
          <Image 
            src={project.img}
            alt={project.metaTitle || project.name}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 3. Technical Specifications Grid */}
        <div className="bg-white border border-stone-200 shadow-sm p-6 md:p-8 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="space-y-1">
            <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">Kategori</span>
            <p className="text-stone-900 font-bold text-base md:text-lg">{project.category}</p>
          </div>
          <div className="space-y-1">
            <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">Üretici Tesis</span>
            <p className="text-stone-900 font-bold text-base md:text-lg">Tanzanya Mobilya</p>
          </div>
          <div className="space-y-1">
            <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">Malzeme Standartı</span>
            <p className="text-stone-900 font-bold text-base md:text-lg">Birinci Sınıf Ahşap</p>
          </div>
          <div className="space-y-1">
            <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">Teslimat Türü</span>
            <p className="text-stone-900 font-bold text-base md:text-lg">Anahtar Teslim Montaj</p>
          </div>
        </div>

        {/* 4. Description & Floating CTA Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Description */}
          <div className="lg:col-span-2 bg-white border border-stone-200 p-8 md:p-12 shadow-sm rounded-lg space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <div className="w-1.5 h-8 bg-amber-700 rounded-full" />
              <h2 className="text-2xl font-serif text-stone-900 font-bold">Proje Detayları ve Özellikler</h2>
            </div>

            <p className="text-stone-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {project.description || "Bu proje kendi 5000 m² üretim tesislerimizde, milimetrik ölçü hassasiyeti ve birinci sınıf doğal malzemeler kullanılarak hayata geçirilmiştir."}
            </p>

            <div className="pt-6 border-t border-stone-100 space-y-4">
              <h3 className="text-stone-900 font-bold text-base">Üretim ve Kalite Standartlarımız:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Çizilmeye dayanıklı kaplama</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sessiz yavaşlatıcılı ray sistemleri</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Özel ölçü imalat garantisi</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Uzman saha montaj desteği</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Floating CTA Card */}
          <div className="space-y-6">
            <div className="bg-stone-900 text-white p-8 rounded-lg border border-stone-800 shadow-xl space-y-6 sticky top-28">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest block">Özel Tasarım Teklifi</span>
              <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                Mekanınıza Özel Projelendirme İsteyin
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Bu projedeki detayları kendi eviniz, ofisiniz veya ticari alanınız için uygulamak ister misiniz? Ücretsiz keşif ve teklif alın.
              </p>

              <div className="space-y-3 pt-2">
                <Link 
                  href={`/quote?service=${encodeURIComponent(project.name)}`}
                  className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm uppercase tracking-wider transition-colors block text-center rounded shadow-md"
                >
                  Hemen Fiyat Teklifi Al
                </Link>
                <Link 
                  href="/contact"
                  className="w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase tracking-wider transition-colors block text-center rounded border border-stone-700"
                >
                  İletişime Geçin
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* 5. Related Projects Carousel */}
        {relatedProjects.length > 0 && (
          <div className="mt-24 border-t border-stone-200 pt-16">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-2">Benzer Çalışmalar</span>
                <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold">Diğer Projelerimiz</h2>
              </div>
              <Link href="/projects" className="text-amber-700 hover:text-amber-800 font-semibold text-xs uppercase tracking-wider">
                Tümünü Gör →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((item) => (
                <Link 
                  key={item.id}
                  href={`/projects/${slugify(item.name)}-${item.id}`}
                  className="group bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 rounded-lg"
                >
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                    <Image 
                      src={item.img}
                      alt={item.metaTitle || item.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-stone-900/80 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-stone-900 group-hover:text-amber-700 transition-colors text-base line-clamp-1">
                      {item.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
