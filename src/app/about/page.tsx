import type { Metadata } from 'next';
import Image from 'next/image';

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
          <div className="aspect-[4/3] relative overflow-hidden border border-stone-200 shadow-md bg-stone-100">
            <Image 
              src="/dummygorsel/factory_workshop.png"
              alt="Tanzanya Mobilya Fabrikası ve Atölyesi"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-102 transition-transform duration-500"
              priority
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-stone-900">Köklü Tecrübe, Modern Vizyon</h2>
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
          <div className="bg-white p-10 border border-stone-200 shadow-sm">
            <h3 className="text-2xl font-serif text-stone-900 mb-4">Vizyonumuz</h3>
            <p className="text-stone-600 leading-relaxed">
              Sektörel yenilikleri yakından takip ederek, sadece Türkiye'de değil uluslararası alanda da tasarım ve kalite denilince ilk akla gelen, kalıcı projelere imza atan lider mobilya üreticisi olmak.
            </p>
          </div>
          <div className="bg-white p-10 border border-stone-200 shadow-sm">
            <h3 className="text-2xl font-serif text-stone-900 mb-4">Misyonumuz</h3>
            <p className="text-stone-600 leading-relaxed">
              Müşteri memnuniyetini her zaman ön planda tutarak; estetik, fonksiyonel ve uzun ömürlü mekanlar tasarlamak. Kusursuz üretim anlayışımızla projeleri söz verdiğimiz kalitede teslim etmek.
            </p>
          </div>
        </div>

        {/* Turkey-Tanzania Bridge Section (Premium Design) */}
        <div className="bg-stone-900 text-stone-100 p-8 md:p-16 border border-stone-800 shadow-xl mb-24 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-700/10 rounded-full blur-3xl group-hover:bg-amber-700/20 transition-all duration-700"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest block">Küresel Tasarım & İhracat Köprüsü</span>
              <h2 className="text-3xl md:text-4xl font-serif leading-tight">Türkiye'nin İşçiliği, Tanzanya'nın Vizyonu</h2>
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
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-stone-900 mb-4">Üretim ve Kalite Politikamız</h2>
          <div className="w-16 h-1 bg-amber-700 mx-auto mb-10"></div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: "Birinci Sınıf Malzeme", desc: "Üretimde dayanıklılığı ve kaliteyi sağlamak adına daima en iyi hammaddeyi tercih ederiz." },
              { title: "İnce İşçilik", desc: "Tasarım detaylarını gerçeğe dönüştürürken ustalarımızın el emeği ve tecrübesine güveniriz." },
              { title: "Sıfır Hata Prensibi", desc: "Fabrikamızdan çıkan her ürün, titiz bir kalite kontrol sürecinden geçerek onaya sunulur." }
            ].map((value, i) => (
              <div key={i} className="p-8 bg-stone-100 border border-stone-200">
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
