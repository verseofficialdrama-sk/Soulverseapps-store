import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { LoginModal } from './components/LoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { UserProfileSection } from './components/UserProfileSection';
import { Product } from './types';
import { 
  Sparkles, ShieldCheck, Zap, Globe, ArrowRight, Star, 
  HelpCircle, ChevronRight, Laptop, Cpu, Code, Code2, CheckCircle 
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    activeTab, setActiveTab, products, categories, 
    selectedCategorySlug, setSelectedCategorySlug, 
    searchQuery, setSearchQuery, blogPosts,
    adminLoginOpen, setAdminLoginOpen,
    currentUser, customPages, settings
  } = useApp();

  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hash, setHash] = useState(window.location.hash);

  // Router Hash Change Listener
  React.useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isWebAdminRoute = hash === '#/soulverse-admin' || window.location.pathname === '/soulverse-admin';

  // Filter products based on selected tab/search query
  const filteredProducts = products.filter(p => {
    // Category slug filter
    const matchesCategory = selectedCategorySlug === 'all' || 
      p.category.toLowerCase().replace(/ /g, '-') === selectedCategorySlug;
    
    // Search query filter
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(p => p.isFeatured);
  const popularProducts = products.filter(p => p.isPopular);

  // ISOLATED PRIVATE WEB ADMIN PORTAL CMS (NO public Header/Footer rendered)
  if (isWebAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-indigo-600/30">
        {currentUser?.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
            <AdminLoginModal inline />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 font-sans selection:bg-indigo-600/30 selection:text-zinc-300">
      {/* Structural Header */}
      <Header 
        onCartToggle={() => setCartOpen(true)} 
        onLoginToggle={() => setLoginOpen(true)} 
      />

      {/* Main Routed Content Grid */}
      <main className="pb-16">
        {/* HOME ROUTE */}
        {activeTab === 'Home' && (
          <div className="space-y-16">
            {settings.sectionsVisibility?.hero !== false && <Hero />}

            {/* Category Quick Selector Pill Rails */}
            {settings.sectionsVisibility?.categories !== false && (
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-2 mb-6">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest font-mono">Browse Categories</span>
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-300 font-display">Segmented Code Collections</h2>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
                  <button
                    onClick={() => {
                      setSelectedCategorySlug('all');
                      setActiveTab('Products');
                    }}
                    className="px-4 py-2 border-2 border-slate-900 bg-white hover:bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-none transition-all cursor-pointer geo-shadow-offset-sm hover:-translate-y-0.5"
                  >
                    All Products ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategorySlug(cat.slug);
                        setActiveTab('Products');
                      }}
                      className="px-4 py-2 border-2 border-slate-900 bg-white hover:bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-none transition-all cursor-pointer geo-shadow-offset-sm hover:-translate-y-0.5"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Showcase segment */}
            {settings.sectionsVisibility?.featured !== false && featuredProducts.length > 0 && (
              <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest font-mono">Editor Picks</span>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-300 font-display">Featured Code Packages</h2>
                    <p className="text-xs text-zinc-600 mt-1">Our highly optimized starter kits configured with full Stripe and auth services ready.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCategorySlug('all');
                      setActiveTab('Products');
                    }}
                    className="group inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-indigo-600 hover:text-indigo-700 self-start sm:self-auto cursor-pointer"
                  >
                    <span>Browse Store</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProducts.map(p => (
                    <ProductCard 
                      key={p.id} 
                      product={p} 
                      onOpenDetails={(p) => setSelectedProduct(p)} 
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Why Choose Us Enterprise Bento Grid */}
            {settings.sectionsVisibility?.whyUs !== false && (
              <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 py-8 border-t border-slate-200">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest font-mono">The Soulverse Standard</span>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-300 font-display">Why Lead Teams Build with Us</h2>
                  <p className="text-xs text-zinc-600">We maintain zero tolerance for un-optimized code blocks, deprecated dependencies, or layout gaps.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {[
                    { title: 'Slick V4 Modular Styling', desc: 'Crafted using the absolute cleanest Tailwind CSS configuration paradigms for rapid UI alteration.', icon: <Code2 className="h-5 w-5 text-indigo-600" /> },
                    { title: 'Tested Compiler Compliance', desc: 'All Flutter, React, and Android files compile with zero strict deprecation warnings out-of-the-box.', icon: <CheckCircle className="h-5 w-5 text-indigo-600" /> },
                    { title: 'Zero AI Slop telemetry', desc: 'No fake terminal logs, simulated port indicators or useless telemetry elements in your codebase.', icon: <ShieldCheck className="h-5 w-5 text-rose-500" /> }
                  ].map((item, i) => (
                    <div key={i} className="p-6 border-2 border-slate-900 bg-white hover:-translate-y-1 rounded-none space-y-3.5 transition-all duration-200 geo-shadow-offset">
                      <div className="h-10 w-10 bg-slate-50 border border-slate-200 rounded-none flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h3 className="text-xs uppercase font-extrabold text-slate-900 tracking-wide font-display">{item.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Popular products grid */}
            {settings.sectionsVisibility?.popular !== false && popularProducts.length > 0 && (
              <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 py-8 border-t border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest font-mono">Trending Assets</span>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-300 font-display">Highly Popular Items</h2>
                  <p className="text-xs text-zinc-600 mt-1">Our most downloaded admin templates, SaaS boilerplates, and APIs.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularProducts.slice(0, 3).map(p => (
                    <ProductCard 
                      key={p.id} 
                      product={p} 
                      onOpenDetails={(p) => setSelectedProduct(p)} 
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Blog Highlight Snippets */}
            {settings.sectionsVisibility?.blog !== false && blogPosts.length > 0 && (
              <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 py-8 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest font-mono">Engineering Blog</span>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-300 font-display">Latest Lab Tutorials</h2>
                  </div>
                  <button 
                    onClick={() => setActiveTab('Blog')}
                    className="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 self-start sm:self-auto cursor-pointer"
                  >
                    All Articles
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {blogPosts.slice(0, 2).map((post) => (
                    <div 
                      key={post.id} 
                      onClick={() => setActiveTab('Blog')}
                      className="p-6 border-2 border-slate-900 bg-white hover:-translate-y-1 rounded-none space-y-3 cursor-pointer group transition-all duration-200 geo-shadow-offset"
                    >
                      <span className="text-[9px] uppercase font-extrabold text-indigo-600 tracking-wider font-mono">{post.category}</span>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 font-display">{post.title}</h3>
                      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      <div className="pt-2 flex justify-between text-[10px] text-zinc-500 font-mono">
                        <span>By {post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Newsletter CTA container card */}
            {settings.sectionsVisibility?.cta !== false && (
              <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="p-8 md:p-12 border-2 border-slate-900 bg-indigo-600 text-slate-900 rounded-none text-center space-y-4 relative overflow-hidden geo-shadow-offset">
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white font-display">Need a Bespoke Architecture?</h3>
                  <p className="text-xs text-slate-100 max-w-xl mx-auto font-medium">
                    Partner with our senior core engineering teams to construct custom high-performance mobile apps, Web APIs or fully secure AI-powered SaaS templates.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('Services')}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-none inline-flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      <span>Request Custom Proposal</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </section>
            )}

          </div>
        )}

        {/* PRODUCTS ROUTE (DIGITAL STORE) */}
        {activeTab === 'Products' && (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-5 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest font-mono">Digital Catalog</span>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-300 font-display sm:text-4xl">All Code Packages</h1>
                <p className="text-xs text-zinc-600 mt-1">Acquire robust React frameworks, Flutter apps, backend admin panels and AI templates with instant download rights.</p>
              </div>

              {/* Sub categories tabs inside store */}
              <div className="flex flex-wrap gap-1.5 self-start md:self-auto bg-white p-1.5 border-2 border-slate-900 rounded-none text-xs">
                <button
                  onClick={() => setSelectedCategorySlug('all')}
                  className={`px-3 py-1.5 font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                    selectedCategorySlug === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategorySlug(cat.slug)}
                    className={`px-3 py-1.5 font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                      selectedCategorySlug === cat.slug
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Results Banner */}
            {(searchQuery || selectedCategorySlug !== 'all') && (
              <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 text-xs text-zinc-600 rounded-none">
                <p>
                  Showing {filteredProducts.length} results for: {' '}
                  {selectedCategorySlug !== 'all' && <strong className="text-indigo-600 capitalize font-bold">"{selectedCategorySlug.replace(/-/g, ' ')}"</strong>}
                  {searchQuery && <strong className="text-indigo-600 font-bold"> "{searchQuery}"</strong>}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategorySlug('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-indigo-600 hover:underline font-bold uppercase tracking-wider"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Products grid list */}
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center space-y-4 border-2 border-slate-900 border-dashed rounded-none bg-white p-6">
                <p className="text-xs text-zinc-500">No software items correspond to your chosen search criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategorySlug('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-none geo-shadow-offset-sm"
                >
                  Reset Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onOpenDetails={(p) => setSelectedProduct(p)} 
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONSULTING SERVICES ROUTE */}
        {activeTab === 'Services' && <ServicesSection />}

        {/* CLIENT PORTFOLIO ROUTE */}
        {activeTab === 'Portfolio' && <PortfolioSection />}

        {/* INSIGHTS BLOG ROUTE */}
        {activeTab === 'Blog' && <BlogSection />}

        {/* ABOUT US ROUTE */}
        {activeTab === 'AboutUs' && <AboutSection />}

        {/* CONTACT CHANNELS ROUTE */}
        {activeTab === 'Contact' && <ContactSection />}

        {/* Accordion FAQ ROUTE */}
        {activeTab === 'FAQ' && <FAQSection />}

        {/* PRIVACY LEGAL ROUTE */}
        {activeTab === 'PrivacyPolicy' && <PrivacyPolicy />}

        {/* TERMS & CONDITIONS ROUTE */}
        {activeTab === 'TermsAndConditions' && <TermsAndConditions />}

        {/* MASTER CMS ADMIN PANEL */}
        {activeTab === 'Admin' && <AdminDashboard />}

        {/* CLIENT PERSONAL DASHBOARD */}
        {activeTab === 'Profile' && <UserProfileSection />}

        {/* DYNAMIC CMS CUSTOM PAGES */}
        {customPages.some(p => p.slug === activeTab && p.isActive) && (
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 bg-zinc-900 border-2 border-slate-800 text-zinc-300 rounded-none geo-shadow-offset my-8">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-100 font-display mb-6 border-b-2 border-slate-800 pb-4">
              {customPages.find(p => p.slug === activeTab)?.title}
            </h1>
            <div 
              className="prose prose-invert max-w-none text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: customPages.find(p => p.slug === activeTab)?.content || '' 
              }} 
            />
          </div>
        )}

      </main>

      {/* Structural Footer */}
      <Footer />

      {/* ===================== FLOATING OVERLAY DIALOGS ===================== */}
      
      {/* Shopping Cart Drawer sidebar */}
      {cartOpen && (
        <CartDrawer onClose={() => setCartOpen(false)} />
      )}

      {/* Auth Gate modal */}
      {loginOpen && (
        <LoginModal onClose={() => setLoginOpen(false)} />
      )}

      {/* Web Admin Secure Gateway modal */}
      {adminLoginOpen && (
        <AdminLoginModal />
      )}

      {/* Product specs modal lightbox */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
