import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Web sitemizi ziyaret ettiğinizde verilerinizin gizliliğinin nasıl sağlandığına dair politikamız.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Gizlilik Politikası</h1>
          <div className="w-16 h-1 bg-amber-700"></div>
        </div>

        <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm space-y-6 text-stone-600 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Tanzanya Mobilya & Dekorasyon</strong> ("Şirket", "Biz" veya "Tanzanya Mobilya") olarak, www.tanzanyamobilya.com ("Web Sitesi") adresindeki ziyaretçilerimizin ve müşterilerimizin gizliliğine büyük önem vermekteyiz. Bu Gizlilik Politikası, web sitemizi kullanırken toplanan verilerin nasıl işlendiğini, korunduğunu ve kullanıldığını açıklar.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">1. Toplanan Bilgiler</h3>
          <p>
            Web sitemiz üzerinden bizimle iletişime geçtiğinizde veya teklif formunu doldurduğunuzda; adınız, soyadınız, telefon numaranız, e-posta adresiniz ve projenizle ilgili gönüllü olarak paylaştığınız (dosya yüklemeleri dahil) bilgileri toplarız. Ayrıca, sitemizi ziyaretiniz sırasında IP adresiniz, tarayıcı türünüz ve gezinme verileriniz çerezler (cookies) aracılığıyla anonim olarak kaydedilebilir.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">2. Bilgilerin Kullanımı</h3>
          <p>
            Topladığımız bilgiler, sizlere daha iyi hizmet verebilmek, teklif taleplerinize doğru ve hızlı yanıt oluşturabilmek, iç mimari proje ve mobilya üretim süreçlerimizi sizin ihtiyaçlarınıza göre şekillendirebilmek amacıyla kullanılmaktadır. Kesinlikle hiçbir ticari bilginiz, izniniz olmadan üçüncü şahıslara satılamaz.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">3. Bilgilerin Korunması</h3>
          <p>
            Tanzanya Mobilya, kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemlerini kullanır. Sistemlerimizde toplanan müşteri dataları ve mimari proje taslakları güvenli sunucularda saklanmakta ve yalnızca yetkili personel tarafından erişilebilmektedir.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">4. Üçüncü Taraflarla Paylaşım</h3>
          <p>
            Verileriniz, yalnızca yasal zorunluluklar halinde resmi kurumlarla veya anahtar teslim projelerde sizin onayınızla birlikte çalıştığımız güvenilir alt taşeronlarla (lojistik, özel hammadde tedarikçileri) projenin ilerlemesi için gereken minimum düzeyde paylaşılabilir.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">5. İletişim</h3>
          <p>
            Gizlilik politikamız veya kişisel verilerinizin işlenmesiyle ilgili sorularınız için bizimle <strong>stardecortz@gmail.com</strong> adresi üzerinden iletişime geçebilirsiniz.
          </p>
          
          <p className="pt-8 text-sm text-stone-400 border-t border-stone-200 mt-8">
            Son Güncelleme: Ekim 2026
          </p>
        </div>

      </div>
    </div>
  );
}
