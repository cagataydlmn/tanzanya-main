import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Use | Tanzanya Furniture",
  description: "Terms and conditions governing the use of Tanzanya Furniture's website and services.",
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Terms of Use</h1>
          <div className="w-16 h-1 bg-amber-700"></div>
        </div>

        <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm space-y-6 text-stone-600 leading-relaxed text-sm md:text-base">
          <p>
            By accessing and using this website (www.tanzanyamobilya.com), you acknowledge that you have read, understood, and agreed to be bound by the following Terms of Use.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">1. Intellectual Property Rights</h3>
          <p>
            All designs, text, graphics, logos, images (including 3D renders and project photographs), and content displayed on this website are the intellectual property of <strong>Tanzanya Furniture & Decoration</strong>. Reproduction, distribution, or commercial use without prior written authorization from the Company is strictly prohibited.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">2. Product and Service Specifications</h3>
          <p>
            Products, services, and reference projects displayed on our website are for informational purposes. Natural wood grain patterns, stain tones, and fabric colors may vary slightly from real products due to display calibration. Tanzanya Furniture reserves the right to modify product specifications or service details without prior notice.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">3. Quotations and Order Confirmations</h3>
          <p>
            Price estimates provided via the "Get a Quote" form or contact channels are non-binding informational estimates. An order is finalized only after site measurements/surveying are completed and a formal written manufacturing contract is signed by both parties.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">4. Limitation of Liability</h3>
          <p>
            Tanzanya Furniture shall not be held liable for any direct or indirect damages resulting from the use of this website. External links provided on the website are the sole responsibility of their respective site operators.
          </p>

          <p className="pt-8 text-sm text-stone-400 border-t border-stone-200 mt-8">
            Last Updated: July 2026
          </p>
        </div>

      </div>
    </div>
  );
}

