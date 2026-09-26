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
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteSettings, navigateTo, setCvModalOpen } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                <h3 className="font-display font-bold text-lg text-white">Sameer Habib</h3>
                <p className="text-xs font-mono text-[#e59850]">Senior Full Stack Developer</p>
              </div>
            </div>

            <p className="text-sm text-[#e7bc91] max-w-sm leading-relaxed">
              Engineering robust web applications, e-commerce architectures, and responsive digital products with Laravel, PHP, React.js, and Next.js.
            </p>

            <div className="flex items-center space-x-2 pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1e1510] border border-[#c87a3e]/30 text-[11px] font-mono text-[#f3d5b5]">
                Code • Build • Scale
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[11px] font-mono text-emerald-300">
                ● {siteSettings.availability}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#f3d5b5] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#d4a373]">
              <li>
                <button
                  onClick={() => navigateTo('ai-assistant')}
                  className="hover:text-[#e59850] transition-colors flex items-center space-x-1.5 font-semibold text-[#f3d5b5] cursor-pointer"
                >
                  <span className="text-[#e59850]">⚡</span>
                  <span>AI Assistant Center</span>
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-[#f3d5b5] transition-colors">
                  About Narrative
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#f3d5b5] transition-colors">
                  Technical Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#f3d5b5] transition-colors">
                  Work Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#f3d5b5] transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#f3d5b5] transition-colors">
                  Engineering Services
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#f3d5b5] transition-colors">
                  Development Process
                </a>
              </li>
            </ul>
          </div>

          {/* Featured Case Studies */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#f3d5b5] font-semibold">
              Case Studies
            </h4>
            <ul className="space-y-2 text-sm text-[#d4a373]">
              <li>
                <button
                  onClick={() => navigateTo('project-detail', 'livshem')}
                  className="hover:text-[#f3d5b5] transition-colors text-left"
                >
                  Livshem (E-Commerce)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('project-detail', 'the-designs-firm')}
                  className="hover:text-[#f3d5b5] transition-colors text-left"
                >
                  The Designs Firm
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('project-detail', 'college-library-system')}
                  className="hover:text-[#f3d5b5] transition-colors text-left"
                >
                  College Library System
                </button>
              </li>
              <li>
                <a
                  href="#experience"
                  className="hover:text-[#f3d5b5] transition-colors text-left flex items-center space-x-1"
                >
                  <span>Work Experience</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Actions */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#f3d5b5] font-semibold">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              <a
                href={siteSettings.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-[#c87a3e] hover:bg-[#231a14] transition-all shadow-xs"
                title="GitHub"
              >
                <Github className="w-4 h-4 text-[#e59850]" />
              </a>
              <a
                href={siteSettings.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-[#c87a3e] hover:bg-[#231a14] transition-all shadow-xs"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[#e59850]" />
              </a>
              <a
                href={siteSettings.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-[#c87a3e] hover:bg-[#231a14] transition-all shadow-xs"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4 text-[#e59850]" />
              </a>
              <a
                href={`mailto:${siteSettings.email}`}
                className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-[#c87a3e] hover:bg-[#231a14] transition-all shadow-xs"
                title="Email Sameer"
              >
                <Mail className="w-4 h-4 text-[#e59850]" />
              </a>
              <a
                href={siteSettings.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[#f3d5b5] hover:text-white hover:border-emerald-500/50 hover:bg-[#231a14] transition-all shadow-xs"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCvModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-full bg-[#15110d] hover:bg-[#231a14] border border-[#c87a3e]/30 hover:border-[#e59850] text-xs font-medium text-[#f3d5b5] hover:text-white transition-all shadow-xs cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5 text-[#e59850]" />
                <span>Download Active CV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d4a373] font-mono">
          <div>
            © 2026 Sameer Habib. All rights reserved. • Pakistan
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center space-x-1.5 hover:text-[#f3d5b5] transition-colors text-[#d4a373] cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin CMS</span>
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-[#f3d5b5] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
