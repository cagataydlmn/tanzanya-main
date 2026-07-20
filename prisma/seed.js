const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Hostinger veritabanı tohumlama işlemi başladı...");

  // 1. Hero Slides
  const slideCount = await prisma.slide.count();
  if (slideCount === 0) {
    console.log("📸 Slaytlar ekleniyor...");
    await prisma.slide.createMany({
      data: [
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
      ]
    });
  }

  // 2. Blog Yazıları
  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    console.log("📝 Blog yazıları ekleniyor...");
    await prisma.blogPost.createMany({
      data: [
        {
          title: "2026 İç Mimari Trendleri: Masif Ahşap ve Doğal Dokular",
          slug: "2026-ic-mimari-trendleri-masif-ahsap-ve-dogal-dokular",
          category: "Trendler",
          excerpt: "Geleceğin mekan tasarımlarında sürdürülebilir ahşap kullanımı, organik hatlar ve doğal renk paletleri öne çıkıyor.",
          content: `İç mimaride doğal malzemelerin sıcaklığı ve samimiyeti her zaman zamansız olmuştur. 2026 yılında ise masif ahşap ve özel kaplama detayları, mekanlara estetik katmanın ötesinde bir yaşam biçimi sunuyor.

Tanzanya Mobilya olarak 5000 m² imalat tesisimizde, sürdürülebilir orman kaynaklarından elde edilen 1. sınıf ahşapları titizlikle işliyoruz. İç mimarlarımızın hazırladığı 3D konsept projelerde masif meşe, ceviz ve fümeli kaplamalar ön plana çıkıyor.

Ahşabın Metal ve Cam İle Uymu:
Modern konut ve ticari alanlarda ahşap dokular, füme camlar ve mat siyah metal detaylarla harmanlanarak endüstriyel lüks bir atmosfer oluşturuyor. Mutfak adalarında masif ahşap tezgahlar, salonda akustik ahşap çıta duvar panelleri 2026'nın en çok tercih edilen uygulamaları arasında.`,
          image: "/dummygorsel/premium_kitchen.png",
          status: "Yayında",
          views: 142
        },
        {
          title: "Kurumsal Ofis Mobilyalarında Ergonomi ve Verimlilik",
          slug: "kurumsal-ofis-mobilyalarinda-ergonomi-ve-verimlilik",
          category: "Ofis Mobilyaları",
          excerpt: "Çalışma alanlarında doğru mobilya seçimi, çalışan memnuniyetini ve odaklanmayı doğrudan etkiliyor.",
          content: `Modern çalışma hayatında ofislerin tasarımı, şirket kültürünün ve üretkenliğin en temel yansımasıdır. Çalışanların günün büyük bölümünü geçirdiği masa ve toplantı ünitelerinin ergonomik olması büyük önem taşır.

Özel Ölçü Masa ve Depolama Sistemleri:
Standart hazır mobilyalar yerine, ofisin mimari yapısına özel milimetrik üretilen toplantı masaları, akustik seperatörler ve yönetici masaları mekan verimliliğini %40 artırmaktadır.

Tanzanya Mobilya güvencesiyle üretilen kurumsal mobilyalarda sessiz ray sistemleri, gizli kablo kanalları ve dayanıklı lake yüzeyler standart olarak sunulur.`,
          image: "/dummygorsel/premium_office.png",
          status: "Yayında",
          views: 98
        },
        {
          title: "Ahşap Imalatında Sıfır Hata: CNC ve Usta El İşçiliği",
          slug: "ahsap-imalatinda-sifir-hata-cnc-ve-usta-el-isciligi",
          category: "Üretim Rehberi",
          excerpt: "Fabrikamızda yüksek bilgisayarlı teknoloji ile geleneksel el işçiliğini nasıl birleştiriyoruz?",
          content: `Bir mobilyanın uzun ömürlü olması, üretim aşamasındaki milimetrik hassasiyetten geçer. Fabrikamızda bilgisayar destekli CNC makineleri kesim ve delik işlemlerini sıfır hata ile gerçekleştirirken, zımpara ve cila aşamasında ustalarımızın el emeği devreye girer.

Müşterilerimize sunduğumuz 3D projelendirme aşamasında onaylanan tüm detaylar, doğrudan üretim bandımıza aktarılır. Bu sayede sürpriz sonuçlarla karşılaşılmaz ve anahtar teslim projeler tam zamanında montajlanır.`,
          image: "/dummygorsel/factory_workshop.png",
          status: "Yayında",
          views: 215
        }
      ]
    });
  }

  // 3. Projeler
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    console.log("🏗️ Projeler ekleniyor...");
    await prisma.project.createMany({
      data: [
        {
          name: "Vadi İstanbul Modern Ada Mutfak",
          category: "Konut",
          description: "Özel lake ve masif ceviz kaplama detaylı, entegre kuvars tezgahlı modern mutfak tasarımı ve üretimi.",
          img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.04.jpeg"
        },
        {
          name: "Lüks Konut Ahşap TV Ünitesi & Duvar Paneli",
          category: "Konut",
          description: "Gizli LED aydınlatmalı, akustik ahşap çıta panelli ve lake depolama üniteli salon tasarımı.",
          img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.05.jpeg"
        },
        {
          name: "Tasarım Füme Cam Kapaklı Gardırop",
          category: "Konut",
          description: "Alüminyum çerçeveli füme temperli cam kapaklı, iç aydınlatmalı giyinme odası gardırobu.",
          img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.06.jpeg"
        },
        {
          name: "Kurumsal Plaza Yönetici Ofis Seti",
          category: "Ofis",
          description: "Masif ahşap sümenli yönetici masası, kütüphane ve toplantı ünitesi özel üretimi.",
          img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.07.jpeg"
        },
        {
          name: "Özel Tasarım Banyo Hilton Lavabo Ünitesi",
          category: "Konut",
          description: "Suya ve neme dayanıklı lake kaplamalı, mermer tezgahlı banyo dolabı üretimi.",
          img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.08.jpeg"
        },
        {
          name: "Butik Otel Ahşap Yatak Başı & Mobilyaları",
          category: "Otel",
          description: "Otel odalarına özel entegre komodinli ahşap yatak başlıkları ve gardırop sistemleri.",
          img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.09.jpeg"
        }
      ]
    });
  }

  // 4. Galeri
  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    console.log("🖼️ Galeri fotoğrafları ekleniyor...");
    const galleryFiles = [
      "WhatsApp Image 2026-07-13 at 15.01.04.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.05.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.06.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.07.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.08.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.09.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.10.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.11.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.12.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.13.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.14.jpeg",
      "WhatsApp Image 2026-07-13 at 15.01.15.jpeg"
    ];

    await prisma.galleryItem.createMany({
      data: galleryFiles.map((file, i) => ({
        title: `Üretim Detayı #${i + 1}`,
        category: i % 2 === 0 ? "Konut" : "Üretim (Fabrika)",
        img: `/dummygorsel/${file}`
      }))
    });
  }

  console.log("✅ Hostinger veritabanı tohumlama işlemi başarıyla tamamlandı!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
