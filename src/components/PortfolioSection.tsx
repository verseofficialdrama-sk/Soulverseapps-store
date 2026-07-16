import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, User, ExternalLink, Sparkles, LayoutGrid } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { portfolio } = useApp();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      
      {/* Portfolio Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-black text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 font-mono">
          Our Track Record
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl uppercase font-display leading-none">
          Engineered Solutions In Action
        </h1>
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          Browse through live client environments and custom application deliverables engineered from the ground up by our enterprise consultancy teams.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 max-w-5xl mx-auto">
        {portfolio.map((item) => (
          <div 
            key={item.id} 
            className="group relative flex flex-col overflow-hidden rounded-none border-2 border-slate-900 bg-white hover:-translate-y-1 transition-all duration-200 geo-shadow-offset"
          >
            {/* Project Image */}
            <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b-2 border-slate-900">
              <img 
                src={item.image} 
                alt={item.title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102" 
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-4 left-4 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-white border-2 border-slate-900 rounded-none shadow-sm font-mono">
                {item.category}
              </span>
            </div>

            {/* Project details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex gap-4 text-[9px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Client: {item.client}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Built: {item.year}</span>
                  </div>
                </div>
                <h3 className="text-base font-black text-slate-900 uppercase font-display tracking-tight group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button 
                  onClick={() => alert(`Redirecting to live preview environment for client: ${item.client}`)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <span>Explore Case Study</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
