export default function Products() {
  const categories = [
    {
      title: "Ev Mobilyaları",
      desc: "Evlerinize sıcaklık ve şıklık katacak, tamamen yaşam tarzınıza özel tasarlanmış ahşap mobilya çözümleri.",
      items: ["Mutfak Dolapları", "Gardıroplar", "TV Üniteleri", "Yemek Masaları", "Orta Sehpa", "Koltuk Takımları", "Berjerler", "Kitaplıklar"]
    },
    {
      title: "Ofis Mobilyaları",
      desc: "Çalışma alanlarınızın verimliliğini artıracak, kurumsal kimliğinizi yansıtan ergonomik ve modern ofis çözümleri.",
      items: ["Yönetici Masaları", "Çalışma Masaları", "Bankolar (Reception)", "Toplantı Masaları", "Ofis Bölmeleri", "Dosya Dolapları"]
    },
    {
      title: "Okul Mobilyaları",
      desc: "Öğrencilerin sağlığına uygun, dayanıklı ve eğitim kalitesini destekleyen pedagojik sınıf ve laboratuvar mobilyaları.",
      items: ["Öğrenci Sıraları", "Öğretmen Masaları", "Dolaplar", "Kütüphane Mobilyaları", "Laboratuvar Mobilyaları"]
    },
    {
      title: "Ticari Projeler",
      desc: "Kafe, restoran ve otellerin konseptine uygun, yoğun kullanıma dayanıklı, müşteri deneyimini üst seviyeye taşıyan mobilyalar.",
      items: ["Restoran Masaları", "Kafe Sandalyeleri", "Otel Odası Mobilyaları", "Lobi Koltukları", "Stand ve Teşhir Üniteleri"]
    }
  ];

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
            <div key={index} className="bg-white border border-stone-200 overflow-hidden flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="md:w-2/5 aspect-[4/3] md:aspect-auto bg-stone-200 flex items-center justify-center text-stone-400 border-r border-stone-200">
                [Görsel]
              </div>
              
              {/* Content Side */}
              <div className="md:w-3/5 p-10 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-serif text-stone-900 mb-4">{category.title}</h2>
                <p className="text-stone-600 mb-8 leading-relaxed">
                  {category.desc}
                </p>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0"></div>
                      <span className="text-stone-800 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
