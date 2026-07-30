import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import { getProjects } from '@/app/actions/projects';
import { getServices } from '@/app/actions/services';
import { getHomePage } from '@/app/actions/home';
import ProjectsGrid from '@/components/ProjectsGrid';
import Image from 'next/image';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const res = await getHomePage();
  if (res.success && res.data) {
    return {
      title: res.data.metaTitle || "Star Decor | Premium Furniture & Interior Design",
      description: res.data.metaDesc || "Leading furniture manufacturing and interior design services in Dar es Salaam, Tanzania.",
      keywords: res.data.metaKeys || "furniture, interior design, custom furniture, Tanzania, Star Decor",
    };
  }
  return {
    title: "Star Decor | Premium Furniture & Interior Design",
    description: "Leading furniture manufacturing and interior design services in Dar es Salaam, Tanzania.",
  };
}

export default async function Home() {
  const [homeRes, projectsRes, servicesRes] = await Promise.all([
    getHomePage(),
    getProjects(),
    getServices()
  ]);

  const d = homeRes.success && homeRes.data ? homeRes.data : null;
  const allProjects = projectsRes.success && projectsRes.data ? projectsRes.data : [];
  const allServices = servicesRes.success && servicesRes.data ? servicesRes.data : [];

  const featuredProjects = allProjects.filter((p: any) => p.isFeatured);
  const featuredServices = allServices.filter((s: any) => s.isFeatured);

  let whyUsItems = [];
  try {
    whyUsItems = typeof d?.whyUsItems === 'string' ? JSON.parse(d.whyUsItems) : d?.whyUsItems || [];
  } catch (e) { }

  return (
    <div className="flex flex-col font-sans">
      {/* Hero Section - Dynamic Slideshow */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-32 md:py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">{d?.servicesTitle || "Our Featured Services"}</h2>
            <div className="w-12 h-[2px] bg-amber-700 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredServices.length === 0 ? (
              <div className="col-span-3 text-center text-stone-500 py-12 border-2 border-dashed border-stone-200">
                You can add featured services from the admin panel.
              </div>
            ) : (
              featuredServices.map((feature: any, i: number) => (
                <Link
                  key={i}
                  href={`/services/${feature.slug}`}
                  className="flex flex-col text-center group bg-white hover:bg-stone-50 rounded-xl overflow-hidden hover:shadow-luxury-hover transition-all duration-500 hover:-translate-y-2 p-8 border border-transparent hover:border-stone-100"
                >
                  <div className="w-full aspect-[4/3] mb-8 relative overflow-hidden bg-stone-100 rounded-lg">
                    <Image
                      src={feature.img || "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.05.jpeg"}
                      alt={feature.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed text-sm flex-grow mb-4 line-clamp-3">
                    {feature.desc}
                  </p>
                  <span className="text-amber-700 font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 group-hover:text-amber-800 transition-colors">
                    View Details
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                </Link>
              ))
            )}
          </div>

          <div className="text-center mt-20">
            <Link
              href="/services"
              className="inline-block px-10 py-4 bg-stone-900 text-white font-medium text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-all duration-300 hover:shadow-luxury"
            >
              Browse all our services.
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section - Dark Luxury Mode */}
      <section className="py-32 md:py-40 px-6 bg-[#111111] text-stone-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 flex flex-col justify-center space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">{d?.whyUsTitle || "Why Choose Us?"}</h2>
              <div className="w-12 h-[2px] bg-amber-600"></div>
            </div>

            <div className="space-y-10">
              {whyUsItems.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="text-amber-600/50 group-hover:text-amber-500 transition-colors text-4xl font-serif mt-1 italic">0{idx + 1}</div>
                  <div>
                    <h4 className="text-xl font-serif text-white mb-3 tracking-wide">{item.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full aspect-[4/5] md:aspect-square relative overflow-hidden rounded-sm group">
            <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
            <Image
              src={d?.whyUsImg || "/dummygorsel/factory_workshop.png"}
              alt={d?.whyUsTitle || "Why Choose Us"}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
            />
          </div>
        </div>
      </section>


      {/* Featured Projects Preview */}
      <section className="py-32 md:py-40 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">{d?.projectsTitle || "Our Featured Projects"}</h2>
            <div className="w-12 h-[2px] bg-amber-700 mx-auto"></div>
            <p className="text-stone-500 mt-6 max-w-2xl mx-auto text-sm leading-relaxed">
              {d?.projectsDesc || "High quality turnkey woodwork applications designed and manufactured for you."}
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="text-center py-12 text-stone-400 font-light">
              No projects added yet.
            </div>
          ) : (
            <ProjectsGrid projects={featuredProjects as any} />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight" dangerouslySetInnerHTML={{ __html: d?.ctaTitle || "Let's Design Your Dream <br className='hidden md:block'/>Space Together" }} />
          <p className="text-stone-500 text-base md:text-lg leading-relaxed font-light">
            {d?.ctaDesc || "If you are looking for quality, aesthetic, and customized furniture solutions for your home, office, or commercial space, our factory and interior design team are at your service."}
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={d?.ctaBtn1Link || "/quote"}
              className="w-full sm:w-auto px-12 py-5 bg-stone-900 text-white font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-stone-800 hover:shadow-luxury"
            >
              {d?.ctaBtn1Text || "Get Quote Now"}
            </Link>
            <Link
              href={d?.ctaBtn2Link || "/contact"}
              className="w-full sm:w-auto px-12 py-5 bg-transparent border-b-2 border-stone-300 text-stone-900 font-medium text-xs uppercase tracking-[0.2em] transition-all hover:border-stone-900"
            >
              {d?.ctaBtn2Text || "Contact Us"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
