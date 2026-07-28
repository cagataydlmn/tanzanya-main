import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/app/actions/services';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await getServiceBySlug(slug);
  const service = res.success && res.data ? res.data : null;

  if (!service) return { title: "Hizmet Bulunamadı | Tanzanya Mobilya" };

  return {
    title: service.metaTitle || `${service.title} - Hizmetlerimiz | Tanzanya Mobilya`,
    description: service.metaDesc || service.desc,
    ...(service.metaKeys ? { keywords: service.metaKeys } : {}),
    openGraph: {
      title: service.metaTitle || `${service.title} | Tanzanya Mobilya`,
      description: service.metaDesc || service.desc,
      images: [{ url: service.img }],
    }
  };
}

export async function generateStaticParams() {
  const res = await getServices();
  if (res.success && res.data) {
    return res.data.map((service: any) => ({
      slug: service.slug,
    }));
  }
  return [];
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const res = await getServiceBySlug(slug);
  const service = res.success && res.data ? res.data : null;

  if (!service) notFound();

  const allRes = await getServices();
  const otherServices = allRes.success && allRes.data
    ? allRes.data.filter((s: any) => s.slug !== service.slug)
    : [];

  return (
    <div className="min-h-screen bg-stone-50 pb-24">

      {/* Hero Header */}
      <section className="relative bg-stone-950 text-white pt-28 md:pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={service.img}
            alt={service.metaTitle || service.title}
            fill
            unoptimized
            className="object-cover blur-3xl scale-125"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950 to-stone-950" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center md:text-left">
          <nav className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-amber-500 font-medium truncate">{service.title}</span>
          </nav>

          <span className="text-amber-500 text-xs font-bold uppercase tracking-widest block mb-3">
            Service Details
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight max-w-3xl">
            {service.title}
          </h1>
          <p className="text-stone-300 text-base md:text-lg max-w-2xl mt-4 leading-relaxed">
            {service.desc}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">

        {/* Showcase Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 mb-12">
          <Image
            src={service.img}
            alt={service.metaTitle || service.title}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Content & Floating CTA Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left Column: Long Description, Features & Process */}
          <div className="lg:col-span-2 space-y-10">

            {/* Overview Card */}
            <div className="bg-white border border-stone-200 p-8 md:p-10 shadow-sm rounded-lg space-y-6">
              <h2 className="text-2xl font-serif text-stone-900 font-bold border-b border-stone-100 pb-4">
                Scope of Services and Overview
              </h2>
              <p className="text-stone-700 text-base leading-relaxed">
                {service.longDesc}
              </p>

              <div className="pt-6 border-t border-stone-100 space-y-4">
                <h3 className="text-stone-900 font-bold text-base">Key Features and Benefits:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features ? service.features.split(',').map((feat: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 bg-stone-50 p-3.5 rounded border border-stone-100">
                      <svg className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-stone-800 text-sm font-medium">{feat.trim()}</span>
                    </div>
                  )) : null}
                </div>
              </div>
            </div>

            {/* Step-by-Step Workflow Card */}
            <div className="bg-white border border-stone-200 p-8 md:p-10 shadow-sm rounded-lg space-y-6">
              <h2 className="text-2xl font-serif text-stone-900 font-bold border-b border-stone-100 pb-4">
                Our Work and Implementation Process
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {service.steps ? service.steps.split(',').map((step: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold font-serif shrink-0 text-lg shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-base mb-1">{step.trim()}</h4>

                    </div>
                  </div>
                )) : null}
              </div>
            </div>

          </div>

          {/* Right Column: CTA Card */}
          <div className="space-y-6">
            <div className="bg-stone-900 text-white p-8 rounded-lg border border-stone-800 shadow-xl space-y-6 sticky top-28">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest block">Profesyonel Destek</span>
              <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                {service.title} Get a Quote
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Request custom pricing and a detailed site assessment for your space and project.
              </p>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/quote?service=${encodeURIComponent(service.title)}`}
                  className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm uppercase tracking-wider transition-colors block text-center rounded shadow-md"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact"
                  className="w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase tracking-wider transition-colors block text-center rounded border border-stone-700"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Other Services Bottom Navigation */}
        <div className="mt-20 border-t border-stone-200 pt-16">
          <h2 className="text-2xl font-serif text-stone-900 font-bold mb-8">Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {otherServices.map((item: any) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group bg-white border border-stone-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 block"
              >
                <h3 className="font-bold text-stone-900 group-hover:text-amber-700 transition-colors text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <span className="text-amber-700 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1">
                  View Details →
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
