import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ExperienceItem } from '../../types';
import {
  Briefcase,
  Plus,
  Trash2,
  Edit,
  Search,
  Calendar,
  MapPin,
  CheckCircle2,
  X,
  ChevronUp,
  ChevronDown,
  Tag,
  Building,
  ListPlus,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const COMMON_TECH_SUGGESTIONS = [
  'Laravel',
  'PHP 8.2',
  'React.js',
  'Next.js',
  'MySQL 8',
  'Redis',
  'REST APIs',
  'Docker',
  'Tailwind CSS',
  'TypeScript',
  'PostgreSQL',
  'GraphQL',
  'Git & CI/CD',
  'Sanctum & JWT'
];

export const AdminExperienceManager: React.FC = () => {
  const { experiences, saveExperience, deleteExperience, showToast } = useData();
  const [editingItem, setEditingItem] = useState<Partial<ExperienceItem> | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [customTech, setCustomTech] = useState('');

  // Sorted by order
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  // Filtered
  const filtered = sortedExperiences.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.position.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === 'all' || item.employmentType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleOpenNew = () => {
    setEditingItem({
      id: 'exp-' + Date.now(),
      company: '',
      position: '',
      startDate: 'Jan 2023',
      endDate: 'Present',
      current: true,
      location: 'Karachi, Pakistan',
      employmentType: 'Full-time',
      description: '',
      responsibilities: [
        'Architected and implemented production backend APIs and relational database schemas.',
        'Optimized query performance and reduced server response times.'
      ],
      technologies: ['Laravel', 'PHP 8.2', 'MySQL 8', 'React.js', 'REST APIs'],
      order: experiences.length + 1,
      published: true
    });
    setNewResponsibility('');
    setCustomTech('');
  };

  const handleOpenEdit = (item: ExperienceItem) => {
    setEditingItem({
      ...item,
      responsibilities: [...item.responsibilities],
      technologies: [...item.technologies]
    });
    setNewResponsibility('');
    setCustomTech('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.company?.trim() || !editingItem?.position?.trim()) {
      showToast('Company and Position are required fields.', 'error');
      return;
    }

    const itemToSave: ExperienceItem = {
      id: editingItem.id || 'exp-' + Date.now(),
      company: editingItem.company.trim(),
      position: editingItem.position.trim(),
      startDate: editingItem.startDate?.trim() || '2023',
      endDate: editingItem.current ? 'Present' : editingItem.endDate?.trim() || 'Present',
      current: !!editingItem.current,
      location: editingItem.location?.trim() || 'Karachi, Pakistan',
      employmentType: (editingItem.employmentType as ExperienceItem['employmentType']) || 'Full-time',
      description: editingItem.description?.trim() || '',
      responsibilities: editingItem.responsibilities && editingItem.responsibilities.length > 0
        ? editingItem.responsibilities
        : ['Led engineering development and architecture.'],
      technologies: editingItem.technologies || ['Laravel', 'React.js'],
      order: editingItem.order ?? experiences.length + 1,
      published: editingItem.published ?? true
    };

    saveExperience(itemToSave);
    setEditingItem(null);
  };

  const handleMoveOrder = (item: ExperienceItem, direction: 'up' | 'down') => {
    const currentIndex = sortedExperiences.findIndex((e) => e.id === item.id);
    if (currentIndex < 0) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sortedExperiences.length) return;

    const otherItem = sortedExperiences[targetIndex];
    const tempOrder = item.order;
    saveExperience({ ...item, order: otherItem.order });
    saveExperience({ ...otherItem, order: tempOrder });
    showToast(`Reordered ${item.company}`, 'info');
  };

  const handleAddResponsibility = () => {
    if (!newResponsibility.trim() || !editingItem) return;
    setEditingItem({
      ...editingItem,
      responsibilities: [...(editingItem.responsibilities || []), newResponsibility.trim()]
    });
    setNewResponsibility('');
  };

  const handleRemoveResponsibility = (idx: number) => {
    if (!editingItem?.responsibilities) return;
    setEditingItem({
      ...editingItem,
      responsibilities: editingItem.responsibilities.filter((_, i) => i !== idx)
    });
  };

  const handleToggleTech = (techName: string) => {
    if (!editingItem) return;
    const list = editingItem.technologies || [];
    if (list.includes(techName)) {
      setEditingItem({
        ...editingItem,
        technologies: list.filter((t) => t !== techName)
      });
    } else {
      setEditingItem({
        ...editingItem,
        technologies: [...list, techName]
      });
    }
  };

  const handleAddCustomTech = () => {
    if (!customTech.trim() || !editingItem) return;
    const trimmed = customTech.trim();
    const list = editingItem.technologies || [];
    if (!list.includes(trimmed)) {
      setEditingItem({
        ...editingItem,
        technologies: [...list, trimmed]
      });
    }
    setCustomTech('');
  };

  // Quick stats
  const totalRoles = experiences.length;
  const activeRoles = experiences.filter((e) => e.current).length;
  const publishedRoles = experiences.filter((e) => e.published).length;

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Work Experience & Career Progression</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage professional roles, enterprise positions, responsibilities, and verified production tech stacks.
          </p>
        </div>

        <button
          id="btn-add-experience"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Work Experience</span>
        </button>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-[#080c15] border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Positions</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">{totalRoles}</div>
          </div>
          <Building className="w-6 h-6 text-cyan-400/60" />
        </div>

        <div className="p-4 rounded-xl bg-[#080c15] border border-emerald-500/20 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">Active / Current Roles</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">{activeRoles}</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="p-4 rounded-xl bg-[#080c15] border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Published on Portfolio</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">{publishedRoles} / {totalRoles}</div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-400/60" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="input-experience-search"
            type="text"
            placeholder="Search by company, title, location, or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090d16] border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            id="select-experience-type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#090d16] border border-white/10 text-xs text-slate-300 focus:outline-hidden focus:border-cyan-500/50"
          >
            <option value="all">All Employment Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Project-based">Project-based</option>
          </select>
        </div>
      </div>

      {/* Experience Records List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#080c15] border border-white/10">
          <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-300 font-semibold">No work experiences found</p>
          <p className="text-xs text-slate-500 mt-1">Adjust search filter or click &quot;Add Work Experience&quot; above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              id={`exp-card-${item.id}`}
              className={`p-6 rounded-2xl bg-[#080c15] border transition-all duration-200 ${
                item.published ? 'border-white/10 hover:border-white/20' : 'border-dashed border-white/10 opacity-75'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">{item.position}</h3>
                    <span className="text-cyan-400 font-semibold text-sm">@ {item.company}</span>
                    {item.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                        Current Role
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-300 text-[10px] font-mono">
                      {item.employmentType}
                    </span>
                    {!item.published && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono">
                        Draft / Hidden
                      </span>
                    )}
                  </div>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.startDate} — {item.current ? 'Present' : item.endDate}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  {/* Role summary */}
                  {item.description && (
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{item.description}</p>
                  )}

                  {/* Responsibilities */}
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                        Key Responsibilities & Deliverables
                      </div>
                      <ul className="space-y-1">
                        {item.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2 text-xs text-slate-200">
                            <span className="text-cyan-400 font-bold mt-0.5">›</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies tags */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/10 text-cyan-300 text-[11px] font-mono font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right controls */}
                <div className="flex lg:flex-col items-center justify-end gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 pt-3 lg:pt-0 lg:pl-4">
                  {/* Order controls */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveOrder(item, 'up')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === filtered.length - 1}
                      onClick={() => handleMoveOrder(item, 'down')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Toggle Published */}
                  <button
                    type="button"
                    onClick={() => {
                      saveExperience({ ...item, published: !item.published });
                      showToast(`${item.company} ${item.published ? 'hidden' : 'published'}`);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                      item.published
                        ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10'
                    }`}
                  >
                    {item.published ? 'Published' : 'Hidden'}
                  </button>

                  {/* Edit & Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      id={`btn-edit-exp-${item.id}`}
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Edit Experience"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      id={`btn-delete-exp-${item.id}`}
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete experience record at "${item.company}"?`)) {
                          deleteExperience(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Experience Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0a0e19] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 text-left my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span>{editingItem.id?.startsWith('exp-') && !experiences.some(e => e.id === editingItem.id) ? 'Add Career Experience' : 'Edit Career Experience'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ensure position title, timeline, and production architecture highlights are accurate.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Row 1: Company & Position */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Company / Organization *</label>
                  <input
                    id="input-exp-company"
                    type="text"
                    required
                    value={editingItem.company || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500"
                    placeholder="e.g. Bank Askari or SBTE"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Job Title / Position *</label>
                  <input
                    id="input-exp-position"
                    type="text"
                    required
                    value={editingItem.position || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500"
                    placeholder="e.g. Senior Full-Stack Developer"
                  />
                </div>
              </div>

              {/* Row 2: Type & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Employment Type</label>
                  <select
                    id="select-exp-employment-type"
                    value={editingItem.employmentType || 'Full-time'}
                    onChange={(e) => setEditingItem({ ...editingItem, employmentType: e.target.value as ExperienceItem['employmentType'] })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-hidden focus:border-cyan-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Project-based">Project-based</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Location</label>
                  <input
                    id="input-exp-location"
                    type="text"
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500"
                    placeholder="e.g. Karachi, Pakistan / Remote"
                  />
                </div>
              </div>

              {/* Row 3: Dates & Current Role Toggle */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Start Date</label>
                    <input
                      id="input-exp-startdate"
                      type="text"
                      value={editingItem.startDate || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500"
                      placeholder="e.g. Jan 2023"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">End Date</label>
                    <input
                      id="input-exp-enddate"
                      type="text"
                      disabled={editingItem.current}
                      value={editingItem.current ? 'Present' : (editingItem.endDate || '')}
                      onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500 ${
                        editingItem.current ? 'opacity-50 cursor-not-allowed bg-slate-950 text-emerald-400 font-mono' : ''
                      }`}
                      placeholder="e.g. Dec 2023 or Present"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                  <input
                    id="checkbox-exp-current"
                    type="checkbox"
                    checked={editingItem.current || false}
                    onChange={(e) => {
                      const isCurr = e.target.checked;
                      setEditingItem({
                        ...editingItem,
                        current: isCurr,
                        endDate: isCurr ? 'Present' : (editingItem.endDate === 'Present' ? '' : editingItem.endDate)
                      });
                    }}
                    className="rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-0 cursor-pointer"
                  />
                  <span>I currently work in this role (sets End Date to &quot;Present&quot;)</span>
                </label>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Role Summary / Core Mission</label>
                <textarea
                  id="textarea-exp-description"
                  rows={2}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500"
                  placeholder="Summary of scope, domain, and high-level technical goals..."
                />
              </div>

              {/* Responsibilities & Achievements */}
              <div className="space-y-2">
                <label className="block text-slate-400 font-medium">
                  Key Responsibilities & Deliverables ({editingItem.responsibilities?.length || 0})
                </label>

                <div className="space-y-2">
                  {editingItem.responsibilities?.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-xl border border-white/5">
                      <span className="text-cyan-400 font-bold px-1 text-xs">›</span>
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => {
                          const updated = [...(editingItem.responsibilities || [])];
                          updated[rIdx] = e.target.value;
                          setEditingItem({ ...editingItem, responsibilities: updated });
                        }}
                        className="flex-1 bg-transparent border-none text-xs text-slate-200 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(rIdx)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                        title="Remove Bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add an achievement, metric, or architectural contribution..."
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddResponsibility();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ListPlus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              {/* Technologies Tags */}
              <div className="space-y-2">
                <label className="block text-slate-400 font-medium">
                  Technologies Used ({editingItem.technologies?.length || 0})
                </label>

                {/* Selected tags */}
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-white/5 min-h-10">
                  {editingItem.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => handleToggleTech(tech)}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {(!editingItem.technologies || editingItem.technologies.length === 0) && (
                    <span className="text-slate-500 italic text-xs py-1">No technologies selected</span>
                  )}
                </div>

                {/* Quick Add Suggestions */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] text-slate-400 font-mono">Suggested Technologies (Click to toggle):</span>
                  <div className="flex flex-wrap gap-1">
                    {COMMON_TECH_SUGGESTIONS.map((tech) => {
                      const isSelected = editingItem.technologies?.includes(tech);
                      return (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => handleToggleTech(tech)}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{tech}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Tech Tag input */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add custom tech tag (e.g. AWS S3, Alpine.js)..."
                    value={customTech}
                    onChange={(e) => setCustomTech(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomTech();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTech}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium cursor-pointer"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>

              {/* Status and Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Display Priority / Order</label>
                  <input
                    id="input-exp-order"
                    type="number"
                    min={1}
                    value={editingItem.order ?? 1}
                    onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-hidden focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      id="checkbox-exp-published"
                      type="checkbox"
                      checked={editingItem.published ?? true}
                      onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                      className="rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                    <span>Publish position on live portfolio</span>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="btn-save-experience"
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  Save Experience Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
