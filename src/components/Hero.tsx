import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sparkles, Send, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

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

  const stats = [
    { label: 'Source code items', value: `${products.length}+`, icon: <Cpu className="h-4 w-4 text-indigo-400" /> },
    { label: 'Average rating', value: '4.85 / 5', icon: <Sparkles className="h-4 w-4 text-amber-400" /> },
    { label: 'Happy Customers', value: '1,420+', icon: <Globe className="h-4 w-4 text-emerald-400" /> },
    { label: 'Instant Delivery', value: '100% Sync', icon: <Zap className="h-4 w-4 text-violet-400" /> }
  ];

  return (
    <div className="relative overflow-hidden bg-zinc-950 pt-16 pb-16 sm:pt-24 sm:pb-20 border-b-2 border-slate-900">
      {/* Visual background lights */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border-2 border-slate-900 bg-indigo-600 text-[10px] font-black text-white uppercase tracking-widest rounded-none mx-auto geo-shadow-offset-sm">
            <Sparkles className="h-3 w-3 shrink-0" />
            <span>Soulverse Core Platform Live</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black uppercase tracking-tight text-zinc-100 sm:text-6xl py-1 font-display leading-none">
            {settings.heroTitle || 'Enterprise Software & Digital Products Marketplace'}
          </h1>

          {/* Subtitle */}
          <p className="text-sm font-medium text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            {settings.heroSubtitle || 'Build and scale your next digital venture with our production-ready source code, custom apps, AI platforms, and enterprise solutions.'}
          </p>

          {/* Combined Search Bar & Category Filter */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mt-8">
            <div className="flex flex-col sm:flex-row gap-0 bg-white border-2 border-slate-900 rounded-none geo-shadow-offset">
              <div className="flex-1 flex items-center gap-2 px-4 border-b-2 sm:border-b-0 sm:border-r-2 border-slate-900">
                <Search className="h-5 w-5 text-slate-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Search flutter apps, React source codes, AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none text-sm text-slate-900 placeholder-slate-400 py-3.5"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-none transition-all cursor-pointer shrink-0"
              >
                Search Marketplace
              </button>
            </div>
          </form>

          {/* Quick Newsletter Sub */}
          <div className="pt-4 max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex gap-0 border-2 border-slate-900 bg-white">
              <input
                type="email"
                required
                placeholder="Get free source codes weekly (Enter Email)..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1 transition-colors rounded-none"
              >
                {subscribed ? 'Subscribed!' : <><Send className="h-3 w-3" /> <span>Join</span></>}
              </button>
            </form>
          </div>

        </div>

        {/* Dynamic Statistics Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="p-5 border-2 border-slate-900 bg-white flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 group geo-shadow-offset"
            >
              <div className="mb-2.5 p-2 rounded-none bg-slate-50 border border-slate-200 group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-colors">
                {stat.icon}
              </div>
              <p className="text-3xl font-black text-slate-900 tracking-tight font-display">{stat.value}</p>
              <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-1.5 font-mono">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
