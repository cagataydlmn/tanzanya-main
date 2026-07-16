export default function Projects() {
  const projects = [
    { name: "Hilton Otel Odaları Restorasyonu", category: "Otel", img: "Görsel" },
    { name: "Acıbadem Hastanesi Lobi Mobilyaları", category: "Sağlık", img: "Görsel" },
    { name: "Bahçeşehir Koleji Kampüs Sıraları", category: "Eğitim", img: "Görsel" },
    { name: "Garanti BBVA Genel Müdürlük", category: "Ofis", img: "Görsel" },
    { name: "Midpoint Restoran Mobilyaları", category: "Restoran", img: "Görsel" },
    { name: "Vadi İstanbul Örnek Daire", category: "Konut", img: "Görsel" },
    { name: "Divan Pastaneleri İç Mekan", category: "Kafe", img: "Görsel" },
    { name: "Bilkent Üniversitesi Kütüphane", category: "Eğitim", img: "Görsel" },
    { name: "Zorlu Center Özel Tasarım Villa", category: "Konut", img: "Görsel" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Referans Projelerimiz</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto">
            Geçmişten bugüne başarıyla tamamladığımız ticari ve bireysel mobilya taahhüt projelerinden bazıları.
          </p>
        </div>

        {/* Filter Categories (Mock) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Tümü", "Otel", "Ofis", "Eğitim", "Konut", "Restoran"].map((cat, i) => (
            <button 
              key={i} 
              className={`px-6 py-2 border font-medium text-sm transition-colors ${
                i === 0 
                  ? 'bg-stone-900 text-white border-stone-900' 
                  : 'bg-white text-stone-600 border-stone-300 hover:border-amber-700 hover:text-amber-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group cursor-pointer bg-white border border-stone-200 hover:border-amber-700 transition-colors">
              <div className="w-full aspect-[4/3] bg-stone-200 overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100 group-hover:scale-105 transition-transform duration-700">
                  [{project.img}]
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2 block">{project.category}</span>
                <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">{project.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
