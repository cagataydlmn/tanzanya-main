"use client";

import { useState, useEffect } from 'react';
import { getProductGroups, createProductGroup, deleteProductGroup, updateProductGroup } from '@/app/actions/products';
import { uploadImageAction } from '@/app/actions/upload';
import Image from 'next/image';
import PageHeaderForm from '@/components/admin/PageHeaderForm';

interface ProductGroup {
  id: number;
  title: string;
  desc: string;
  items: string;
  img: string;
  metaTitle?: string | null;
  metaDesc?: string | null;
  metaKeys?: string | null;
  createdAt: Date;
}

export default function AdminProducts() {
  const [groups, setGroups] = useState<ProductGroup[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form States
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [items, setItems] = useState('');
  const [img, setImg] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metaKeys, setMetaKeys] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchGroups = async () => {
    const res = await getProductGroups();
    if (res.success && res.data) {
      setGroups(res.data as ProductGroup[]);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleAddNewClick = () => {
    setEditingId(null);
    setTitle('');
    setDesc('');
    setItems('');
    setImg('');
    setMetaTitle('');
    setMetaDesc('');
    setMetaKeys('');
    setShowForm(true);
    setMessage(null);
  };

  const handleEditClick = (group: ProductGroup) => {
    setEditingId(group.id);
    setTitle(group.title);
    setDesc(group.desc);
    setItems(group.items);
    setImg(group.img);
    setMetaTitle(group.metaTitle || '');
    setMetaDesc(group.metaDesc || '');
    setMetaKeys(group.metaKeys || '');
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
      setMessage({ type: 'success', text: 'Görsel başarıyla yüklendi.' });
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
    if (!window.confirm("Bu ürün grubunu silmek istediğinize emin misiniz?")) return;
    
    setLoading(true);
    const res = await deleteProductGroup(id);
    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: 'Ürün grubu başarıyla silindi.' });
      fetchGroups();
    } else {
      setMessage({ type: 'error', text: res.error || 'Ürün grubu silinemedi.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !img) {
      setMessage({ type: 'error', text: 'Lütfen grup başlığını girin ve bir görsel yükleyin.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    let res;
    if (editingId) {
      res = await updateProductGroup(editingId, {
        title,
        desc,
        items,
        img,
        metaTitle,
        metaDesc,
        metaKeys
      });
    } else {
      res = await createProductGroup({
        title,
        desc,
        items,
        img,
        metaTitle,
        metaDesc,
        metaKeys
      });
    }

    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: editingId ? 'Ürün grubu güncellendi.' : 'Ürün grubu eklendi.' });
      setShowForm(false);
      setEditingId(null);
      fetchGroups();
    } else {
      setMessage({ type: 'error', text: res.error || 'Bir hata oluştu.' });
    }
  };

  return (
    <div className="space-y-6">
      
      <PageHeaderForm pageIdentifier="products" />

      {/* Alert Message */}
      {message && (
        <div className={`p-4 border text-sm font-medium ${
          message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-stone-900 font-bold">Ürün Grupları Yönetimi</h1>
          <p className="text-xs text-stone-500 mt-1">Sitenizdeki ürün kategorilerini (örn: Ev Mobilyaları) yönetin.</p>
        </div>
        <button 
          onClick={showForm ? () => setShowForm(false) : handleAddNewClick}
          className="px-6 py-2.5 bg-stone-900 text-white font-medium text-xs md:text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors cursor-pointer rounded shrink-0"
        >
          {showForm ? 'Listeye Dön' : '+ Yeni Grup Ekle'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 sm:p-8 border border-stone-200 shadow-sm rounded">
          <h2 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
            {editingId ? 'Grubu Düzenle' : 'Yeni Grup Ekle'}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Grup Başlığı *</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                placeholder="Örn: Ev Mobilyaları" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block flex items-center justify-between">
                  <span>Meta Başlık (SEO)</span>
                  <span className="text-[10px] text-stone-400 normal-case font-normal">İsteğe Bağlı</span>
                </label>
                <input 
                  type="text" 
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                  placeholder="Alt etiket veya detaylı başlık yazın..." 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block flex items-center justify-between">
                  <span>Anahtar Kelimeler (SEO)</span>
                  <span className="text-[10px] text-stone-400 normal-case font-normal">İsteğe Bağlı</span>
                </label>
                <input 
                  type="text" 
                  value={metaKeys}
                  onChange={(e) => setMetaKeys(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                  placeholder="Örn: mutfak dolabı, ahşap yatak" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block flex items-center justify-between">
                <span>Meta Açıklama (SEO)</span>
                <span className="text-[10px] text-stone-400 normal-case font-normal">İsteğe Bağlı</span>
              </label>
              <textarea 
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={2}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                placeholder="Google'da çıkacak özet açıklama..." 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Grup Açıklaması</label>
              <textarea 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                placeholder="Bu ürün grubu hakkında kısa bir açıklama..." 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Ürün Maddeleri (Virgülle Ayırın)</label>
              <textarea 
                value={items}
                onChange={(e) => setItems(e.target.value)}
                rows={3}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                placeholder="Örn: Mutfak Dolapları, Gardıroplar, TV Üniteleri" 
              />
              <p className="text-xs text-stone-500">Maddeleri birbirinden virgül (,) ile ayırarak yazın.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Kapak Görseli Seçin / Yükleyin *</label>
              
              {img ? (
                <div className="relative aspect-[4/3] w-full max-w-md bg-stone-100 border border-stone-200 shadow-sm overflow-hidden group rounded">
                  <Image 
                    src={img} 
                    alt="Yüklenen Görsel Önizleme" 
                    fill 
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 448px"
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
                  htmlFor="group-file-input"
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
                    id="group-file-input"
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
                    {uploading ? 'Görsel Hazırlanıyor... Çekiçler Çalışıyor!' : isDragging ? 'Bırakın ve Yükleyin' : 'Kapak Görseli Seçmek İçin Tıklayın veya Sürükleyin'}
                  </p>
                  <p className="text-stone-400 text-xs mt-2">Maks. boyut 5MB (JPG, PNG, WEBP, SVG)</p>
                  <p className="text-amber-700 font-medium text-xs mt-1">Önerilen Görsel Ölçüsü: 800 x 600px (veya benzeri yatay format)</p>
                </label>
              )}
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="px-8 py-3 bg-stone-200 text-stone-700 font-bold uppercase tracking-wider text-sm hover:bg-stone-300 transition-colors cursor-pointer rounded"
              >
                İptal
              </button>
              <button 
                type="submit" 
                disabled={loading || uploading || !img}
                className="px-8 py-3 bg-stone-900 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-amber-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Kaydediliyor...' : (editingId ? 'Değişiklikleri Kaydet' : 'Grubu Kaydet')}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 shadow-sm overflow-x-auto rounded">
          {groups.length === 0 ? (
            <div className="text-center py-10 text-stone-500">
              Henüz eklenmiş ürün grubu bulunmuyor.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 text-stone-900 uppercase tracking-wider font-bold border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4">Grup Başlığı</th>
                  <th className="px-6 py-4">İçerik Sayısı</th>
                  <th className="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {groups.map((group) => {
                  const itemCount = group.items ? group.items.split(',').length : 0;

                  return (
                    <tr key={group.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-stone-900">{group.title}</td>
                      <td className="px-6 py-4">{itemCount} Madde</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap space-x-3">
                        <button 
                          onClick={() => handleEditClick(group)}
                          className="text-amber-700 hover:text-amber-900 font-medium cursor-pointer"
                        >
                          Düzenle
                        </button>
                        <button 
                          onClick={() => handleDelete(group.id)}
                          className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
