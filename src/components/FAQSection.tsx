import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What license types are applied to purchases?',
      a: 'All source code templates on Soulverse Apps are delivered under a "Single Use Developer License". This grants you authorization to build a single client portal or commercial app. For multiple deployments or redistribution rights, please submit a query regarding our Extended Enterprise Licenses.'
    },
    {
      q: 'Can I request customizations or bespoke code integrations?',
      a: 'Absolutely! If you purchase a source code template but lack the engineering capacity to integrate it or alter its screens, please access our "Services" page to obtain an interactive project budget quote and get connected with our lead consultants.'
    },
    {
      q: 'How do I download purchased packages?',
      a: 'Once your chosen checkout gateway (Easypaisa, JazzCash, Stripe, Bank Transfer, PayPal) is authorized and payment is cleared, an invoice panel renders in your browser providing live digital download links. You can also log into your profile dashboard to access your complete purchase history and download files anytime.'
    },
    {
      q: 'Do you offer updates for source files?',
      a: 'Yes, we do. When an Android/iOS app or Next.js platform is revised (e.g., updating SDK modules or fixing minor bugs), we release a revision package. Anyone who purchased the item receives lifetime free access to all future versions.'
    },
    {
      q: 'What is your refund policy for source codes?',
      a: 'Because digital source files are immediately accessible upon check out and cannot be physically returned, we do not issue generic refunds. However, if you find a verified fatal compiler error that our support team cannot resolve within 5 business days, we will issue a full credit refund.'
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      
      {/* FAQ Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase font-black text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 font-mono">
          Common Questions
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl uppercase font-display leading-none">
          Support & Core FAQ
        </h1>
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          Need details regarding code validation, installation parameters, payment gateways, or custom consulting? Find help guidelines below.
        </p>
      </div>

      {/* FAQ Accordions list */}
      <div className="space-y-4 pt-4 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="bg-white border-2 border-slate-900 rounded-none overflow-hidden transition-colors geo-shadow-offset"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-black text-slate-900 transition-colors hover:text-indigo-600 hover:bg-slate-50 focus:outline-none cursor-pointer uppercase tracking-tight font-display"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-500 shrink-0 transform transition-transform duration-250 ${isOpen ? 'rotate-180 text-slate-900' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-3 border-t-2 border-slate-900 text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
