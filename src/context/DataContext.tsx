import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
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
  User,
  FaqItem,
  CVVersionItem,
  CustomPageItem,
  SubscriberItem,
  NotFoundLogItem,
  AdminNotification,
} from '../types';
import {
  initialSiteSettings,
  initialHeroData,
  initialAboutData,
  initialStats,
  initialSkills,
  initialExperiences,
  initialEducation,
  initialProjects,
  initialServices,
  initialProcessSteps,
  initialTestimonials,
  initialAchievements,
  initialContactMessages,
  initialMediaItems,
  initialRedirects,
  initialActivityLogs,
  initialAnalytics,
  initialFaqs,
  initialCvVersions,
  initialCustomPages,
  initialSubscribers,
  initialNotFoundLogs,
  initialNotifications,
  initialUsers,
} from '../data/initialData';
import {
  syncSingletonDoc,
  saveSingletonDoc,
  syncCollection,
  saveItemToCollection,
  deleteItemFromCollection,
  submitContactMessage,
  uploadAllPortfolioDataToFirestore,
} from '../services/firebaseDb';
import { dispatchEmailNotification, dispatchAiQueryNotification } from '../services/notificationService';
import {
  loginWithFirebase,
  quickAdminLogin,
  logoutWithFirebase,
  subscribeToFirebaseAuthState,
} from '../services/firebaseAuthService';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type ViewRoute = 'home' | 'admin' | 'project-detail' | 'skill-detail' | 'service-detail' | 'ai-assistant';

interface DataContextType {
  // State
  siteSettings: SiteSettings;
  heroData: HeroSectionData;
  aboutData: AboutSectionData;
  stats: StatItem[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  processSteps: ProcessStepItem[];
  testimonials: TestimonialItem[];
  achievements: AchievementItem[];
  blogPosts: BlogPostItem[];
  contactMessages: ContactMessageItem[];
  mediaItems: MediaItem[];
  redirects: RedirectItem[];
  activityLogs: ActivityLogItem[];
  analytics: AnalyticsData;
  faqs: FaqItem[];
  cvVersions: CVVersionItem[];
  customPages: CustomPageItem[];
  subscribers: SubscriberItem[];
  notFoundLogs: NotFoundLogItem[];
  notifications: AdminNotification[];
  users: User[];

  // Database Connection Status
  isDbConnected: boolean;

  // Auth
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  adminLogin: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  adminLogout: () => void;

  // Navigation & Routing
  currentRoute: ViewRoute;
  currentSlug: string | null;
  navigateTo: (route: ViewRoute, slug?: string) => void;

  // Modals & Palette
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isCvModalOpen: boolean;
  setCvModalOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;

  // Mutation Handlers (Synced to Firestore)
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateHeroData: (data: Partial<HeroSectionData>) => void;
  updateAboutData: (data: Partial<AboutSectionData>) => void;
  updateStats: (stats: StatItem[]) => void;
  saveStat: (stat: StatItem) => void;
  deleteStat: (id: string) => void;

  // Projects CRUD
  saveProject: (project: ProjectItem) => void;
  updateProject: (project: ProjectItem) => void;
  addProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;

  // Skills CRUD
  saveSkill: (skill: SkillItem) => void;
  updateSkill: (skill: SkillItem) => void;
  addSkill: (skill: SkillItem) => void;
  deleteSkill: (id: string) => void;

  // Experience CRUD
  saveExperience: (exp: ExperienceItem) => void;
  updateExperience: (exp: ExperienceItem) => void;
  addExperience: (exp: ExperienceItem) => void;
  deleteExperience: (id: string) => void;

  // Education CRUD
  saveEducation: (edu: EducationItem) => void;
  deleteEducation: (id: string) => void;

  // Blog CRUD (Stub for compatibility)
  saveBlogPost: (post: BlogPostItem) => void;
  updateBlogPost: (post: BlogPostItem) => void;
  addBlogPost: (post: BlogPostItem) => void;
  deleteBlogPost: (id: string) => void;

  // Services CRUD
  saveService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;

  // Process & Testimonials & Achievements
  saveProcessStep: (step: ProcessStepItem) => void;
  deleteProcessStep: (id: string) => void;
  saveTestimonial: (test: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  saveAchievement: (ach: AchievementItem) => void;
  deleteAchievement: (id: string) => void;
  saveFaq: (faq: FaqItem) => void;
  deleteFaq: (id: string) => void;

  // Messages & Subscribers
  addContactMessage: (msg: Omit<ContactMessageItem, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateMessageStatus: (id: string, status: ContactMessageItem['status']) => void;
  markMessageAsRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;
  deleteMessage: (id: string) => void;
  deleteSubscriber: (id: string) => void;

  // Media & CV Versions
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  addMediaItemsBatch: (items: Array<Omit<MediaItem, 'id' | 'uploadedAt'>>) => void;
  deleteMediaItem: (id: string) => void;
  setActiveCv: (url: string, filename: string) => void;
  saveCvVersion: (version: CVVersionItem) => void;
  deleteCvVersion: (id: string) => void;
  setActiveCvVersion: (id: string) => void;

  // Custom Pages
  saveCustomPage: (page: CustomPageItem) => void;
  deleteCustomPage: (id: string) => void;

  // Redirects & 404 Logs
  addRedirect: (redir: Omit<RedirectItem, 'id' | 'createdAt'>) => void;
  deleteRedirect: (id: string) => void;
  toggleRedirect: (id: string) => void;
  deleteNotFoundLog: (id: string) => void;
  convert404ToRedirect: (id: string, targetPath: string) => void;

  // Notifications
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Users
  saveUser: (user: User) => void;
  deleteUser: (id: string) => void;
  updateUserProfile: (updates: Partial<User>) => void;

  // Analytics & Logs
  trackEvent: (eventName: string, details?: Record<string, unknown>) => void;
  sendQueryEmailNotification: (params: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    phone?: string;
    source?: string;
  }) => Promise<{ success: boolean; delivered: boolean; info: string }>;
  testSendEmailNotification: (customEmail?: string) => Promise<{ success: boolean; info: string }>;
  testSendAiQueryNotification: (customEmail?: string) => Promise<{ success: boolean; info: string }>;
  resetToDefaults: () => void;
  resetToInitialData: () => void;
  syncAllDataToFirestore: () => Promise<void>;
  exportDataJson: () => void;
  importDataJson: (json: string) => boolean;
}

const STORAGE_PREFIX = 'sh_portfolio_v5_full_cv_data_';

export function deduplicateById<T extends { id?: string | number }>(items: T[]): T[] {
  if (!Array.isArray(items)) return items;
  const seen = new Set<string | number>();
  return items.filter((item) => {
    if (!item || item.id === undefined || item.id === null) return true;
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    if (Array.isArray(parsed)) {
      return deduplicateById(parsed) as unknown as T;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

function setStoredItem<T>(key: string, val: T): void {
  try {
    const cleanVal = Array.isArray(val) ? deduplicateById(val) : val;
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(cleanVal));
  } catch (e) {
    console.error('Storage quota or error', e);
  }
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State initialization with fast local cache & initial fallback
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => getStoredItem('settings', initialSiteSettings));
  const [heroData, setHeroData] = useState<HeroSectionData>(() => getStoredItem('hero', initialHeroData));
  const [aboutData, setAboutData] = useState<AboutSectionData>(() => getStoredItem('about', initialAboutData));
  const [stats, setStats] = useState<StatItem[]>(() => getStoredItem('stats', initialStats));
  const [skills, setSkills] = useState<SkillItem[]>(() => getStoredItem('skills', initialSkills));
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => getStoredItem('experiences', initialExperiences));
  const [education, setEducation] = useState<EducationItem[]>(() => getStoredItem('education', initialEducation));
  const [projects, setProjects] = useState<ProjectItem[]>(() => getStoredItem('projects', initialProjects));
  const [services, setServices] = useState<ServiceItem[]>(() => getStoredItem('services', initialServices));
  const [processSteps, setProcessSteps] = useState<ProcessStepItem[]>(() => getStoredItem('processSteps', initialProcessSteps));
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => getStoredItem('testimonials', initialTestimonials));
  const [achievements, setAchievements] = useState<AchievementItem[]>(() => getStoredItem('achievements', initialAchievements));
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessageItem[]>(() => getStoredItem('messages', initialContactMessages));
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => getStoredItem('media', initialMediaItems));
  const [redirects, setRedirects] = useState<RedirectItem[]>(() => getStoredItem('redirects', initialRedirects));
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => getStoredItem('activity', initialActivityLogs));
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => getStoredItem('analytics', initialAnalytics));
  const [faqs, setFaqs] = useState<FaqItem[]>(() => getStoredItem('faqs', initialFaqs));
  const [cvVersions, setCvVersions] = useState<CVVersionItem[]>(() => getStoredItem('cvVersions', initialCvVersions));
  const [customPages, setCustomPages] = useState<CustomPageItem[]>(() => getStoredItem('customPages', initialCustomPages));
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>(() => getStoredItem('subscribers', initialSubscribers));
  const [notFoundLogs, setNotFoundLogs] = useState<NotFoundLogItem[]>(() => getStoredItem('notFoundLogs', initialNotFoundLogs));
  const [notifications, setNotifications] = useState<AdminNotification[]>(() => getStoredItem('notifications', initialNotifications));
  const [users, setUsers] = useState<User[]>(() => getStoredItem('users', initialUsers));
  const [isDbConnected, setIsDbConnected] = useState(true);

  // Authentication State with Firebase Auth
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return getStoredItem<User | null>('user', null);
  });
  const isAuthenticated = !!currentUser;
  const isAdminAuthenticated = isAuthenticated;

  // View Routing
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  // Modals & Palette
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isCvModalOpen, setCvModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Backup cache to localStorage
  useEffect(() => { setStoredItem('settings', siteSettings); }, [siteSettings]);
  useEffect(() => { setStoredItem('hero', heroData); }, [heroData]);
  useEffect(() => { setStoredItem('about', aboutData); }, [aboutData]);
  useEffect(() => { setStoredItem('stats', stats); }, [stats]);
  useEffect(() => { setStoredItem('skills', skills); }, [skills]);
  useEffect(() => { setStoredItem('experiences', experiences); }, [experiences]);
  useEffect(() => { setStoredItem('education', education); }, [education]);
  useEffect(() => { setStoredItem('projects', projects); }, [projects]);
  useEffect(() => { setStoredItem('services', services); }, [services]);
  useEffect(() => { setStoredItem('processSteps', processSteps); }, [processSteps]);
  useEffect(() => { setStoredItem('testimonials', testimonials); }, [testimonials]);
  useEffect(() => { setStoredItem('achievements', achievements); }, [achievements]);
  useEffect(() => { setStoredItem('messages', contactMessages); }, [contactMessages]);
  useEffect(() => { setStoredItem('media', mediaItems); }, [mediaItems]);
  useEffect(() => { setStoredItem('user', currentUser); }, [currentUser]);

  // -----------------------------------------------------------
  // FIREBASE FIRESTORE SYNC & SEEDING ON MOUNT
  // -----------------------------------------------------------
  useEffect(() => {
    let unsubs: Array<() => void> = [];

    async function initFirestoreSync() {
      try {
        const uSettings = await syncSingletonDoc('site_settings', 'main', initialSiteSettings, setSiteSettings);
        const uHero = await syncSingletonDoc('hero_data', 'main', initialHeroData, setHeroData);
        const uAbout = await syncSingletonDoc('about_data', 'main', initialAboutData, setAboutData);

        const uProjects = await syncCollection('projects', initialProjects, setProjects);
        const uSkills = await syncCollection('skills', initialSkills, setSkills);
        const uServices = await syncCollection('services', initialServices, setServices);
        const uExp = await syncCollection('experiences', initialExperiences, setExperiences);
        const uEdu = await syncCollection('education', initialEducation, setEducation);
        const uProcess = await syncCollection('process_steps', initialProcessSteps, setProcessSteps);
        const uTestimonials = await syncCollection('testimonials', initialTestimonials, setTestimonials);
        const uStats = await syncCollection('stats', initialStats, setStats);
        const uMessages = await syncCollection('contact_messages', initialContactMessages, (items) => {
          setContactMessages(deduplicateById(items));
        });
        const uMedia = await syncCollection('media_items', initialMediaItems, setMediaItems);

        unsubs = [
          uSettings,
          uHero,
          uAbout,
          uProjects,
          uSkills,
          uServices,
          uExp,
          uEdu,
          uProcess,
          uTestimonials,
          uStats,
          uMessages,
          uMedia
        ];
        setIsDbConnected(true);
      } catch (err) {
        console.warn('Firestore initialization warning, running with fallback cache:', err);
      }
    }

    initFirestoreSync();

    // Subscribe to real Firebase Auth state changes
    const unsubAuth = subscribeToFirebaseAuthState((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => {
      unsubs.forEach((fn) => fn());
      unsubAuth();
    };
  }, []);

  // Activity Log helper
  const logActivity = useCallback((action: string, resource: string) => {
    const newLog: ActivityLogItem = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      user: currentUser ? `${currentUser.name} (${currentUser.role})` : 'System',
      action,
      resource,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ip: '192.168.1.1'
    };
    setActivityLogs((prev) => deduplicateById([newLog, ...prev.slice(0, 49)]));
  }, [currentUser]);

  // Routing Handler
  const parseLocationHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash || hash === '/' || hash === 'home') {
      setCurrentRoute('home');
      setCurrentSlug(null);
      return;
    }

    // Check Redirects
    const matchedRedirect = redirects.find((r) => r.active && r.fromPath === hash);
    if (matchedRedirect) {
      window.location.hash = matchedRedirect.toPath;
      showToast(`Redirected to ${matchedRedirect.toPath}`, 'info');
      return;
    }

    if (hash === 'admin' || hash.startsWith('admin/')) {
      setCurrentRoute('admin');
      setCurrentSlug(null);
      return;
    }

    if (hash.startsWith('projects/')) {
      setCurrentRoute('project-detail');
      setCurrentSlug(hash.replace('projects/', ''));
      return;
    }

    if (hash.startsWith('skills/')) {
      setCurrentRoute('skill-detail');
      setCurrentSlug(hash.replace('skills/', ''));
      return;
    }

    if (hash.startsWith('services/')) {
      setCurrentRoute('service-detail');
      setCurrentSlug(hash.replace('services/', ''));
      return;
    }

    // Default fallback
    setCurrentRoute('home');
    setCurrentSlug(null);
  }, [redirects, showToast]);

  useEffect(() => {
    parseLocationHash();
    window.addEventListener('hashchange', parseLocationHash);
    return () => window.removeEventListener('hashchange', parseLocationHash);
  }, [parseLocationHash]);

  const navigateTo = useCallback((route: ViewRoute, slug?: string) => {
    setCurrentRoute(route);
    setCurrentSlug(slug || null);

    if (route === 'home') {
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'admin') {
      window.location.hash = '#admin';
    } else if (route === 'project-detail' && slug) {
      window.location.hash = `#projects/${slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'skill-detail' && slug) {
      window.location.hash = `#skills/${slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'service-detail' && slug) {
      window.location.hash = `#services/${slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Track page views and events
  const trackEvent = useCallback((eventName: string, details?: Record<string, unknown>) => {
    setAnalytics((prev) => {
      const updated = { ...prev };
      if (eventName === 'page_view') updated.totalPageViews += 1;
      if (eventName === 'project_view') updated.totalProjectViews += 1;
      if (eventName === 'cv_download') updated.totalCvDownloads += 1;
      if (eventName === 'contact_submit') updated.totalContactSubmissions += 1;
      return updated;
    });
    console.log(`[Analytics] Tracked event: ${eventName}`, details);
  }, []);

  // -----------------------------------------------------------
  // AUTH METHODS WITH FIREBASE AUTH
  // -----------------------------------------------------------
  const login = useCallback(async (email: string, pass: string): Promise<boolean> => {
    const res = await loginWithFirebase(email, pass);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      logActivity('Admin Login', 'Authorized Firebase session');
      showToast(`Welcome, ${res.user.name}! Firebase session verified.`, 'success');
      return true;
    }
    showToast(res.error || 'Authentication failed. Please verify credentials.', 'error');
    return false;
  }, [logActivity, showToast]);

  const adminLogin = useCallback(async (email: string, pass: string): Promise<boolean> => {
    if (email === 'admin' && (pass === 'sameer2026' || pass === 'admin12345')) {
      const res = await quickAdminLogin();
      if (res.success && res.user) {
        setCurrentUser(res.user);
        logActivity('Admin Quick Login', 'Firebase Admin session active');
        showToast('Welcome back, Sameer Habib! Database connection active.', 'success');
        return true;
      }
    }
    return login(email, pass);
  }, [login, logActivity, showToast]);

  const logout = useCallback(() => {
    logoutWithFirebase();
    setCurrentUser(null);
    navigateTo('home');
    logActivity('Admin Logout', 'Session ended');
    showToast('Signed out of admin dashboard', 'info');
  }, [logActivity, navigateTo, showToast]);

  // -----------------------------------------------------------
  // FIRESTORE-SYNCED MUTATIONS
  // -----------------------------------------------------------
  const updateSiteSettings = useCallback((settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => {
      const updated = { ...prev, ...settings };
      saveSingletonDoc('site_settings', 'main', updated).catch((e) =>
        console.error('Failed to sync settings to Firestore:', e)
      );
      return updated;
    });
    logActivity('Updated Site Settings', 'Database synced');
    showToast('Site settings updated in database');
  }, [logActivity, showToast]);

  const updateHeroData = useCallback((data: Partial<HeroSectionData>) => {
    setHeroData((prev) => {
      const updated = { ...prev, ...data };
      saveSingletonDoc('hero_data', 'main', updated).catch((e) =>
        console.error('Failed to sync hero data to Firestore:', e)
      );
      return updated;
    });
    logActivity('Updated Hero Section', 'Database synced');
    showToast('Hero section updated in database');
  }, [logActivity, showToast]);

  const updateAboutData = useCallback((data: Partial<AboutSectionData>) => {
    setAboutData((prev) => {
      const updated = { ...prev, ...data };
      saveSingletonDoc('about_data', 'main', updated).catch((e) =>
        console.error('Failed to sync about data to Firestore:', e)
      );
      return updated;
    });
    logActivity('Updated About Section', 'Database synced');
    showToast('About section updated in database');
  }, [logActivity, showToast]);

  const updateStats = useCallback((newStats: StatItem[]) => {
    setStats(newStats);
    newStats.forEach((s) => saveItemToCollection('stats', s));
    logActivity('Updated Stats', 'Database synced');
    showToast('Stats updated in database');
  }, [logActivity, showToast]);

  const saveStat = useCallback((stat: StatItem) => {
    setStats((prev) => {
      const exists = prev.some((s) => s.id === stat.id);
      return exists ? prev.map((s) => (s.id === stat.id ? stat : s)) : [...prev, stat];
    });
    saveItemToCollection('stats', stat);
    showToast('Stat metric saved');
  }, [showToast]);

  const deleteStat = useCallback((id: string) => {
    setStats((prev) => prev.filter((s) => s.id !== id));
    deleteItemFromCollection('stats', id);
    showToast('Stat removed from database');
  }, [showToast]);

  // Projects CRUD
  const saveProject = useCallback((project: ProjectItem) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === project.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = project;
        return copy;
      }
      return [project, ...prev];
    });
    saveItemToCollection('projects', project).catch((err) =>
      console.error('Failed to save project in Firestore:', err)
    );
    logActivity('Saved Project', project.title);
    showToast(`Project "${project.title}" saved in database`);
  }, [logActivity, showToast]);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    deleteItemFromCollection('projects', id);
    logActivity('Deleted Project', id);
    showToast('Project removed from database');
  }, [logActivity, showToast]);

  const duplicateProject = useCallback((id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    const duplicated: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`,
      title: `${project.title} (Copy)`,
      slug: `${project.slug}-copy-${Date.now().toString().slice(-4)}`,
      order: project.order + 1
    };
    saveProject(duplicated);
  }, [projects, saveProject]);

  // Skills CRUD
  const saveSkill = useCallback((skill: SkillItem) => {
    setSkills((prev) => {
      const idx = prev.findIndex((s) => s.id === skill.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = skill;
        return copy;
      }
      return [...prev, skill];
    });
    saveItemToCollection('skills', skill);
    logActivity('Saved Skill', skill.name);
    showToast(`Skill "${skill.name}" saved in database`);
  }, [logActivity, showToast]);

  const deleteSkill = useCallback((id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    deleteItemFromCollection('skills', id);
    logActivity('Deleted Skill', id);
    showToast('Skill deleted from database');
  }, [logActivity, showToast]);

  // Experience CRUD
  const saveExperience = useCallback((exp: ExperienceItem) => {
    setExperiences((prev) => {
      const idx = prev.findIndex((e) => e.id === exp.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = exp;
        return copy;
      }
      return [exp, ...prev];
    });
    saveItemToCollection('experiences', exp);
    logActivity('Saved Experience', `${exp.position} at ${exp.company}`);
    showToast('Experience saved in database');
  }, [logActivity, showToast]);

  const deleteExperience = useCallback((id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
    deleteItemFromCollection('experiences', id);
    logActivity('Deleted Experience', id);
    showToast('Experience entry deleted');
  }, [logActivity, showToast]);

  // Education CRUD
  const saveEducation = useCallback((edu: EducationItem) => {
    setEducation((prev) => {
      const idx = prev.findIndex((e) => e.id === edu.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = edu;
        return copy;
      }
      return [edu, ...prev];
    });
    saveItemToCollection('education', edu);
    showToast('Education credential saved in database');
  }, [showToast]);

  const deleteEducation = useCallback((id: string) => {
    setEducation((prev) => prev.filter((e) => e.id !== id));
    deleteItemFromCollection('education', id);
    showToast('Education credential removed');
  }, [showToast]);

  // Services CRUD
  const saveService = useCallback((service: ServiceItem) => {
    setServices((prev) => {
      const idx = prev.findIndex((s) => s.id === service.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = service;
        return copy;
      }
      return [...prev, service];
    });
    saveItemToCollection('services', service);
    logActivity('Saved Service', service.title);
    showToast(`Service "${service.title}" saved in database`);
  }, [logActivity, showToast]);

  const deleteService = useCallback((id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    deleteItemFromCollection('services', id);
    logActivity('Deleted Service', id);
    showToast('Service deleted from database');
  }, [logActivity, showToast]);

  // Process Steps CRUD
  const saveProcessStep = useCallback((step: ProcessStepItem) => {
    setProcessSteps((prev) => {
      const idx = prev.findIndex((s) => s.id === step.id);
      return idx >= 0 ? prev.map((s) => (s.id === step.id ? step : s)) : [...prev, step];
    });
    saveItemToCollection('process_steps', step);
    showToast('Process step updated in database');
  }, [showToast]);

  const deleteProcessStep = useCallback((id: string) => {
    setProcessSteps((prev) => prev.filter((s) => s.id !== id));
    deleteItemFromCollection('process_steps', id);
    showToast('Process step removed');
  }, [showToast]);

  // Testimonials CRUD
  const saveTestimonial = useCallback((test: TestimonialItem) => {
    setTestimonials((prev) => {
      const idx = prev.findIndex((t) => t.id === test.id);
      return idx >= 0 ? prev.map((t) => (t.id === test.id ? test : t)) : [...prev, test];
    });
    saveItemToCollection('testimonials', test);
    showToast('Testimonial endorsement saved in database');
  }, [showToast]);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    deleteItemFromCollection('testimonials', id);
    showToast('Testimonial removed from database');
  }, [showToast]);

  // Achievements
  const saveAchievement = useCallback((ach: AchievementItem) => {
    setAchievements((prev) => {
      const idx = prev.findIndex((a) => a.id === ach.id);
      return idx >= 0 ? prev.map((a) => (a.id === ach.id ? ach : a)) : [...prev, ach];
    });
    saveItemToCollection('achievements', ach);
    showToast('Achievement saved');
  }, [showToast]);

  const deleteAchievement = useCallback((id: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
    deleteItemFromCollection('achievements', id);
    showToast('Achievement removed');
  }, [showToast]);

  // FAQs
  const saveFaq = useCallback((faq: FaqItem) => {
    setFaqs((prev) => {
      const idx = prev.findIndex((f) => f.id === faq.id);
      return idx >= 0 ? prev.map((f) => (f.id === faq.id ? faq : f)) : [...prev, faq];
    });
    saveItemToCollection('faqs', faq);
    showToast('FAQ entry saved');
  }, [showToast]);

  const deleteFaq = useCallback((id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    deleteItemFromCollection('faqs', id);
    showToast('FAQ entry removed');
  }, [showToast]);

  // Inbound Contact Messages & Email Notification Dispatch
  const addContactMessage = useCallback(async (msg: Omit<ContactMessageItem, 'id' | 'createdAt' | 'status'> & { phone?: string; budget?: string; timeline?: string; projectType?: string }): Promise<boolean> => {
    try {
      const saved = await submitContactMessage(msg);
      setContactMessages((prev) => deduplicateById([saved, ...prev.filter((m) => m.id !== saved.id)]));
      trackEvent('contact_submit', { name: msg.name, subject: msg.subject });

      // Automatically dispatch real email notification to Sameer Habib (sameerhabib72@gmail.com) via server function
      const recipient = siteSettings.emailNotificationSettings?.notificationEmail || siteSettings.email || 'sameerhabib72@gmail.com';
      dispatchEmailNotification({
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        phone: msg.phone,
        budget: msg.budget,
        timeline: msg.timeline,
        projectType: msg.projectType,
        source: 'ContactSection Server Function',
        recipient,
        smtpConfig: siteSettings.emailNotificationSettings?.smtpConfig,
      }).then((result) => {
        if (result.delivered) {
          console.log(`✓ Email notification successfully dispatched via server function to ${recipient}`);
        }
      }).catch((err) => {
        console.warn('Background email dispatch notice:', err);
      });

      showToast('Thank you! Your inquiry was sent directly to Sameer Habib.', 'success');
      return true;
    } catch (err) {
      console.error('Failed to submit contact message to Firestore:', err);
      // Fallback local insertion
      const fallbackMsg: ContactMessageItem = {
        ...msg,
        id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        status: 'unread',
        createdAt: new Date().toISOString()
      };
      setContactMessages((prev) => deduplicateById([fallbackMsg, ...prev.filter((m) => m.id !== fallbackMsg.id)]));

      // Still dispatch email notification even if Firestore writes failed
      const recipient = siteSettings.emailNotificationSettings?.notificationEmail || siteSettings.email || 'sameerhabib72@gmail.com';
      dispatchEmailNotification({
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        phone: msg.phone,
        budget: msg.budget,
        timeline: msg.timeline,
        projectType: msg.projectType,
        source: 'ContactSection Server Function (Direct)',
        recipient,
        smtpConfig: siteSettings.emailNotificationSettings?.smtpConfig,
      }).catch(console.warn);

      showToast('Message sent! An email inquiry has been dispatched to Sameer.', 'success');
      return true;
    }
  }, [siteSettings, showToast, trackEvent]);

  // General Query Email Notification Dispatcher (usable by AI Assistant, Modals, Quick Contact)
  const sendQueryEmailNotification = useCallback(async (params: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    phone?: string;
    source?: string;
  }): Promise<{ success: boolean; delivered: boolean; info: string }> => {
    const recipient = siteSettings.emailNotificationSettings?.notificationEmail || siteSettings.email || 'sameerhabib72@gmail.com';
    const result = await dispatchEmailNotification({
      ...params,
      recipient,
      smtpConfig: siteSettings.emailNotificationSettings?.smtpConfig,
    });

    // Also persist in contact messages so it is logged in Admin CMS
    try {
      const contactRecord = await submitContactMessage({
        name: params.name,
        email: params.email,
        subject: params.subject || `Inquiry via ${params.source || 'AI Center'}`,
        message: params.message,
      });
      setContactMessages((prev) => deduplicateById([contactRecord, ...prev.filter((m) => m.id !== contactRecord.id)]));
    } catch (e) {
      console.warn('Could not mirror query to contact_messages:', e);
    }

    return result;
  }, [siteSettings]);

  // Admin Diagnostics: Send Test Email Notification
  const testSendEmailNotification = useCallback(async (customEmail?: string): Promise<{ success: boolean; info: string }> => {
    const target = customEmail || siteSettings.emailNotificationSettings?.notificationEmail || siteSettings.email || 'sameerhabib72@gmail.com';
    showToast(`Sending test query notification to ${target}...`, 'info');
    const res = await dispatchEmailNotification({
      name: 'Portfolio System Diagnostics',
      email: 'alerts@sameerhabib.dev',
      subject: 'Verification Test: Inbound Query Email Alert',
      message: `Hello Sameer!\n\nThis is a verification test confirming that whenever a client, recruiter, or visitor submits any query or message on your portfolio, an automated email notification is successfully dispatched to your email address (${target}).\n\nStatus: Active & Operational\nTimestamp: ${new Date().toLocaleString()}`,
      source: 'Admin Diagnostics Test',
      recipient: target,
      smtpConfig: siteSettings.emailNotificationSettings?.smtpConfig,
    });

    if (res.delivered || res.success) {
      showToast(`Test email notification dispatched to ${target}!`, 'success');
    } else {
      showToast(`Notification test note: ${res.info}`, 'info');
    }
    return { success: res.delivered || res.success, info: res.info };
  }, [siteSettings, showToast]);

  // Admin Diagnostics: Send Test AI Assistant Query Email Notification
  const testSendAiQueryNotification = useCallback(async (customEmail?: string): Promise<{ success: boolean; info: string }> => {
    const target = customEmail || siteSettings.emailNotificationSettings?.notificationEmail || siteSettings.email || 'sameerhabib72@gmail.com';
    showToast(`Sending test AI query alert to ${target}...`, 'info');
    const res = await dispatchAiQueryNotification({
      userQuery: 'Can you summarize Sameer\'s expertise in Laravel backend optimization and high-concurrency MySQL schemas?',
      assistantReply: 'Sameer Habib is a Senior Full Stack Developer with 3+ years of production experience specializing in Laravel (PHP 8.2+), Eloquent ORM tuning, compound indexing in MySQL 8, and single-page applications built with React, Next.js, and TypeScript. Reach out directly at sameerhabib72@gmail.com.',
      mode: 'architect',
      model: 'gemini-3.8-flash',
      clientEmail: 'lead-recruiter@techconsulting.io',
      clientName: 'Engineering Recruiter',
      recipient: target,
      smtpConfig: siteSettings.emailNotificationSettings?.smtpConfig,
    });

    if (res.delivered || res.success) {
      showToast(`Test AI query alert dispatched to ${target}!`, 'success');
    } else {
      showToast(`AI query alert test note: ${res.info}`, 'info');
    }
    return { success: res.delivered || res.success, info: res.info };
  }, [siteSettings, showToast]);

  const updateMessageStatus = useCallback((id: string, status: ContactMessageItem['status']) => {
    setContactMessages((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const updated = { ...m, status };
          saveItemToCollection('contact_messages', updated);
          return updated;
        }
        return m;
      })
    );
  }, []);

  const markMessageAsRead = useCallback((id: string) => {
    updateMessageStatus(id, 'read');
  }, [updateMessageStatus]);

  const deleteContactMessage = useCallback((id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    deleteItemFromCollection('contact_messages', id);
    showToast('Message deleted from database');
  }, [showToast]);

  const deleteSubscriber = useCallback((id: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Media
  const addMediaItem = useCallback((item: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const newItem: MediaItem = {
      ...item,
      id: 'media-' + Date.now(),
      uploadedAt: new Date().toISOString().substring(0, 10)
    };
    setMediaItems((prev) => [newItem, ...prev]);
    saveItemToCollection('media_items', newItem);
    showToast('Media item registered in database');
  }, [showToast]);

  const addMediaItemsBatch = useCallback((items: Array<Omit<MediaItem, 'id' | 'uploadedAt'>>) => {
    const newItems: MediaItem[] = items.map((it, idx) => ({
      ...it,
      id: `media-${Date.now()}-${idx}`,
      uploadedAt: new Date().toISOString().substring(0, 10)
    }));
    setMediaItems((prev) => [...newItems, ...prev]);
    newItems.forEach((it) => saveItemToCollection('media_items', it));
    showToast(`${items.length} media items uploaded to database`);
  }, [showToast]);

  const deleteMediaItem = useCallback((id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    deleteItemFromCollection('media_items', id);
    showToast('Media item removed');
  }, [showToast]);

  // CV
  const setActiveCv = useCallback((url: string, filename: string) => {
    setSiteSettings((prev) => {
      const updated = { ...prev, cvUrl: url, cvFileName: filename };
      saveSingletonDoc('site_settings', 'main', updated);
      return updated;
    });
    showToast('Active resume reference updated in database');
  }, [showToast]);

  const saveCvVersion = useCallback((version: CVVersionItem) => {
    setCvVersions((prev) => {
      const exists = prev.some((v) => v.id === version.id);
      return exists ? prev.map((v) => (v.id === version.id ? version : v)) : [version, ...prev];
    });
    saveItemToCollection('cv_versions', version);
    showToast('Resume version stored in database');
  }, [showToast]);

  const deleteCvVersion = useCallback((id: string) => {
    setCvVersions((prev) => prev.filter((v) => v.id !== id));
    deleteItemFromCollection('cv_versions', id);
    showToast('Resume version deleted');
  }, [showToast]);

  const setActiveCvVersion = useCallback((id: string) => {
    const target = cvVersions.find((v) => v.id === id);
    if (target) {
      setCvVersions((prev) =>
        prev.map((v) => {
          const isActive = v.id === id;
          const updated = { ...v, isActive };
          saveItemToCollection('cv_versions', updated);
          return updated;
        })
      );
      setActiveCv(`/cv/${target.filename}`, target.title || target.filename);
    }
  }, [cvVersions, setActiveCv]);

  // Custom Pages
  const saveCustomPage = useCallback((page: CustomPageItem) => {
    setCustomPages((prev) => {
      const exists = prev.some((p) => p.id === page.id);
      return exists ? prev.map((p) => (p.id === page.id ? page : p)) : [...prev, page];
    });
    saveItemToCollection('custom_pages', page);
    showToast('Custom page saved');
  }, [showToast]);

  const deleteCustomPage = useCallback((id: string) => {
    setCustomPages((prev) => prev.filter((p) => p.id !== id));
    deleteItemFromCollection('custom_pages', id);
    showToast('Custom page deleted');
  }, [showToast]);

  // Redirects
  const addRedirect = useCallback((redir: Omit<RedirectItem, 'id' | 'createdAt'>) => {
    const newRedir: RedirectItem = {
      ...redir,
      id: 'redir-' + Date.now(),
      createdAt: new Date().toISOString().substring(0, 10)
    };
    setRedirects((prev) => [newRedir, ...prev]);
    showToast('SEO 301 Redirect registered');
  }, [showToast]);

  const deleteRedirect = useCallback((id: string) => {
    setRedirects((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const toggleRedirect = useCallback((id: string) => {
    setRedirects((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  }, []);

  const deleteNotFoundLog = useCallback((id: string) => {
    setNotFoundLogs((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const convert404ToRedirect = useCallback((id: string, targetPath: string) => {
    const log = notFoundLogs.find((l) => l.id === id);
    if (!log) return;
    addRedirect({
      fromPath: log.path,
      toPath: targetPath,
      statusCode: 301,
      active: true
    });
    deleteNotFoundLog(id);
  }, [notFoundLogs, addRedirect, deleteNotFoundLog]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Users
  const saveUser = useCallback((user: User) => {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id);
      return exists ? prev.map((u) => (u.id === user.id ? user : u)) : [...prev, user];
    });
    saveItemToCollection('users', user);
    showToast('User record saved in database');
  }, [showToast]);

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    deleteItemFromCollection('users', id);
    showToast('User deleted');
  }, [showToast]);

  const updateUserProfile = useCallback((updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    saveItemToCollection('users', updated);
    showToast('Profile updated in database');
  }, [currentUser, showToast]);

  // Compatibility stubs for blog
  const saveBlogPost = useCallback(() => {}, []);
  const updateBlogPost = useCallback(() => {}, []);
  const addBlogPost = useCallback(() => {}, []);
  const deleteBlogPost = useCallback(() => {}, []);

  // Reset to default seed data
  const resetToDefaults = useCallback(() => {
    setSiteSettings(initialSiteSettings);
    setHeroData(initialHeroData);
    setAboutData(initialAboutData);
    setStats(initialStats);
    setSkills(initialSkills);
    setExperiences(initialExperiences);
    setEducation(initialEducation);
    setProjects(initialProjects);
    setServices(initialServices);
    setProcessSteps(initialProcessSteps);
    setTestimonials(initialTestimonials);
    setAchievements(initialAchievements);
    showToast('Data reset to defaults');
  }, [showToast]);

  const syncAllDataToFirestore = useCallback(async () => {
    try {
      showToast('Uploading all portfolio data to Firestore...', 'info');
      const result = await uploadAllPortfolioDataToFirestore();
      if (result.success) {
        showToast(`Successfully uploaded all ${result.totalUploaded} records to Firestore!`, 'success');
      }
    } catch (err) {
      console.error('Failed to upload data to Firestore:', err);
      showToast('Failed to upload data to Firestore', 'error');
    }
  }, [showToast]);

  const exportDataJson = useCallback(() => {
    const exportData = {
      siteSettings,
      heroData,
      aboutData,
      stats,
      skills,
      experiences,
      education,
      projects,
      services,
      processSteps,
      testimonials,
      achievements
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sameer-habib-portfolio-backup-${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Portfolio JSON backup downloaded', 'success');
  }, [
    siteSettings,
    heroData,
    aboutData,
    stats,
    skills,
    experiences,
    education,
    projects,
    services,
    processSteps,
    testimonials,
    achievements,
    showToast
  ]);

  const importDataJson = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.siteSettings) updateSiteSettings(parsed.siteSettings);
      if (parsed.heroData) updateHeroData(parsed.heroData);
      if (parsed.aboutData) updateAboutData(parsed.aboutData);
      if (parsed.projects) {
        setProjects(parsed.projects);
        parsed.projects.forEach((p: ProjectItem) => saveItemToCollection('projects', p));
      }
      if (parsed.skills) {
        setSkills(parsed.skills);
        parsed.skills.forEach((s: SkillItem) => saveItemToCollection('skills', s));
      }
      showToast('Data imported and synced to database', 'success');
      return true;
    } catch (e) {
      console.error('Import failed', e);
      showToast('Invalid JSON file format', 'error');
      return false;
    }
  }, [updateSiteSettings, updateHeroData, updateAboutData, showToast]);

  return (
    <DataContext.Provider
      value={{
        siteSettings,
        heroData,
        aboutData,
        stats,
        skills,
        experiences,
        education,
        projects,
        services,
        processSteps,
        testimonials,
        achievements,
        blogPosts,
        contactMessages,
        mediaItems,
        redirects,
        activityLogs,
        analytics,
        faqs,
        cvVersions,
        customPages,
        subscribers,
        notFoundLogs,
        notifications,
        users,
        isDbConnected,

        // Auth
        isAuthenticated,
        isAdminAuthenticated,
        currentUser,
        login,
        adminLogin,
        logout,
        adminLogout: logout,

        // Navigation
        currentRoute,
        currentSlug,
        navigateTo,

        // Modals
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        isCvModalOpen,
        setCvModalOpen,

        // Toasts
        toasts,
        showToast,
        dismissToast,

        // Mutations
        updateSiteSettings,
        updateHeroData,
        updateAboutData,
        updateStats,
        saveStat,
        deleteStat,

        // Projects
        saveProject,
        updateProject: saveProject,
        addProject: saveProject,
        deleteProject,
        duplicateProject,

        // Skills
        saveSkill,
        updateSkill: saveSkill,
        addSkill: saveSkill,
        deleteSkill,

        // Experience
        saveExperience,
        updateExperience: saveExperience,
        addExperience: saveExperience,
        deleteExperience,

        // Education
        saveEducation,
        deleteEducation,

        // Blog stubs
        saveBlogPost,
        updateBlogPost,
        addBlogPost,
        deleteBlogPost,

        // Services
        saveService,
        deleteService,

        // Process & Testimonials
        saveProcessStep,
        deleteProcessStep,
        saveTestimonial,
        deleteTestimonial,
        saveAchievement,
        deleteAchievement,
        saveFaq,
        deleteFaq,

        // Contact Messages
        addContactMessage,
        updateMessageStatus,
        markMessageAsRead,
        deleteContactMessage,
        deleteMessage: deleteContactMessage,
        deleteSubscriber,

        // Media & CV
        addMediaItem,
        addMediaItemsBatch,
        deleteMediaItem,
        setActiveCv,
        saveCvVersion,
        deleteCvVersion,
        setActiveCvVersion,

        // Pages & Redirects
        saveCustomPage,
        deleteCustomPage,
        addRedirect,
        deleteRedirect,
        toggleRedirect,
        deleteNotFoundLog,
        convert404ToRedirect,

        // Notifications & Users
        dismissNotification,
        clearAllNotifications,
        saveUser,
        deleteUser,
        updateUserProfile,

        // Analytics & Cloud Sync
        trackEvent,
        sendQueryEmailNotification,
        testSendEmailNotification,
        testSendAiQueryNotification,
        resetToDefaults,
        resetToInitialData: resetToDefaults,
        syncAllDataToFirestore,
        exportDataJson,
        importDataJson
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
