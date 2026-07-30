import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Data Protection Policy | Tanzanya Furniture",
  description: "Information notice on the processing and protection of your personal data under relevant data protection regulations.",
};

export default function KVKK() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Data Protection Notice</h1>
          <div className="w-16 h-1 bg-amber-700"></div>
        </div>

        <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm space-y-6 text-stone-600 leading-relaxed text-sm md:text-base">
          <p>
            At <strong>Tanzanya Furniture & Decoration</strong> ("Company"), we show utmost sensitivity to the security of your personal data pursuant to applicable personal data protection laws.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">1. Data Controller</h3>
          <p>
            As Data Controller, our Company processes your personal data strictly within the scope and purposes specified below.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">2. Purposes of Data Processing</h3>
          <p>
            Personal data belonging to our clients (Name, Surname, Phone, Email, Address, Invoicing details, and Architectural measurements) are processed for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Execution of custom order and manufacturing workflows without disruption,</li>
            <li>Carrying out assembly, delivery, and logistics operations,</li>
            <li>Issuing invoices and managing official accounting processes in compliance with financial regulations,</li>
            <li>Evaluating quote requests and creating customized project cost proposals,</li>
            <li>Measuring customer satisfaction and offering post-sales support services.</li>
          </ul>
          <p className="mt-2">All data processing activities are conducted lawfully and fairly.</p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">3. Data Transfer to Third Parties</h3>
          <p>
            Your personal data may be transferred to official authorities and public institutions to fulfill legal obligations, to contracted logistics/shipping companies to carry out deliveries, and to certified accounting/financial audit firms for statutory audits.
          </p>

          <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">4. Rights of Data Subjects</h3>
          <p>
            As a data subject, you have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Learn whether your personal data is being processed,</li>
            <li>Request information regarding data processing activities,</li>
            <li>Request correction of inaccurate or incomplete personal data,</li>
            <li>Request deletion or erasure of your personal data within legal parameters.</li>
          </ul>
          <p className="mt-2">To exercise your rights, please submit your written request along with identity verification documents to <strong>stardecortz@gmail.com</strong>.</p>

          <p className="pt-8 text-sm text-stone-400 border-t border-stone-200 mt-8">
            Last Updated: July 2026
          </p>
        </div>

      </div>
    </div>
  );
}

