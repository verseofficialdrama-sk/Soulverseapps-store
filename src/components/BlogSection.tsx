import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import { BookOpen, User, Calendar, Clock, ChevronLeft, ArrowRight, Share2 } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { blogPosts } = useApp();
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const handleShare = (title: string) => {
    alert(`Link copied to clipboard for: "${title}". Share with your developer networks!`);
  };

  if (readingPost) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-6 min-h-screen animate-fade-in">
        <button
          onClick={() => setReadingPost(null)}
          className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-slate-900 bg-white text-xs font-bold text-slate-900 hover:bg-slate-50 rounded-none transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Insights Catalog</span>
        </button>

        <article className="space-y-6 pt-4">
          <div className="space-y-3">
            <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-none font-mono">
              {readingPost.category}
            </span>
            <h1 className="text-3xl font-black text-slate-900 uppercase font-display tracking-tight sm:text-4xl leading-tight">
              {readingPost.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 font-mono font-bold uppercase pt-1">
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-indigo-600" />
                <span>By {readingPost.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                <span>Published {readingPost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-indigo-600" />
                <span>{readingPost.readTime}</span>
              </div>
            </div>
          </div>

          <div className="aspect-[2/1] rounded-none overflow-hidden bg-slate-100 border-2 border-slate-900">
            <img src={readingPost.image} alt={readingPost.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          <div className="max-w-none text-sm text-slate-700 leading-relaxed font-sans space-y-4 pt-4">
            <p className="text-base text-slate-800 font-bold border-l-4 border-indigo-600 pl-4 py-1.5 bg-indigo-50/50 pr-4">
              {readingPost.excerpt}
            </p>
            <div className="space-y-4 font-medium text-slate-600">
              {readingPost.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-slate-900 pt-6 flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase font-mono">Soulverse Insights Team</span>
            <button
              onClick={() => handleShare(readingPost.title)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-xs font-bold uppercase tracking-wider text-white rounded-none flex items-center gap-1.5 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Article</span>
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 min-h-screen">
      
      {/* Blog Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-black text-indigo-600 tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 font-mono">
          Insights & News
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl uppercase font-display leading-none">
          The Soulverse Coding Log
        </h1>
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          Weekly architectural recommendations, full-stack boilerplate guides, UI design concepts, and updates direct from our software engineering labs.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 max-w-5xl mx-auto">
        {blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="group bg-white border-2 border-slate-900 hover:-translate-y-1 rounded-none overflow-hidden flex flex-col justify-between transition-all duration-200 geo-shadow-offset"
          >
            {/* Aspect Cover Image */}
            <div className="aspect-[16/9] overflow-hidden bg-slate-100 border-b-2 border-slate-900">
              <img 
                src={post.image} 
                alt={post.title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102" 
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Snippet Card Detail */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-[9px] uppercase font-black tracking-widest text-indigo-600 font-mono">
                  {post.category}
                </span>
                <h3 className="text-base font-black text-slate-900 uppercase font-display tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              {/* Read trigger */}
              <div className="border-t-2 border-slate-200 pt-4 flex items-center justify-between text-xs text-slate-500 font-mono font-bold uppercase">
                <span>{post.readTime}</span>
                <button
                  onClick={() => setReadingPost(post)}
                  className="flex items-center gap-1 font-black text-xs uppercase tracking-wider text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
