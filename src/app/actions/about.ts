"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

const defaultBrochureHighlights = [
  {
    title: "Kişiye Özel Tasarım",
    desc: "Mekanınızın tarzına ve fonksiyon ihtiyacına özel terzi usulü mobilya çözümleri."
  },
  {
    title: "Üstün Dayanıklılık",
    desc: "Birinci sınıf ahşap malzemeler ve uzman el işçiliği ile nesiller boyu kullanım."
  },
  {
    title: "İleri Teknoloji",
    desc: "CNC kesim makineleri ve tozsuz boya kabinleri ile milimetrik sıfır hata."
  },
  {
    title: "Zamanında Teslimat",
    desc: "Planlanan takvimde eksiksiz montaj ve %100 müşteri memnuniyeti garantisi."
  }
];

const defaultPolicies = [
  {
    title: "Birinci Sınıf Malzeme",
    desc: "Üretimde dayanıklılığı ve kaliteyi sağlamak adına daima en iyi hammaddeyi tercih ederiz."
  },
  {
    title: "İnce İşçilik",
    desc: "Tasarım detaylarını gerçeğe dönüştürürken ustalarımızın el emeği ve tecrübesine güveniriz."
  },
  {
    title: "Sıfır Hata Prensibi",
    desc: "Fabrikamızdan çıkan her ürün, titiz bir kalite kontrol sürecinden geçerek onaya sunulur."
  }
];

const defaultAboutData = {
  id: 1,
  metaTitle: "About Us | Star Decor",
  metaDesc: "With over 25 years of experience, modern vision, and our own furniture production facility, we design and bring your living spaces to life. A quality bridge extending from Turkey to Tanzania.",
  metaKeys: "about star decor, furniture manufacturer Tanzania",

  storyImg: "/dummygorsel/factory_workshop.png",
  storyTitle: "Deep-Rooted Experience, Modern Vision",
  storyDesc1: "With years of industry experience, we add value to your living and working spaces. By blending the fine details of traditional furniture craftsmanship with today's modern design approach, we create unique projects.",
  storyDesc2: "In our own production facility, we process materials with mastery to produce high-standard furniture for homes, offices, schools, and commercial spaces. Our goal is to transform our clients' dream spaces into reality on time and without compromise.",

  visionTitle: "Our Vision",
  visionText: "To closely follow industry innovations and become a leading furniture manufacturer known for design and quality not only in Turkey but also internationally, crafting enduring projects.",
  missionTitle: "Our Mission",
  missionText: "To always prioritize customer satisfaction and design aesthetic, functional, and long-lasting spaces. To deliver projects at promised quality through our flawless manufacturing approach.",

  bridgeLabel: "Global Design & Export Bridge",
  bridgeTitle: "Turkish Craftsmanship,<br/>Tanzanian Vision",
  bridgeDesc1: "As Star Decor Furniture & Interior Design, we bring the superior craftsmanship and quality raw material power of our modern production facilities in Turkey to the East African market. By building a strong commercial bridge between the two countries, we add value to distinguished projects in Tanzania.",
  bridgeDesc2: "With luxury and durable furniture produced in our own factory, we represent international quality standards and deliver our projects with direct on-site assembly and installation assurance.",
  bridgeImg: "/dummygorsel/tr-tz-flag.jpg",

  brochureLabel: "Our Corporate Publications",
  brochureTitle: "Star Decor Corporate Brochure",
  brochureDesc: "Explore or download our corporate brochure detailing our production standards, high-quality wood materials used, and manufacturing processes online.",
  brochureUrl: "/broshur.pdf",
  brochureHighlights: JSON.stringify(defaultBrochureHighlights),
  materialsTitle: "High Quality Wood & Panels We Use",
  materials: "MDF & High Gloss, Solid Wood, Plywood, Particle Board, Decorative Panels, Composite Panels, Natural Veneer",

  policyTitle: "Our Production & Quality Policy",
  policies: JSON.stringify(defaultPolicies)
};

export async function getDefaultAboutData() {
  return defaultAboutData;
}


export async function getAboutPage() {
  try {
    let page = await prisma.aboutPage.findFirst();

    if (!page) {
      page = await prisma.aboutPage.create({
        data: defaultAboutData
      });
    }

    return { success: true, data: page };
  } catch (error: any) {
    console.error("Prisma error in getAboutPage:", error);
    return { success: true, data: defaultAboutData };
  }
}

export async function updateAboutPage(id: number, data: any) {
  try {
    const updated = await prisma.aboutPage.update({
      where: { id },
      data
    });

    revalidatePath("/about");
    revalidatePath("/admin/about");

    return { success: true, data: updated };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}

