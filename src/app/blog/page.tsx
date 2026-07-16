import Link from 'next/link';

export default function Blog() {
  const posts = [
    {
      title: "2026 Mobilya ve Dekorasyon Trendleri",
      category: "Trendler",
      date: "12 Ekim 2026",
      excerpt: "Bu yıl iç mekanlarda doğal ahşap dokularının ve sürdürülebilir malzemelerin nasıl ön plana çıktığını inceliyoruz."
    },
    {
      title: "Ofis Ergonomisinin Çalışan Verimliliğine Etkisi",
      category: "Ofis Mobilyaları",
      date: "28 Eylül 2026",
      excerpt: "Doğru seçilmiş bir çalışma masası ve ofis sandalyesinin insan sağlığına ve iş performansına doğrudan etkileri."
    },
    {
      title: "MDF mi, Masif Ahşap mı? Doğru Seçim Nasıl Yapılır?",
      category: "Üretim Rehberi",
      date: "15 Eylül 2026",
      excerpt: "Ev mobilyası yaptırırken hangi malzemenin hangi alanda kullanılması gerektiğine dair uzman rehberimiz."
    },
    {
      title: "Anahtar Teslim Projelerde Dikkat Edilmesi Gerekenler",
      category: "Projelendirme",
      date: "02 Eylül 2026",
      excerpt: "Şantiye sürecinden montaj aşamasına kadar, sorunsuz bir anahtar teslim mimari projenin altın kuralları."
    },
    {
      title: "Otel Konseptlerinde Mobilyanın Rolü",
      category: "Ticari Projeler",
      date: "18 Ağustos 2026",
      excerpt: "Müşteri deneyimini üst seviyeye çıkaran butik ve zincir otel mobilya tasarımlarındaki en önemli detaylar."
    },
    {
      title: "Cila ve Boya Süreçlerimiz: Kalite Nasıl Korunur?",
      category: "Fabrika Günlükleri",
      date: "05 Ağustos 2026",
      excerpt: "Kusursuz yüzeyler elde etmek için fabrikamızdaki modern tozsuz cila kabinlerinde uyguladığımız özel yöntemler."
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <article key={i} className="bg-white border border-stone-200 group flex flex-col">
              <div className="w-full aspect-[16/10] bg-stone-200 overflow-hidden relative">
                <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:scale-105 transition-transform duration-700">
                  [Görsel]
                </div>
                <div className="absolute top-4 left-4 bg-white text-stone-900 px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <time className="text-stone-400 text-sm mb-3 block">{post.date}</time>
                <h2 className="text-xl font-bold text-stone-900 mb-4 group-hover:text-amber-700 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-stone-600 leading-relaxed mb-6 flex-grow text-sm">
                  {post.excerpt}
                </p>
                <Link href="#" className="text-amber-700 font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 hover:text-amber-800 transition-colors">
                  Devamını Oku 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
