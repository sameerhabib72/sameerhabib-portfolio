import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { useData } from '../../context/DataContext';
import { AdminFileManagerModal } from './AdminFileManagerModal';
import {
  X,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Star,
  FolderOpen,
  Eye,
  Sliders,
  Sparkles,
  Link,
  FileCode,
  Tag,
  CheckCircle2,
  Info
} from 'lucide-react';

export interface AdminProjectEditModalProps {
  project: ProjectItem | Partial<ProjectItem> | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ProjectItem) => void;
}

export const AdminProjectEditModal: React.FC<AdminProjectEditModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave
}) => {
  const { mediaItems, addMediaItemsBatch, showToast } = useData();

  // Local form state
  const [formData, setFormData] = useState<Partial<ProjectItem>>(() => ({
    id: project?.id || 'proj-' + Date.now(),
    title: project?.title || '',
    subtitle: project?.subtitle || '',
    slug: project?.slug || '',
    category: project?.category || 'Full Stack & E-Commerce',
    thumbnail: project?.thumbnail || '',
    gallery: project?.gallery ? [...project.gallery] : [],
    shortDescription: project?.shortDescription || '',
    longDescription: project?.longDescription || '',
    technologies: project?.technologies ? [...project.technologies] : ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
    features: project?.features ? [...project.features] : [],
    problem: project?.problem || '',
    solution: project?.solution || '',
    challenges: project?.challenges || '',
    result: project?.result || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    role: project?.role || 'Lead Full Stack Developer',
    year: project?.year || '2026',
    client: project?.client || 'Enterprise Client',
    featured: project?.featured || false,
    published: project?.published ?? true,
    order: project?.order || 1,
    architectureNodes: project?.architectureNodes || [
      { title: 'Frontend Layer', description: 'React SPA with Tailwind & Motion', tech: 'React / TypeScript' },
      { title: 'Backend Controller', description: 'RESTful API with Auth & Validation', tech: 'Laravel / PHP' },
      { title: 'Database & Cache', description: 'Relational Schema & Redis Caching', tech: 'MySQL / Redis' }
    ],
    developmentProcess: project?.developmentProcess || ['Architecture Design', 'Database Modeling', 'REST API Implementation', 'Frontend Interface', 'Automated Testing', 'CI/CD Deployment'],
    seoTitle: project?.seoTitle || `${project?.title || 'Project'} | Case Study`,
    seoDescription: project?.seoDescription || (project?.shortDescription || 'Technical case study breakdown and architecture review.'),
    seoKeywords: project?.seoKeywords || ['full stack', 'web development', 'laravel', 'react', 'mysql'],
    ogImage: project?.ogImage || project?.thumbnail || ''
  }));

  // Active tab in edit modal
  const [activeTab, setActiveTab] = useState<'visuals' | 'details' | 'narrative' | 'stack'>('visuals');

  // File manager modal states
  const [fileManagerOpen, setFileManagerOpen] = useState(false);
  const [fileManagerMode, setFileManagerMode] = useState<'multiple' | 'single'>('multiple');

  // Input state for single tech or feature addition
  const [newTechInput, setNewTechInput] = useState('');
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [quickUrlInput, setQuickUrlInput] = useState('');

  // Drag and drop state for gallery upload
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);

  if (!isOpen || !project) return null;

  // Reorder gallery items
  const moveGalleryItem = (index: number, direction: 'left' | 'right') => {
    const gallery = [...(formData.gallery || [])];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= gallery.length) return;

    const [moved] = gallery.splice(index, 1);
    gallery.splice(targetIndex, 0, moved);
    setFormData((prev) => ({ ...prev, gallery }));
  };

  // Remove single image from gallery
  const removeGalleryItem = (index: number) => {
    const gallery = [...(formData.gallery || [])];
    gallery.splice(index, 1);
    setFormData((prev) => ({ ...prev, gallery }));
    showToast('Screenshot removed from project gallery');
  };

  // Set image as main thumbnail
  const setAsThumbnail = (url: string) => {
    setFormData((prev) => ({ ...prev, thumbnail: url }));
    showToast('Updated main project thumbnail');
  };

  // Direct batch file upload processing
  const handleBatchUploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      showToast('Please select valid image files', 'error');
      return;
    }

    const newMediaItemsList: any[] = [];
    const newUrls: string[] = [];

    for (const file of fileArray) {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const sizeKb = Math.round(file.size / 1024);
      const sizeStr = sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

      newMediaItemsList.push({
        filename: file.name,
        url: dataUrl,
        altText: `${formData.title || 'Project'} screenshot - ${file.name.replace(/\.[^/.]+$/, '')}`,
        caption: `Screenshot for ${formData.title || 'Project'}`,
        size: sizeStr,
        type: file.type,
        usedIn: `Project: ${formData.title || 'Untitled'}`
      });
      newUrls.push(dataUrl);
    }

    addMediaItemsBatch(newMediaItemsList);

    // Append to project gallery
    setFormData((prev) => {
      const currentGallery = prev.gallery || [];
      const updatedGallery = [...currentGallery, ...newUrls];
      return {
        ...prev,
        // If no thumbnail set yet, use the first uploaded image
        thumbnail: prev.thumbnail || newUrls[0],
        gallery: updatedGallery
      };
    });

    showToast(`Added ${newUrls.length} screenshot${newUrls.length > 1 ? 's' : ''} to project gallery!`);
  };

  // Add quick external URL
  const handleAddQuickUrl = () => {
    if (!quickUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), quickUrlInput.trim()]
    }));
    setQuickUrlInput('');
    showToast('Added image URL to gallery');
  };

  // Handle tech stack tags
  const handleAddTech = () => {
    if (!newTechInput.trim()) return;
    if (formData.technologies?.includes(newTechInput.trim())) {
      setNewTechInput('');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      technologies: [...(prev.technologies || []), newTechInput.trim()]
    }));
    setNewTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies?.filter((t) => t !== tech) || []
    }));
  };

  // Handle feature bullets
  const handleAddFeature = () => {
    if (!newFeatureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), newFeatureInput.trim()]
    }));
    setNewFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => {
      const copy = [...(prev.features || [])];
      copy.splice(idx, 1);
      return { ...prev, features: copy };
    });
  };

  // Handle final submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Project title is required', 'error');
      setActiveTab('details');
      return;
    }

    const finalProject: ProjectItem = {
      id: formData.id || 'proj-' + Date.now(),
      title: formData.title.trim(),
      subtitle: formData.subtitle?.trim() || '',
      slug:
        formData.slug?.trim() ||
        formData.title
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
      category: formData.category?.trim() || 'Full Stack & Web Application',
      thumbnail:
        formData.thumbnail?.trim() ||
        (formData.gallery && formData.gallery[0]) ||
        'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
      gallery: formData.gallery || [],
      shortDescription: formData.shortDescription?.trim() || '',
      longDescription: formData.longDescription?.trim() || '',
      technologies: formData.technologies || [],
      features: formData.features || [],
      problem: formData.problem?.trim() || '',
      solution: formData.solution?.trim() || '',
      challenges: formData.challenges?.trim() || '',
      result: formData.result?.trim() || '',
      liveUrl: formData.liveUrl?.trim() || undefined,
      githubUrl: formData.githubUrl?.trim() || undefined,
      role: formData.role?.trim() || 'Senior Full Stack Developer',
      year: formData.year?.trim() || '2026',
      client: formData.client?.trim() || 'Client Project',
      featured: formData.featured || false,
      published: formData.published ?? true,
      order: formData.order || 1,
      architectureNodes: formData.architectureNodes || [
        { title: 'Frontend Layer', description: 'React SPA with Tailwind & Motion', tech: 'React / TypeScript' },
        { title: 'Backend Controller', description: 'RESTful API with Auth & Validation', tech: 'Laravel / PHP' },
        { title: 'Database & Cache', description: 'Relational Schema & Redis Caching', tech: 'MySQL / Redis' }
      ],
      developmentProcess: formData.developmentProcess || ['Architecture Design', 'Database Modeling', 'REST API Implementation', 'Frontend Interface', 'Automated Testing', 'CI/CD Deployment'],
      seoTitle: formData.seoTitle || `${formData.title?.trim() || 'Project'} | Case Study`,
      seoDescription: formData.seoDescription || (formData.shortDescription?.trim() || 'Technical case study breakdown and architecture review.'),
      seoKeywords: formData.seoKeywords || ['full stack', 'web development', 'laravel', 'react', 'mysql'],
      ogImage: formData.ogImage || formData.thumbnail || (formData.gallery && formData.gallery[0]) || ''
    };

    onSave(finalProject);
    showToast(`Project "${finalProject.title}" saved successfully!`);
    onClose();
  };

  return (
    <>
      <div
        id="admin-project-edit-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          id="admin-project-edit-modal-container"
          className="w-full max-w-5xl h-[92vh] bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4 bg-slate-950/80 shrink-0">
            <div className="flex items-center space-x-3 truncate">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base sm:text-lg font-display font-bold text-white truncate">
                    {project.id ? `Edit Project: ${formData.title || 'Untitled'}` : 'Create New Project Case Study'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-800">
                    {formData.gallery?.length || 0} Screenshots
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 truncate">
                  Manage multiple screenshots, file library attachments, architectural narrative, and technical specs.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Navigation Tabs */}
          <div className="px-6 py-2.5 border-b border-white/10 bg-slate-900/40 flex items-center space-x-2 overflow-x-auto scrollbar-none shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('visuals')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'visuals'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Screenshots & Multiple Images ({formData.gallery?.length || 0})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>General & Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('narrative')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'narrative'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Architecture & Narrative</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stack')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'stack'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Tech Stack & Features</span>
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: VISUALS & MULTIPLE IMAGES MANAGEMENT (CORE REQUEST) */}
              {activeTab === 'visuals' && (
                <div className="space-y-8">
                  {/* Notice Banner */}
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start space-x-3 text-xs">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-white">
                        Multiple Image & Screenshot Management
                      </p>
                      <p className="text-slate-300">
                        Use the built-in <strong>File Manager</strong> to multi-select stored screenshots, drag-and-drop multiple local files directly, or set and reorder images for the fullscreen Lightbox and project case study.
                      </p>
                    </div>
                  </div>

                  {/* Section A: Main Cover Thumbnail */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-cyan-400" />
                          Primary Project Thumbnail (Cover)
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Featured on the public homepage, projects grid, and hero banner.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          id="btn-choose-thumbnail-fm"
                          onClick={() => {
                            setFileManagerMode('single');
                            setFileManagerOpen(true);
                          }}
                          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition-colors cursor-pointer"
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                          <span>Choose from File Manager</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      {/* Thumbnail Preview Card */}
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-inner group">
                        {formData.thumbnail ? (
                          <>
                            <img
                              src={formData.thumbnail}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                              <a
                                href={formData.thumbnail}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg bg-slate-900 text-white hover:text-cyan-300 text-xs font-mono"
                              >
                                View Full Image
                              </a>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 space-y-1">
                            <ImageIcon className="w-8 h-8" />
                            <span className="text-xs">No thumbnail specified</span>
                          </div>
                        )}
                      </div>

                      {/* Thumbnail URL Input */}
                      <div className="md:col-span-2 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Thumbnail URL
                          </label>
                          <input
                            type="text"
                            value={formData.thumbnail || ''}
                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                            placeholder="https://images.unsplash.com/... or choose from file manager"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Recommended format: 16:9 ratio, minimum 1200×675px for crisp display on high-DPI screens.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section B: Multiple Gallery Screenshots (Core Request) */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <Layers className="w-4 h-4 text-cyan-400" />
                            Project Gallery & Multiple Screenshots
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-800">
                            {formData.gallery?.length || 0} Screenshots
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Add multiple workflow views, checkout flows, admin interfaces, and mobile screens.
                        </p>
                      </div>

                      {/* Action Buttons for Gallery */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* 1. Open File Manager (Multi-Select) */}
                        <button
                          type="button"
                          id="btn-open-gallery-file-manager"
                          onClick={() => {
                            setFileManagerMode('multiple');
                            setFileManagerOpen(true);
                          }}
                          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                        >
                          <FolderOpen className="w-4 h-4" />
                          <span>Open File Manager (Select Multiple)</span>
                        </button>

                        {/* 2. Batch Upload Local Files */}
                        <label
                          id="btn-batch-upload-local"
                          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span>Batch Upload Files</span>
                          <input
                            type="file"
                            multiple
                            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                handleBatchUploadFiles(e.target.files);
                              }
                            }}
                          />
                        </label>

                        {/* 3. Clear all */}
                        {formData.gallery && formData.gallery.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('Clear all gallery screenshots for this project?')) {
                                setFormData({ ...formData, gallery: [] });
                                showToast('Gallery cleared', 'info');
                              }
                            }}
                            className="px-2.5 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 text-red-300 text-xs border border-red-800/30 transition-colors cursor-pointer"
                            title="Clear All Screenshots"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Quick Add URL Bar */}
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <input
                          type="url"
                          placeholder="Paste a direct screenshot image URL to append..."
                          value={quickUrlInput}
                          onChange={(e) => setQuickUrlInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddQuickUrl();
                            }
                          }}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddQuickUrl}
                        disabled={!quickUrlInput.trim()}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Add URL
                      </button>
                    </div>

                    {/* Visual Screenshots Grid */}
                    {formData.gallery && formData.gallery.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {formData.gallery.map((imgUrl, index) => {
                          const isCurrentThumbnail = formData.thumbnail === imgUrl;

                          return (
                            <div
                              key={`${imgUrl}-${index}`}
                              className={`group relative rounded-2xl overflow-hidden border bg-slate-950 flex flex-col transition-all ${
                                isCurrentThumbnail
                                  ? 'border-cyan-500/80 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              {/* Image Frame */}
                              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                                <img
                                  src={imgUrl}
                                  alt={`Screenshot #${index + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      'https://placehold.co/600x400/0f172a/38bdf8?text=Image+Load+Error';
                                  }}
                                />

                                {/* Screenshot Index Pill */}
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 text-cyan-300 font-mono text-[10px] font-bold border border-white/10 backdrop-blur-sm">
                                  Screenshot #{index + 1}
                                </div>

                                {isCurrentThumbnail && (
                                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-cyan-500 text-slate-950 font-mono text-[10px] font-bold shadow-md">
                                    Primary Cover
                                  </div>
                                )}
                              </div>

                              {/* Card Actions Toolbar */}
                              <div className="p-3 bg-slate-950 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
                                {/* Reordering Arrows */}
                                <div className="flex items-center space-x-1">
                                  <button
                                    type="button"
                                    onClick={() => moveGalleryItem(index, 'left')}
                                    disabled={index === 0}
                                    className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                    title="Move earlier"
                                  >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => moveGalleryItem(index, 'right')}
                                    disabled={index === (formData.gallery?.length || 1) - 1}
                                    className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                    title="Move later"
                                  >
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="flex items-center space-x-1.5">
                                  {!isCurrentThumbnail && (
                                    <button
                                      type="button"
                                      onClick={() => setAsThumbnail(imgUrl)}
                                      className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 text-[10px] font-mono border border-white/5 transition-colors cursor-pointer"
                                      title="Set as Main Cover"
                                    >
                                      Make Cover
                                    </button>
                                  )}

                                  <a
                                    href={imgUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                                    title="Open Full Image"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>

                                  <button
                                    type="button"
                                    onClick={() => removeGalleryItem(index)}
                                    className="p-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors cursor-pointer"
                                    title="Remove from project"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Empty State with Drag-and-Drop Area */
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsGalleryDragging(true);
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          setIsGalleryDragging(false);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsGalleryDragging(false);
                          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                            handleBatchUploadFiles(e.dataTransfer.files);
                          }
                        }}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                          isGalleryDragging
                            ? 'border-cyan-400 bg-cyan-500/10'
                            : 'border-white/10 hover:border-white/20 bg-slate-950/50'
                        }`}
                      >
                        <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                        <h4 className="text-sm font-bold text-white">No gallery screenshots yet</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                          Showcase your system architecture, responsive layouts, checkout screens, and administrative dashboards.
                        </p>
                        <div className="flex justify-center gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => {
                              setFileManagerMode('multiple');
                              setFileManagerOpen(true);
                            }}
                            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer shadow-md shadow-cyan-500/20"
                          >
                            Browse File Manager
                          </button>
                          <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 cursor-pointer">
                            Upload Local Images
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                  handleBatchUploadFiles(e.target.files);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: GENERAL & OVERVIEW */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. LIVSHEM E-Commerce Platform"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">URL Slug *</label>
                      <input
                        type="text"
                        required
                        value={formData.slug || ''}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. livshem"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Subtitle / Catchphrase</label>
                      <input
                        type="text"
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="e.g. High-throughput shopping cart & merchant portal"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Category</label>
                      <input
                        type="text"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g. Full Stack & E-Commerce"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Your Role</label>
                      <input
                        type="text"
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. Lead Full Stack Developer"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Client / Organization</label>
                      <input
                        type="text"
                        value={formData.client || ''}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        placeholder="e.g. Retail Enterprise Client"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Year</label>
                      <input
                        type="text"
                        value={formData.year || ''}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="e.g. 2026"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Display Order</label>
                      <input
                        type="number"
                        value={formData.order || 1}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Short Excerpt (Grid Summary)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.shortDescription || ''}
                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                        placeholder="Concise 1-2 sentence executive summary of the system and architectural outcome..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Extended Case Study Description
                      </label>
                      <textarea
                        rows={4}
                        value={formData.longDescription || ''}
                        onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                        placeholder="Detailed walkthrough of the business problem, user workflows, and technical design..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
                    <label className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-white/10 focus:ring-cyan-500"
                      />
                      <span>Feature on Homepage Bento Grid</span>
                    </label>

                    <label className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published ?? true}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-white/10 focus:ring-cyan-500"
                      />
                      <span>Published in Public Portfolio</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 3: ARCHITECTURE & NARRATIVE */}
              {activeTab === 'narrative' && (
                <div className="space-y-5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      The Business Problem
                    </label>
                    <textarea
                      rows={3}
                      value={formData.problem || ''}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      placeholder="What was broken, slow, or lacking in the previous architecture or client workflow?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      Engineering Solution & Architectural Decision
                    </label>
                    <textarea
                      rows={3}
                      value={formData.solution || ''}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      placeholder="How did you architect the frontend, backend, database models, and API endpoints?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      Key Technical Challenges & How You Overcame Them
                    </label>
                    <textarea
                      rows={3}
                      value={formData.challenges || ''}
                      onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                      placeholder="e.g. Concurrency race conditions in inventory updates resolved via database transactions..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      Measurable Results & Metrics
                    </label>
                    <textarea
                      rows={3}
                      value={formData.result || ''}
                      onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                      placeholder="e.g. 99.98% uptime, 42% faster checkout completion, sub-120ms server response times..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: TECH STACK & FEATURES */}
              {activeTab === 'stack' && (
                <div className="space-y-6 text-xs">
                  {/* Live URLs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Live Production URL</label>
                      <input
                        type="url"
                        value={formData.liveUrl || ''}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        placeholder="https://livshem.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">GitHub Repository URL</label>
                      <input
                        type="url"
                        value={formData.githubUrl || ''}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/sameer-habib/livshem"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Technologies Tags Editor */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                    <label className="block text-slate-300 font-semibold">Technologies & Libraries</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add technology (e.g. Redis, Docker, TypeScript)..."
                        value={newTechInput}
                        onChange={(e) => setNewTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTech();
                          }
                        }}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddTech}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 cursor-pointer"
                      >
                        Add Tag
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-white/10 text-cyan-300 font-mono text-[11px]"
                        >
                          <span>{tech}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTech(tech)}
                            className="text-slate-500 hover:text-red-400 cursor-pointer ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features List Editor */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
                    <label className="block text-slate-300 font-semibold">Key Architectural Features</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add key feature bullet point..."
                        value={newFeatureInput}
                        onChange={(e) => setNewFeatureInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddFeature();
                          }
                        }}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 cursor-pointer"
                      >
                        Add Feature
                      </button>
                    </div>

                    <div className="space-y-2 pt-2">
                      {formData.features?.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-white/10 text-slate-300 text-xs"
                        >
                          <span className="flex-1 pr-3">{feat}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(idx)}
                            className="text-slate-500 hover:text-red-400 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Form Actions Bar */}
            <footer className="px-6 py-4 border-t border-white/10 bg-slate-950/90 flex items-center justify-between gap-4 shrink-0">
              <div className="text-xs text-slate-400">
                <span>{formData.gallery?.length || 0} gallery screenshot(s) attached</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  id="btn-save-project-changes"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Save Project Changes</span>
                </button>
              </div>
            </footer>
          </form>
        </div>
      </div>

      {/* Integrated File Manager Modal */}
      <AdminFileManagerModal
        isOpen={fileManagerOpen}
        onClose={() => setFileManagerOpen(false)}
        mode={fileManagerMode}
        projectContextName={formData.title || 'Project'}
        initialSelectedUrls={fileManagerMode === 'single' ? (formData.thumbnail ? [formData.thumbnail] : []) : formData.gallery || []}
        onSelectSingle={(url) => {
          setFormData((prev) => ({ ...prev, thumbnail: url }));
          showToast('Updated project thumbnail');
        }}
        onSelectMultiple={(urls) => {
          // Merge unique URLs into gallery
          setFormData((prev) => {
            const current = prev.gallery || [];
            const merged = Array.from(new Set([...current, ...urls]));
            return {
              ...prev,
              thumbnail: prev.thumbnail || merged[0],
              gallery: merged
            };
          });
          showToast(`Attached ${urls.length} images to project gallery`);
        }}
      />
    </>
  );
};
