import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Üretim Süreçlerimiz",
  description: "Tasarım, malzeme seçimi, ebatlama, CNC kesim, boya, cila ve titiz kalite kontrol aşamalarıyla fabrikamızda uyguladığımız profesyonel üretim aşamaları.",
};

export default function Production() {
  const steps = [
    {
      title: "Tasarım ve Projelendirme",
      desc: "İhtiyaç analizi sonrasında iç mimarlarımız tarafından ölçülendirme yapılır ve 3D çizim programları ile mobilyanın son hali projelendirilir."
    },
    {
      title: "Malzeme Seçimi",
      desc: "Projeye en uygun birinci sınıf ahşap, MDF, kaplama veya metal aksamlar titizlikle seçilir ve üretime hazırlanır."
    },
    {
      title: "Ahşap ve Metal İşleme (CNC)",
      desc: "Son teknoloji CNC kesim makinalarımızda milimetrik hassasiyetle kesilen paneller, ebatlama ve bantlama işlemine tabi tutulur."
    },
    {
      title: "Boya ve Cila Hanesi",
      desc: "Tozsuz boya kabinlerimizde mobilyalar, istenilen renkte lake boya veya doğal ahşap cila ile pürüzsüz bir yüzeye kavuşturulur."
    },
    {
      title: "Döşeme ve Kumaş Uygulaması",
      desc: "Koltuk ve panolar için ustalarımız tarafından en kaliteli kumaşlar özenle kesilir, süngerlenir ve el işçiliğiyle döşenir."
    },
    {
      title: "Kalite Kontrol ve Paketleme",
      desc: "Üretimi tamamlanan her ürün kalite onayından geçer. Nakliye veya montaj sırasında hasar görmemesi için uluslararası standartlarda paketlenir."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Üretim</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Tasarımdan teslimata kadar tüm süreçlerin fabrikamızda yürütüldüğü, kalite standartlarından ödün vermeyen entegre üretim hattımız.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-stone-900 border border-stone-200 rounded-xl overflow-hidden shadow-xl mb-20 group">
          <Image
            src="/dummygorsel/factory_workshop.png"
            alt="Tanzanya Mobilya 5000m² Fabrika Üretim Alanı"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
            <span className="bg-stone-900/80 backdrop-blur-md px-4 py-2 rounded text-xs md:text-sm font-bold uppercase tracking-widest border border-amber-600/40 text-amber-400">
              5000 m² Entegre Üretim Tesisimiz
            </span>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-stone-300"></div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center justify-between ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content */}
                <div className="w-full md:w-[45%] bg-white p-8 border border-stone-200 shadow-sm relative z-10 group hover:border-amber-700 transition-colors">
                  <div className="text-amber-700 font-serif text-5xl font-bold mb-4 opacity-20">0{i + 1}</div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-3 -mt-10">{step.title}</h3>
                  <p className="text-stone-600 leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex w-10 h-10 bg-white border-4 border-amber-700 rounded-full z-10 shrink-0 items-center justify-center">
                  <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                </div>

                {/* Empty Space for layout */}
                <div className="hidden md:block w-full md:w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
