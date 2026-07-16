"use client";

import { useState } from 'react';

export default function AdminQuotes() {
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const mockQuotes = [
    { 
      id: 1, 
      name: "Ahmet Yılmaz", 
      email: "ahmet@ornek.com",
      phone: "0555 123 4567",
      subject: "Otel Odaları İçin Mobilya Teklifi",
      status: "Okunmadı", 
      date: "2026-07-09 14:30",
      message: "Merhaba, Antalya'daki 50 odalı yeni butik otel projemiz için yatak başlığı, gardırop ve çalışma masası takımları üretimi hakkında fiyat teklifi almak istiyoruz."
    },
    { 
      id: 2, 
      name: "Zeynep Kaya", 
      email: "zeynep@sirket.com",
      phone: "0532 987 6543",
      subject: "Ofis Yönetici Odası",
      status: "Okundu", 
      date: "2026-07-08 11:15",
      message: "Mecidiyeköy'deki genel müdürlük binamız için 3 adet lüks VIP yönetici masası takımı talebimiz var. Katalog gönderir misiniz?"
    },
    { 
      id: 3, 
      name: "Mehmet Demir", 
      email: "mehmet.d@mail.com",
      phone: "0505 444 3322",
      subject: "Mutfak Dolabı Yenileme",
      status: "Yanıtlandı", 
      date: "2026-07-05 09:45",
      message: "Evimin mutfağı için lake kapaklı modern bir tasarım düşünüyorum. Ortalama fiyat alabilir miyim?"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-stone-900">Gelen Teklif Talepleri</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Quotes List */}
        <div className="w-full lg:w-1/2 bg-white border border-stone-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-stone-900 uppercase tracking-wider font-bold border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Gönderen</th>
                <th className="px-6 py-4">Konu</th>
                <th className="px-6 py-4">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {mockQuotes.map((quote) => (
                <tr 
                  key={quote.id} 
                  onClick={() => setSelectedQuote(quote)}
                  className={`cursor-pointer transition-colors ${selectedQuote?.id === quote.id ? 'bg-amber-50' : 'hover:bg-stone-50'} ${quote.status === 'Okunmadı' ? 'font-bold text-stone-900 bg-stone-50/50' : ''}`}
                >
                  <td className="px-6 py-4">
                    <p>{quote.name}</p>
                    <p className="text-xs text-stone-400 font-normal mt-1">{quote.date}</p>
                  </td>
                  <td className="px-6 py-4 truncate max-w-[150px]">{quote.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded-sm ${
                      quote.status === 'Okunmadı' ? 'bg-amber-100 text-amber-700' : 
                      quote.status === 'Yanıtlandı' ? 'bg-green-100 text-green-700' : 
                      'bg-stone-200 text-stone-600'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quote Details */}
        <div className="w-full lg:w-1/2">
          {selectedQuote ? (
            <div className="bg-white border border-stone-200 shadow-sm p-8 sticky top-8">
              <div className="flex justify-between items-start border-b border-stone-100 pb-6 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 mb-1">{selectedQuote.subject}</h2>
                  <p className="text-sm text-stone-500">{selectedQuote.date}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-sm ${
                  selectedQuote.status === 'Okunmadı' ? 'bg-amber-100 text-amber-700' : 
                  selectedQuote.status === 'Yanıtlandı' ? 'bg-green-100 text-green-700' : 
                  'bg-stone-200 text-stone-600'
                }`}>
                  {selectedQuote.status}
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-stone-400 text-xs uppercase tracking-wider mb-1">Ad Soyad</span>
                    <span className="font-medium text-stone-900">{selectedQuote.name}</span>
                  </div>
                  <div>
                    <span className="block text-stone-400 text-xs uppercase tracking-wider mb-1">Telefon</span>
                    <a href={`tel:${selectedQuote.phone}`} className="font-medium text-amber-700 hover:underline">{selectedQuote.phone}</a>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-stone-400 text-xs uppercase tracking-wider mb-1">E-Posta</span>
                    <a href={`mailto:${selectedQuote.email}`} className="font-medium text-amber-700 hover:underline">{selectedQuote.email}</a>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-6 border border-stone-100 mb-8">
                <span className="block text-stone-400 text-xs uppercase tracking-wider mb-3">Mesaj Detayı</span>
                <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {selectedQuote.message}
                </p>
              </div>

              <div className="flex gap-4">
                <a 
                  href={`mailto:${selectedQuote.email}?subject=RE: ${selectedQuote.subject}`}
                  className="flex-1 text-center px-6 py-3 bg-stone-900 text-white font-bold text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors"
                >
                  E-Posta İle Yanıtla
                </a>
                <button className="px-6 py-3 bg-white border border-stone-200 text-red-600 font-bold text-sm uppercase tracking-wider hover:bg-red-50 transition-colors">
                  Sil
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 border-2 border-dashed border-stone-200 p-12 flex flex-col items-center justify-center text-center text-stone-400 h-full min-h-[400px]">
              <svg className="w-16 h-16 mb-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>Mesaj içeriğini görmek için<br/>soldaki listeden bir teklif seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
