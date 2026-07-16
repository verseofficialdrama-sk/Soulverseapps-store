import { Product, Category, BlogPost, ServiceItem, PortfolioItem, WebsiteSettings, Coupon } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Android Apps', icon: 'Smartphone', slug: 'android-apps' },
  { id: '2', name: 'iOS Apps', icon: 'Tablet', slug: 'ios-apps' },
  { id: '3', name: 'AI Projects', icon: 'Brain', slug: 'ai-projects' },
  { id: '4', name: 'SaaS Products', icon: 'Layers', slug: 'saas-products' },
  { id: '5', name: 'Websites & Templates', icon: 'Layout', slug: 'websites-templates' },
  { id: '6', name: 'UI Kits', icon: 'Palette', slug: 'ui-kits' },
  { id: '7', name: 'APIs & Admin Panels', icon: 'Code', slug: 'apis-admin' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'SoulAI - SaaS Chatbot & Content Generator',
    category: 'AI Projects',
    shortDesc: 'A complete React + Node.js web-based SaaS platform integrated with Gemini API. Multi-tenant with subscription tiers, credit-based usage tracking, and modern UI dashboard.',
    description: 'SoulAI is a production-ready artificial intelligence generator that allows users to spin up writing assistants, custom coding tools, image generation forms, and conversational agents in minutes. It features full backend telemetry, stripe-ready checkout flows (integrated with our simulated system), automated pricing plans, and an interactive workspace interface.',
    features: [
      'Gemini 2.5 Flash & Pro integrations built-in',
      'Interactive chats with context history storage',
      'Advanced code generation and playground sandbox',
      'User-friendly rich text editor with markdown rendering',
      'Robust administration dashboard for usage limits'
    ],
    price: 149.00,
    discountPrice: 99.00,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    version: 'v2.1.0',
    downloadFile: 'soulai-source-v2.1.0.zip',
    externalLink: 'https://soulverseapps.com/demos/soulai',
    isFeatured: true,
    isPopular: true,
    rating: 4.9,
    reviewsCount: 24,
    reviews: [
      { id: 'r1', userName: 'Hamza Khan', rating: 5, comment: 'Incredible codebase. Clean structure and the Gemini integration is flawless.', date: '2026-06-12' },
      { id: 'r2', userName: 'Sarah Jenkins', rating: 5, comment: 'Saved me 100+ hours of boilerplate. Built my own startup with this.', date: '2026-07-01' }
    ]
  },
  {
    id: 'p2',
    name: 'VoltDrive - Flutter Cloud Storage App',
    category: 'Android Apps',
    shortDesc: 'Premium Flutter-based cloud storage application mimicking Google Drive with secure local encryption, offline caching, offline folder synchronization, and a beautiful UI.',
    description: 'VoltDrive is a masterclass in modern mobile development. Engineered in Flutter, it connects to standard cloud endpoints to offer encrypted folder sync, multi-threaded downloads, biometric lock validation, sharing link managers, and smart media catalogs. Suitable for launching a personal storage business or integrating into existing corporate tools.',
    features: [
      'Stunning cross-platform design (iOS & Android compatible)',
      'Offline file accessibility with local caching layers',
      'Encrypted folder vaults for password-protected uploads',
      'Direct link-sharing generator with expiry configurations',
      'Automatic sync backups over secure channels'
    ],
    price: 89.00,
    discountPrice: 49.00,
    image: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?auto=format&fit=crop&w=800&q=80'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    ],
    version: 'v1.4.3',
    downloadFile: 'voltdrive-flutter-v1.4.3.zip',
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 18,
    reviews: [
      { id: 'r3', userName: 'Zayn Malik', rating: 5, comment: 'The UI is extremely premium, animations are super smooth on both Android and iOS!', date: '2026-05-20' }
    ]
  },
  {
    id: 'p3',
    name: 'Aura Commerce - Next.js Headless storefront',
    category: 'Websites & Templates',
    shortDesc: 'A lightning-fast React storefront using Next.js 15 App Router, Tailwind CSS, Stripe integration, complex search filters, and an optimized performance score.',
    description: 'Aura Commerce provides developers and business owners with the speed of static rendering coupled with serverless dynamics. Perfect for scaling webshops, it includes search auto-suggest, detailed category filter boards, custom cart sidebars, user profile history dashboards, and localized multi-currency support.',
    features: [
      '99+ Google Lighthouse performance scoring',
      'State-of-the-art Next.js Server Components and Suspense hooks',
      'Elegant product search with autocomplete indexers',
      'Tailwind CSS layout matching modern fashion and tech aesthetics',
      'Instant client cart recalculation engine'
    ],
    price: 129.00,
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    version: 'v1.0.0',
    downloadFile: 'aura-commerce-v1.0.0.zip',
    externalLink: 'https://soulverseapps.com/demos/auracommerce',
    isPopular: true,
    isBestSeller: true,
    rating: 4.7,
    reviewsCount: 12,
    reviews: []
  },
  {
    id: 'p4',
    name: 'Nexus Admin - React Dashboard UI Template',
    category: 'APIs & Admin Panels',
    shortDesc: 'A professional and clean React Admin Panel with extensive data charts, analytical metrics, user role management pages, and full responsive sidebar views.',
    description: 'Nexus Admin is a powerful, design-focused dashboard dashboard. Built to simplify the process of spinning up management modules, it has robust component setups for data grids, user access control tables, system log panels, finance tracking visualizers, and fully responsive multi-view rails.',
    features: [
      'Full Recharts visualizations with customizable scales',
      'Elegant client-side search, sort, and pagination filters',
      'Dark/Light toggle integrations matching native setups',
      'Compact layouts for rich telemetry display'
    ],
    price: 39.00,
    discountPrice: 24.00,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    ],
    version: 'v3.2.1',
    downloadFile: 'nexus-admin-dashboard-v3.2.1.zip',
    isNewArrival: true,
    rating: 4.6,
    reviewsCount: 15,
    reviews: []
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Custom Mobile App Development',
    description: 'Tailored Android and iOS solutions designed for performance, built using Flutter, Kotlin, or Swift. We specialize in rich UI, real-time sync, offline features, and push notification triggers.',
    icon: 'Smartphone',
    priceEstimate: 'Starting from $1,500'
  },
  {
    id: 's2',
    title: 'Enterprise Web SaaS Platforms',
    description: 'High-performance React/Next.js platforms featuring secure auth gates, custom subscription plans, robust database architectures (Firestore/Postgres), and elegant layouts.',
    icon: 'Layout',
    priceEstimate: 'Starting from $2,500'
  },
  {
    id: 's3',
    title: 'AI & Machine Learning Implementations',
    description: 'Empower your apps with custom chatbot agents, recommendation indexes, generative AI APIs, and intelligent data pipeline categorization systems.',
    icon: 'Brain',
    priceEstimate: 'Starting from $3,000'
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port1',
    title: 'CareSync - Digital Health iOS App',
    category: 'iOS Apps',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    client: 'CareSync Healthcare LLC',
    year: '2025',
    description: 'A comprehensive medical tracking and patient scheduling system that lets users connect securely with consulting physicians.'
  },
  {
    id: 'port2',
    title: 'Finflow - SaaS Accounting Platform',
    category: 'SaaS Products',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    client: 'Finflow Global',
    year: '2026',
    description: 'An AI-powered accounting companion designed for remote agencies to calculate tax, generate invoices, and log team expenses.'
  }
];

export const INITIAL_BLOG: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to Integrate Gemini AI into your React and Node SaaS Platforms',
    excerpt: 'AI is no longer optional. Learn how to securely bridge the Google GenAI SDK with server endpoints to deliver intelligent chatbots.',
    content: 'The rapid emergence of Generative AI has transformed software expectations. In this detailed guide, we showcase step-by-step how to initialize the @google/genai SDK, structure context instructions to guide Gemini 2.5 Flash, manage token limits effectively, and secure keys server-side to prevent exposing them in the browser. Using a proxy router is highly advised to avoid API token leaks. We also cover dynamic markdown rendering and streaming setups.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    category: 'AI Projects',
    author: 'Engr. Junaid',
    date: 'July 10, 2026',
    readTime: '6 min read'
  },
  {
    id: 'b2',
    title: 'Optimizing Next.js for Stellar Lighthouse and SEO Scores',
    excerpt: 'Speed dictates search ranking. Discover how headless storefront structures can decrease time-to-first-byte and boost organic visits.',
    content: 'Building beautiful layouts is secondary to satisfying fast loading constraints. By configuring Next.js Server Components, optimizing media formats, lazy loading large modules, and adding standard JSON-LD schema tags, modern sites can achieve flawless 99+ Lighthouse metrics. We lay out the exact asset configuration files, server-side caching rules, and CDN setups that power our modern SaaS templates.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'Websites & Templates',
    author: 'Ayesha Ahmed',
    date: 'June 28, 2026',
    readTime: '8 min read'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'SOULWELCOME', discountType: 'percentage', discountValue: 15, isActive: true },
  { code: 'ENTERPRISE30', discountType: 'fixed', discountValue: 30, isActive: true }
];

export const INITIAL_SETTINGS: WebsiteSettings = {
  companyName: 'Soulverse Apps',
  logoText: 'Soulverse',
  announcement: '🔥 Summer Deal: Use coupon code SOULWELCOME to save 15% on any digital product source code!',
  contactEmail: 'support@soulverseapps.com',
  contactPhone: '+92 300 1234567',
  contactAddress: 'Floor 4, TechHub Complex, Islamabad, Pakistan',
  facebookUrl: 'https://facebook.com/soulverseapps',
  twitterUrl: 'https://twitter.com/soulverseapps',
  githubUrl: 'https://github.com/soulverseapps',
  linkedinUrl: 'https://linkedin.com/company/soulverseapps',
  heroTitle: 'Enterprise Software & Digital Products Marketplace',
  heroSubtitle: 'Build and scale your next digital venture with our production-ready source code, custom apps, AI platforms, and enterprise solutions.'
};
