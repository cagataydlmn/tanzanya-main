import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "İç mimari ve tasarım, özel mobilya üretimi, anahtar teslim uygulama ve montaj hizmetlerimizle projelerinizi eksiksiz hayata geçiriyoruz.",
};

export default function Services() {
  const services = [
    {
      title: "İç Mimari ve Tasarım",
      desc: "Ev, ofis veya ticari alanlarınız için uzman ekibimizle yaşam tarzınıza uygun estetik ve fonksiyonel tasarımlar hazırlıyoruz. 3D modelleme ile mekanınızın bitmiş halini önceden görün.",
    },
    {
      title: "Özel Mobilya Üretimi",
      desc: "Standartların dışına çıkın. Fabrikamızda tamamen alanınıza ve zevkinize özel, milimetrik ölçülerde mobilya üretimi yapıyoruz.",
    },
    {
      title: "Anahtar Teslim Projeler",
      desc: "İnşaat, dekorasyon ve mobilya süreçlerini tek elden yönetiyoruz. Mekanı boş teslim alıp, anahtarınızı oturmaya hazır şekilde teslim ediyoruz.",
    },
    {
      title: "Montaj ve Uygulama",
      desc: "Ürettiğimiz tüm mobilyaların kurulumu ve şantiye içi uygulamaları profesyonel montaj ekiplerimiz tarafından titizlikle gerçekleştirilir.",
    },
    {
      title: "Projelendirme ve 3D Tasarım",
      desc: "Uygulama öncesi mekanınızın fotogerçekçi 3D renderlarını hazırlayarak renk, doku ve malzeme uyumunu kusursuzlaştırıyoruz.",
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Hizmetlerimiz</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto">
            Tasarım aşamasından üretim ve montaja kadar, projenizin her adımında profesyonel çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-10 border border-stone-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-stone-100 flex items-center justify-center mb-6">
                <span className="text-amber-700 font-serif text-xl font-bold">{i + 1}</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">{service.title}</h3>
              <p className="text-stone-600 leading-relaxed flex-grow">
                {service.desc}
              </p>
            </div>
          ))}
          
          <div className="bg-stone-900 p-10 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-serif text-white mb-4">Projeniz mi var?</h3>
            <p className="text-stone-400 mb-8">
              Mekanınıza özel çözümler ve fiyatlandırma için bizimle iletişime geçin.
            </p>
            <a href="/quote" className="px-8 py-3 bg-white text-stone-900 font-bold uppercase tracking-wider text-sm hover:bg-stone-200 transition-colors">
              Hemen Teklif Al
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
