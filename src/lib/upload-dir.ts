import { join } from 'path';

/**
 * Yüklenen dosyaların klasörü.
 * UPLOAD_DIR tanımlıysa (kalıcı, build dışı bir klasör) orası kullanılır;
 * böylece yeni deploy'larda yüklenen görseller kaybolmaz.
 * Tanımlı değilse eski davranış: <cwd>/public/uploads
 */
export function getUploadDir(): string {
  return process.env.UPLOAD_DIR || join(process.cwd(), 'public', 'uploads');
}
