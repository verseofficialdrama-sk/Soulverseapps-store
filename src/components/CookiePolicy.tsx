import React from 'react';

export const CookiePolicy: React.FC = () => (
  <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
    <article className="bg-white border-2 border-slate-900 p-7 md:p-10 space-y-8 geo-shadow-offset">
      <header className="space-y-3 border-b-2 border-slate-900 pb-6">
        <span className="text-[10px] uppercase font-black text-indigo-700 tracking-widest font-mono">Legal Information</span>
        <h1 className="text-3xl font-black text-slate-900 uppercase font-display">Cookie Policy</h1>
        <p className="text-xs text-slate-500">Last updated: September 2026</p>
      </header>
      <section className="space-y-4 text-sm text-slate-600 leading-7">
        <p>Soulverse Apps, operated by SAWAX ENTERPRISES PRIVATE LIMITED, may use cookies and similar technologies to keep the website functional, remember preferences, understand website usage and support advertising services.</p>
        <h2 className="text-xl font-black text-slate-900">Essential technologies</h2>
        <p>Some storage mechanisms are necessary for features such as authentication state, shopping-cart preferences, security controls and basic site functionality. These technologies are not used to create a profile for unrelated purposes.</p>
        <h2 className="text-xl font-black text-slate-900">Analytics and advertising</h2>
        <p>Where enabled, analytics tools may collect aggregated information about page visits and performance. Google AdSense or other advertising partners may use cookies or similar technologies to serve and measure advertisements. Their processing is governed by the applicable provider policies and user controls.</p>
        <h2 className="text-xl font-black text-slate-900">Your choices</h2>
        <p>You can control cookies through your browser settings. Blocking some cookies can affect features that depend on local storage or authentication. Where legally required, additional consent controls may be presented before non-essential technologies are used.</p>
        <h2 className="text-xl font-black text-slate-900">Contact</h2>
        <p>For questions about this policy, contact <a className="text-indigo-700 underline font-bold" href="mailto:soulversepk@gmail.com">soulversepk@gmail.com</a>.</p>
      </section>
    </article>
  </div>
);
