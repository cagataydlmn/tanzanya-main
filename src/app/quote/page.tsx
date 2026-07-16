export default function Quote() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Teklif Al</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 leading-relaxed max-w-2xl mx-auto">
            Hayalinizdeki mekan veya üretim ihtiyacınız için detayları bizimle paylaşın. Proje ekibimiz en kısa sürede size özel bir fiyatlandırma ile dönüş yapacaktır.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm">
          <form className="space-y-8">
            
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Ad Soyad / Firma Adı *</label>
                <input 
                  type="text" 
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="Kurum veya şahıs adı"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">E-Posta Adresi *</label>
                <input 
                  type="email" 
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="ornek@firma.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Telefon Numarası *</label>
                <input 
                  type="tel" 
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="0 (5XX) XXX XX XX"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Proje Türü</label>
                <select className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors appearance-none">
                  <option>Ev & Konut Mobilyası</option>
                  <option>Ofis & Çalışma Alanı</option>
                  <option>Otel / Restoran / Kafe</option>
                  <option>Okul / Hastane</option>
                  <option>Sadece Üretim (Fason)</option>
                  <option>Diğer</option>
                </select>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Proje Detayları ve Beklentileriniz</label>
              <textarea 
                rows={5}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors resize-y"
                placeholder="İhtiyaç duyduğunuz ürünler, yaklaşık metrekare, tercih ettiğiniz malzemeler vb."
              ></textarea>
            </div>

            {/* File Upload Mock */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Proje Dosyası / Çizim Ekle (Opsiyonel)</label>
              <div className="w-full border-2 border-dashed border-stone-300 bg-stone-50 px-4 py-10 flex flex-col items-center justify-center text-center hover:bg-stone-100 transition-colors cursor-pointer">
                <svg className="w-8 h-8 text-stone-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-stone-600 font-medium">Dosyaları buraya sürükleyin veya <span className="text-amber-700 underline">seçmek için tıklayın</span></p>
                <p className="text-stone-400 text-xs mt-2">Maks. 10MB (PDF, JPG, PNG, DWG)</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button 
                type="button" 
                className="px-12 py-4 bg-stone-900 text-white font-bold uppercase tracking-wider text-sm hover:bg-amber-800 transition-colors w-full md:w-auto"
              >
                Teklif İsteğini Gönder
              </button>
              <p className="text-stone-400 text-xs mt-4">
                Bilgileriniz KVKK kapsamında korunmaktadır ve üçüncü şahıslarla paylaşılmaz.
              </p>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  );
}
