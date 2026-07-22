import type { Metadata } from 'next';
import Image from 'next/image';

import { getProductGroups } from '@/app/actions/products';

export const metadata: Metadata = {
  title: "Ürün Gruplarımız",
  description: "Ev mobilyaları, ofis mobilyaları, okul & kütüphane donanımları ve ticari projeleriniz için ürettiğimiz özel ahşap ve dekorasyon ürünleri.",
};

export default async function Products() {
  const res = await getProductGroups();
  const categories = res.success && res.data ? res.data : [];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Ürünlerimiz</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Kendi fabrikamızda, birinci sınıf malzemelerle ürettiğimiz geniş ürün yelpazemiz. Farklı sektörlerin ihtiyaçlarına uygun estetik, dayanıklı ve ergonomik çözümler.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((category, index) => (
            <div key={index} className="bg-white border border-stone-200 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
              {/* Image Side */}
              <div className="md:w-2/5 aspect-[4/3] md:aspect-auto relative bg-stone-100 border-r border-stone-200 min-h-[300px] md:min-h-full">
                <Image 
                  src={category.img}
                  alt={category.metaTitle || category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              
              {/* Content Side */}
              <div className="md:w-3/5 p-10 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-serif text-stone-900 mb-4">{category.title}</h2>
                <p className="text-stone-600 mb-8 leading-relaxed">
                  {category.desc}
                </p>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {category.items ? category.items.split(',').map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0"></div>
                      <span className="text-stone-800 font-medium">{item.trim()}</span>
                    </div>
                  )) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
