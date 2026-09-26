import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Sparkles,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Code2,
  Eye,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { AboutSectionData } from '../../types';

export const AdminAboutSectionManager: React.FC = () => {
  const { aboutData, updateAboutData, showToast } = useData();

  // Local state for all About properties
  const [heading, setHeading] = useState(
    aboutData.heading || 'Engineering Clean, Scalable Digital Architectures'
  );
  const [subheading, setSubheading] = useState(
    aboutData.subheading ||
      'Senior Full-Stack Engineer with 3+ years of experience delivering 20+ enterprise solutions for government and financial sectors.'
  );
  const [paragraphs, setParagraphs] = useState<string[]>(
    aboutData.paragraphs || [
      'My engineering philosophy centers on clean architecture, high database throughput, and resilient API contracts. Having architected mission-critical platforms such as the Sindh Board of Technical Education (SBTE) registration and examination engine, I prioritize maintainability and zero-downtime scalability.',
      'Specialized in the modern PHP/Laravel ecosystem (Octane, Reverb, Sanctum, Horizon) coupled with reactive React/Next.js client experiences. Experienced in query execution plan optimization, indexing strategies, and caching tiers that yield quantifiable 45% database latency improvements.'
    ]
  );
  const [newParagraph, setNewParagraph] = useState('');

  const [highlightPoints, setHighlightPoints] = useState<string[]>(
    aboutData.highlightPoints || [
      'Enterprise Government & Financial System Architecture (SBTE, Askari)',
      'Database Optimization & Redis Cache Layering (up to 45% performance gains)',
      'Secure Authentication, RBAC & Tokenized Multi-Tenant Security Models',
      'Modern Frontend Interactivity with React, Next.js, and TypeScript'
    ]
  );
  const [newHighlight, setNewHighlight] = useState('');

  const [codePhilosophy, setCodePhilosophy] = useState(
    aboutData.codePhilosophy ||
      'Architecture is not about creating the most complex system; it is about building the simplest solution that reliably scales under immense production load.'
  );

  const [experienceYears, setExperienceYears] = useState(aboutData.experienceYears || 3);
  const [completedProjects, setCompletedProjects] = useState(aboutData.completedProjects || 20);
  const [satisfiedClients, setSatisfiedClients] = useState(aboutData.satisfiedClients || 15);
  const [location, setLocation] = useState(aboutData.location || 'Karachi, Pakistan (Remote Worldwide)');

  // Handlers for Paragraphs
  const handleAddParagraph = () => {
    if (!newParagraph.trim()) return;
    setParagraphs([...paragraphs, newParagraph.trim()]);
    setNewParagraph('');
  };

  const handleUpdateParagraph = (index: number, val: string) => {
    const updated = [...paragraphs];
    updated[index] = val;
    setParagraphs(updated);
  };

  const handleRemoveParagraph = (index: number) => {
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  // Handlers for Competencies
  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setHighlightPoints([...highlightPoints, newHighlight.trim()]);
    setNewHighlight('');
  };

  const handleUpdateHighlight = (index: number, val: string) => {
    const updated = [...highlightPoints];
    updated[index] = val;
    setHighlightPoints(updated);
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlightPoints(highlightPoints.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heading.trim()) {
      showToast('Heading cannot be empty', 'error');
      return;
    }

    const updated: Partial<AboutSectionData> = {
      heading: heading.trim(),
      subheading: subheading.trim(),
      paragraphs,
      highlightPoints,
      codePhilosophy: codePhilosophy.trim(),
      experienceYears: Number(experienceYears),
      completedProjects: Number(completedProjects),
      satisfiedClients: Number(satisfiedClients),
      location: location.trim()
    };

    updateAboutData(updated);
    showToast('About section updated and synced!', 'success');
  };

  const handleResetDefaults = () => {
    setHeading('Engineering Clean, Scalable Digital Architectures');
    setSubheading(
      'Senior Full-Stack Engineer with 3+ years of experience delivering 20+ enterprise solutions for government and financial sectors.'
    );
    setParagraphs([
      'My engineering philosophy centers on clean architecture, high database throughput, and resilient API contracts. Having architected mission-critical platforms such as the Sindh Board of Technical Education (SBTE) registration and examination engine, I prioritize maintainability and zero-downtime scalability.',
      'Specialized in the modern PHP/Laravel ecosystem (Octane, Reverb, Sanctum, Horizon) coupled with reactive React/Next.js client experiences. Experienced in query execution plan optimization, indexing strategies, and caching tiers that yield quantifiable 45% database latency improvements.'
    ]);
    setHighlightPoints([
      'Enterprise Government & Financial System Architecture (SBTE, Askari)',
      'Database Optimization & Redis Cache Layering (up to 45% performance gains)',
      'Secure Authentication, RBAC & Tokenized Multi-Tenant Security Models',
      'Modern Frontend Interactivity with React, Next.js, and TypeScript'
    ]);
    setCodePhilosophy(
      'Architecture is not about creating the most complex system; it is about building the simplest solution that reliably scales under immense production load.'
    );
    showToast('Reset to baseline About narrative', 'info');
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#c87a3e]/20">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>07 // ABOUT NARRATIVE &amp; PHILOSOPHY</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white">About Section Content Manager</h2>
          <p className="text-xs text-[#d4a373] mt-1">
            Manage your professional bio, engineering philosophy, competencies checklist, and career milestones.
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
        {/* Left: Editable Properties */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* Section Titles */}
          <div className="p-5 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <span className="text-[#e59850]">01.</span>
              <span>Headings &amp; Summary</span>
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1.5">
                Section Headline *
              </label>
              <input
                type="text"
                required
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Engineering Clean, Scalable Digital Architectures"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-sm text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1.5">
                Subheading / Mission Summary
              </label>
              <textarea
                rows={2}
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                placeholder="Senior Full-Stack Engineer with 3+ years of experience delivering 20+ enterprise solutions..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#a88264] mb-1">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#a88264] mb-1">
                  Completed Projects
                </label>
                <input
                  type="number"
                  value={completedProjects}
                  onChange={(e) => setCompletedProjects(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#a88264] mb-1">
                  Satisfied Clients
                </label>
                <input
                  type="number"
                  value={satisfiedClients}
                  onChange={(e) => setSatisfiedClients(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Narrative Paragraphs */}
          <div className="p-5 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <span className="text-[#e59850]">02.</span>
              <span>Narrative Story Paragraphs ({paragraphs.length})</span>
            </h3>

            <div className="space-y-3">
              {paragraphs.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#a88264]">Paragraph #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(idx)}
                      className="text-[#a88264] hover:text-red-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => handleUpdateParagraph(idx, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#140f0b] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e] resize-none leading-relaxed"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <textarea
                rows={2}
                value={newParagraph}
                onChange={(e) => setNewParagraph(e.target.value)}
                placeholder="Write an additional story paragraph e.g. about distributed systems or frontend performance..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e] resize-none"
              />
              <button
                type="button"
                onClick={handleAddParagraph}
                className="px-4 py-2 rounded-xl bg-[#281b13] hover:bg-[#342318] border border-[#c87a3e]/30 text-xs font-semibold text-[#f3d5b5] flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Paragraph</span>
              </button>
            </div>
          </div>

          {/* Key Competencies Checklist */}
          <div className="p-5 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <span className="text-[#e59850]">03.</span>
              <span>Key Engineering Competencies Checklist ({highlightPoints.length})</span>
            </h3>

            <div className="space-y-2">
              {highlightPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 p-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#e59850] shrink-0" />
                  <input
                    type="text"
                    value={pt}
                    onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                    className="flex-1 px-2.5 py-1 bg-transparent border-b border-transparent focus:border-[#c87a3e] text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="text-[#a88264] hover:text-red-400 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                placeholder="Add bullet e.g. High Concurrency WebSockets with Laravel Reverb"
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-3.5 py-2 rounded-xl bg-[#281b13] hover:bg-[#342318] border border-[#c87a3e]/30 text-xs font-semibold text-[#f3d5b5] flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Bullet</span>
              </button>
            </div>
          </div>

          {/* Philosophy Quote */}
          <div className="p-5 rounded-2xl bg-[#15110d]/90 border border-[#c87a3e]/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
              <span className="text-[#e59850]">04.</span>
              <span>Engineering Philosophy Quote</span>
            </h3>

            <textarea
              rows={3}
              value={codePhilosophy}
              onChange={(e) => setCodePhilosophy(e.target.value)}
              placeholder="Architecture is not about creating the most complex system..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/20 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e] resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:brightness-110 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save About Section Configuration</span>
          </button>
        </form>

        {/* Right: Real-time Live Preview */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#d4a373] font-semibold flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5 text-[#e59850]" />
              <span>About Section Preview</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Mockup
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-[#0e0b08] border border-[#c87a3e]/30 shadow-2xl relative overflow-hidden space-y-4">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c87a3e]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#15110d] border border-[#c87a3e]/25 text-[10px] font-mono text-[#f3d5b5]">
              <Sparkles className="w-3 h-3 text-[#e59850]" />
              <span>07 // ABOUT NARRATIVE</span>
            </div>

            <h2 className="text-xl font-display font-extrabold text-white leading-tight">
              {heading}
            </h2>

            <p className="text-xs text-[#e7bc91] leading-relaxed">
              {subheading}
            </p>

            {/* Narrative snippet */}
            <div className="p-3.5 rounded-2xl bg-[#140f0b] border border-[#c87a3e]/15 text-xs text-[#e7bc91] leading-relaxed">
              <p className="line-clamp-3">{paragraphs[0] || 'Narrative paragraph preview...'}</p>
            </div>

            {/* Competency bullets preview */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-mono uppercase text-[#e59850] font-bold">Key Competencies:</p>
              {highlightPoints.slice(0, 3).map((pt, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-[#f3d5b5]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e59850] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{pt}</span>
                </div>
              ))}
            </div>

            {/* Philosophy quote preview */}
            <div className="p-3.5 rounded-2xl bg-[#15110d] border border-[#c87a3e]/30">
              <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#e59850] mb-1 font-bold">
                <Code2 className="w-3.5 h-3.5" />
                <span>ENGINEERING PHILOSOPHY</span>
              </div>
              <p className="text-xs text-[#f3d5b5] italic">&ldquo;{codePhilosophy}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
