"use server";

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

const defaultWhyUsItems = [
  { title: "Kendi Üretim Tesisimiz", desc: "Yüksek kapasiteli fabrikamız sayesinde aracı olmadan, doğrudan üreticiden kalite garantisi sağlıyoruz." },
  { title: "Sektörel Tecrübe", desc: "Kurumsal ve bireysel projelerde edindiğimiz yılların tecrübesiyle hatasız süreç yönetimi uyguluyoruz." },
  { title: "Zamanında Teslimat", desc: "Söz verdiğimiz tarihte, taahhüt ettiğimiz kalitede eksiksiz ve kusursuz kurulum yapıyoruz." }
];

export async function getHomePage() {
  try {
    let homePage = await prisma.homePage.findFirst();

    if (!homePage) {
      homePage = await prisma.homePage.create({
        data: {
          metaTitle: "Tanzanya Mobilya & Dekorasyon",
          metaDesc: "Tanzanya'nın önde gelen lüks mobilya ve ahşap üretim markası.",
          metaKeys: "mobilya, dekorasyon, tanzanya, ahşap",
          servicesTitle: "Öne Çıkan Hizmetlerimiz",
          whyUsTitle: "Neden Bizi Seçmelisiniz?",
          whyUsItems: JSON.stringify(defaultWhyUsItems),
          whyUsImg: "/dummygorsel/factory_workshop.png",
          projectsTitle: "Öne Çıkan Projelerimiz",
          projectsDesc: "Sizin için tasarlayıp hayata geçirdiğimiz nitelikli anahtar teslim ahşap uygulamalarımız.",
          ctaTitle: "Hayalinizdeki Mekanı <br/>Birlikte Tasarlayalım",
          ctaDesc: "Eviniz, ofisiniz veya ticari alanınız için kaliteli, estetik ve size özel mobilya çözümleri arıyorsanız; fabrikamız ve iç mimar ekibimizle hizmetinizdeyiz.",
          ctaBtn1Text: "Hemen Teklif Al",
          ctaBtn1Link: "/quote",
          ctaBtn2Text: "Bize Ulaşın",
          ctaBtn2Link: "/contact",
        }
      });
    }

    return { success: true, data: homePage };
  } catch (error: any) {
    console.error("getHomePage error:", error);
    return { success: false, error: error.message || "Ana Sayfa verileri çekilemedi." };
  }
}

export async function updateHomePage(
  id: number,
  formData: {
    metaTitle?: string;
    metaDesc?: string;
    metaKeys?: string;
    servicesTitle?: string;
    whyUsTitle?: string;
    whyUsItems?: string;
    whyUsImg?: string;
    projectsTitle?: string;
    projectsDesc?: string;
    ctaTitle?: string;
    ctaDesc?: string;
    ctaBtn1Text?: string;
    ctaBtn1Link?: string;
    ctaBtn2Text?: string;
    ctaBtn2Link?: string;
  }
) {
  try {
    const updated = await prisma.homePage.update({
      where: { id },
      data: formData
    });

    revalidatePath('/');
    revalidatePath('/admin/home');
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("updateHomePage error:", error);
    return { success: false, error: error.message || "Ana Sayfa güncellenemedi." };
  }
}
