import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';

export default function Home() {
  return (
    <div className="flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 py-20 bg-stone-100 border-b border-gray-200">
        <div className="max-w-5xl w-full flex flex-col items-center text-center gap-10">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 border-b border-stone-300 text-stone-600 text-sm uppercase tracking-[0.2em] mb-4">
              Kurumsal Üretici & İç Mimarlık
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
              Geleneksel Ustalık, <br className="hidden md:block" /> Modern Tasarım
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Ev, ofis, okul ve ticari projeleriniz için kendi tesislerimizde ürettiğimiz; estetiği ve kaliteyi bir araya getiren anahtar teslim ahşap ve mobilya çözümleri.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <Link 
              href="/quote" 
              className="px-10 py-4 bg-stone-900 text-white font-semibold text-sm uppercase tracking-wider transition-colors hover:bg-amber-800"
            >
              Hemen Teklif Al
            </Link>
            <Link 
              href="/projects" 
              className="px-10 py-4 bg-transparent border border-stone-400 text-stone-700 font-semibold text-sm uppercase tracking-wider transition-colors hover:bg-stone-200"
            >
              Referans Projelerimiz
            </Link>
          </div>
        </div>
      </section>

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
                <div className="w-full aspect-[4/3] bg-stone-100 mb-8 border border-stone-200">
                  <div className="w-full h-full flex items-center justify-center text-stone-400 group-hover:bg-stone-200 transition-colors duration-500">
                    [Görsel]
                  </div>
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
          
          <div className="md:w-1/2 w-full aspect-square md:aspect-auto md:min-h-[600px] bg-stone-200 flex items-center justify-center text-stone-500 border border-stone-300">
            [Fabrika veya Referans Proje Görseli]
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="border-y border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {[
            { number: "25+", label: "Yıllık Tecrübe" },
            { number: "1500+", label: "Tamamlanan Proje" },
            { number: "5000 m²", label: "Üretim Tesisi" },
            { number: "12+", label: "İhracat Yapılan Ülke" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-12 text-center hover:bg-stone-50 transition-colors">
              <div className="text-4xl md:text-5xl font-serif text-stone-900 mb-2">{stat.number}</div>
              <div className="text-sm uppercase tracking-widest text-amber-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-serif text-stone-900 mb-4">Öne Çıkan Projeler</h2>
              <div className="w-16 h-1 bg-amber-700"></div>
            </div>
            <Link href="/projects" className="text-amber-700 font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 hover:text-amber-800 transition-colors">
              Tüm Projeleri İncele 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Zorlu Center Özel Tasarım Villa", cat: "Konut" },
              { title: "Hilton Otel Odaları Restorasyonu", cat: "Otel" },
              { title: "Garanti BBVA Genel Müdürlük", cat: "Ofis" },
              { title: "Midpoint Restoran İç Mekan", cat: "Restoran" }
            ].map((project, i) => (
              <div key={i} className="group relative aspect-[16/9] bg-stone-200 overflow-hidden border border-stone-200 cursor-pointer">
                <div className="w-full h-full bg-stone-300 flex items-center justify-center text-stone-500 group-hover:scale-105 transition-transform duration-700">
                  [Görsel]
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent flex flex-col justify-end p-8">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">{project.cat}</span>
                  <h3 className="text-2xl font-serif text-white">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Footer-like Section */}
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
