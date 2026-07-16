"use client";

import { useState } from 'react';

export default function AdminGallery() {
  const [showForm, setShowForm] = useState(false);

  const mockGallery = [
    { id: 1, title: "Lüks Villa Mutfak", category: "Konut" },
    { id: 2, title: "Modern Ofis Masası", category: "Ofis" },
    { id: 3, title: "Otel Odası Tasarımı", category: "Otel" },
    { id: 4, title: "Okul Kütüphanesi", category: "Eğitim" },
    { id: 5, title: "Klasik Yemek Odası", category: "Konut" },
    { id: 6, title: "Kafe Oturma Grubu", category: "Restoran" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-stone-900">Galeri Yönetimi</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-stone-900 text-white font-medium text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors"
        >
          {showForm ? 'Galeriye Dön' : '+ Yeni Görsel Ekle'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 border border-stone-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">Yeni Görsel Ekle</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Görsel Başlığı</label>
                <input type="text" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700" placeholder="Örn: Modern Mutfak Dolabı" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Kategori</label>
                <select className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700">
                  <option>Konut</option>
                  <option>Ofis</option>
                  <option>Otel</option>
                  <option>Restoran</option>
                  <option>Eğitim</option>
                  <option>Üretim (Fabrika)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Görsel Dosyası</label>
              <div className="w-full border-2 border-dashed border-stone-300 bg-stone-50 px-4 py-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-stone-100 transition-colors">
                <svg className="w-10 h-10 text-stone-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-stone-600 font-medium">Görsel seçmek için tıklayın veya sürükleyin</p>
                <p className="text-stone-400 text-xs mt-1">Maks. boyut 5MB (JPG/PNG/WEBP)</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 bg-stone-200 text-stone-700 font-bold uppercase tracking-wider text-sm hover:bg-stone-300 transition-colors">İptal</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 bg-stone-900 text-white font-bold uppercase tracking-wider text-sm hover:bg-amber-800 transition-colors">Görseli Yükle</button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockGallery.map((img) => (
            <div key={img.id} className="bg-white border border-stone-200 group">
              <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden flex items-center justify-center text-stone-400">
                [Görsel]
                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-2 bg-white text-stone-900 rounded hover:bg-amber-500 hover:text-white transition-colors" title="Düzenle">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button className="p-2 bg-white text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors" title="Sil">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-stone-100">
                <h3 className="font-bold text-stone-900 text-sm truncate">{img.title}</h3>
                <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
