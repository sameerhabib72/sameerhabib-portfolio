import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  FileDown,
  Lock,
  Search,
  Menu,
  X,
  ArrowUpRight,
  FolderGit2,
  Cpu,
  Layers,
  Briefcase,
  User,
  BookOpen,
  Mail,
  Home,
  MessageCircle,
  Phone,
  Sparkles
} from 'lucide-react';

interface NavLinkItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  num: string;
}

export const Navbar: React.FC = () => {
  const {
    siteSettings,
    navigateTo,
    currentRoute,
    setCommandPaletteOpen,
    setCvModalOpen,
    isAuthenticated,
  } = useData();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const orderedSections = [
    'hero',
    'architecture',
    'projects',
    'skills',
    'experience',
    'about',
    'services',
    'contact'
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Detect scroll position for backdrop blur and accurate section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 25);

      // Top of page check
      if (scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      // Bottom of page check
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (windowHeight + scrollY >= docHeight - 140) {
        setActiveSection('contact');
        return;
      }

      // Check current section based on scroll offset
      const readingLine = scrollY + 120;
      for (let i = orderedSections.length - 1; i >= 0; i--) {
        const id = orderedSections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (readingLine >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = 74;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navHeight);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentRoute !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 150);
    } else {
      scrollToSection(sectionId);
    }
  };

  const navLinks: NavLinkItem[] = [
    { id: 'hero', label: 'Home', icon: Home, num: '01' },
    { id: 'architecture', label: 'Architecture', icon: Layers, num: '02' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, num: '03' },
    { id: 'skills', label: 'Skills', icon: Cpu, num: '04' },
    { id: 'experience', label: 'Experience', icon: Briefcase, num: '05' },
    { id: 'about', label: 'About', icon: User, num: '06' },
    { id: 'services', label: 'Services', icon: BookOpen, num: '07' },
    { id: 'contact', label: 'Contact', icon: Mail, num: '08' }
  ];

  return (
    <>
      <header
        id="main-navigation-bar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080706]/92 backdrop-blur-xl border-b border-[#c87a3e]/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.95)] py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-[#080706]/95 via-[#080706]/60 to-transparent py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 flex items-center justify-between gap-2 lg:gap-3 xl:gap-6">
          {/* Brand Identity */}
          <button
            id="nav-brand-button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center space-x-2.5 sm:space-x-3 group text-left cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e59850] rounded-xl"
            aria-label="Go to top of portfolio"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#3d2011] via-[#20150d] to-[#120b07] border border-[#c87a3e]/40 flex items-center justify-center transition-all duration-300 group-hover:border-[#e59850] group-hover:shadow-[0_0_15px_rgba(200,122,62,0.3)] shadow-[0_2px_10px_rgba(0,0,0,0.5)] shrink-0">
              <span className="font-display font-black text-sm sm:text-base tracking-tight bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] bg-clip-text text-transparent">
                SH
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-[#f3d5b5] transition-colors leading-tight whitespace-nowrap">
                  {siteSettings.ownerName}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[11px] font-mono text-[#d4a373] leading-none mt-0.5 max-w-[140px] xl:max-w-[160px] 2xl:max-w-none">
                <span className="truncate">Full Stack Developer</span>
                <span className="text-[#c87a3e]/40 hidden 2xl:inline" aria-hidden="true">·</span>
                <span className="items-center text-emerald-400 text-[10px] hidden 2xl:inline-flex shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1 animate-pulse" />
                  Available
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 px-2 xl:px-2.5 py-1 rounded-full bg-[#120d09]/85 border border-[#c87a3e]/25 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)] shrink-0"
          >
            {navLinks.map((link) => {
              const isActive = currentRoute === 'home' && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-2 xl:px-2.5 py-1.5 rounded-full text-xs transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e59850] whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#f3d5b5] font-semibold'
                      : 'text-[#d4a373] hover:text-white font-medium'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Subtle active underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#b4652a] via-[#e59850] to-[#c87a3e] rounded-full shadow-[0_0_8px_rgba(229,152,80,0.5)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Quick Search Button (Ctrl+K) */}
            <button
              id="nav-search-trigger"
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#15110d]/80 hover:bg-[#201813] border border-[#c87a3e]/20 hover:border-[#c87a3e]/50 text-xs text-[#d4a373] hover:text-[#f3d5b5] transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e59850] shrink-0"
              title="Search Portfolio (Ctrl + K)"
              aria-label="Open search dialog"
            >
              <Search className="w-3.5 h-3.5 text-[#e59850] group-hover:scale-105 transition-transform" />
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#201813] text-[#d4a373] border border-[#c87a3e]/20 hidden 2xl:inline-block">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant Button */}
            <button
              id="nav-ai-assistant-trigger"
              onClick={() => navigateTo('ai-assistant')}
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e59850] shrink-0 ${
                currentRoute === 'ai-assistant'
                  ? 'bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white border border-[#e59850] shadow-[0_0_12px_rgba(200,122,62,0.4)]'
                  : 'bg-[#15110d]/80 hover:bg-[#201813] border border-[#c87a3e]/25 hover:border-[#c87a3e]/60 text-[#f3d5b5]'
              }`}
              title="Interactive AI Portfolio Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
              <span className="hidden 2xl:inline">AI Guide</span>
            </button>

            {/* Resume / CV Modal Trigger */}
            <button
              id="nav-cv-trigger"
              onClick={() => setCvModalOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#1a130e] hover:bg-[#251b14] border border-[#c87a3e]/30 hover:border-[#e59850]/60 text-xs font-medium text-[#f3d5b5] hover:text-white transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e59850] shrink-0"
              title="View and Download Resume"
            >
              <FileDown className="w-3.5 h-3.5 text-[#e59850]" />
              <span>Resume</span>
            </button>

            {/* Let's Talk CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:brightness-110 text-white font-semibold text-xs transition-all shadow-[0_2px_12px_rgba(200,122,62,0.3)] hover:shadow-[0_2px_16px_rgba(200,122,62,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e59850] shrink-0 whitespace-nowrap"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Admin CMS Access */}
            <button
              id="nav-admin-trigger"
              onClick={() => navigateTo('admin')}
              className={`p-2 rounded-lg border transition-all cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e59850] shrink-0 ${
                isAuthenticated
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:brightness-110'
                  : 'bg-[#15110d]/80 hover:bg-[#201813] border-[#c87a3e]/20 hover:border-[#c87a3e]/50 text-[#d4a373] hover:text-[#f3d5b5]'
              }`}
              title={isAuthenticated ? 'Admin Dashboard (Active)' : 'Admin CMS Portal'}
              aria-label="Admin CMS Portal"
            >
              <Lock className="w-3.5 h-3.5 text-[#e59850]" />
              {isAuthenticated && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#15110d] border border-[#c87a3e]/30 text-[#f3d5b5] hover:text-white hover:border-[#e59850] transition-colors cursor-pointer min-w-[42px] min-h-[42px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e59850] shrink-0"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#e59850]" /> : <Menu className="w-5 h-5 text-[#e59850]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#080706]/98 backdrop-blur-2xl flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            {/* Top Bar with Brand & Close Button */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c87a3e]/15">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3d2011] to-[#120b07] border border-[#c87a3e]/50 flex items-center justify-center font-display font-black text-sm text-[#f3d5b5]">
                  SH
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-white leading-tight">
                    {siteSettings.ownerName}
                  </p>
                  <p className="text-[11px] font-mono text-[#d4a373]">
                    {siteSettings.roleTitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-[#17110c] border border-[#c87a3e]/30 text-[#f3d5b5] hover:text-white cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-[#e59850]" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="px-5 py-6 space-y-6 flex-1">
              {/* Search Shortcut in Mobile Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommandPaletteOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#140f0b] border border-[#c87a3e]/25 text-xs text-[#d4a373] hover:text-white hover:border-[#c87a3e]/60 transition-colors"
              >
                <div className="flex items-center space-x-2.5">
                  <Search className="w-4 h-4 text-[#e59850]" />
                  <span>Search skills, projects, stack...</span>
                </div>
                <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#201813] text-[#f3d5b5] border border-[#c87a3e]/25">
                  ⌘K
                </kbd>
              </button>

              {/* Numbered Section Navigation Links */}
              <div className="space-y-1">
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#a88264] font-semibold px-2 mb-2">
                  Navigation
                </p>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentRoute === 'home' && activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all text-left cursor-pointer min-h-[48px] ${
                        isActive
                          ? 'bg-[#201813] text-[#f3d5b5] font-semibold border-l-2 border-[#e59850]'
                          : 'text-[#d4a373] hover:text-white hover:bg-[#15110d]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-mono text-[#a88264] w-5">
                          {link.num}
                        </span>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#e59850]' : 'text-[#a88264]'}`} />
                        <span className="text-sm">{link.label}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#8d6e52]" />
                    </button>
                  );
                })}
              </div>

              {/* AI Assistant Center Quick Access */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('ai-assistant');
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  currentRoute === 'ai-assistant'
                    ? 'bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white border-[#e59850] shadow-md'
                    : 'bg-[#15110d] border-[#c87a3e]/30 text-[#f3d5b5] hover:border-[#e59850]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-[#281b13] border border-[#c87a3e]/40 flex items-center justify-center text-[#e59850]">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-white block">AI Assistant Center</span>
                    <span className="text-[11px] text-[#d4a373] font-mono">Ask about stack, architecture &amp; fit</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#e59850]" />
              </button>
            </div>

            {/* Bottom Actions & Status in Mobile Drawer */}
            <div className="p-5 border-t border-[#c87a3e]/15 space-y-3 bg-[#0a0806]">
              {/* Availability Notice */}
              <div className="flex items-center justify-between text-xs font-mono text-[#d4a373] px-1">
                <span>Availability Status:</span>
                <span className="text-emerald-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  {siteSettings.availability}
                </span>
              </div>

              {/* Primary Actions: Let's Talk & Download CV */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] text-white font-bold text-xs shadow-md cursor-pointer min-h-[44px]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Let&apos;s Talk</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCvModalOpen(true);
                  }}
                  className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#1e1510] hover:bg-[#281b14] border border-[#c87a3e]/35 text-[#f3d5b5] font-semibold text-xs cursor-pointer min-h-[44px]"
                >
                  <FileDown className="w-4 h-4 text-[#e59850]" />
                  <span>Download CV</span>
                </button>
              </div>

              {/* Instant WhatsApp & Phone Actions */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="https://wa.me/923112802870"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold min-h-[44px]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#1a120c] border border-[#c87a3e]/30 text-[#f3d5b5] text-xs font-semibold min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#e59850]" />
                  <span>Call Direct</span>
                </a>
              </div>

              {/* Admin CMS Access */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('admin');
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#130e0a] border border-[#c87a3e]/20 text-[#a88264] hover:text-[#f3d5b5] text-xs font-mono cursor-pointer"
              >
                <Lock className="w-3 h-3 text-[#e59850]" />
                <span>Admin CMS Portal {isAuthenticated ? '(Logged in)' : ''}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
