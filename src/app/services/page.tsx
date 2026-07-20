import type { Metadata } from 'next';
import Link from 'next/link';
import { servicesData } from '@/data/servicesData';

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "İç mimari ve tasarım, özel mobilya üretimi, anahtar teslim uygulama ve montaj hizmetlerimizle projelerinizi eksiksiz hayata geçiriyoruz.",
};

export default function Services() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, i) => (
            <Link 
              key={service.slug} 
              href={`/services/${service.slug}`}
              className="bg-white p-8 md:p-10 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all rounded-lg group"
            >
              <div>
                <div className="w-12 h-12 bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 rounded">
                  <span className="text-amber-700 font-serif text-xl font-bold">{i + 1}</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-stone-900 mb-4 group-hover:text-amber-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm mb-6 line-clamp-3">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-amber-700 font-bold text-xs uppercase tracking-wider">
                <span>Detaylı İncele</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
          
          {/* CTA Box */}
          <div className="bg-stone-900 p-8 md:p-10 flex flex-col justify-center items-center text-center rounded-lg border border-stone-800 shadow-sm">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest block mb-2">Özel Projelendirme</span>
            <h3 className="text-2xl font-serif text-white mb-4 font-bold">Projeniz mi var?</h3>
            <p className="text-stone-400 text-sm mb-8 leading-relaxed">
              Mekanınıza özel ahşap çözümleri ve bütçelendirme için bizimle iletişime geçin.
            </p>
            <Link href="/quote" className="px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold uppercase tracking-wider text-xs transition-colors rounded shadow-md w-full">
              Hemen Teklif Al
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
