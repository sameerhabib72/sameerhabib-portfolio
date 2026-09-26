import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ServiceItem, ProcessStepItem, TestimonialItem, FaqItem, AchievementItem } from '../../types';
import { Layers, Plus, Trash2, Edit, Star, HelpCircle, Trophy, Route, CheckCircle2 } from 'lucide-react';

export const AdminServicesAndProcessManager: React.FC = () => {
  const {
    services,
    saveService,
    deleteService,
    processSteps,
    saveProcessStep,
    deleteProcessStep,
    testimonials,
    saveTestimonial,
    deleteTestimonial,
    faqs,
    saveFaq,
    deleteFaq,
    achievements,
    saveAchievement,
    deleteAchievement,
    showToast
  } = useData();

  type SubTab = 'services' | 'process' | 'testimonials' | 'faqs' | 'achievements';
  const [subTab, setSubTab] = useState<SubTab>('services');

  // Modal editing items
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [editingProcess, setEditingProcess] = useState<Partial<ProcessStepItem> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<TestimonialItem> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FaqItem> | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Partial<AchievementItem> | null>(null);

  // Service Save
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) {
      showToast('Service title is required', 'error');
      return;
    }
    const title = editingService.title;
    const slug = editingService.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const item: ServiceItem = {
      id: editingService.id || 'srv-' + Date.now(),
      title,
      slug,
      description: editingService.description || '',
      detailedContent: editingService.detailedContent || editingService.description || '',
      iconName: editingService.iconName || 'Code2',
      features: editingService.features || ['Architecture Specification', 'Production CI/CD Deployment'],
      technologies: editingService.technologies || ['React', 'Node.js', 'PostgreSQL'],
      order: editingService.order ?? services.length + 1,
      published: editingService.published ?? true,
      seoTitle: editingService.seoTitle || `${title} | Sameer Habib`,
      seoDescription: editingService.seoDescription || editingService.description || ''
    };
    saveService(item);
    setEditingService(null);
  };

  // Process Step Save
  const handleSaveProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProcess?.title) {
      showToast('Step title is required', 'error');
      return;
    }
    const item: ProcessStepItem = {
      id: editingProcess.id || 'step-' + Date.now(),
      stepNumber: String(editingProcess.stepNumber || (processSteps.length + 1).toString().padStart(2, '0')),
      title: editingProcess.title || '',
      description: editingProcess.description || '',
      details: editingProcess.details || ['Functional scoping and requirements analysis'],
      order: editingProcess.order ?? processSteps.length + 1,
      published: editingProcess.published ?? true
    };
    saveProcessStep(item);
    setEditingProcess(null);
  };

  // Testimonial Save
  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.name || !editingTestimonial?.quote) {
      showToast('Name and quote are required', 'error');
      return;
    }
    const item: TestimonialItem = {
      id: editingTestimonial.id || 'test-' + Date.now(),
      name: editingTestimonial.name || '',
      role: editingTestimonial.role || '',
      company: editingTestimonial.company || '',
      avatar: editingTestimonial.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      quote: editingTestimonial.quote || '',
      rating: editingTestimonial.rating ?? 5,
      verified: editingTestimonial.verified ?? true,
      order: editingTestimonial.order ?? testimonials.length + 1,
      published: editingTestimonial.published ?? true
    };
    saveTestimonial(item);
    setEditingTestimonial(null);
  };

  // FAQ Save
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) {
      showToast('Question and answer are required', 'error');
      return;
    }
    const item: FaqItem = {
      id: editingFaq.id || 'faq-' + Date.now(),
      question: editingFaq.question || '',
      answer: editingFaq.answer || '',
      category: editingFaq.category || 'General',
      order: editingFaq.order ?? faqs.length + 1,
      published: editingFaq.published ?? true
    };
    saveFaq(item);
    setEditingFaq(null);
  };

  // Achievement Save
  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement?.title) {
      showToast('Achievement title is required', 'error');
      return;
    }
    const item: AchievementItem = {
      id: editingAchievement.id || 'ach-' + Date.now(),
      title: editingAchievement.title || '',
      organization: editingAchievement.organization || '',
      year: editingAchievement.year || '2025',
      description: editingAchievement.description || '',
      order: editingAchievement.order ?? achievements.length + 1,
      published: editingAchievement.published ?? true
    };
    saveAchievement(item);
    setEditingAchievement(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-cyan-400" />
            Services, Workflows & Social Proof
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Curate service offerings, engineering process milestones, recommendations, and frequently asked questions.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#080c15] border border-white/10 text-xs">
          <button
            onClick={() => setSubTab('services')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              subTab === 'services' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Services ({services.length})
          </button>
          <button
            onClick={() => setSubTab('process')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              subTab === 'process' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Process ({processSteps.length})
          </button>
          <button
            onClick={() => setSubTab('testimonials')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              subTab === 'testimonials' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Reviews ({testimonials.length})
          </button>
          <button
            onClick={() => setSubTab('faqs')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              subTab === 'faqs' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            FAQs ({faqs.length})
          </button>
          <button
            onClick={() => setSubTab('achievements')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              subTab === 'achievements' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Awards ({achievements.length})
          </button>
        </div>
      </div>

      {/* SUBTAB 1: SERVICES */}
      {subTab === 'services' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingService({
                  title: '',
                  slug: '',
                  description: '',
                  detailedContent: '',
                  iconName: 'Code2',
                  features: ['Architecture Specification', 'Production CI/CD Deployment'],
                  technologies: ['React', 'Node.js', 'PostgreSQL'],
                  order: services.length + 1,
                  published: true
                })
              }
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-5 rounded-2xl bg-[#080c15] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-white text-base">{srv.title}</h3>
                    <span className="text-[11px] font-mono text-cyan-400">/{srv.slug}</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3">{srv.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {srv.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-400 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
                  <span>{srv.features.length} Features included</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingService(srv)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete service "${srv.title}"?`)) deleteService(srv.id);
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Delete Service"
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

      {/* SUBTAB 2: PROCESS STEPS */}
      {subTab === 'process' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingProcess({
                  stepNumber: (processSteps.length + 1).toString().padStart(2, '0'),
                  title: '',
                  description: '',
                  details: ['Detailed deliverable specification'],
                  order: processSteps.length + 1,
                  published: true
                })
              }
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Process Step</span>
            </button>
          </div>

          <div className="space-y-3">
            {processSteps.map((step) => (
              <div
                key={step.id}
                className="p-4 rounded-xl bg-[#080c15] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{step.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    Order #{step.order}
                  </span>
                  <button
                    onClick={() => setEditingProcess(step)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete step "${step.title}"?`)) deleteProcessStep(step.id);
                    }}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: TESTIMONIALS */}
      {subTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingTestimonial({
                  name: '',
                  role: 'VP of Engineering',
                  company: 'Acme Corp',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                  quote: '',
                  rating: 5,
                  verified: true,
                  order: testimonials.length + 1,
                  published: true
                })
              }
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Endorsement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((test) => (
              <div key={test.id} className="p-5 rounded-2xl bg-[#080c15] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    {test.verified && (
                      <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 italic mb-4">&quot;{test.quote}&quot;</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2.5">
                    <img src={test.avatar} alt={test.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    <div>
                      <div className="font-bold text-white text-xs">{test.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {test.role} • {test.company}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingTestimonial(test)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete review from "${test.name}"?`)) deleteTestimonial(test.id);
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
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

      {/* SUBTAB 4: FAQS */}
      {subTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingFaq({
                  question: '',
                  answer: '',
                  category: 'General',
                  order: faqs.length + 1,
                  published: true
                })
              }
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id} className="p-4 rounded-xl bg-[#080c15] border border-white/10 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{f.question}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{f.answer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setEditingFaq(f)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete FAQ?`)) deleteFaq(f.id);
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-400">
                  <span>Category: {f.category}</span>
                  <span>•</span>
                  <span>Order: #{f.order}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 5: ACHIEVEMENTS */}
      {subTab === 'achievements' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setEditingAchievement({
                  title: '',
                  organization: '',
                  year: '2025',
                  description: '',
                  order: achievements.length + 1,
                  published: true
                })
              }
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Recognition / Award</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div key={ach.id} className="p-4 rounded-xl bg-[#080c15] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <h4 className="font-bold text-sm text-white">{ach.title}</h4>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400">{ach.year}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-1">{ach.organization}</p>
                  <p className="text-xs text-slate-300 mt-2">{ach.description}</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-white/5">
                  <button
                    onClick={() => setEditingAchievement(ach)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete achievement "${ach.title}"?`)) deleteAchievement(ach.id);
                    }}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Service */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 my-8 text-left">
            <h3 className="text-base font-bold text-white">
              {editingService.id ? 'Edit Service' : 'Add New Service'}
            </h3>
            <form onSubmit={handleSaveService} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  placeholder="e.g. Cloud Native Migration & AWS Architecture"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={editingService.slug || ''}
                  onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  placeholder="cloud-native-migration"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  placeholder="Concise overview for cards..."
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Detailed Content</label>
                <textarea
                  rows={3}
                  value={editingService.detailedContent || ''}
                  onChange={(e) => setEditingService({ ...editingService, detailedContent: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  placeholder="Comprehensive service specifications..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={editingService.seoTitle || ''}
                    onChange={(e) => setEditingService({ ...editingService, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                    placeholder="SEO Title"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Icon Name</label>
                  <input
                    type="text"
                    value={editingService.iconName || 'Code2'}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                    placeholder="Code2 / Server / Layers"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Process Step */}
      {editingProcess && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-bold text-white">
              {editingProcess.id ? 'Edit Process Step' : 'Add Process Step'}
            </h3>
            <form onSubmit={handleSaveProcess} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Step Title *</label>
                <input
                  type="text"
                  required
                  value={editingProcess.title || ''}
                  onChange={(e) => setEditingProcess({ ...editingProcess, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  placeholder="Discovery & Architecture Blueprint"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Step Number (e.g. 01)</label>
                  <input
                    type="text"
                    value={editingProcess.stepNumber || ''}
                    onChange={(e) => setEditingProcess({ ...editingProcess, stepNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                    placeholder="01"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Order Index</label>
                  <input
                    type="number"
                    value={editingProcess.order ?? 1}
                    onChange={(e) => setEditingProcess({ ...editingProcess, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProcess.description || ''}
                  onChange={(e) => setEditingProcess({ ...editingProcess, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProcess(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Save Step
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Testimonial */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-bold text-white">
              {editingTestimonial.id ? 'Edit Endorsement' : 'Add Endorsement'}
            </h3>
            <form onSubmit={handleSaveTestimonial} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Client / Colleague Name *</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.name || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  placeholder="Elena Rostova"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Role</label>
                  <input
                    type="text"
                    value={editingTestimonial.role || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                    placeholder="Chief Architect"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Organization</label>
                  <input
                    type="text"
                    value={editingTestimonial.company || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                    placeholder="Fintech Global"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Endorsement Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={editingTestimonial.quote || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  placeholder="Sameer provided exceptional code craftsmanship..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="testimonial-verified"
                  checked={editingTestimonial.verified ?? true}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, verified: e.target.checked })}
                  className="rounded border-white/20 bg-slate-900 text-cyan-500"
                />
                <label htmlFor="testimonial-verified" className="text-xs text-slate-300 cursor-pointer">
                  Verified Client Recommendation Badge
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Save Endorsement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FAQ */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-bold text-white">{editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}</h3>
            <form onSubmit={handleSaveFaq} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  placeholder="What is your typical deployment stack?"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Answer *</label>
                <textarea
                  rows={3}
                  required
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingFaq.category || 'General'}
                    onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingFaq.order ?? 1}
                    onChange={(e) => setEditingFaq({ ...editingFaq, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Achievement */}
      {editingAchievement && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-bold text-white">
              {editingAchievement.id ? 'Edit Achievement' : 'Add Achievement'}
            </h3>
            <form onSubmit={handleSaveAchievement} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Award / Honor Title *</label>
                <input
                  type="text"
                  required
                  value={editingAchievement.title || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Organization</label>
                  <input
                    type="text"
                    value={editingAchievement.organization || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, organization: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Year</label>
                  <input
                    type="text"
                    value={editingAchievement.year || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                    placeholder="2025"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingAchievement.description || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingAchievement(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
