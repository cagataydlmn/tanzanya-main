"use client";

import { useState, useEffect } from 'react';
import { getGalleryItems, createGalleryItem, deleteGalleryItem } from '@/app/actions/gallery';
import { uploadImageAction } from '@/app/actions/upload';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  img: string;
  createdAt: Date;
}

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Konut');
  const [img, setImg] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchItems = async () => {
    const res = await getGalleryItems();
    if (res.success && res.data) {
      setItems(res.data as GalleryItem[]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddNewClick = () => {
    setTitle('');
    setCategory('Konut');
    setImg('');
    setShowForm(true);
    setMessage(null);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    const res = await uploadImageAction(formData);
    setUploading(false);

    if (res.success && res.url) {
      setImg(res.url);
      setMessage({ type: 'success', text: 'Görsel başarıyla sunucuya yüklendi.' });
    } else {
      setMessage({ type: 'error', text: res.error || 'Görsel yüklenemedi.' });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu görseli silmek istediğinize emin misiniz?")) return;

    setLoading(true);
    const res = await deleteGalleryItem(id);
    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: 'Görsel başarıyla silindi.' });
      fetchItems();
    } else {
      setMessage({ type: 'error', text: res.error || 'Görsel silinemedi.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !img) {
      setMessage({ type: 'error', text: 'Lütfen görsel başlığını girin ve bir görsel yükleyin.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const res = await createGalleryItem({
      title,
      category,
      img
    });

    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: 'Görsel başarıyla galeriye eklendi.' });
      setShowForm(false);
      fetchItems();
    } else {
      setMessage({ type: 'error', text: res.error || 'Görsel eklenirken bir hata oluştu.' });
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
        <h1 className="text-2xl font-serif text-stone-900">Galeri Yönetimi</h1>
        <button 
          onClick={showForm ? () => setShowForm(false) : handleAddNewClick}
          className="px-6 py-2 bg-stone-900 text-white font-medium text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors cursor-pointer"
        >
          {showForm ? 'Galeriye Dön' : '+ Yeni Görsel Ekle'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-8 border border-stone-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">Yeni Görsel Ekle</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Görsel Başlığı *</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700" 
                  placeholder="Örn: Modern Mutfak Dolabı" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Kategori *</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700"
                >
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
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Görsel Seçin / Yükleyin *</label>
              
              {img ? (
                <div className="relative aspect-[4/3] w-full max-w-sm bg-stone-100 border border-stone-200 shadow-sm overflow-hidden group rounded">
                  <Image 
                    src={img} 
                    alt="Yüklenen Görsel Önizleme" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => setImg('')}
                      className="px-6 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded shadow hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Resmi Değiştir / Kaldır
                    </button>
                  </div>
                </div>
              ) : (
                <label 
                  htmlFor="gallery-file-input"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`block w-full border-2 border-dashed px-4 py-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all rounded ${
                    isDragging 
                      ? 'border-amber-700 bg-amber-50/50 scale-[1.01]' 
                      : 'border-stone-300 bg-stone-50 hover:bg-stone-100 hover:border-amber-700'
                  }`}
                >
                  <input 
                    id="gallery-file-input"
                    type="file" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden" 
                  />
                  {uploading ? (
                    <svg className="w-12 h-12 text-amber-700 mb-3 animate-hammer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15 5 4 4" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.5 4.5 19.5 2.5a1 1 0 0 0-1.4 0l-6.5 6.5 4 4 6.5-6.5a1 1 0 0 0 0-1.4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11.5 9.5-8.5 8.5v3h3l8.5-8.5" />
                    </svg>
                  ) : (
                    <svg className={`w-12 h-12 mb-3 transition-transform ${isDragging ? 'text-amber-700 scale-110' : 'text-stone-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  <p className="text-stone-700 font-bold text-sm">
                    {uploading ? 'Görsel Hazırlanıyor... Çekiçler Çalışıyor!' : isDragging ? 'Bırakın ve Yükleyin' : 'Resim Seçmek İçin Tıklayın veya Sürükleyin'}
                  </p>
                  <p className="text-stone-400 text-xs mt-2">Maks. boyut 5MB (JPG, PNG, WEBP, SVG)</p>
                </label>
              )}
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="px-8 py-3 bg-stone-200 text-stone-700 font-bold uppercase tracking-wider text-sm hover:bg-stone-300 transition-colors cursor-pointer"
              >
                İptal
              </button>
              <button 
                type="submit" 
                disabled={loading || uploading || !img}
                className="px-8 py-3 bg-stone-900 text-white font-bold uppercase tracking-wider text-sm hover:bg-amber-800 transition-colors cursor-pointer disabled:bg-stone-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Yükleniyor...' : 'Görseli Kaydet'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-10 bg-white border border-stone-200 text-stone-500">
              Galeride henüz görsel bulunmuyor.
            </div>
          ) : (
            items.map((img) => (
              <div key={img.id} className="bg-white border border-stone-200 group shadow-sm flex flex-col h-full rounded">
                <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden flex items-center justify-center text-stone-400">
                  <Image 
                    src={img.img || "/dummygorsel/factory_workshop.png"} 
                    alt={img.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
                    <button 
                      onClick={() => handleDelete(img.id)} 
                      className="p-3 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors cursor-pointer shadow-md" 
                      title="Sil"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4 border-t border-stone-100 flex-grow">
                  <h3 className="font-bold text-stone-900 text-sm truncate">{img.title}</h3>
                  <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">{img.category}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
