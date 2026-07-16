import React, { useState } from 'react';
import { WebsiteSettings } from '../../types';
import { Save, Eye, EyeOff, ShieldCheck, RefreshCw, Key, AlertTriangle, Settings, Layout, Image, Mail, Globe } from 'lucide-react';

interface AdminSettingsProps {
  settings: WebsiteSettings;
  updateSettings: (settings: WebsiteSettings) => void;
  adminEmail: string;
  setAdminEmail: (email: string) => void;
  adminPasscode: string;
  setAdminPasscode: (passcode: string) => void;
  addNotification: (message: string) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  updateSettings,
  adminEmail,
  setAdminEmail,
  adminPasscode,
  setAdminPasscode,
  addNotification
}) => {
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings>({ ...settings });
  const [tempAdminEmail, setTempAdminEmail] = useState(adminEmail);
  const [tempAdminPasscode, setTempAdminPasscode] = useState(adminPasscode);
  const [showPasscode, setShowPasscode] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'sections' | 'channels' | 'seo' | 'security'>('general');

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    addNotification('CMS Configuration saved successfully. Live pages synchronized.');
  };

  const handleSaveAdminCredentials = () => {
    if (!tempAdminEmail || !tempAdminPasscode) {
      addNotification('Error: Email and Passcode are required.');
      return;
    }
    setAdminEmail(tempAdminEmail);
    setAdminPasscode(tempAdminPasscode);
    addNotification('Administrative gateway credentials successfully rotated.');
  };

  const handleSectionToggle = (key: keyof WebsiteSettings['sectionsVisibility']) => {
    setSettingsForm(prev => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [key]: !prev.sectionsVisibility[key]
      }
    }));
  };

  const handleMenuChange = (index: number, field: string, value: string) => {
    const updatedMenu = [...settingsForm.navigationMenu];
    updatedMenu[index] = { ...updatedMenu[index], [field]: value };
    setSettingsForm(prev => ({ ...prev, navigationMenu: updatedMenu }));
  };

  const addMenuItem = () => {
    setSettingsForm(prev => ({
      ...prev,
      navigationMenu: [...prev.navigationMenu, { label: 'New Link', tab: 'Home' }]
    }));
  };

  const removeMenuItem = (index: number) => {
    setSettingsForm(prev => ({
      ...prev,
      navigationMenu: prev.navigationMenu.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in text-xs text-slate-800">
      
      {/* Settings Navigation Tabs */}
      <div className="flex border-b-2 border-slate-900 overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-1.5 py-2 px-4 font-black uppercase tracking-wider border-t-2 border-x-2 rounded-none -mb-[2px] transition-all cursor-pointer ${
            activeTab === 'general'
              ? 'bg-white border-slate-900 text-slate-900'
              : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="h-3.5 w-3.5 text-indigo-600" />
          General Controls
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex items-center gap-1.5 py-2 px-4 font-black uppercase tracking-wider border-t-2 border-x-2 rounded-none -mb-[2px] transition-all cursor-pointer ${
            activeTab === 'sections'
              ? 'bg-white border-slate-900 text-slate-900'
              : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layout className="h-3.5 w-3.5 text-rose-500" />
          Homepage Sections
        </button>
        <button
          onClick={() => setActiveTab('channels')}
          className={`flex items-center gap-1.5 py-2 px-4 font-black uppercase tracking-wider border-t-2 border-x-2 rounded-none -mb-[2px] transition-all cursor-pointer ${
            activeTab === 'channels'
              ? 'bg-white border-slate-900 text-slate-900'
              : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mail className="h-3.5 w-3.5 text-emerald-600" />
          Corporate Channels
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-1.5 py-2 px-4 font-black uppercase tracking-wider border-t-2 border-x-2 rounded-none -mb-[2px] transition-all cursor-pointer ${
            activeTab === 'seo'
              ? 'bg-white border-slate-900 text-slate-900'
              : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="h-3.5 w-3.5 text-cyan-600" />
          SEO & Analytics
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-1.5 py-2 px-4 font-black uppercase tracking-wider border-t-2 border-x-2 rounded-none -mb-[2px] transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-white border-slate-900 text-slate-900'
              : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Key className="h-3.5 w-3.5 text-amber-500" />
          Staff Security Access
        </button>
      </div>

      <form onSubmit={handleSettingsSave} className="space-y-6">
        
        {/* ================= GENERAL CONTROLS ================= */}
        {activeTab === 'general' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b border-slate-200 pb-2">Global Identity Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Website Display Name</label>
                <input
                  type="text"
                  required
                  value={settingsForm.companyName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Logo Headline Text</label>
                <input
                  type="text"
                  required
                  value={settingsForm.logoText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, logoText: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Website Favicon URL</label>
                <input
                  type="text"
                  value={settingsForm.faviconUrl || ''}
                  placeholder="https://images.unsplash.com/... or favicon.ico"
                  onChange={(e) => setSettingsForm({ ...settingsForm, faviconUrl: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Global Logo Image URL (Optional)</label>
                <input
                  type="text"
                  value={settingsForm.logoImage || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, logoImage: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors font-mono"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Global Announcement Header Bar Message (Optional)</label>
                <input
                  type="text"
                  value={settingsForm.announcement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Footer Copyright Attribution Text</label>
                <input
                  type="text"
                  value={settingsForm.copyrightText || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, copyrightText: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>
            </div>

            {/* Navigation Menu CMS Controls */}
            <div className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none space-y-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <h4 className="text-[11px] font-black text-slate-900 uppercase font-mono tracking-wider">Navigation Menu CMS</h4>
                <button
                  type="button"
                  onClick={addMenuItem}
                  className="py-1 px-2.5 bg-slate-950 text-white hover:bg-slate-800 rounded-none text-[10px] font-black uppercase tracking-wider transition-all"
                >
                  + Add Link Item
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {settingsForm.navigationMenu?.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-white border border-slate-200 p-2 rounded-none">
                    <span className="font-mono text-slate-400 font-bold px-1">#{idx+1}</span>
                    <input
                      type="text"
                      placeholder="Label"
                      required
                      value={item.label}
                      onChange={(e) => handleMenuChange(idx, 'label', e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-none px-2 py-1 font-semibold"
                    />
                    <input
                      type="text"
                      placeholder="Routing Tab (e.g. Products, Services)"
                      required
                      value={item.tab}
                      onChange={(e) => handleMenuChange(idx, 'tab', e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-none px-2 py-1 font-mono font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => removeMenuItem(idx)}
                      className="p-1 text-rose-600 hover:text-white hover:bg-rose-600 border border-slate-300 rounded-none transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= HOMEPAGE SECTION VISIBILITY ================= */}
        {activeTab === 'sections' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b border-slate-200 pb-2">Layout & Landing Page Elements Controls</h3>
            
            <p className="text-[11px] text-slate-500 font-semibold leading-normal">
              Directly toggle visibility of landing sections. Changes take effect immediately without modifying source files.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(settingsForm.sectionsVisibility || {}) as Array<keyof WebsiteSettings['sectionsVisibility']>).map((section) => (
                <div key={section} className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  <span className="font-black text-slate-900 capitalize tracking-tight">{section} Section Module</span>
                  <button
                    type="button"
                    onClick={() => handleSectionToggle(section)}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-none border border-slate-900 transition-all ${
                      settingsForm.sectionsVisibility[section]
                        ? 'bg-emerald-600 text-white shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]'
                        : 'bg-rose-600 text-white shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]'
                    }`}
                  >
                    {settingsForm.sectionsVisibility[section] ? '● ACTIVE' : '○ INACTIVE'}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none space-y-4 mt-6">
              <h4 className="text-[11px] font-black text-slate-900 uppercase font-mono tracking-wider">Landing Page Hero & About Custom Copy</h4>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Hero Title Headline</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.heroTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                    className="w-full bg-white border-2 border-slate-900 rounded-none px-3 py-2 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Hero Subtitle Text</label>
                  <textarea
                    rows={2}
                    required
                    value={settingsForm.heroSubtitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                    className="w-full bg-white border-2 border-slate-900 rounded-none px-3 py-2 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Hero Banner Graphic URL</label>
                  <input
                    type="text"
                    value={settingsForm.heroImage || ''}
                    placeholder="https://images.unsplash.com/photo-..."
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroImage: e.target.value })}
                    className="w-full bg-white border-2 border-slate-900 rounded-none px-3 py-2 font-mono font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CORPORATE CHANNELS ================= */}
        {activeTab === 'channels' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b border-slate-200 pb-2">Business Communications & Networks</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Headquarters Address</label>
                <input
                  type="text"
                  required
                  value={settingsForm.contactAddress}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactAddress: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Support Email Coordinates</label>
                <input
                  type="email"
                  required
                  value={settingsForm.supportEmail || settingsForm.contactEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Contact Phone Coordinates</label>
                <input
                  type="text"
                  required
                  value={settingsForm.contactPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Direct WhatsApp Hotline (Format: 1234567890)</label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Official Business Email</label>
                <input
                  type="email"
                  value={settingsForm.businessEmail || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, businessEmail: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Corporate Twitter Channel</label>
                <input
                  type="text"
                  value={settingsForm.twitterUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, twitterUrl: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Official GitHub Hub</label>
                <input
                  type="text"
                  value={settingsForm.githubUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, githubUrl: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Corporate LinkedIn Profile</label>
                <input
                  type="text"
                  value={settingsForm.linkedinUrl || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, linkedinUrl: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= SEO & TELEMETRY ================= */}
        {activeTab === 'seo' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b border-slate-200 pb-2">Meta Engines & Crawler Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">SEO Meta Title Override</label>
                <input
                  type="text"
                  required
                  value={settingsForm.metaTitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, metaTitle: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">SEO Meta Description Override</label>
                <textarea
                  rows={2}
                  required
                  value={settingsForm.metaDescription}
                  onChange={(e) => setSettingsForm({ ...settingsForm, metaDescription: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">SEO Meta Keywords List (Comma-separated)</label>
                <input
                  type="text"
                  required
                  value={settingsForm.metaKeywords}
                  onChange={(e) => setSettingsForm({ ...settingsForm, metaKeywords: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Google Analytics Measurement ID</label>
                <input
                  type="text"
                  value={settingsForm.googleAnalyticsId}
                  placeholder="G-XXXXXXXXXX"
                  onChange={(e) => setSettingsForm({ ...settingsForm, googleAnalyticsId: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors font-mono"
                />
              </div>

              <div className="p-3 bg-slate-100 border border-slate-300 rounded-none flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 uppercase font-mono block">Allow indexing sitemaps</span>
                  <span className="text-[9px] text-slate-400">Forces crawlers to cache layout assets</span>
                </div>
                <input
                  type="checkbox"
                  checked={!settingsForm.maintenanceMode}
                  onChange={() => setSettingsForm(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                  className="h-4 w-4 accent-indigo-600 rounded-none border-2 border-slate-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= SECURITY ACCESS MANAGEMENT ================= */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b border-slate-200 pb-2">Web Admin Access Credentials Rotation</h3>
            
            <div className="p-4 bg-rose-50 border-2 border-rose-900 rounded-none flex gap-3 text-rose-800 items-start">
              <AlertTriangle className="h-5 w-5 shrink-0 text-rose-600" />
              <div className="space-y-1 leading-normal">
                <p className="font-black uppercase tracking-tight text-rose-900 text-xs">Security Access Protocol Active</p>
                <p className="text-[10px] font-bold">
                  These access credentials protect the entire Web Admin Portal. Rotate them periodically to ensure local databases remain protected. Avoid easily guessed values.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Admin Email Coordinate</label>
                <input
                  type="email"
                  required
                  value={tempAdminEmail}
                  onChange={(e) => setTempAdminEmail(e.target.value)}
                  className="w-full bg-white border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:outline-none font-semibold font-mono"
                />
              </div>

              <div className="space-y-1 relative">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Secure Administrative Passcode</label>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    required
                    value={tempAdminPasscode}
                    onChange={(e) => setTempAdminPasscode(e.target.value)}
                    className="w-full bg-white border-2 border-slate-900 rounded-none pl-3.5 pr-10 py-2.5 text-slate-900 focus:outline-none font-semibold font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 cursor-pointer"
                  >
                    {showPasscode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSaveAdminCredentials}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white border-2 border-slate-900 rounded-none text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-[2.5px_2.5px_0px_0px_rgba(244,63,94,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <RefreshCw className="h-3.5 w-3.5 text-rose-500" /> Rotate Access Credentials
              </button>
            </div>
          </div>
        )}

        {/* Save Global Button for forms */}
        {activeTab !== 'security' && (
          <div className="flex justify-end pt-4 border-t-2 border-slate-900">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white border-2 border-slate-900 rounded-none text-[11px] font-black uppercase tracking-wider cursor-pointer shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Save className="h-4 w-4" /> Save Configuration Parameters
            </button>
          </div>
        )}
      </form>

    </div>
  );
};
