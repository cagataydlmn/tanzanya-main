"use client";

import { useState, useEffect } from 'react';
import { getContactSettings, updateContactSettings } from '@/app/actions/contact';

import PageHeaderForm from '@/components/admin/PageHeaderForm';

export default function ContactSettingsAdmin() {
  const [formData, setFormData] = useState({
    address: '',
    phone1: '',
    phone2: '',
    email: '',
    mapIframe: '',
  });

  const [socialLinks, setSocialLinks] = useState<{ platform: string, url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await getContactSettings();
    if (res.success && res.data) {
      setFormData({
        address: res.data.address || '',
        phone1: res.data.phone1 || '',
        phone2: res.data.phone2 || '',
        email: res.data.email || '',
        mapIframe: res.data.mapIframe || '',
      });
      
      let parsedLinks = [];
      try {
        parsedLinks = typeof res.data.socialLinks === 'string' 
          ? JSON.parse(res.data.socialLinks) 
          : res.data.socialLinks;
      } catch (e) {
        console.error(e);
      }
      setSocialLinks(Array.isArray(parsedLinks) ? parsedLinks : []);
    }
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: 'Yeni Platform', url: 'https://' }]);
  };

  const removeSocialLink = (index: number) => {
    const newLinks = [...socialLinks];
    newLinks.splice(index, 1);
    setSocialLinks(newLinks);
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index][field] = value;
    setSocialLinks(newLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    const res = await updateContactSettings({
      ...formData,
      socialLinks: socialLinks
    });

    if (res.success) {
      setMessage({ text: 'Ayarlar başarıyla kaydedildi.', type: 'success' });
    } else {
      setMessage({ text: res.error || 'Bir hata oluştu.', type: 'error' });
    }
    setIsSaving(false);
  };

  if (isLoading) return <div className="p-8 text-center text-stone-500">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <PageHeaderForm pageIdentifier="contact" />
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
      <div className="p-6 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
        <h2 className="text-lg font-bold text-stone-800">İletişim & Sosyal Medya Ayarları</h2>
      </div>

      <div className="p-6">
        {message.text && (
          <div className={`mb-6 p-4 rounded text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">E-Posta Adresi</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded focus:outline-none focus:border-amber-700 transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Ana Telefon</label>
              <input
                type="text"
                name="phone1"
                value={formData.phone1}
                onChange={handleInputChange}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded focus:outline-none focus:border-amber-700 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Alternatif Telefon / WhatsApp</label>
              <input
                type="text"
                name="phone2"
                value={formData.phone2}
                onChange={handleInputChange}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded focus:outline-none focus:border-amber-700 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Adres</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded focus:outline-none focus:border-amber-700 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Google Haritalar Iframe Linki (src)</label>
            <p className="text-xs text-stone-400 mb-2">Google Maps'ten aldığınız "Haritayı Yerleştir" kodunun sadece src=" " içindeki adresini yapıştırın.</p>
            <textarea
              name="mapIframe"
              value={formData.mapIframe}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded focus:outline-none focus:border-amber-700 transition-colors"
              required
            />
          </div>

          {/* Dinamik Sosyal Medya */}
          <div className="pt-6 border-t border-stone-200">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-bold text-stone-800 uppercase tracking-wider block">Sosyal Medya Hesapları</label>
              <button
                type="button"
                onClick={addSocialLink}
                className="px-3 py-1 bg-stone-200 text-stone-700 text-xs font-bold rounded hover:bg-stone-300 transition-colors"
              >
                + Yeni Ekle
              </button>
            </div>

            {socialLinks.length === 0 ? (
              <div className="text-sm text-stone-500 italic p-4 bg-stone-50 rounded text-center border border-dashed border-stone-300">
                Hiç sosyal medya hesabı eklenmemiş.
              </div>
            ) : (
              <div className="space-y-3">
                {socialLinks.map((link, index) => {
                  const SOCIAL_PLATFORMS = [
                    "Facebook",
                    "Instagram",
                    "Twitter / X",
                    "LinkedIn",
                    "YouTube",
                    "TikTok",
                    "WhatsApp",
                    "Pinterest",
                    "Diğer"
                  ];
                  
                  // Mevcut platform listede yoksa, geçici olarak ekle
                  const isCustom = !SOCIAL_PLATFORMS.includes(link.platform) && link.platform !== 'Yeni Platform';
                  const options = isCustom ? [...SOCIAL_PLATFORMS.slice(0, -1), link.platform, "Diğer"] : SOCIAL_PLATFORMS;

                  return (
                    <div key={index} className="flex gap-3 items-center bg-stone-50 p-3 rounded border border-stone-200">
                      <select
                        value={link.platform === 'Yeni Platform' ? "Diğer" : link.platform}
                        onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                        className="w-1/3 bg-white border border-stone-200 px-3 py-2 text-sm rounded focus:outline-none focus:border-amber-700 transition-colors"
                      >
                        {options.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="URL (https://...)"
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                        className="w-full bg-white border border-stone-200 px-3 py-2 text-sm rounded focus:outline-none focus:border-amber-700 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                        title="Sil"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-stone-200 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-stone-900 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-amber-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

