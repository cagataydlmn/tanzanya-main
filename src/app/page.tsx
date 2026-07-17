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
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-serif text-stone-900 mb-4">Öne Çıkan Hizmetlerimiz</h2>
            <div className="w-16 h-1 bg-amber-700 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "İç Mimari & Tasarım", desc: "Mekanlarınıza özel estetik ve fonksiyonel çözümleri, alanında uzman iç mimarlarımızla tasarlıyoruz." },
              { title: "Özel Mobilya Üretimi", desc: "Kendi fabrikamızda, birinci sınıf malzemelerle size ve projenize özel ölçü mobilya üretimi yapıyoruz." },
              { title: "Anahtar Teslim Uygulama", desc: "Tasarım, üretim ve şantiye yönetimini tek elden yürüterek projenizi eksiksiz teslim ediyoruz." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col text-center group">
                <div className="w-full aspect-[4/3] mb-8 border border-stone-200 relative overflow-hidden bg-stone-100 shadow-sm">
                  <Image
                    src="/dummygorsel/factory_workshop.png"
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-serif text-stone-900 mb-3">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 px-6 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2 flex flex-col justify-center space-y-10">
            <div>
              <h2 className="text-3xl font-serif text-stone-900 mb-4">Neden Bizi Seçmelisiniz?</h2>
              <div className="w-16 h-1 bg-amber-700"></div>
            </div>

            <div className="space-y-8">
              {[
                { title: "Kendi Üretim Tesisimiz", text: "Yüksek kapasiteli fabrikamız sayesinde aracı olmadan, doğrudan üreticiden kalite garantisi sağlıyoruz." },
                { title: "Sektörel Tecrübe", text: "Kurumsal ve bireysel projelerde edindiğimiz yılların tecrübesiyle hatasız süreç yönetimi uyguluyoruz." },
                { title: "Zamanında Teslimat", text: "Söz verdiğimiz tarihte, taahhüt ettiğimiz kalitede eksiksiz ve kusursuz kurulum yapıyoruz." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-amber-700 text-3xl font-serif mt-1">0{idx + 1}</div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 w-full aspect-square md:aspect-auto md:min-h-[500px] relative overflow-hidden bg-stone-200 border border-stone-300 shadow-md">
            <Image
              src="/dummygorsel/factory_workshop.png"
              alt="Fabrika Üretim Hattı"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>


      {/* Featured Projects Preview */}
      <section className="py-24 px-6 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Öne Çıkan Projelerimiz</h2>
            <div className="w-16 h-[2px] bg-amber-700 mx-auto"></div>
            <p className="text-stone-600 mt-4 max-w-2xl mx-auto">
              Sizin için tasarlayıp hayata geçirdiğimiz nitelikli anahtar teslim ahşap uygulamalarımız.
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              Henüz eklenmiş proje bulunmuyor.
            </div>
          ) : (
            <ProjectsGrid projects={featuredProjects as any} />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-stone-100 border-t border-stone-200 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Projenizi Birlikte Hayata Geçirelim</h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            Eviniz, ofisiniz veya ticari alanınız için kaliteli, estetik ve size özel mobilya çözümleri arıyorsanız; fabrikamız ve iç mimar ekibimizle hizmetinizdeyiz.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-block px-12 py-4 bg-stone-900 text-white font-semibold text-sm uppercase tracking-wider transition-colors hover:bg-amber-800"
            >
              Hemen Teklif Al
            </Link>
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-transparent border border-stone-400 text-stone-700 font-semibold text-sm uppercase tracking-wider transition-colors hover:bg-stone-200"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
