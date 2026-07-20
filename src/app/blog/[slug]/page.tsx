import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug } from '@/app/actions/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

// Dinamik Metadata Tanımlaması (Next.js 15+ async params standardı)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const response = await getBlogPostBySlug(slug);

  if (!response.success || !response.data) {
    return {
      title: "Yazı Bulunamadı",
      description: "Aradığınız blog yazısı bulunamadı."
    };
  }

  const post = response.data;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://tanzanyamobilya.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      images: post.image ? [{ url: post.image, alt: post.title }] : []
    }
  };
}

export default async function BlogPostDetail({ params }: Props) {
  const { slug } = await params;
  const response = await getBlogPostBySlug(slug);

  if (!response.success || !response.data) {
    notFound();
  }

  const post = response.data;
  const formattedDate = new Date(post.createdAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumb / Geri Dönüş */}
        <div className="mb-8">
          <Link href="/blog" className="text-stone-500 hover:text-amber-700 text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Blog Listesine Dön
          </Link>
        </div>

        {/* Makale Başlığı */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-amber-700 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
              {post.category}
            </span>
            <time className="text-stone-400 text-sm">{formattedDate}</time>
            <span className="text-stone-300">|</span>
            <span className="text-stone-400 text-sm">{post.views} Görüntülenme</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Kapak Görseli */}
        {post.image && (
          <div className="w-full aspect-[21/9] bg-stone-200 border border-stone-200 shadow-sm relative overflow-hidden mb-12">
            <Image 
              src={post.image}
              alt={post.title}
              fill
              unoptimized
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Makale İçeriği */}
        <article className="bg-white border border-stone-200 p-8 md:p-12 shadow-sm rounded-sm">
          <p className="text-lg text-stone-600 font-serif italic leading-relaxed border-l-4 border-amber-700 pl-6 mb-8">
            {post.excerpt}
          </p>
          <div className="text-stone-800 leading-loose space-y-6 text-base md:text-lg whitespace-pre-wrap font-sans">
            {post.content}
          </div>
        </article>

      </div>
    </div>
  );
}
