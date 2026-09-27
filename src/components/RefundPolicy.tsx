import React from 'react';

export const RefundPolicy: React.FC = () => (
  <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
    <article className="bg-white border-2 border-slate-900 p-7 md:p-10 space-y-8 geo-shadow-offset">
      <header className="space-y-3 border-b-2 border-slate-900 pb-6">
        <span className="text-[10px] uppercase font-black text-indigo-700 tracking-widest font-mono">Purchases & Support</span>
        <h1 className="text-3xl font-black text-slate-900 uppercase font-display">Refund Policy</h1>
        <p className="text-xs text-slate-500">Last updated: September 2026</p>
      </header>
      <section className="space-y-4 text-sm text-slate-600 leading-7">
        <p>Soulverse Apps provides digital software products, source-code packages and development services. Because a digital package may be accessed or delivered electronically, refund eligibility depends on the product type and the circumstances of the request.</p>
        <h2 className="text-xl font-black text-slate-900">Digital products</h2>
        <p>Before purchasing, customers should review the product description, included features, technology requirements and license terms. A refund is not automatically available simply because a customer changes their mind after receiving access to a digital file.</p>
        <h2 className="text-xl font-black text-slate-900">Verified technical problems</h2>
        <p>If a delivered package contains a reproducible technical defect that prevents the documented core functionality from working and our support team cannot provide a reasonable fix, the customer may contact support with the order details and reproduction steps. We will review the issue and determine an appropriate remedy, which may include a corrected package, replacement delivery or refund where applicable.</p>
        <h2 className="text-xl font-black text-slate-900">Custom development</h2>
        <p>Custom development work is handled according to the agreed project scope, milestones and payment terms. Work already completed or approved milestones may not be refundable unless the applicable agreement says otherwise.</p>
        <h2 className="text-xl font-black text-slate-900">How to request help</h2>
        <p>Contact <a className="text-indigo-700 underline font-bold" href="mailto:soulversepk@gmail.com">soulversepk@gmail.com</a> with your order reference, product name, purchase date and a clear description of the issue. Do not send passwords or private credentials in a support request.</p>
      </section>
    </article>
  </div>
);
