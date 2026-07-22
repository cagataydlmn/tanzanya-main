"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- Production Info Actions ---

export async function getProductionInfo() {
  try {
    let info = await prisma.productionInfo.findFirst();
    
    if (!info) {
      info = await prisma.productionInfo.create({
        data: {
          title: "Üretim",
          desc: "Tasarımdan teslimata kadar tüm süreçlerin fabrikamızda yürütüldüğü, kalite standartlarından ödün vermeyen entegre üretim hattımız.",
          img: "/dummygorsel/factory_workshop.png"
        }
      });
    }

    return { success: true, data: info };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function upsertProductionInfo(data: {
  title: string;
  desc: string;
  img: string;
  metaTitle?: string;
  metaDesc?: string;
  metaKeys?: string;
}) {
  try {
    const existing = await prisma.productionInfo.findFirst();
    let result;

    if (existing) {
      result = await prisma.productionInfo.update({
        where: { id: existing.id },
        data
      });
    } else {
      result = await prisma.productionInfo.create({
        data
      });
    }

    revalidatePath("/production");
    revalidatePath("/admin/production");
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- Production Steps Actions ---

const defaultProductionSteps = [
  {
    order: 1,
    title: "Tasarım ve Projelendirme",
    desc: "İhtiyaç analizi sonrasında iç mimarlarımız tarafından ölçülendirme yapılır ve 3D çizim programları ile mobilyanın son hali projelendirilir."
  },
  {
    order: 2,
    title: "Malzeme Seçimi",
    desc: "Projeye en uygun birinci sınıf ahşap, MDF, kaplama veya metal aksamlar titizlikle seçilir ve üretime hazırlanır."
  },
  {
    order: 3,
    title: "Ahşap ve Metal İşleme (CNC)",
    desc: "Son teknoloji CNC kesim makinalarımızda milimetrik hassasiyetle kesilen paneller, ebatlama ve bantlama işlemine tabi tutulur."
  },
  {
    order: 4,
    title: "Boya ve Cila Hanesi",
    desc: "Tozsuz boya kabinlerimizde mobilyalar, istenilen renkte lake boya veya doğal ahşap cila ile pürüzsüz bir yüzeye kavuşturulur."
  },
  {
    order: 5,
    title: "Döşeme ve Kumaş Uygulaması",
    desc: "Koltuk ve panolar için ustalarımız tarafından en kaliteli kumaşlar özenle kesilir, süngerlenir ve el işçiliğiyle döşenir."
  },
  {
    order: 6,
    title: "Kalite Kontrol ve Paketleme",
    desc: "Üretimi tamamlanan her ürün kalite onayından geçer. Nakliye veya montaj sırasında hasar görmemesi için uluslararası standartlarda paketlenir."
  }
];


export async function getProductionSteps() {
  try {
    let steps = await prisma.productionStep.findMany({
      orderBy: {
        order: 'asc'
      }
    });

    if (steps.length === 0) {
      for (const step of defaultProductionSteps) {
        await prisma.productionStep.create({ data: step });
      }
      steps = await prisma.productionStep.findMany({
        orderBy: { order: 'asc' }
      });
    }

    return { success: true, data: steps };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createProductionStep(data: {
  title: string;
  desc: string;
  order: number;
}) {
  try {
    const step = await prisma.productionStep.create({
      data
    });
    revalidatePath("/production");
    revalidatePath("/admin/production");
    return { success: true, data: step };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProductionStep(id: number, data: {
  title: string;
  desc: string;
  order: number;
}) {
  try {
    const step = await prisma.productionStep.update({
      where: { id },
      data
    });
    revalidatePath("/production");
    revalidatePath("/admin/production");
    return { success: true, data: step };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProductionStep(id: number) {
  try {
    await prisma.productionStep.delete({
      where: { id }
    });
    revalidatePath("/production");
    revalidatePath("/admin/production");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
