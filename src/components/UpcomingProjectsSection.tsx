import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, ExternalLink, Sparkles, Clock, Video, Bot, BookOpen, Heart, Tv, CreditCard, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';

interface UpcomingProject {
  id: string;
  name: string;
  website?: string;
  statusText: string;
  isWebsiteCompleted?: boolean;
  isAppUnderDev?: boolean;
  isComingSoon?: boolean;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  accentColor: string;
}

export const UpcomingProjectsSection: React.FC = () => {
  const { settings } = useApp();

  const projects: UpcomingProject[] = [
    {
      id: 'sehr-live',
      name: 'Sehr Live',
      website: 'https://sehrlive.soulverseapps.com',
      statusText: 'Website Completed • Mobile Application Under Development',
      isWebsiteCompleted: true,
      isAppUnderDev: true,
      description: 'Sehr Live is a next-generation live streaming and social entertainment platform developed by SAWAX ENTERPRISES PRIVATE LIMITED. It offers HD live streaming, PK battles, voice rooms, virtual gifts, agencies, creator monetization, premium memberships, and an engaging social entertainment experience.',
      tags: ['HD Live Streaming', 'PK Battles', 'Voice Rooms', 'Virtual Gifts', 'Creator Monetization'],
      icon: <Video className="h-6 w-6 text-emerald-600" />,
      accentColor: 'border-emerald-500 bg-emerald-50 text-emerald-900'
    },
    {
      id: 'vision-x-ai',
      name: 'Vision-X AI',
      website: 'https://vision-x.soulverseapps.com',
      statusText: 'Website Completed • AI Platform Under Development',
      isWebsiteCompleted: true,
      isAppUnderDev: true,
      description: 'Vision-X AI is an advanced artificial intelligence platform focused on AI productivity, automation, content generation, intelligent assistants, business tools, workflow automation, and next-generation AI solutions for individuals and enterprises.',
      tags: ['AI Productivity', 'Content Generation', 'Intelligent Assistants', 'Workflow Automation'],
      icon: <Bot className="h-6 w-6 text-indigo-600" />,
      accentColor: 'border-indigo-500 bg-indigo-50 text-indigo-900'
    },
    {
      id: 'storix',
      name: 'Storix',
      statusText: 'Coming Soon',
      isComingSoon: true,
      description: 'Storix is an AI-powered animated storytelling platform where users can create animated cartoons, AI-generated videos, educational stories, children\'s content, and multilingual visual storytelling.',
      tags: ['AI Storytelling', 'Animated Cartoons', 'AI Video', 'Multilingual Visuals'],
      icon: <BookOpen className="h-6 w-6 text-amber-600" />,
      accentColor: 'border-amber-500 bg-amber-50 text-amber-900'
    },
    {
      id: 'angel-life',
      name: 'Angel Life',
      statusText: 'Coming Soon',
      isComingSoon: true,
      description: 'Angel Life is a modern social networking platform designed to build meaningful relationships, family connections, communities, and positive digital interactions in a safe environment.',
      tags: ['Social Network', 'Family Connections', 'Safe Digital Community', 'Meaningful Tech'],
      icon: <Heart className="h-6 w-6 text-rose-600" />,
      accentColor: 'border-rose-500 bg-rose-50 text-rose-900'
    },
    {
      id: 'dramaverse',
      name: 'DramaVerse',
      statusText: 'Coming Soon',
      isComingSoon: true,
      description: 'DramaVerse is a premium entertainment platform for short dramas, web series, original productions, creator content, and on-demand video streaming.',
      tags: ['Short Dramas', 'Web Series', 'Original Content', 'On-Demand Streaming'],
      icon: <Tv className="h-6 w-6 text-purple-600" />,
      accentColor: 'border-purple-500 bg-purple-50 text-purple-900'
    },
    {
      id: 'cardverse',
      name: 'CardVerse',
      statusText: 'Coming Soon',
      isComingSoon: true,
      description: 'CardVerse is a smart digital identity platform providing virtual business cards, NFC-enabled cards, digital profiles, contact sharing, QR business cards, and professional networking solutions.',
      tags: ['Digital Identity', 'NFC Business Cards', 'Smart Profiles', 'QR Business Cards'],
      icon: <CreditCard className="h-6 w-6 text-cyan-600" />,
      accentColor: 'border-cyan-500 bg-cyan-50 text-cyan-900'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border-2 border-slate-900 text-indigo-700 font-mono text-xs font-black uppercase tracking-widest geo-shadow-offset-sm">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span>SAWAX ENTERPRISES PRIVATE LIMITED</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-5xl uppercase font-display leading-none">
          Upcoming Projects Pipeline
        </h1>
        <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Explore our next-generation ecosystem of live streaming, artificial intelligence, animated storytelling, social networks, and smart identity solutions managed under the <strong>Soulverse Apps</strong> umbrella.
        </p>
      </div>

      {/* Official Enterprise Ownership Notice */}
      <div className="p-6 bg-slate-900 text-white border-2 border-slate-900 rounded-none geo-shadow-offset flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-black uppercase tracking-wider font-display text-white">
              Official Company Endorsement
            </h3>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-3xl">
            All the listed products are official projects of <strong>SAWAX ENTERPRISES PRIVATE LIMITED</strong> (Public Brand: <strong>Soulverse Apps</strong>) and are developed, published, and managed under our official ecosystem.
          </p>
        </div>
        <a
          href="https://soulverseapps.com"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-none inline-flex items-center gap-2 shrink-0 transition-colors border border-indigo-400 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
        >
          <Globe className="h-4 w-4" />
          <span>soulverseapps.com</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border-2 border-slate-900 rounded-none p-6 space-y-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 geo-shadow-offset relative group"
          >
            <div className="space-y-4">
              {/* Card Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="p-3 bg-slate-50 border-2 border-slate-900 rounded-none shrink-0 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  {project.icon}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {project.isComingSoon ? (
                    <span className="px-3 py-1 bg-amber-100 border-2 border-amber-900 text-amber-900 font-mono text-[10px] font-black uppercase tracking-wider rounded-none flex items-center gap-1 shadow-[1.5px_1.5px_0px_0px_rgba(120,53,15,1)]">
                      <Clock className="h-3 w-3" />
                      Coming Soon
                    </span>
                  ) : (
                    <div className="flex flex-col items-end gap-1">
                      {project.isWebsiteCompleted && (
                        <span className="px-2.5 py-0.5 bg-emerald-100 border border-emerald-900 text-emerald-900 font-mono text-[9px] font-black uppercase tracking-wider rounded-none">
                          Website Completed
                        </span>
                      )}
                      {project.isAppUnderDev && (
                        <span className="px-2.5 py-0.5 bg-indigo-100 border border-indigo-900 text-indigo-900 font-mono text-[9px] font-black uppercase tracking-wider rounded-none">
                          Under Development
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase font-display tracking-tight group-hover:text-indigo-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs font-medium text-slate-600 leading-relaxed mt-2.5">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono font-bold bg-slate-100 border border-slate-300 text-slate-700 px-2 py-0.5 rounded-none"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions / Domain Link */}
            <div className="pt-4 border-t-2 border-slate-900 mt-2 space-y-2">
              {project.website ? (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-none flex items-center justify-between transition-all geo-shadow-offset-sm hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <span className="truncate font-mono">{project.website.replace('https://', '')}</span>
                  <ExternalLink className="h-4 w-4 shrink-0 ml-2" />
                </a>
              ) : (
                <div className="w-full py-2 px-3 bg-slate-50 border border-dashed border-slate-300 text-slate-400 font-mono text-[11px] font-bold text-center uppercase tracking-wider">
                  Official URL Launch Pending
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
