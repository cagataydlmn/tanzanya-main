import type { Metadata } from 'next';
import Image from 'next/image';

import { getProductionInfo, getProductionSteps } from '@/app/actions/production';
import { getPageHeader } from '@/app/actions/page-headers';

export async function generateMetadata(): Promise<Metadata> {
  const infoRes = await getProductionInfo();
  const info = infoRes.success && infoRes.data ? infoRes.data : null;

  return {
    title: info?.metaTitle || info?.title || "Production Facility | Star Decor",
    description: info?.metaDesc || info?.desc || "Our professional furniture production process, from material selection and CNC cutting to finishing and strict quality control in our factory.",
    ...(info?.metaKeys ? { keywords: info.metaKeys } : { keywords: "furniture production Tanzania, CNC cutting Dar es Salaam, custom furniture manufacturing" })
  };
}

export default async function Production() {
  const [infoRes, stepsRes, headerRes] = await Promise.all([
    getProductionInfo(),
    getProductionSteps(),
    getPageHeader('production')
  ]);

  const defaultInfo: any = {
    title: "Üretim",
    desc: "Tasarımdan teslimata kadar tüm süreçlerin fabrikamızda yürütüldüğü, kalite standartlarından ödün vermeyen entegre üretim hattımız.",
    img: "/dummygorsel/factory_workshop.png"
  };

  const info = infoRes.success && infoRes.data ? infoRes.data : defaultInfo;
  
  const headerData = headerRes.success && headerRes.data ? headerRes.data : null;
  const pageTitle = headerData?.title || info.title;
  const pageDesc = headerData?.description || info.desc;

  const defaultSteps = [
    {
      title: "Tasarım ve Projelendirme",
      desc: "İhtiyaç analizi sonrasında iç mimarlarımız tarafından ölçülendirme yapılır ve 3D çizim programları ile mobilyanın son hali projelendirilir."
    }
  ];

  const steps = stepsRes.success && stepsRes.data && stepsRes.data.length > 0 ? stepsRes.data : defaultSteps;

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">{pageTitle}</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
            {pageDesc}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-stone-900 border border-stone-200 rounded-xl overflow-hidden shadow-xl mb-20 group">
          <Image
            src={info.img}
            alt={info.metaTitle || info.title || "Tanzanya Mobilya Üretim Alanı"}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-stone-300"></div>

          <div className="space-y-12">
            {steps.map((step: any, i: number) => (
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
