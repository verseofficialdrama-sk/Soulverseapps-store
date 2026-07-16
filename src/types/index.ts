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
  heroTitle: string;
  heroSubtitle: string;
}
