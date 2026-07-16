"use client";

import { useState } from 'react';

export default function AdminBlog() {
  const [showForm, setShowForm] = useState(false);

  const mockPosts = [
    { id: 1, title: "2026 Mobilya ve Dekorasyon Trendleri", category: "Trendler", status: "Yayında", views: 1240 },
    { id: 2, title: "Ofis Ergonomisinin Çalışan Verimliliğine Etkisi", category: "Ofis Mobilyaları", status: "Yayında", views: 890 },
    { id: 3, title: "MDF mi, Masif Ahşap mı? Doğru Seçim", category: "Üretim Rehberi", status: "Taslak", views: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-stone-900">Blog Yönetimi</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-stone-900 text-white font-medium text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors"
        >
          {showForm ? 'Listeye Dön' : '+ Yeni Yazı Ekle'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-8 border border-stone-200 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">Yeni Blog Yazısı</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Yazı Başlığı</label>
              <input type="text" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700" placeholder="Yazınızın başlığını girin..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Kategori</label>
                <select className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700">
                  <option>Trendler</option>
                  <option>Ofis Mobilyaları</option>
                  <option>Üretim Rehberi</option>
                  <option>Ticari Projeler</option>
                  <option>Duyurular</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Durum</label>
                <select className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700">
                  <option>Yayında (Hemen Yayınla)</option>
                  <option>Taslak (Sonra Yayınla)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">İçerik (Metin Editörü)</label>
              <div className="w-full border border-stone-200 bg-white">
                {/* Mock Toolbar */}
                <div className="bg-stone-50 border-b border-stone-200 p-2 flex gap-2 text-stone-600">
                  <button type="button" className="p-1 hover:bg-stone-200 rounded font-bold px-2">B</button>
                  <button type="button" className="p-1 hover:bg-stone-200 rounded italic px-2">I</button>
                  <button type="button" className="p-1 hover:bg-stone-200 rounded underline px-2">U</button>
                  <div className="w-px bg-stone-300 mx-1"></div>
                  <button type="button" className="p-1 hover:bg-stone-200 rounded px-2">🔗 Link</button>
                  <button type="button" className="p-1 hover:bg-stone-200 rounded px-2">📷 Görsel</button>
                </div>
                {/* Content Area */}
                <textarea rows={10} className="w-full px-4 py-3 text-stone-900 focus:outline-none" placeholder="Blog yazınızı buraya yazmaya başlayın..."></textarea>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider">Kapak Görseli</label>
              <input type="file" className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200" />
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 bg-stone-200 text-stone-700 font-bold uppercase tracking-wider text-sm hover:bg-stone-300 transition-colors">İptal</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 bg-stone-900 text-white font-bold uppercase tracking-wider text-sm hover:bg-amber-800 transition-colors">Yazıyı Kaydet</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-stone-900 uppercase tracking-wider font-bold border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Başlık</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Görüntülenme</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {mockPosts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{post.title}</td>
                  <td className="px-6 py-4">{post.category}</td>
                  <td className="px-6 py-4">{post.views}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded-sm ${post.status === 'Yayında' ? 'bg-blue-100 text-blue-700' : 'bg-stone-200 text-stone-600'}`}>
                      {post.status}
                    </span>
                  </td>
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
