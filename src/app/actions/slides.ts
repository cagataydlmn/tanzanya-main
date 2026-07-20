"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

const defaultSlides = [
  {
    subtitle: "Kurumsal Üretici & İç Mimarlık",
    title: "Geleneksel Ustalık, Modern Tasarım",
    desc: "Ev, ofis, okul ve ticari projeleriniz için kendi tesislerimizde ürettiğimiz; estetiği ve kaliteyi bir araya getiren anahtar teslim ahşap ve mobilya çözümleri.",
    bg: "/dummygorsel/premium_kitchen.png",
    order: 1
  },
  {
    subtitle: "Kendi Fabrikamızdan",
    title: "Sıfır Hata, Yüksek Kalite",
    desc: "5000 m² üretim tesisimizde, son teknoloji makine parkurumuz ve deneyimli ustalarımızla hayallerinizi ahşaba işliyoruz.",
    bg: "/dummygorsel/premium_office.png",
    order: 2
  },
  {
    subtitle: "Anahtar Teslim Projeler",
    title: "Tasarımından Montajına Kadar",
    desc: "Otel, restoran ve ofis projelerinizde iç mimari tasarım, üretim ve saha montajını tek elden kusursuzca yönetiyoruz.",
    bg: "/dummygorsel/factory_workshop.png",
    order: 3
  }
];

export async function getSlides() {
  try {
    let slides = await prisma.slide.findMany({
      orderBy: { order: 'asc' }
    });

    if (slides.length === 0) {
      for (const slide of defaultSlides) {
        await prisma.slide.create({ data: slide });
      }
      slides = await prisma.slide.findMany({
        orderBy: { order: 'asc' }
      });
    }

    return { success: true, data: slides };
  } catch (error: any) {
    console.error("getSlides error:", error);
    return { success: false, error: error.message || "Slaytlar getirilemedi." };
  }
}

export async function createSlide(formData: {
  title: string;
  subtitle: string;
  desc: string;
  bg: string;
  order?: number;
}) {
  try {
    const { title, subtitle, desc, bg, order } = formData;
    const count = await prisma.slide.count();
    
    const newSlide = await prisma.slide.create({
      data: {
        title,
        subtitle,
        desc,
        bg,
        order: order ?? count + 1
      }
    });

    revalidatePath('/');
    revalidatePath('/admin/slides');
    return { success: true, data: newSlide };
  } catch (error: any) {
    console.error("createSlide error:", error);
    return { success: false, error: error.message || "Slayt eklenemedi." };
  }
}

export async function deleteSlide(id: number) {
  try {
    await prisma.slide.delete({
      where: { id }
    });

    revalidatePath('/');
    revalidatePath('/admin/slides');
    return { success: true };
  } catch (error: any) {
    console.error("deleteSlide error:", error);
    return { success: false, error: error.message || "Slayt silinemedi." };
  }
}

export async function updateSlide(id: number, formData: {
  title: string;
  subtitle: string;
  desc: string;
  bg: string;
  order?: number;
}) {
  try {
    const { title, subtitle, desc, bg, order } = formData;
    
    const updatedSlide = await prisma.slide.update({
      where: { id },
      data: {
        title,
        subtitle,
        desc,
        bg,
        ...(order !== undefined && { order })
      }
    });

    revalidatePath('/');
    revalidatePath('/admin/slides');
    return { success: true, data: updatedSlide };
  } catch (error: any) {
    console.error("updateSlide error:", error);
    return { success: false, error: error.message || "Slayt güncellenemedi." };
  }
}
