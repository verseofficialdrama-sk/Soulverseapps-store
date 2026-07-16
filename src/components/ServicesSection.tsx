import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Code, Smartphone, Brain, Laptop, Calculator, ArrowRight, Zap, Check } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, setActiveTab } = useApp();
  
  // Interactive Calculator State
  const [projectType, setProjectType] = useState<'saas' | 'mobile' | 'ai' | 'website'>('saas');
  const [databaseNeeded, setDatabaseNeeded] = useState(true);
  const [complexity, setComplexity] = useState<'standard' | 'enterprise'>('standard');
  const [pagesCount, setPagesCount] = useState(5);

  const calculateEstimate = () => {
    let base = 0;
    if (projectType === 'saas') base = 2500;
    else if (projectType === 'mobile') base = 1500;
    else if (projectType === 'ai') base = 3000;
    else base = 1000;

    let dbCost = databaseNeeded ? 500 : 0;
    let complexityMultiplier = complexity === 'enterprise' ? 1.5 : 1.0;
    let pagesCost = pagesCount * 120;

    return Math.round((base + dbCost + pagesCost) * complexityMultiplier);
  };

  const getIcon = (iconName: string) => {
    if (iconName === 'Smartphone') return <Smartphone className="h-6 w-6 text-indigo-600" />;
    if (iconName === 'Brain') return <Brain className="h-6 w-6 text-indigo-600" />;
    return <Code className="h-6 w-6 text-indigo-600" />;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      
      {/* Services Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-black text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 font-mono">
          Enterprise Consulting
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl uppercase font-display leading-none">
          Custom Development & Core Engineering
        </h1>
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          Can’t find the exact source code in our marketplace? Our senior full-stack consultants and engineers can assemble custom products tailored to your precise brand benchmarks.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {services.map((srv) => (
          <div 
            key={srv.id} 
            className="p-6 bg-white border-2 border-slate-900 rounded-none flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1 geo-shadow-offset"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-center">
                {getIcon(srv.icon)}
              </div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight font-display">{srv.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
            </div>
            <div className="border-t-2 border-slate-900 pt-4 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Estimate:</span>
              <span className="font-mono font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 border-2 border-indigo-600 rounded-none">{srv.priceEstimate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Project Estimator */}
      <div className="border-2 border-slate-900 bg-white rounded-none p-6 md:p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden geo-shadow-offset">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-[50px] pointer-events-none" />
        
        {/* Left Estimator selectors */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 uppercase font-display">
              <Calculator className="h-5 w-5 text-indigo-600" />
              Dynamic Budget Estimator
            </h3>
            <p className="text-xs text-slate-500 font-medium">Tune the options to get an instant cost evaluation.</p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Core platform choice */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Core Platform Target</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'saas', name: 'SaaS Platform' },
                  { id: 'mobile', name: 'Mobile App' },
                  { id: 'ai', name: 'AI Generator' },
                  { id: 'website', name: 'Web Shop' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProjectType(p.id as any)}
                    className={`py-2 px-3 border-2 font-black uppercase tracking-wider text-[11px] transition-all rounded-none ${
                      projectType === p.id 
                        ? 'bg-slate-900 border-slate-900 text-white' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pages count range */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Estimated View Screens</label>
                <span className="font-mono text-slate-900 font-black">{pagesCount} Screens</span>
              </div>
              <input
                type="range"
                min={2}
                max={25}
                value={pagesCount}
                onChange={(e) => setPagesCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-none appearance-none cursor-pointer accent-slate-900"
              />
            </div>

            {/* Toggle DB */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border-2 border-slate-900 rounded-none">
              <div>
                <p className="text-xs font-black text-slate-900 uppercase">Database & Users Auth</p>
                <p className="text-[10px] text-slate-500 font-medium">Connect cloud hosting & logins</p>
              </div>
              <button
                type="button"
                onClick={() => setDatabaseNeeded(!databaseNeeded)}
                className={`w-10 h-6 flex items-center rounded-none p-1 cursor-pointer transition-all border-2 border-slate-900 ${
                  databaseNeeded ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <div className="h-3 w-3 bg-white rounded-none shadow-sm transform transition-all translate-x-0" style={{ transform: databaseNeeded ? 'translateX(16px)' : 'translateX(0px)' }} />
              </button>
            </div>

            {/* Complexity Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Engineering Standard Complexity</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setComplexity('standard')}
                  className={`py-2 px-3 border-2 font-black uppercase tracking-wider text-[11px] transition-all rounded-none ${
                    complexity === 'standard' 
                      ? 'bg-slate-900 border-slate-900 text-white' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  Standard Startup
                </button>
                <button
                  type="button"
                  onClick={() => setComplexity('enterprise')}
                  className={`py-2 px-3 border-2 font-black uppercase tracking-wider text-[11px] transition-all rounded-none ${
                    complexity === 'enterprise' 
                      ? 'bg-slate-900 border-slate-900 text-white' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  Enterprise Scale
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Cost Summary Stage */}
        <div className="bg-slate-50 border-2 border-slate-900 rounded-none p-6 flex flex-col justify-between text-center space-y-6">
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-black text-indigo-600 tracking-widest font-mono">Calculated Quote Estimate</span>
            <p className="text-4xl font-black text-slate-900 tracking-tight font-display">${calculateEstimate().toLocaleString()}</p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Fully custom project with detailed source code, documentation and deployment setup included.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5 text-left text-[11px] text-slate-600 font-medium">
              <div className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Responsive Design (Figma + Tailwind V4)</span>
              </div>
              <div className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>TypeScript codebase with CJS bundling support</span>
              </div>
              <div className="flex gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>30 Days post-deployment support assistance</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('Contact')}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 animate-pulse"
            >
              <span>Submit Project RFP</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
