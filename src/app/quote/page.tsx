"use client";

import { useState } from 'react';
import { submitQuote } from '@/app/actions/quotes';

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Ev & Konut Mobilyası',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setStatusMsg({ type: 'error', text: 'Lütfen zorunlu alanları (*) doldurunuz.' });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    const res = await submitQuote(formData);

    setLoading(false);
    if (res.success) {
      setStatusMsg({
        type: 'success',
        text: 'Teklif talebiniz başarıyla kaydedilmiştir. Proje ekibimiz en kısa sürede sizinle iletişime geçecektir.'
      });
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Ev & Konut Mobilyası',
        message: ''
      });
    } else {
      setStatusMsg({
        type: 'error',
        text: res.error || 'Bir hata oluştu, lütfen daha sonra tekrar deneyiniz.'
      });
    }
  };

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
          
          {/* Status Message */}
          {statusMsg && (
            <div className={`mb-8 p-4 border text-sm font-medium ${
              statusMsg.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Ad Soyad / Firma Adı *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="Kurum veya şahıs adı"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">E-Posta Adresi *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="ornek@firma.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Telefon Numarası *</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="0 (5XX) XXX XX XX"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Proje Türü</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors appearance-none"
                >
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
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Proje Detayları ve Beklentileriniz</label>
              <textarea 
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors resize-y"
                placeholder="İhtiyaç duyduğunuz ürünler, yaklaşık metrekare, tercih ettiğiniz malzemeler vb."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button 
                type="submit" 
                disabled={loading}
                className="px-12 py-4 bg-stone-900 text-white font-bold uppercase tracking-wider text-sm hover:bg-amber-800 transition-colors w-full md:w-auto disabled:bg-stone-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Gönderiliyor...' : 'Teklif İsteğini Gönder'}
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
