import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında verilerinizin işlenme ve korunma esasları hakkında bilgilendirme metni.",
};

export default function KVKK() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">KVKK Aydınlatma Metni</h1>
          <div className="w-16 h-1 bg-amber-700"></div>
        </div>

        <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm space-y-6 text-stone-600 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Tanzanya Mobilya & Dekorasyon</strong> (Bundan böyle "Şirket" olarak anılacaktır) olarak, 6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">1. Veri Sorumlusunun Kimliği</h3>
          <p>
            KVKK kapsamında Şirketimiz, "Veri Sorumlusu" sıfatıyla, aşağıda belirtilen amaçlar ve sınırlar çerçevesinde kişisel verilerinizi işlemektedir.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">2. Kişisel Verilerin İşlenme Amaçları</h3>
          <p>
            Müşterilerimize ait kişisel veriler (Ad, Soyad, Telefon, E-posta, Adres, Fatura bilgileri ve Mimari proje ölçüleri);
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Sipariş ve üretim süreçlerinin eksiksiz yürütülebilmesi,</li>
            <li>Montaj, teslimat ve lojistik operasyonlarının gerçekleştirilmesi,</li>
            <li>Fatura kesimi ve resmi muhasebe işlemlerinin yasal mevzuata uygun ifası,</li>
            <li>Teklif taleplerinizin değerlendirilip sizlere özel proje fiyatlandırması yapılabilmesi,</li>
            <li>Müşteri memnuniyetinin ölçülmesi ve satış sonrası destek hizmetlerinin sunulması</li>
          </ul>
          <p className="mt-2">amaçlarıyla, hukuka ve dürüstlük kurallarına uygun olarak işlenmektedir.</p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">3. Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h3>
          <p>
            Toplanan kişisel verileriniz; kanuni yükümlülüklerimizin yerine getirilmesi amacıyla resmi merci ve kamu kurumlarına, teslimat süreçlerinin işlemesi için sözleşmeli kargo/lojistik firmalarımıza ve mali denetimler sebebiyle yeminli mali müşavirlik firmalarına aktarılabilmektedir.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">4. İlgili Kişinin Hakları</h3>
          <p>
            KVKK'nın 11. maddesi uyarınca veri sahipleri;
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Kişisel verilerinin işlenip işlenmediğini öğrenme,</li>
            <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
            <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme,</li>
            <li>Kişisel verilerin silinmesini veya yok edilmesini talep etme</li>
          </ul>
          <p className="mt-2">haklarına sahiptir. Bu haklarınızı kullanmak için taleplerinizi kimliğinizi tespit edici belgeler ile birlikte <strong>info@tanzanyamobilya.com</strong> adresine yazılı olarak iletebilirsiniz.</p>

          <p className="pt-8 text-sm text-stone-400 border-t border-stone-200 mt-8">
            Son Güncelleme: Ekim 2026
          </p>
        </div>

      </div>
    </div>
  );
}
