import React, { useState, useRef } from 'react';
import { useData, deduplicateById } from '../../context/DataContext';
import {
  LayoutDashboard,
  FolderGit2,
  Code2,
  Briefcase,
  Layers,
  BookOpen,
  MessageSquare,
  Settings,
  Database,
  LogOut,
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  Search,
  Sparkles,
  ExternalLink,
  GraduationCap,
  FileText,
  FileCode,
  Users,
  GitFork,
  Shield,
  Bell,
  FolderOpen,
  Image as ImageIcon,
  Copy,
  Check,
  Camera,
  Cloud,
  Star,
  Quote,
  TrendingUp,
  Mail,
  Phone,
  DollarSign,
  Calendar
} from 'lucide-react';
import { ProjectItem, SkillItem, ContactMessageItem, SiteSettings, MediaItem } from '../../types';
import { AdminHeroSectionManager } from './AdminHeroSectionManager';
import { AdminAboutSectionManager } from './AdminAboutSectionManager';
import { AdminStatsManager } from './AdminStatsManager';
import { AdminTestimonialsManager } from './AdminTestimonialsManager';
import { AdminExperienceManager } from './AdminExperienceManager';
import { AdminEducationManager } from './AdminEducationManager';
import { AdminCvManager } from './AdminCvManager';
import { AdminCustomPagesManager } from './AdminCustomPagesManager';
import { AdminSubscribersManager } from './AdminSubscribersManager';
import { AdminRedirectsAnd404Manager } from './AdminRedirectsAnd404Manager';
import { AdminServicesAndProcessManager } from './AdminServicesAndProcessManager';
import { AdminUserManager } from './AdminUserManager';
import { AdminNotificationsDropdown } from './AdminNotificationsDropdown';
import { AdminFileManagerModal } from './AdminFileManagerModal';
import { AdminProjectEditModal } from './AdminProjectEditModal';
import { AdminEmailNotificationsManager } from './AdminEmailNotificationsManager';

const PRESET_PROFILE_AVATARS = [
  { label: 'Sameer Habib (Classic)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
  { label: 'Engineering Lead', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80' },
  { label: 'Full-Stack Developer', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80' },
  { label: 'Tech Architect', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80' },
  { label: 'Software Engineer', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' }
];

export const AdminDashboard: React.FC = () => {
  const {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    navigateTo,
    projects,
    updateProject,
    deleteProject,
    addProject,
    skills,
    updateSkill,
    deleteSkill,
    addSkill,
    experiences,
    services,
    contactMessages,
    markMessageAsRead,
    deleteContactMessage,
    siteSettings,
    updateSiteSettings,
    analytics,
    resetToInitialData,
    syncAllDataToFirestore,
    isDbConnected,
    showToast,
    exportDataJson,
    importDataJson,
    education,
    cvVersions,
    customPages,
    subscribers,
    redirects,
    notFoundLogs,
    users,
    currentUser,
    updateUserProfile,
    mediaItems,
    addMediaItem,
    addMediaItemsBatch,
    deleteMediaItem
  } = useData();

  // Authentication State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // User Profile Image & Details State
  const [isSyncingFirestore, setIsSyncingFirestore] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileFileManagerOpen, setProfileFileManagerOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const profileFileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenProfileModal = () => {
    setProfileName(currentUser?.name || siteSettings.ownerName);
    setProfileEmail(currentUser?.email || siteSettings.email);
    setProfileAvatar(currentUser?.avatar || siteSettings.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');
    setProfileModalOpen(true);
  };

  const handleProfileFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfileAvatar(reader.result);
        showToast('Profile image loaded from device');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) {
      showToast('Name is required', 'error');
      return;
    }
    updateUserProfile({
      name: profileName.trim(),
      email: profileEmail.trim(),
      avatar: profileAvatar
    });
    updateSiteSettings({
      profileImage: profileAvatar,
      ownerName: profileName.trim(),
      email: profileEmail.trim()
    });
    showToast('Profile and avatar updated successfully');
    setProfileModalOpen(false);
  };

  // Active Tab
  type AdminTab =
    | 'overview'
    | 'hero'
    | 'about'
    | 'stats'
    | 'testimonials'
    | 'projects'
    | 'media'
    | 'skills'
    | 'experience'
    | 'education'
    | 'services'
    | 'cv'
    | 'pages'
    | 'subscribers'
    | 'redirects'
    | 'messages'
    | 'email-notifications'
    | 'users'
    | 'settings'
    | 'backup';

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Modal / Editing states
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);
  const [viewingMessage, setViewingMessage] = useState<ContactMessageItem | null>(null);

  // Standalone File Manager Modal State
  const [standaloneFileManagerOpen, setStandaloneFileManagerOpen] = useState(false);
  const [standaloneFileManagerMode, setStandaloneFileManagerMode] = useState<'manage' | 'multiple' | 'single'>('manage');

  // Quick filter for lists
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setAuthError('Please enter username/email and password');
      return;
    }
    setIsLoggingIn(true);
    setAuthError('');
    const success = await adminLogin(username, password);
    if (!success) {
      setAuthError('Authentication failed. Check credentials or use quick access.');
    }
    setIsLoggingIn(false);
  };

  const handleQuickDemoLogin = async () => {
    setIsLoggingIn(true);
    setAuthError('');
    const success = await adminLogin('admin', 'sameer2026');
    if (!success) {
      setAuthError('Quick login failed. Please verify connection.');
    }
    setIsLoggingIn(false);
  };

  // If not authenticated, show login form in luxury leather theme
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080706] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#120e0b] border border-[#c87a3e]/30 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3d2011] to-[#1a110a] border border-[#c87a3e]/50 text-[#e59850] flex items-center justify-center mx-auto shadow-md">
              <Settings className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Sameer Habib CMS</h2>
            <p className="text-xs font-mono text-[#d4a373]">Firebase Cloud Database &amp; Session Console</p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#d4a373] mb-1">
                Admin Email / Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="sameerhabib72@gmail.com or admin"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1c1510] border border-[#c87a3e]/25 text-sm text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#e59850]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#d4a373] mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1c1510] border border-[#c87a3e]/25 text-sm text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#e59850]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? 'Connecting to Firebase...' : 'Sign In with Firebase Auth'}
            </button>
          </form>

          {/* 1-Click Demo Login */}
          <div className="pt-4 border-t border-[#c87a3e]/20 text-center space-y-3">
            <p className="text-xs text-[#a88264]">
              Reviewer Quick Access: <span className="font-mono text-[#e59850]">admin</span> / <span className="font-mono text-[#e59850]">sameer2026</span>
            </p>
            <button
              onClick={handleQuickDemoLogin}
              disabled={isLoggingIn}
              className="w-full py-2.5 rounded-xl bg-[#1f1611] hover:bg-[#2a1d17] text-[#f3d5b5] text-xs font-semibold border border-[#c87a3e]/30 hover:border-[#c87a3e]/60 transition-colors cursor-pointer"
            >
              Instant 1-Click Admin Access
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center space-x-1.5 text-xs text-[#d4a373] hover:text-white pt-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-cms-portal" className="min-h-screen bg-[#080706] text-[#e7bc91] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0d0a08] border-r border-[#c87a3e]/20 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Brand Identity */}
          <div className="flex items-center space-x-3 pb-4 border-b border-[#c87a3e]/15">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3d2011] to-[#120b07] border border-[#c87a3e]/50 text-[#e59850] flex items-center justify-center font-bold text-sm shadow-sm">
              SH
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">Sameer Habib CMS</h2>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Admin Active</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
            {/* Group 1: Core Website Sections */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#a88264] px-3 font-semibold">
                Frontend Sections (A-Z)
              </span>

              <button
                id="tab-btn-overview"
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#e59850]" />
                <span>Dashboard &amp; KPIs</span>
              </button>

              <button
                id="tab-btn-hero"
                onClick={() => setActiveTab('hero')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'hero'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#e59850]" />
                <span>Hero Section</span>
              </button>

              <button
                id="tab-btn-about"
                onClick={() => setActiveTab('about')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'about'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#e59850]" />
                <span>About Narrative</span>
              </button>

              <button
                id="tab-btn-stats"
                onClick={() => setActiveTab('stats')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'stats'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-[#e59850]" />
                <span>Key Metrics &amp; Stats</span>
              </button>

              <button
                id="tab-btn-testimonials"
                onClick={() => setActiveTab('testimonials')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'testimonials'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <Quote className="w-4 h-4 text-[#e59850]" />
                <span>Testimonials</span>
              </button>

              <button
                id="tab-btn-projects"
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FolderGit2 className="w-4 h-4 text-[#e59850]" />
                  <span>Projects</span>
                </div>
                <span className="text-[10px] font-mono text-[#a88264]">{projects.length}</span>
              </button>

              <button
                id="tab-btn-skills"
                onClick={() => setActiveTab('skills')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'skills'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Code2 className="w-4 h-4 text-[#e59850]" />
                  <span>Skills Matrix</span>
                </div>
                <span className="text-[10px] font-mono text-[#a88264]">{skills.length}</span>
              </button>

              <button
                id="tab-btn-experience"
                onClick={() => setActiveTab('experience')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'experience'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-4 h-4 text-[#e59850]" />
                  <span>Experience</span>
                </div>
                <span className="text-[10px] font-mono text-[#a88264]">{experiences.length}</span>
              </button>

              <button
                id="tab-btn-education"
                onClick={() => setActiveTab('education')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-4 h-4 text-[#e59850]" />
                  <span>Education</span>
                </div>
                <span className="text-[10px] font-mono text-[#a88264]">{education.length}</span>
              </button>

              <button
                id="tab-btn-services"
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Layers className="w-4 h-4 text-[#e59850]" />
                  <span>Services &amp; Process</span>
                </div>
                <span className="text-[10px] font-mono text-[#a88264]">{services.length}</span>
              </button>

              <button
                id="tab-btn-media"
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'media'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FolderOpen className="w-4 h-4 text-[#e59850]" />
                  <span>Media &amp; Files</span>
                </div>
                <span className="text-[10px] font-mono text-[#e59850]">{mediaItems.length}</span>
              </button>
            </div>

            {/* Group 2: Inquiries & Releases */}
            <div className="space-y-1 pt-2 border-t border-[#c87a3e]/15">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#a88264] px-3 font-semibold">
                Inquiries &amp; Outreach
              </span>

              <button
                id="tab-btn-messages"
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-[#e59850]" />
                  <span>Messages &amp; Leads</span>
                </div>
                {contactMessages.filter((m) => m.status === 'unread').length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#c87a3e] text-white font-mono font-bold text-[10px]">
                    {contactMessages.filter((m) => m.status === 'unread').length}
                  </span>
                )}
              </button>

              <button
                id="tab-btn-email-notifications"
                onClick={() => setActiveTab('email-notifications')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'email-notifications'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 text-[#e59850]" />
                  <span>Server Mail Alerts</span>
                </div>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[9px] border border-emerald-500/30">
                  Active
                </span>
              </button>

              <button
                id="tab-btn-cv"
                onClick={() => setActiveTab('cv')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'cv'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-[#e59850]" />
                  <span>Resume Releases</span>
                </div>
                <span className="text-[10px] font-mono text-[#d4a373]">{cvVersions.length}</span>
              </button>

              <button
                id="tab-btn-pages"
                onClick={() => setActiveTab('pages')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'pages'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FileCode className="w-4 h-4 text-[#e59850]" />
                  <span>Custom Pages</span>
                </div>
                <span className="text-[10px] font-mono text-[#a88264]">{customPages.length}</span>
              </button>
            </div>

            {/* Group 3: System & Cloud */}
            <div className="space-y-1 pt-2 border-t border-[#c87a3e]/15">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#a88264] px-3 font-semibold">
                System &amp; Settings
              </span>

              <button
                id="tab-btn-settings"
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4 text-[#e59850]" />
                <span>Site Identity &amp; SEO</span>
              </button>

              <button
                id="tab-btn-backup"
                onClick={() => setActiveTab('backup')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'backup'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <Database className="w-4 h-4 text-[#e59850]" />
                <span>Cloud Firestore Sync</span>
              </button>

              <button
                id="tab-btn-users"
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'users'
                    ? 'bg-[#281b13] text-[#f3d5b5] border border-[#e59850]/50 font-semibold shadow-xs'
                    : 'text-[#d4a373] hover:bg-[#1a130e] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-[#e59850]" />
                  <span>Team &amp; RBAC</span>
                </div>
                <span className="text-[10px] font-mono text-[#a88264]">{users.length}</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-[#c87a3e]/15 space-y-2">
          <button
            onClick={() => navigateTo('home')}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#1e1510] hover:bg-[#281b14] text-xs text-[#f3d5b5] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#e59850]" />
            <span>Public Portfolio</span>
          </button>

          <button
            onClick={adminLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto max-h-screen flex flex-col">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 bg-[#0d0a08]/95 backdrop-blur-xl border-b border-[#c87a3e]/20 px-6 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#a88264]">CMS Manager</span>
            <span className="text-[#c87a3e]/40 font-mono">/</span>
            <span className="text-xs font-bold text-white capitalize">{activeTab.replace('-', ' ')}</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Firestore Connected</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Direct Firestore Sync Button in Header */}
            <button
              type="button"
              disabled={isSyncingFirestore}
              onClick={async () => {
                setIsSyncingFirestore(true);
                try {
                  await syncAllDataToFirestore();
                } finally {
                  setIsSyncingFirestore(false);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
              title="Push all changes directly to Cloud Firestore"
            >
              <Cloud className={`w-3.5 h-3.5 ${isSyncingFirestore ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">
                {isSyncingFirestore ? 'Syncing...' : 'Sync to Firestore'}
              </span>
            </button>

            <AdminNotificationsDropdown />

            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e1510] hover:bg-[#281b14] text-[#f3d5b5] hover:text-white border border-[#c87a3e]/30 text-xs font-medium transition-colors cursor-pointer"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#e59850]" />
            </button>

            {currentUser && (
              <button
                type="button"
                id="btn-admin-header-profile"
                onClick={handleOpenProfileModal}
                className="hidden md:flex items-center gap-2.5 pl-3 border-l border-[#c87a3e]/20 hover:opacity-90 transition-all cursor-pointer text-left group"
                title="Click to edit profile photo and details"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar || siteSettings.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#c87a3e]/50 group-hover:border-[#e59850] shadow-xs transition-colors"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-[#c87a3e] text-white group-hover:scale-110 transition-transform">
                    <Camera className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div className="text-left leading-none">
                  <div className="text-xs font-bold text-white group-hover:text-[#f3d5b5] transition-colors flex items-center gap-1">
                    <span>{currentUser.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#d4a373] capitalize">{currentUser.role.replace('_', ' ')}</span>
                </div>
              </button>
            )}
          </div>
        </header>

        {/* Tab Body */}
        <div className="p-6 md:p-10 flex-1">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 text-left">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">System Dashboard &amp; KPIs</h1>
                <p className="text-xs text-[#d4a373]">Real-time content telemetry, inquiry volume, and section readiness.</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/20">
                  <span className="text-[10px] font-mono uppercase text-[#a88264]">Total Page Views</span>
                  <p className="text-2xl font-bold text-white mt-1">{analytics.totalPageViews}</p>
                  <span className="text-[10px] text-emerald-400 font-mono">Live telemetry tracked</span>
                </div>
                <div className="p-5 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/20">
                  <span className="text-[10px] font-mono uppercase text-[#a88264]">Projects In Catalog</span>
                  <p className="text-2xl font-bold text-[#e59850] mt-1">{projects.length}</p>
                  <span className="text-[10px] text-[#a88264] font-mono">All production case studies</span>
                </div>
                <div className="p-5 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/20">
                  <span className="text-[10px] font-mono uppercase text-[#a88264]">Inquiries Received</span>
                  <p className="text-2xl font-bold text-white mt-1">{contactMessages.length}</p>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {contactMessages.filter((m) => m.status === 'unread').length} Unread inquiries
                  </span>
                </div>
                <div className="p-5 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/20">
                  <span className="text-[10px] font-mono uppercase text-[#a88264]">Skills &amp; Tech</span>
                  <p className="text-2xl font-bold text-white mt-1">{skills.length}</p>
                  <span className="text-[10px] text-[#d4a373] font-mono">Verified Stack Matrix</span>
                </div>
              </div>

              {/* Quick Jump Grid to Frontend Section Editors */}
              <div className="p-6 rounded-3xl bg-[#120e0b] border border-[#c87a3e]/25 space-y-4">
                <h3 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#e59850]" />
                  <span>A-to-Z Frontend Section Quick Navigation</span>
                </h3>
                <p className="text-xs text-[#d4a373]">
                  Select any section below to immediately customize copy, statistics, testimonials, or projects.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('hero')}
                    className="p-3.5 rounded-2xl bg-[#1c1510] hover:bg-[#281b14] border border-[#c87a3e]/20 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-[#f3d5b5] block">Hero Section</span>
                    <span className="text-[10px] text-[#a88264]">Headlines &amp; Roles</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('about')}
                    className="p-3.5 rounded-2xl bg-[#1c1510] hover:bg-[#281b14] border border-[#c87a3e]/20 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-[#f3d5b5] block">About Section</span>
                    <span className="text-[10px] text-[#a88264]">Story &amp; Philosophy</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('stats')}
                    className="p-3.5 rounded-2xl bg-[#1c1510] hover:bg-[#281b14] border border-[#c87a3e]/20 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-[#f3d5b5] block">Key Metrics</span>
                    <span className="text-[10px] text-[#a88264]">Stats Bar Numbers</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('testimonials')}
                    className="p-3.5 rounded-2xl bg-[#1c1510] hover:bg-[#281b14] border border-[#c87a3e]/20 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-[#f3d5b5] block">Testimonials</span>
                    <span className="text-[10px] text-[#a88264]">Client Endorsements</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('projects')}
                    className="p-3.5 rounded-2xl bg-[#1c1510] hover:bg-[#281b14] border border-[#c87a3e]/20 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-[#f3d5b5] block">Projects</span>
                    <span className="text-[10px] text-[#a88264]">{projects.length} Case Studies</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('skills')}
                    className="p-3.5 rounded-2xl bg-[#1c1510] hover:bg-[#281b14] border border-[#c87a3e]/20 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-[#f3d5b5] block">Skills Matrix</span>
                    <span className="text-[10px] text-[#a88264]">{skills.length} Technologies</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('experience')}
                    className="p-3.5 rounded-2xl bg-[#1c1510] hover:bg-[#281b14] border border-[#c87a3e]/20 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-[#f3d5b5] block">Experience</span>
                    <span className="text-[10px] text-[#a88264]">{experiences.length} Career Roles</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('messages')}
                    className="p-3.5 rounded-2xl bg-[#1c1510] hover:bg-[#281b14] border border-[#c87a3e]/20 text-left transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-[#f3d5b5] block">Messages</span>
                    <span className="text-[10px] text-emerald-400">{contactMessages.length} Leads</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HERO SECTION MANAGER */}
          {activeTab === 'hero' && <AdminHeroSectionManager />}

          {/* TAB: ABOUT SECTION MANAGER */}
          {activeTab === 'about' && <AdminAboutSectionManager />}

          {/* TAB: STATS / METRICS MANAGER */}
          {activeTab === 'stats' && <AdminStatsManager />}

          {/* TAB: TESTIMONIALS MANAGER */}
          {activeTab === 'testimonials' && <AdminTestimonialsManager />}

          {/* TAB: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-bold text-white">Production Projects &amp; Case Studies</h1>
                  <p className="text-xs text-[#d4a373]">Manage your 14 commercial and open-source systems.</p>
                </div>

                <button
                  onClick={() =>
                    setEditingProject({
                      id: `proj_${Date.now()}`,
                      title: 'New Commercial Project',
                      slug: `project-${Date.now()}`,
                      subtitle: 'Full-Stack Solution',
                      shortDescription: 'Project overview...',
                      longDescription: 'Comprehensive architectural case study...',
                      category: 'Enterprise Applications',
                      year: '2026',
                      client: 'Client / Enterprise',
                      role: 'Lead Architect',
                      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
                      gallery: [],
                      technologies: ['Laravel', 'React', 'MySQL'],
                      features: ['Authentication', 'REST API', 'Reporting'],
                      problem: 'Legacy system limitations',
                      solution: 'Engineered modern decoupled architecture',
                      challenges: 'High concurrency data volume',
                      architectureNodes: [],
                      developmentProcess: ['Planning', 'Development', 'Deployment'],
                      result: '40% performance gain',
                      featured: true,
                      published: true,
                      order: projects.length + 1,
                      seoTitle: 'New Project | Sameer Habib',
                      seoDescription: 'Case study overview',
                      seoKeywords: ['Laravel', 'React']
                    })
                  }
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:brightness-110 text-white font-bold text-xs shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/25 hover:border-[#c87a3e]/60 transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="w-full h-40 object-cover rounded-2xl mb-4 border border-[#c87a3e]/20"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800';
                        }}
                      />
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#201813] text-[#e59850] border border-[#c87a3e]/30">
                          {proj.category}
                        </span>
                        <span className="text-xs font-mono text-[#a88264]">{proj.year}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">{proj.title}</h3>
                      <p className="text-xs text-[#e7bc91] line-clamp-2 mb-3">{proj.shortDescription}</p>
                    </div>

                    <div className="pt-3 border-t border-[#c87a3e]/15 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#a88264]">Order: #{proj.order}</span>
                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingProject(proj)}
                          className="px-3 py-1.5 rounded-lg bg-[#201813] hover:bg-[#281b14] text-xs font-semibold text-[#f3d5b5] flex items-center space-x-1 cursor-pointer"
                        >
                          <Edit className="w-3 h-3 text-[#e59850]" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-[#201813] hover:bg-rose-950/40 text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Edit Modal */}
              {editingProject && (
                <AdminProjectEditModal
                  isOpen={Boolean(editingProject)}
                  project={editingProject}
                  onClose={() => setEditingProject(null)}
                  onSave={(saved) => {
                    const exists = projects.some((p) => p.id === saved.id);
                    if (exists) {
                      updateProject(saved as ProjectItem);
                    } else {
                      addProject(saved as ProjectItem);
                    }
                    setEditingProject(null);
                  }}
                />
              )}
            </div>
          )}

          {/* TAB: SKILLS MANAGER */}
          {activeTab === 'skills' && (
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-white">Technical Skills Matrix</h1>
                  <p className="text-xs text-[#d4a373]">Manage frameworks, proficiency bars, and practical notes.</p>
                </div>

                <button
                  onClick={() =>
                    setEditingSkill({
                      id: `skill_${Date.now()}`,
                      name: 'New Technology',
                      slug: `tech-${Date.now()}`,
                      category: 'Backend',
                      proficiency: 85,
                      experienceYears: '2+ Years',
                      description: 'Technical overview...',
                      practicalExperience: 'Commercial usage overview...',
                      order: skills.length + 1,
                      featured: true,
                      published: true
                    })
                  }
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:brightness-110 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((s) => (
                  <div key={s.id} className="p-4 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/25 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#201813] text-[#e59850] border border-[#c87a3e]/20">
                          {s.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-white">{s.proficiency}%</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{s.name}</h4>
                      <p className="text-xs text-[#a88264] mt-1">{s.experienceYears}</p>
                    </div>

                    <div className="pt-3 border-t border-[#c87a3e]/15 flex items-center justify-between mt-3">
                      <div className="w-24 h-1.5 rounded-full bg-[#201813] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#b4652a] to-[#d97706] rounded-full"
                          style={{ width: `${s.proficiency}%` }}
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => setEditingSkill(s)}
                          className="p-1 rounded bg-[#201813] text-[#f3d5b5] hover:text-white"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete skill "${s.name}"?`)) {
                              deleteSkill(s.id);
                            }
                          }}
                          className="p-1 rounded bg-[#201813] text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Skill Modal */}
              {editingSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                  <div className="w-full max-w-md bg-[#120e0b] border border-[#c87a3e]/40 rounded-3xl p-6 shadow-2xl space-y-4">
                    <h3 className="font-bold text-white text-base">
                      {editingSkill.id && skills.some((s) => s.id === editingSkill.id) ? 'Edit Skill' : 'Add Skill'}
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Skill Name *</label>
                        <input
                          type="text"
                          value={editingSkill.name || ''}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Category</label>
                          <select
                            value={editingSkill.category || 'Backend'}
                            onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                          >
                            <option value="Backend">Backend</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Database">Database</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Tools">Tools</option>
                            <option value="CMS & E-Commerce">CMS &amp; E-Commerce</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Proficiency ({editingSkill.proficiency || 85}%)</label>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={editingSkill.proficiency || 85}
                            onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
                            className="w-full mt-2 accent-[#e59850]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Experience Years</label>
                        <input
                          type="text"
                          value={editingSkill.experienceYears || ''}
                          onChange={(e) => setEditingSkill({ ...editingSkill, experienceYears: e.target.value })}
                          placeholder="e.g. 3+ Years Commercial"
                          className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-3 border-t border-[#c87a3e]/20">
                      <button onClick={() => setEditingSkill(null)} className="px-4 py-2 rounded-xl bg-[#1e1510] text-xs text-[#d4a373]">
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (editingSkill.name) {
                            const exists = skills.some((s) => s.id === editingSkill.id);
                            if (exists) {
                              updateSkill(editingSkill as SkillItem);
                            } else {
                              addSkill(editingSkill as SkillItem);
                            }
                            setEditingSkill(null);
                          }
                        }}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] font-bold text-xs text-white"
                      >
                        Save Skill
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: EXPERIENCE MANAGER */}
          {activeTab === 'experience' && <AdminExperienceManager />}

          {/* TAB: EDUCATION MANAGER */}
          {activeTab === 'education' && <AdminEducationManager />}

          {/* TAB: SERVICES & PROCESS */}
          {activeTab === 'services' && <AdminServicesAndProcessManager />}

          {/* TAB: RESUME RELEASES */}
          {activeTab === 'cv' && <AdminCvManager />}

          {/* TAB: CUSTOM PAGES */}
          {activeTab === 'pages' && <AdminCustomPagesManager />}

          {/* TAB: SUBSCRIBERS */}
          {activeTab === 'subscribers' && <AdminSubscribersManager />}

          {/* TAB: 301 ROUTING & 404S */}
          {activeTab === 'redirects' && <AdminRedirectsAnd404Manager />}

          {/* TAB: EMAIL NOTIFICATIONS */}
          {activeTab === 'email-notifications' && <AdminEmailNotificationsManager />}

          {/* TAB: TEAM & RBAC */}
          {activeTab === 'users' && <AdminUserManager />}

          {/* TAB: MEDIA & FILE MANAGER */}
          {activeTab === 'media' && (
            <div className="space-y-6 text-left">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Media Assets &amp; File Manager</h1>
                <p className="text-xs text-[#d4a373]">Upload and store screenshots, diagrams, and project assets.</p>
              </div>

              {/* Upload Zone */}
              <div className="p-8 rounded-3xl border-2 border-dashed border-[#c87a3e]/30 bg-[#120e0b] flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#281b13] border border-[#c87a3e]/40 text-[#e59850]">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Drag &amp; drop multiple images here</p>
                  <p className="text-xs text-[#a88264] mt-0.5">Supports PNG, JPG, WebP, SVG format</p>
                </div>
                <label className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white text-xs font-bold shadow-md cursor-pointer">
                  Select Files from Computer
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const fileList = Array.from(e.target.files);
                        const newBatch: any[] = [];
                        for (const file of fileList) {
                          const dataUrl = await new Promise<string>((res) => {
                            const reader = new FileReader();
                            reader.onload = () => res(reader.result as string);
                            reader.readAsDataURL(file);
                          });
                          const sizeKb = Math.round(file.size / 1024);
                          newBatch.push({
                            filename: file.name,
                            url: dataUrl,
                            altText: file.name,
                            caption: 'Uploaded via Admin Media Tab',
                            size: `${sizeKb} KB`,
                            type: file.type,
                            usedIn: 'Media Library'
                          });
                        }
                        addMediaItemsBatch(newBatch);
                        showToast(`Uploaded ${newBatch.length} images!`);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaItems.map((item) => (
                  <div key={item.id} className="rounded-2xl overflow-hidden border border-[#c87a3e]/20 bg-[#15110d] flex flex-col">
                    <img src={item.url} alt={item.filename} className="w-full h-32 object-cover" />
                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <p className="text-xs font-bold text-white truncate">{item.filename}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#c87a3e]/15">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            showToast('URL copied!');
                          }}
                          className="px-2 py-1 rounded bg-[#201813] text-[#f3d5b5] text-[10px] font-mono cursor-pointer"
                        >
                          Copy URL
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteMediaItem(item.id)}
                          className="p-1 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="space-y-6 text-left">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Inbound Inquiries &amp; Leads</h1>
                <p className="text-xs text-[#d4a373]">
                  All client inquiries submitted through the interactive ContactSection.
                </p>
              </div>

              {contactMessages.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#120e0b] border border-[#c87a3e]/20 text-[#a88264] text-xs">
                  No inquiries received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {deduplicateById(contactMessages).map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        markMessageAsRead(m.id);
                        setViewingMessage(m);
                      }}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        m.status !== 'unread'
                          ? 'bg-[#15110d]/80 border-[#c87a3e]/20 text-[#e7bc91]'
                          : 'bg-[#20150d] border-[#e59850]/50 text-white shadow-lg'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-white text-sm">{m.name}</h4>
                            <span className="text-xs font-mono text-[#d4a373]">({m.email})</span>
                            {m.phone && (
                              <span className="text-xs font-mono text-emerald-400">📱 {m.phone}</span>
                            )}
                            {m.status === 'unread' && (
                              <span className="px-2 py-0.5 rounded-full bg-[#c87a3e] text-white font-bold text-[9px]">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#e59850] font-medium mt-0.5 font-mono">{m.subject}</p>
                          {(m.budget || m.timeline || m.projectType) && (
                            <div className="flex flex-wrap gap-2 mt-1.5 text-[11px] font-mono">
                              {m.projectType && (
                                <span className="px-2 py-0.5 rounded bg-[#15110d] text-[#f3d5b5] border border-[#c87a3e]/20">
                                  Scope: {m.projectType}
                                </span>
                              )}
                              {m.budget && (
                                <span className="px-2 py-0.5 rounded bg-[#15110d] text-amber-300 border border-[#c87a3e]/20">
                                  Budget: {m.budget}
                                </span>
                              )}
                              {m.timeline && (
                                <span className="px-2 py-0.5 rounded bg-[#15110d] text-[#e7bc91] border border-[#c87a3e]/20">
                                  Timeline: {m.timeline}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono text-[#a88264]">{m.createdAt}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteContactMessage(m.id);
                            }}
                            className="p-1 text-[#a88264] hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#e7bc91] line-clamp-2 mt-2">{m.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* View Message Detail Dialog */}
              {viewingMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                  <div className="w-full max-w-lg bg-[#120e0b] border border-[#c87a3e]/40 rounded-3xl p-6 shadow-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-[#c87a3e]/20 pb-3">
                      <h3 className="font-bold text-white text-base">Inquiry Information</h3>
                      <button onClick={() => setViewingMessage(null)} className="text-[#a88264] hover:text-white">✕</button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-[#a88264] font-mono">Inquirer:</span>
                        <p className="font-bold text-white text-sm">{viewingMessage.name} &lt;{viewingMessage.email}&gt;</p>
                        {viewingMessage.phone && (
                          <p className="text-emerald-400 font-mono mt-0.5">Phone/WhatsApp: {viewingMessage.phone}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 font-mono text-[11px]">
                        <div>
                          <span className="text-[#a88264] block">Focus:</span>
                          <span className="text-white font-semibold">{viewingMessage.projectType || 'General'}</span>
                        </div>
                        <div>
                          <span className="text-[#a88264] block">Budget:</span>
                          <span className="text-amber-300 font-semibold">{viewingMessage.budget || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-[#a88264] block">Timeline:</span>
                          <span className="text-white font-semibold">{viewingMessage.timeline || 'N/A'}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[#a88264] font-mono">Subject:</span>
                        <p className="font-semibold text-[#f3d5b5]">{viewingMessage.subject}</p>
                      </div>

                      <div>
                        <span className="text-[#a88264] font-mono">Message:</span>
                        <p className="p-4 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-white whitespace-pre-wrap leading-relaxed mt-1">
                          {viewingMessage.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-[#c87a3e]/20">
                      <a
                        href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(viewingMessage.subject)}`}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white font-bold text-xs"
                      >
                        Reply via Email
                      </a>
                      {viewingMessage.phone && (
                        <a
                          href={`https://wa.me/${viewingMessage.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs"
                        >
                          Chat on WhatsApp
                        </a>
                      )}
                      <button onClick={() => setViewingMessage(null)} className="px-4 py-2 rounded-xl bg-[#1e1510] text-xs text-[#d4a373]">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: SITE SETTINGS & IDENTITY */}
          {activeTab === 'settings' && (
            <div className="space-y-8 text-left max-w-2xl">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Site Settings &amp; Global Identity</h1>
                <p className="text-xs text-[#d4a373]">Manage site name, contact channels, administrator avatar, and SEO metadata.</p>
              </div>

              {/* Profile Photo Card */}
              <div className="p-6 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/30 space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={siteSettings.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'}
                    alt="Profile Avatar"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#e59850]"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{siteSettings.ownerName}</h3>
                    <p className="text-xs text-[#a88264] font-mono">{siteSettings.roleTitle}</p>
                    <button
                      type="button"
                      onClick={handleOpenProfileModal}
                      className="mt-2 px-3 py-1 rounded-lg bg-[#201813] hover:bg-[#2e1f14] border border-[#c87a3e]/30 text-[11px] font-semibold text-[#f3d5b5] cursor-pointer"
                    >
                      Update Avatar &amp; Name
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Channels */}
              <div className="p-6 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/30 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white font-mono">Contact Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Primary Email</label>
                    <input
                      type="email"
                      value={siteSettings.email}
                      onChange={(e) => updateSiteSettings({ email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Direct Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={siteSettings.phone}
                      onChange={(e) => updateSiteSettings({ phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Location</label>
                    <input
                      type="text"
                      value={siteSettings.location}
                      onChange={(e) => updateSiteSettings({ location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Availability Status</label>
                    <select
                      value={siteSettings.availability}
                      onChange={(e) => updateSiteSettings({ availability: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                    >
                      <option value="Available for Opportunities">Available for Opportunities</option>
                      <option value="Open for Consulting">Open for Consulting</option>
                      <option value="Booked">Booked</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">GitHub URL</label>
                    <input
                      type="text"
                      value={siteSettings.githubUrl}
                      onChange={(e) => updateSiteSettings({ githubUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">LinkedIn URL</label>
                    <input
                      type="text"
                      value={siteSettings.linkedinUrl}
                      onChange={(e) => updateSiteSettings({ linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* SEO Meta */}
              <div className="p-6 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/30 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white font-mono">SEO &amp; OpenGraph Meta</h3>

                <div>
                  <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Meta Title</label>
                  <input
                    type="text"
                    value={siteSettings.metaTitle}
                    onChange={(e) => updateSiteSettings({ metaTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Meta Description</label>
                  <textarea
                    rows={3}
                    value={siteSettings.metaDescription}
                    onChange={(e) => updateSiteSettings({ metaDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: BACKUP & CLOUD FIRESTORE SYNC */}
          {activeTab === 'backup' && (
            <div className="space-y-8 text-left max-w-2xl">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Cloud Firestore Synchronization</h1>
                <p className="text-xs text-[#d4a373]">
                  Persist all frontend data directly into your Firebase Firestore database so all updates reflect in real-time.
                </p>
              </div>

              {/* Firestore Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1a120c] to-[#0e0b08] border border-[#c87a3e]/40 space-y-4 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Cloud className="w-5 h-5 text-[#e59850]" />
                      <span>Sync All Data to Cloud Firestore</span>
                    </h3>
                    <p className="text-xs text-[#e7bc91] mt-1">
                      Uploads all projects, skills, narrative, metrics, testimonials, and settings directly into Firestore.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2">
                  <div className="p-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/15 text-center">
                    <span className="block text-xs font-mono font-bold text-[#e59850]">{projects.length}</span>
                    <span className="text-[10px] text-[#a88264]">Projects</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/15 text-center">
                    <span className="block text-xs font-mono font-bold text-[#e59850]">{skills.length}</span>
                    <span className="text-[10px] text-[#a88264]">Skills</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/15 text-center">
                    <span className="block text-xs font-mono font-bold text-[#e59850]">{experiences.length}</span>
                    <span className="text-[10px] text-[#a88264]">Experiences</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/15 text-center">
                    <span className="block text-xs font-mono font-bold text-[#e59850]">{education.length}</span>
                    <span className="text-[10px] text-[#a88264]">Education</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSyncingFirestore}
                  onClick={async () => {
                    setIsSyncingFirestore(true);
                    try {
                      await syncAllDataToFirestore();
                    } finally {
                      setIsSyncingFirestore(false);
                    }
                  }}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:brightness-110 text-white font-bold text-xs transition-all flex items-center space-x-2 shadow-lg cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncingFirestore ? 'animate-spin' : ''}`} />
                  <span>{isSyncingFirestore ? 'Uploading to Firestore...' : 'Upload & Sync All Data to Firestore'}</span>
                </button>
              </div>

              {/* JSON Backup Export & Reset */}
              <div className="p-6 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Download className="w-4 h-4 text-[#e59850]" />
                  <span>Export Portable JSON Backup</span>
                </h3>
                <p className="text-xs text-[#a88264]">
                  Download an offline snapshot containing all project entries, skills, narratives, and settings.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={exportDataJson}
                    className="px-4 py-2 rounded-xl bg-[#1e1510] hover:bg-[#281b14] text-[#f3d5b5] border border-[#c87a3e]/30 font-bold text-xs"
                  >
                    Download JSON Backup
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all content back to Sameer Habib default baseline?')) {
                        resetToInitialData();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#1e1510] hover:bg-rose-950/40 text-rose-300 border border-rose-500/20 font-bold text-xs"
                  >
                    Reset to Verified Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Profile Edit Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#120e0b] border border-[#c87a3e]/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#c87a3e]/20">
              <h3 className="font-bold text-white text-base">Edit Administrator Profile</h3>
              <button onClick={() => setProfileModalOpen(false)} className="text-[#a88264] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="flex items-center space-x-4">
                <img
                  src={profileAvatar}
                  alt="Preview"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#e59850]"
                />
                <div className="space-y-1">
                  <label className="block text-[#f3d5b5] font-mono uppercase">Avatar Image URL</label>
                  <input
                    type="text"
                    value={profileAvatar}
                    onChange={(e) => setProfileAvatar(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Display Name *</label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                />
              </div>

              <div>
                <label className="block text-[#f3d5b5] mb-1 font-mono uppercase">Email Address</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#c87a3e]/20">
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#1e1510] text-[#d4a373]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] font-bold text-white shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
