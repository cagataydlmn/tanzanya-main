"use server";

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

function normalizeProject(p: any) {
  if (!p) return null;
  let images: string[] = [];
  if (Array.isArray(p.images)) {
    images = p.images.filter((item: any) => typeof item === 'string' && item.trim() !== '');
  } else if (typeof p.images === 'string') {
    try {
      const parsed = JSON.parse(p.images);
      if (Array.isArray(parsed)) {
        images = parsed.filter((item: any) => typeof item === 'string' && item.trim() !== '');
      }
    } catch {
      if (p.images.trim()) images = [p.images];
    }
  }

  if (images.length === 0 && p.img) {
    images = [p.img];
  }

  return {
    ...p,
    images,
  };
}

// Bütün projeleri getir
export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: projects.map(normalizeProject) };
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
  images?: string[];
  metaTitle?: string;
  metaDesc?: string;
  metaKeys?: string;
  isFeatured?: boolean;
}) {
  try {
    const images = formData.images && formData.images.length > 0 
      ? formData.images 
      : (formData.img ? [formData.img] : []);
    const coverImg = formData.img || images[0] || "/dummygorsel/factory_workshop.png";

    const newProject = await prisma.project.create({
      data: {
        name: formData.name,
        category: formData.category,
        description: formData.description || "",
        img: coverImg,
        images: images,
        metaTitle: formData.metaTitle,
        metaDesc: formData.metaDesc,
        metaKeys: formData.metaKeys,
        isFeatured: formData.isFeatured || false,
      }
    });

    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true, data: normalizeProject(newProject) };
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
    return { success: true, data: normalizeProject(project) };
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
    images?: string[];
    metaTitle?: string;
    metaDesc?: string;
    metaKeys?: string;
    isFeatured?: boolean;
  }
) {
  try {
    let images = formData.images;
    let coverImg = formData.img;

    if (images !== undefined) {
      if (images.length > 0 && !coverImg) {
        coverImg = images[0];
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...(formData.name && { name: formData.name }),
        ...(formData.category && { category: formData.category }),
        ...(formData.description !== undefined && { description: formData.description }),
        ...(coverImg && { img: coverImg }),
        ...(images !== undefined && { images: images }),
        ...(formData.metaTitle !== undefined && { metaTitle: formData.metaTitle }),
        ...(formData.metaDesc !== undefined && { metaDesc: formData.metaDesc }),
        ...(formData.metaKeys !== undefined && { metaKeys: formData.metaKeys }),
        ...(formData.isFeatured !== undefined && { isFeatured: formData.isFeatured }),
      }
    });

    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true, data: normalizeProject(updatedProject) };
  } catch (error: any) {
    console.error("updateProject error:", error);
    return { success: false, error: error.message || "Proje güncellenemedi." };
  }
}

