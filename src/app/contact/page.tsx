export default function Contact() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">İletişim</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto">
            Projeleriniz, teklif talepleriniz veya genel sorularınız için bizimle iletişime geçebilirsiniz. Fabrikamızı ve showroom'umuzu ziyaret ederek üretim sürecimizi yakından görebilirsiniz.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-serif text-stone-900 border-b border-stone-200 pb-4">İletişim Bilgileri</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Fabrika & Merkez</h3>
                  <p className="text-stone-600">Organize Sanayi Bölgesi, Mobilyacılar Cad. No: 42<br />İnegöl / Bursa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Telefon</h3>
                  <p className="text-stone-600">+90 (224) 555 00 00</p>
                  <p className="text-stone-600">+90 (532) 555 00 00 (WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">E-Posta</h3>
                  <p className="text-stone-600">info@tanzanyamobilya.com</p>
                  <p className="text-stone-600">proje@tanzanyamobilya.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-stone-200 border border-stone-300 w-full min-h-[400px] flex items-center justify-center">
            <p className="text-stone-500 font-semibold">[Google Haritalar Alanı]</p>
          </div>

        </div>
      </div>
    </div>
  );
}
