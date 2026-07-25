"use server";

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// İletişim ayarlarını getir (Yoksa varsayılan değerlerle oluşturur)
export async function getContactSettings() {
  try {
    let settings = await prisma.contactSettings.findFirst();

    if (!settings) {
      settings = await prisma.contactSettings.create({
        data: {
          address: "Mikocheni B, Rose Garden Road, Uzima Street, Kinondoni District, Dar es Salaam, Tanzania",
          phone1: "0 651 137 287",
          phone2: "0 651 137 287 (WhatsApp)",
          email: "stardecortz@gmail.com",
          socialLinks: [
            { platform: "Facebook", url: "https://facebook.com" },
            { platform: "Instagram", url: "https://instagram.com" }
          ],
          mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.062996987857!2d39.2519711!3d-6.7621734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4d7b36781765%3A0x212569b7181875a7!2sersanfurnitureTZ!5e0!3m2!1str!2str!4v1784646295368!5m2!1str!2str"
        }
      });
    }

    return { success: true, data: settings };
  } catch (error) {
    console.error("getContactSettings error:", error);
    return { success: false, error: "İletişim bilgileri alınamadı." };
  }
}

// İletişim ayarlarını güncelle
export async function updateContactSettings(formData: {
  address: string;
  phone1: string;
  phone2?: string;
  email: string;
  socialLinks: any;
  mapIframe: string;
}) {
  try {
    const settings = await prisma.contactSettings.findFirst();

    if (settings) {
      await prisma.contactSettings.update({
        where: { id: settings.id },
        data: {
          address: formData.address,
          phone1: formData.phone1,
          phone2: formData.phone2,
          email: formData.email,
          socialLinks: formData.socialLinks,
          mapIframe: formData.mapIframe
        }
      });
    } else {
      await prisma.contactSettings.create({
        data: {
          address: formData.address,
          phone1: formData.phone1,
          phone2: formData.phone2,
          email: formData.email,
          socialLinks: formData.socialLinks,
          mapIframe: formData.mapIframe
        }
      });
    }

    // Cache'i temizle
    revalidatePath('/', 'layout');
    revalidatePath('/contact');

    return { success: true };
  } catch (error) {
    console.error("updateContactSettings error:", error);
    return { success: false, error: "İletişim bilgileri güncellenirken hata oluştu." };
  }
}
