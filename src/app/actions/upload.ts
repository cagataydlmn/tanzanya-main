"use server";

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: 'Dosya seçilmedi veya yüklenemedi.' };
    }

    // Dosya uzantısı ve türü kontrolü
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Yalnızca görsel dosyaları (JPG, PNG, vb.) veya PDF yükleyebilirsiniz.' };
    }

    const isPdf = file.type === 'application/pdf';
    const maxSize = isPdf ? 15 * 1024 * 1024 : 5 * 1024 * 1024; // PDF'ler için 15MB, görseller için 5MB
    
    // Dosya boyutu kontrolü
    if (file.size > maxSize) {
      return { success: false, error: `Dosya boyutu ${isPdf ? '15MB' : '5MB'}'dan büyük olamaz.` };
    }

    // ArrayBuffer okuma
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Kaydetme dizinini ayarla: public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Klasörün varlığından emin ol, yoksa oluştur
    mkdirSync(uploadDir, { recursive: true });

    // Benzersiz ve güvenli bir dosya adı oluştur
    const ext = file.name.split('.').pop() || '';
    const cleanName = file.name
      .replace(`.${ext}`, '')
      .replace(/[^a-zA-Z0-9]/g, '_');
    const uniqueName = `${Date.now()}_${cleanName}.${ext}`;
    const filePath = join(uploadDir, uniqueName);

    // Diske yaz
    writeFileSync(filePath, buffer);

    // Public üzerinden erişilecek url yolunu dön
    const fileUrl = `/uploads/${uniqueName}`;
    return { success: true, url: fileUrl };
  } catch (error: any) {
    console.error("uploadImageAction error:", error);
    return { success: false, error: error.message || 'Dosya sunucuya yazılırken bir hata oluştu.' };
  }
}
