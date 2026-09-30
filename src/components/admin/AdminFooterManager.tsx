import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  Sparkles,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MessageCircle,
  FileDown,
  Lock,
  ArrowUp,
  Layout,
  CheckCircle2
} from 'lucide-react';
import { FooterSettings, FooterCustomLink } from '../../types';

export const AdminFooterManager: React.FC = () => {
  const { siteSettings, updateSiteSettings, showToast, projects } = useData();

  const currentFooter: FooterSettings = siteSettings.footerSettings || {
    brandTitle: siteSettings.ownerName || 'Sameer Habib',
    brandTagline: siteSettings.roleTitle || 'Senior Full Stack Developer',
    brandDescription:
      'Engineering robust web applications, e-commerce architectures, and responsive digital products with Laravel, PHP, React.js, and Next.js.',
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
  };

  // State management
  const [brandTitle, setBrandTitle] = useState(currentFooter.brandTitle || siteSettings.ownerName || 'Sameer Habib');
  const [brandTagline, setBrandTagline] = useState(currentFooter.brandTagline || siteSettings.roleTitle || 'Senior Full Stack Developer');
  const [brandDescription, setBrandDescription] = useState(
    currentFooter.brandDescription ||
      'Engineering robust web applications, e-commerce architectures, and responsive digital products with Laravel, PHP, React.js, and Next.js.'
  );
  const [brandBadge, setBrandBadge] = useState(currentFooter.brandBadge || 'Code • Build • Scale');
  const [showAvailabilityBadge, setShowAvailabilityBadge] = useState(
    currentFooter.showAvailabilityBadge !== undefined ? currentFooter.showAvailabilityBadge : true
  );

  // Explore links
  const [exploreTitle, setExploreTitle] = useState(currentFooter.exploreTitle || 'Explore');
  const [showAiAssistantLink, setShowAiAssistantLink] = useState(
    currentFooter.showAiAssistantLink !== undefined ? currentFooter.showAiAssistantLink : true
  );
  const [exploreLinks, setExploreLinks] = useState<FooterCustomLink[]>(currentFooter.exploreLinks || []);
  const [newExploreLabel, setNewExploreLabel] = useState('');
  const [newExploreUrl, setNewExploreUrl] = useState('');

  // Case Studies links
  const [caseStudiesTitle, setCaseStudiesTitle] = useState(currentFooter.caseStudiesTitle || 'Case Studies');
  const [caseStudiesLinks, setCaseStudiesLinks] = useState<FooterCustomLink[]>(currentFooter.caseStudiesLinks || []);
  const [newCaseLabel, setNewCaseLabel] = useState('');
  const [newCaseUrl, setNewCaseUrl] = useState('');

  // Connect & Socials
  const [connectTitle, setConnectTitle] = useState(currentFooter.connectTitle || 'Connect');
  const [showGithub, setShowGithub] = useState(currentFooter.showGithub !== undefined ? currentFooter.showGithub : true);
  const [showLinkedin, setShowLinkedin] = useState(currentFooter.showLinkedin !== undefined ? currentFooter.showLinkedin : true);
  const [showTwitter, setShowTwitter] = useState(currentFooter.showTwitter !== undefined ? currentFooter.showTwitter : true);
  const [showEmail, setShowEmail] = useState(currentFooter.showEmail !== undefined ? currentFooter.showEmail : true);
  const [showWhatsapp, setShowWhatsapp] = useState(currentFooter.showWhatsapp !== undefined ? currentFooter.showWhatsapp : true);
  const [showCvDownloadButton, setShowCvDownloadButton] = useState(
    currentFooter.showCvDownloadButton !== undefined ? currentFooter.showCvDownloadButton : true
  );
  const [cvButtonText, setCvButtonText] = useState(currentFooter.cvButtonText || 'Download Active CV');

  // Real Social Profile URLs
  const [githubUrl, setGithubUrl] = useState(siteSettings.githubUrl || 'https://github.com/sameerhabib72');
  const [linkedinUrl, setLinkedinUrl] = useState(siteSettings.linkedinUrl || 'https://linkedin.com/in/sameer-habib');
  const [twitterUrl, setTwitterUrl] = useState(siteSettings.twitterUrl || 'https://x.com/sameerhabib');
  const [whatsappUrl, setWhatsappUrl] = useState(siteSettings.whatsappUrl || 'https://wa.me/923112802870');
  const [emailAddress, setEmailAddress] = useState(siteSettings.email || 'sameerhabib72@gmail.com');

  // Bottom bar
  const [copyrightText, setCopyrightText] = useState(currentFooter.copyrightText || '© 2026 Sameer Habib. All rights reserved.');
  const [locationTag, setLocationTag] = useState(currentFooter.locationTag || 'Pakistan');
  const [showAdminLink, setShowAdminLink] = useState(currentFooter.showAdminLink !== undefined ? currentFooter.showAdminLink : true);
  const [showBackToTop, setShowBackToTop] = useState(currentFooter.showBackToTop !== undefined ? currentFooter.showBackToTop : true);
  const [backToTopText, setBackToTopText] = useState(currentFooter.backToTopText || 'Back to Top');

  // Active sub-tab inside footer manager
  const [activeSection, setActiveSection] = useState<'brand' | 'explore' | 'cases' | 'socials' | 'bottom' | 'preview'>('brand');

  // Handlers for Explore Links
  const handleAddExploreLink = () => {
    if (!newExploreLabel.trim() || !newExploreUrl.trim()) {
      showToast('Please provide both label and URL', 'error');
      return;
    }
    const newLink: FooterCustomLink = {
      id: 'exp-' + Date.now(),
      label: newExploreLabel.trim(),
      url: newExploreUrl.trim()
    };
    setExploreLinks([...exploreLinks, newLink]);
    setNewExploreLabel('');
    setNewExploreUrl('');
    showToast('Navigation link added');
  };

  const handleRemoveExploreLink = (id: string) => {
    setExploreLinks(exploreLinks.filter((l) => l.id !== id));
  };

  // Handlers for Case Studies Links
  const handleAddCaseLink = () => {
    if (!newCaseLabel.trim() || !newCaseUrl.trim()) {
      showToast('Please provide both label and URL/slug', 'error');
      return;
    }
    const newLink: FooterCustomLink = {
      id: 'cs-' + Date.now(),
      label: newCaseLabel.trim(),
      url: newCaseUrl.trim()
    };
    setCaseStudiesLinks([...caseStudiesLinks, newLink]);
    setNewCaseLabel('');
    setNewCaseUrl('');
    showToast('Case study link added');
  };

  const handleRemoveCaseLink = (id: string) => {
    setCaseStudiesLinks(caseStudiesLinks.filter((l) => l.id !== id));
  };

  const handleSyncProjectsToCaseStudies = () => {
    const featured = projects.slice(0, 4).map((p, idx) => ({
      id: 'cs-p-' + p.id + '-' + idx,
      label: `${p.title} (${p.category})`,
      url: `project:${p.slug}`
    }));
    setCaseStudiesLinks(featured);
    showToast('Synchronized with top featured projects');
  };

  // Save all footer settings
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFooter: FooterSettings = {
      brandTitle: brandTitle.trim(),
      brandTagline: brandTagline.trim(),
      brandDescription: brandDescription.trim(),
      brandBadge: brandBadge.trim(),
      showAvailabilityBadge,
      exploreTitle: exploreTitle.trim(),
      showAiAssistantLink,
      exploreLinks,
      caseStudiesTitle: caseStudiesTitle.trim(),
      caseStudiesLinks,
      connectTitle: connectTitle.trim(),
      showGithub,
      showLinkedin,
      showTwitter,
      showEmail,
      showWhatsapp,
      showCvDownloadButton,
      cvButtonText: cvButtonText.trim(),
      copyrightText: copyrightText.trim(),
      locationTag: locationTag.trim(),
      showAdminLink,
      showBackToTop,
      backToTopText: backToTopText.trim()
    };

    updateSiteSettings({
      footerSettings: updatedFooter,
      githubUrl: githubUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      twitterUrl: twitterUrl.trim(),
      whatsappUrl: whatsappUrl.trim(),
      email: emailAddress.trim()
    });
    showToast('Footer & Social Media links saved and synced to database');
  };

  // Reset to default settings
  const handleResetDefaults = () => {
    if (window.confirm('Reset all footer settings to factory default values?')) {
      setBrandTitle('Sameer Habib');
      setBrandTagline('Senior Full Stack Developer');
      setBrandDescription(
        'Engineering robust web applications, e-commerce architectures, and responsive digital products with Laravel, PHP, React.js, and Next.js.'
      );
      setBrandBadge('Code • Build • Scale');
      setShowAvailabilityBadge(true);
      setExploreTitle('Explore');
      setShowAiAssistantLink(true);
      setExploreLinks([
        { id: 'exp-1', label: 'About Narrative', url: '#about' },
        { id: 'exp-2', label: 'Technical Skills', url: '#skills' },
        { id: 'exp-3', label: 'Work Experience', url: '#experience' },
        { id: 'exp-4', label: 'Featured Projects', url: '#projects' },
        { id: 'exp-5', label: 'Engineering Services', url: '#services' },
        { id: 'exp-6', label: 'Development Process', url: '#process' }
      ]);
      setCaseStudiesTitle('Case Studies');
      setCaseStudiesLinks([
        { id: 'cs-1', label: 'Livshem (E-Commerce)', url: 'project:livshem' },
        { id: 'cs-2', label: 'The Designs Firm', url: 'project:the-designs-firm' },
        { id: 'cs-3', label: 'College Library System', url: 'project:college-library-system' },
        { id: 'cs-4', label: 'Work Experience', url: '#experience' }
      ]);
      setConnectTitle('Connect');
      setShowGithub(true);
      setShowLinkedin(true);
      setShowTwitter(true);
      setShowEmail(true);
      setShowWhatsapp(true);
      setShowCvDownloadButton(true);
      setCvButtonText('Download Active CV');
      setCopyrightText('© 2026 Sameer Habib. All rights reserved.');
      setLocationTag('Pakistan');
      setShowAdminLink(true);
      setShowBackToTop(true);
      setBackToTopText('Back to Top');
      showToast('Footer values reset to defaults (click Save to persist)');
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header & Save Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#120d09] border border-[#c87a3e]/30 shadow-md">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#e59850] font-bold uppercase tracking-wider mb-1">
            <Layout className="w-3.5 h-3.5" />
            <span>Layout &amp; Navigation Controls</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            Footer Management Center
          </h2>
          <p className="text-xs text-[#d4a373] mt-0.5">
            Completely customize brand info, navigation links, case study shortcuts, social toggles, and bottom credits.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#1a130e] hover:bg-[#251b14] border border-[#c87a3e]/20 text-xs font-mono text-[#d4a373] hover:text-[#f3d5b5] transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white text-xs font-mono font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Footer</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Pill Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#c87a3e]/20 pb-3">
        {[
          { id: 'brand', label: '1. Brand & Bio' },
          { id: 'explore', label: '2. Explore Links' },
          { id: 'cases', label: '3. Case Studies' },
          { id: 'socials', label: '4. Social & Connect' },
          { id: 'bottom', label: '5. Bottom Bar & Legal' },
          { id: 'preview', label: '👁️ Live Preview' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id as typeof activeSection)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeSection === tab.id
                ? 'bg-[#c87a3e] text-white shadow-xs'
                : 'bg-[#18110b] text-[#d4a373] hover:text-[#f3d5b5] hover:bg-[#221812]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: BRAND & BIO */}
      {activeSection === 'brand' && (
        <div className="p-6 rounded-2xl bg-[#120d09] border border-[#c87a3e]/20 space-y-5">
          <h3 className="text-sm font-mono text-[#e59850] font-bold uppercase tracking-wider">
            Brand Column Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                Brand Title / Name
              </label>
              <input
                type="text"
                value={brandTitle}
                onChange={(e) => setBrandTitle(e.target.value)}
                placeholder="Sameer Habib"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                Tagline / Role Subtitle
              </label>
              <input
                type="text"
                value={brandTagline}
                onChange={(e) => setBrandTagline(e.target.value)}
                placeholder="Senior Full Stack Developer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
              Footer Bio / Description
            </label>
            <textarea
              rows={3}
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              placeholder="Engineering robust web applications, e-commerce architectures..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-sans leading-relaxed focus:border-[#e59850] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                Brand Badge Text
              </label>
              <input
                type="text"
                value={brandBadge}
                onChange={(e) => setBrandBadge(e.target.value)}
                placeholder="Code • Build • Scale"
                className="w-full px-3.5 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
              />
            </div>

            <div className="pt-4">
              <label className="flex items-center space-x-2 text-xs font-mono text-[#f3d5b5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAvailabilityBadge}
                  onChange={(e) => setShowAvailabilityBadge(e.target.checked)}
                  className="rounded border-[#c87a3e]/40 text-[#c87a3e] focus:ring-0 w-4 h-4 bg-[#090705]"
                />
                <span>Show Real-Time Availability Status Pill</span>
              </label>
              <span className="text-[11px] text-[#a88264] block mt-1 pl-6">
                Current availability: {siteSettings.availability}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: EXPLORE LINKS */}
      {activeSection === 'explore' && (
        <div className="p-6 rounded-2xl bg-[#120d09] border border-[#c87a3e]/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-mono text-[#e59850] font-bold uppercase tracking-wider">
                Explore Column Navigation Links
              </h3>
              <p className="text-xs text-[#a88264] mt-0.5">
                Manage the navigation shortcuts displayed in the second footer column.
              </p>
            </div>

            <label className="flex items-center space-x-2 text-xs font-mono text-[#f3d5b5] cursor-pointer self-start sm:self-auto bg-[#1a130e] px-3 py-1.5 rounded-xl border border-[#c87a3e]/20">
              <input
                type="checkbox"
                checked={showAiAssistantLink}
                onChange={(e) => setShowAiAssistantLink(e.target.checked)}
                className="rounded border-[#c87a3e]/40 text-[#c87a3e] focus:ring-0 w-4 h-4 bg-[#090705]"
              />
              <span>Include AI Assistant Center Link</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
              Column Title
            </label>
            <input
              type="text"
              value={exploreTitle}
              onChange={(e) => setExploreTitle(e.target.value)}
              placeholder="Explore"
              className="max-w-xs w-full px-3.5 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
            />
          </div>

          {/* Current Links List */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#a88264] block font-semibold">
              Active Links ({exploreLinks.length})
            </span>
            <div className="space-y-2">
              {exploreLinks.map((link, idx) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#18110b] border border-[#c87a3e]/20 text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[#e59850] font-bold">0{idx + 1}</span>
                    <div>
                      <span className="font-bold text-white block">{link.label}</span>
                      <span className="font-mono text-[11px] text-[#a88264]">{link.url}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExploreLink(link.id)}
                    className="p-1.5 rounded-lg bg-[#251912] hover:bg-rose-950 text-[#d4a373] hover:text-rose-400 border border-[#c87a3e]/20 transition-colors cursor-pointer"
                    title="Delete Link"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Link Card */}
          <div className="p-4 rounded-xl bg-[#18110b] border border-[#c87a3e]/25 space-y-3">
            <span className="text-xs font-mono text-[#f3d5b5] font-bold flex items-center space-x-1.5">
              <Plus className="w-3.5 h-3.5 text-[#e59850]" />
              <span>Add Navigation Link</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newExploreLabel}
                onChange={(e) => setNewExploreLabel(e.target.value)}
                placeholder="Link Label (e.g. Technical Skills)"
                className="w-full px-3 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs focus:border-[#e59850] focus:outline-none"
              />
              <input
                type="text"
                value={newExploreUrl}
                onChange={(e) => setNewExploreUrl(e.target.value)}
                placeholder="Anchor or URL (e.g. #skills or https://...)"
                className="w-full px-3 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleAddExploreLink}
              className="px-4 py-2 rounded-xl bg-[#281b13] hover:bg-[#34241a] border border-[#c87a3e]/30 text-xs font-mono font-bold text-[#f3d5b5] hover:text-white transition-all cursor-pointer"
            >
              + Add Link to Column
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: CASE STUDIES */}
      {activeSection === 'cases' && (
        <div className="p-6 rounded-2xl bg-[#120d09] border border-[#c87a3e]/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-mono text-[#e59850] font-bold uppercase tracking-wider">
                Case Studies Column Links
              </h3>
              <p className="text-xs text-[#a88264] mt-0.5">
                Links directly pointing to project modals or deep case studies.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSyncProjectsToCaseStudies}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1e1510] hover:bg-[#281b13] border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] transition-all cursor-pointer self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
              <span>Auto-Fill from Top Projects</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
              Column Title
            </label>
            <input
              type="text"
              value={caseStudiesTitle}
              onChange={(e) => setCaseStudiesTitle(e.target.value)}
              placeholder="Case Studies"
              className="max-w-xs w-full px-3.5 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
            />
          </div>

          {/* Current Case Links List */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#a88264] block font-semibold">
              Active Case Study Links ({caseStudiesLinks.length})
            </span>
            <div className="space-y-2">
              {caseStudiesLinks.map((link, idx) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#18110b] border border-[#c87a3e]/20 text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[#e59850] font-bold">0{idx + 1}</span>
                    <div>
                      <span className="font-bold text-white block">{link.label}</span>
                      <span className="font-mono text-[11px] text-[#a88264]">{link.url}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCaseLink(link.id)}
                    className="p-1.5 rounded-lg bg-[#251912] hover:bg-rose-950 text-[#d4a373] hover:text-rose-400 border border-[#c87a3e]/20 transition-colors cursor-pointer"
                    title="Delete Link"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Case Study Link Card */}
          <div className="p-4 rounded-xl bg-[#18110b] border border-[#c87a3e]/25 space-y-3">
            <span className="text-xs font-mono text-[#f3d5b5] font-bold flex items-center space-x-1.5">
              <Plus className="w-3.5 h-3.5 text-[#e59850]" />
              <span>Add Case Study Link</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newCaseLabel}
                onChange={(e) => setNewCaseLabel(e.target.value)}
                placeholder="Label (e.g. Livshem E-Commerce)"
                className="w-full px-3 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs focus:border-[#e59850] focus:outline-none"
              />
              <input
                type="text"
                value={newCaseUrl}
                onChange={(e) => setNewCaseUrl(e.target.value)}
                placeholder="Target (e.g. project:livshem or #experience)"
                className="w-full px-3 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-[#a88264]">
              Tip: Prefix with <code>project:&lt;slug&gt;</code> (e.g. <code>project:livshem</code>) to open the interactive case study modal directly.
            </p>
            <button
              type="button"
              onClick={handleAddCaseLink}
              className="px-4 py-2 rounded-xl bg-[#281b13] hover:bg-[#34241a] border border-[#c87a3e]/30 text-xs font-mono font-bold text-[#f3d5b5] hover:text-white transition-all cursor-pointer"
            >
              + Add Case Study Link
            </button>
          </div>
        </div>
      )}

      {/* SECTION 4: SOCIALS & CONNECT */}
      {activeSection === 'socials' && (
        <div className="p-6 rounded-2xl bg-[#120d09] border border-[#c87a3e]/20 space-y-6">
          <h3 className="text-sm font-mono text-[#e59850] font-bold uppercase tracking-wider">
            Connect Column &amp; Social Icon Toggles
          </h3>

          <div>
            <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
              Column Title
            </label>
            <input
              type="text"
              value={connectTitle}
              onChange={(e) => setConnectTitle(e.target.value)}
              placeholder="Connect"
              className="max-w-xs w-full px-3.5 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'GitHub Icon', checked: showGithub, setFn: setShowGithub, icon: Github, target: githubUrl },
              { label: 'LinkedIn Icon', checked: showLinkedin, setFn: setShowLinkedin, icon: Linkedin, target: linkedinUrl },
              { label: 'Twitter / X Icon', checked: showTwitter, setFn: setShowTwitter, icon: Twitter, target: twitterUrl },
              { label: 'Direct Email Icon', checked: showEmail, setFn: setShowEmail, icon: Mail, target: emailAddress },
              { label: 'WhatsApp Icon', checked: showWhatsapp, setFn: setShowWhatsapp, icon: MessageCircle, target: whatsappUrl }
            ].map((soc, idx) => {
              const SocIcon = soc.icon;
              return (
                <label
                  key={idx}
                  className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#18110b] border border-[#c87a3e]/20 cursor-pointer hover:border-[#c87a3e]/40 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={soc.checked}
                    onChange={(e) => soc.setFn(e.target.checked)}
                    className="rounded border-[#c87a3e]/40 text-[#c87a3e] focus:ring-0 w-4 h-4 bg-[#090705]"
                  />
                  <div className="flex items-center space-x-2">
                    <SocIcon className="w-4 h-4 text-[#e59850]" />
                    <div>
                      <span className="text-xs font-bold text-white block">{soc.label}</span>
                      <span className="text-[10px] text-[#a88264] truncate max-w-[140px] block font-mono">
                        {soc.target || 'Not configured'}
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Direct URL Inputs */}
          <div className="space-y-4 pt-4 border-t border-[#c87a3e]/15">
            <span className="text-xs font-mono text-[#f3d5b5] font-bold block uppercase tracking-wider">
              Change Social Media &amp; Contact URLs
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2 text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                  <Github className="w-3.5 h-3.5 text-[#e59850]" />
                  <span>GitHub Profile Link</span>
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/sameerhabib72"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                  <Linkedin className="w-3.5 h-3.5 text-[#e59850]" />
                  <span>LinkedIn Profile Link</span>
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/sameer-habib"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                  <Twitter className="w-3.5 h-3.5 text-[#e59850]" />
                  <span>Twitter / X Profile Link</span>
                </label>
                <input
                  type="url"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                  placeholder="https://x.com/sameerhabib"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Direct Link</span>
                </label>
                <input
                  type="url"
                  value={whatsappUrl}
                  onChange={(e) => setWhatsappUrl(e.target.value)}
                  placeholder="https://wa.me/923112802870"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                  <Mail className="w-3.5 h-3.5 text-[#e59850]" />
                  <span>Primary Email Address</span>
                </label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="sameerhabib72@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* CV Download Button Settings */}
          <div className="p-4 rounded-xl bg-[#18110b] border border-[#c87a3e]/25 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-xs font-mono text-[#f3d5b5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCvDownloadButton}
                  onChange={(e) => setShowCvDownloadButton(e.target.checked)}
                  className="rounded border-[#c87a3e]/40 text-[#c87a3e] focus:ring-0 w-4 h-4 bg-[#090705]"
                />
                <span>Display "Download Active CV" Button</span>
              </label>
              <FileDown className="w-4 h-4 text-[#e59850]" />
            </div>

            {showCvDownloadButton && (
              <div>
                <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                  CV Button Display Text
                </label>
                <input
                  type="text"
                  value={cvButtonText}
                  onChange={(e) => setCvButtonText(e.target.value)}
                  placeholder="Download Active CV"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 5: BOTTOM BAR & LEGAL */}
      {activeSection === 'bottom' && (
        <div className="p-6 rounded-2xl bg-[#120d09] border border-[#c87a3e]/20 space-y-5">
          <h3 className="text-sm font-mono text-[#e59850] font-bold uppercase tracking-wider">
            Bottom Bar, Copyright &amp; Action Toggles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                Copyright Notice Text
              </label>
              <input
                type="text"
                value={copyrightText}
                onChange={(e) => setCopyrightText(e.target.value)}
                placeholder="© 2026 Sameer Habib. All rights reserved."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#d4a373] mb-1 font-semibold">
                Location Tag
              </label>
              <input
                type="text"
                value={locationTag}
                onChange={(e) => setLocationTag(e.target.value)}
                placeholder="Pakistan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center space-x-2 text-xs font-mono text-[#f3d5b5] cursor-pointer p-3.5 rounded-xl bg-[#18110b] border border-[#c87a3e]/20">
              <input
                type="checkbox"
                checked={showAdminLink}
                onChange={(e) => setShowAdminLink(e.target.checked)}
                className="rounded border-[#c87a3e]/40 text-[#c87a3e] focus:ring-0 w-4 h-4 bg-[#090705]"
              />
              <div className="flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-[#e59850]" />
                <span>Show "Admin CMS" Login Link in Footer</span>
              </div>
            </label>

            <div className="p-3.5 rounded-xl bg-[#18110b] border border-[#c87a3e]/20 space-y-2">
              <label className="flex items-center space-x-2 text-xs font-mono text-[#f3d5b5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBackToTop}
                  onChange={(e) => setShowBackToTop(e.target.checked)}
                  className="rounded border-[#c87a3e]/40 text-[#c87a3e] focus:ring-0 w-4 h-4 bg-[#090705]"
                />
                <div className="flex items-center space-x-1.5">
                  <ArrowUp className="w-3.5 h-3.5 text-[#e59850]" />
                  <span>Show "Back to Top" Scroll Button</span>
                </div>
              </label>

              {showBackToTop && (
                <input
                  type="text"
                  value={backToTopText}
                  onChange={(e) => setBackToTopText(e.target.value)}
                  placeholder="Back to Top"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#090705] border border-[#c87a3e]/20 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: LIVE PREVIEW */}
      {activeSection === 'preview' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#d4a373]">
            <span className="font-bold uppercase text-[#e59850]">Live Rendered Footer Output</span>
            <span>Real-time reflection of your configuration</span>
          </div>

          <div className="rounded-2xl border border-[#c87a3e]/30 bg-[#080706] p-6 sm:p-8 text-left shadow-2xl overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-[#c87a3e]/15">
              {/* Brand Preview */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#281b13] border border-[#c87a3e]/40 flex items-center justify-center text-xs font-bold text-[#f3d5b5]">
                    SH
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{brandTitle}</h4>
                    <p className="text-xs font-mono text-[#e59850]">{brandTagline}</p>
                  </div>
                </div>
                <p className="text-xs text-[#e7bc91] leading-relaxed max-w-sm">
                  {brandDescription}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {brandBadge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1e1510] border border-[#c87a3e]/30 text-[10px] font-mono text-[#f3d5b5]">
                      {brandBadge}
                    </span>
                  )}
                  {showAvailabilityBadge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[10px] font-mono text-emerald-300">
                      ● {siteSettings.availability}
                    </span>
                  )}
                </div>
              </div>

              {/* Explore Links Preview */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-widest text-[#f3d5b5] font-semibold">
                  {exploreTitle}
                </h5>
                <ul className="space-y-1.5 text-xs text-[#d4a373]">
                  {showAiAssistantLink && (
                    <li className="text-[#f3d5b5] font-semibold flex items-center space-x-1">
                      <span className="text-[#e59850]">⚡</span>
                      <span>AI Assistant Center</span>
                    </li>
                  )}
                  {exploreLinks.map((link) => (
                    <li key={link.id} className="hover:text-white">
                      {link.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Case Studies Preview */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-widest text-[#f3d5b5] font-semibold">
                  {caseStudiesTitle}
                </h5>
                <ul className="space-y-1.5 text-xs text-[#d4a373]">
                  {caseStudiesLinks.map((link) => (
                    <li key={link.id} className="hover:text-white">
                      {link.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect Preview */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-widest text-[#f3d5b5] font-semibold">
                  {connectTitle}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {showGithub && <span className="p-2 rounded-full bg-[#15110d] border border-[#c87a3e]/20 text-[#e59850]"><Github className="w-3.5 h-3.5" /></span>}
                  {showLinkedin && <span className="p-2 rounded-full bg-[#15110d] border border-[#c87a3e]/20 text-[#e59850]"><Linkedin className="w-3.5 h-3.5" /></span>}
                  {showTwitter && <span className="p-2 rounded-full bg-[#15110d] border border-[#c87a3e]/20 text-[#e59850]"><Twitter className="w-3.5 h-3.5" /></span>}
                  {showEmail && <span className="p-2 rounded-full bg-[#15110d] border border-[#c87a3e]/20 text-[#e59850]"><Mail className="w-3.5 h-3.5" /></span>}
                  {showWhatsapp && <span className="p-2 rounded-full bg-[#15110d] border border-[#c87a3e]/20 text-emerald-400"><MessageCircle className="w-3.5 h-3.5" /></span>}
                </div>
                {showCvDownloadButton && (
                  <div className="pt-1">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#15110d] border border-[#c87a3e]/30 text-[11px] text-[#f3d5b5]">
                      <FileDown className="w-3 h-3 text-[#e59850]" />
                      <span>{cvButtonText}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Bar Preview */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#d4a373] font-mono">
              <div>
                {copyrightText} {locationTag && `• ${locationTag}`}
              </div>
              <div className="flex items-center space-x-3">
                {showAdminLink && (
                  <span className="flex items-center space-x-1 text-[#d4a373]">
                    <Lock className="w-3 h-3" />
                    <span>Admin CMS</span>
                  </span>
                )}
                {showAdminLink && showBackToTop && <span>•</span>}
                {showBackToTop && (
                  <span className="flex items-center space-x-1 text-[#f3d5b5]">
                    <span>{backToTopText}</span>
                    <ArrowUp className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
