"use client";

import { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject, updateProject } from '@/app/actions/projects';
import { getCategories, createCategory } from '@/app/actions/categories';
import { uploadImageAction } from '@/app/actions/upload';
import Image from 'next/image';

interface Project {
  id: number;
  name: string;
  category: string;
  description: string | null;
  img: string;
  metaTitle?: string | null;
  metaDesc?: string | null;
  metaKeys?: string | null;
  isFeatured?: boolean;
  createdAt: Date;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form States
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Konut');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metaKeys, setMetaKeys] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchProjects = async () => {
    const [res, catRes] = await Promise.all([
      getProjects(),
      getCategories()
    ]);
    if (res.success && res.data) {
      setProjects(res.data as Project[]);
    }
    if (catRes.success && catRes.data) {
      setAvailableCategories((catRes.data as any[]).map(c => c.name));
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddNewClick = () => {
    setEditingId(null);
    setName('');
    setCategory('Konut');
    setDescription('');
    setImg('');
    setMetaTitle('');
    setMetaDesc('');
    setMetaKeys('');
    setIsFeatured(false);
    setIsNewCategory(false);
    setNewCategoryName('');
    setShowForm(true);
    setMessage(null);
  };

  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setName(project.name);
    setCategory(project.category);
    setDescription(project.description || '');
    setImg(project.img);
    setMetaTitle(project.metaTitle || '');
    setMetaDesc(project.metaDesc || '');
    setMetaKeys(project.metaKeys || '');
    setIsFeatured(project.isFeatured || false);
    setIsNewCategory(false);
    setNewCategoryName('');
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
      setMessage({ type: 'success', text: 'Kapak görseli başarıyla yüklendi.' });
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
    if (!window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;
    
    setLoading(true);
    const res = await deleteProject(id);
    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: 'Proje başarıyla silindi.' });
      fetchProjects();
    } else {
      setMessage({ type: 'error', text: res.error || 'Proje silinemedi.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !img) {
      setMessage({ type: 'error', text: 'Lütfen proje adını girin ve bir kapak görseli yükleyin.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    let finalCategory = category;
    if (isNewCategory && newCategoryName.trim() !== '') {
      finalCategory = newCategoryName.trim();
      await createCategory(finalCategory); // Arka planda DB'ye kategori olarak da kaydet
    }

    const data = {
      name, category: finalCategory, description, img, metaTitle, metaDesc, metaKeys, isFeatured
    };

    let res;
    if (editingId) {
      res = await updateProject(editingId, data);
    } else {
      res = await createProject(data);
    }

    setLoading(false);

    if (res.success) {
      setMessage({ type: 'success', text: editingId ? 'Proje başarıyla güncellendi.' : 'Proje başarıyla eklendi.' });
      setShowForm(false);
      setEditingId(null);
      fetchProjects();
    } else {
      setMessage({ type: 'error', text: res.error || (editingId ? 'Proje güncellenirken bir hata oluştu.' : 'Proje eklenirken bir hata oluştu.') });
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-stone-900 font-bold">Projeler Yönetimi</h1>
          <p className="text-xs text-stone-500 mt-1">Sitenizdeki projeleri ekleyin ve yönetin.</p>
        </div>
        <button 
          onClick={showForm ? () => setShowForm(false) : handleAddNewClick}
          className="px-6 py-2.5 bg-stone-900 text-white font-medium text-xs md:text-sm uppercase tracking-wider hover:bg-amber-800 transition-colors cursor-pointer rounded shrink-0"
        >
          {showForm ? 'Listeye Dön' : '+ Yeni Proje Ekle'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 sm:p-8 border border-stone-200 shadow-sm rounded">
          <h2 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
            {editingId ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Proje Adı *</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                  placeholder="Örn: Vadi İstanbul Konutları" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Kategori *</label>
                {isNewCategory ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded"
                      placeholder="Yeni kategori adı..."
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewCategory(false);
                        setNewCategoryName('');
                      }}
                      className="px-4 py-3 bg-stone-200 text-stone-700 font-bold uppercase tracking-wider text-xs hover:bg-stone-300 transition-colors rounded whitespace-nowrap"
                    >
                      İptal
                    </button>
                  </div>
                ) : (
                  <select 
                    value={category}
                    onChange={(e) => {
                      if (e.target.value === 'YENI_EKLE') {
                        setIsNewCategory(true);
                      } else {
                        setCategory(e.target.value);
                      }
                    }}
                    className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded"
                  >
                    {availableCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="YENI_EKLE" className="font-bold text-amber-700">+ Yeni Kategori Ekle...</option>
                  </select>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 bg-stone-50 border border-stone-200 rounded">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-amber-800 border-stone-300 rounded focus:ring-amber-700"
              />
              <label htmlFor="isFeatured" className="text-sm font-bold text-stone-900 uppercase tracking-wider cursor-pointer">
                Öne Çıkan Proje mi?
              </label>
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
                  placeholder="Örn: ahşap ev, modern tasarım" 
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

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Proje Açıklaması</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 rounded" 
                placeholder="Proje detaylarını, kullanılan malzemeleri ve özellikleri yazın..." 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Kapak Görseli Seçin / Yükleyin *</label>
              
              {img ? (
                <div className="relative aspect-[16/9] w-full max-w-md bg-stone-100 border border-stone-200 shadow-sm overflow-hidden group rounded">
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
                  htmlFor="project-file-input"
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
                    id="project-file-input"
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
                className="px-8 py-3 bg-stone-900 text-white font-bold uppercase tracking-wider text-sm hover:bg-amber-800 transition-colors cursor-pointer disabled:bg-stone-400 disabled:cursor-not-allowed rounded"
              >
                {loading ? 'Kaydediliyor...' : (editingId ? 'Değişiklikleri Kaydet' : 'Projeyi Kaydet')}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 shadow-sm overflow-x-auto rounded">
          {projects.length === 0 ? (
            <div className="text-center py-10 text-stone-500">
              Henüz eklenmiş proje bulunmuyor.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 text-stone-900 uppercase tracking-wider font-bold border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4">Proje Adı</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Tarih</th>
                  <th className="px-6 py-4">Durum</th>
                  <th className="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {projects.map((project) => {
                  const formattedDate = new Date(project.createdAt).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <tr key={project.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-stone-900">{project.name}</td>
                      <td className="px-6 py-4">{project.category}</td>
                      <td className="px-6 py-4">{formattedDate}</td>
                      <td className="px-6 py-4">
                        {project.isFeatured && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded font-bold uppercase">Öne Çıkan</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap space-x-3">
                        <button 
                          onClick={() => handleEditClick(project)}
                          className="text-amber-700 hover:text-amber-900 font-medium cursor-pointer"
                        >
                          Düzenle
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
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
