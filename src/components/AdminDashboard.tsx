import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Category, Coupon, BlogPost, ServiceItem, PortfolioItem, WebsiteSettings } from '../types';
import { 
  Settings, ShoppingBag, Plus, Trash, Edit3, Save, Check, X, 
  Tag, Layers, FileText, Briefcase, ListFilter, Users, RefreshCw, Star,
  Database, Image, HelpCircle, Mail, AlertTriangle, Eye, ShieldCheck, Download, ExternalLink, MessageSquare, Key, PlusCircle, Laptop, Radio, Layout, Smartphone, Shield
} from 'lucide-react';

// Import modular CMS sub-components
import { AdminSettings } from './admin/AdminSettings';
import { AdminCRM } from './admin/AdminCRM';
import { AdminPagesAndApps } from './admin/AdminPagesAndApps';
import { AdminMediaAndStaff } from './admin/AdminMediaAndStaff';

export const AdminDashboard: React.FC = () => {
  const {
    products, saveProduct, deleteProduct,
    categories, saveCategory, deleteCategory,
    coupons, saveCoupon, deleteCoupon,
    blogPosts, saveBlogPost, deleteBlogPost,
    services, saveService, deleteService,
    orders, settings, updateSettings, addNotification,
    currentUser, adminEmail, setAdminEmail, adminPasscode, setAdminPasscode,
    
    // New CMS collections and operations
    customPages, savePage, deletePage,
    appItems, saveAppItem, deleteAppItem,
    contactMessages, saveContactMessage, deleteContactMessage,
    newsletterSubscribers, deleteNewsletterSubscriber,
    supportRequests, saveSupportRequest, deleteSupportRequest, replyToSupportRequest,
    mediaFiles, saveMediaFile, deleteMediaFile,
    staffUsers, saveStaffUser, deleteStaffUser,
    logoutUser
  } = useApp();

  // Strict Admin Guard Check
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center space-y-6">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-widest font-mono">ACCESS RESTRICTED</h1>
        <p className="text-xs text-slate-500 font-bold max-w-md mx-auto leading-relaxed">
          The requested administration console is locked. Decryption credentials must be authorized through the Web Admin Gateway to view system status.
        </p>
      </div>
    );
  }

  type CMSSubTab = 
    | 'products' 
    | 'categories' 
    | 'services' 
    | 'blogs' 
    | 'pages' 
    | 'apps' 
    | 'media' 
    | 'crm' 
    | 'staff' 
    | 'settings' 
    | 'orders' 
    | 'coupons';

  const [activeSubTab, setActiveSubTab] = useState<CMSSubTab>('settings');

  // Local CRUD State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Partial<Coupon> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);

  // Products CRUD Handlers
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.category) return;
    
    const finalProduct: Product = {
      id: editingProduct.id || 'p-' + Math.random().toString(36).substr(2, 9),
      name: editingProduct.name,
      category: editingProduct.category,
      shortDesc: editingProduct.shortDesc || '',
      description: editingProduct.description || '',
      features: editingProduct.features || [],
      price: editingProduct.price || 0,
      discountPrice: editingProduct.discountPrice || undefined,
      image: editingProduct.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      gallery: editingProduct.gallery || [],
      screenshots: editingProduct.screenshots || [],
      demoVideo: editingProduct.demoVideo || '',
      version: editingProduct.version || 'v1.0.0',
      downloadFile: editingProduct.downloadFile || 'source-code.zip',
      externalLink: editingProduct.externalLink || '',
      isFeatured: editingProduct.isFeatured || false,
      isPopular: editingProduct.isPopular || false,
      isNewArrival: editingProduct.isNewArrival || false,
      isBestSeller: editingProduct.isBestSeller || false,
      rating: editingProduct.rating || 5.0,
      reviewsCount: editingProduct.reviewsCount || 0,
      reviews: editingProduct.reviews || []
    };

    saveProduct(finalProduct);
    setEditingProduct(null);
  };

  // Category CRUD Handlers
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) return;

    const finalCategory: Category = {
      id: editingCategory.id || 'cat-' + Math.random().toString(36).substr(2, 9),
      name: editingCategory.name,
      icon: editingCategory.icon || 'Code',
      slug: editingCategory.slug || editingCategory.name.toLowerCase().replace(/ /g, '-')
    };

    saveCategory(finalCategory);
    setEditingCategory(null);
  };

  // Coupon CRUD Handlers
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon?.code || !editingCoupon?.discountValue) return;

    const finalCoupon: Coupon = {
      code: editingCoupon.code.toUpperCase(),
      discountType: editingCoupon.discountType || 'percentage',
      discountValue: editingCoupon.discountValue,
      isActive: editingCoupon.isActive !== undefined ? editingCoupon.isActive : true
    };

    saveCoupon(finalCoupon);
    setEditingCoupon(null);
  };

  // Service CRUD Handlers
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) return;

    const finalService: ServiceItem = {
      id: editingService.id || 'srv-' + Math.random().toString(36).substr(2, 9),
      title: editingService.title,
      description: editingService.description || '',
      icon: editingService.icon || 'Smartphone',
      priceEstimate: editingService.priceEstimate || 'Contact for Pricing'
    };

    saveService(finalService);
    setEditingService(null);
  };

  // Blog CRUD Handlers
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title) return;

    const finalBlog: BlogPost = {
      id: editingBlog.id || 'b-' + Math.random().toString(36).substr(2, 9),
      title: editingBlog.title,
      excerpt: editingBlog.excerpt || '',
      content: editingBlog.content || '',
      image: editingBlog.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      category: editingBlog.category || 'AI Projects',
      author: editingBlog.author || 'Soulverse Writer',
      date: editingBlog.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: editingBlog.readTime || '5 min read'
    };

    saveBlogPost(finalBlog);
    setEditingBlog(null);
  };

  const navItems = [
    { id: 'settings', name: 'Web CMS controls', icon: <Settings className="h-4 w-4 text-indigo-600" /> },
    { id: 'pages', name: 'Dynamic Pages', icon: <Layout className="h-4 w-4 text-cyan-600" /> },
    { id: 'apps', name: 'Software Hub', icon: <Smartphone className="h-4 w-4 text-rose-500" /> },
    { id: 'media', name: 'Media Library', icon: <Image className="h-4 w-4 text-emerald-500" /> },
    { id: 'crm', name: 'CRM & Inbox', icon: <MessageSquare className="h-4 w-4 text-amber-500" /> },
    { id: 'staff', name: 'Staff permissions', icon: <Shield className="h-4 w-4 text-rose-600" /> },
    { id: 'products', name: 'Store Products', icon: <ShoppingBag className="h-4 w-4 text-slate-700" /> },
    { id: 'categories', name: 'Categories', icon: <Layers className="h-4 w-4 text-slate-700" /> },
    { id: 'services', name: 'Consulting', icon: <Briefcase className="h-4 w-4 text-slate-700" /> },
    { id: 'blogs', name: 'Insights Blog', icon: <FileText className="h-4 w-4 text-slate-700" /> },
    { id: 'orders', name: 'Orders Logs', icon: <Users className="h-4 w-4 text-slate-700" /> },
    { id: 'coupons', name: 'Coupons', icon: <Tag className="h-4 w-4 text-slate-700" /> }
  ];

  const handleTabClick = (tabId: CMSSubTab) => {
    setActiveSubTab(tabId);
    setEditingProduct(null);
    setEditingCategory(null);
    setEditingCoupon(null);
    setEditingBlog(null);
    setEditingService(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 min-h-screen text-slate-800">
      
      {/* Admin Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-900 pb-5 gap-4">
        <div>
          <span className="text-[10px] uppercase font-black text-emerald-700 tracking-wider bg-emerald-50 border border-emerald-300 px-2.5 py-1 font-mono inline-block">CMS Console</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase font-display leading-none pt-2">SOULVERSE CMS & SYSTEM ADMINISTRATIVE PANEL</h1>
          <p className="text-xs text-slate-500 font-bold mt-1">Configure sections visibility, landing copies, dynamic routes, communications inbox, downloadable apk hub, and billing logs dynamically.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => {
              logoutUser();
              window.location.hash = '';
            }}
            className="px-3.5 py-1.5 bg-rose-600 text-white font-black uppercase text-[10px] tracking-wider rounded-none border border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:bg-rose-500 cursor-pointer"
          >
            Logout admin
          </button>
        </div>
      </div>

      {/* Grid Sub Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id as CMSSubTab)}
            className={`flex items-center gap-2 justify-center py-2.5 px-3 rounded-none text-[10px] font-black uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer ${
              activeSubTab === item.id
                ? 'bg-slate-950 text-white shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)]'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Sub Tabs Content Wrapper */}
      <div className="bg-white border-2 border-slate-900 p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        
        {/* ===================== SETTINGS TAB ===================== */}
        {activeSubTab === 'settings' && (
          <AdminSettings
            settings={settings}
            updateSettings={updateSettings}
            adminEmail={adminEmail}
            setAdminEmail={setAdminEmail}
            adminPasscode={adminPasscode}
            setAdminPasscode={setAdminPasscode}
            addNotification={addNotification}
          />
        )}

        {/* ===================== CRM INBOX TAB ===================== */}
        {activeSubTab === 'crm' && (
          <AdminCRM
            contactMessages={contactMessages}
            saveContactMessage={saveContactMessage}
            deleteContactMessage={deleteContactMessage}
            newsletterSubscribers={newsletterSubscribers}
            deleteNewsletterSubscriber={deleteNewsletterSubscriber}
            supportRequests={supportRequests}
            saveSupportRequest={saveSupportRequest}
            deleteSupportRequest={deleteSupportRequest}
            replyToSupportRequest={replyToSupportRequest}
          />
        )}

        {/* ===================== PAGES & APPS TAB ===================== */}
        {activeSubTab === 'pages' && (
          <AdminPagesAndApps
            customPages={customPages}
            savePage={savePage}
            deletePage={deletePage}
            appItems={appItems}
            saveAppItem={saveAppItem}
            deleteAppItem={deleteAppItem}
            addNotification={addNotification}
          />
        )}

        {activeSubTab === 'apps' && (
          <AdminPagesAndApps
            customPages={customPages}
            savePage={savePage}
            deletePage={deletePage}
            appItems={appItems}
            saveAppItem={saveAppItem}
            deleteAppItem={deleteAppItem}
            addNotification={addNotification}
          />
        )}

        {/* ===================== MEDIA & STAFF TAB ===================== */}
        {activeSubTab === 'media' && (
          <AdminMediaAndStaff
            mediaFiles={mediaFiles}
            saveMediaFile={saveMediaFile}
            deleteMediaFile={deleteMediaFile}
            staffUsers={staffUsers}
            saveStaffUser={saveStaffUser}
            deleteStaffUser={deleteStaffUser}
            addNotification={addNotification}
          />
        )}

        {activeSubTab === 'staff' && (
          <AdminMediaAndStaff
            mediaFiles={mediaFiles}
            saveMediaFile={saveMediaFile}
            deleteMediaFile={deleteMediaFile}
            staffUsers={staffUsers}
            saveStaffUser={saveStaffUser}
            deleteStaffUser={deleteStaffUser}
            addNotification={addNotification}
          />
        )}

        {/* ================== PRODUCTS MANAGER ================== */}
        {activeSubTab === 'products' && (
          <div className="space-y-6">
            {!editingProduct ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">Store Products list ({products.length})</h3>
                  <button
                    onClick={() => setEditingProduct({ name: '', category: categories[0]?.name || 'Web Panels', price: 19, shortDesc: '', description: '', version: 'v1.0.0' })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-none text-xs font-bold uppercase border border-slate-900 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Product
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase font-display">{p.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono font-bold mt-1 uppercase">Price: ${p.price} | Category: {p.category}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setEditingProduct({ ...p })}
                          className="p-1.5 text-slate-700 hover:text-slate-900 bg-white border border-slate-900 rounded-none cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-rose-600 hover:text-rose-850 bg-white border border-slate-900 rounded-none cursor-pointer"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveProduct} className="space-y-4 max-w-xl text-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">
                  Save Product Template
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Product Name</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Category</label>
                    <select
                      value={editingProduct.category || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-2 py-2 font-mono font-black uppercase text-[10px]"
                    >
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Price ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Version Code</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.version || 'v1.0.0'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, version: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 font-mono"
                    />
                  </div>

                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Short Description</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.shortDesc || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 border-2 border-slate-900 rounded-none font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white border-2 border-slate-900 rounded-none font-bold uppercase"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================== CATEGORIES MANAGER ================== */}
        {activeSubTab === 'categories' && (
          <div className="space-y-6">
            {!editingCategory ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">Product Categories list ({categories.length})</h3>
                  <button
                    onClick={() => setEditingCategory({ name: '', icon: 'Code', slug: '' })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-none text-xs font-bold uppercase border border-slate-900 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((c) => (
                    <div key={c.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase font-display">{c.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono font-bold mt-1 uppercase">Slug: /{c.slug}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setEditingCategory({ ...c })}
                          className="p-1.5 text-slate-700 bg-white border border-slate-900 rounded-none"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCategory(c.id)}
                          className="p-1.5 text-rose-600 bg-white border border-slate-900 rounded-none"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveCategory} className="space-y-4 max-w-xl text-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">
                  Save Category Template
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Category Name</label>
                    <input
                      type="text"
                      required
                      value={editingCategory.name || ''}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">URL Route Slug</label>
                    <input
                      type="text"
                      placeholder="e.g. dynamic-web-apps"
                      value={editingCategory.slug || ''}
                      onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 font-mono"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="px-4 py-2 border-2 border-slate-900 rounded-none font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border-2 border-slate-900 text-white rounded-none font-bold uppercase"
                  >
                    Save Category
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================== SERVICES MANAGER ================== */}
        {activeSubTab === 'services' && (
          <div className="space-y-6">
            {!editingService ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">Corporate Consulting Services ({services.length})</h3>
                  <button
                    onClick={() => setEditingService({ title: '', description: '', icon: 'Smartphone', priceEstimate: 'Starting from $1,500' })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-none text-xs font-bold uppercase border border-slate-900 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((s) => (
                    <div key={s.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase font-display">{s.title}</p>
                        <p className="text-[10px] text-slate-500 font-mono font-bold mt-1 uppercase">Estimate: {s.priceEstimate}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setEditingService({ ...s })}
                          className="p-1.5 text-slate-700 hover:text-slate-900 bg-white border border-slate-900 rounded-none"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteService(s.id)}
                          className="p-1.5 text-rose-600 bg-white border border-slate-900 rounded-none cursor-pointer"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveService} className="space-y-4 max-w-xl text-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">
                  Save Consulting Service
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Service Title</label>
                    <input
                      type="text"
                      required
                      value={editingService.title || ''}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Estimate Price Tag</label>
                    <input
                      type="text"
                      required
                      value={editingService.priceEstimate || ''}
                      onChange={(e) => setEditingService({ ...editingService, priceEstimate: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Service Description</label>
                    <textarea
                      rows={3}
                      value={editingService.description || ''}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 border-2 border-slate-900 rounded-none font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border-2 border-slate-900 text-white rounded-none font-bold uppercase"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================== INSIGHTS BLOGS ================== */}
        {activeSubTab === 'blogs' && (
          <div className="space-y-6">
            {!editingBlog ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">Insights Blogs list ({blogPosts.length})</h3>
                  <button
                    onClick={() => setEditingBlog({ title: '', excerpt: '', content: '', author: 'System Admin Staff' })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-none text-xs font-bold uppercase border border-slate-900 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Blog Post
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogPosts.map((b) => (
                    <div key={b.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase font-display">{b.title}</p>
                        <p className="text-[10px] text-slate-500 font-mono font-bold mt-1 uppercase">Author: {b.author} | Date: {b.date}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setEditingBlog({ ...b })}
                          className="p-1.5 text-slate-700 bg-white border border-slate-900 rounded-none"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteBlogPost(b.id)}
                          className="p-1.5 text-rose-600 bg-white border border-slate-900 rounded-none cursor-pointer"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveBlog} className="space-y-4 max-w-xl text-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">
                  Save Blog Post
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Blog Title</label>
                    <input
                      type="text"
                      required
                      value={editingBlog.title || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Excerpt Summary</label>
                    <input
                      type="text"
                      required
                      value={editingBlog.excerpt || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Content Markdown/HTML Body</label>
                    <textarea
                      rows={8}
                      required
                      value={editingBlog.content || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 font-mono"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="px-4 py-2 border-2 border-slate-900 rounded-none font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border-2 border-slate-900 text-white rounded-none font-bold uppercase"
                  >
                    Save Post
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================== ORDERS TELEMETRY ================== */}
        {activeSubTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono pb-4 border-b-2 border-slate-900 font-display">Purchases & Orders Telemetry ({orders.length})</h3>
            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs font-semibold text-slate-500 font-mono border-2 border-dashed border-slate-200">
                No orders logged yet.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none space-y-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-mono text-[11px]">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-black text-slate-900">Order Ref: {ord.id}</span>
                      <span className="text-slate-400">{ord.date}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Buyer:</span> {ord.userName} ({ord.userEmail})
                    </div>
                    <div className="space-y-1 border-t border-b border-slate-150 py-2">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-slate-600 font-mono">
                          <span>• {it.name}</span>
                          <span className="text-slate-900 font-black">${it.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs font-black text-slate-900">
                      <span className="text-emerald-600">Gateway: {ord.paymentMethod.toUpperCase()}</span>
                      <span>Total: ${ord.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================== COUPONS ================== */}
        {activeSubTab === 'coupons' && (
          <div className="space-y-6">
            {!editingCoupon ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">Discount Coupons list ({coupons.length})</h3>
                  <button
                    onClick={() => setEditingCoupon({ code: '', discountType: 'percentage', discountValue: 10, isActive: true })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-none text-xs font-bold uppercase border border-slate-900 cursor-pointer animate-fade-in"
                  >
                    <Plus className="h-4 w-4" /> Add Coupon
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coupons.map((c) => (
                    <div key={c.code} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] animate-fade-in">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 uppercase font-mono text-sm tracking-wider">{c.code}</span>
                          <span className={`px-1 text-[8px] font-black uppercase rounded-none border ${
                            c.isActive ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-500'
                          }`}>
                            {c.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono mt-1 font-bold uppercase">
                          Discount: {c.discountValue}{c.discountType === 'percentage' ? '%' : ' USD'}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setEditingCoupon({ ...c })}
                          className="p-1.5 text-slate-700 bg-white border border-slate-900 rounded-none cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCoupon(c.code)}
                          className="p-1.5 text-rose-600 bg-white border border-slate-900 rounded-none cursor-pointer"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveCoupon} className="space-y-4 max-w-xl text-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">
                  Save Discount Coupon Key
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Coupon Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SPECIAL50"
                      value={editingCoupon.code || ''}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 font-mono uppercase font-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Discount Type</label>
                    <select
                      value={editingCoupon.discountType || 'percentage'}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, discountType: e.target.value as any })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-2 py-2 font-mono font-black uppercase text-[10px]"
                    >
                      <option value="percentage">PERCENTAGE (%)</option>
                      <option value="fixed">FIXED CASH AMOUNT ($)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono">Discount Value</label>
                    <input
                      type="number"
                      required
                      value={editingCoupon.discountValue || 0}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, discountValue: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2 font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-300 rounded-none mt-4">
                    <div>
                      <span className="font-bold text-slate-900 uppercase font-mono block text-[10px]">Active Status</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={editingCoupon.isActive !== undefined ? editingCoupon.isActive : true}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, isActive: e.target.checked })}
                      className="h-4 w-4 accent-indigo-600 border-2 border-slate-900"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingCoupon(null)}
                    className="px-4 py-2 border-2 border-slate-900 rounded-none font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border-2 border-slate-900 text-white rounded-none font-bold uppercase"
                  >
                    Save Coupon
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
