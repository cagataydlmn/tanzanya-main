"use client";

import { useState, useEffect } from 'react';
import { submitQuote } from '@/app/actions/quotes';
import { getCategories } from '@/app/actions/categories';

export default function Quote() {
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    async function fetchCats() {
      const res = await getCategories();
      if (res.success && res.data && res.data.length > 0) {
        setCategories(res.data);
        setFormData(prev => ({ ...prev, service: res.data[0].name }));
      }
    }
    fetchCats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setStatusMsg({ type: 'error', text: 'Please fill in the required fields (*).' });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    const res = await submitQuote(formData);

    setLoading(false);
    if (res.success) {
      setStatusMsg({
        type: 'success',
        text: 'Your quote request has been successfully recorded. Our project team will contact you shortly.'
      });
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: categories.length > 0 ? categories[0].name : '',
        message: ''
      });
    } else {
      setStatusMsg({
        type: 'error',
        text: res.error || 'An error occurred, please try again later.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Get A Quote</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 leading-relaxed max-w-2xl mx-auto">
            Share the details of your dream space or production needs with us. Our project team will get back to you with custom pricing as soon as possible.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm">
          
          {/* Status Message */}
          {statusMsg && (
            <div className={`mb-8 p-4 border text-sm font-medium ${
              statusMsg.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Full Name / Company Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="Individual or company name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="example@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="e.g. +255 123 456 789"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Project Type</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors appearance-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                  {categories.length === 0 && <option value="">Loading...</option>}
                </select>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wider block">Project Details & Expectations</label>
              <textarea 
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-stone-900 focus:outline-none focus:border-amber-700 transition-colors resize-y"
                placeholder="Products you need, estimated area size, preferred materials, etc."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button 
                type="submit" 
                disabled={loading}
                className="px-12 py-4 bg-stone-900 text-white font-bold uppercase tracking-wider text-sm hover:bg-amber-800 transition-colors w-full md:w-auto disabled:bg-stone-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Quote Request'}
              </button>
              <p className="text-stone-400 text-xs mt-4">
                Your information is protected under data privacy laws and will not be shared with third parties.
              </p>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  );
}
