export type Role = 'super_admin' | 'admin' | 'editor' | 'author' | 'analyst';

export type VisitorMode = 'all' | 'recruiter' | 'client' | 'developer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  status?: 'active' | 'inactive';
  lastLogin?: string;
  twoFactorEnabled?: boolean;
}

export interface SiteSettings {
  siteName: string;
  ownerName: string;
  roleTitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  availability: 'Available for Opportunities' | 'Booked' | 'Open for Consulting';
  cvUrl: string;
  cvFileName: string;
  siteUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  whatsappUrl: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  profileImage?: string;
  indexNowApiKey?: string;
  googleSearchConsoleVerification?: string;
  bingWebmasterVerification?: string;
  themePrimaryColor?: string;
  themeAccentColor?: string;
  animationLevel?: 'full' | 'reduced' | 'minimal' | 'off';
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
  announcementBar?: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkUrl?: string;
  };
  emailNotificationSettings?: {
    enabled: boolean;
    notificationEmail: string;
    notifyOnContact: boolean;
    notifyOnAiInquiry: boolean;
    smtpConfig?: SmtpConfig;
  };
}

export interface HeroSectionData {
  badge: string;
  heading: string;
  subtitle: string;
  rotatingRoles: string[];
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  terminalLines: { text: string; status?: 'success' | 'info' | 'warn' }[];
}

export interface AboutSectionData {
  heading: string;
  subheading: string;
  paragraphs: string[];
  location: string;
  experienceYears: number;
  completedProjects: number;
  satisfiedClients: number;
  highlightPoints: string[];
  codePhilosophy: string;
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  icon: string;
  order: number;
  published: boolean;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'CMS & E-Commerce';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 - 100
  experienceYears: string;
  iconName: string;
  slug: string;
  description: string;
  practicalExperience: string;
  featured: boolean;
  order: number;
  published: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Freelance' | 'Project-based';
  description: string;
  responsibilities: string[];
  technologies: string[];
  order: number;
  published: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description: string;
  order: number;
  published: boolean;
}

export interface ProjectArchitectureNode {
  title: string;
  description: string;
  tech: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  year: string;
  client: string;
  role: string;
  thumbnail: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  problem: string;
  solution: string;
  challenges: string;
  architectureNodes: ProjectArchitectureNode[];
  developmentProcess: string[];
  result: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedContent: string;
  iconName: string;
  features: string[];
  technologies: string[];
  order: number;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface ProcessStepItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  details: string[];
  order: number;
  published: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  verified: boolean;
  order: number;
  published: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  order: number;
  published: boolean;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  publishedDate: string;
  updatedDate: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft' | 'scheduled';
  quickAnswer: string;
  keyTakeaways: string[];
  faqs?: { question: string; answer: string }[];
  relatedProjectSlug?: string;
  relatedSkillSlug?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export interface SmtpConfig {
  enabled: boolean;
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName?: string;
  fromEmail?: string;
}

export interface EmailNotificationLog {
  id: string;
  recipient: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  phone?: string;
  source: string;
  status: 'sent' | 'delivered' | 'failed';
  provider: string;
  timestamp: string;
  errorMessage?: string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  budget?: string;
  timeline?: string;
  projectType?: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  altText: string;
  caption: string;
  size: string;
  type: string;
  uploadedAt: string;
  usedIn: string;
}

export interface RedirectItem {
  id: string;
  fromPath: string;
  toPath: string;
  statusCode: 301 | 302;
  active: boolean;
  createdAt: string;
}

export interface ActivityLogItem {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ip?: string;
}

export interface AnalyticsData {
  totalPageViews: number;
  totalProjectViews: number;
  totalCvDownloads: number;
  totalContactSubmissions: number;
  recentViews: { date: string; views: number; uniqueVisitors: number }[];
  popularProjects: { slug: string; title: string; clicks: number }[];
  popularServices: { slug: string; title: string; clicks: number }[];
  referrers: { source: string; percentage: number }[];
  topSearchQueries: { query: string; impressions: number; clicks: number; ctr: string }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

export interface CVVersionItem {
  id: string;
  version: string;
  title: string;
  filename: string;
  fileSize: string;
  uploadDate: string;
  type: 'PDF' | 'DOCX' | 'TXT';
  isActive: boolean;
  downloadEnabled: boolean;
  notes?: string;
}

export interface CustomPageItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  status: 'published' | 'draft';
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
}

export interface SubscriberItem {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  source: string;
}

export interface NotFoundLogItem {
  id: string;
  path: string;
  hits: number;
  lastSeen: string;
  suggestedRedirect?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  order: number;
  visible: boolean;
  target?: '_blank' | '_self';
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface SystemHealthReport {
  databaseStatus: 'healthy' | 'degraded' | 'error';
  storageUsage: string;
  emailService: 'connected' | 'not_configured';
  cacheStatus: 'operational' | 'cleared';
  cronJobs: 'running' | 'idle';
  lastBackup: string;
  appVersion: string;
  environment: 'production' | 'staging' | 'development';
}
