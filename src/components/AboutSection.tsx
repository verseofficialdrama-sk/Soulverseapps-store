import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, ShieldAlert, Sparkles, Star, Users2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings } = useApp();

  const focusAreas = [
    { title: 'Digital Products', text: 'We publish software products, mobile applications, web templates, source-code packages, APIs and developer resources through the Soulverse Apps store.' },
    { title: 'Custom Engineering', text: 'Our development services cover mobile applications, web platforms, SaaS products, API integrations, authentication, databases and selected AI-powered workflows.' },
    { title: 'Product Development', text: 'We take products from concept and interface planning through implementation, testing, deployment and post-release improvement.' },
    { title: 'Technical Resources', text: 'Our Insights section documents practical lessons about software architecture, security, deployment, performance and product development.' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-14 min-h-screen">
      <section className="max-w-4xl mx-auto text-center space-y-5">
        <span className="inline-flex text-[10px] uppercase font-black text-indigo-700 tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 font-mono">
          Company Profile
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-5xl font-display leading-tight">
          Soulverse Apps is a software product brand of SAWAX ENTERPRISES PRIVATE LIMITED.
        </h1>
        <p className="text-sm font-medium text-slate-600 leading-7">
          SAWAX ENTERPRISES PRIVATE LIMITED is a Pakistan-registered software company operating the Soulverse Apps digital product ecosystem. The website is used to present software products, developer resources, application projects, custom development services and technical information.
        </p>
        <p className="text-sm font-medium text-slate-600 leading-7">
          We focus on practical software products rather than a single technology stack. Depending on the project, our work can include React and web applications, native Android development, Flutter-based products, REST APIs, Firebase, PostgreSQL, real-time communication and AI integrations.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {focusAreas.map((item) => (
          <article key={item.title} className="bg-white border-2 border-slate-900 p-6 geo-shadow-offset space-y-3">
            <h2 className="text-lg font-black text-slate-900 uppercase font-display">{item.title}</h2>
            <p className="text-sm text-slate-600 leading-7">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="max-w-5xl mx-auto bg-slate-900 text-white p-7 md:p-9 border-2 border-slate-900 geo-shadow-offset space-y-5">
        <div>
          <span className="text-[10px] uppercase font-black text-emerald-400 tracking-widest font-mono">Our flagship project</span>
          <h2 className="text-2xl font-black uppercase font-display mt-2">Pardais Live</h2>
        </div>
        <p className="text-sm text-slate-300 leading-7">
          Pardais Live is a live-streaming and social entertainment product operated within the SAWAX ENTERPRISES PRIVATE LIMITED ecosystem. The project includes real-time audio/video experiences, social interaction, virtual gifts, creator features and supporting platform infrastructure.
        </p>
        <a href="https://pardaislive.com" target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2.5 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 transition-colors">
          Visit Pardais Live
        </a>
      </section>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-slate-900 p-6 space-y-4">
          <h2 className="text-xl font-black text-slate-900 uppercase font-display">How we work</h2>
          <ol className="space-y-3 text-sm text-slate-600 leading-6 list-decimal list-inside">
            <li>Define the product goal, audience and required functionality.</li>
            <li>Plan the interface, data model, integrations and deployment approach.</li>
            <li>Implement the product in small, testable features.</li>
            <li>Test core workflows and resolve deployment or integration issues.</li>
            <li>Prepare the product for release and provide ongoing technical support where agreed.</li>
          </ol>
        </div>
        <div className="bg-slate-50 border-2 border-slate-900 p-6 space-y-4">
          <h2 className="text-xl font-black text-slate-900 uppercase font-display">Company information</h2>
          <div className="text-sm text-slate-600 leading-7 space-y-2">
            <p><strong>Legal name:</strong> {settings.companyName}</p>
            <p><strong>Brand:</strong> Soulverse Apps</p>
            <p><strong>Registered office:</strong> {settings.registeredOffice || settings.contactAddress}</p>
            <p><strong>Country:</strong> Pakistan</p>
            <p><strong>Website:</strong> soulverseapps.com</p>
            <p><strong>Email:</strong> {settings.contactEmail}</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center border-t-2 border-slate-900 pt-8">
        <h2 className="text-xl font-black text-slate-900 uppercase font-display">Independent information and transparency</h2>
        <p className="text-sm text-slate-600 leading-7 mt-3">
          Product specifications, pricing, availability and project status can change as software is updated. We aim to keep product pages, policies and technical articles current. Information on this website is provided for general product and development purposes and should be reviewed together with the applicable license or service agreement before purchase.
        </p>
      </section>
    </div>
  );
};
