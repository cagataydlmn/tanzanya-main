import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/app/actions/blog';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Blog & Haberler",
  description: "Mobilya trendleri, ofis ergonomisi, doğru malzeme seçimi ve dekorasyon fikirleri hakkında güncel yazılarımız ve rehberlerimiz.",
};

export default async function Blog() {
  const response = await getBlogPosts(true); // Sadece yayınlanmış olanları getir
  const posts = response.success && response.data ? response.data : [];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Blog & Haberler</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto">
            Sektördeki yenilikler, dekorasyon fikirleri, doğru malzeme seçimi ve fabrikamızdan en güncel haberler.
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200">
            <p className="text-stone-500">Henüz yayınlanmış bir blog yazısı bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => {
              const formattedDate = new Date(post.createdAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });

              return (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-stone-200 group flex flex-col shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-full aspect-[16/10] bg-stone-100 overflow-hidden relative">
                    {post.image ? (
                      <Image 
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:scale-105 transition-transform duration-700">
                        <svg className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white text-stone-900 px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <time className="text-stone-400 text-sm mb-3 block">{formattedDate}</time>
                    <h2 className="text-xl font-bold text-stone-900 mb-4 group-hover:text-amber-700 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-stone-600 leading-relaxed mb-6 flex-grow text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 group-hover:text-amber-800 transition-colors">
                      Devamını Oku 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
