import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Sparkles,
  Save,
  Plus,
  Trash2,
  Terminal,
  Eye,
  ArrowRight,
  Layers,
  RotateCcw,
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { HeroSectionData } from '../../types';

export const AdminHeroSectionManager: React.FC = () => {
  const { heroData, updateHeroData, siteSettings, updateSiteSettings, showToast } = useData();

  // Local state for heroData fields
  const [badge, setBadge] = useState(heroData.badge || '00 // SAMEER HABIB — SENIOR FULL STACK ARCHITECT');
  const [heading, setHeading] = useState(heroData.heading || 'Architecting Scalable Web Systems With Craftsmanship.');
  const [subtitle, setSubtitle] = useState(heroData.subtitle || 'Senior Full Stack Engineer (Laravel, React & Cloud)');
  const [description, setDescription] = useState(
    heroData.description ||
      'Building modern, scalable web applications with thoughtful UX, clean architecture and reliable engineering. Proven track record across government certification portals, commercial e-commerce platforms, and banking-grade CMS solutions.'
  );
  const [primaryCtaText, setPrimaryCtaText] = useState(heroData.primaryCtaText || 'View Selected Work');
  const [secondaryCtaText, setSecondaryCtaText] = useState(heroData.secondaryCtaText || "Let's Work Together");
  const [roles, setRoles] = useState<string[]>(
    heroData.rotatingRoles || [
      'Senior Full Stack Developer',
      'Laravel & PHP Specialist',
      'React & Next.js Engineer',
      'E-Commerce & Systems Architect'
    ]
  );
  const [newRoleInput, setNewRoleInput] = useState('');
  const [availability, setAvailability] = useState(siteSettings.availability || 'Available for Opportunities');

  // Terminal Lines
  const [terminalLines, setTerminalLines] = useState<
    { text: string; status?: 'success' | 'info' | 'warn' }[]
  >(
    heroData.terminalLines || [
      { text: '$ php artisan about --env=production', status: 'info' },
      { text: '✓ Laravel Framework 11.x (PHP 8.3 / Octane)', status: 'success' },
      { text: '✓ Microservices & RESTful API Gateway active', status: 'success' },
      { text: '✓ Redis Query Caching: 45% latency reduction', status: 'warn' }
    ]
  );
  const [newTermText, setNewTermText] = useState('');
  const [newTermStatus, setNewTermStatus] = useState<'success' | 'info' | 'warn'>('success');

  const handleAddRole = () => {
    if (!newRoleInput.trim()) return;
    if (roles.includes(newRoleInput.trim())) {
      showToast('This role already exists', 'error');
      return;
    }
    setRoles([...roles, newRoleInput.trim()]);
    setNewRoleInput('');
  };

  const handleRemoveRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleAddTerminalLine = () => {
    if (!newTermText.trim()) return;
    setTerminalLines([...terminalLines, { text: newTermText.trim(), status: newTermStatus }]);
    setNewTermText('');
  };

  const handleRemoveTerminalLine = (index: number) => {
    setTerminalLines(terminalLines.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heading.trim()) {
      showToast('Heading cannot be empty', 'error');
      return;
    }

    const updatedData: Partial<HeroSectionData> = {
      badge: badge.trim(),
      heading: heading.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      primaryCtaText: primaryCtaText.trim(),
      secondaryCtaText: secondaryCtaText.trim(),
      rotatingRoles: roles,
      terminalLines
    };

    updateHeroData(updatedData);
    updateSiteSettings({ availability });
    showToast('Hero section data saved successfully!', 'success');
  };

  const handleResetDefaults = () => {
    setBadge('00 // SAMEER HABIB — SENIOR FULL STACK ARCHITECT');
    setHeading('Architecting Scalable Web Systems With Craftsmanship.');
    setSubtitle('Senior Full Stack Engineer (Laravel, React & Cloud)');
    setDescription(
      'Building modern, scalable web applications with thoughtful UX, clean architecture and reliable engineering. Proven track record across government certification portals, commercial e-commerce platforms, and banking-grade CMS solutions.'
    );
    setPrimaryCtaText('View Selected Work');
    setSecondaryCtaText("Let's Work Together");
    setRoles([
      'Senior Full Stack Developer',
      'Laravel & PHP Specialist',
      'React & Next.js Engineer',
      'E-Commerce & Systems Architect'
    ]);
    showToast('Reset to recommended defaults. Click "Save Changes" to apply.', 'info');
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#c87a3e]/20">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>00 // HERO BANNER &amp; FIRST IMPRESSION</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Hero Section Content Manager</h2>
          <p className="text-xs text-[#d4a373] mt-1">
            Customize the primary headline, rotating specialties, call-to-actions, and terminal highlights shown to every visitor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-[#1e1510] hover:bg-[#281b14] border border-[#c87a3e]/25 text-xs text-[#d4a373] hover:text-[#f3d5b5] transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Editable Properties */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* Badge & Availability */}
          <div className="p-5 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <span className="text-[#e59850]">01.</span>
              <span>Top Badge &amp; Availability Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1.5">
                  Overline Section Badge
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="00 // SAMEER HABIB — SENIOR FULL STACK"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1.5">
                  Availability Pill Text
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white focus:outline-none focus:border-[#c87a3e]"
                >
                  <option value="Available for Opportunities">Available for Opportunities</option>
                  <option value="Open for Consulting">Open for Consulting</option>
                  <option value="Booked (Select Projects Only)">Booked (Select Projects Only)</option>
                  <option value="Actively Interviewing">Actively Interviewing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="p-5 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <span className="text-[#e59850]">02.</span>
              <span>Main Headline &amp; Bio Paragraph</span>
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1.5">
                Primary Hero Headline *
              </label>
              <input
                type="text"
                required
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Architecting Scalable Web Systems With Craftsmanship."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-sm text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1.5">
                Sub-title / Role Line
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Senior Full Stack Engineer (Laravel, React & Cloud)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1.5">
                Lead Description Paragraph
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your architectural background, core stack strengths, and enterprise experience..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e] resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Rotating Roles Tag List */}
          <div className="p-5 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <span className="text-[#e59850]">03.</span>
              <span>Dynamic Rotating Role Specializations</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {roles.map((role, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#201813] border border-[#c87a3e]/30 text-xs text-[#f3d5b5]"
                >
                  <span>{role}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(idx)}
                    className="text-[#a88264] hover:text-red-400 p-0.5 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newRoleInput}
                onChange={(e) => setNewRoleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddRole();
                  }
                }}
                placeholder="Add specialty e.g. API Microservices Architect"
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
              />
              <button
                type="button"
                onClick={handleAddRole}
                className="px-3.5 py-2 rounded-xl bg-[#281b13] hover:bg-[#342318] border border-[#c87a3e]/40 text-xs font-semibold text-[#f3d5b5] flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Role</span>
              </button>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="p-5 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <span className="text-[#e59850]">04.</span>
              <span>Action Buttons &amp; CTAs</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1.5">
                  Primary Button Text (Links to #projects)
                </label>
                <input
                  type="text"
                  value={primaryCtaText}
                  onChange={(e) => setPrimaryCtaText(e.target.value)}
                  placeholder="View Selected Work"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1.5">
                  Secondary Button Text (Links to #contact)
                </label>
                <input
                  type="text"
                  value={secondaryCtaText}
                  onChange={(e) => setSecondaryCtaText(e.target.value)}
                  placeholder="Let's Work Together"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
                />
              </div>
            </div>
          </div>

          {/* Terminal Highlights */}
          <div className="p-5 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <span className="text-[#e59850]">05.</span>
              <span>Interactive Code Window Terminal Lines</span>
            </h3>

            <div className="space-y-2">
              {terminalLines.map((line, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/15 text-xs font-mono"
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        line.status === 'success'
                          ? 'bg-emerald-400'
                          : line.status === 'warn'
                          ? 'bg-amber-400'
                          : 'bg-cyan-400'
                      }`}
                    />
                    <span className="text-[#e7bc91]">{line.text}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTerminalLine(idx)}
                    className="text-[#a88264] hover:text-red-400 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <select
                value={newTermStatus}
                onChange={(e) => setNewTermStatus(e.target.value as any)}
                className="px-2.5 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white focus:outline-none"
              >
                <option value="success">Success (Green)</option>
                <option value="warn">Warn (Amber)</option>
                <option value="info">Info (Cyan)</option>
              </select>
              <input
                type="text"
                value={newTermText}
                onChange={(e) => setNewTermText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTerminalLine();
                  }
                }}
                placeholder="✓ Enterprise PostgreSQL & Redis configured"
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
              />
              <button
                type="button"
                onClick={handleAddTerminalLine}
                className="px-3.5 py-2 rounded-xl bg-[#281b13] hover:bg-[#342318] border border-[#c87a3e]/40 text-xs font-semibold text-[#f3d5b5] flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:brightness-110 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Hero Configuration</span>
          </button>
        </form>

        {/* Right Column: Live Responsive Preview Card */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#d4a373] font-semibold flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5 text-[#e59850]" />
              <span>Real-Time Public Preview</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Mockup
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-[#0e0b08] border border-[#c87a3e]/30 shadow-2xl relative overflow-hidden space-y-4">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c87a3e]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Overline Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[10px] font-mono text-[#f3d5b5]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{availability}</span>
            </div>

            {/* Overline Numbered Badge */}
            <p className="text-[11px] font-mono text-[#e59850] font-semibold tracking-wide">
              {badge}
            </p>

            {/* Heading */}
            <h1 className="text-2xl font-display font-extrabold text-white leading-tight">
              {heading}
            </h1>

            {/* Rotating Roles Preview */}
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-[#a88264]">Specialty:</span>
              <span className="font-bold text-[#f3d5b5] bg-[#281b13] px-2.5 py-0.5 rounded-md border border-[#c87a3e]/30">
                {roles[0] || 'Full Stack Engineer'}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#e7bc91] leading-relaxed line-clamp-4">
              {description}
            </p>

            {/* CTAs Preview */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3.5 py-2 rounded-full bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white font-bold text-[11px] flex items-center space-x-1.5 shadow-sm">
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <div className="px-3.5 py-2 rounded-full bg-[#18110b] border border-[#c87a3e]/30 text-[#f3d5b5] text-[11px]">
                {secondaryCtaText}
              </div>
            </div>

            {/* Terminal Preview */}
            <div className="pt-3 border-t border-[#c87a3e]/15">
              <div className="p-3 rounded-xl bg-[#060504] border border-[#c87a3e]/20 text-[10px] font-mono space-y-1">
                <div className="flex items-center space-x-1 text-[#8d6e52] mb-1.5">
                  <Terminal className="w-3 h-3 text-[#e59850]" />
                  <span>terminal preview</span>
                </div>
                {terminalLines.slice(0, 3).map((tl, i) => (
                  <p
                    key={i}
                    className={`truncate ${
                      tl.status === 'success'
                        ? 'text-emerald-400'
                        : tl.status === 'warn'
                        ? 'text-amber-400'
                        : 'text-cyan-300'
                    }`}
                  >
                    {tl.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
