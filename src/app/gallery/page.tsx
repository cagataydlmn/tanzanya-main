export default function Gallery() {
  const images = [
    { title: "Lüks Villa Mutfak", size: "col-span-1 md:col-span-2 row-span-2" },
    { title: "Modern Ofis Masası", size: "col-span-1 row-span-1" },
    { title: "Otel Odası Tasarımı", size: "col-span-1 row-span-1" },
    { title: "Okul Kütüphanesi", size: "col-span-1 row-span-2" },
    { title: "Klasik Yemek Odası", size: "col-span-1 md:col-span-2 row-span-1" },
    { title: "Kafe Oturma Grubu", size: "col-span-1 row-span-1" },
    { title: "Ahşap Kaplama Duvar", size: "col-span-1 row-span-1" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Galeri</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto">
            Fabrikamızdan çıkan özel üretim mobilyalar ve tamamladığımız iç mimari projelerden seçkin kareler.
          </p>
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`group relative bg-stone-200 overflow-hidden cursor-pointer ${img.size}`}
            >
              <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400 group-hover:scale-110 transition-transform duration-700">
                [Görsel Alanı]
              </div>
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/60 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 font-serif text-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
