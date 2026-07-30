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

export async function getAboutPage() {
  try {
    let page = await prisma.aboutPage.findFirst();

    if (!page) {
      page = await prisma.aboutPage.create({
        data: {
          metaTitle: "Hakkımızda",
          metaDesc: "25 yılı aşkın tecrübemiz, modern vizyonumuz ve kendi mobilya üretim tesisimizle yaşam alanlarınızı tasarlıyor ve hayata geçiriyoruz. Türkiye'den Tanzanya'ya uzanan kalite köprüsü.",
          metaKeys: "",

          storyImg: "/dummygorsel/factory_workshop.png",
          storyTitle: "Köklü Tecrübe, Modern Vizyon",
          storyDesc1: "Sektördeki uzun yıllara dayanan deneyimimizle, yaşam ve çalışma alanlarınıza değer katıyoruz. Geleneksel mobilya işçiliğinin ince detaylarını, günümüz modern tasarım anlayışıyla harmanlayarak eşsiz projelere imza atıyoruz.",
          storyDesc2: "Kendi bünyemizdeki üretim tesisimizde, malzemeyi ustalıkla işleyerek ev, ofis, okul ve ticari mekanlar için yüksek standartlarda mobilyalar üretiyoruz. Amacımız, müşterilerimizin hayallerindeki mekanları tam zamanında ve eksiksiz bir şekilde gerçeğe dönüştürmektir.",

          visionText: "Sektörel yenilikleri yakından takip ederek, sadece Türkiye'de değil uluslararası alanda da tasarım ve kalite denilince ilk akla gelen, kalıcı projelere imza atan lider mobilya üreticisi olmak.",
          missionText: "Müşteri memnuniyetini her zaman ön planda tutarak; estetik, fonksiyonel ve uzun ömürlü mekanlar tasarlamak. Kusursuz üretim anlayışımızla projeleri söz verdiğimiz kalitede teslim etmek.",

          bridgeLabel: "Küresel Tasarım & İhracat Köprüsü",
          bridgeTitle: "Türkiye'nin İşçiliği,<br/>Tanzanya'nın Vizyonu",
          bridgeDesc1: "Tanzanya Mobilya & Dekorasyon olarak, Türkiye'deki modern üretim tesislerimizin üstün el işçiliğini ve kaliteli hammadde gücünü Doğu Afrika pazarıyla buluşturuyoruz. İki ülke arasında güçlü bir ticari köprü kurarak, Tanzanya'daki seçkin projelere değer katıyoruz.",
          bridgeDesc2: "Kendi fabrikamızda ürettiğimiz lüks ve dayanıklı mobilyalarla uluslararası kalite standartlarını temsil ediyor, projelerimizi doğrudan yerinde montaj ve kurulum güvencesiyle teslim ediyoruz.",
          bridgeImg: "/dummygorsel/tr-tz-flag.jpg",

          brochureLabel: "Kurumsal Yayınlarımız",
          brochureTitle: "Star Decor Kurumsal Broşürümüz",
          brochureDesc: "Üretim standartlarımızı, kullandığımız yüksek kaliteli ahşap malzemeleri ve imalat süreçlerimizi detaylandıran kurumsal broşürümüzü online inceleyin veya indirin.",
          brochureUrl: "/broshur.pdf",
          brochureHighlights: JSON.stringify(defaultBrochureHighlights),
          materials: "MDF & High Gloss, Masif Ahşap, Kontrplak (Plywood), Sunta & Yonga Levha, Dekoratif Paneller, Kompozit Paneller, Doğal Kaplama",

          policyTitle: "Üretim ve Kalite Politikamız",
          policies: JSON.stringify(defaultPolicies)
        }
      });
    }

    return { success: true, data: page };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
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
