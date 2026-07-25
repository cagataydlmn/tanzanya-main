import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "İletişim",
  description: "Tanzanya Mobilya ile iletişime geçin. Proje talepleriniz, mobilya üretim detayları ve showroom adresimiz için iletişim bilgilerimiz.",
};

import { getContactSettings } from '@/app/actions/contact';
import SocialIcon from '@/components/SocialIcon';

export default async function Contact() {
  const contactRes = await getContactSettings();
  const settings = contactRes.success ? contactRes.data : null;

  let socialLinks: any[] = [];
  try {
    socialLinks = settings?.socialLinks 
      ? (typeof settings.socialLinks === 'string' ? JSON.parse(settings.socialLinks) : settings.socialLinks) 
      : [];
  } catch(e) {}

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Contact</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>

        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-serif text-stone-900 border-b border-stone-200 pb-4">İletişim Bilgileri</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Fabrika & Merkez</h3>
                  <p className="text-stone-600 whitespace-pre-line">{settings?.address || 'Mikocheni B, Rose Garden Road, Uzima Street\nKinondoni District, Dar es Salaam, Tanzania'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Telefon</h3>
                  <p className="text-stone-600">{settings?.phone1 || '0 651 137 287'}</p>
                  {settings?.phone2 && <p className="text-stone-600">{settings?.phone2}</p>}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">E-Posta</h3>
                  <p className="text-stone-600">{settings?.email || 'stardecortz@gmail.com'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Sosyal Medya</h3>
                  <div className="flex items-center gap-4 mt-2">
                    {socialLinks.map((link: any, index: number) => {
                      return (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-amber-600 transition-colors" title={link.platform}>
                          <span className="sr-only">{link.platform}</span>
                          <SocialIcon platform={link.platform} className="w-6 h-6" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-stone-200 border border-stone-300 w-full min-h-[400px] flex items-center justify-center relative overflow-hidden">
            <iframe
              src={settings?.mapIframe || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.062996987857!2d39.2519711!3d-6.7621734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4d7b36781765%3A0x212569b7181875a7!2sersanfurnitureTZ!5e0!3m2!1str!2str!4v1784646295368!5m2!1str!2str"}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}
