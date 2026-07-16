import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, ShieldAlert, Sparkles, Star, Users2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings } = useApp();

  const milestones = [
    { label: 'Platform projects launched', value: '450+' },
    { label: 'Developer active licenses', value: '3,800+' },
    { label: 'Total custom code builds', value: '180+' },
    { label: 'Support SLA satisfaction', value: '99.4%' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Muhammad Haris',
      role: 'Lead Flutter Architect, TechSargodha',
      comment: 'Soulverse Apps source codes are some of the cleanest on the market. Extremely well-documented, making client integration seamless. Saving weeks of dev cycles.',
      rating: 5
    },
    {
      id: 2,
      name: 'Chloe Simmons',
      role: 'SaaS Product Owner, SyncStack',
      comment: 'Their Next.js Headless template represents a masterclass in modern styling and performance scoring. Perfect Lighthouse metrics out-of-the-box.',
      rating: 5
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 min-h-screen">
      
      {/* Brand Profile Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto pt-6">
        <div className="space-y-5">
          <span className="text-[10px] uppercase font-black text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 font-mono">
            Meet Soulverse Apps
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl uppercase font-display leading-none">
            Assembling Tomorrow’s Digital Infrastructure
          </h1>
          <p className="text-sm font-medium text-slate-600 leading-relaxed font-sans">
            At <strong>{settings.companyName || 'Soulverse Apps'}</strong>, we understand that building software from scratch is an unnecessary friction point. Our mission is to engineer high-performance, secure, and production-ready code blocks so you can bypass boilerplate setups and launch solutions in days.
          </p>
          <p className="text-sm font-medium text-slate-400 leading-relaxed">
            Every product available in our secure marketplace undergoes exhaustive performance audits, unit validation, and responsive mobile-first visual styling before publication.
          </p>
        </div>

        <div className="relative aspect-[4/3] bg-slate-100 rounded-none overflow-hidden border-2 border-slate-900 shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
            alt="Soulverse team meeting" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Corporate core milestones */}
      <div className="bg-white border-2 border-slate-900 rounded-none p-6 md:p-8 max-w-5xl mx-auto geo-shadow-offset">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {milestones.map((ms, i) => (
            <div key={i} className="pt-4 lg:pt-0 first:pt-0">
              <p className="text-4xl font-black text-slate-900 tracking-tight font-display">{ms.value}</p>
              <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-1 font-mono">{ms.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials Slider */}
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-black text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 font-mono">
            Social Proof
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase font-display">Vouched by Developers Globally</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test) => (
            <div key={test.id} className="p-6 bg-white border-2 border-slate-900 rounded-none space-y-4 geo-shadow-offset">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed font-sans">
                &ldquo;{test.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="h-8 w-8 bg-slate-900 rounded-none flex items-center justify-center text-white text-xs font-black">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{test.name}</p>
                  <p className="text-[10px] text-slate-500 font-semibold font-mono uppercase">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
