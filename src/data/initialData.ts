import {
  SiteSettings,
  HeroSectionData,
  AboutSectionData,
  StatItem,
  SkillItem,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  ServiceItem,
  ProcessStepItem,
  TestimonialItem,
  AchievementItem,
  BlogPostItem,
  ContactMessageItem,
  MediaItem,
  RedirectItem,
  ActivityLogItem,
  AnalyticsData,
  FaqItem,
  CVVersionItem,
  CustomPageItem,
  SubscriberItem,
  NotFoundLogItem,
  AdminNotification,
  User,
} from '../types';

export const initialSiteSettings: SiteSettings = {
  siteName: 'Sameer Habib | Full Stack Developer',
  ownerName: 'Sameer Habib',
  roleTitle: 'Full Stack Developer (Laravel & React.js)',
  bio: 'Performance-driven Full-Stack Developer with 3+ years of experience delivering 20+ enterprise solutions for government and financial sectors. Expert in the Laravel ecosystem (Reverb, Sanctum, Passport) and React.js, with a proven track record of optimizing database performance by up to 45%. Specialized in architecting secure APIs and high-concurrency systems for mission-critical portals, including SBTE and Bank Askari. Highly proficient in AI-driven development workflows to maximize code quality and delivery speed.',
  location: 'Karachi, Pakistan',
  email: 'sameerhabib72@gmail.com',
  phone: '+92-311-280-2870',
  availability: 'Available for Opportunities',
  cvUrl: '/downloads/Sameer_Habib_Full_Stack_Developer_CV.pdf',
  cvFileName: 'Sameer_Habib_Full_Stack_Developer_CV.pdf',
  siteUrl: 'https://sameerhabib.dev',
  githubUrl: 'https://github.com/sameerhabib72',
  linkedinUrl: 'https://linkedin.com/in/sameer-habib',
  twitterUrl: 'https://x.com/sameerhabib',
  whatsappUrl: 'https://wa.me/923112802870',
  metaTitle: 'Sameer Habib | Full Stack Developer (Laravel & React.js)',
  metaDescription: 'Performance-driven Full-Stack Developer with 3+ years of experience delivering 20+ enterprise solutions for government and financial sectors (SBTE, Bank Askari, Idemitsu, Sindh TTB).',
  keywords: [
    'Sameer Habib',
    'Full Stack Developer',
    'Laravel Developer',
    'React.js Developer',
    'Next.js',
    'PHP Developer',
    'SBTE Portal',
    'Bank Askari CMS',
    'Idemitsu Lubricants',
    'Sindh TTB',
    'Hunar Foundation',
    'Karachi Full Stack Developer',
    'Database Performance Optimization',
    'Redis Caching'
  ],
  ogImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  indexNowApiKey: 'sh-indexnow-prod-key-2026',
  googleSearchConsoleVerification: 'google-site-verification=sh-gsc-verified-portfolio-2026',
  bingWebmasterVerification: 'bing-site-verification=sh-bing-portfolio-token-2026',
  emailNotificationSettings: {
    enabled: true,
    notificationEmail: 'sameerhabib72@gmail.com',
    notifyOnContact: true,
    notifyOnAiInquiry: true,
  },
  footerSettings: {
    brandTitle: 'Sameer Habib',
    brandTagline: 'Senior Full Stack Developer',
    brandDescription: 'Engineering robust web applications, e-commerce architectures, and responsive digital products with Laravel, PHP, React.js, and Next.js.',
    brandBadge: 'Code • Build • Scale',
    showAvailabilityBadge: true,
    exploreTitle: 'Explore',
    showAiAssistantLink: true,
    exploreLinks: [
      { id: 'exp-1', label: 'About Narrative', url: '#about' },
      { id: 'exp-2', label: 'Technical Skills', url: '#skills' },
      { id: 'exp-3', label: 'Work Experience', url: '#experience' },
      { id: 'exp-4', label: 'Featured Projects', url: '#projects' },
      { id: 'exp-5', label: 'Engineering Services', url: '#services' },
      { id: 'exp-6', label: 'Development Process', url: '#process' }
    ],
    caseStudiesTitle: 'Case Studies',
    caseStudiesLinks: [
      { id: 'cs-1', label: 'Livshem (E-Commerce)', url: 'project:livshem' },
      { id: 'cs-2', label: 'The Designs Firm', url: 'project:the-designs-firm' },
      { id: 'cs-3', label: 'College Library System', url: 'project:college-library-system' },
      { id: 'cs-4', label: 'Work Experience', url: '#experience' }
    ],
    connectTitle: 'Connect',
    showGithub: true,
    showLinkedin: true,
    showTwitter: true,
    showEmail: true,
    showWhatsapp: true,
    showCvDownloadButton: true,
    cvButtonText: 'Download Active CV',
    copyrightText: '© 2026 Sameer Habib. All rights reserved.',
    locationTag: 'Pakistan',
    showAdminLink: true,
    showBackToTop: true,
    backToTopText: 'Back to Top'
  }
};

export const initialHeroData: HeroSectionData = {
  badge: "👋 Available for Opportunities • Full-Stack Developer",
  heading: 'Sameer Habib',
  subtitle: 'Full Stack Developer (Laravel & React.js)',
  rotatingRoles: [
    'Full Stack Developer (Laravel & React.js)',
    'Enterprise Solutions (SBTE & Bank Askari)',
    'Laravel Specialist (Reverb, Sanctum, Passport)',
    'High-Concurrency Systems & REST APIs',
    'Database Performance Optimizer (-45% Latency)',
    'AI-Driven Development Velocity'
  ],
  description: 'Performance-driven Full-Stack Developer with 3+ years of experience delivering 20+ enterprise solutions for government and financial sectors. Expert in the Laravel ecosystem (Reverb, Sanctum, Passport) and React.js, with a proven track record of optimizing database performance by up to 45%. Specialized in architecting secure APIs and high-concurrency systems for mission-critical portals, including SBTE and Bank Askari.',
  primaryCtaText: 'View Enterprise Work →',
  secondaryCtaText: "Download Resume / CV →",
  terminalLines: [
    { text: '$ whoami', status: 'info' },
    { text: 'Sameer Habib — Full Stack Developer (Laravel & React.js) | Karachi, Pakistan', status: 'success' },
    { text: '$ contact --direct', status: 'info' },
    { text: '+92-311-280-2870 | sameerhabib72@gmail.com | github.com/sameerhabib72', status: 'success' },
    { text: '$ stack --verified', status: 'info' },
    { text: 'PHP, Laravel (Reverb/Sanctum/Passport), Livewire, React.js, Next.js, MySQL, Redis', status: 'success' },
    { text: '$ metrics --proven', status: 'info' },
    { text: '3+ Years Exp | 20+ Enterprise Apps | 45% DB Latency Reduction | 15+ Secure REST APIs', status: 'success' },
    { text: '$ key-platforms --delivered', status: 'info' },
    { text: 'SBTE | Bank Askari | Idemitsu | Sindh TTB | Hunar Foundation | Iqbal Library | Zenab Kebabs', status: 'success' },
    { text: '$ ai-workflows', status: 'info' },
    { text: 'Cursor, GitHub Copilot, ChatGPT, DeepSeek — AI-Driven Speed & Code Quality', status: 'success' }
  ]
};

export const initialAboutData: AboutSectionData = {
  heading: "High-concurrency systems, secure banking-grade APIs, and modern user experiences.",
  subheading: '3+ years delivering 20+ enterprise web solutions for government, financial, and commercial leaders.',
  paragraphs: [
    'I am a performance-driven Full-Stack Developer with 3+ years of experience delivering 20+ enterprise solutions for government and financial sectors. My core engineering stack centers around the modern Laravel ecosystem (including Reverb, Sanctum, Passport) on the backend paired with high-performance React.js and Next.js on the frontend.',
    'Over the course of my work at The Designs Firm, LiveBits, FidNos Corporation, and Software Byte, I have architected and led backend development for mission-critical portals including the Sindh Board of Technical Education (SBTE) portal, Sindh Trade Testing Board (TTB) certification system, Askari Bank financial CMS modules, and enterprise platforms for global leaders like Idemitsu (the #1 Japanese lubricant manufacturer).',
    'I specialize in optimizing database architectures: by redesigning complex MySQL queries and implementing Redis caching layers, I have consistently slashed API response times by up to 45%. Furthermore, I actively incorporate an AI-powered development workflow (GitHub Copilot, Cursor, ChatGPT, DeepSeek) for rapid debugging, rigorous test coverage, and accelerated delivery without compromising on security or architecture.'
  ],
  location: 'Karachi, Pakistan',
  experienceYears: 3,
  completedProjects: 20,
  satisfiedClients: 15,
  highlightPoints: [
    '3+ years experience delivering 20+ enterprise solutions for government and financial sectors',
    'Led backend development for high-security portals: SBTE & Sindh TTB government certification',
    'Optimized database performance by 45% via complex query redesigns and Redis caching',
    'Engineered 15+ robust REST APIs for financial institutions (Bank Askari) and third-party integrations',
    'Enterprise client delivery for Idemitsu (No. 1 Japanese Lubricant Company) and Hunar Foundation',
    'Expertise in Laravel ecosystem (Reverb, Sanctum, Passport) & dynamic React.js / Next.js interfaces',
    'AI-powered development workflow (Cursor, GitHub Copilot, DeepSeek) maximizing delivery speed & quality'
  ],
  codePhilosophy: 'Build high-concurrency systems with zero security compromises. Optimize queries at the database layer before touching application memory.'
};

export const initialStats: StatItem[] = [
  { id: 'stat-1', number: '3+', label: 'Years Experience', icon: 'Briefcase', order: 1, published: true },
  { id: 'stat-2', number: '20+', label: 'Enterprise Solutions', icon: 'Layers', order: 2, published: true },
  { id: 'stat-3', number: '45%', label: 'Database Latency Cut', icon: 'Cpu', order: 3, published: true },
  { id: 'stat-4', number: '15+', label: 'Mission-Critical APIs', icon: 'CheckCircle2', order: 4, published: true }
];

export const initialSkills: SkillItem[] = [
  // Backend
  {
    id: 'skill-laravel',
    name: 'Laravel (Reverb, Sanctum, Passport)',
    category: 'Backend',
    proficiency: 96,
    experienceYears: '3+ Years',
    iconName: 'Server',
    slug: 'laravel',
    description: 'Expertise in the Laravel ecosystem including real-time WebSockets with Reverb, token authentication with Sanctum, OAuth2 with Passport, Eloquent ORM, and high-concurrency event broadcasting.',
    practicalExperience: 'Engineered mission-critical backend systems for SBTE, Bank Askari (CMS), Sindh TTB, Idemitsu Lubricants, and LIVSHEM e-commerce platform.',
    featured: true,
    order: 1,
    published: true
  },
  {
    id: 'skill-php',
    name: 'PHP (OOP & PSR)',
    category: 'Backend',
    proficiency: 94,
    experienceYears: '3+ Years',
    iconName: 'Code',
    slug: 'php',
    description: 'Modern object-oriented PHP 8+, PSR design standards, strict typing, dependency injection, and secure request sanitization.',
    practicalExperience: 'Designed high-throughput enterprise APIs, transactional controllers, and data-integrity verification systems.',
    featured: true,
    order: 2,
    published: true
  },
  {
    id: 'skill-livewire',
    name: 'Laravel Livewire',
    category: 'Backend',
    proficiency: 88,
    experienceYears: '2+ Years',
    iconName: 'Radio',
    slug: 'livewire',
    description: 'Full-stack framework for Laravel enabling dynamic, reactive interfaces without leaving the comfort of PHP.',
    practicalExperience: 'Built real-time administrative forms, verification lookups, and interactive data tables for LMS and CMS portals.',
    featured: false,
    order: 3,
    published: true
  },
  {
    id: 'skill-restapi',
    name: 'RESTful API Development',
    category: 'Backend',
    proficiency: 95,
    experienceYears: '3+ Years',
    iconName: 'Network',
    slug: 'rest-apis',
    description: 'Architecting deterministic, secure, and well-documented REST APIs with standard HTTP codes, throttling, and Bearer token guards.',
    practicalExperience: 'Engineered 15+ robust REST APIs for financial institutions (Bank Askari), mobile apps, and government accreditation portals.',
    featured: true,
    order: 4,
    published: true
  },
  {
    id: 'skill-mvc',
    name: 'MVC Architecture',
    category: 'Backend',
    proficiency: 96,
    experienceYears: '3+ Years',
    iconName: 'Layers',
    slug: 'mvc-architecture',
    description: 'Model-View-Controller design pattern enforcing strict separation of concerns, reusable service layers, and clean data contracts.',
    practicalExperience: 'Structured 20+ commercial applications ensuring scalability, ease of auditing, and long-term maintainability.',
    featured: false,
    order: 5,
    published: true
  },
  {
    id: 'skill-mysql',
    name: 'MySQL (Optimization & Tuning)',
    category: 'Backend',
    proficiency: 95,
    experienceYears: '3+ Years',
    iconName: 'Database',
    slug: 'mysql',
    description: 'Relational database schema normalization (3NF), complex multi-table joins, composite indexing, and transactional ACID consistency.',
    practicalExperience: 'Redesigned complex MySQL queries across government and commercial applications, cutting query execution bottlenecks significantly.',
    featured: true,
    order: 6,
    published: true
  },
  {
    id: 'skill-redis',
    name: 'Redis Caching',
    category: 'Backend',
    proficiency: 90,
    experienceYears: '2+ Years',
    iconName: 'DatabaseZap',
    slug: 'redis',
    description: 'In-memory key-value data caching, session store distribution, and queue worker optimization.',
    practicalExperience: 'Implemented Redis caching layers for SBTE and high-traffic portals, contributing to a 45% overall reduction in API response times.',
    featured: true,
    order: 7,
    published: true
  },

  // Front-End
  {
    id: 'skill-javascript',
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    proficiency: 95,
    experienceYears: '3+ Years',
    iconName: 'FileCode2',
    slug: 'javascript',
    description: 'Modern ECMAScript asynchronous promises, async/await, closures, DOM manipulation, modular architecture, and event pipelines.',
    practicalExperience: 'Universal frontend driver for real-time interactions, data parsing, and client-server synchronization.',
    featured: true,
    order: 8,
    published: true
  },
  {
    id: 'skill-react',
    name: 'React.js',
    category: 'Frontend',
    proficiency: 93,
    experienceYears: '2.5+ Years',
    iconName: 'Atom',
    slug: 'react',
    description: 'Declarative component architecture, custom hooks, memoization, state management, and optimized render cycles.',
    practicalExperience: 'Built responsive client dashboards, interactive LMS interfaces, and enterprise frontends for LiveBits and FidNos Corporation.',
    featured: true,
    order: 9,
    published: true
  },
  {
    id: 'skill-nextjs',
    name: 'Next.js',
    category: 'Frontend',
    proficiency: 88,
    experienceYears: '2+ Years',
    iconName: 'Globe',
    slug: 'nextjs',
    description: 'React production framework with Server Components, hybrid SSR/SSG rendering, dynamic metadata, and Core Web Vitals optimization.',
    practicalExperience: 'Engineered high-conversion agency web platforms and client showcase applications with high Google Lighthouse benchmarks.',
    featured: true,
    order: 10,
    published: true
  },
  {
    id: 'skill-tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    proficiency: 94,
    experienceYears: '2.5+ Years',
    iconName: 'Palette',
    slug: 'tailwind-css',
    description: 'Utility-first CSS framework for rapid, mathematically disciplined responsive layouts without CSS bloat.',
    practicalExperience: 'Primary design engine across LMS student dashboards (+30% user engagement), agency portals, and custom web applications.',
    featured: true,
    order: 11,
    published: true
  },
  {
    id: 'skill-jquery-ajax',
    name: 'jQuery & AJAX',
    category: 'Frontend',
    proficiency: 92,
    experienceYears: '3+ Years',
    iconName: 'RefreshCw',
    slug: 'jquery-ajax',
    description: 'Asynchronous HTTP calls without page reloads, dynamic element rendering, and lightweight event listening.',
    practicalExperience: 'Integrated real-time cart updates, dynamic subcategory filtering, and booking status adjustments across e-commerce platforms.',
    featured: false,
    order: 12,
    published: true
  },
  {
    id: 'skill-html-css',
    name: 'HTML5 & CSS3',
    category: 'Frontend',
    proficiency: 96,
    experienceYears: '3+ Years',
    iconName: 'Layout',
    slug: 'html5-css3',
    description: 'Semantic HTML markup, ARIA accessibility, modern CSS flexbox/grid, keyframe transitions, and responsive media queries.',
    practicalExperience: 'Universal foundation ensuring all enterprise web pages pass strict validation and WCAG accessibility standards.',
    featured: false,
    order: 13,
    published: true
  },

  // Tools & Technologies
  {
    id: 'skill-git',
    name: 'Git & GitHub',
    category: 'Tools',
    proficiency: 92,
    experienceYears: '3+ Years',
    iconName: 'GitBranch',
    slug: 'git-github',
    description: 'Version control, feature branching workflows, pull request reviews, merge resolution, and collaborative team codebases.',
    practicalExperience: 'Daily development driver across agency software houses, collaborative government portals, and commercial repositories.',
    featured: true,
    order: 14,
    published: true
  },
  {
    id: 'skill-cicd',
    name: 'CI/CD (GitHub Actions)',
    category: 'Tools',
    proficiency: 85,
    experienceYears: '2+ Years',
    iconName: 'Workflow',
    slug: 'cicd-github-actions',
    description: 'Automated test runners, lint verification, build pipelines, and continuous deployment workflows.',
    practicalExperience: 'Configured automated verification checks to ensure zero broken commits reach staging or production servers.',
    featured: false,
    order: 15,
    published: true
  },
  {
    id: 'skill-payment-gateways',
    name: 'Payment Gateway Integration',
    category: 'Tools',
    proficiency: 90,
    experienceYears: '2+ Years',
    iconName: 'CreditCard',
    slug: 'payment-gateways',
    description: 'Integrating secure checkout pipelines, webhook verification, payment tokenization, and transaction logging.',
    practicalExperience: 'Implemented payment processing solutions for e-commerce checkouts and hotel/order booking engines.',
    featured: true,
    order: 16,
    published: true
  },
  {
    id: 'skill-api-integration',
    name: 'API Integration',
    category: 'Tools',
    proficiency: 95,
    experienceYears: '3+ Years',
    iconName: 'Share2',
    slug: 'api-integration',
    description: 'Third-party API consumption, webhook ingestion, rate-limit handling, and robust data mapping.',
    practicalExperience: 'Integrated banking APIs, SMS gateways, email dispatchers, and external verification endpoints.',
    featured: false,
    order: 17,
    published: true
  },
  {
    id: 'skill-debugging',
    name: 'Debugging & Optimization',
    category: 'Tools',
    proficiency: 94,
    experienceYears: '3+ Years',
    iconName: 'Wrench',
    slug: 'debugging-optimization',
    description: 'Root-cause analysis, query profiling, memory leak detection, error boundaries, and performance benchmarking.',
    practicalExperience: 'Reduced production bugs by 25% at Software Byte and boosted application response speed across legacy codebases.',
    featured: true,
    order: 18,
    published: true
  },
  {
    id: 'skill-postman',
    name: 'Postman & API Testing',
    category: 'Tools',
    proficiency: 92,
    experienceYears: '3+ Years',
    iconName: 'Send',
    slug: 'postman',
    description: 'API test collections, automated environment variables, authorization header automation, and contract validation.',
    practicalExperience: 'Documented and validated all 15+ REST APIs for frontend developers, mobile engineers, and institutional stakeholders.',
    featured: false,
    order: 19,
    published: true
  },

  // Modern Workflow & AI Tools
  {
    id: 'skill-ai-workflow',
    name: 'AI-Powered Development (Copilot, Cursor, DeepSeek)',
    category: 'Tools',
    proficiency: 95,
    experienceYears: '2+ Years',
    iconName: 'Sparkles',
    slug: 'ai-development',
    description: 'Supercharging development velocity using AI coding environments: GitHub Copilot, Cursor IDE, ChatGPT, and DeepSeek for rapid prototyping, deep debugging, and test generation.',
    practicalExperience: 'Applied daily to accelerate complex logic design, discover edge-case bugs early, and maintain high code quality at breakneck speeds.',
    featured: true,
    order: 20,
    published: true
  },
  {
    id: 'skill-prompt-engineering',
    name: 'Prompt Engineering & Architectural Brainstorming',
    category: 'Tools',
    proficiency: 92,
    experienceYears: '2+ Years',
    iconName: 'Cpu',
    slug: 'prompt-engineering',
    description: 'Crafting precise architectural prompts for automated refactoring, schema generation, algorithm optimization, and regression testing.',
    practicalExperience: 'Used extensively to evaluate alternative database indexing patterns and generate comprehensive test matrices.',
    featured: true,
    order: 21,
    published: true
  },

  // CMS & E-Commerce (Directly from CV)
  {
    id: 'skill-wordpress',
    name: 'WordPress',
    category: 'CMS & E-Commerce',
    proficiency: 92,
    experienceYears: '3+ Years',
    iconName: 'Globe',
    slug: 'wordpress',
    description: 'Custom theme architecture, WooCommerce integration, custom post types, REST API endpoints, and speed optimization.',
    practicalExperience: 'Engineered high-performance commercial websites, institutional CMS portals, and custom client management solutions.',
    featured: true,
    order: 22,
    published: true
  },
  {
    id: 'skill-shopify',
    name: 'Shopify',
    category: 'CMS & E-Commerce',
    proficiency: 88,
    experienceYears: '2+ Years',
    iconName: 'ShoppingBag',
    slug: 'shopify',
    description: 'Shopify Liquid theme customizations, custom sections, third-party app integrations, and conversion checkout flow optimization.',
    practicalExperience: 'Built and maintained commercial e-commerce storefronts with seamless payment gateways and inventory tracking.',
    featured: true,
    order: 23,
    published: true
  }
];

export const initialExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'The Design Firm – Contract',
    position: 'Full-Stack Developer',
    startDate: 'Jul 2026',
    endDate: 'Sep 2026',
    current: false,
    location: 'Karachi, Pakistan',
    employmentType: 'Contract',
    description: 'Engineered enterprise-level web solutions for multinational corporations and prominent vocational training institutes.',
    responsibilities: [
      'Idemitsu: Engineered secure, enterprise-level web solutions for Idemitsu, the No. 1 Japanese company in global lubricant sales.',
      'Hunar Foundation: Developed and optimized vocational training management modules, focusing on scalable user enrollment and progress-tracking systems.',
      'Collaborated directly with corporate product stakeholders to enforce strict brand compliance, security safeguards, and multi-device usability.',
      'Conducted rigorous code audits and optimized frontend performance to maintain high enterprise benchmarks.'
    ],
    technologies: ['Laravel', 'PHP', 'React.js', 'MySQL', 'Tailwind CSS', 'REST APIs', 'Git'],
    order: 1,
    published: true
  },
  {
    id: 'exp-2',
    company: 'LiveBits – Software House Digital Agency',
    position: 'Full-Stack Developer',
    startDate: 'Mar 2024',
    endDate: 'Jun 2026',
    current: false,
    location: 'Karachi, Pakistan',
    employmentType: 'Full-time',
    description: 'Architected and maintained 20+ scalable web applications using Laravel and React.js across government, financial, and SaaS sectors.',
    responsibilities: [
      'Architected and maintained 20+ scalable web applications using Laravel and React.js, serving thousands of daily active users.',
      'Led Backend Development for high-security projects, including the SBTE and Sindh TTB portals, ensuring data integrity for government-level certification.',
      'Optimized Database Performance: Redesigned complex MySQL queries and implemented Redis caching, reducing API response times by 45%.',
      'API Leadership: Built 15+ robust REST APIs for third-party integrations, mobile apps, and financial systems (Bank Askari).'
    ],
    technologies: ['Laravel (Reverb, Sanctum, Passport)', 'React.js', 'MySQL', 'Redis Caching', 'RESTful APIs', 'PHP 8', 'jQuery AJAX', 'Postman'],
    order: 2,
    published: true
  },
  {
    id: 'exp-3',
    company: 'The Design Firm – Contract',
    position: 'Laravel Developer',
    startDate: 'Dec 2024',
    endDate: 'Jan 2025',
    current: false,
    location: 'Karachi, Pakistan',
    employmentType: 'Contract',
    description: 'Specialized financial systems engineering and banking-grade API integration for Bank Askari.',
    responsibilities: [
      'Askari Bank: Developed and integrated secure financial modules for the Askari Bank CMS project, focusing on security and banking-grade API reliability.',
      'Implemented strict input sanitization, token-based authorization guards, and audit trail ledgers for financial compliance.',
      'Conducted endpoint performance profiling and load testing for mission-critical banking operations.'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Security Tokens', 'REST APIs', 'Postman'],
    order: 3,
    published: true
  },
  {
    id: 'exp-4',
    company: 'FidNos Corporation',
    position: 'Full-Stack Developer',
    startDate: 'Sep 2023',
    endDate: 'Feb 2024',
    current: false,
    location: 'Karachi, Pakistan',
    employmentType: 'Full-time',
    description: 'Engineered custom Learning Management Systems (LMS) and dynamic high-engagement dashboards.',
    responsibilities: [
      'LMS Expert: Designed and developed custom Learning Management Systems (LMS) with complex progress-tracking and course-management modules.',
      'UI/UX Optimization: Utilized React.js and Tailwind CSS to build highly responsive dashboards, resulting in a 30% increase in user engagement.',
      'Full-Stack Delivery: Managed the complete SDLC from requirement gathering through deployment on cloud servers.'
    ],
    technologies: ['React.js', 'Laravel', 'PHP', 'Tailwind CSS', 'MySQL', 'Cloud Deployment'],
    order: 4,
    published: true
  },
  {
    id: 'exp-5',
    company: 'Software Byte',
    position: 'Laravel Developer',
    startDate: 'Apr 2023',
    endDate: 'Aug 2023',
    current: false,
    location: 'Karachi, Pakistan',
    employmentType: 'Full-time',
    description: 'Developed custom business logic and e-commerce platforms with real-time interactivity.',
    responsibilities: [
      'Developed custom business logic and CRUD applications using Laravel and Blade.',
      'Integrated AJAX and jQuery features to provide real-time updates for e-commerce and booking platforms.',
      'Performed rigorous debugging and unit testing, reducing production bugs by 25%.'
    ],
    technologies: ['Laravel', 'Blade', 'PHP', 'AJAX', 'jQuery', 'MySQL', 'Unit Testing'],
    order: 5,
    published: true
  }
];

export const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'Jinnah Polytechnic Institute',
    degree: 'Diploma',
    field: 'Software Engineering',
    startDate: '2020',
    endDate: '2023',
    grade: 'First Division',
    description: 'Comprehensive software engineering program emphasizing object-oriented programming, data structures, algorithms, relational database design, and systems engineering.',
    order: 1,
    published: true
  },
  {
    id: 'edu-2',
    institution: 'Government National College',
    degree: 'Intermediate',
    field: 'Commerce',
    startDate: '2018',
    endDate: '2019',
    grade: 'Certified',
    description: 'Foundational studies in business mathematics, commerce principles, financial accounting, and economics.',
    order: 2,
    published: true
  },
  {
    id: 'edu-3',
    institution: 'Galaxy Public Secondary School',
    degree: 'Matriculation',
    field: 'Computer Science',
    startDate: '2017',
    endDate: '2018',
    grade: 'First Division',
    description: 'Secondary education focused on core computer science foundations, information technology, and applied mathematics.',
    order: 3,
    published: true
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-sbte',
    title: 'SBTE Portal',
    slug: 'sbte-portal',
    subtitle: 'Sindh Board of Technical Education Verification & Examination System',
    shortDescription: 'High-security government examination and student credential verification portal built with Laravel, MySQL, and Redis, serving hundreds of thousands of institutional records.',
    longDescription: 'Led backend development for the Sindh Board of Technical Education (SBTE) portal, a mission-critical government infrastructure system responsible for student enrollments, examination registrations, automated roll number slip issuance, and tamper-proof digital certification verification.',
    category: 'Government / Enterprise',
    year: '2024 - 2026',
    client: 'Sindh Board of Technical Education (Govt. of Sindh)',
    role: 'Lead Backend Developer (LiveBits)',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'PHP 8', 'MySQL', 'Redis Caching', 'Sanctum', 'RESTful APIs', 'Postman'],
    features: [
      'High-security student credential and government certification verification pipeline',
      'Optimized database queries and Redis caching layer slashing API latency by 45%',
      'Automated admit card generation, seat allotment, and center allocation logic',
      'Role-based administrative dashboards for institutional superintendents and auditors',
      'Strict audit trails and tamper-proof records for educational qualifications'
    ],
    problem: 'The legacy system experienced heavy latency and downtime during peak result announcement periods when hundreds of thousands of students accessed the portal concurrently.',
    solution: 'Re-architected the relational database indexes, implemented an in-memory Redis caching strategy for student lookup endpoints, and built hardened RESTful APIs with rate limiting and payload validation.',
    challenges: 'Ensuring zero data loss during high-concurrency result lookups while enforcing strict data integrity for government-accredited diplomas.',
    architectureNodes: [
      { title: 'API & Gateway', description: 'Laravel REST APIs with token authorization and rate limiting', tech: 'Laravel / Sanctum' },
      { title: 'In-Memory Cache', description: 'Redis key-value store caching verification queries', tech: 'Redis' },
      { title: 'Database Core', description: 'Normalized MySQL with composite indexes on registration numbers', tech: 'MySQL 8' },
      { title: 'Audit Trail', description: 'Immutable logging for all certification and grade modifications', tech: 'PHP Event Listeners' }
    ],
    developmentProcess: [
      'Analyzed high-traffic spikes and identified query bottlenecks in legacy database',
      'Designed normalized schemas and applied composite indexes on verification fields',
      'Implemented Redis caching for frequent student certificate checks',
      'Conducted load testing using Postman collections and simulated stress scenarios'
    ],
    result: 'Reduced database query response times by 45%, providing instantaneous verification for thousands of concurrent candidates during peak examination cycles.',
    liveUrl: 'https://sbte.edu.pk',
    githubUrl: undefined,
    featured: true,
    published: true,
    order: 1,
    seoTitle: 'SBTE Portal — Government Certification & Examination Platform | Sameer Habib',
    seoDescription: 'Case study of SBTE: High-security government education portal architected with Laravel, MySQL, and Redis by Full-Stack Developer Sameer Habib.',
    seoKeywords: ['SBTE Portal', 'Sindh Board Technical Education', 'Laravel Government Portal', 'Sameer Habib Backend', 'MySQL Redis Optimization']
  },
  {
    id: 'proj-askari-bank',
    title: 'Askari Bank (CMS)',
    slug: 'askari-bank-cms',
    subtitle: 'Financial CMS & Secure Banking-Grade Financial Modules',
    shortDescription: 'Banking-grade financial modules and content management architecture engineered for Askari Bank, focusing on security compliance, transactional reliability, and API integrity.',
    longDescription: 'Developed and integrated secure financial modules for Askari Bank (CMS) at The Designs Firm. Structured strict input sanitization, token-based authorization guards, and audit trail ledgers conforming to banking regulatory standards.',
    category: 'Financial / Banking',
    year: '2024 - 2025',
    client: 'Bank Askari',
    role: 'Laravel Developer (The Designs Firm)',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Security Tokens', 'Postman'],
    features: [
      'Banking-grade financial modules with rigorous request verification',
      'Strict input sanitization preventing injection attacks and CSRF vulnerabilities',
      'Audit logging documenting administrative interactions with financial data',
      'Reliable RESTful API integration for secure internal banking endpoints'
    ],
    problem: 'The banking institution required strict modernization of its content and product catalog management without exposing financial service data to unauthorized modification.',
    solution: 'Engineered layered authorization gates in Laravel with role-based permissions, cryptographic checksums for critical updates, and comprehensive audit trails.',
    challenges: 'Adhering to strict institutional compliance guidelines while delivering a performant, maintainable administrative experience.',
    architectureNodes: [
      { title: 'Security Boundary', description: 'Multi-layer token authentication and cryptographic verification', tech: 'Laravel Auth' },
      { title: 'Financial Module', description: 'Business logic for banking products, rate calculations, and branch locators', tech: 'PHP 8 MVC' },
      { title: 'Audit Ledger', description: 'Tamper-evident transaction logs for administrative activities', tech: 'MySQL Logs' }
    ],
    developmentProcess: [
      'Reviewed financial sector compliance mandates and technical specifications',
      'Developed modular Laravel service providers for banking utilities',
      'Implemented exhaustive unit tests and endpoint validation via Postman',
      'Completed security auditing and deployment handoff'
    ],
    result: 'Delivered a resilient, 100% compliant financial module for Askari Bank ensuring zero unauthorized parameter tampering and flawless uptime.',
    liveUrl: 'https://askaribank.com',
    githubUrl: undefined,
    featured: true,
    published: true,
    order: 2,
    seoTitle: 'Askari Bank (CMS) — Banking Financial Architecture | Sameer Habib',
    seoDescription: 'Case study of Askari Bank CMS: Secure financial modules and banking-grade API integrations engineered by Sameer Habib.',
    seoKeywords: ['Askari Bank CMS', 'Banking Laravel Module', 'Sameer Habib Financial App', 'Secure PHP Banking']
  },
  {
    id: 'proj-idemitsu',
    title: 'Idemitsu Lubricants',
    slug: 'idemitsu-lubricants',
    subtitle: 'Enterprise Web Portal for #1 Japanese Lubricant Manufacturer',
    shortDescription: 'Enterprise-level web portal engineered for Idemitsu (The No. 1 Japanese Company in Global Lubricant Sales), delivering high-performance product discovery and distributor networks.',
    longDescription: 'Engineered secure enterprise-level web solutions for Idemitsu at The Designs Firm. The platform serves automotive and industrial lubricant consumers, featuring interactive oil selector engines, distributor geolocation, and multi-language product specifications.',
    category: 'Enterprise / Automotive',
    year: '2026',
    client: 'Idemitsu Lube Pakistan / Japan',
    role: 'Full-Stack Developer (The Designs Firm)',
    thumbnail: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'React.js', 'PHP', 'Tailwind CSS', 'MySQL', 'REST APIs'],
    features: [
      'Interactive Lubricant Recommendation Engine based on vehicle make, model, and engine type',
      'Authorized distributor and dealer locator with interactive mapping',
      'Enterprise product catalog with downloadable technical data sheets (TDS) and MSDS',
      'Responsive, brand-compliant UI crafted with modern React and Tailwind CSS'
    ],
    problem: 'Customers struggled to identify the exact viscosity and chemical specifications required for their Japanese vehicles among hundreds of lubricant variants.',
    solution: 'Designed a dynamic, step-by-step recommendation algorithm that maps specific OEM manufacturer requirements to Idemitsu’s product catalog with instant results.',
    challenges: 'Harmonizing global corporate brand guidelines with fast loading times across mobile networks.',
    architectureNodes: [
      { title: 'Interactive Frontend', description: 'React.js with dynamic filtering for instant lubricant recommendation', tech: 'React / Tailwind' },
      { title: 'Product Catalog API', description: 'Laravel REST endpoints serving SKU data and technical datasheets', tech: 'Laravel' },
      { title: 'Relational Database', description: 'MySQL relational structure linking engine specifications to SKUs', tech: 'MySQL' }
    ],
    developmentProcess: [
      'Mapped vehicle specification matrix with Idemitsu technical product managers',
      'Engineered the recommendation API with caching for rapid lookup',
      'Crafted high-fidelity responsive UI adhering to Idemitsu global corporate aesthetics',
      'Optimized media assets and CDN delivery for sub-second load times'
    ],
    result: 'Delivered an enterprise-grade digital flagship for Idemitsu, increasing product inquiry conversions by 35% and streamlining authorized dealer discovery.',
    liveUrl: 'https://idemitsulubricants.com',
    githubUrl: undefined,
    featured: true,
    published: true,
    order: 3,
    seoTitle: 'Idemitsu Lubricants — Enterprise Web Platform | Sameer Habib',
    seoDescription: 'Enterprise portal engineering for Idemitsu Lubricants (The No. 1 Japanese Company in Global Lubricant Sales) by Sameer Habib.',
    seoKeywords: ['Idemitsu Lubricants', 'Enterprise Web Solution', 'Sameer Habib Portfolio', 'Laravel React Enterprise']
  },
  {
    id: 'proj-livshem',
    title: 'LIVSHEM',
    slug: 'livshem',
    subtitle: 'E-Commerce & Smart Shopping List Platform',
    shortDescription: 'Production-grade e-commerce web platform featuring intelligent shopping lists, real-time AJAX cart operations, product categorization, and a comprehensive admin inventory suite.',
    longDescription: 'Livshem is an end-to-end e-commerce and shopping list management system engineered to streamline grocery and product ordering. Built on Laravel with a normalized MySQL backend, the platform enables users to create personalized shopping lists, instantly convert list items into active cart entries, and check out with multi-step order validation.',
    category: 'E-Commerce',
    year: '2024 - 2025',
    client: 'Commercial Retail Client',
    role: 'Lead Full Stack Developer',
    thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel 10', 'PHP 8.2', 'MySQL', 'jQuery', 'AJAX', 'Bootstrap 5', 'REST APIs'],
    features: [
      'Comprehensive product catalog with hierarchical categories and subcategories',
      'Interactive shopping lists with instant item check-off and cart transfer',
      'Asynchronous (AJAX) cart quantity adjustments with live subtotal re-calculation',
      'Real-time search with debounced autocompletion and category filters',
      'Role-based user authentication, order history tracking, and wishlist management',
      'Dedicated Admin CMS for product stock management, pricing, and order fulfillment'
    ],
    problem: 'Traditional retail catalog sites suffered from cumbersome full-page reloads on every cart alteration, and consumers had no organized way to plan multi-item shopping lists before committing to orders.',
    solution: 'Designed a lightweight AJAX communication layer over Laravel REST endpoints, decoupling state changes from page navigations. Implemented an Eloquent database model linking users, reusable shopping lists, items, and inventory stocks.',
    challenges: 'Ensuring database transaction atomicity during simultaneous cart checkout when inventory was low, and maintaining rapid response times when querying large category trees.',
    architectureNodes: [
      { title: 'Client UI Layer', description: 'Bootstrap 5 responsive views with jQuery AJAX event handlers', tech: 'Bootstrap / jQuery' },
      { title: 'Routing & Middleware', description: 'Laravel routes with CSRF verification and Auth guards', tech: 'Laravel Router' },
      { title: 'Business Controllers', description: 'CartController, ShoppingListController, ProductController', tech: 'PHP 8.2 MVC' },
      { title: 'ORM & Query Optimization', description: 'Eloquent ORM with eager loading to prevent N+1 query bottlenecks', tech: 'Eloquent ORM' },
      { title: 'Persistent Database', description: 'Normalized relational MySQL schema with indexing on foreign keys', tech: 'MySQL 8' }
    ],
    developmentProcess: [
      'Analyzed consumer shopping list behaviors and mapped database entity relationships',
      'Created Laravel migration scripts and seeders for categories, subcategories, and SKU models',
      'Built and verified AJAX endpoint responses for instant cart updates',
      'Implemented transactional checkout pipeline with order confirmation stubs',
      'Conducted cross-browser performance testing and SQL query profiling'
    ],
    result: 'Delivered an intuitive, responsive shopping platform with sub-200ms AJAX interactions, eliminating cart abandonments caused by slow page reloads and providing clear shopping list workflows.',
    liveUrl: 'https://livshem.com',
    githubUrl: 'https://github.com/sameerhabib72/livshem-ecommerce',
    featured: true,
    published: true,
    order: 4,
    seoTitle: 'LIVSHEM — E-Commerce & Shopping List Platform | Sameer Habib',
    seoDescription: 'Case study of Livshem: A production Laravel 10 e-commerce platform featuring smart shopping lists, AJAX cart interactions, and normalized MySQL architecture by Sameer Habib.',
    seoKeywords: ['Livshem', 'Laravel E-commerce', 'Shopping List App', 'Sameer Habib Project', 'PHP MySQL AJAX E-commerce']
  },
  {
    id: 'proj-hunar-foundation',
    title: 'The Hunar Foundation',
    slug: 'the-hunar-foundation',
    subtitle: 'Vocational Training Management & Student Enrollment Modules',
    shortDescription: 'Scalable user enrollment, course progression, and vocational training management modules engineered for Pakistan’s premier technical training institute.',
    longDescription: 'Developed and optimized vocational training management modules for The Hunar Foundation at The Designs Firm. Focused on scalable user enrollment, student verification, attendance records, and skill certification tracking across nationwide institutes.',
    category: 'Education / Non-Profit',
    year: '2026',
    client: 'The Hunar Foundation',
    role: 'Full-Stack Developer (The Designs Firm)',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'PHP', 'React.js', 'MySQL', 'Tailwind CSS', 'REST APIs'],
    features: [
      'Multi-campus student enrollment and vocational course selection pipeline',
      'Automated eligibility screening based on demographic and academic criteria',
      'Administrative instructor portal for grading practical workshop evaluations',
      'Real-time enrollment analytics dashboards for executive management'
    ],
    problem: 'Managing paper-based applications across decentralized vocational campuses led to administrative overhead and delayed admissions cycles.',
    solution: 'Engineered a centralized digital intake and management module with automated validation, SMS notifications, and role-based staff permissions.',
    challenges: 'Designing a workflow accessible for applicants with varying levels of digital literacy across Pakistan.',
    architectureNodes: [
      { title: 'Applicant Portal', description: 'Simple, responsive step-by-step admission form', tech: 'React / Tailwind' },
      { title: 'Central Enrollment Service', description: 'Laravel backend managing admission rounds and seat capacity', tech: 'Laravel' },
      { title: 'Campus Database', description: 'Normalized MySQL data store with campus partition indexes', tech: 'MySQL' }
    ],
    developmentProcess: [
      'Interviewed campus admissions officers to model the qualification pipeline',
      'Developed intake workflows with instant document upload validation',
      'Built reporting dashboards for demographic enrollment tracking',
      'Trained institutional operators and deployed to production'
    ],
    result: 'Streamlined admission turnaround from two weeks to under 48 hours, enabling thousands of youth to enroll in vocational careers smoothly.',
    liveUrl: 'https://hunarfoundation.org',
    githubUrl: undefined,
    featured: true,
    published: true,
    order: 5,
    seoTitle: 'The Hunar Foundation — Vocational Training Portal | Sameer Habib',
    seoDescription: 'Case study of vocational training management and student enrollment modules developed for The Hunar Foundation by Sameer Habib.',
    seoKeywords: ['Hunar Foundation', 'Vocational Training Portal', 'Sameer Habib Education Project', 'Laravel Enrollment Module']
  },
  {
    id: 'proj-sindh-ttb',
    title: 'Sindh TTB (CMS)',
    slug: 'sindh-ttb-cms',
    subtitle: 'Sindh Trade Testing Board Institute & Examination Management System',
    shortDescription: 'Government-level trade testing, institute accreditation, and candidate examination management portal ensuring verifiable credential authenticity.',
    longDescription: 'Led backend development for the Sindh Trade Testing Board (TTB) CMS at LiveBits. Engineered robust administrative portals for vocational institutes, candidate examination enrollments, question bank generation, and center allocations conforming to strict provincial standards.',
    category: 'Government / Accreditation',
    year: '2024 - 2025',
    client: 'Sindh Trade Testing Board (Govt. of Sindh)',
    role: 'Lead Backend Developer (LiveBits)',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Redis', 'RESTful APIs', 'Postman'],
    features: [
      'Accredited vocational institute onboarding and annual inspection audit logging',
      'Candidate exam registration, fee ledger tracking, and roll number generation',
      'Secure grade ledger compilation and board approval workflows',
      'High-speed records indexing cutting retrieval times across hundreds of thousands of entries'
    ],
    problem: 'Provincial trade training institutes were decentralized, relying on manual paper submissions that caused registration delays and reporting discrepancies.',
    solution: 'Designed a unified digital CMS with role-based administrative access, cryptographic audit trails, and automated verification checks.',
    challenges: 'Harmonizing diverse trade curricula schemas into a standardized provincial database model.',
    architectureNodes: [
      { title: 'Institute Portal', description: 'Administrative UI for institute registration and candidate batching', tech: 'Laravel Blade / AJAX' },
      { title: 'Core Assessment Engine', description: 'Candidate score compilation and roll number issue logic', tech: 'PHP 8 MVC' },
      { title: 'Secure Database', description: 'Normalized MySQL database with composite institute & trade indexes', tech: 'MySQL 8' }
    ],
    developmentProcess: [
      'Structured standardized data schemas matching Sindh TTB accreditation standards',
      'Implemented transactional registration pipelines with audit trail logging',
      'Conducted security audits against SQL injection and parameter tampering'
    ],
    result: 'Cut institute examination registration processing time from 3 weeks to under 2 days with 100% data audit compliance.',
    liveUrl: 'https://sindhttb.gov.pk',
    githubUrl: undefined,
    featured: false,
    published: true,
    order: 6,
    seoTitle: 'Sindh TTB (CMS) — Government Trade Certification | Sameer Habib',
    seoDescription: 'Case study of Sindh Trade Testing Board (TTB) CMS built by Lead Backend Developer Sameer Habib.',
    seoKeywords: ['Sindh TTB CMS', 'Government Trade Testing', 'Sameer Habib Laravel Backend']
  },
  {
    id: 'proj-sindh-ttb-cert',
    title: 'Sindh TTB Certificate Portal',
    slug: 'sindh-ttb-certificate-portal',
    subtitle: 'Tamper-Proof Digital Certification & Public QR Verification Gateway',
    shortDescription: 'High-availability public verification portal and automated digital certificate generation engine with tamper-proof QR security codes.',
    longDescription: 'Engineered the public-facing certification verification portal for the Sindh Trade Testing Board (TTB). Features instant QR-code lookups, cryptographic certificate hash verification, and printable verifiable diploma generation for overseas workers and institutional verifiers.',
    category: 'Government / Public Gateway',
    year: '2024 - 2025',
    client: 'Sindh Trade Testing Board (Govt. of Sindh)',
    role: 'Lead Backend Developer (LiveBits)',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'PHP 8', 'MySQL', 'Redis Caching', 'QR Engine', 'RESTful APIs'],
    features: [
      'Instant QR-code verification for technical trade diplomas and certificates',
      'Cryptographically hashed certificate identifiers preventing counterfeit documents',
      'Sub-second query response cached via Redis for overseas employer verifications',
      'Exportable high-resolution official PDF certificates with anti-tamper security seals'
    ],
    problem: 'Counterfeit paper certificates in technical trades created major validation hurdles for Pakistani technicians seeking foreign employment in the GCC.',
    solution: 'Built an unalterable digital verification gateway where any employer worldwide can scan a QR code or enter a certificate number for instant confirmation.',
    challenges: 'High traffic spikes from global verification requests requiring zero downtime and strict rate-limiting against automated scrapers.',
    architectureNodes: [
      { title: 'Public Verification API', description: 'Fast, rate-limited REST API with Redis caching', tech: 'Laravel / Redis' },
      { title: 'Security & QR Generator', description: 'Deterministic hashing and dynamic vector QR generation', tech: 'PHP 8 Crypto' },
      { title: 'Master Registry', description: 'Tamper-evident certificate archive with read replicas', tech: 'MySQL 8' }
    ],
    developmentProcess: [
      'Designed tamper-evident certificate serialization algorithm',
      'Benchmarked Redis caching strategy under simulated high-concurrency loads',
      'Integrated security audits and IP throttling guards'
    ],
    result: 'Protected hundreds of thousands of legitimate certifications and eliminated fraudulent paper claims globally.',
    liveUrl: 'https://sindhttb.gov.pk/verify',
    githubUrl: undefined,
    featured: true,
    published: true,
    order: 7,
    seoTitle: 'Sindh TTB Certificate Portal — Verifiable Digital Credentials | Sameer Habib',
    seoDescription: 'Case study of Sindh TTB digital certificate verification portal engineered by Sameer Habib.',
    seoKeywords: ['Sindh TTB Certificate Portal', 'QR Certificate Verification', 'Sameer Habib Security']
  },
  {
    id: 'proj-iqbal-library',
    title: 'Iqbal Library (LMS)',
    slug: 'iqbal-library-lms',
    subtitle: 'Institutional Library & Digital Catalog Circulation Management System',
    shortDescription: 'Comprehensive Library Management System (LMS) managing tens of thousands of book titles, automated barcode circulation, reservations, and member accounts.',
    longDescription: 'Engineered a specialized LMS for Iqbal Library, providing automated cataloging, ISBN lookup, real-time book loan circulation, fine calculations, and digital member card management. Built on Laravel with a high-performance relational MySQL database.',
    category: 'Educational Technology',
    year: '2023 - 2024',
    client: 'Iqbal Library Institute',
    role: 'Full-Stack Developer (FidNos)',
    thumbnail: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507842229450-76905956e3f5?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'AJAX', 'Barcode Reader Integration'],
    features: [
      'Automated book issue/return tracking with fine calculation and ISBN indexing',
      'Barcode and accession number scanner integration for front-desk librarians',
      'Member portal for real-time catalog search, reserving volumes, and viewing loan history',
      'Automated email and SMS reminders for overdue book returns'
    ],
    problem: 'Manual paper registers led to misplaced titles, slow circulation queues, and lost library inventory.',
    solution: 'Engineered an end-to-end LMS with barcode support and indexed search, allowing librarians to process checkouts in seconds.',
    challenges: 'Supporting legacy barcode hardware scanners across varied browser environments.',
    architectureNodes: [
      { title: 'Librarian Desk UI', description: 'Rapid keyboard and barcode scanner input interface', tech: 'Tailwind / AJAX' },
      { title: 'Circulation Engine', description: 'Loan duration, fine calculation, and inventory updates', tech: 'Laravel Eloquent' },
      { title: 'Catalog DB', description: 'Indexed relational schema for authors, publishers, and ISBNs', tech: 'MySQL 8' }
    ],
    developmentProcess: [
      'Digitized paper archives and established normalized book taxonomy',
      'Built fast AJAX circulation desk reducing checkout times by 85%',
      'Deployed on cloud server with automated daily backups'
    ],
    result: 'Reduced manual book check-in/out times from 5 minutes to under 20 seconds, eliminating lost title disputes entirely.',
    liveUrl: undefined,
    githubUrl: 'https://github.com/sameerhabib72/college-library-system',
    featured: false,
    published: true,
    order: 8,
    seoTitle: 'Iqbal Library (LMS) — Library Management System | Sameer Habib',
    seoDescription: 'Case study of Iqbal Library LMS engineered by Sameer Habib with Laravel and MySQL.',
    seoKeywords: ['Iqbal Library LMS', 'Library Management System', 'Sameer Habib Laravel']
  },
  {
    id: 'proj-escience-academy',
    title: 'Escience Academy (LMS)',
    slug: 'escience-academy-lms',
    subtitle: 'Digital Learning Academy Platform with Dynamic Student Engagement Dashboards',
    shortDescription: 'Full-stack online Learning Management System (LMS) featuring video lectures, interactive quizzes, automated grading, and real-time student progress tracking.',
    longDescription: 'Designed and developed custom Learning Management System (LMS) modules for Escience Academy at FidNos Corporation. Utilized React.js and Tailwind CSS to craft highly responsive dashboards, resulting in a 30% increase in user engagement.',
    category: 'Educational Technology',
    year: '2023 - 2024',
    client: 'Escience Academy',
    role: 'Full-Stack Developer (FidNos Corporation)',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['React.js', 'Laravel', 'PHP', 'Tailwind CSS', 'MySQL', 'REST APIs', 'Cloud Deployment'],
    features: [
      'Interactive student dashboard with course completion percentage and quiz metrics (+30% engagement)',
      'Multi-tiered role permissions: Students, Instructors, Evaluators, and Super Admins',
      'Automated quiz grading engine with instant feedback and explanatory answer breakdowns',
      'Video lesson progression tracker preventing skipping before conceptual mastery'
    ],
    problem: 'Low student retention and completion rates on generic off-the-shelf course platforms.',
    solution: 'Created an engaging, gamified React dashboard with dynamic progress bars, achievement milestones, and clear weekly goals.',
    challenges: 'Synchronizing interactive video watch-time progress seamlessly with backend completion triggers.',
    architectureNodes: [
      { title: 'Interactive Dashboard', description: 'React.js and Tailwind responsive student dashboard (+30% engagement)', tech: 'React / Tailwind' },
      { title: 'LMS Core API', description: 'Laravel controllers managing course progression and grades', tech: 'Laravel REST' },
      { title: 'Student Progress Store', description: 'Relational MySQL database recording time-stamped learning milestones', tech: 'MySQL' }
    ],
    developmentProcess: [
      'Conducted student UX interviews to identify engagement drop-off points',
      'Engineered interactive React components with optimistic UI updates',
      'Managed full SDLC from requirement gathering through cloud deployment'
    ],
    result: 'Achieved a verified 30% increase in daily active user engagement and improved assignment submission rates by 42%.',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: false,
    published: true,
    order: 9,
    seoTitle: 'Escience Academy (LMS) — Digital Learning Platform | Sameer Habib',
    seoDescription: 'Case study of Escience Academy LMS built with React.js and Laravel by Sameer Habib.',
    seoKeywords: ['Escience Academy LMS', 'React LMS Dashboard', 'Sameer Habib Education']
  },
  {
    id: 'proj-arena-multimedia',
    title: 'Arena Multimedia Pakistan (CMS)',
    slug: 'arena-multimedia-cms',
    subtitle: 'Institutional Media & Digital Arts Academy Content Management System',
    shortDescription: 'Enterprise content management and student showcase portal for Pakistan’s leading digital animation and multimedia institute.',
    longDescription: 'Engineered custom administrative and student showcase modules for Arena Multimedia Pakistan. Provided portfolio management for digital arts graduates, course syllabus updates, campus event registrations, and prospective student inquiries.',
    category: 'Education / Creative Media',
    year: '2024',
    client: 'Arena Multimedia Pakistan',
    role: 'Full-Stack Developer (LiveBits / Project)',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'PHP', 'React.js', 'MySQL', 'Tailwind CSS', 'REST APIs'],
    features: [
      'High-resolution student 2D/3D digital art portfolio gallery with media optimization',
      'Modular course catalog with syllabus downloads and schedule calendars',
      'Campus admission inquiry pipeline with automated CRM lead routing',
      'Admin CMS enabling non-technical faculty to update branch news and notices'
    ],
    problem: 'Prospective students could not easily view actual graduate artwork, and branch admission counselors received scattered inquiries.',
    solution: 'Built an elegant, responsive digital arts showcase with structured lead capture and branch-specific routing.',
    challenges: 'Optimizing heavy graphic design and 3D render images for lightning-fast mobile loading.',
    architectureNodes: [
      { title: 'Creative Showcase UI', description: 'Fluid responsive media gallery with lightbox zooming', tech: 'React / Tailwind' },
      { title: 'Content Backend', description: 'Laravel admin panel for course and portfolio publishing', tech: 'Laravel MVC' },
      { title: 'Media & Lead DB', description: 'MySQL storing portfolio metadata and prospect inquiries', tech: 'MySQL' }
    ],
    developmentProcess: [
      'Structured media asset pipelines with automated image compression',
      'Built intuitive drag-and-drop portfolio management for instructors',
      'Implemented automated email confirmations for student open days'
    ],
    result: 'Boosted online course enrollment inquiries by 28% and cut manual website content update turnaround to minutes.',
    liveUrl: 'https://arena-pakistan.com',
    githubUrl: undefined,
    featured: false,
    published: true,
    order: 10,
    seoTitle: 'Arena Multimedia Pakistan (CMS) — Digital Arts Portal | Sameer Habib',
    seoDescription: 'Case study of Arena Multimedia Pakistan CMS engineered by Sameer Habib.',
    seoKeywords: ['Arena Multimedia CMS', 'Creative Media Portal', 'Sameer Habib Laravel']
  },
  {
    id: 'proj-zenab-kebabs',
    title: 'Zenab Kebabs (OMS)',
    slug: 'zenab-kebabs-oms',
    subtitle: 'High-Volume Restaurant Order Management & Kitchen Workflow System',
    shortDescription: 'Real-time restaurant Order Management System (OMS) built with Laravel, AJAX, and MySQL to streamline high-volume takeout and dining orders.',
    longDescription: 'Engineered custom business logic and Order Management System (OMS) workflows for Zenab Kebabs. Features instant cashier order entry, asynchronous kitchen display unit (KDU) dispatching, menu recipe modifier customization, and daily reconciliation reports.',
    category: 'Hospitality & Dining',
    year: '2023 - 2024',
    client: 'Zenab Kebabs Dining Chain',
    role: 'Laravel Developer (Software Byte / Project)',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'Blade', 'AJAX', 'jQuery', 'MySQL', 'Tailwind CSS'],
    features: [
      'Touch-optimized order entry screen with instant item modifiers (spiciness, portions, sides)',
      'Sub-second kitchen ticket dispatching using asynchronous AJAX updates',
      'Table occupancy visualizer and takeout phone-order queueing',
      'End-of-day register reconciliation with cash-drawer and digital payment tracking'
    ],
    problem: 'Peak evening rushes caused order paper slips to be delayed or misread in the kitchen, slowing service and upsetting diners.',
    solution: 'Replaced paper tickets with a synchronized web-based Kitchen Display Unit (KDU) updating instantly upon cashier confirmation.',
    challenges: 'Ensuring continuous operation with reliable local fallback during occasional internet drops.',
    architectureNodes: [
      { title: 'Cashier POS Interface', description: 'Rapid order booking UI with keyboard shortcuts and touch support', tech: 'AJAX / jQuery' },
      { title: 'Order State Machine', description: 'Strict order status pipeline: Received -> Grilling -> Packed -> Dispatched', tech: 'Laravel' },
      { title: 'Transaction Ledger', description: 'Atomic database transactions ensuring no duplicate order IDs', tech: 'MySQL' }
    ],
    developmentProcess: [
      'Mapped fast-casual kitchen preparation stages and chef station handoffs',
      'Integrated real-time polling to eliminate full-page refreshes during peak rushes',
      'Conducted live shift load testing during busy evening service'
    ],
    result: 'Reduced order ticket transmission time to under 1 second and cut kitchen food preparation latency by 35%.',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: false,
    published: true,
    order: 11,
    seoTitle: 'Zenab Kebabs (OMS) — Restaurant Order Management | Sameer Habib',
    seoDescription: 'Case study of Zenab Kebabs Order Management System developed with Laravel and AJAX by Sameer Habib.',
    seoKeywords: ['Zenab Kebabs OMS', 'Restaurant Order Management', 'Laravel POS', 'Sameer Habib']
  },
  {
    id: 'proj-heavenly-stays',
    title: 'Heavenly Stays (HMS)',
    slug: 'heavenly-stays-hms',
    subtitle: 'Hotel Management System with Reservation Calendars & Room Billing',
    shortDescription: 'End-to-end hospitality Hotel Management System (HMS) managing multi-property room inventory, guest check-ins, rate tiers, and folios.',
    longDescription: 'Developed the core booking and property management system for Heavenly Stays (HMS). Built with Laravel, MySQL, and dynamic frontend calendars, enabling staff to handle seasonal pricing, room maintenance locks, check-in folios, and online reservations seamlessly.',
    category: 'Hospitality & Booking',
    year: '2023 - 2024',
    client: 'Heavenly Stays Hospitality Group',
    role: 'Full-Stack Developer (Software Byte / Project)',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'AJAX', 'Tailwind CSS', 'Payment Gateways'],
    features: [
      'Interactive room availability calendar with drag-and-drop reservation rescheduling',
      'Multi-tier dynamic seasonal pricing and promo code validation',
      'Guest profile management with loyalty history and ID verification attachment',
      'Automated folio invoice generation with multi-currency and tax breakdowns'
    ],
    problem: 'Double bookings and manual room rate calculations during high-occupancy holiday seasons.',
    solution: 'Engineered a database locking mechanism that prevents double-allocation of rooms during simultaneous reservation attempts.',
    challenges: 'Designing an intuitive reservation matrix that accommodates housekeeping cleaning statuses and maintenance blocks.',
    architectureNodes: [
      { title: 'Calendar Grid UI', description: 'High-density visual room matrix updating asynchronously', tech: 'AJAX / Tailwind' },
      { title: 'Booking Reservation Controller', description: 'Enforces room lockouts and calculates tax/deposit rules', tech: 'Laravel MVC' },
      { title: 'Hospitality DB', description: 'ACID-compliant MySQL transactions handling bookings and folios', tech: 'MySQL 8' }
    ],
    developmentProcess: [
      'Collaborated with hotel operations managers to model guest check-in workflows',
      'Built automated invoice generator with PDF receipt export',
      'Configured secure payment processing pipeline for credit card authorizations'
    ],
    result: 'Eliminated double-booking incidents completely and reduced guest check-in processing duration to under 90 seconds.',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: false,
    published: true,
    order: 12,
    seoTitle: 'Heavenly Stays (HMS) — Hotel Management Platform | Sameer Habib',
    seoDescription: 'Case study of Heavenly Stays Hotel Management System built by Sameer Habib.',
    seoKeywords: ['Heavenly Stays HMS', 'Hotel Management System', 'Laravel Booking Engine', 'Sameer Habib']
  },
  {
    id: 'proj-cafe-imran',
    title: 'Cafe Imran (OMS)',
    slug: 'cafe-imran-oms',
    subtitle: 'Cafe & Restaurant Order Management with Asynchronous Kitchen Dispatch',
    shortDescription: 'Fast-paced dining Order Management System (OMS) featuring quick-fire beverage ordering, table bill splitting, and kitchen ticket tracking.',
    longDescription: 'Developed custom business logic and order management workflows for Cafe Imran. Integrated AJAX and jQuery features to eliminate page reloads, allowing waitstaff to quickly fire coffee and meal orders directly to barista and chef display screens.',
    category: 'Hospitality & Dining',
    year: '2023 - 2024',
    client: 'Cafe Imran',
    role: 'Laravel Developer (Software Byte)',
    thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'Blade', 'AJAX', 'jQuery', 'MySQL', 'CSS3'],
    features: [
      'Quick-fire ordering interface tailored for rapid cafe and beverage combinations',
      'Asynchronous (AJAX) item additions without screen flicker or reload delays',
      'Split bill and payment reconciliation for large dining parties',
      'Daily sales summaries and peak-hour customer volume analytics'
    ],
    problem: 'Morning and evening rush hours overwhelmed paper ticket systems, resulting in miscommunicated customized beverage orders.',
    solution: 'Implemented a lightweight touch terminal web app communicating via AJAX with barista and kitchen screens.',
    challenges: 'Optimizing low-power POS tablets to maintain smooth UI response without memory lag.',
    architectureNodes: [
      { title: 'Cafe POS Frontend', description: 'Lightweight order buttons with instant response', tech: 'jQuery AJAX' },
      { title: 'Order Dispatcher', description: 'Routes beverage items to barista and food items to hot kitchen', tech: 'Laravel' },
      { title: 'Sales Record DB', description: 'MySQL relational structure tracking shift receipts and payment modes', tech: 'MySQL' }
    ],
    developmentProcess: [
      'Customized menu modifier logic for custom milk and roast selections',
      'Conducted stress tests simulating 100 simultaneous order modifications',
      'Delivered hands-on training to floor staff and shift supervisors'
    ],
    result: 'Decreased customer wait times during peak morning rushes by 30% and improved ordering accuracy to 99.8%.',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: false,
    published: true,
    order: 13,
    seoTitle: 'Cafe Imran (OMS) — Cafe Order Management System | Sameer Habib',
    seoDescription: 'Case study of Cafe Imran Order Management System developed with Laravel by Sameer Habib.',
    seoKeywords: ['Cafe Imran OMS', 'Restaurant OMS', 'Laravel POS', 'Sameer Habib']
  },
  {
    id: 'proj-airnova',
    title: 'Airnova (OMS)',
    slug: 'airnova-oms',
    subtitle: 'Logistics, Cargo & Commercial Order Management Tracking System',
    shortDescription: 'Commercial Order Management System (OMS) and parcel shipment tracking platform with multi-stop status milestones and automated manifests.',
    longDescription: 'Engineered custom business logic and shipment order tracking for Airnova (OMS). Built with Laravel and MySQL, the platform orchestrates booking consignment numbers, assigning carrier routes, verifying warehouse handoffs, and generating customs dispatch documents.',
    category: 'Logistics & Supply Chain',
    year: '2023 - 2024',
    client: 'Airnova Logistics',
    role: 'Full-Stack Developer (Software Byte / Project)',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'AJAX', 'Tailwind CSS'],
    features: [
      'Automated airway bill (AWB) generation with barcode tracking',
      'Step-by-step consignment status pipeline from intake to final destination delivery',
      'Real-time shipment lookup API for corporate clients and partner dispatchers',
      'Bulk manifest export and warehouse inventory audit logging'
    ],
    problem: 'Clients experienced lack of visibility into multi-hop airfreight consignments with manual phone tracking.',
    solution: 'Architected a centralized order management portal where milestone updates instantly propagate to client tracking portals.',
    challenges: 'Ensuring high data consistency across distributed warehouse scanning checkpoints.',
    architectureNodes: [
      { title: 'Tracking Portal', description: 'Public and corporate airway bill tracking interface', tech: 'Tailwind / AJAX' },
      { title: 'Logistics State Machine', description: 'Enforces milestone progression rules and customs clearances', tech: 'Laravel Engine' },
      { title: 'Consignment Database', description: 'Normalized MySQL data store with indexed tracking numbers', tech: 'MySQL 8' }
    ],
    developmentProcess: [
      'Mapped airfreight clearance and delivery transit checkpoints',
      'Engineered idempotent REST endpoints for warehouse barcode scanners',
      'Conducted load testing for high-volume airway bill lookups'
    ],
    result: 'Reduced customer support tracking calls by 60% through self-service airway bill verification and real-time status updates.',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: false,
    published: true,
    order: 14,
    seoTitle: 'Airnova (OMS) — Logistics & Order Tracking Platform | Sameer Habib',
    seoDescription: 'Case study of Airnova Order Management System engineered by Sameer Habib.',
    seoKeywords: ['Airnova OMS', 'Logistics Order Management', 'Laravel Shipment Tracking', 'Sameer Habib']
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-fullstack',
    title: 'Full Stack Development',
    slug: 'full-stack-development',
    description: 'End-to-end web application architecture from normalized database schemas to fluid, responsive user interfaces.',
    detailedContent: 'Comprehensive development spanning backend business logic, database migrations, security policies, RESTful API endpoints, and modern React/Next.js frontend views. Built with code quality, testability, and long-term maintainability at the forefront.',
    iconName: 'Code2',
    features: [
      'Clean Model-View-Controller (MVC) and component architectures',
      'Secure authentication, session management, and role-based permissions',
      'Normalized relational database modeling and query tuning',
      'Automated testing integration and CI/CD deployment readiness'
    ],
    technologies: ['Laravel', 'PHP', 'React.js', 'Next.js', 'MySQL', 'TypeScript'],
    order: 1,
    published: true,
    seoTitle: 'Full Stack Development Services | Sameer Habib',
    seoDescription: 'Professional full-stack web development services by Sameer Habib. Scalable backends with Laravel and responsive frontends with React and Next.js.'
  },
  {
    id: 'srv-laravel',
    title: 'Laravel Development',
    slug: 'laravel-development',
    description: 'Custom web application engineering with Laravel 10+, Eloquent ORM, robust routing, and secure API gateways.',
    detailedContent: 'Leveraging the full power of the Laravel ecosystem for robust enterprise applications. From complex database transactions and queue workers to custom administrative CMS panels and REST APIs.',
    iconName: 'Server',
    features: [
      'Eloquent ORM relationship design and eager-loading optimizations',
      'Custom artisan commands, background queues, and scheduled tasks',
      'Bespoke admin portals for content, users, and orders',
      'Strict CSRF, XSS, and SQL injection security safeguards'
    ],
    technologies: ['Laravel 10', 'PHP 8.2+', 'Eloquent ORM', 'Blade', 'MySQL'],
    order: 2,
    published: true,
    seoTitle: 'Custom Laravel Development Services | Sameer Habib',
    seoDescription: 'Expert Laravel web application development by Sameer Habib. Robust backends, APIs, and administrative portals built on PHP and MySQL.'
  },
  {
    id: 'srv-php',
    title: 'PHP Backend Development',
    slug: 'php-development',
    description: 'Modern object-oriented PHP engineering following PSR standards, efficient database communication, and secure logic.',
    detailedContent: 'Reliable backend services developed in modern PHP. Specializing in high-throughput data processing, legacy PHP refactoring, custom API backends, and robust integration with MySQL databases.',
    iconName: 'FileCode',
    features: [
      'Modern PHP 8+ typed properties, attributes, and match expressions',
      'Secure password hashing, encryption, and token verification',
      'Database connection pooling and parameterized query protection',
      'Seamless deployment on Linux and cPanel web servers'
    ],
    technologies: ['PHP 8+', 'Composer', 'MySQL', 'PDO', 'Linux'],
    order: 3,
    published: true,
    seoTitle: 'PHP Backend Development Services | Sameer Habib',
    seoDescription: 'Reliable PHP backend engineering services by Sameer Habib. High-performance logic, database integrations, and legacy code modernization.'
  },
  {
    id: 'srv-react-nextjs',
    title: 'React & Next.js Development',
    slug: 'react-development',
    description: 'Building interactive client applications and SEO-optimized web experiences with React.js and Next.js.',
    detailedContent: 'Crafting performant, accessible single-page applications and hybrid server-rendered platforms. Focused on sub-second initial page loads, intuitive UI animations, and clean state management.',
    iconName: 'Layers',
    features: [
      'Next.js Server Components and dynamic route handlers',
      'Tailwind CSS design system implementation with responsive precision',
      'Custom React hooks for localized and global application state',
      'Lighthouse score optimization for Core Web Vitals compliance'
    ],
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    order: 4,
    published: true,
    seoTitle: 'React & Next.js Development Services | Sameer Habib',
    seoDescription: 'High-performance React.js and Next.js frontend development by Sameer Habib. Fast, accessible, and search-engine optimized.'
  },
  {
    id: 'srv-ecommerce',
    title: 'E-Commerce Development',
    slug: 'ecommerce-development',
    description: 'Scalable online storefronts with smart shopping lists, inventory catalogs, AJAX shopping carts, and order workflows.',
    detailedContent: 'From product SKU management and category hierarchies to frictionless checkout flows. Drawing from real-world architecture in platforms like Livshem to build fast, conversion-optimized shopping experiences.',
    iconName: 'ShoppingCart',
    features: [
      'Custom shopping lists with instant cart conversion',
      'AJAX asynchronous cart operations for zero page flickers',
      'Inventory stock tracking, low-stock warnings, and order dashboards',
      'Multi-currency and localized shipping calculation support'
    ],
    technologies: ['Laravel', 'MySQL', 'jQuery AJAX', 'Bootstrap 5', 'REST APIs'],
    order: 5,
    published: true,
    seoTitle: 'E-Commerce Development Services | Sameer Habib',
    seoDescription: 'Scalable e-commerce web platform engineering by Sameer Habib. Asynchronous cart flows, catalog management, and seamless order checkout.'
  },
  {
    id: 'srv-api',
    title: 'REST API Development',
    slug: 'api-development',
    description: 'Designing deterministic, documented, and secure RESTful APIs for web and mobile client applications.',
    detailedContent: 'Clean API contract engineering using semantic HTTP verbs, standard JSON payloads, rate limiting, and Bearer token authentication. Documented with Postman collections for rapid third-party integration.',
    iconName: 'Network',
    features: [
      'RESTful resource routing with predictable endpoints',
      'JSON API response standards with error code contracts',
      'Sanctum, Passport, or JWT token authentication mechanisms',
      'Rate limiting and input validation schemas'
    ],
    technologies: ['Laravel Sanctum', 'PHP', 'Express.js', 'Postman', 'JSON'],
    order: 6,
    published: true,
    seoTitle: 'REST API Development Services | Sameer Habib',
    seoDescription: 'Secure, deterministic REST API development by Sameer Habib. Token authentication, rate limiting, and complete endpoint documentation.'
  }
];

export const initialProcessSteps: ProcessStepItem[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    title: 'Discover',
    description: 'Understanding business objectives, user requirements, technical constraints, and data flows.',
    details: [
      'Stakeholder alignment and functional scoping',
      'Data modeling and entity relationship analysis',
      'Architecture selection based on performance requirements'
    ],
    order: 1,
    published: true
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: 'Plan',
    description: 'Defining database schemas, API contracts, milestones, and technological tooling.',
    details: [
      'Database normalization (3NF) and index planning',
      'RESTful endpoint specifications and request schemas',
      'Git branching strategy and milestone timeline'
    ],
    order: 2,
    published: true
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: 'Design',
    description: 'Wireframing responsive interfaces, layout hierarchies, and accessible interactive states.',
    details: [
      'High-contrast typography pairing and design token definition',
      'Component modularity planning in Tailwind CSS',
      'Interactive state mapping (loading, empty, error, success)'
    ],
    order: 3,
    published: true
  },
  {
    id: 'step-4',
    stepNumber: '04',
    title: 'Develop',
    description: 'Writing clean, modular code across backend controllers, models, and frontend components.',
    details: [
      'Clean MVC code organization with Eloquent / ORM data models',
      'Asynchronous AJAX / client fetching routines',
      'Zero-leak state management and modular components'
    ],
    order: 4,
    published: true
  },
  {
    id: 'step-5',
    stepNumber: '05',
    title: 'Test',
    description: 'Rigorous validation of edge cases, database constraints, security checks, and cross-browser testing.',
    details: [
      'SQL query profiling and eager loading checks',
      'Form validation, XSS prevention, and CSRF token verification',
      'Mobile responsive testing across 360px - 1440px viewports'
    ],
    order: 5,
    published: true
  },
  {
    id: 'step-6',
    stepNumber: '06',
    title: 'Launch',
    description: 'Production deployment, server configuration, SSL activation, sitemap generation, and SEO monitoring.',
    details: [
      'Production asset compilation and cache header setup',
      'Database migration execution on live server',
      'Search Console submission, robots.txt check, and live health audit'
    ],
    order: 6,
    published: true
  }
];

export const initialWhyWorkWithMe = [
  {
    id: 'why-1',
    title: 'Full Stack Perspective',
    description: 'Bridging backend database logic and front-end user experience seamlessly. No disconnect between API design and UI implementation.',
    icon: 'Layers'
  },
  {
    id: 'why-2',
    title: 'Proven Production Experience',
    description: 'Hands-on track record building real commercial platforms like Livshem and agency web solutions at The Designs Firm and LiveBits.',
    icon: 'CheckCircle2'
  },
  {
    id: 'why-3',
    title: 'Performance & SEO First',
    description: 'Obsessed with sub-second page loads, clean semantic HTML, structured JSON-LD schemas, and high Google Lighthouse scores.',
    icon: 'Zap'
  },
  {
    id: 'why-4',
    title: 'Reliable Communication',
    description: 'Transparent milestone updates, documented codebases, and proactive problem-solving from discovery to post-launch support.',
    icon: 'MessageSquare'
  }
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Hassan R.',
    role: 'Product Lead',
    company: 'LiveBits Technology',
    quote: 'Sameer demonstrated outstanding technical reliability while engineering core modules for Livshem. His ability to structure clean MySQL databases and implement instant AJAX shopping cart routines significantly elevated the product.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    verified: true,
    order: 1,
    published: true
  },
  {
    id: 'test-2',
    name: 'Zainab M.',
    role: 'Creative Director',
    company: 'The Designs Firm',
    quote: 'Working with Sameer on our agency web platform was effortless. He has a rare eye for design fidelity while ensuring backend logic and SEO structures remain completely rock-solid.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    verified: true,
    order: 2,
    published: true
  },
  {
    id: 'test-3',
    name: 'Tariq A.',
    role: 'Department Coordinator',
    company: 'College Administration',
    quote: 'Sameer built our library database system from the ground up. His normalized schema and intuitive role access solved months of manual book tracking headaches in days.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    verified: true,
    order: 3,
    published: true
  }
];

export const initialAchievements: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Full Stack Production Deployment (Livshem)',
    organization: 'LiveBits',
    year: '2025',
    description: 'Successfully deployed a multi-module e-commerce platform processing hundreds of product listings and asynchronous cart requests.',
    order: 1,
    published: true
  },
  {
    id: 'ach-2',
    title: '98+ Core Web Vitals Lighthouse Benchmark',
    organization: 'The Designs Firm',
    year: '2026',
    description: 'Optimized creative agency platform achieving top-tier scores across SEO, Performance, Accessibility, and Best Practices.',
    order: 2,
    published: true
  },
  {
    id: 'ach-3',
    title: 'Academic Database Architecture Excellence',
    organization: 'Computer Science Department',
    year: '2023',
    description: 'Recognized for engineering the automated library circulation management system with normalized relational integrity.',
    order: 3,
    published: true
  }
];

export const initialBlogPosts: BlogPostItem[] = [
  {
    id: 'blog-1',
    title: 'Laravel E-Commerce Architecture: Lessons From Building a Real Shopping Platform',
    slug: 'laravel-ecommerce-architecture',
    excerpt: 'A practical architectural walkthrough of structuring product catalogs, cart state, and relational MySQL schemas in Laravel 10.',
    content: `## The Real Challenges of E-Commerce Backends

When designing an e-commerce platform like Livshem, the biggest hurdle is rarely displaying a product card; it is managing mutable state—such as real-time inventory levels, asynchronous cart modifications, and composite shopping lists—without degrading server throughput.

### 1. Database Normalization & Eager Loading
A common pitfall in Laravel applications is falling victim to the N+1 query problem when loading nested product categories and variant prices. In Livshem, we structured categories and subcategories hierarchically while utilizing Eloquent eager loading:

\`\`\`php
// Eager loading categories and active images with minimal SQL queries
$products = Product::with(['category', 'subCategory', 'primaryImage'])
    ->where('is_active', true)
    ->paginate(24);
\`\`\`

By enforcing database indexes on \`category_id\`, \`slug\`, and \`is_active\`, query execution times dropped below 15ms even as catalog items expanded.

### 2. Eliminating Full-Page Cart Refreshes
Customer drop-off spikes when every quantity change triggers a full browser reload. We implemented an asynchronous AJAX pipeline where:
- The client sends an atomic payload with product ID and requested delta.
- Laravel validates stock levels inside a DB transaction lock (\`lockForUpdate\`).
- The controller returns the calculated item subtotal, updated cart badge count, and fresh cart summary HTML fragment.

### 3. Key Takeaways
- Always profile queries using Laravel Debugbar or Telescope during development.
- Wrap multi-table cart and checkout operations in \`DB::transaction()\` blocks.
- Separate transient cart sessions from permanent shopping list tables for clear domain separation.`,
    category: 'Laravel & PHP',
    readTime: '6 min read',
    authorName: 'Sameer Habib',
    authorRole: 'Full Stack Developer',
    publishedDate: '2026-08-14',
    updatedDate: '2026-09-02',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop',
    tags: ['Laravel', 'PHP', 'E-Commerce', 'MySQL', 'Architecture'],
    featured: true,
    status: 'published',
    quickAnswer: 'To build a high-performance Laravel e-commerce platform, combine normalized MySQL schemas with indexed foreign keys, eliminate N+1 queries via eager loading (with()), handle cart updates via atomic AJAX endpoints, and wrap inventory deductions in database transaction locks.',
    keyTakeaways: [
      'Use eager loading (with()) to eradicate N+1 database queries across hierarchical product trees.',
      'Enforce atomic database transactions during checkout to prevent duplicate inventory deductions.',
      'Decouple persistent shopping lists from temporary cart sessions to provide a superior user experience.'
    ],
    faqs: [
      {
        question: 'Why choose Laravel over raw PHP for e-commerce?',
        answer: 'Laravel provides out-of-the-box CSRF protection, secure Eloquent ORM parameter binding, battle-tested authentication, and a clean MVC architecture that reduces development time while enforcing security best practices.'
      },
      {
        question: 'How do you handle stock race conditions in Laravel?',
        answer: 'By utilizing database row locks (e.g., $product = Product::where("id", $id)->lockForUpdate()->first();) inside a DB::transaction() block before updating inventory counts.'
      }
    ],
    relatedProjectSlug: 'livshem',
    relatedSkillSlug: 'laravel',
    seoTitle: 'Laravel E-Commerce Architecture & Real-World Lessons | Sameer Habib',
    seoDescription: 'Learn how to architect a scalable Laravel 10 e-commerce platform with normalized MySQL databases, eager loading, and AJAX cart state by Sameer Habib.',
    seoKeywords: ['Laravel E-Commerce Architecture', 'Livshem Case Study', 'Laravel MySQL Performance', 'Sameer Habib Blog']
  },
  {
    id: 'blog-2',
    title: 'How to Structure Shopping Lists in a Laravel Application',
    slug: 'structure-shopping-lists-laravel',
    excerpt: 'Detailed guide on designing relational database tables and controller logic for user-managed shopping lists with instant cart conversion.',
    content: `## Why Shopping Lists Differ From Carts

A shopping cart represents an ephemeral purchase intent, whereas a shopping list is a long-term reference document created by customers to plan regular household or business purchases.

### Relational Schema Design

To model this cleanly in MySQL via Laravel migrations, we split the domain into two tables:

\`\`\`php
// Migration for shopping_lists
Schema::create('shopping_lists', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('name');
    $table->boolean('is_default')->default(false);
    $table->timestamps();
});

// Migration for shopping_list_items
Schema::create('shopping_list_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('shopping_list_id')->constrained()->onDelete('cascade');
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->unsignedInteger('quantity')->default(1);
    $table->boolean('is_checked')->default(false);
    $table->timestamps();
    
    $table->unique(['shopping_list_id', 'product_id']);
});
\`\`\`

### Transferring List Items to Cart
The standout feature in Livshem is the 'Move All Checked Items to Cart' button. The backend controller loops through all checked items, verifies real-time stock availability, and creates or updates cart sessions within a single transactional cycle.

### Conclusion
Distinguishing persistent lists from active cart states makes your application resilient against abandoned carts while giving customers an intuitive organizational tool.`,
    category: 'Backend & Database',
    readTime: '5 min read',
    authorName: 'Sameer Habib',
    authorRole: 'Full Stack Developer',
    publishedDate: '2026-07-28',
    updatedDate: '2026-08-10',
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop',
    tags: ['Laravel', 'MySQL', 'Database Design', 'PHP'],
    featured: false,
    status: 'published',
    quickAnswer: 'Separate shopping lists from carts by using dedicated shopping_lists and shopping_list_items relational tables with unique constraints on (list_id, product_id). Transfer items into the cart using transactional controllers that verify stock levels before updating the user session.',
    keyTakeaways: [
      'Model shopping lists as independent persistent entities separate from session-bound carts.',
      'Enforce composite unique keys on (shopping_list_id, product_id) to prevent duplicate rows.',
      'Allow instant batch transfer into the active cart with inventory verification.'
    ],
    relatedProjectSlug: 'livshem',
    relatedSkillSlug: 'mysql',
    seoTitle: 'How to Structure Shopping Lists in Laravel & MySQL | Sameer Habib',
    seoDescription: 'Guide on designing relational schemas and controller logic for user shopping lists in Laravel applications by Sameer Habib.',
    seoKeywords: ['Laravel Shopping List', 'Database Schema Design', 'Livshem Architecture', 'PHP MySQL Tutorial']
  },
  {
    id: 'blog-3',
    title: 'Building AJAX-Powered E-Commerce Features with Laravel and jQuery',
    slug: 'building-ajax-ecommerce-features-laravel',
    excerpt: 'Step-by-step techniques to create smooth, zero-refresh shopping cart experiences with robust CSRF protection and error boundaries.',
    content: `## Asynchronous Interactivity Without Heavy Frameworks

While Single Page Applications (SPAs) are popular, many production systems benefit enormously from server-rendered Laravel views augmented with lightweight jQuery AJAX. This approach delivers lightning-fast initial load times, perfect search engine indexability, and fluid in-page actions.

### 1. Securing AJAX Calls with CSRF Headers
In Laravel, every POST, PUT, or DELETE request must pass CSRF validation:

\`\`\`javascript
// Configure jQuery to pass Laravel CSRF token on all AJAX requests
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
\`\`\`

### 2. Debouncing Search & Quantity Selectors
Preventing rapid clicking from spamming the server:
- Debounce input events when searching products or adjusting quantities.
- Disable the target button temporarily and show a subtle inline spinner.
- Replace only the targeted DOM node (e.g. subtotal pill and cart badge counter) upon receiving the JSON response.

### 3. Graceful Error Handling
If an item goes out of stock mid-action, return an informative HTTP 422 JSON response with a localized error message rather than a generic server 500 error.`,
    category: 'Frontend & Backend',
    readTime: '4 min read',
    authorName: 'Sameer Habib',
    authorRole: 'Full Stack Developer',
    publishedDate: '2026-06-19',
    updatedDate: '2026-07-01',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: ['jQuery', 'AJAX', 'Laravel', 'JavaScript', 'Web Development'],
    featured: false,
    status: 'published',
    quickAnswer: 'Attach the Laravel CSRF token to $.ajaxSetup headers, debounce frequent user inputs, return structured JSON payloads containing updated subtotal calculations, and update only the targeted DOM nodes rather than reloading the page.',
    keyTakeaways: [
      'Always configure X-CSRF-TOKEN globally on jQuery ajaxSetup.',
      'Debounce quantity selectors to protect the backend from burst requests.',
      'Return clear HTTP 422 validation errors when product stock constraints fail.'
    ],
    relatedProjectSlug: 'livshem',
    relatedSkillSlug: 'jquery-ajax',
    seoTitle: 'Building AJAX E-Commerce Features in Laravel & jQuery | Sameer Habib',
    seoDescription: 'Learn how to implement smooth AJAX cart updates, debounced search, and CSRF protection in Laravel with jQuery by Sameer Habib.',
    seoKeywords: ['Laravel AJAX Cart', 'jQuery Laravel E-Commerce', 'Sameer Habib Full Stack Tutorial']
  },
  {
    id: 'blog-4',
    title: 'React vs Next.js for Modern Web Applications: An Architectural Comparison',
    slug: 'react-vs-nextjs-architectural-comparison',
    excerpt: 'When to choose pure client-side React and when to adopt Next.js Server Components, based on real production requirements.',
    content: `## Beyond the Hype: Practical Decision Matrix

Both React and Next.js dominate modern web development, but selecting between them requires assessing search visibility needs, initial load latency, server deployment constraints, and authentication architecture.

### When React (SPA) Excels:
1. **Authenticated Internal Dashboards**: When the user must log in before accessing any page (e.g., admin portals, task management systems), SEO crawlability is irrelevant. A client-side SPA with client-side routing shines here.
2. **Offline or Embedded Contexts**: SPAs can easily be packaged as desktop electron apps or distributed static files on standard CDNs.

### When Next.js Is Essential:
1. **Public Portfolios & Brand Websites**: Public sites like The Designs Firm require search engines and social scrapers (OpenGraph) to immediately read pre-rendered HTML without waiting for client JavaScript bundles to execute.
2. **Core Web Vitals & Instant LCP**: Server Components stream pre-rendered HTML directly to the browser, significantly improving Largest Contentful Paint (LCP).
3. **Built-in API Handlers**: Serverless route handlers keep API keys secure and reduce deployment overhead.

### Architectural Summary
For private, highly interactive SaaS dashboards, client-side React with a dedicated Laravel API backend offers clean separation of concerns. For public marketing sites, agencies, and e-commerce storefronts, Next.js provides the SEO and performance foundation necessary for growth.`,
    category: 'React & Next.js',
    readTime: '5 min read',
    authorName: 'Sameer Habib',
    authorRole: 'Full Stack Developer',
    publishedDate: '2026-05-10',
    updatedDate: '2026-06-05',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    tags: ['React.js', 'Next.js', 'Architecture', 'Frontend', 'SEO'],
    featured: true,
    status: 'published',
    quickAnswer: 'Choose client-side React for authenticated internal portals and complex dashboards where SEO is unnecessary; choose Next.js for public portfolios, content platforms, and e-commerce where server-side rendering, OpenGraph tags, and sub-second Core Web Vitals are vital.',
    keyTakeaways: [
      'Next.js Server Components solve search crawlability and social sharing out of the box.',
      'Client-side React SPAs remain optimal for closed internal tools and offline applications.',
      'Align your architectural choice with whether the user enters before or after authentication.'
    ],
    relatedProjectSlug: 'the-designs-firm',
    relatedSkillSlug: 'nextjs',
    seoTitle: 'React vs Next.js: Architectural Comparison for 2026 | Sameer Habib',
    seoDescription: 'Comprehensive architectural comparison between React.js and Next.js by Sameer Habib. Choose the right framework for SEO, dashboards, and performance.',
    seoKeywords: ['React vs Next.js', 'Frontend Architecture 2026', 'Sameer Habib Engineering Blog']
  }
];

export const initialContactMessages: ContactMessageItem[] = [
  {
    id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@enterprise-growth.io',
    subject: 'Project Consultation: Laravel Inventory Portal',
    message: 'Hi Sameer, we came across your work on Livshem and were impressed by your clean database architecture and AJAX workflows. We have an upcoming inventory management web platform project and would love to discuss your availability for consulting.',
    status: 'unread',
    createdAt: '2026-09-19T10:15:00Z'
  },
  {
    id: 'msg-2',
    name: 'Marcus Chen',
    email: 'marcus@pixelcraft-media.com',
    subject: 'Full Stack Developer Contract Role',
    message: 'Hello Sameer, your work on The Designs Firm portfolio showcases exactly the blend of engineering precision and modern aesthetics we need. Are you open for a 3-month contract role building responsive React and PHP applications?',
    status: 'read',
    createdAt: '2026-09-17T14:45:00Z'
  }
];

export const initialMediaItems: MediaItem[] = [
  {
    id: 'media-cv',
    filename: 'Sameer_Habib_Full_Stack_Developer_CV.pdf',
    url: '/downloads/sameer-habib-cv.pdf',
    altText: 'Official Curriculum Vitae of Sameer Habib, Full Stack Developer',
    caption: 'Official Resume / CV document covering technical proficiencies, work history, and academic achievements',
    size: '148 KB',
    type: 'application/pdf',
    uploadedAt: '2026-09-15',
    usedIn: 'Navbar & Hero Download Buttons'
  },
  {
    id: 'media-livshem-hero',
    filename: 'livshem-ecommerce-platform.jpg',
    url: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop',
    altText: 'LIVSHEM E-Commerce Platform Dashboard and Product Showcase',
    caption: 'Hero screenshot of Livshem shopping platform showing product catalog and cart workflow',
    size: '342 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-10',
    usedIn: 'Projects Section / Livshem Case Study'
  },
  {
    id: 'media-livshem-cart',
    filename: 'livshem-ajax-cart-checkout.jpg',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    altText: 'LIVSHEM Dynamic AJAX Shopping Cart & Instant Checkout',
    caption: 'Zero-refresh shopping cart quantity recalculation and real-time total calculator',
    size: '280 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-10',
    usedIn: 'Livshem Gallery Screenshot #1'
  },
  {
    id: 'media-livshem-mobile',
    filename: 'livshem-mobile-storefront.jpg',
    url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1000&q=80',
    altText: 'LIVSHEM Mobile Responsive Storefront Experience',
    caption: 'Fluid mobile navigation and swipeable product carousels across handheld devices',
    size: '310 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-10',
    usedIn: 'Livshem Gallery Screenshot #2'
  },
  {
    id: 'media-livshem-analytics',
    filename: 'livshem-merchant-analytics-admin.jpg',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    altText: 'LIVSHEM Merchant Analytics and Order Tracking Dashboard',
    caption: 'Real-time sales charts, revenue metrics, and inventory movement visualization',
    size: '365 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-10',
    usedIn: 'Livshem Gallery Screenshot #3'
  },
  {
    id: 'media-designs-firm',
    filename: 'the-designs-firm-agency.jpg',
    url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop',
    altText: 'The Designs Firm Creative Agency Website Showcase',
    caption: 'High-contrast responsive agency platform built with Next.js and Tailwind CSS',
    size: '298 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-12',
    usedIn: 'Projects Section / The Designs Firm'
  },
  {
    id: 'media-designs-gallery',
    filename: 'the-designs-firm-portfolio-grid.jpg',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    altText: 'The Designs Firm Interactive Portfolio Gallery',
    caption: 'Animated client case study grid with smooth filter transitions and responsive columns',
    size: '312 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-12',
    usedIn: 'The Designs Firm Gallery Screenshot #1'
  },
  {
    id: 'media-designs-typography',
    filename: 'the-designs-firm-brand-identity.jpg',
    url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80',
    altText: 'The Designs Firm Brand Identity & Visual Guidelines',
    caption: 'Design system typography scale and corporate color tokens presentation',
    size: '275 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-12',
    usedIn: 'The Designs Firm Gallery Screenshot #2'
  },
  {
    id: 'media-library-system',
    filename: 'college-library-system-inventory.jpg',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
    altText: 'College Library Circulation Management Platform',
    caption: 'Automated book circulation and student record database interface',
    size: '315 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-08',
    usedIn: 'Projects Section / College Library System'
  },
  {
    id: 'media-library-loans',
    filename: 'college-library-loans-borrowers.jpg',
    url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80',
    altText: 'College Library Borrower Accounts & Loan Transactions',
    caption: 'Student checkout history, automated due date reminders, and overdue fine calculators',
    size: '290 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-08',
    usedIn: 'College Library System Gallery Screenshot #1'
  },
  {
    id: 'media-library-reports',
    filename: 'college-library-circulation-reports.jpg',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    altText: 'College Library Circulation Analytics & Reports',
    caption: 'Semester inventory audits and automated PDF export reports for college administration',
    size: '340 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-08',
    usedIn: 'College Library System Gallery Screenshot #2'
  },
  {
    id: 'media-task-kanban',
    filename: 'task-management-kanban-board.jpg',
    url: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1000&q=80',
    altText: 'Task Management Interactive Kanban Board',
    caption: 'Drag and drop project workflow stages with real-time WebSocket state synchronization',
    size: '320 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-05',
    usedIn: 'Task Management App'
  },
  {
    id: 'media-api-topology',
    filename: 'api-gateway-microservices-topology.jpg',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    altText: 'API Gateway & JWT Authentication Topology Diagram',
    caption: 'Microservices architecture topology with rate limiting and secure bearer tokens',
    size: '390 KB',
    type: 'image/jpeg',
    uploadedAt: '2026-09-01',
    usedIn: 'Architecture Diagrams'
  }
];

export const initialRedirects: RedirectItem[] = [
  {
    id: 'redir-1',
    fromPath: '/old-livshem',
    toPath: '/projects/livshem',
    statusCode: 301,
    active: true,
    createdAt: '2026-08-01'
  },
  {
    id: 'redir-2',
    fromPath: '/agency-project',
    toPath: '/projects/the-designs-firm',
    statusCode: 301,
    active: true,
    createdAt: '2026-08-15'
  },
  {
    id: 'redir-3',
    fromPath: '/resume',
    toPath: '/downloads/sameer-habib-cv.pdf',
    statusCode: 302,
    active: true,
    createdAt: '2026-09-01'
  }
];

export const initialActivityLogs: ActivityLogItem[] = [
  {
    id: 'log-1',
    user: 'Sameer Habib (Super Admin)',
    action: 'Session Login',
    resource: 'Admin Dashboard authentication',
    timestamp: '2026-09-20 14:10:22',
    ip: '192.168.1.1'
  },
  {
    id: 'log-2',
    user: 'Sameer Habib (Super Admin)',
    action: 'Updated Project Case Study',
    resource: 'Livshem E-Commerce Architecture Diagram',
    timestamp: '2026-09-20 12:45:08',
    ip: '192.168.1.1'
  },
  {
    id: 'log-3',
    user: 'Sameer Habib (Super Admin)',
    action: 'Published Blog Article',
    resource: 'Laravel E-Commerce Architecture',
    timestamp: '2026-09-18 09:30:14',
    ip: '192.168.1.1'
  },
  {
    id: 'log-4',
    user: 'System Bot',
    action: 'SEO Health Audit Check',
    resource: 'Automated sitemap & canonical verification passed',
    timestamp: '2026-09-20 00:00:01',
    ip: '127.0.0.1'
  }
];

export const initialAnalytics: AnalyticsData = {
  totalPageViews: 8420,
  totalProjectViews: 4190,
  totalCvDownloads: 342,
  totalContactSubmissions: 28,
  recentViews: [
    { date: 'Sep 14', views: 512, uniqueVisitors: 320 },
    { date: 'Sep 15', views: 640, uniqueVisitors: 410 },
    { date: 'Sep 16', views: 720, uniqueVisitors: 480 },
    { date: 'Sep 17', views: 890, uniqueVisitors: 590 },
    { date: 'Sep 18', views: 950, uniqueVisitors: 640 },
    { date: 'Sep 19', views: 1100, uniqueVisitors: 780 },
    { date: 'Sep 20', views: 1250, uniqueVisitors: 890 }
  ],
  popularProjects: [
    { slug: 'livshem', title: 'LIVSHEM (E-Commerce Platform)', clicks: 1840 },
    { slug: 'the-designs-firm', title: 'The Designs Firm (Agency Platform)', clicks: 1320 },
    { slug: 'college-library-system', title: 'College Library System', clicks: 650 },
    { slug: 'task-management-app', title: 'Task Management App', clicks: 490 }
  ],
  popularServices: [
    { slug: 'full-stack-development', title: 'Full Stack Development', clicks: 920 },
    { slug: 'laravel-development', title: 'Laravel Development', clicks: 880 },
    { slug: 'ecommerce-development', title: 'E-Commerce Development', clicks: 670 }
  ],
  referrers: [
    { source: 'Direct / Bookmarks', percentage: 38 },
    { source: 'LinkedIn Profiles', percentage: 29 },
    { source: 'Google Search Organic', percentage: 21 },
    { source: 'GitHub Repositories', percentage: 12 }
  ],
  topSearchQueries: [
    { query: 'Sameer Habib Full Stack Developer', impressions: 1420, clicks: 310, ctr: '21.8%' },
    { query: 'Sameer Habib Laravel', impressions: 980, clicks: 195, ctr: '19.8%' },
    { query: 'Livshem E-Commerce Laravel case study', impressions: 640, clicks: 142, ctr: '22.1%' },
    { query: 'Laravel PHP developer Pakistan portfolio', impressions: 520, clicks: 88, ctr: '16.9%' }
  ]
};

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What core technologies does Sameer Habib specialize in?',
    answer: 'Sameer specializes in full-stack web application development, predominantly using Laravel 10+ and PHP on the backend paired with React.js, Next.js, and Tailwind CSS on the frontend, with MySQL and PostgreSQL for relational databases.',
    category: 'General',
    order: 1,
    published: true
  },
  {
    id: 'faq-2',
    question: 'Where has Sameer gained professional experience?',
    answer: 'Sameer has worked as a Full Stack Developer at The Designs Firm (July 2026 – Present) and LiveBits (January 2024 – June 2026), alongside delivering academic and commercial software projects including Livshem and the College Library System.',
    category: 'Experience',
    order: 2,
    published: true
  },
  {
    id: 'faq-3',
    question: 'Can Sameer build both backend APIs and modern responsive frontends?',
    answer: 'Yes. Sameer provides full-stack capability—architecting normalized database models, designing secure RESTful API controllers with Laravel/Node, and crafting pixel-perfect, accessible client interfaces using React, Next.js, and Tailwind CSS.',
    category: 'Services',
    order: 3,
    published: true
  },
  {
    id: 'faq-4',
    question: 'How can recruiters or clients get in touch with Sameer?',
    answer: 'You can contact Sameer directly through the interactive contact form on this platform, email him at sameerhabib72@gmail.com, or reach out via his verified LinkedIn and GitHub profiles.',
    category: 'Contact',
    order: 4,
    published: true
  }
];

export const initialCvVersions: CVVersionItem[] = [
  {
    id: 'cv-v3-2',
    version: 'v3.2 (Current)',
    title: 'Sameer Habib - Full Stack Engineer (ATS Verified)',
    filename: 'Sameer_Habib_FullStack_Resume_2026.pdf',
    fileSize: '142 KB',
    uploadDate: '2026-09-18',
    type: 'PDF',
    isActive: true,
    downloadEnabled: true,
    notes: 'Updated with The Designs Firm achievements and 3+ years experience summary.'
  },
  {
    id: 'cv-v3-1',
    version: 'v3.1 (Archived)',
    title: 'Sameer Habib - Laravel Developer Resume',
    filename: 'Sameer_Habib_Resume_v3.1.pdf',
    fileSize: '138 KB',
    uploadDate: '2026-06-10',
    type: 'PDF',
    isActive: false,
    downloadEnabled: false,
    notes: 'Pre-promotion version focused strictly on LiveBits and academic projects.'
  }
];

export const initialCustomPages: CustomPageItem[] = [
  {
    id: 'page-hire',
    slug: 'hire-me',
    title: 'Work With Sameer Habib',
    description: 'Contract, Full-Time, and Architectural Consulting Engagements',
    content: '## Let\'s Build Robust Software Together\n\nI specialize in end-to-end full-stack development, delivering performant Laravel APIs, scalable database architectures, and interactive React/Next.js interfaces.\n\n### Engagement Models:\n- **Full-Time Engineering Roles** (Remote or Hybrid)\n- **Contract & Architecture Consulting**\n- **E-Commerce & MVP Sprint Builds**\n\nDirect inquiries: sameerhabib72@gmail.com',
    status: 'published',
    updatedAt: '2026-09-15',
    seoTitle: 'Hire Sameer Habib • Full Stack Developer & Laravel Engineer',
    seoDescription: 'Available for full-time engineering roles, technical architecture consulting, and high-impact web application development.'
  },
  {
    id: 'page-privacy',
    slug: 'privacy-policy',
    title: 'Privacy & Data Protection Policy',
    description: 'Portfolio Privacy, Analytics & Contact Information Safeguards',
    content: '## Privacy Policy\n\nThis personal developer portfolio values your privacy. We do not sell, rent, or monetize your contact submissions or visit telemetry.\n\n- **Contact Form Data**: Retained strictly for direct professional communication.\n- **Telemetry**: Aggregated, privacy-centric page view telemetry without tracking cookies or cross-site fingerprinting.\n- **Data Deletion**: Inquiries can be expunged upon request to sameerhabib72@gmail.com.',
    status: 'published',
    updatedAt: '2026-09-01',
    seoTitle: 'Privacy Policy • Sameer Habib Portfolio',
    seoDescription: 'Transparent data handling policies for Sameer Habib\'s personal engineering portfolio.'
  }
];

export const initialSubscribers: SubscriberItem[] = [
  {
    id: 'sub-1',
    email: 'hiring.lead@techforward.io',
    subscribedAt: '2026-09-12',
    status: 'active',
    source: 'Blog Article Footer'
  },
  {
    id: 'sub-2',
    email: 'client.inquiries@apexsolutions.com',
    subscribedAt: '2026-09-17',
    status: 'active',
    source: 'Case Study Livshem'
  }
];

export const initialNotFoundLogs: NotFoundLogItem[] = [
  {
    id: 'nf-1',
    path: '/portfolio',
    hits: 28,
    lastSeen: '2026-09-20 14:10',
    suggestedRedirect: '#projects'
  },
  {
    id: 'nf-2',
    path: '/cv.pdf',
    hits: 19,
    lastSeen: '2026-09-19 18:22',
    suggestedRedirect: '/#contact'
  },
  {
    id: 'nf-3',
    path: '/react-developer',
    hits: 11,
    lastSeen: '2026-09-18 09:44',
    suggestedRedirect: '#skills'
  }
];

export const initialNotifications: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'New High-Priority Inquiry',
    message: 'New contact submission from Faisal Khan regarding Enterprise E-Commerce project.',
    type: 'info',
    timestamp: '15 mins ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'SEO Audit: All Valid',
    message: 'Structured Data and OpenGraph validation passed with 100% compliance.',
    type: 'success',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Automated Snapshot Created',
    message: 'Daily CMS state snapshot synchronized to client-side durable storage.',
    type: 'info',
    timestamp: 'Yesterday',
    read: true
  }
];

export const initialUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sameer Habib',
    email: 'sameerhabib72@gmail.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    lastLogin: '2026-09-20 15:15',
    twoFactorEnabled: true
  },
  {
    id: 'user-2',
    name: 'Editorial Assistant',
    email: 'editor@sameerhabib.dev',
    role: 'editor',
    status: 'active',
    lastLogin: '2026-09-18 11:30',
    twoFactorEnabled: false
  }
];

