import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  Globe,
  ShoppingCart,
  Building2,
  Server,
  ArrowRight,
  FileDown,
  Github,
  BookOpen,
  Sparkles,
  Layers,
  Code2,
  Briefcase
} from 'lucide-react';

interface ValueCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tech: string[];
  relatedProjectSlug: string;
  relatedProjectTitle: string;
}

export const QuickValueSection: React.FC = () => {
  const { siteSettings, setCvModalOpen, navigateTo, trackEvent } = useData();
  const [audienceTab, setAudienceTab] = useState<'recruiter' | 'client' | 'developer'>('recruiter');

  const valueCards: ValueCard[] = [
    {
      id: 'web-apps',
      title: 'Web Applications',
      tagline: 'Modern, reactive single-page applications',
      description: 'End-to-end full stack web platforms featuring clean component boundaries, optimistic UI updates, responsive layouts, and robust state machines.',
      icon: Globe,
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
      relatedProjectSlug: 'idemitsu-lubricants',
      relatedProjectTitle: 'Idemitsu Lubricants'
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Platforms',
      tagline: 'High-conversion checkout & inventory systems',
      description: 'Dynamic product catalogs, atomic multi-step checkouts, asynchronous AJAX carts, intelligent shopping lists, and administrative stock control.',
      icon: ShoppingCart,
      tech: ['Laravel 10', 'MySQL', 'AJAX', 'REST APIs'],
      relatedProjectSlug: 'livshem',
      relatedProjectTitle: 'LIVSHEM Platform'
    },
    {
      id: 'business-systems',
      title: 'Business Systems',
      tagline: 'Mission-critical enterprise & gov platforms',
      description: 'Multi-role authentication, banking-grade security modules, immutable audit logging, and accreditation portals built to withstand heavy production load.',
      icon: Building2,
      tech: ['Laravel', 'MySQL 8', 'Redis', 'Sanctum'],
      relatedProjectSlug: 'sbte-portal',
      relatedProjectTitle: 'SBTE Examination Portal'
    },
    {
      id: 'apis-backends',
      title: 'APIs & Backend Systems',
      tagline: 'Deterministic, secured RESTful services',
      description: 'Clean MVC architecture, third-party webhook integrations, rate limiting, token guards, structured JSON error contracts, and query-optimized schemas.',
      icon: Server,
      tech: ['PHP 8.2+', 'Laravel', 'REST APIs', 'Postman'],
      relatedProjectSlug: 'askari-bank-cms',
      relatedProjectTitle: 'Askari Bank CMS'
    }
  ];

  return (
    <motion.section
      id="what-i-build"
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-20 bg-[#080706] border-t border-[#c87a3e]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
              <span>01 // CORE SPECIALIZATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              What I Architect &amp; Build
            </h2>
            <p className="mt-3 text-base text-[#e7bc91] leading-relaxed">
              Commercial software architectures engineered from user requirement to high-availability production deployment.
            </p>
          </div>

          {/* Audience Filter Pills in Leather Style */}
          <div className="flex items-center p-1 rounded-full bg-[#15110d] border border-[#c87a3e]/20 self-start md:self-auto shadow-sm">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAudienceTab('recruiter')}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                audienceTab === 'recruiter'
                  ? 'bg-[#c87a3e] text-white font-bold shadow-[0_0_15px_-3px_rgba(200,122,62,0.6)]'
                  : 'text-[#d4a373] hover:text-white'
              }`}
            >
              For Recruiters
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAudienceTab('client')}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                audienceTab === 'client'
                  ? 'bg-[#c87a3e] text-white font-bold shadow-[0_0_15px_-3px_rgba(200,122,62,0.6)]'
                  : 'text-[#d4a373] hover:text-white'
              }`}
            >
              For Clients
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAudienceTab('developer')}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                audienceTab === 'developer'
                  ? 'bg-[#c87a3e] text-white font-bold shadow-[0_0_15px_-3px_rgba(200,122,62,0.6)]'
                  : 'text-[#d4a373] hover:text-white'
              }`}
            >
              For Developers
            </motion.button>
          </div>
        </motion.div>

        {/* Audience Snapshot Drawer */}
        <AnimatePresence mode="wait">
          {audienceTab === 'recruiter' && (
            <motion.div
              key="recruiter-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-6 rounded-2xl bg-[#15110d] border border-[#c87a3e]/30 mb-12 shadow-lg"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-left">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#e59850] font-bold uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Recruiter Snapshot</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#f3d5b5] font-mono">
                    <span><strong>Role:</strong> Full Stack Software Developer</span>
                    <span>•</span>
                    <span><strong>Core Stack:</strong> Laravel • PHP 8 • React • Next.js • MySQL</span>
                    <span>•</span>
                    <span><strong>Location:</strong> Karachi / Remote</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">● {siteSettings.availability}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1.5, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      trackEvent('cv_download', { source: 'recruiter_snapshot' });
                      setCvModalOpen(true);
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white font-bold text-xs shadow-md shadow-[#c87a3e]/30 border border-[#e59850]/40 transition-all cursor-pointer"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download CV</span>
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.025, y: -1, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                    whileTap={{ scale: 0.98 }}
                    href="#projects"
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#231a14] hover:bg-[#2e221a] text-[#f3d5b5] hover:text-white text-xs font-medium border border-[#c87a3e]/30 hover:border-[#e59850] transition-all shadow-sm"
                  >
                    <span>View Flagship Case Studies</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}

          {audienceTab === 'client' && (
            <motion.div
              key="client-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-6 rounded-2xl bg-[#15110d] border border-[#c87a3e]/30 mb-12 shadow-lg text-left"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Need a Web Application, E-Commerce Platform, or Custom Backend?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#e7bc91]">
                    I build dependable, maintainable digital products from scoping to deployment, with clean weekly milestones and transparent code ownership.
                  </p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.03, y: -1.5, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] text-white font-bold text-xs shadow-md shadow-[#c87a3e]/30 border border-[#e59850]/40 transition-all shrink-0 cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.div>
          )}

          {audienceTab === 'developer' && (
            <motion.div
              key="developer-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-6 rounded-2xl bg-[#15110d] border border-[#c87a3e]/30 mb-12 shadow-lg text-left"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-1 flex items-center space-x-2">
                    <Code2 className="w-4 h-4 text-[#e59850]" />
                    <span>For Developers &amp; Technical Leads</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#e7bc91]">
                    Explore normalized schemas, REST contracts, Redis caching patterns, and architectural decision records.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.03, y: -1, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                    whileTap={{ scale: 0.97 }}
                    href="#architecture-visual"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#231a14] hover:bg-[#2e221a] text-[#f3d5b5] hover:text-white text-xs font-mono border border-[#c87a3e]/30 hover:border-[#e59850] transition-all shadow-xs"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Architecture Visual</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.03, y: -1, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                    whileTap={{ scale: 0.97 }}
                    href="#experience"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#231a14] hover:bg-[#2e221a] text-[#f3d5b5] hover:text-white text-xs font-mono border border-[#c87a3e]/30 hover:border-[#e59850] transition-all shadow-xs cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Work Experience</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.03, y: -1, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                    whileTap={{ scale: 0.97 }}
                    href={siteSettings.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#231a14] hover:bg-[#2e221a] text-white text-xs font-mono border border-[#c87a3e]/30 hover:border-[#e59850] transition-all shadow-xs"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Profile</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Bento Card 1: Large Spotlight (Spans 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-7 p-7 sm:p-8 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 shadow-[0_0_35px_-10px_rgba(0,0,0,0.9)] hover:shadow-[0_0_35px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl flex flex-col justify-between text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c87a3e]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#c87a3e]/20 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#281b13] border border-[#c87a3e]/40 flex items-center justify-center text-[#e59850] group-hover:scale-110 transition-all shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#f3d5b5] font-semibold px-3 py-1 rounded-full bg-[#281b13] border border-[#c87a3e]/40">
                  FLAGSHIP SPECIALIZATION
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-[#f3d5b5] transition-colors mb-2">
                High-Concurrency Web Systems &amp; Modern Frontends
              </h3>
              <p className="text-sm font-mono text-[#e59850] font-medium mb-4">
                Reactive single-page architecture • Sub-second server responses
              </p>

              <p className="text-sm sm:text-base text-[#e7bc91] leading-relaxed mb-6 max-w-xl">
                End-to-end full stack web platforms featuring clean component boundaries, optimistic UI updates, responsive layouts, and robust state machines. Crafted with Next.js, React, and Laravel backends that handle high-throughput traffic without degradation.
              </p>

              {/* Interactive Micro Metric Visualizer */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#1e1611] border border-[#c87a3e]/20 mb-6">
                <div className="text-left">
                  <p className="text-[10px] font-mono text-[#d4a373] uppercase">Uptime SLA</p>
                  <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono">99.98%</p>
                </div>
                <div className="text-left border-x border-[#c87a3e]/20 px-3">
                  <p className="text-[10px] font-mono text-[#d4a373] uppercase">Latency Avg</p>
                  <p className="text-base sm:text-lg font-bold text-[#e59850] font-mono">&lt; 140ms</p>
                </div>
                <div className="text-left pl-3">
                  <p className="text-[10px] font-mono text-[#d4a373] uppercase">Architecture</p>
                  <p className="text-base sm:text-lg font-bold text-[#f3d5b5] font-mono">Micro-MVC</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c87a3e]/15 flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-wrap gap-1.5">
                {['React 19', 'Next.js 15', 'Laravel 11', 'TypeScript', 'Tailwind'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#1b1510] border border-[#c87a3e]/20 text-[11px] font-mono text-[#d4a373] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.04, x: 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('project-detail', 'idemitsu-lubricants')}
                className="inline-flex items-center space-x-1.5 text-xs text-[#e59850] hover:text-white font-mono font-semibold transition-colors cursor-pointer group-hover:underline"
              >
                <span>Case Study: Idemitsu Platform</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#e59850]" />
              </motion.button>
            </div>
          </motion.div>

          {/* Bento Card 2: E-Commerce & Checkout Systems (Spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 shadow-[0_0_35px_-10px_rgba(0,0,0,0.9)] hover:shadow-[0_0_35px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl flex flex-col justify-between text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#d97706]/10 rounded-full blur-[70px] pointer-events-none group-hover:bg-[#d97706]/20 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#281b13] border border-[#c87a3e]/40 flex items-center justify-center text-[#e59850] group-hover:scale-110 transition-all shadow-sm">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#f3d5b5] font-semibold px-3 py-1 rounded-full bg-[#281b13] border border-[#c87a3e]/40">
                  HIGH-CONVERSION
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#f3d5b5] transition-colors mb-2">
                E-Commerce Platforms &amp; Catalogs
              </h3>
              <p className="text-sm font-mono text-[#e59850] font-medium mb-4">
                Atomic checkouts • Real-time inventory sync
              </p>

              <p className="text-sm text-[#e7bc91] leading-relaxed mb-6">
                Dynamic product catalogs, atomic multi-step checkouts, asynchronous AJAX carts, intelligent shopping lists, and administrative stock control engineered for LIVSHEM and commercial retailers.
              </p>
            </div>

            <div className="pt-4 border-t border-[#c87a3e]/15 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {['Laravel 10', 'MySQL 8', 'AJAX Cart', 'REST APIs', 'Stripe'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#1b1510] border border-[#c87a3e]/20 text-[11px] font-mono text-[#d4a373] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.04, x: 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('project-detail', 'livshem')}
                className="inline-flex items-center space-x-1.5 text-xs text-[#e59850] hover:text-white font-mono font-semibold transition-colors cursor-pointer group-hover:underline"
              >
                <span>See LIVSHEM Platform Architecture</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#e59850]" />
              </motion.button>
            </div>
          </motion.div>

          {/* Bento Card 3: Business Systems & Exam Portals (Spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 shadow-[0_0_35px_-10px_rgba(0,0,0,0.9)] hover:shadow-[0_0_35px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl flex flex-col justify-between text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c87a3e]/10 rounded-full blur-[70px] pointer-events-none group-hover:bg-[#c87a3e]/20 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#281b13] border border-[#c87a3e]/40 flex items-center justify-center text-[#e59850] group-hover:scale-110 transition-all shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#f3d5b5] font-semibold px-3 py-1 rounded-full bg-[#281b13] border border-[#c87a3e]/40">
                  GOV &amp; ENTERPRISE
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#f3d5b5] transition-colors mb-2">
                Business Systems &amp; Gov Portals
              </h3>
              <p className="text-sm font-mono text-[#e59850] font-medium mb-4">
                RBAC security • Immutable audit logging
              </p>

              <p className="text-sm text-[#e7bc91] leading-relaxed mb-6">
                Multi-role authentication, banking-grade security modules, immutable audit trails, and certification portals built to withstand heavy production load for Sindh Board of Technical Education.
              </p>
            </div>

            <div className="pt-4 border-t border-[#c87a3e]/15 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {['Laravel', 'MySQL 8', 'Redis', 'Sanctum RBAC', 'Export PDF'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#1b1510] border border-[#c87a3e]/20 text-[11px] font-mono text-[#d4a373] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.04, x: 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('project-detail', 'sbte-portal')}
                className="inline-flex items-center space-x-1.5 text-xs text-[#e59850] hover:text-white font-mono font-semibold transition-colors cursor-pointer group-hover:underline"
              >
                <span>Explore SBTE Portal Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#e59850]" />
              </motion.button>
            </div>
          </motion.div>

          {/* Bento Card 4: APIs & Microservices (Spans 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-7 p-7 sm:p-8 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 shadow-[0_0_35px_-10px_rgba(0,0,0,0.9)] hover:shadow-[0_0_35px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl flex flex-col justify-between text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d97706]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#d97706]/20 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#281b13] border border-[#c87a3e]/40 flex items-center justify-center text-[#e59850] group-hover:scale-110 transition-all shadow-sm">
                  <Server className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#f3d5b5] font-semibold px-3 py-1 rounded-full bg-[#281b13] border border-[#c87a3e]/40">
                  DETERMINISTIC BACKEND
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-[#f3d5b5] transition-colors mb-2">
                APIs, Caching &amp; Backend Infrastructure
              </h3>
              <p className="text-sm font-mono text-[#e59850] font-medium mb-4">
                Structured contracts • 45% query speedup with Redis
              </p>

              <p className="text-sm sm:text-base text-[#e7bc91] leading-relaxed mb-6 max-w-xl">
                Clean MVC domain architecture, third-party webhook integrations, rate limiting, token guards, structured JSON error contracts, and query-optimized schemas designed for Askari Bank and high-scale applications.
              </p>

              {/* API Contract Flow Preview */}
              <div className="p-3 rounded-2xl bg-[#0a0806] border border-[#c87a3e]/20 font-mono text-xs text-[#d4a373] space-y-1.5 mb-6">
                <div className="flex items-center justify-between text-[11px] text-[#f3d5b5] border-b border-[#c87a3e]/15 pb-1">
                  <span>POST /api/v1/checkout/process</span>
                  <span className="text-emerald-400">200 OK • 84ms</span>
                </div>
                <p className="text-[#a88264] text-[11px] truncate">
                  Headers: Bearer SanctumToken • RateLimit: 120/min • Cache: HIT (Redis)
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c87a3e]/15 flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-wrap gap-1.5">
                {['PHP 8.3', 'Laravel 11', 'Redis', 'Postman', 'Docker', 'MySQL 8'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-[#1b1510] border border-[#c87a3e]/20 text-[11px] font-mono text-[#d4a373] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.04, x: 3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('project-detail', 'askari-bank-cms')}
                className="inline-flex items-center space-x-1.5 text-xs text-[#e59850] hover:text-white font-mono font-semibold transition-colors cursor-pointer group-hover:underline"
              >
                <span>View Askari Bank CMS System</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#e59850]" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
