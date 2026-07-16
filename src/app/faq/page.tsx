export default function FAQ() {
  const faqs = [
    {
      q: "Mobilya üretimi ne kadar sürüyor?",
      a: "Üretim süresi projenin büyüklüğüne ve detaylarına göre değişiklik göstermekle birlikte, standart ev mobilyaları için ortalama 3-5 hafta, büyük çaplı anahtar teslim projeler için 6-10 hafta sürmektedir."
    },
    {
      q: "Şehir dışına/yurt dışına hizmet veriyor musunuz?",
      a: "Evet, fabrikamız Bursa İnegöl'de bulunmakla birlikte, tüm Türkiye'ye ve uluslararası birçok noktaya üretim, nakliye ve montaj hizmeti sunmaktayız."
    },
    {
      q: "Mekanımın ölçüsünü kim alıyor?",
      a: "Anlaşma sağlandıktan sonra, profesyonel rölöve ve iç mimar ekibimiz bizzat mekanınıza gelerek lazerli ölçüm cihazlarıyla milimetrik ölçü almaktadır."
    },
    {
      q: "Kendi tasarımımı ürettirebilir miyim?",
      a: "Kesinlikle. Eğer elinizde hazır bir iç mimari proje veya görsel varsa, teknik ekibimiz bunu analiz eder ve kendi tesislerimizde birebir üretime alır."
    },
    {
      q: "Kullandığınız ahşap ve boya malzemeleri garantili mi?",
      a: "Evet. Tüm ürünlerimizde 1. sınıf MDF, masif ahşap ve uluslararası standartlara (E1) uygun, sağlığa zararsız lake/cila malzemeleri kullanıyoruz. Tüm üretimimiz firmamız garantisi altındadır."
    },
    {
      q: "Fiyatlandırma nasıl yapılıyor?",
      a: "Fiyatlandırma; seçilen malzeme (lake, kaplama, melamin vb.), aksesuar kalitesi (Blum, Hafele vb.) ve projenin metrajına göre özel olarak hesaplanmaktadır. Teklif Al formunu doldurarak yaklaşık fiyat bilgisi isteyebilirsiniz."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Sık Sorulan Sorular</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 leading-relaxed">
            Süreçlerimiz, üretim standartlarımız ve çalışma şeklimiz hakkında en çok merak edilen soruların cevapları.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-stone-200 p-6 sm:p-8 hover:border-stone-300 transition-colors">
              <h3 className="text-lg font-bold text-stone-900 mb-3 flex items-start gap-4">
                <span className="text-amber-700 font-serif">S.</span>
                {faq.q}
              </h3>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base flex items-start gap-4">
                <span className="text-stone-300 font-serif">C.</span>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 text-center bg-stone-900 text-white p-10 border border-stone-800">
          <h3 className="text-2xl font-serif mb-4">Aradığınız cevabı bulamadınız mı?</h3>
          <p className="text-stone-400 mb-8">Daha detaylı bilgi almak veya projenizi konuşmak için ekibimizle iletişime geçin.</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-stone-900 font-bold uppercase tracking-wider text-sm hover:bg-stone-200 transition-colors">
            İletişime Geç
          </a>
        </div>

      </div>
    </div>
  );
}
