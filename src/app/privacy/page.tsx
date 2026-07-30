import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Tanzanya Furniture",
  description: "Learn how Tanzanya Furniture collects, processes, and protects your personal information and project data.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Privacy Policy</h1>
          <div className="w-16 h-1 bg-amber-700"></div>
        </div>

        <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm space-y-6 text-stone-600 leading-relaxed text-sm md:text-base">
          <p>
            At <strong>Tanzanya Furniture & Decoration</strong> ("Company", "We", or "Tanzanya Furniture"), we are committed to safeguarding the privacy and personal data of our website visitors and clients. This Privacy Policy explains how information is collected, processed, used, and protected when you visit our website or interact with our custom furniture manufacturing and interior architecture services.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">1. Information We Collect</h3>
          <p>
            When you contact us, fill out a quote request form, or consult with us regarding custom design projects, we collect personal information that you voluntarily provide. This includes your full name, email address, phone number, company details, and project specifications (including uploaded files or floor plans). Additionally, technical data such as IP address, browser type, device information, and navigation analytics may be recorded anonymously via cookies.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">2. How We Use Your Information</h3>
          <p>
            We use the collected information to provide tailored interior design solutions, prepare accurate cost quotes, manage custom furniture production processes, communicate project updates, and enhance website performance. Your personal and project data will never be sold, rented, or commercialized without your explicit consent.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">3. Data Protection & Security</h3>
          <p>
            Tanzanya Furniture implements industry-standard administrative, physical, and technical security protocols to protect your personal data and architectural project drafts. Collected client records are stored on secure servers with restricted access granted only to authorized team members directly handling your project.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">4. Third-Party Sharing</h3>
          <p>
            Your information is shared only when necessary to fulfill turnkey projects—such as with trusted logistics partners or specialized material suppliers—and strictly to the extent required for project completion. We may also share information if required by law or legal proceedings.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">5. Cookies & Tracking Technologies</h3>
          <p>
            We use cookies to improve user experience, analyze site traffic, and optimize site navigation. You can manage or disable cookie preferences at any time through your browser settings.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">6. Your Rights</h3>
          <p>
            You have the right to request access to your personal data, request updates or corrections, request deletion of your information subject to legal retention obligations, and inquire about how your data is handled.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">7. Contact Us</h3>
          <p>
            If you have any questions or requests regarding this Privacy Policy or your personal information, please feel free to reach out to us at <strong>stardecortz@gmail.com</strong>.
          </p>
          
          <p className="pt-8 text-sm text-stone-400 border-t border-stone-200 mt-8">
            Last Updated: July 2026
          </p>
        </div>

      </div>
    </div>
  );
}

