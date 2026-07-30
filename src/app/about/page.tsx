import type { Metadata } from 'next';
import Image from 'next/image';
import { getAboutPage, getDefaultAboutData } from '@/app/actions/about';
import { getPageHeader } from '@/app/actions/page-headers';

export async function generateMetadata(): Promise<Metadata> {
  const res = await getAboutPage();
  const defaultData = await getDefaultAboutData();
  const data = res.success && res.data ? res.data : defaultData;
  return {
    title: data.metaTitle || "About Us | Star Decor",
    description: data.metaDesc || "Learn more about Star Decor's premium furniture manufacturing in Tanzania.",
    keywords: data.metaKeys || "about star decor, furniture manufacturer Tanzania",
  };
}

export default async function About() {
  const res = await getAboutPage();
  const defaultData = await getDefaultAboutData();
  const d = res.success && res.data ? res.data : defaultData;

  const headerRes = await getPageHeader("about");
  const headerData = headerRes.success && headerRes.data ? headerRes.data : null;



  let brochureHighlights = [];
  try { brochureHighlights = typeof d.brochureHighlights === 'string' ? JSON.parse(d.brochureHighlights) : d.brochureHighlights; } catch (e) { }

  let policies = [];
  try { policies = typeof d.policies === 'string' ? JSON.parse(d.policies) : d.policies; } catch (e) { }

  const materialsArr = d.materials ? d.materials.split(',').map((s: string) => s.trim()) : [];

  return (
    <div className="min-h-screen bg-stone-50 pt-32 md:pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-serif text-stone-900 mb-6 leading-tight">
            {headerData?.title || "About Us"}
          </h1>
          <div className="w-12 h-[2px] bg-amber-700 mx-auto"></div>
          {headerData?.description && (
            <p className="text-stone-600 mt-6 max-w-2xl mx-auto leading-relaxed">
              {headerData.description}
            </p>
          )}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <div className="aspect-[4/3] relative overflow-hidden bg-stone-200 shadow-luxury group">
            <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
            <Image
              src={d.storyImg || "/dummygorsel/factory_workshop.png"}
              alt={d.storyTitle}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              priority
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">{d.storyTitle}</h2>
            <div className="w-8 h-[2px] bg-amber-700"></div>
            <p className="text-stone-500 leading-relaxed font-light text-lg">
              {d.storyDesc1}
            </p>
            <p className="text-stone-500 leading-relaxed font-light text-lg">
              {d.storyDesc2}
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-white p-12 lg:p-16 shadow-luxury hover:shadow-luxury-hover transition-shadow duration-500 border border-transparent hover:border-stone-100">
            <h3 className="text-3xl font-serif text-stone-900 mb-6">{d.visionTitle || "Our Vision"}</h3>
            <div className="w-8 h-[1px] bg-amber-700 mb-6"></div>
            <p className="text-stone-500 leading-relaxed font-light text-lg">
              {d.visionText}
            </p>
          </div>
          <div className="bg-white p-12 lg:p-16 shadow-luxury hover:shadow-luxury-hover transition-shadow duration-500 border border-transparent hover:border-stone-100">
            <h3 className="text-3xl font-serif text-stone-900 mb-6">{d.missionTitle || "Our Mission"}</h3>
            <div className="w-8 h-[1px] bg-amber-700 mb-6"></div>
            <p className="text-stone-500 leading-relaxed font-light text-lg">
              {d.missionText}
            </p>
          </div>
        </div>

        {/* Turkey-Tanzania Bridge Section (Premium Design) */}
        <div className="bg-[#111111] text-stone-100 p-10 md:p-20 shadow-luxury mb-32 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-700/5 rounded-full blur-3xl transition-all duration-1000"></div>
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <span className="text-amber-600/80 text-xs font-bold uppercase tracking-[0.2em] block">{d.bridgeLabel}</span>
              <h2
                className="text-4xl md:text-5xl font-serif leading-tight text-white"
                dangerouslySetInnerHTML={{ __html: d.bridgeTitle }}
              />
              <div className="w-12 h-[2px] bg-amber-700"></div>
              <p className="text-stone-400 leading-relaxed font-light">
                {d.bridgeDesc1}
              </p>
              <p className="text-stone-500 leading-relaxed font-light text-sm">
                {d.bridgeDesc2}
              </p>
            </div>
            <div className="w-full aspect-[3/2] relative overflow-hidden bg-stone-900 flex items-center justify-center min-h-[300px]">
              <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
              <Image
                src={d.bridgeImg || "/dummygorsel/tr-tz-flag.jpg"}
                alt={d.bridgeLabel}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>
        </div>

        {/* Corporate Brochure & Catalogue Showcase Section */}
        <div className="bg-white p-12 md:p-20 shadow-luxury mb-32 border border-transparent hover:border-stone-100 transition-colors duration-500">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-16">
            <div className="max-w-2xl">
              <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.2em] block mb-4">{d.brochureLabel}</span>
              <h2 className="text-4xl font-serif text-stone-900 mb-4">{d.brochureTitle}</h2>
              <p className="text-stone-500 font-light leading-relaxed">
                {d.brochureDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
              <a
                href={d.brochureUrl || "#"}
                download
                className="w-full sm:w-auto px-10 py-4 bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-luxury"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download the brochure
              </a>
              <a
                href={d.brochureUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-luxury"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </a>
            </div>
          </div>

          {/* Brochure Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brochureHighlights.map((item: any, i: number) => (
              <div key={i} className="space-y-4 group">
                <div className="text-amber-700 font-serif text-3xl italic group-hover:text-amber-600 transition-colors">0{i + 1}</div>
                <h4 className="font-serif text-stone-900 text-xl">{item.title}</h4>
                <p className="text-sm text-stone-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Materials We Use (From Brochure) */}
          {materialsArr.length > 0 && (
            <div className="mt-16 pt-12 border-t border-stone-100">
              <h3 className="font-serif text-stone-900 text-xl mb-6">{d.materialsTitle || "High Quality Wood & Panels We Use"}</h3>
              <div className="flex flex-wrap gap-3">
                {materialsArr.map((mat: string, i: number) => (
                  <span key={i} className="px-5 py-2 bg-stone-50 hover:bg-stone-100 transition-colors text-stone-600 text-xs uppercase tracking-widest font-medium border border-stone-100">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Values */}
        <div className="text-center">
          <h2 className="text-4xl font-serif text-stone-900 mb-6">{d.policyTitle}</h2>
          <div className="w-12 h-[2px] bg-amber-700 mx-auto mb-16"></div>

          <div className="grid sm:grid-cols-3 gap-10">
            {policies.map((value: any, i: number) => (
              <div key={i} className="p-12 bg-white hover:shadow-luxury transition-shadow duration-500 border border-transparent hover:border-stone-100">
                <h4 className="text-2xl font-serif text-stone-900 mb-4">{value.title}</h4>
                <p className="text-stone-500 font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>



    </div>
  );
}
