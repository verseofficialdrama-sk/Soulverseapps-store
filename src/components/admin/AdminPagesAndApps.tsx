import React, { useState } from 'react';
import { CustomPage, AppItem } from '../../types';
import { FileText, Smartphone, Plus, Trash, Edit3, Save, X, Eye, ToggleLeft, ToggleRight } from 'lucide-react';

interface AdminPagesAndAppsProps {
  customPages: CustomPage[];
  savePage: (page: CustomPage) => void;
  deletePage: (id: string) => void;
  appItems: AppItem[];
  saveAppItem: (app: AppItem) => void;
  deleteAppItem: (id: string) => void;
  addNotification: (message: string) => void;
}

export const AdminPagesAndApps: React.FC<AdminPagesAndAppsProps> = ({
  customPages,
  savePage,
  deletePage,
  appItems,
  saveAppItem,
  deleteAppItem,
  addNotification
}) => {
  const [activeTab, setActiveTab] = useState<'pages' | 'apps'>('pages');
  const [editingPage, setEditingPage] = useState<Partial<CustomPage> | null>(null);
  const [editingApp, setEditingApp] = useState<Partial<AppItem> | null>(null);

  const handleSavePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage?.title || !editingPage?.slug) return;

    const finalPage: CustomPage = {
      id: editingPage.id || 'page-' + Math.random().toString(36).substr(2, 9),
      title: editingPage.title,
      slug: editingPage.slug.toLowerCase().replace(/ /g, '-'),
      content: editingPage.content || '',
      isActive: editingPage.isActive !== undefined ? editingPage.isActive : true,
      createdAt: editingPage.createdAt || new Date().toISOString().split('T')[0]
    };

    savePage(finalPage);
    setEditingPage(null);
  };

  const handleSaveAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp?.name) return;

    const finalApp: AppItem = {
      id: editingApp.id || 'app-' + Math.random().toString(36).substr(2, 9),
      name: editingApp.name,
      description: editingApp.description || '',
      icon: editingApp.icon || 'Smartphone',
      screenshots: editingApp.screenshots || [],
      apkFileUrl: editingApp.apkFileUrl || '',
      apkFileName: editingApp.apkFileName || '',
      playStoreUrl: editingApp.playStoreUrl || '',
      appStoreUrl: editingApp.appStoreUrl || '',
      version: editingApp.version || 'v1.0.0',
      releaseNotes: editingApp.releaseNotes || 'Initial system release.',
      downloadsCount: editingApp.downloadsCount || 0,
      isActive: editingApp.isActive !== undefined ? editingApp.isActive : true,
      landingPageContent: editingApp.landingPageContent || ''
    };

    saveAppItem(finalApp);
    setEditingApp(null);
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs text-slate-800">
      
      {/* Navigation tabs */}
      <div className="flex border-b border-slate-200 gap-4 pb-1">
        <button
          onClick={() => { setActiveTab('pages'); setEditingPage(null); setEditingApp(null); }}
          className={`pb-2 px-1 font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[6px] ${
            activeTab === 'pages' ? 'border-indigo-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Dynamic Custom Pages ({customPages.length})
        </button>
        <button
          onClick={() => { setActiveTab('apps'); setEditingPage(null); setEditingApp(null); }}
          className={`pb-2 px-1 font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[6px] ${
            activeTab === 'apps' ? 'border-rose-500 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Software Store Hub Registry ({appItems.length})
        </button>
      </div>

      {/* ======================= PAGES CMS ======================= */}
      {activeTab === 'pages' && (
        <div className="space-y-6">
          {!editingPage ? (
            <>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Design fully responsive static landing pages without code edits. These appear under your site's domain matching their route key.
                </p>
                <button
                  onClick={() => setEditingPage({ title: '', slug: '', content: '<div className="py-12 text-center"><h1>New Page</h1></div>', isActive: true })}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-none border border-slate-900 text-[10px] font-black uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Create Page
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customPages.map((page) => (
                  <div key={page.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 uppercase font-display">{page.title}</span>
                        <span className={`px-1.5 py-[1px] text-[8px] rounded-none border font-black uppercase ${
                          page.isActive ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-500'
                        }`}>
                          {page.isActive ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-[10px] text-indigo-600 font-mono font-bold mt-1 uppercase">Route: /{page.slug}</p>
                      <p className="text-[9px] text-slate-400 font-mono font-bold mt-0.5">Created: {page.createdAt}</p>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => setEditingPage({ ...page })}
                        className="p-1.5 text-slate-700 bg-white border border-slate-900 rounded-none hover:bg-slate-50 cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deletePage(page.id)}
                        className="p-1.5 text-rose-600 bg-white border border-slate-900 rounded-none hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleSavePageSubmit} className="space-y-4 max-w-2xl bg-white p-5 border-2 border-slate-900 rounded-none shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b border-slate-200 pb-2 flex justify-between items-center">
                <span>Save Dynamic Custom Page Template</span>
                <button type="button" onClick={() => setEditingPage(null)} className="text-slate-400 hover:text-slate-900">
                  <X className="h-4 w-4" />
                </button>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Page Title Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Software Consulting Proposals"
                    value={editingPage.title || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">URL Route Slug (Format: route-key)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., corporate-proposal"
                    value={editingPage.slug || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Custom HTML Content (Responsive JSX template styling supports Tailwind classes)</label>
                  <textarea
                    rows={12}
                    required
                    placeholder="<div className='py-12 bg-white text-center'>\n  <h1 className='text-3xl font-black text-slate-900'>Title</h1>\n</div>"
                    value={editingPage.content || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                    className="w-full bg-slate-900 text-emerald-400 font-mono border-2 border-slate-900 rounded-none px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-300 rounded-none md:col-span-2">
                  <div>
                    <span className="font-bold text-slate-900 uppercase font-mono block">Publish Immediately</span>
                    <span className="text-[9px] text-slate-400">Activates landing page on public routes</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingPage(prev => ({ ...prev, isActive: !prev?.isActive }))}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {editingPage.isActive ? <ToggleRight className="h-8 w-8 text-indigo-600" /> : <ToggleLeft className="h-8 w-8 text-slate-400" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 justify-end border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 border-2 border-slate-900 hover:bg-slate-50 rounded-none font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-none border border-slate-900 font-bold uppercase tracking-wider"
                >
                  Save Dynamic Page
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ======================= HUB REGISTRY ======================= */}
      {activeTab === 'apps' && (
        <div className="space-y-6">
          {!editingApp ? (
            <>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Register downloadable Android APKs, game files, and multi-platform executables. Downloads count are logged automatically.
                </p>
                <button
                  onClick={() => setEditingApp({ name: '', description: '', icon: 'Smartphone', apkFileName: 'application.apk', apkFileUrl: 'https://downloads.soulverse.com/apps/main.apk', version: 'v1.0.0', downloadsCount: 0, isActive: true })}
                  className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-none border border-slate-900 text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                >
                  <Plus className="h-3.5 w-3.5" /> Register App
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appItems.map((app) => (
                  <div key={app.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 uppercase font-display">{app.name}</span>
                        <span className="px-1.5 py-[1px] bg-slate-200 text-slate-700 text-[8px] font-mono font-bold rounded-none">
                          {app.version}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono font-semibold mt-1">File: {app.apkFileName}</p>
                      <p className="text-[10px] text-emerald-600 font-mono font-black mt-0.5">Total Downloads: {app.downloadsCount}</p>
                    </div>

                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => setEditingApp({ ...app })}
                        className="p-1.5 text-slate-700 bg-white border border-slate-900 rounded-none hover:bg-slate-50 cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteAppItem(app.id)}
                        className="p-1.5 text-rose-600 bg-white border border-slate-900 rounded-none hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveAppSubmit} className="space-y-4 max-w-2xl bg-white p-5 border-2 border-slate-900 rounded-none shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b border-slate-200 pb-2 flex justify-between items-center">
                <span>Register / Edit Digital App Record</span>
                <button type="button" onClick={() => setEditingApp(null)} className="text-slate-400 hover:text-slate-900">
                  <X className="h-4 w-4" />
                </button>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Application Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Soulverse Mobile Wallet"
                    value={editingApp.name || ''}
                    onChange={(e) => setEditingApp({ ...editingApp, name: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Version Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., v1.2.5"
                    value={editingApp.version || ''}
                    onChange={(e) => setEditingApp({ ...editingApp, version: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Download Binary File Name</label>
                  <input
                    type="text"
                    required
                    placeholder="wallet-release.apk"
                    value={editingApp.apkFileName || ''}
                    onChange={(e) => setEditingApp({ ...editingApp, apkFileName: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Download Binary Direct URL</label>
                  <input
                    type="text"
                    required
                    placeholder="https://images.soulverse.com/app.apk"
                    value={editingApp.apkFileUrl || ''}
                    onChange={(e) => setEditingApp({ ...editingApp, apkFileUrl: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Application Icon URL / Graphic</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={editingApp.icon || ''}
                    onChange={(e) => setEditingApp({ ...editingApp, icon: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Play Store URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://play.google.com/store/apps/details?id=..."
                    value={editingApp.playStoreUrl || ''}
                    onChange={(e) => setEditingApp({ ...editingApp, playStoreUrl: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">App Store URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://apps.apple.com/app/..."
                    value={editingApp.appStoreUrl || ''}
                    onChange={(e) => setEditingApp({ ...editingApp, appStoreUrl: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Screenshots Carousel URLs (Comma-separated list of image links)</label>
                  <textarea
                    rows={2}
                    placeholder="https://images.unsplash.com/photo-1, https://images.unsplash.com/photo-2"
                    value={Array.isArray(editingApp.screenshots) ? editingApp.screenshots.join(', ') : ''}
                    onChange={(e) => setEditingApp({ ...editingApp, screenshots: e.target.value.split(',').map(url => url.trim()).filter(Boolean) })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Short Description</label>
                  <input
                    type="text"
                    required
                    placeholder="Explain what the app does in one sentence."
                    value={editingApp.description || ''}
                    onChange={(e) => setEditingApp({ ...editingApp, description: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-semibold"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Release Log Notes</label>
                  <textarea
                    rows={3}
                    placeholder="What's new in this compile?"
                    value={editingApp.releaseNotes || ''}
                    onChange={(e) => setEditingApp({ ...editingApp, releaseNotes: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Simulated Download Downloads Counter Override</label>
                  <input
                    type="number"
                    value={editingApp.downloadsCount || 0}
                    onChange={(e) => setEditingApp({ ...editingApp, downloadsCount: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-300 rounded-none">
                  <div>
                    <span className="font-bold text-slate-900 uppercase font-mono block">App Store Active Visibility</span>
                    <span className="text-[9px] text-slate-400">Allows downloads by public visitors</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingApp(prev => ({ ...prev, isActive: !prev?.isActive }))}
                  >
                    {editingApp.isActive ? <ToggleRight className="h-8 w-8 text-indigo-600" /> : <ToggleLeft className="h-8 w-8 text-slate-400" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 justify-end border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 border-2 border-slate-900 hover:bg-slate-50 rounded-none font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-none border border-slate-900 font-bold uppercase tracking-wider"
                >
                  Save Registry Record
                </button>
              </div>
            </form>
          )}
        </div>
      )}

    </div>
  );
};
