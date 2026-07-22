"use server";

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Bütün projeleri getir
export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: projects };
  } catch (error: any) {
    console.error("getProjects error:", error);
    return { success: false, error: error.message || "Projeler çekilemedi." };
  }
}

// Yeni proje ekle
export async function createProject(formData: {
  name: string;
  category: string;
  description?: string;
  img?: string;
  metaTitle?: string;
  metaDesc?: string;
  metaKeys?: string;
  isFeatured?: boolean;
}) {
  try {
    const { name, category, description, img } = formData;
    const newProject = await prisma.project.create({
      data: {
        name: formData.name,
        category: formData.category,
        description: formData.description || "",
        img: formData.img || "/dummygorsel/factory_workshop.png", // Varsayılan görsel
        metaTitle: formData.metaTitle,
        metaDesc: formData.metaDesc,
        metaKeys: formData.metaKeys,
        isFeatured: formData.isFeatured || false,
      }
    });

    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true, data: newProject };
  } catch (error: any) {
    console.error("createProject error:", error);
    return { success: false, error: error.message || "Proje eklenemedi." };
  }
}

// Proje sil
export async function deleteProject(id: number) {
  try {
    await prisma.project.delete({
      where: { id }
    });
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error("deleteProject error:", error);
    return { success: false, error: error.message || "Proje silinemedi." };
  }
}

// Tek bir projeyi ID ile getir
export async function getProjectById(id: number) {
  try {
    const project = await prisma.project.findUnique({
      where: { id }
    });
    if (!project) {
      return { success: false, error: "Proje bulunamadı." };
    }
    return { success: true, data: project };
  } catch (error: any) {
    console.error("getProjectById error:", error);
    return { success: false, error: error.message || "Proje çekilemedi." };
  }
}

// Proje güncelle
export async function updateProject(
  id: number,
  formData: {
    name?: string;
    category?: string;
    description?: string;
    img?: string;
    metaTitle?: string;
    metaDesc?: string;
    metaKeys?: string;
    isFeatured?: boolean;
  }
) {
  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...(formData.name && { name: formData.name }),
        ...(formData.category && { category: formData.category }),
        ...(formData.description !== undefined && { description: formData.description }),
        ...(formData.img && { img: formData.img }),
        ...(formData.metaTitle !== undefined && { metaTitle: formData.metaTitle }),
        ...(formData.metaDesc !== undefined && { metaDesc: formData.metaDesc }),
        ...(formData.metaKeys !== undefined && { metaKeys: formData.metaKeys }),
        ...(formData.isFeatured !== undefined && { isFeatured: formData.isFeatured }),
      }
    });

    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true, data: updatedProject };
  } catch (error: any) {
    console.error("updateProject error:", error);
    return { success: false, error: error.message || "Proje güncellenemedi." };
  }
}
