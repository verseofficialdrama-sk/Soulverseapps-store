import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, Category, BlogPost, ServiceItem, PortfolioItem, 
  WebsiteSettings, Coupon, UserProfile, Order, Review,
  CustomPage, AppItem, ContactMessage, NewsletterSubscriber, SupportRequest, MediaFile, StaffUser
} from '../types';
import { 
  INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SERVICES, 
  INITIAL_PORTFOLIO, INITIAL_BLOG, INITIAL_COUPONS, INITIAL_SETTINGS,
  INITIAL_PAGES, INITIAL_APPS, INITIAL_CONTACT_MESSAGES, INITIAL_SUBSCRIBERS,
  INITIAL_SUPPORT_REQUESTS, INITIAL_MEDIA_FILES, INITIAL_STAFF
} from '../data/initialData';

interface AppContextProps {
  products: Product[];
  categories: Category[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  blogPosts: BlogPost[];
  coupons: Coupon[];
  settings: WebsiteSettings;
  
  // New CMS Collections
  customPages: CustomPage[];
  appItems: AppItem[];
  contactMessages: ContactMessage[];
  newsletterSubscribers: NewsletterSubscriber[];
  supportRequests: SupportRequest[];
  mediaFiles: MediaFile[];
  staffUsers: StaffUser[];
  
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
  
  // New CMS CRUD operations
  savePage: (page: CustomPage) => void;
  deletePage: (id: string) => void;
  saveAppItem: (app: AppItem) => void;
  deleteAppItem: (id: string) => void;
  recordAppDownload: (id: string) => void;
  saveContactMessage: (message: ContactMessage) => void;
  deleteContactMessage: (id: string) => void;
  submitContactForm: (name: string, email: string, subject: string, message: string) => Promise<boolean>;
  saveNewsletterSubscriber: (sub: NewsletterSubscriber) => void;
  deleteNewsletterSubscriber: (id: string) => void;
  submitNewsletter: (email: string) => Promise<boolean>;
  saveSupportRequest: (req: SupportRequest) => void;
  deleteSupportRequest: (id: string) => void;
  submitSupportRequest: (subject: string, description: string, priority: 'low' | 'medium' | 'high') => Promise<boolean>;
  replyToSupportRequest: (id: string, message: string, author: string) => void;
  saveMediaFile: (file: MediaFile) => void;
  deleteMediaFile: (id: string) => void;
  saveStaffUser: (user: StaffUser) => void;
  deleteStaffUser: (id: string) => void;
  
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

  // New CMS Collections
  const [customPages, setCustomPages] = useState<CustomPage[]>(() => {
    const data = localStorage.getItem('soul_pages');
    return data ? JSON.parse(data) : INITIAL_PAGES;
  });

  const [appItems, setAppItems] = useState<AppItem[]>(() => {
    const data = localStorage.getItem('soul_apps');
    return data ? JSON.parse(data) : INITIAL_APPS;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const data = localStorage.getItem('soul_messages');
    return data ? JSON.parse(data) : INITIAL_CONTACT_MESSAGES;
  });

  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>(() => {
    const data = localStorage.getItem('soul_subscribers');
    return data ? JSON.parse(data) : INITIAL_SUBSCRIBERS;
  });

  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>(() => {
    const data = localStorage.getItem('soul_support');
    return data ? JSON.parse(data) : INITIAL_SUPPORT_REQUESTS;
  });

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(() => {
    const data = localStorage.getItem('soul_media');
    return data ? JSON.parse(data) : INITIAL_MEDIA_FILES;
  });

  const [staffUsers, setStaffUsers] = useState<StaffUser[]>(() => {
    const data = localStorage.getItem('soul_staff');
    return data ? JSON.parse(data) : INITIAL_STAFF;
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
  useEffect(() => { localStorage.setItem('soul_pages', JSON.stringify(customPages)); }, [customPages]);
  useEffect(() => { localStorage.setItem('soul_apps', JSON.stringify(appItems)); }, [appItems]);
  useEffect(() => { localStorage.setItem('soul_messages', JSON.stringify(contactMessages)); }, [contactMessages]);
  useEffect(() => { localStorage.setItem('soul_subscribers', JSON.stringify(newsletterSubscribers)); }, [newsletterSubscribers]);
  useEffect(() => { localStorage.setItem('soul_support', JSON.stringify(supportRequests)); }, [supportRequests]);
  useEffect(() => { localStorage.setItem('soul_media', JSON.stringify(mediaFiles)); }, [mediaFiles]);
  useEffect(() => { localStorage.setItem('soul_staff', JSON.stringify(staffUsers)); }, [staffUsers]);
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

  // Pages CMS
  const savePage = (page: CustomPage) => {
    setCustomPages(prev => {
      const exists = prev.some(p => p.id === page.id);
      if (exists) {
        addNotification(`Page "${page.title}" updated.`);
        return prev.map(p => p.id === page.id ? page : p);
      } else {
        addNotification(`Page "${page.title}" created.`);
        return [...prev, page];
      }
    });
  };

  const deletePage = (id: string) => {
    setCustomPages(prev => prev.filter(p => p.id !== id));
    addNotification('Custom page deleted.');
  };

  // Apps CMS
  const saveAppItem = (app: AppItem) => {
    setAppItems(prev => {
      const exists = prev.some(a => a.id === app.id);
      if (exists) {
        addNotification(`App "${app.name}" updated.`);
        return prev.map(a => a.id === app.id ? app : a);
      } else {
        addNotification(`App "${app.name}" registered in registry.`);
        return [...prev, app];
      }
    });
  };

  const deleteAppItem = (id: string) => {
    setAppItems(prev => prev.filter(a => a.id !== id));
    addNotification('Application registry item deleted.');
  };

  const recordAppDownload = (id: string) => {
    setAppItems(prev => prev.map(a => a.id === id ? { ...a, downloadsCount: a.downloadsCount + 1 } : a));
    addNotification('Application download initiated successfully.');
  };

  // Contact Messages
  const saveContactMessage = (msg: ContactMessage) => {
    setContactMessages(prev => prev.map(m => m.id === msg.id ? msg : m));
    addNotification('Contact message status updated.');
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages(prev => prev.filter(m => m.id !== id));
    addNotification('Contact message record cleared.');
  };

  const submitContactForm = async (name: string, email: string, subject: string, message: string): Promise<boolean> => {
    const newMsg: ContactMessage = {
      id: 'msg-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    setContactMessages(prev => [newMsg, ...prev]);
    if (settings.notifyOnNewMessage) {
      addNotification(`New inquiry from ${name} on system: "${subject}"`);
    } else {
      addNotification('Thank you! Your message was transmitted to the team.');
    }
    return true;
  };

  // Newsletter
  const saveNewsletterSubscriber = (sub: NewsletterSubscriber) => {
    setNewsletterSubscribers(prev => {
      const exists = prev.some(s => s.id === sub.id || s.email.toLowerCase() === sub.email.toLowerCase());
      if (exists) return prev;
      return [...prev, sub];
    });
  };

  const deleteNewsletterSubscriber = (id: string) => {
    setNewsletterSubscribers(prev => prev.filter(s => s.id !== id));
    addNotification('Newsletter subscription cancelled.');
  };

  const submitNewsletter = async (email: string): Promise<boolean> => {
    const isDup = newsletterSubscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (isDup) {
      addNotification('This email coordinate is already subscribed.');
      return true;
    }
    const newSub: NewsletterSubscriber = {
      id: 'sub-' + Math.random().toString(36).substr(2, 9),
      email,
      subscribedAt: new Date().toISOString().split('T')[0]
    };
    setNewsletterSubscribers(prev => [newSub, ...prev]);
    addNotification('Thank you for subscribing to Soulverse Insights!');
    return true;
  };

  // Support Requests
  const saveSupportRequest = (req: SupportRequest) => {
    setSupportRequests(prev => prev.map(r => r.id === req.id ? req : r));
    addNotification(`Support Request status: ${req.status}`);
  };

  const deleteSupportRequest = (id: string) => {
    setSupportRequests(prev => prev.filter(r => r.id !== id));
    addNotification('Support ticket deleted.');
  };

  const submitSupportRequest = async (subject: string, description: string, priority: 'low' | 'medium' | 'high'): Promise<boolean> => {
    const newReq: SupportRequest = {
      id: 'ticket-' + Math.random().toString(36).substr(2, 9),
      userEmail: currentUser?.email || 'guest@soulverseapps.com',
      userName: currentUser?.name || 'Guest User',
      subject,
      description,
      priority,
      status: 'open',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      replies: []
    };
    setSupportRequests(prev => [newReq, ...prev]);
    if (settings.notifyOnNewSupport) {
      addNotification(`Support ticket raised: "${subject}"`);
    } else {
      addNotification('Support ticket submitted successfully. We are reviewing your issue.');
    }
    return true;
  };

  const replyToSupportRequest = (id: string, message: string, author: string) => {
    setSupportRequests(prev => prev.map(r => {
      if (r.id === id) {
        const newReply = {
          author,
          message,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...r,
          status: 'in-progress' as const,
          replies: [...(r.replies || []), newReply]
        };
      }
      return r;
    }));
    addNotification('Response posted on support ticket.');
  };

  // Media Library
  const saveMediaFile = (file: MediaFile) => {
    setMediaFiles(prev => {
      const exists = prev.some(m => m.id === file.id);
      if (exists) return prev.map(m => m.id === file.id ? file : m);
      return [file, ...prev];
    });
    addNotification(`Media file "${file.name}" registered.`);
  };

  const deleteMediaFile = (id: string) => {
    setMediaFiles(prev => prev.filter(m => m.id !== id));
    addNotification('Media library file removed.');
  };

  // Staff Users
  const saveStaffUser = (user: StaffUser) => {
    setStaffUsers(prev => {
      const exists = prev.some(u => u.id === user.id);
      if (exists) return prev.map(u => u.id === user.id ? user : u);
      return [...prev, user];
    });
    addNotification(`Staff User "${user.name}" updated.`);
  };

  const deleteStaffUser = (id: string) => {
    setStaffUsers(prev => prev.filter(u => u.id !== id));
    addNotification('Staff permission access revoked.');
  };

  return (
    <AppContext.Provider value={{
      products, categories, services, portfolio, blogPosts, coupons, settings,
      customPages, appItems, contactMessages, newsletterSubscribers, supportRequests, mediaFiles, staffUsers,
      currentUser, registerUser, loginUser, logoutUser, verifyEmail, resetPassword, updateProfile,
      loginAdmin, adminEmail, setAdminEmail, adminPasscode, setAdminPasscode,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart, appliedCoupon, applyCouponCode, removeCouponCode,
      wishlist, toggleWishlist,
      orders, createOrder,
      activeTab, setActiveTab, selectedCategorySlug, setSelectedCategorySlug, searchQuery, setSearchQuery, adminLoginOpen, setAdminLoginOpen,
      saveProduct, deleteProduct, saveCategory, deleteCategory, saveService, deleteService,
      saveBlogPost, deleteBlogPost, savePortfolio, deletePortfolio, saveCoupon, deleteCoupon, updateSettings, addReview,
      savePage, deletePage, saveAppItem, deleteAppItem, recordAppDownload,
      saveContactMessage, deleteContactMessage, submitContactForm,
      saveNewsletterSubscriber, deleteNewsletterSubscriber, submitNewsletter,
      saveSupportRequest, deleteSupportRequest, submitSupportRequest, replyToSupportRequest,
      saveMediaFile, deleteMediaFile, saveStaffUser, deleteStaffUser,
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
