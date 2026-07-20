import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "25 yılı aşkın tecrübemiz, modern vizyonumuz ve kendi mobilya üretim tesisimizle yaşam alanlarınızı tasarlıyor ve hayata geçiriyoruz. Türkiye'den Tanzanya'ya uzanan kalite köprüsü.",
};

export default function About() {

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Hakkımızda</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="aspect-[4/3] relative overflow-hidden border border-stone-200 shadow-md bg-stone-100 rounded-lg">
            <Image 
              src="/dummygorsel/factory_workshop.png"
              alt="Tanzanya Mobilya Fabrikası ve Atölyesi"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-102 transition-transform duration-500"
              priority
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-stone-900 font-bold">Köklü Tecrübe, Modern Vizyon</h2>
            <p className="text-stone-600 leading-relaxed">
              Sektördeki uzun yıllara dayanan deneyimimizle, yaşam ve çalışma alanlarınıza değer katıyoruz. Geleneksel mobilya işçiliğinin ince detaylarını, günümüz modern tasarım anlayışıyla harmanlayarak eşsiz projelere imza atıyoruz.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Kendi bünyemizdeki üretim tesisimizde, malzemeyi ustalıkla işleyerek ev, ofis, okul ve ticari mekanlar için yüksek standartlarda mobilyalar üretiyoruz. Amacımız, müşterilerimizin hayallerindeki mekanları tam zamanında ve eksiksiz bir şekilde gerçeğe dönüştürmektir.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          <div className="bg-white p-10 border border-stone-200 shadow-sm rounded-lg">
            <h3 className="text-2xl font-serif text-stone-900 mb-4 font-bold">Vizyonumuz</h3>
            <p className="text-stone-600 leading-relaxed">
              Sektörel yenilikleri yakından takip ederek, sadece Türkiye'de değil uluslararası alanda da tasarım ve kalite denilince ilk akla gelen, kalıcı projelere imza atan lider mobilya üreticisi olmak.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-200 shadow-sm rounded-lg">
            <h3 className="text-2xl font-serif text-stone-900 mb-4 font-bold">Misyonumuz</h3>
            <p className="text-stone-600 leading-relaxed">
              Müşteri memnuniyetini her zaman ön planda tutarak; estetik, fonksiyonel ve uzun ömürlü mekanlar tasarlamak. Kusursuz üretim anlayışımızla projeleri söz verdiğimiz kalitede teslim etmek.
            </p>
          </div>
        </div>

        {/* Turkey-Tanzania Bridge Section (Premium Design) */}
        <div className="bg-stone-900 text-stone-100 p-8 md:p-16 border border-stone-800 shadow-xl mb-24 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-700/10 rounded-full blur-3xl group-hover:bg-amber-700/20 transition-all duration-700"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest block">Küresel Tasarım & İhracat Köprüsü</span>
              <h2 className="text-3xl md:text-4xl font-serif leading-tight font-bold">Türkiye'nin İşçiliği, Tanzanya'nın Vizyonu</h2>
              <div className="w-16 h-1 bg-amber-600"></div>
              <p className="text-stone-300 leading-relaxed text-sm">
                Tanzanya Mobilya & Dekorasyon olarak, Türkiye'deki modern üretim tesislerimizin üstün el işçiliğini ve kaliteli hammadde gücünü Doğu Afrika pazarıyla buluşturuyoruz. İki ülke arasında güçlü bir ticari köprü kurarak, Tanzanya'daki seçkin projelere değer katıyoruz.
              </p>
              <p className="text-stone-400 leading-relaxed text-xs">
                Kendi fabrikamızda ürettiğimiz lüks ve dayanıklı mobilyalarla uluslararası kalite standartlarını temsil ediyor, projelerimizi doğrudan yerinde montaj ve kurulum güvencesiyle teslim ediyoruz.
              </p>
            </div>
            <div className="w-full aspect-[3/2] relative overflow-hidden bg-stone-800 border border-stone-800 rounded shadow-2xl flex items-center justify-center min-h-[250px] md:min-h-[300px]">
              <Image 
                src="/dummygorsel/tr-tz-flag.jpg"
                alt="Türkiye - Tanzanya Ticaret Köprüsü"
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Corporate Brochure & Catalogue Showcase Section */}
        <div className="bg-white border border-stone-200 rounded-xl p-8 md:p-12 shadow-sm mb-24">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10 border-b border-stone-100 pb-8">
            <div>
              <span className="text-amber-700 text-xs font-bold uppercase tracking-widest block mb-2">Kurumsal Yayınlarımız</span>
              <h2 className="text-3xl font-serif font-bold text-stone-900">Star Decor Kurumsal Broşürümüz</h2>
              <p className="text-stone-600 text-sm mt-2 max-w-2xl">
                Üretim standartlarımızı, kullandığımız yüksek kaliteli ahşap malzemeleri ve imalat süreçlerimizi detaylandıran kurumsal broşürümüzü online inceleyin veya indirin.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="/broshur.pdf"
                download
                className="px-6 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Broşürü İndir (PDF)
              </a>
              <a 
                href="/broshur.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Broşürü İncele
              </a>
            </div>
          </div>

          {/* Brochure Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 space-y-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-sm">01</div>
              <h4 className="font-bold text-stone-900 text-base">Kişiye Özel Tasarım</h4>
              <p className="text-xs text-stone-600 leading-relaxed">Mekanınızın tarzına ve fonksiyon ihtiyacına özel terzi usulü mobilya çözümleri.</p>
            </div>

            <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 space-y-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-sm">02</div>
              <h4 className="font-bold text-stone-900 text-base">Üstün Dayanıklılık</h4>
              <p className="text-xs text-stone-600 leading-relaxed">Birinci sınıf ahşap malzemeler ve uzman el işçiliği ile nesiller boyu kullanım.</p>
            </div>

            <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 space-y-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-sm">03</div>
              <h4 className="font-bold text-stone-900 text-base">İleri Teknoloji Üretim</h4>
              <p className="text-xs text-stone-600 leading-relaxed">CNC kesim makineleri ve tozsuz boya kabinleri ile milimetrik sıfır hata.</p>
            </div>

            <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 space-y-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-sm">04</div>
              <h4 className="font-bold text-stone-900 text-base">Zamanında Teslimat</h4>
              <p className="text-xs text-stone-600 leading-relaxed">Planlanan takvimde eksiksiz montaj ve %100 müşteri memnuniyeti garantisi.</p>
            </div>
          </div>

          {/* Materials We Use (From Brochure) */}
          <div className="mt-10 pt-8 border-t border-stone-100">
            <h3 className="font-bold text-stone-900 text-base mb-4">Kullandığımız Yüksek Kalite Ahşap & Paneller:</h3>
            <div className="flex flex-wrap gap-2">
              {["MDF & High Gloss", "Masif Ahşap (Solid Wood)", "Kontrplak (Plywood)", "Sunta & Yonga Levha", "Dekoratif Paneller", "Kompozit Paneller", "Doğal Ahşap Kaplama"].map((mat, i) => (
                <span key={i} className="px-3.5 py-1.5 bg-stone-100 text-stone-700 text-xs font-semibold rounded border border-stone-200">
                  ✓ {mat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-stone-900 mb-4 font-bold">Üretim ve Kalite Politikamız</h2>
          <div className="w-16 h-1 bg-amber-700 mx-auto mb-10"></div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: "Birinci Sınıf Malzeme", desc: "Üretimde dayanıklılığı ve kaliteyi sağlamak adına daima en iyi hammaddeyi tercih ederiz." },
              { title: "İnce İşçilik", desc: "Tasarım detaylarını gerçeğe dönüştürürken ustalarımızın el emeği ve tecrübesine güveniriz." },
              { title: "Sıfır Hata Prensibi", desc: "Fabrikamızdan çıkan her ürün, titiz bir kalite kontrol sürecinden geçerek onaya sunulur." }
            ].map((value, i) => (
              <div key={i} className="p-8 bg-white border border-stone-200 rounded-lg shadow-sm">
                <h4 className="text-xl font-bold text-stone-900 mb-3">{value.title}</h4>
                <p className="text-stone-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>



    </div>
  );
}
