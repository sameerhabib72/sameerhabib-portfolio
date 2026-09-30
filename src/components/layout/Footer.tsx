import React from 'react';
import { useData } from '../../context/DataContext';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUp,
  MessageCircle,
  FileDown,
  Lock,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteSettings, navigateTo, setCvModalOpen } = useData();
  const fs = siteSettings.footerSettings;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    if (url.startsWith('project:')) {
      e.preventDefault();
      const slug = url.replace('project:', '').trim();
      navigateTo('project-detail', slug);
    } else if (url.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(url);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = url;
      }
    }
  };

  // Values with fallbacks
  const brandTitle = fs?.brandTitle || siteSettings.ownerName || 'Sameer Habib';
  const brandTagline = fs?.brandTagline || siteSettings.roleTitle || 'Senior Full Stack Developer';
  const brandDescription =
    fs?.brandDescription ||
    'Engineering robust web applications, e-commerce architectures, and responsive digital products with Laravel, PHP, React.js, and Next.js.';
  const brandBadge = fs?.brandBadge || 'Code • Build • Scale';
  const showAvailability = fs?.showAvailabilityBadge !== false;

  const exploreTitle = fs?.exploreTitle || 'Explore';
  const showAiLink = fs?.showAiAssistantLink !== false;
  const exploreLinks = fs?.exploreLinks && fs.exploreLinks.length > 0 ? fs.exploreLinks : [
    { id: 'exp-1', label: 'About Narrative', url: '#about' },
    { id: 'exp-2', label: 'Technical Skills', url: '#skills' },
    { id: 'exp-3', label: 'Work Experience', url: '#experience' },
    { id: 'exp-4', label: 'Featured Projects', url: '#projects' },
    { id: 'exp-5', label: 'Engineering Services', url: '#services' },
    { id: 'exp-6', label: 'Development Process', url: '#process' }
  ];

  const caseStudiesTitle = fs?.caseStudiesTitle || 'Case Studies';
  const caseStudiesLinks = fs?.caseStudiesLinks && fs.caseStudiesLinks.length > 0 ? fs.caseStudiesLinks : [
    { id: 'cs-1', label: 'Livshem (E-Commerce)', url: 'project:livshem' },
    { id: 'cs-2', label: 'The Designs Firm', url: 'project:the-designs-firm' },
    { id: 'cs-3', label: 'College Library System', url: 'project:college-library-system' },
    { id: 'cs-4', label: 'Work Experience', url: '#experience' }
  ];

  const connectTitle = fs?.connectTitle || 'Connect';
  const showGithub = fs?.showGithub !== false && siteSettings.githubUrl;
  const showLinkedin = fs?.showLinkedin !== false && siteSettings.linkedinUrl;
  const showTwitter = fs?.showTwitter !== false && siteSettings.twitterUrl;
  const showEmail = fs?.showEmail !== false && siteSettings.email;
  const showWhatsapp = fs?.showWhatsapp !== false && siteSettings.whatsappUrl;
  const showCvBtn = fs?.showCvDownloadButton !== false;
  const cvBtnText = fs?.cvButtonText || 'Download Active CV';

  const copyrightText = fs?.copyrightText || '© 2026 Sameer Habib. All rights reserved.';
  const locationTag = fs?.locationTag || 'Pakistan';
  const showAdminLink = fs?.showAdminLink !== false;
  const showBackToTop = fs?.showBackToTop !== false;
  const backToTopText = fs?.backToTopText || 'Back to Top';

  return (
    <footer id="main-footer" className="relative bg-[#080706] border-t border-[#c87a3e]/15 pt-16 pb-12 overflow-hidden">
      {/* Subtle background warm leather glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-[#c87a3e]/15 via-[#964e1c]/10 to-transparent pointer-events-none blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#c87a3e]/15">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#964e1c]/40 via-[#c87a3e]/30 to-[#d97706]/30 border border-[#c87a3e]/50 flex items-center justify-center shadow-[0_0_20px_-5px_rgba(200,122,62,0.35)]">
                <span className="font-display font-black text-lg tracking-tight bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] bg-clip-text text-transparent">SH</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">{brandTitle}</h3>
                <p className="text-xs font-mono text-[#e59850]">{brandTagline}</p>
              </div>
            </div>

            <p className="text-sm text-[#e7bc91] max-w-sm leading-relaxed">
              {brandDescription}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {brandBadge && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1e1510] border border-[#c87a3e]/30 text-[11px] font-mono text-[#f3d5b5]">
                  {brandBadge}
                </span>
              )}
              {showAvailability && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[11px] font-mono text-emerald-300">
                  ● {siteSettings.availability}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#f3d5b5] font-semibold">
              {exploreTitle}
            </h4>
            <ul className="space-y-2 text-sm text-[#d4a373]">
              {showAiLink && (
                <li>
                  <button
                    onClick={() => navigateTo('ai-assistant')}
                    className="hover:text-[#e59850] transition-colors flex items-center space-x-1.5 font-semibold text-[#f3d5b5] cursor-pointer"
                  >
                    <span className="text-[#e59850]">⚡</span>
                    <span>AI Assistant Center</span>
                  </button>
                </li>
              )}
              {exploreLinks.map((link) => (
                <li key={link.id}>
                  {link.url.startsWith('http') ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#f3d5b5] transition-colors inline-flex items-center space-x-1"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 text-[#a88264]" />
                    </a>
                  ) : (
                    <a
                      href={link.url}
                      onClick={(e) => handleLinkClick(e, link.url)}
                      className="hover:text-[#f3d5b5] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Case Studies Column */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#f3d5b5] font-semibold">
              {caseStudiesTitle}
            </h4>
            <ul className="space-y-2 text-sm text-[#d4a373]">
              {caseStudiesLinks.map((link) => (
                <li key={link.id}>
                  {link.url.startsWith('project:') ? (
                    <button
                      onClick={() => navigateTo('project-detail', link.url.replace('project:', '').trim())}
                      className="hover:text-[#f3d5b5] transition-colors text-left cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ) : link.url.startsWith('http') ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#f3d5b5] transition-colors inline-flex items-center space-x-1"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 text-[#a88264]" />
                    </a>
                  ) : (
                    <a
                      href={link.url}
                      onClick={(e) => handleLinkClick(e, link.url)}
                      className="hover:text-[#f3d5b5] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Actions Column */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#f3d5b5] font-semibold">
              {connectTitle}
            </h4>
            <div className="flex flex-wrap gap-2">
              {showGithub && (
                <a
                  href={siteSettings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-[#c87a3e] hover:bg-[#231a14] transition-all shadow-xs"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 text-[#e59850]" />
                </a>
              )}
              {showLinkedin && (
                <a
                  href={siteSettings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-[#c87a3e] hover:bg-[#231a14] transition-all shadow-xs"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-[#e59850]" />
                </a>
              )}
              {showTwitter && (
                <a
                  href={siteSettings.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-[#c87a3e] hover:bg-[#231a14] transition-all shadow-xs"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4 text-[#e59850]" />
                </a>
              )}
              {showEmail && (
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-[#c87a3e] hover:bg-[#231a14] transition-all shadow-xs"
                  title="Email Sameer"
                >
                  <Mail className="w-4 h-4 text-[#e59850]" />
                </a>
              )}
              {showWhatsapp && (
                <a
                  href={siteSettings.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-emerald-500/50 hover:bg-[#231a14] transition-all shadow-xs"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </a>
              )}
            </div>

            {showCvBtn && (
              <div className="pt-2">
                <button
                  onClick={() => setCvModalOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full bg-[#15110d] hover:bg-[#231a14] border border-[#c87a3e]/30 hover:border-[#e59850] text-xs font-medium text-[#f3d5b5] hover:text-white transition-all shadow-xs cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#e59850]" />
                  <span>{cvBtnText}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d4a373] font-mono">
          <div>
            {copyrightText} {locationTag && `• ${locationTag}`}
          </div>

          <div className="flex items-center space-x-4">
            {showAdminLink && (
              <button
                onClick={() => navigateTo('admin')}
                className="flex items-center space-x-1.5 hover:text-[#f3d5b5] transition-colors text-[#d4a373] cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Admin CMS</span>
              </button>
            )}
            {showAdminLink && showBackToTop && <span>•</span>}
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-1 hover:text-[#f3d5b5] transition-colors cursor-pointer"
              >
                <span>{backToTopText}</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
