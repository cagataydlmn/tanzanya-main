import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Star Decor. Contact information for project requests, furniture production details, and showroom address.",
};

import { getContactSettings } from '@/app/actions/contact';
import { getPageHeader } from '@/app/actions/page-headers';
import SocialIcon from '@/components/SocialIcon';

export default async function Contact() {
  const contactRes = await getContactSettings();
  const settings = contactRes.success ? contactRes.data : null;

  const headerRes = await getPageHeader('contact');
  const headerData = headerRes.success && headerRes.data ? headerRes.data : null;
  const pageTitle = headerData?.title || "Contact Us";
  const pageDesc = headerData?.description || "Get in touch with us. We are always here for your projects and requests.";

  let socialLinks: any[] = [];
  try {
    socialLinks = settings?.socialLinks 
      ? (typeof settings.socialLinks === 'string' ? JSON.parse(settings.socialLinks) : settings.socialLinks) 
      : [];
  } catch(e) {}

  // Parse dynamic phone numbers with labels
  let phones: any[] = [];
  try {
    phones = settings?.phones 
      ? (typeof settings.phones === 'string' ? JSON.parse(settings.phones) : settings.phones) 
      : [];
  } catch(e) {}
  if (!Array.isArray(phones) || phones.length === 0) {
    phones = [];
    if (settings?.phone1) phones.push({ label: 'Main Phone', value: settings.phone1 });
    if (settings?.phone2) phones.push({ label: 'Alternative Phone', value: settings.phone2 });
  }

  // Parse dynamic emails with labels
  let emails: any[] = [];
  try {
    emails = settings?.emails 
      ? (typeof settings.emails === 'string' ? JSON.parse(settings.emails) : settings.emails) 
      : [];
  } catch(e) {}
  if (!Array.isArray(emails) || emails.length === 0) {
    emails = [];
    if (settings?.email) emails.push({ label: 'Email', value: settings.email });
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">{pageTitle}</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto whitespace-pre-wrap">
            {pageDesc}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-serif text-stone-900 border-b border-stone-200 pb-4">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Factory & Headquarters</h3>
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
                  <h3 className="font-bold text-stone-900 mb-1">Phone</h3>
                  <div className="space-y-1">
                    {phones.map((p: any, idx: number) => (
                      <p key={idx} className="text-stone-600">
                        <span className="font-medium text-stone-800">{p.label}: </span>
                        {p.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Email</h3>
                  <div className="space-y-1">
                    {emails.map((e: any, idx: number) => (
                      <p key={idx} className="text-stone-600">
                        <span className="font-medium text-stone-800">{e.label}: </span>
                        {e.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-200 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Social Media</h3>
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
              src={settings?.mapIframe || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3962.077108117358!2d39.252118!3d-6.7604522!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4d8a2a606a3d%3A0xa9ce81db02869dac!2sStarDecor%20Furniture%20and%20Interior%20Design!5e0!3m2!1str!2str!4v1785182002797!5m2!1str!2str"}
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
