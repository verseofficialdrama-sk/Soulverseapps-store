import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Category, Coupon, BlogPost, ServiceItem, PortfolioItem, WebsiteSettings } from '../types';
import { 
  Settings, ShoppingBag, Plus, Trash, Edit3, Save, Check, X, 
  Tag, Layers, FileText, Briefcase, ListFilter, Users, RefreshCw, Star
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products, saveProduct, deleteProduct,
    categories, saveCategory, deleteCategory,
    coupons, saveCoupon, deleteCoupon,
    blogPosts, saveBlogPost, deleteBlogPost,
    services, saveService, deleteService,
    orders, settings, updateSettings, addNotification
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'products' | 'categories' | 'coupons' | 'settings' | 'orders' | 'blogs' | 'services'>('products');

  // Products CRUD State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  // Categories CRUD State
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  // Coupons CRUD State
  const [editingCoupon, setEditingCoupon] = useState<Partial<Coupon> | null>(null);
  // Blog Posts CRUD State
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  // Services CRUD State
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  
  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings>({ ...settings });

  // Handle Settings Save
  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  // Product CRUD Handlers
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

  const handleEditProductClick = (prod: Product) => {
    setEditingProduct({ ...prod });
  };

  const handleCreateProductClick = () => {
    setEditingProduct({
      id: '',
      name: '',
      category: categories[0]?.name || 'AI Projects',
      shortDesc: '',
      description: '',
      features: [],
      price: 0,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      gallery: [],
      screenshots: [],
      version: 'v1.0.0',
      downloadFile: 'source-code.zip',
      isFeatured: false,
      isPopular: false,
      isNewArrival: false,
      isBestSeller: false
    });
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
    { id: 'products', name: 'Products', icon: <ShoppingBag className="h-4 w-4" /> },
    { id: 'categories', name: 'Categories', icon: <Layers className="h-4 w-4" /> },
    { id: 'coupons', name: 'Coupons', icon: <Tag className="h-4 w-4" /> },
    { id: 'blogs', name: 'Blogs', icon: <FileText className="h-4 w-4" /> },
    { id: 'services', name: 'Services', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'orders', name: 'Orders Logs', icon: <Users className="h-4 w-4" /> },
    { id: 'settings', name: 'Site Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 min-h-screen">
      
      {/* Admin Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-900 pb-5 gap-4">
        <div>
          <span className="text-[10px] uppercase font-black text-emerald-700 tracking-wider bg-emerald-50 border border-emerald-300 px-2.5 py-1 font-mono inline-block">CMS Console</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase font-display leading-none pt-2">System Administrative Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Directly manage digital inventory products, categories, discount coupons, sitemaps and invoices.</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <div className="px-3 py-1.5 bg-emerald-50 border-2 border-emerald-600 text-emerald-800 rounded-none text-xs font-bold flex items-center gap-1.5">
            <Check className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>Local Database Synced</span>
          </div>
        </div>
      </div>

      {/* Grid Sub Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSubTab(item.id as any);
              setEditingProduct(null);
              setEditingCategory(null);
              setEditingCoupon(null);
              setEditingBlog(null);
              setEditingService(null);
            }}
            className={`flex items-center gap-2 justify-center py-3 px-3 rounded-none text-xs font-bold uppercase tracking-wider border-2 border-slate-900 transition-all ${
              activeSubTab === item.id
                ? 'bg-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Sub Tabs Content */}
      <div className="bg-white border-2 border-slate-900 rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        
        {/* ================== PRODUCTS MANAGER ================== */}
        {activeSubTab === 'products' && (
          <div className="space-y-6">
            {!editingProduct ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">Products Inventory ({products.length})</h3>
                  <button
                    onClick={handleCreateProductClick}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-none text-xs font-bold uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Product
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700 border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-900 text-slate-500 uppercase text-[10px] tracking-wider font-mono font-black">
                        <th className="py-3 px-2">Image</th>
                        <th className="py-3 px-2">Title</th>
                        <th className="py-3 px-2">Category</th>
                        <th className="py-3 px-2">Price</th>
                        <th className="py-3 px-2">Discount Price</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-2">
                            <img src={p.image} alt={p.name} className="h-10 w-16 object-cover rounded-none border border-slate-900 bg-slate-50" />
                          </td>
                          <td className="py-3.5 px-2 font-black text-slate-900 uppercase font-display">{p.name}</td>
                          <td className="py-3.5 px-2 font-medium">{p.category}</td>
                          <td className="py-3.5 px-2 font-mono font-bold text-slate-900">${p.price.toFixed(2)}</td>
                          <td className="py-3.5 px-2 font-mono text-emerald-600 font-black">
                            {p.discountPrice ? `$${p.discountPrice.toFixed(2)}` : '-'}
                          </td>
                          <td className="py-3.5 px-2 text-right space-x-1.5">
                            <button
                              onClick={() => handleEditProductClick(p)}
                              className="p-1.5 text-slate-700 hover:text-slate-900 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveProduct} className="space-y-4 max-w-3xl">
                <div className="flex justify-between items-center pb-3 border-b-2 border-slate-900">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">
                    {editingProduct.id ? 'Edit Product Package' : 'Create New Digital Product'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="p-1.5 text-slate-700 hover:text-slate-900"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Product Name</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Category Selection</label>
                    <select
                      value={editingProduct.category || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Short Description</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.shortDesc || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Detailed Description Overview</label>
                    <textarea
                      rows={4}
                      value={editingProduct.description || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Regular Price ($)</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Discount Price ($ - Optional)</label>
                    <input
                      type="number"
                      value={editingProduct.discountPrice || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, discountPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Main Cover Image URL</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.image || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Source Zip Download File Name</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.downloadFile || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, downloadFile: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">External Live Demo Link (Optional)</label>
                    <input
                      type="text"
                      value={editingProduct.externalLink || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, externalLink: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Product Version (e.g. v1.0.0)</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.version || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, version: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>
                </div>

                {/* Checklist options */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 border-2 border-slate-900 rounded-none">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 font-bold">
                    <input
                      type="checkbox"
                      checked={editingProduct.isFeatured || false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                      className="accent-slate-900 h-4 w-4 rounded-none cursor-pointer"
                    />
                    <span>Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 font-bold">
                    <input
                      type="checkbox"
                      checked={editingProduct.isPopular || false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isPopular: e.target.checked })}
                      className="accent-slate-900 h-4 w-4 rounded-none cursor-pointer"
                    />
                    <span>Popular</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 font-bold">
                    <input
                      type="checkbox"
                      checked={editingProduct.isNewArrival || false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })}
                      className="accent-slate-900 h-4 w-4 rounded-none cursor-pointer"
                    />
                    <span>New Arrival</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 font-bold">
                    <input
                      type="checkbox"
                      checked={editingProduct.isBestSeller || false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                      className="accent-slate-900 h-4 w-4 rounded-none cursor-pointer"
                    />
                    <span>Best Seller</span>
                  </label>
                </div>

                <div className="flex gap-2.5 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 border-2 border-slate-900 hover:bg-slate-50 rounded-none text-xs text-slate-900 font-black uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-none text-xs font-black uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer"
                  >
                    <Save className="h-4 w-4" /> Save Product Package
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
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">Product Categories ({categories.length})</h3>
                  <button
                    onClick={() => setEditingCategory({ id: '', name: '', icon: 'Code', slug: '' })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-none text-xs font-bold uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((c) => (
                    <div key={c.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase font-display">{c.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5 font-bold">slug: {c.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingCategory({ ...c })}
                          className="p-1.5 text-slate-700 hover:text-slate-900 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCategory(c.id)}
                          className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-650 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveCategory} className="space-y-4 max-w-md">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">
                  {editingCategory.id ? 'Edit Category' : 'Create Category'}
                </h3>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Category Name</label>
                    <input
                      type="text"
                      required
                      value={editingCategory.name || ''}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Lucide Icon (e.g. Laptop, Code)</label>
                    <input
                      type="text"
                      required
                      value={editingCategory.icon || 'Code'}
                      onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="px-4 py-2 border-2 border-slate-900 hover:bg-slate-50 rounded-none text-xs text-slate-900 font-black uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white rounded-none text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    Save Category
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================== COUPONS MANAGER ================== */}
        {activeSubTab === 'coupons' && (
          <div className="space-y-6">
            {!editingCoupon ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">Marketplace Coupons ({coupons.length})</h3>
                  <button
                    onClick={() => setEditingCoupon({ code: '', discountType: 'percentage', discountValue: 0, isActive: true })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-none text-xs font-bold uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Coupon
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coupons.map((c) => (
                    <div key={c.code} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <div>
                        <p className="text-xs font-black text-indigo-700 font-mono uppercase">{c.code}</p>
                        <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                          Value: {c.discountType === 'percentage' ? `${c.discountValue}%` : `$${c.discountValue}`}
                        </p>
                        <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 border border-slate-900 rounded-none mt-2 ${
                          c.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {c.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingCoupon({ ...c })}
                          className="p-1.5 text-slate-700 hover:text-slate-900 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCoupon(c.code)}
                          className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveCoupon} className="space-y-4 max-w-md">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">
                  Save Discount Coupon
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Coupon Code Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FLASH30"
                      value={editingCoupon.code || ''}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Discount Formula</label>
                    <select
                      value={editingCoupon.discountType || 'percentage'}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, discountType: e.target.value as any })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold"
                    >
                      <option value="percentage font-semibold">Percentage Off (%)</option>
                      <option value="fixed font-semibold">Fixed Cash Amount Off ($)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Discount Amount</label>
                    <input
                      type="number"
                      required
                      value={editingCoupon.discountValue || ''}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, discountValue: parseFloat(e.target.value) })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 font-bold">
                    <input
                      type="checkbox"
                      checked={editingCoupon.isActive !== undefined ? editingCoupon.isActive : true}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, isActive: e.target.checked })}
                      className="accent-slate-900 h-4 w-4 rounded-none cursor-pointer"
                    />
                    <span>Coupon is active and redeemable</span>
                  </label>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingCoupon(null)}
                    className="px-4 py-2 border-2 border-slate-900 hover:bg-slate-50 rounded-none text-xs text-slate-900 font-black uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white rounded-none text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    Save Coupon
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================== BLOG POSTS MANAGER ================== */}
        {activeSubTab === 'blogs' && (
          <div className="space-y-6">
            {!editingBlog ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono">Company Insights Blogs ({blogPosts.length})</h3>
                  <button
                    onClick={() => setEditingBlog({ title: '', excerpt: '', content: '', author: 'Soulverse Editor', category: 'AI Projects' })}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-none text-xs font-bold uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Blog Post
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogPosts.map((b) => (
                    <div key={b.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      <div>
                        <p className="text-xs font-black text-slate-900 leading-normal line-clamp-1 uppercase font-display">{b.title}</p>
                        <p className="text-[10px] text-slate-500 font-mono font-bold mt-1 uppercase">Author: {b.author} | Category: {b.category}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setEditingBlog({ ...b })}
                          className="p-1.5 text-slate-700 hover:text-slate-900 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteBlogPost(b.id)}
                          className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveBlog} className="space-y-4 max-w-2xl">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">
                  Save Blog Article
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Article Title</label>
                    <input
                      type="text"
                      required
                      value={editingBlog.title || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Excerpt summary</label>
                    <input
                      type="text"
                      required
                      value={editingBlog.excerpt || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Article Content Text</label>
                    <textarea
                      rows={6}
                      value={editingBlog.content || ''}
                      onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="px-4 py-2 border-2 border-slate-900 hover:bg-slate-50 rounded-none text-xs text-slate-900 font-black uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white rounded-none text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    Save Blog Post
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
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-none text-xs font-bold uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer"
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
                          className="p-1.5 text-slate-700 hover:text-slate-900 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteService(s.id)}
                          className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-650 bg-white border-2 border-slate-900 rounded-none cursor-pointer"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveService} className="space-y-4 max-w-xl">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono border-b-2 border-slate-900 pb-2">
                  Save Consulting Service
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Service Title</label>
                    <input
                      type="text"
                      required
                      value={editingService.title || ''}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Estimate Price Tag</label>
                    <input
                      type="text"
                      required
                      value={editingService.priceEstimate || ''}
                      onChange={(e) => setEditingService({ ...editingService, priceEstimate: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Service Description</label>
                    <textarea
                      rows={3}
                      value={editingService.description || ''}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 border-2 border-slate-900 hover:bg-slate-50 rounded-none text-xs text-slate-900 font-black uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white rounded-none text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================== ORDERS LOGS ================== */}
        {activeSubTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono pb-4 border-b-2 border-slate-900">Purchases & Orders Telemetry ({orders.length})</h3>
            
            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs font-semibold text-slate-500 font-mono">
                No orders logs have been generated yet in this session.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none space-y-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-slate-500 gap-2 pb-2 border-b border-slate-200 font-mono font-bold">
                      <div>
                        <span className="font-black text-slate-900">Order: {ord.id}</span>
                        <span className="mx-2">|</span>
                        <span>{ord.date}</span>
                      </div>
                      <div>
                        <span>Buyer: <strong className="text-slate-900 font-black">{ord.userName}</strong> ({ord.userEmail})</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 font-semibold">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between font-mono">
                          <span>{it.name}</span>
                          <span className="text-slate-900 font-black">${it.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs border-t border-slate-200 pt-2 font-mono font-black text-slate-900">
                      <span className="text-slate-400 font-bold uppercase">Gateway: <strong className="text-emerald-600">{ord.paymentMethod.toUpperCase()}</strong></span>
                      <span className="text-slate-900 font-black">Total Paid: ${ord.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================== GLOBAL SETTINGS ================== */}
        {activeSubTab === 'settings' && (
          <form onSubmit={handleSettingsSave} className="space-y-6 max-w-2xl">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono pb-4 border-b-2 border-slate-900">Global Website Styling & Metadata Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Company Name</label>
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

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Announcement Bar Text (Optional)</label>
                <input
                  type="text"
                  value={settingsForm.announcement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Hero Main Title Headline</label>
                <input
                  type="text"
                  required
                  value={settingsForm.heroTitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Hero Subtitle Paragraph</label>
                <textarea
                  rows={2}
                  required
                  value={settingsForm.heroSubtitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Company Support Email</label>
                <input
                  type="email"
                  required
                  value={settingsForm.contactEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Company Phone number</label>
                <input
                  type="text"
                  required
                  value={settingsForm.contactPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Headquarters Address</label>
                <input
                  type="text"
                  required
                  value={settingsForm.contactAddress}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactAddress: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none font-semibold transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t-2 border-slate-900">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 rounded-none text-xs font-black uppercase tracking-wider cursor-pointer shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Save className="h-4 w-4" /> Save Website Configuration
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
};
