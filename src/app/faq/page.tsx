import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Star Decor",
  description: "Find answers to frequently asked questions about custom design processes, manufacturing lead times, delivery, installation, and warranties.",
};

export default function FAQ() {
  const faqs = [
    {
      q: "How long does furniture manufacturing take?",
      a: "Manufacturing lead times depend on project scale and complexity. Standard residential furniture typically takes 3–5 weeks, while large-scale turnkey architectural projects average 6–10 weeks."
    },
    {
      q: "Do you offer shipping and installation outside Dar es Salaam?",
      a: "Yes. Our factory manufactures custom furniture and provides delivery and installation services across Tanzania and international destinations."
    },
    {
      q: "Who conducts the site measurements?",
      a: "Once project terms are agreed upon, our professional interior design team visits your site personally to conduct laser-guided precision measurements."
    },
    {
      q: "Can I get my custom design or architectural plan manufactured?",
      a: "Absolutely. If you already have 3D renders, architectural drawings, or design reference photos, our engineering team will analyze them and manufacture exact replicas in our factory."
    },
    {
      q: "Are the wood and finish materials covered by warranty?",
      a: "Yes. We use premium grade MDF, solid wood, and eco-friendly lacquers/coatings complying with international standards. All manufacturing is covered by our company warranty."
    },
    {
      q: "How is project pricing calculated?",
      a: "Pricing is calculated individually based on selected materials (lacquer, veneer, laminate, etc.), hardware specifications (Blum, Hafele, etc.), and total project dimensions. Fill out our Get Quote form for an estimate."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Frequently Asked Questions</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 leading-relaxed">
            Answers to the most common questions regarding our manufacturing standards, custom workflows, and services.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-stone-200 p-6 sm:p-8 hover:border-stone-300 transition-colors">
              <h3 className="text-lg font-bold text-stone-900 mb-3 flex items-start gap-4">
                <span className="text-amber-700 font-serif">Q.</span>
                {faq.q}
              </h3>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base flex items-start gap-4">
                <span className="text-stone-300 font-serif">A.</span>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 text-center bg-stone-900 text-white p-10 border border-stone-800">
          <h3 className="text-2xl font-serif mb-4">Still have questions?</h3>
          <p className="text-stone-400 mb-8">Contact our team to discuss your project specifications or get detailed assistance.</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-stone-900 font-bold uppercase tracking-wider text-sm hover:bg-stone-200 transition-colors">
            Contact Us
          </a>
        </div>

      </div>
    </div>
  );
}

