import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, Category, BlogPost, ServiceItem, PortfolioItem, 
  WebsiteSettings, Coupon, UserProfile, Order, Review 
} from '../types';
import { 
  INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SERVICES, 
  INITIAL_PORTFOLIO, INITIAL_BLOG, INITIAL_COUPONS, INITIAL_SETTINGS 
} from '../data/initialData';

interface AppContextProps {
  products: Product[];
  categories: Category[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  blogPosts: BlogPost[];
  coupons: Coupon[];
  settings: WebsiteSettings;
  
  // Auth
  currentUser: UserProfile | null;
  registerUser: (name: string, email: string) => Promise<boolean>;
  loginUser: (email: string) => Promise<boolean>;
  loginAdmin: (email: string, passcode: string) => Promise<boolean>;
  adminEmail: string;
  setAdminEmail: (email: string) => void;
  adminPasscode: string;
  setAdminPasscode: (passcode: string) => void;
  logoutUser: () => void;
  verifyEmail: () => void;
  resetPassword: (email: string) => Promise<string>;
  updateProfile: (name: string, avatar?: string) => void;
  
  // Cart & Shopping
  cart: { product: Product; quantity: number }[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCouponCode: () => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
  // Orders
  orders: Order[];
  createOrder: (paymentMethod: string) => Promise<Order>;
  
  // Search & Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategorySlug: string;
  setSelectedCategorySlug: (slug: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  adminLoginOpen: boolean;
  setAdminLoginOpen: (open: boolean) => void;
  
  // CRUD operations (Admin Panel)
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  saveCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  saveService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  saveBlogPost: (blogPost: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  savePortfolio: (portfolio: PortfolioItem) => void;
  deletePortfolio: (id: string) => void;
  saveCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  updateSettings: (settings: WebsiteSettings) => void;
  addReview: (productId: string, rating: number, comment: string) => void;
  
  // Notifications
  notifications: string[];
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage if they exist, otherwise use default seeded data
  const [products, setProducts] = useState<Product[]>(() => {
    const data = localStorage.getItem('soul_products');
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const data = localStorage.getItem('soul_categories');
    return data ? JSON.parse(data) : INITIAL_CATEGORIES;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const data = localStorage.getItem('soul_services');
    return data ? JSON.parse(data) : INITIAL_SERVICES;
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const data = localStorage.getItem('soul_portfolio');
    return data ? JSON.parse(data) : INITIAL_PORTFOLIO;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const data = localStorage.getItem('soul_blog');
    return data ? JSON.parse(data) : INITIAL_BLOG;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const data = localStorage.getItem('soul_coupons');
    return data ? JSON.parse(data) : INITIAL_COUPONS;
  });

  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const data = localStorage.getItem('soul_settings');
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const data = localStorage.getItem('soul_orders');
    return data ? JSON.parse(data) : [];
  });

  // Web Admin Credentials
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem('soul_admin_email') || 'admin@soulverseapps.com';
  });
  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    return localStorage.getItem('soul_admin_passcode') || 'admin@soulverse2026';
  });

  useEffect(() => {
    localStorage.setItem('soul_admin_email', adminEmail);
  }, [adminEmail]);

  useEffect(() => {
    localStorage.setItem('soul_admin_passcode', adminPasscode);
  }, [adminPasscode]);

  // Current logged in user profile (loaded from session or null)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const data = localStorage.getItem('soul_current_user');
    return data ? JSON.parse(data) : null;
  });

  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(() => {
    const data = localStorage.getItem('soul_cart');
    return data ? JSON.parse(data) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const data = localStorage.getItem('soul_wishlist');
    return data ? JSON.parse(data) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  
  // Navigation & Search
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  
  // Notifications
  const [notifications, setNotifications] = useState<string[]>([]);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('soul_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('soul_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('soul_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('soul_portfolio', JSON.stringify(portfolio)); }, [portfolio]);
  useEffect(() => { localStorage.setItem('soul_blog', JSON.stringify(blogPosts)); }, [blogPosts]);
  useEffect(() => { localStorage.setItem('soul_coupons', JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem('soul_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('soul_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('soul_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('soul_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { 
    if (currentUser) {
      localStorage.setItem('soul_current_user', JSON.stringify(currentUser)); 
    } else {
      localStorage.removeItem('soul_current_user');
    }
  }, [currentUser]);

  // Notifications logic
  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev.slice(0, 9)]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Auth Functions
  const registerUser = async (name: string, email: string): Promise<boolean> => {
    const lowerEmail = email.toLowerCase();
    if (lowerEmail === adminEmail.toLowerCase() || lowerEmail.includes('admin')) {
      throw new Error('This email address is reserved for system administration. Standard registrations are not permitted with this email.');
    }
    const profile: UserProfile = {
      id: 'usr-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'user',
      isVerified: false,
      wishlist: [],
      purchasedProducts: []
    };
    setCurrentUser(profile);
    addNotification(`Welcome to Soulverse, ${name}! Please verify your email.`);
    return true;
  };

  const loginUser = async (email: string): Promise<boolean> => {
    const lowerEmail = email.toLowerCase();
    if (lowerEmail === adminEmail.toLowerCase() || lowerEmail.includes('admin')) {
      throw new Error('This administrative account is restricted. Please authenticate using the Web Admin Gateway.');
    }
    const profile: UserProfile = {
      id: 'usr-' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role: 'user',
      isVerified: true,
      wishlist: [],
      purchasedProducts: []
    };
    setCurrentUser(profile);
    addNotification(`Welcome back, ${profile.name}!`);
    return true;
  };

  const loginAdmin = async (email: string, passcode: string): Promise<boolean> => {
    if (email.toLowerCase() === adminEmail.toLowerCase() && passcode === adminPasscode) {
      const profile: UserProfile = {
        id: 'admin-1',
        name: 'Soulverse Admin',
        email: adminEmail,
        role: 'admin',
        isVerified: true,
        wishlist: [],
        purchasedProducts: ['p1', 'p2', 'p3', 'p4']
      };
      setCurrentUser(profile);
      addNotification('Web Admin authenticated successfully. Core systems online.');
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCart([]);
    setAppliedCoupon(null);
    addNotification('Logged out successfully.');
  };

  const verifyEmail = () => {
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, isVerified: true } : null);
      addNotification('Email successfully verified!');
    }
  };

  const resetPassword = async (email: string): Promise<string> => {
    return `Reset link sent to ${email}. Check your inbox.`;
  };

  const updateProfile = (name: string, avatar?: string) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, name, avatar } : null);
      addNotification('Profile updated successfully.');
    }
  };

  // Cart Functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        addNotification(`Increased ${product.name} quantity in cart.`);
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      addNotification(`Added ${product.name} to shopping cart.`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const removed = prev.find(item => item.product.id === productId);
      if (removed) {
        addNotification(`Removed ${removed.product.name} from cart.`);
      }
      return prev.filter(item => item.product.id !== productId);
    });
  };

  const updateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCouponCode = (code: string) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (coupon) {
      setAppliedCoupon(coupon);
      addNotification(`Coupon ${coupon.code} applied successfully!`);
      return { success: true, message: `Success! ${coupon.discountType === 'percentage' ? coupon.discountValue + '%' : '$' + coupon.discountValue} discount applied.` };
    }
    return { success: false, message: 'Invalid or inactive coupon code.' };
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    addNotification('Coupon removed.');
  };

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isWishlisted = prev.includes(productId);
      if (isWishlisted) {
        addNotification('Product removed from wishlist.');
        return prev.filter(id => id !== productId);
      } else {
        addNotification('Product added to wishlist!');
        return [...prev, productId];
      }
    });
  };

  // Orders & Purchases
  const createOrder = async (paymentMethod: string): Promise<Order> => {
    const subtotal = cart.reduce((sum, item) => {
      const itemPrice = item.product.discountPrice ?? item.product.price;
      return sum + (itemPrice * item.quantity);
    }, 0);

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round(subtotal * (appliedCoupon.discountValue / 100));
      } else {
        discount = appliedCoupon.discountValue;
      }
    }

    const total = Math.max(0, subtotal - discount);

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userId: currentUser?.id ?? 'guest',
      userEmail: currentUser?.email ?? 'guest@soulverseapps.com',
      userName: currentUser?.name ?? 'Guest User',
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.discountPrice ?? item.product.price,
        downloadFile: item.product.downloadFile
      })),
      couponUsed: appliedCoupon?.code,
      subtotal,
      discount,
      total,
      paymentMethod,
      paymentStatus: 'completed', // Digital items are instant
      orderStatus: 'completed',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    setOrders(prev => [newOrder, ...prev]);

    // Add purchased products to user profile instantly
    if (currentUser) {
      setCurrentUser(prev => {
        if (!prev) return null;
        const currentPurchases = prev.purchasedProducts || [];
        const newPurchases = [...currentPurchases];
        cart.forEach(item => {
          if (!newPurchases.includes(item.product.id)) {
            newPurchases.push(item.product.id);
          }
        });
        return { ...prev, purchasedProducts: newPurchases };
      });
    }

    clearCart();
    addNotification(`Order ${newOrder.id} generated! Your files are ready to download.`);
    return newOrder;
  };

  // Admin Panel CRUD Functions
  const saveProduct = (product: Product) => {
    setProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        addNotification(`Product "${product.name}" updated successfully.`);
        return prev.map(p => p.id === product.id ? product : p);
      } else {
        addNotification(`Product "${product.name}" added successfully.`);
        return [...prev, product];
      }
    });
  };

  const deleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      addNotification(`Product "${product.name}" deleted.`);
    }
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const saveCategory = (category: Category) => {
    setCategories(prev => {
      const exists = prev.some(c => c.id === category.id);
      if (exists) {
        addNotification(`Category "${category.name}" updated.`);
        return prev.map(c => c.id === category.id ? category : c);
      } else {
        addNotification(`Category "${category.name}" created.`);
        return [...prev, category];
      }
    });
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    addNotification('Category deleted.');
  };

  const saveService = (service: ServiceItem) => {
    setServices(prev => {
      const exists = prev.some(s => s.id === service.id);
      if (exists) {
        return prev.map(s => s.id === service.id ? service : s);
      } else {
        return [...prev, service];
      }
    });
    addNotification(`Service "${service.title}" saved.`);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    addNotification('Service deleted.');
  };

  const saveBlogPost = (blogPost: BlogPost) => {
    setBlogPosts(prev => {
      const exists = prev.some(b => b.id === blogPost.id);
      if (exists) {
        return prev.map(b => b.id === blogPost.id ? blogPost : b);
      } else {
        return [...prev, blogPost];
      }
    });
    addNotification(`Blog post "${blogPost.title}" saved.`);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
    addNotification('Blog post deleted.');
  };

  const savePortfolio = (portfolioItem: PortfolioItem) => {
    setPortfolio(prev => {
      const exists = prev.some(p => p.id === portfolioItem.id);
      if (exists) {
        return prev.map(p => p.id === portfolioItem.id ? portfolioItem : p);
      } else {
        return [...prev, portfolioItem];
      }
    });
    addNotification(`Portfolio item "${portfolioItem.title}" saved.`);
  };

  const deletePortfolio = (id: string) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
    addNotification('Portfolio item deleted.');
  };

  const saveCoupon = (coupon: Coupon) => {
    setCoupons(prev => {
      const exists = prev.some(c => c.code.toUpperCase() === coupon.code.toUpperCase());
      if (exists) {
        return prev.map(c => c.code.toUpperCase() === coupon.code.toUpperCase() ? coupon : c);
      } else {
        return [...prev, coupon];
      }
    });
    addNotification(`Coupon "${coupon.code}" saved.`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code.toUpperCase() !== code.toUpperCase()));
    addNotification('Coupon deleted.');
  };

  const updateSettings = (newSettings: WebsiteSettings) => {
    setSettings(newSettings);
    addNotification('Website settings updated successfully!');
  };

  const addReview = (productId: string, rating: number, comment: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newReview: Review = {
          id: 'rev-' + Math.random().toString(36).substr(2, 9),
          userName: currentUser?.name ?? 'Anonymous Buyer',
          rating,
          comment,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };
        const updatedReviews = [...(p.reviews || []), newReview];
        const newAvgRating = parseFloat(
          (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
        );
        addNotification('Thank you! Your product review has been posted.');
        return {
          ...p,
          reviews: updatedReviews,
          rating: newAvgRating,
          reviewsCount: updatedReviews.length
        };
      }
      return p;
    }));
  };

  return (
    <AppContext.Provider value={{
      products, categories, services, portfolio, blogPosts, coupons, settings,
      currentUser, registerUser, loginUser, logoutUser, verifyEmail, resetPassword, updateProfile,
      loginAdmin, adminEmail, setAdminEmail, adminPasscode, setAdminPasscode,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart, appliedCoupon, applyCouponCode, removeCouponCode,
      wishlist, toggleWishlist,
      orders, createOrder,
      activeTab, setActiveTab, selectedCategorySlug, setSelectedCategorySlug, searchQuery, setSearchQuery, adminLoginOpen, setAdminLoginOpen,
      saveProduct, deleteProduct, saveCategory, deleteCategory, saveService, deleteService,
      saveBlogPost, deleteBlogPost, savePortfolio, deletePortfolio, saveCoupon, deleteCoupon, updateSettings, addReview,
      notifications, addNotification, clearNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
