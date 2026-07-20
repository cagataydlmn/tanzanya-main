export interface ServiceItem {
  slug: string;
  title: string;
  desc: string;
  longDesc: string;
  features: string[];
  steps: string[];
  img: string;
}

export const servicesData: ServiceItem[] = [
  {
    slug: "ic-mimari-ve-tasarim",
    title: "İç Mimari ve Tasarım",
    desc: "Ev, ofis veya ticari alanlarınız için uzman ekibimizle yaşam tarzınıza uygun estetik ve fonksiyonel tasarımlar hazırlıyoruz.",
    longDesc: "Tanzanya Mobilya iç mimarlık ekibi olarak, mekanlarınızı sadece döşemekle kalmıyor; yaşam tarzınıza ve kurumsal kimliğinize uygun benzersiz atmosferler kurguluyoruz. 3D fotogerçekçi görselleştirme tekniklerimiz sayesinde, imalat öncesinde mekanınızın son halini tüm renk ve dokularıyla deneyimleyebilirsiniz.",
    features: [
      "3D Fotogerçekçi Render Görselleri",
      "Milimetrik Ölçü ve Rölöve Alımı",
      "Renk, Malzeme ve Doku Seçim Rehberliği",
      "Ergonomik Alan Yönetimi ve Mimari Planlama"
    ],
    steps: ["Keşif ve Rölöve Alımı", "Konsept Tasarım", "3D Görselleştirme & Onay", "İmalat ve Teslimat"],
    img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.05.jpeg"
  },
  {
    slug: "ozel-mobilya-uretimi",
    title: "Özel Mobilya Üretimi",
    desc: "Standartların dışına çıkın. Fabrikamızda tamamen alanınıza ve zevkinize özel, milimetrik ölçülerde mobilya üretimi yapıyoruz.",
    longDesc: "Kendi 5000 m² üretim tesislerimizde, ham keresteden en hassas cila katına kadar tüm mobilya üretim süreçlerini bilgisayarlı CNC makinelerimiz ve uzman ustalarımızla yürütüyoruz. Mutfak adaları, TV üniteleri, giyinme odaları ve özel masaları hayallerinizdeki detaylarla üretiyoruz.",
    features: [
      "Kişiye Özel Masif ve Lake İmalat",
      "Kuvars, Mermer ve Cam Detay Entegrasyonu",
      "Sessiz Yavaşlatıcılı İthal Donanımlar",
      "Uzun Ömürlü Çizilmez Kaplamalar"
    ],
    steps: ["Teknik Çizim (CAD/CAM)", "Ahşap Kesim ve Şekillendirme", "Cila ve Yüzey İşleme", "Kalite Kontrol Testi"],
    img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.04.jpeg"
  },
  {
    slug: "anahtar-teslim-projeler",
    title: "Anahtar Teslim Projeler",
    desc: "İnşaat, dekorasyon ve mobilya süreçlerini tek elden yönetiyoruz. Mekanı boş teslim alıp, oturmaya hazır şekilde teslim ediyoruz.",
    longDesc: "Otel, restoran, rezidans ve iş merkezlerinde projelendirme, sabit ve hareketli mobilya üretimi, zemin, tavan ve saha montaj uygulamalarının tamamını tek çatı altında üstleniyoruz. Projenizi zamanında ve tam bütçesinde teslim alma rahatlığını yaşayın.",
    features: [
      "Bütçe ve Zaman Yönetimi Garantisi",
      "Şantiye Takibi ve Profesyonel Saha Yönetimi",
      "Tüm Ahşap ve Donatıların Entegre İmalatı",
      "Eksiksiz ve Temiz Teslimat"
    ],
    steps: ["Şantiye ve Proje Analizi", "Tesis Üretimi", "Güvenli Lojistik", "Saha Kurulumu ve Teslimat"],
    img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.07.jpeg"
  },
  {
    slug: "montaj-ve-uygulama",
    title: "Montaj ve Uygulama",
    desc: "Ürettiğimiz tüm mobilyaların kurulumu ve şantiye içi uygulamaları profesyonel montaj ekiplerimiz tarafından titizlikle gerçekleştirilir.",
    longDesc: "Üretimi tamamlanan tüm ahşap ürünler, uluslararası koruyucu ambalaj standartlarına göre paketlenir ve kendi bünyemizdeki deneyimli montaj ekiplerimizce yerinde kurulur. Milimetrik hizalama ve su terazisi hassasiyetiyle kusursuz montaj sağlıyoruz.",
    features: [
      "Saha Deneyimli Usta Montaj Kadrosu",
      "Hassas Su Terazisi ve Lazer Hizalama",
      "Zamanında ve Temiz Kurulum",
      "Montaj Sonrası Garanti ve Teknik Destek"
    ],
    steps: ["Koruyucu Paketleme ve Sevkiyat", "Saha Lazer Hizalaması", "Milimetrik Kurulum", "Müşteri Onayı"],
    img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.10.jpeg"
  },
  {
    slug: "projelendirme-ve-3d-tasarim",
    title: "Projelendirme ve 3D Tasarım",
    desc: "Uygulama öncesi mekanınızın fotogerçekçi 3D renderlarını hazırlayarak renk, doku ve malzeme uyumunu kusursuzlaştırıyoruz.",
    longDesc: "Sürprizlere yer bırakmayın. Üretime geçilmeden önce mekanınızın birebir ölçülerdeki 3D simülasyonunu hazırlayarak mobilya, ışık ve malzeme uyumunu sanal ortamda deneyimlemenizi sağlıyoruz.",
    features: [
      "Fotogerçekçi Render Alımı",
      "Alternatif Malzeme ve Renk Senaryoları",
      "İmalata Hazır Üretim Çizimleri",
      "Mimari Bütçe Planlaması"
    ],
    steps: ["Rölöve ve İhtiyaç Analizi", "3D Modelleme", "Revizyon ve Malzeme Seçimi", "İmalat Çizimleri"],
    img: "/dummygorsel/WhatsApp Image 2026-07-13 at 15.01.15.jpeg"
  }
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find(s => s.slug === slug);
}
