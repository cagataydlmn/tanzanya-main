import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import { getProjects } from '@/app/actions/projects';
import ProjectsGrid from '@/components/ProjectsGrid';
import Image from 'next/image';

export default async function Home() {
  const response = await getProjects();
  const allProjects = response.success && response.data ? response.data : [];
  const featuredProjects = allProjects.slice(0, 4); // İlk 4 projeyi göster

  return (
    <div className="flex flex-col font-sans">
      {/* Hero Section - Dynamic Slideshow */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-32 md:py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Öne Çıkan Hizmetlerimiz</h2>
            <div className="w-12 h-[2px] bg-amber-700 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "İç Mimari & Tasarım", 
                slug: "ic-mimari-ve-tasarim",
                desc: "Mekanlarınıza özel estetik ve fonksiyonel çözümleri, alanında uzman iç mimarlarımızla tasarlıyoruz.",
                img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.05.jpeg"
              },
              { 
                title: "Özel Mobilya Üretimi", 
                slug: "ozel-mobilya-uretimi",
                desc: "Kendi fabrikamızda, birinci sınıf malzemelerle size ve projenize özel ölçü mobilya üretimi yapıyoruz.",
                img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.04.jpeg"
              },
              { 
                title: "Anahtar Teslim Uygulama", 
                slug: "anahtar-teslim-projeler",
                desc: "Tasarım, üretim ve şantiye yönetimini tek elden yürüterek projenizi eksiksiz teslim ediyoruz.",
                img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.07.jpeg"
              }
            ].map((feature, i) => (
              <Link 
                key={i} 
                href={`/services/${feature.slug}`}
                className="flex flex-col text-center group bg-white hover:bg-stone-50 rounded-xl overflow-hidden hover:shadow-luxury-hover transition-all duration-500 hover:-translate-y-2 p-8 border border-transparent hover:border-stone-100"
              >
                <div className="w-full aspect-[4/3] mb-8 relative overflow-hidden bg-stone-100 rounded-lg">
                  <Image
                    src={feature.img}
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
                <p className="text-stone-600 leading-relaxed text-sm flex-grow mb-4">
                  {feature.desc}
                </p>
                <span className="text-amber-700 font-bold text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 group-hover:text-amber-800 transition-colors">
                  Detaylı İncele 
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link 
              href="/services" 
              className="inline-block px-10 py-4 bg-stone-900 text-white font-medium text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-all duration-300 hover:shadow-luxury"
            >
              Tüm Hizmetlerimizi İncele
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section - Dark Luxury Mode */}
      <section className="py-32 md:py-40 px-6 bg-[#111111] text-stone-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 flex flex-col justify-center space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">Neden Bizi Seçmelisiniz?</h2>
              <div className="w-12 h-[2px] bg-amber-600"></div>
            </div>

            <div className="space-y-10">
              {[
                { title: "Kendi Üretim Tesisimiz", text: "Yüksek kapasiteli fabrikamız sayesinde aracı olmadan, doğrudan üreticiden kalite garantisi sağlıyoruz." },
                { title: "Sektörel Tecrübe", text: "Kurumsal ve bireysel projelerde edindiğimiz yılların tecrübesiyle hatasız süreç yönetimi uyguluyoruz." },
                { title: "Zamanında Teslimat", text: "Söz verdiğimiz tarihte, taahhüt ettiğimiz kalitede eksiksiz ve kusursuz kurulum yapıyoruz." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="text-amber-600/50 group-hover:text-amber-500 transition-colors text-4xl font-serif mt-1 italic">0{idx + 1}</div>
                  <div>
                    <h4 className="text-xl font-serif text-white mb-3 tracking-wide">{item.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed font-light">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full aspect-[4/5] md:aspect-square relative overflow-hidden rounded-sm group">
            <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
            <Image
              src="/dummygorsel/factory_workshop.png"
              alt="Fabrika Üretim Hattı"
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
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">Öne Çıkan Projelerimiz</h2>
            <div className="w-12 h-[2px] bg-amber-700 mx-auto"></div>
            <p className="text-stone-500 mt-6 max-w-2xl mx-auto text-sm leading-relaxed">
              Sizin için tasarlayıp hayata geçirdiğimiz nitelikli anahtar teslim ahşap uygulamalarımız.
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="text-center py-12 text-stone-400 font-light">
              Henüz eklenmiş proje bulunmuyor.
            </div>
          ) : (
            <ProjectsGrid projects={featuredProjects as any} />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Hayalinizdeki Mekanı <br className="hidden md:block"/>Birlikte Tasarlayalım</h2>
          <p className="text-stone-500 text-base md:text-lg leading-relaxed font-light">
            Eviniz, ofisiniz veya ticari alanınız için kaliteli, estetik ve size özel mobilya çözümleri arıyorsanız; fabrikamız ve iç mimar ekibimizle hizmetinizdeyiz.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/quote"
              className="w-full sm:w-auto px-12 py-5 bg-stone-900 text-white font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-stone-800 hover:shadow-luxury"
            >
              Hemen Teklif Al
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-12 py-5 bg-transparent border-b-2 border-stone-300 text-stone-900 font-medium text-xs uppercase tracking-[0.2em] transition-all hover:border-stone-900"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
