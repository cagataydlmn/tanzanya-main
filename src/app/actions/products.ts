"use server";

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Bütün ürün gruplarını getir
export async function getProductGroups() {
  try {
    const groups = await prisma.productGroup.findMany({
      orderBy: { createdAt: 'asc' } // Eklenme sırasına göre gelsin ki sayfa düzeni bozulmasın
    });
    return { success: true, data: groups };
  } catch (error: any) {
    console.error("getProductGroups error:", error);
    return { success: false, error: error.message || "Ürün grupları çekilemedi." };
  }
}

// Yeni ürün grubu ekle
export async function createProductGroup(formData: {
  title: string;
  desc: string;
  items: string;
  img: string;
  metaTitle?: string;
  metaDesc?: string;
  metaKeys?: string;
}) {
  try {
    const { title, desc, items, img } = formData;
    const newGroup = await prisma.productGroup.create({
      data: {
        title: formData.title,
        desc: formData.desc,
        items: formData.items,
        img: formData.img,
        metaTitle: formData.metaTitle,
        metaDesc: formData.metaDesc,
        metaKeys: formData.metaKeys,
      }
    });

    revalidatePath('/products');
    revalidatePath('/admin/products');
    return { success: true, data: newGroup };
  } catch (error: any) {
    console.error("createProductGroup error:", error);
    return { success: false, error: error.message || "Ürün grubu eklenemedi." };
  }
}

// Ürün grubunu güncelle
export async function updateProductGroup(
  id: number,
  formData: {
    title?: string;
    desc?: string;
    items?: string;
    img?: string;
    metaTitle?: string;
    metaDesc?: string;
    metaKeys?: string;
  }
) {
  try {
    const updatedGroup = await prisma.productGroup.update({
      where: { id },
      data: {
        ...(formData.title && { title: formData.title }),
        ...(formData.desc !== undefined && { desc: formData.desc }),
        ...(formData.items !== undefined && { items: formData.items }),
        ...(formData.img && { img: formData.img }),
        ...(formData.metaTitle !== undefined && { metaTitle: formData.metaTitle }),
        ...(formData.metaDesc !== undefined && { metaDesc: formData.metaDesc }),
        ...(formData.metaKeys !== undefined && { metaKeys: formData.metaKeys }),
      }
    });

    revalidatePath('/products');
    revalidatePath('/admin/products');
    return { success: true, data: updatedGroup };
  } catch (error: any) {
    console.error("updateProductGroup error:", error);
    return { success: false, error: error.message || "Ürün grubu güncellenemedi." };
  }
}

// Ürün grubunu sil
export async function deleteProductGroup(id: number) {
  try {
    await prisma.productGroup.delete({
      where: { id }
    });
    revalidatePath('/products');
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    console.error("deleteProductGroup error:", error);
    return { success: false, error: error.message || "Ürün grubu silinemedi." };
  }
}
