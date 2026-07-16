export interface Product {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  description: string;
  features: string[];
  price: number;
  discountPrice?: number;
  image: string;
  gallery: string[];
  screenshots: string[];
  demoVideo?: string;
  version: string;
  downloadFile: string;
  externalLink?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewsCount: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  count?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  wishlist: string[]; // Product IDs
  purchasedProducts: string[]; // Product IDs
  isVerified?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: {
    id: string;
    name: string;
    price: number;
    downloadFile: string;
  }[];
  couponUsed?: string;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'processing' | 'completed' | 'cancelled';
  date: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  isActive: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  priceEstimate: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  year: string;
  description: string;
}

export interface WebsiteSettings {
  companyName: string;
  logoText: string;
  announcement: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  facebookUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  logoImage?: string;
  faviconUrl?: string;
  whatsappNumber?: string;
  businessEmail?: string;
  supportEmail?: string;
  copyrightText?: string;
  
  // Navigation Menu (JSON stringified array or direct structure)
  navigationMenu: { label: string; tab: string; isExternal?: boolean; url?: string }[];
  
  // Homepage Sections visibility toggles
  sectionsVisibility: {
    hero: boolean;
    categories: boolean;
    featured: boolean;
    whyUs: boolean;
    popular: boolean;
    blog: boolean;
    cta: boolean;
  };

  // SEO & Analytics
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId: string;
  
  // SMTP settings
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  smtpSenderEmail?: string;
  
  // Notification settings
  notifyOnNewOrder: boolean;
  notifyOnNewMessage: boolean;
  notifyOnNewSupport: boolean;
  
  // Security
  ipWhitelist?: string;
  maintenanceMode: boolean;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

export interface AppItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  screenshots: string[];
  apkFileUrl?: string;
  apkFileName?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  version: string;
  releaseNotes: string;
  downloadsCount: number;
  isActive: boolean;
  landingPageContent?: string; // Rich-text/Markdown for landing page
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  replyText?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface SupportRequest {
  id: string;
  userEmail: string;
  userName: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  date: string;
  replies?: { author: string; message: string; date: string }[];
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'other';
  size: string;
  uploadedAt: string;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'suspended';
  permissions: string[];
}

