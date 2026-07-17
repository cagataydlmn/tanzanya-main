"use server";

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Bütün galeri ögelerini getir
export async function getGalleryItems() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: items };
  } catch (error: any) {
    console.error("getGalleryItems error:", error);
    return { success: false, error: error.message || "Galeri ögeleri çekilemedi." };
  }
}

// Yeni galeri ögesi ekle
export async function createGalleryItem(formData: {
  title: string;
  category: string;
  img?: string;
}) {
  try {
    const { title, category, img } = formData;
    const newItem = await prisma.galleryItem.create({
      data: {
        title,
        category,
        img: img || "/dummygorsel/factory_workshop.png", // Varsayılan görsel
      }
    });

    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');
    return { success: true, data: newItem };
  } catch (error: any) {
    console.error("createGalleryItem error:", error);
    return { success: false, error: error.message || "Görsel eklenemedi." };
  }
}

// Galeri ögesini sil
export async function deleteGalleryItem(id: number) {
  try {
    await prisma.galleryItem.delete({
      where: { id }
    });
    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error: any) {
    console.error("deleteGalleryItem error:", error);
    return { success: false, error: error.message || "Görsel silinemedi." };
  }
}
