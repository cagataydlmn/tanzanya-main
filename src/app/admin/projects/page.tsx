"use client";

import { useState } from 'react';

export default function AdminProjects() {
  const [showForm, setShowForm] = useState(false);

  const mockProjects = [
    { id: 1, name: "Zorlu Center Özel Tasarım Villa", category: "Konut", status: "Aktif", date: "2026-10-12" },
    { id: 2, name: "Hilton Otel Odaları Restorasyonu", category: "Otel", status: "Aktif", date: "2026-09-28" },
    { id: 3, name: "Garanti BBVA Genel Müdürlük", category: "Ofis", status: "Taslak", date: "2026-09-15" },
    { id: 4, name: "Midpoint Restoran İç Mekan", category: "Restoran", status: "Aktif", date: "2026-08-02" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-stone-900">Projeler Yönetimi</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-stone-900 text-white font-medium text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors"
        >
          {showForm ? 'Listeye Dön' : '+ Yeni Proje Ekle'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-8 border border-stone-200 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">Yeni Proje Ekle</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Proje Adı</label>
                <input type="text" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700" placeholder="Örn: Vadi İstanbul Konutları" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Kategori</label>
                <select className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700">
                  <option>Konut</option>
                  <option>Otel</option>
                  <option>Ofis</option>
                  <option>Restoran</option>
                  <option>Eğitim</option>
                  <option>Sağlık</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Proje Açıklaması</label>
              <textarea rows={5} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700" placeholder="Proje detaylarını yazın..."></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Kapak Görseli</label>
              <div className="w-full border-2 border-dashed border-stone-300 bg-stone-50 px-4 py-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-stone-100 transition-colors">
                <p className="text-stone-600 font-medium">Görsel seçmek için tıklayın veya sürükleyin</p>
                <p className="text-stone-400 text-xs mt-1">Önerilen boyut: 1920x1080px (JPG/PNG)</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 bg-stone-200 text-stone-700 font-bold uppercase tracking-wider text-sm hover:bg-stone-300 transition-colors">İptal</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 bg-stone-900 text-white font-bold uppercase tracking-wider text-sm hover:bg-amber-800 transition-colors">Projeyi Kaydet</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-stone-900 uppercase tracking-wider font-bold border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Proje Adı</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4">Tarih</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {mockProjects.map((project) => (
                <tr key={project.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{project.name}</td>
                  <td className="px-6 py-4">{project.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded-sm ${project.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-600'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{project.date}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-amber-700 hover:text-amber-900 font-medium">Düzenle</button>
                    <button className="text-red-600 hover:text-red-800 font-medium">Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
