import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sparkles, Send, ArrowUpRight, ShieldCheck, Zap, Code2, Layers3 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, searchQuery, setSearchQuery, products, setActiveTab } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('Products');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const showcase = products.slice(0, 3);

  return (
    <section className="relative overflow-hidden hero-premium border-b border-slate-200">
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="hero-grid" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-14 sm:pt-20 sm:pb-20">
        <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur mb-5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,.8)]" />
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-[.18em] text-slate-700">Soulverse Digital Studio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-.055em] text-slate-950 leading-[.96] font-display">
              {settings.heroTitle || 'Enterprise Software & Digital Products Marketplace'}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg leading-8 text-slate-600">
              {settings.heroSubtitle || 'Production-ready software, source code, AI platforms and custom digital solutions built for modern businesses.'}
            </p>

            <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl mx-auto lg:mx-0">
              <div className="premium-search flex flex-col sm:flex-row items-stretch gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_20px_55px_rgba(15,23,42,.12)] backdrop-blur">
                <div className="flex-1 flex items-center gap-3 px-3">
                  <Search className="h-5 w-5 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search apps, source code, AI tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-0 outline-none text-sm text-slate-900 placeholder-slate-400 py-3"
                  />
                </div>
                <button type="submit" className="premium-button rounded-xl px-6 py-3.5 bg-slate-950 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                  Search <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2.5">
              {['Production Ready', 'AI & SaaS', 'Custom Development'].map((x, i) => (
                <span key={x} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/75 px-3 py-1.5 text-[10px] font-bold text-slate-600 shadow-sm">
                  {[<ShieldCheck key="a" className="h-3.5 w-3.5 text-emerald-600" />, <Zap key="b" className="h-3.5 w-3.5 text-amber-500" />, <Code2 key="c" className="h-3.5 w-3.5 text-violet-500" />][i]}
                  {x}
                </span>
              ))}
            </div>

            <div className="mt-7 max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleSubscribe} className="flex rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
                <input type="email" required placeholder="Get product & development updates" value={email} onChange={(e) => setEmail(e.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs text-slate-900 outline-none placeholder-slate-400" />
                <button type="submit" className="rounded-lg bg-emerald-500 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white hover:bg-emerald-600 transition-colors">
                  {subscribed ? 'Subscribed' : <><Send className="inline h-3 w-3 mr-1" /> Join</>}
                </button>
              </form>
            </div>
          </div>

          <div className="relative min-h-[430px] sm:min-h-[500px] flex items-center justify-center lg:justify-end">
            <div className="showcase-glow" />
            <div className="showcase-ring ring-one" />
            <div className="showcase-ring ring-two" />

            {showcase.map((product, i) => (
              <div key={product.id} className={`floating-product floating-product-${i}`}>
                <div className="rounded-[26px] border border-white/70 bg-white/90 p-2 shadow-[0_30px_80px_rgba(15,23,42,.22)] backdrop-blur-xl">
                  <div className="overflow-hidden rounded-[20px] bg-slate-100 aspect-[4/3] w-[220px] sm:w-[270px]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="px-3 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-black text-slate-900 truncate">{product.name}</p>
                      <span className="text-[9px] font-black uppercase text-emerald-600">{product.category}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{product.shortDesc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 rounded-2xl border border-white/80 bg-slate-950/95 px-4 py-3 text-white shadow-2xl backdrop-blur-xl w-[250px] sm:w-[290px]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-950 shadow-lg"><Layers3 className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Built by SAWAX</p>
                  <p className="text-xs font-semibold text-white truncate">Software • AI • Mobile • Web</p>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            ['Digital Products', `${products.length}`, 'Live catalog'],
            ['Custom Development', 'Available', 'Web & mobile'],
            ['AI & SaaS Solutions', 'Available', 'Production focused'],
            ['Company', 'SAWAX', 'Pakistan']
          ].map(([label, value, note]) => (
            <div key={label} className="premium-stat rounded-2xl border border-white/80 bg-white/75 p-4 sm:p-5 shadow-sm backdrop-blur">
              <p className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-display">{value}</p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-wider text-slate-700">{label}</p>
              <p className="mt-1 text-[10px] text-slate-400">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
