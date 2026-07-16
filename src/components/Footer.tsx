import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, Phone, MapPin, Github, Linkedin, Twitter, Facebook, 
  FileText, Shield, ArrowUpRight, Download, Server
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveTab, products } = useApp();
  const [seoTrayOpen, setSeoTrayOpen] = useState(false);

  const generateSitemap = () => {
    const baseUrl = 'https://soulverseapps.com';
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // Core pages
    const paths = ['', '/products', '/services', '/portfolio', '/blog', '/faq', '/privacy', '/terms'];
    paths.forEach(p => {
      xml += `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Product pages
    products.forEach(p => {
      xml += `  <url>\n    <loc>${baseUrl}/products/${p.id}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const generateRobotsTxt = () => {
    return `# Robots.txt for https://soulverseapps.com\nUser-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /cart/checkout\n\nSitemap: https://soulverseapps.com/sitemap.xml`;
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <footer id="app-footer" className="bg-white border-t-4 border-slate-900 mt-20 text-slate-700 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-none bg-slate-900 text-white font-black text-sm border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(16,185,129,1)]">
                S
              </div>
              <span className="text-lg font-black text-slate-900 tracking-widest font-display uppercase">{settings.companyName || 'Soulverse Apps'}</span>
            </div>
            <p className="max-w-xs text-xs text-slate-500 leading-relaxed font-bold">
              Premium marketplace for enterprise mobile apps, AI SaaS blueprints, complete portals, and responsive UI kits. Certified and deployment-ready.
            </p>
            <div className="flex space-x-3">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 text-slate-600 transition-colors bg-slate-50 border-2 border-slate-900 p-1.5 rounded-none shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {settings.twitterUrl && (
                <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 text-slate-600 transition-colors bg-slate-50 border-2 border-slate-900 p-1.5 rounded-none shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {settings.githubUrl && (
                <a href={settings.githubUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 text-slate-600 transition-colors bg-slate-50 border-2 border-slate-900 p-1.5 rounded-none shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5">
                  <Github className="h-4 w-4" />
                </a>
              )}
              {settings.linkedinUrl && (
                <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 text-slate-600 transition-colors bg-slate-50 border-2 border-slate-900 p-1.5 rounded-none shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">Marketplace</h3>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <button onClick={() => setActiveTab('Products')} className="hover:text-slate-950 text-slate-500 hover:underline transition-colors text-xs text-left font-bold uppercase tracking-wider cursor-pointer">
                      Browse Store
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('Services')} className="hover:text-slate-950 text-slate-500 hover:underline transition-colors text-xs text-left font-bold uppercase tracking-wider cursor-pointer">
                      Custom Dev
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('Portfolio')} className="hover:text-slate-950 text-slate-500 hover:underline transition-colors text-xs text-left font-bold uppercase tracking-wider cursor-pointer">
                      Client Portfolio
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('FAQ')} className="hover:text-slate-950 text-slate-500 hover:underline transition-colors text-xs text-left font-bold uppercase tracking-wider cursor-pointer">
                      License & FAQs
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">Company</h3>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <button onClick={() => setActiveTab('AboutUs')} className="hover:text-slate-950 text-slate-500 hover:underline transition-colors text-xs text-left font-bold uppercase tracking-wider cursor-pointer">
                      About Us
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('Blog')} className="hover:text-slate-950 text-slate-500 hover:underline transition-colors text-xs text-left font-bold uppercase tracking-wider cursor-pointer">
                      Insights Blog
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('PrivacyPolicy')} className="hover:text-slate-950 text-slate-500 hover:underline transition-colors text-xs text-left flex items-center gap-1 font-bold uppercase tracking-wider cursor-pointer">
                      <Shield className="h-3.5 w-3.5" /> Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('TermsAndConditions')} className="hover:text-slate-950 text-slate-500 hover:underline transition-colors text-xs text-left flex items-center gap-1 font-bold uppercase tracking-wider cursor-pointer">
                      <FileText className="h-3.5 w-3.5" /> Terms & Conditions
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contacts Column */}
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">Support & Contacts</h3>
              <ul className="mt-4 space-y-3 text-xs text-slate-600 font-bold">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-900 shrink-0 mt-0.5" />
                  <span>{settings.contactAddress}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-900 shrink-0" />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-slate-900 hover:underline transition-colors">{settings.contactEmail}</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-900 shrink-0" />
                  <span>{settings.contactPhone}</span>
                </li>
              </ul>
              
              <div className="mt-4">
                <button 
                  onClick={() => setSeoTrayOpen(!seoTrayOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-slate-900 bg-slate-50 hover:bg-slate-100 text-[11px] text-slate-900 hover:text-slate-950 rounded-none font-black uppercase tracking-wider transition-colors cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Server className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                  <span>SEO & DNS Settings</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Expandable SEO & Server DNS Settings */}
        {seoTrayOpen && (
          <div className="mt-8 p-6 bg-slate-50 border-2 border-slate-900 rounded-none animate-fade-in space-y-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase font-mono">
              <Server className="h-4 w-4 text-emerald-600" />
              Production Deployment & DNS Config (soulverseapps.com)
            </h4>
            
            <p className="text-xs text-slate-500 leading-relaxed font-bold">
              Prepare this applet for deployment on <strong>Cloudflare Pages</strong> or <strong>Cloud Run</strong> mapping to official domain <strong>https://soulverseapps.com</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white border-2 border-slate-900 rounded-none space-y-2">
                <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">Cloudflare DNS Records</h5>
                <table className="w-full text-[11px] text-slate-500">
                  <thead>
                    <tr className="border-b-2 border-slate-900 text-left font-black">
                      <th className="pb-1 uppercase tracking-wider font-mono">Type</th>
                      <th className="pb-1 uppercase tracking-wider font-mono">Name</th>
                      <th className="pb-1 uppercase tracking-wider font-mono">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="font-semibold">
                      <td className="pt-1.5 text-indigo-700 font-mono font-bold">CNAME</td>
                      <td className="pt-1.5 font-mono">@</td>
                      <td className="pt-1.5 font-mono text-slate-700">soulverseapps.pages.dev</td>
                    </tr>
                    <tr className="font-semibold">
                      <td className="pt-1 text-indigo-700 font-mono font-bold">CNAME</td>
                      <td className="pt-1 font-mono">www</td>
                      <td className="pt-1 font-mono text-slate-700">soulverseapps.pages.dev</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-white border-2 border-slate-900 rounded-none flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono mb-1">Generated SEO Crawlers</h5>
                  <p className="text-[11px] text-slate-400 font-bold leading-normal">
                    Download SEO crawl schemas generated according to your actual active product inventory.
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => downloadFile(generateSitemap(), 'sitemap.xml', 'text/xml')}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 rounded-none text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  >
                    <Download className="h-3.5 w-3.5" /> Sitemap.xml
                  </button>
                  <button 
                    onClick={() => downloadFile(generateRobotsTxt(), 'robots.txt', 'text/plain')}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 rounded-none text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  >
                    <Download className="h-3.5 w-3.5" /> Robots.txt
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 border-t-2 border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono uppercase font-bold text-slate-500">
          <p className="text-xs">&copy; {new Date().getFullYear()} {settings.companyName || 'Soulverse Apps'}. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs">
            <span>Powered by</span>
            <span className="text-slate-900 font-black tracking-wider">SOULVERSE ENGINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
