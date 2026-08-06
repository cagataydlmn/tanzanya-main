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
          phones: [
            { label: "Main Phone", value: "0 651 137 287" },
            { label: "WhatsApp", value: "0 651 137 287 (WhatsApp)" }
          ],
          emails: [
            { label: "General Inquiry", value: "stardecortz@gmail.com" }
          ],
          socialLinks: [
            { platform: "Facebook", url: "https://facebook.com" },
            { platform: "Instagram", url: "https://instagram.com" }
          ],
          mapIframe: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3962.077108117358!2d39.252118!3d-6.7604522!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4d8a2a606a3d%3A0xa9ce81db02869dac!2sStarDecor%20Furniture%20and%20Interior%20Design!5e0!3m2!1str!2str!4v1785182002797!5m2!1str!2str",
          logo: "/logo/StarDecorLogo_page-0002.png",
          logoFooter: "/logo/StarDecorLogo_page-0003.png"
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
  phones?: any;
  emails?: any;
  socialLinks: any;
  mapIframe: string;
  logo?: string;
  logoFooter?: string;
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
          phones: formData.phones,
          emails: formData.emails,
          socialLinks: formData.socialLinks,
          mapIframe: formData.mapIframe,
          logo: formData.logo,
          logoFooter: formData.logoFooter,
        }
      });
    } else {
      await prisma.contactSettings.create({
        data: {
          address: formData.address,
          phone1: formData.phone1,
          phone2: formData.phone2,
          email: formData.email,
          phones: formData.phones,
          emails: formData.emails,
          socialLinks: formData.socialLinks,
          mapIframe: formData.mapIframe,
          logo: formData.logo,
          logoFooter: formData.logoFooter,
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
