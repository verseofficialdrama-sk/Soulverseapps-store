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
    id: 'p0',
    name: 'Pardais Live - Live Streaming Platform',
    category: 'SaaS Products',
    shortDesc: 'Flagship live streaming application platform operated under SAWAX ENTERPRISES PRIVATE LIMITED. Multi-guest video, PK battles, virtual gifting, and real-time wallet system.',
    description: 'Pardais Live (https://pardaislive.com) is our premier live-streaming ecosystem engineered by SAWAX ENTERPRISES PRIVATE LIMITED. Built for massive scale with real-time WebRTC/RTMP streaming, virtual gift animations, host monetization, admin moderation dashboard, and native Android/iOS mobile applications.',
    features: [
      'High-definition multi-guest video & audio streaming rooms',
      'Interactive host PK battles with real-time scoreboards',
      'Virtual gifting system with integrated wallet & payout engine',
      'Full administrative moderation dashboard and user management',
      'Cross-platform Flutter & native Android app builds'
    ],
    price: 499.00,
    discountPrice: 299.00,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    ],
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    version: 'v3.5.0',
    downloadFile: 'pardais-live-suite-v3.5.0.zip',
    externalLink: 'https://pardaislive.com',
    isFeatured: true,
    isPopular: true,
    isBestSeller: true,
    rating: 5.0,
    reviewsCount: 48,
    reviews: [
      { id: 'pr1', userName: 'Shahid Iqbal', rating: 5, comment: 'Pardais Live is an exceptional platform. Powerful streaming architecture and rock-solid backend.', date: '2026-07-20' }
    ]
  },
  {
    id: 'p1',
    name: 'SoulAI - SaaS Chatbot & Content Generator',
    category: 'AI Projects',
    shortDesc: 'A complete React + Node.js web-based SaaS platform integrated with Gemini API. Multi-tenant with subscription tiers, credit-based usage tracking, and modern UI dashboard.',
    description: 'SoulAI is a production-ready artificial intelligence generator developed by SAWAX ENTERPRISES PRIVATE LIMITED for Soulverse Apps. Allows users to spin up writing assistants, custom coding tools, image generation forms, and conversational agents in minutes.',
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
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    ],
    demoVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    version: 'v2.1.0',
    downloadFile: 'soulai-source-v2.1.0.zip',
    externalLink: 'https://soulverseapps.com',
    isFeatured: true,
    isPopular: true,
    rating: 4.9,
    reviewsCount: 24,
    reviews: [
      { id: 'r1', userName: 'Hamza Khan', rating: 5, comment: 'Incredible codebase from SAWAX ENTERPRISES PRIVATE LIMITED. Clean structure and the Gemini integration is flawless.', date: '2026-06-12' }
    ]
  },
  {
    id: 'p2',
    name: 'VoltDrive - Flutter Cloud Storage App',
    category: 'Android Apps',
    shortDesc: 'Premium Flutter-based cloud storage application mimicking Google Drive with secure local encryption, offline caching, offline folder synchronization, and a beautiful UI.',
    description: 'VoltDrive is a masterclass in modern mobile development published under Soulverse Apps. Engineered in Flutter, it connects to standard cloud endpoints to offer encrypted folder sync, multi-threaded downloads, biometric lock validation, sharing link managers, and smart media catalogs.',
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
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
    ],
    version: 'v1.4.3',
    downloadFile: 'voltdrive-flutter-v1.4.3.zip',
    isFeatured: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 18,
    reviews: []
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
  companyName: 'SAWAX ENTERPRISES PRIVATE LIMITED',
  logoText: 'Soulverse Apps',
  announcement: '🔥 Official Store of SAWAX ENTERPRISES PRIVATE LIMITED — Soulverse Apps & Pardais Live Streaming Platform!',
  contactEmail: 'soulversepk@gmail.com',
  contactPhone: '+92 300 2587667',
  contactAddress: 'Lahore, Pakistan',
  officialWebsite: 'https://soulverseapps.com',
  pardaisLiveWebsite: 'https://pardaislive.com',
  ceoContact: '+92 300 2587667',
  registeredOffice: 'Lahore, Pakistan',
  facebookUrl: 'https://facebook.com/soulverseapps',
  twitterUrl: 'https://twitter.com/soulverseapps',
  githubUrl: 'https://github.com/soulverseapps',
  linkedinUrl: 'https://linkedin.com/company/sawax-enterprises',
  instagramUrl: 'https://instagram.com/soulverseapps',
  youtubeUrl: 'https://youtube.com/soulverseapps',
  heroTitle: 'SAWAX ENTERPRISES PRIVATE LIMITED',
  heroSubtitle: 'Official store for Soulverse Apps & Pardais Live. Custom mobile applications, live streaming software, AI systems, SaaS platforms, and enterprise source code.',
  heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  logoImage: '',
  faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=32&q=80',
  whatsappNumber: '+923002587667',
  businessEmail: 'soulversepk@gmail.com',
  supportEmail: 'soulversepk@gmail.com',
  copyrightText: '© 2026 SAWAX ENTERPRISES PRIVATE LIMITED. All rights reserved.',
  
  navigationMenu: [
    { label: 'Home', tab: 'Home' },
    { label: 'Store', tab: 'Products' },
    { label: 'Upcoming', tab: 'UpcomingProjects' },
    { label: 'Consulting', tab: 'Services' },
    { label: 'Portfolio', tab: 'Portfolio' },
    { label: 'Insights', tab: 'Blog' },
    { label: 'FAQ', tab: 'FAQ' },
    { label: 'About', tab: 'AboutUs' },
    { label: 'Contact', tab: 'Contact' }
  ],
  
  sectionsVisibility: {
    hero: true,
    categories: true,
    featured: true,
    whyUs: true,
    popular: true,
    blog: true,
    cta: true
  },

  metaTitle: 'Soulverse Apps | SAWAX ENTERPRISES PRIVATE LIMITED',
  metaDescription: 'Official website & digital store for SAWAX ENTERPRISES PRIVATE LIMITED. Publishers of Soulverse Apps and Pardais Live streaming platform.',
  metaKeywords: 'SAWAX ENTERPRISES PRIVATE LIMITED, Soulverse Apps, Pardais Live, Android Apps, iOS Apps, Live Streaming, SaaS, Source Code',
  googleAnalyticsId: 'UA-12345678-9',
  
  smtpHost: 'smtp.soulverseapps.com',
  smtpPort: 587,
  smtpUser: 'soulversepk@gmail.com',
  smtpPass: '••••••••••••••••',
  smtpSenderEmail: 'soulversepk@gmail.com',
  
  notifyOnNewOrder: true,
  notifyOnNewMessage: true,
  notifyOnNewSupport: true,
  
  ipWhitelist: '',
  maintenanceMode: false
};

export const INITIAL_PAGES: any[] = [
  {
    id: 'page1',
    title: 'About SAWAX ENTERPRISES PRIVATE LIMITED',
    slug: 'about-us',
    content: 'SAWAX ENTERPRISES PRIVATE LIMITED is the legal company behind Soulverse Apps.<br/><br/>Soulverse Apps is our official digital application store where we develop, publish, distribute, and sell digital products including mobile applications, websites, source code, UI kits, AI products, SaaS platforms, APIs, subscriptions, and digital assets.<br/><br/>Pardais Live (https://pardaislive.com) is our flagship live-streaming application operated under SAWAX ENTERPRISES PRIVATE LIMITED.<br/><br/><strong>Registered Office:</strong> Lahore, Pakistan<br/><strong>CEO Contact:</strong> +92 300 2587667<br/><strong>Official Store Email:</strong> soulversepk@gmail.com',
    isActive: true,
    createdAt: '2026-01-01'
  },
  {
    id: 'page2',
    title: 'Privacy Policy',
    slug: 'privacy',
    content: 'At SAWAX ENTERPRISES PRIVATE LIMITED (Soulverse Apps), accessible via https://soulverseapps.com, user privacy and code security are paramount. We process client data exclusively to deliver instant software downloads, issue developer licenses, and provide technical support.',
    isActive: true,
    createdAt: '2026-01-01'
  },
  {
    id: 'page3',
    title: 'Terms of Service',
    slug: 'terms',
    content: 'All digital products, source codes, live streaming licenses (including Pardais Live), and software builds delivered by SAWAX ENTERPRISES PRIVATE LIMITED are subject to single or enterprise developer licensing terms. Contact soulversepk@gmail.com for enterprise inquiries.',
    isActive: true,
    createdAt: '2026-01-01'
  }
];

export const INITIAL_APPS: any[] = [
  {
    id: 'app0',
    name: 'Pardais Live - Live Streaming App',
    description: 'Flagship live-streaming mobile application operated under SAWAX ENTERPRISES PRIVATE LIMITED. HD multi-guest audio/video rooms, PK battles, virtual gifts, host monetization, and real-time chat.',
    icon: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=128&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    ],
    apkFileUrl: '/downloads/pardais-live-v3.5.apk',
    apkFileName: 'pardais-live-v3.5.apk',
    playStoreUrl: 'https://pardaislive.com',
    appStoreUrl: 'https://pardaislive.com',
    version: 'v3.5.0',
    releaseNotes: 'Official release of Pardais Live with enhanced multi-guest video streaming and gift animation acceleration.',
    downloadsCount: 15400,
    isActive: true,
    landingPageContent: '# Pardais Live\nOfficial flagship live streaming platform operated by SAWAX ENTERPRISES PRIVATE LIMITED. Visit https://pardaislive.com for complete live streaming features.'
  },
  {
    id: 'app1',
    name: 'SoulAI Native - Android Assistant',
    description: 'Fully responsive Android client built in Kotlin & Jetpack Compose interfacing with our cloud chatbot modules. Features voice commands, dynamic chats, and home widgets.',
    icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
    ],
    apkFileUrl: '/downloads/soulai-native-v1.0.apk',
    apkFileName: 'soulai-native-v1.0.apk',
    playStoreUrl: 'https://soulverseapps.com',
    appStoreUrl: 'https://soulverseapps.com',
    version: 'v1.0.2',
    releaseNotes: 'Initial stable release with full Gemini 2.5 context optimization and robust streaming text controls.',
    downloadsCount: 1420,
    isActive: true,
    landingPageContent: '# SoulAI Mobile App\nExperience ultimate intelligence right on your Android phone. Fully optimized layout, biometric locks, widgets, and offline history cache.'
  }
];

export const INITIAL_CONTACT_MESSAGES: any[] = [
  {
    id: 'msg1',
    name: 'Tariq Mahmood',
    email: 'tariq@lahoreventures.pk',
    subject: 'Custom AI SaaS Platform Quote',
    message: 'Hello SAWAX ENTERPRISES PRIVATE LIMITED, we are interested in deploying a private-label version of your Pardais Live streaming platform matching our custom enterprise database. Can you schedule a consultation regarding backend integrations?',
    date: '2026-07-15 10:45 AM',
    isRead: false
  }
];

export const INITIAL_SUBSCRIBERS: any[] = [
  { id: 'sub1', email: 'junaid.tech@gmail.com', subscribedAt: '2026-07-10' },
  { id: 'sub2', email: 'kate.wilson@saasbuilder.io', subscribedAt: '2026-07-12' },
  { id: 'sub3', email: 'developer.rashid@outlook.com', subscribedAt: '2026-07-16' }
];

export const INITIAL_SUPPORT_REQUESTS: any[] = [
  {
    id: 'ticket1',
    userEmail: 'rashid.pk@outlook.com',
    userName: 'Rashid Mahmood',
    subject: 'Pardais Live streaming build license',
    description: 'Hello, I completed the transaction for Pardais Live streaming package. Transaction reference is soul-trx-9841.',
    priority: 'high',
    status: 'open',
    date: '2026-07-16 08:30 AM',
    replies: []
  }
];

export const INITIAL_MEDIA_FILES: any[] = [
  { id: 'med1', name: 'soulai-banner.jpg', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', type: 'image', size: '142 KB', uploadedAt: '2026-07-10' },
  { id: 'med2', name: 'pardaislive-banner.png', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', type: 'image', size: '198 KB', uploadedAt: '2026-07-12' }
];

export const INITIAL_STAFF: any[] = [
  { id: 'stf1', name: 'SAWAX Executive Administrator', email: 'soulversepk@gmail.com', role: 'admin', status: 'active', permissions: ['all'] },
  { id: 'stf2', name: 'SAWAX Development Lead', email: 'soulversepk@gmail.com', role: 'editor', status: 'active', permissions: ['manage_products', 'manage_apps', 'manage_blog'] }
];

