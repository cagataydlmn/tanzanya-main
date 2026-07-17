"use client";

import { useState, useEffect } from 'react';
import { getQuotes, updateQuoteStatus, deleteQuote } from '@/app/actions/quotes';

interface Quote {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  createdAt: Date;
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchQuotes = async () => {
    const res = await getQuotes();
    if (res.success && res.data) {
      setQuotes(res.data as Quote[]);
      
      // Eğer seçili quote varsa onu da listeden güncelle
      if (selectedQuote) {
        const updated = (res.data as Quote[]).find(q => q.id === selectedQuote.id);
        if (updated) setSelectedQuote(updated);
      }
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleSelectQuote = async (quote: Quote) => {
    setSelectedQuote(quote);
    
    // Eğer durum "Yeni" ise otomatik "Okundu" yap
    if (quote.status === "Yeni") {
      const res = await updateQuoteStatus(quote.id, "Okundu");
      if (res.success) {
        fetchQuotes();
      }
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    setLoading(true);
    const res = await updateQuoteStatus(id, status);
    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: `Talep durumu '${status}' olarak güncellendi.` });
      fetchQuotes();
    } else {
      setMessage({ type: 'error', text: res.error || 'Durum güncellenemedi.' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu teklif talebini silmek istediğinize emin misiniz?")) return;

    setLoading(true);
    const res = await deleteQuote(id);
    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: 'Teklif talebi başarıyla silindi.' });
      setSelectedQuote(null);
      fetchQuotes();
    } else {
      setMessage({ type: 'error', text: res.error || 'Talep silinemedi.' });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Alert Message */}
      {message && (
        <div className={`p-4 border text-sm font-medium ${
          message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-stone-900">Gelen Teklif Talepleri</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Quotes List */}
        <div className="w-full lg:w-1/2 bg-white border border-stone-200 shadow-sm overflow-hidden">
          {quotes.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              Henüz teklif talebi bulunmuyor.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 text-stone-900 uppercase tracking-wider font-bold border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4">Gönderen</th>
                  <th className="px-6 py-4">Talep Türü</th>
                  <th className="px-6 py-4">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {quotes.map((quote) => {
                  const formattedDate = new Date(quote.createdAt).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <tr 
                      key={quote.id} 
                      onClick={() => handleSelectQuote(quote)}
                      className={`cursor-pointer transition-colors ${
                        selectedQuote?.id === quote.id ? 'bg-amber-50' : 'hover:bg-stone-50'
                      } ${quote.status === 'Yeni' ? 'font-bold text-stone-900 bg-stone-50/50' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <p>{quote.name}</p>
                        <p className="text-xs text-stone-400 font-normal mt-1">{formattedDate}</p>
                      </td>
                      <td className="px-6 py-4 truncate max-w-[150px]">{quote.service}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-bold uppercase rounded-sm ${
                          quote.status === 'Yeni' ? 'bg-amber-100 text-amber-700' : 
                          quote.status === 'Yanıtlandı' ? 'bg-green-100 text-green-700' : 
                          'bg-stone-200 text-stone-600'
                        }`}>
                          {quote.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Quote Details */}
        <div className="w-full lg:w-1/2">
          {selectedQuote ? (
            <div className="bg-white border border-stone-200 shadow-sm p-8 sticky top-8">
              <div className="flex justify-between items-start border-b border-stone-100 pb-6 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 mb-1">{selectedQuote.service}</h2>
                  <p className="text-sm text-stone-500">
                    {new Date(selectedQuote.createdAt).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-sm ${
                  selectedQuote.status === 'Yeni' ? 'bg-amber-100 text-amber-700' : 
                  selectedQuote.status === 'Yanıtlandı' ? 'bg-green-100 text-green-700' : 
                  'bg-stone-200 text-stone-600'
                }`}>
                  {selectedQuote.status}
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-stone-400 text-xs uppercase tracking-wider mb-1">Ad Soyad / Firma</span>
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

              <div className="space-y-4">
                <div className="flex gap-4">
                  <a 
                    href={`mailto:${selectedQuote.email}?subject=Tanzanya Mobilya Teklif Talebi`}
                    className="flex-1 text-center px-6 py-3 bg-stone-900 text-white font-bold text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors cursor-pointer"
                  >
                    E-Posta İle Yanıtla
                  </a>
                  <button 
                    onClick={() => handleDelete(selectedQuote.id)}
                    disabled={loading}
                    className="px-6 py-3 bg-white border border-stone-200 text-red-600 font-bold text-sm uppercase tracking-wider hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Sil
                  </button>
                </div>
                
                {selectedQuote.status !== 'Yanıtlandı' && (
                  <button 
                    onClick={() => handleStatusChange(selectedQuote.id, 'Yanıtlandı')}
                    disabled={loading}
                    className="w-full text-center px-6 py-3 bg-green-700 text-white font-bold text-sm uppercase tracking-wider hover:bg-green-800 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Yanıtlandı Olarak İşaretle
                  </button>
                )}
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
