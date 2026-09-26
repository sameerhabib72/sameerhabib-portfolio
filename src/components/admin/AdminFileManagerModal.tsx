import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { MediaItem } from '../../types';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Filter,
  Sparkles,
  Link2,
  Maximize2,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  Info
} from 'lucide-react';

export interface AdminFileManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'multiple' | 'single' | 'manage';
  title?: string;
  initialSelectedUrls?: string[];
  onSelectMultiple?: (urls: string[], items: MediaItem[]) => void;
  onSelectSingle?: (url: string, item: MediaItem) => void;
  projectContextName?: string;
}

export const AdminFileManagerModal: React.FC<AdminFileManagerModalProps> = ({
  isOpen,
  onClose,
  mode = 'multiple',
  title,
  initialSelectedUrls = [],
  onSelectMultiple,
  onSelectSingle,
  projectContextName
}) => {
  const { mediaItems, addMediaItem, addMediaItemsBatch, deleteMediaItem, showToast } = useData();

  // Selected URLs map/set
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');

  // URL input form state
  const [urlInput, setUrlInput] = useState('');
  const [urlTitle, setUrlTitle] = useState('');
  const [urlAlt, setUrlAlt] = useState('');

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preview full size modal state
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  // Initialize selected URLs when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedUrls(initialSelectedUrls || []);
      setSearchQuery('');
      setActiveTab('library');
      setIsDragging(false);
      setPreviewItem(null);
    }
  }, [isOpen, initialSelectedUrls]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewItem) {
          setPreviewItem(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, previewItem, onClose]);

  // Categories derivation
  const categories = [
    { id: 'all', label: 'All Files', count: mediaItems.length },
    {
      id: 'ecommerce',
      label: 'E-Commerce',
      count: mediaItems.filter((m) => m.filename.includes('livshem') || m.usedIn.toLowerCase().includes('livshem') || m.caption.toLowerCase().includes('ecommerce')).length
    },
    {
      id: 'agency',
      label: 'Agency & Portfolios',
      count: mediaItems.filter((m) => m.filename.includes('designs') || m.usedIn.toLowerCase().includes('designs')).length
    },
    {
      id: 'systems',
      label: 'Systems & Library',
      count: mediaItems.filter((m) => m.filename.includes('library') || m.filename.includes('task') || m.filename.includes('api')).length
    },
    {
      id: 'uploads',
      label: 'Custom Uploads',
      count: mediaItems.filter((m) => m.url.startsWith('data:')).length
    }
  ];

  // Filtered media items
  const filteredItems = useMemo(() => {
    return mediaItems.filter((item) => {
      // Search matching
      const matchesSearch =
        !searchQuery.trim() ||
        item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.usedIn.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      if (!matchesSearch) return false;
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'ecommerce') {
        return item.filename.includes('livshem') || item.usedIn.toLowerCase().includes('livshem') || item.caption.toLowerCase().includes('ecommerce');
      }
      if (selectedCategory === 'agency') {
        return item.filename.includes('designs') || item.usedIn.toLowerCase().includes('designs');
      }
      if (selectedCategory === 'systems') {
        return item.filename.includes('library') || item.filename.includes('task') || item.filename.includes('api');
      }
      if (selectedCategory === 'uploads') {
        return item.url.startsWith('data:');
      }
      return true;
    });
  }, [mediaItems, searchQuery, selectedCategory]);

  // Toggle selection
  const handleToggleSelect = (url: string) => {
    if (mode === 'single') {
      setSelectedUrls([url]);
    } else {
      setSelectedUrls((prev) => {
        if (prev.includes(url)) {
          return prev.filter((u) => u !== url);
        } else {
          return [...prev, url];
        }
      });
    }
  };

  const handleSelectAllFiltered = () => {
    const urls = filteredItems.map((i) => i.url);
    setSelectedUrls((prev) => Array.from(new Set([...prev, ...urls])));
  };

  const handleClearSelection = () => {
    setSelectedUrls([]);
  };

  // Multiple files processing from drag-drop or file input
  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (fileArray.length === 0) {
      showToast('Please upload valid image files (PNG, JPG, WebP, SVG)', 'error');
      return;
    }

    setIsUploading(true);
    setUploadProgress(`Processing ${fileArray.length} image${fileArray.length > 1 ? 's' : ''}...`);

    const newMediaList: Array<Omit<MediaItem, 'id' | 'uploadedAt'>> = [];
    const newUrls: string[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const dataUrl = await readFileAsDataUrl(file);
      const sizeKb = Math.round(file.size / 1024);
      const sizeStr = sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

      newMediaList.push({
        filename: file.name,
        url: dataUrl,
        altText: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        caption: `Uploaded image for ${projectContextName || 'Project Management'}`,
        size: sizeStr,
        type: file.type,
        usedIn: projectContextName ? `Project: ${projectContextName}` : 'Uploaded Media Asset'
      });
      newUrls.push(dataUrl);
    }

    addMediaItemsBatch(newMediaList);
    setIsUploading(false);
    setUploadProgress(null);

    // Automatically select newly uploaded images
    if (mode === 'single') {
      setSelectedUrls([newUrls[0]]);
    } else {
      setSelectedUrls((prev) => [...prev, ...newUrls]);
    }

    setActiveTab('library');
    showToast(`Successfully uploaded ${newMediaList.length} image${newMediaList.length > 1 ? 's' : ''}!`);
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Add custom URL
  const handleAddCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      showToast('Please provide a valid image URL', 'error');
      return;
    }

    const filename = urlTitle.trim()
      ? `${urlTitle.trim().toLowerCase().replace(/\s+/g, '-')}.jpg`
      : 'custom-web-asset.jpg';

    const newItem: Omit<MediaItem, 'id' | 'uploadedAt'> = {
      filename,
      url: urlInput.trim(),
      altText: urlAlt.trim() || urlTitle.trim() || 'Custom Project Asset',
      caption: urlAlt.trim() || 'Online project screenshot asset',
      size: 'External URL',
      type: 'image/jpeg',
      usedIn: projectContextName ? `Project: ${projectContextName}` : 'Custom Project Media'
    };

    addMediaItem(newItem);
    if (mode === 'single') {
      setSelectedUrls([urlInput.trim()]);
    } else {
      setSelectedUrls((prev) => [...prev, urlInput.trim()]);
    }

    setUrlInput('');
    setUrlTitle('');
    setUrlAlt('');
    setActiveTab('library');
    showToast('Image URL added to media library and selected!');
  };

  // Confirm selection
  const handleConfirm = () => {
    if (selectedUrls.length === 0) {
      showToast('No images selected. Please choose at least one image.', 'info');
      return;
    }

    if (mode === 'single' && onSelectSingle) {
      const selectedItem = mediaItems.find((m) => m.url === selectedUrls[0]) || {
        id: 'media-ext',
        filename: 'selected-image.jpg',
        url: selectedUrls[0],
        altText: '',
        caption: '',
        size: '',
        type: 'image/jpeg',
        uploadedAt: '',
        usedIn: ''
      };
      onSelectSingle(selectedUrls[0], selectedItem);
      onClose();
    } else if (onSelectMultiple) {
      const items = selectedUrls.map((url) => {
        return (
          mediaItems.find((m) => m.url === url) || {
            id: 'media-' + Math.random().toString(36).substring(7),
            filename: 'screenshot.jpg',
            url,
            altText: 'Project screenshot',
            caption: '',
            size: '',
            type: 'image/jpeg',
            uploadedAt: '',
            usedIn: projectContextName || ''
          }
        );
      });
      onSelectMultiple(selectedUrls, items);
      onClose();
    }
  };

  if (!isOpen) return null;

  const defaultTitle =
    mode === 'single'
      ? 'Select Project Thumbnail'
      : mode === 'multiple'
      ? `Project Screenshots & Gallery Manager ${projectContextName ? `• ${projectContextName}` : ''}`
      : 'Media Assets & File Manager';

  return (
    <div
      id="admin-file-manager-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="admin-file-manager-container"
        className="w-full max-w-5xl h-[90vh] bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4 bg-slate-950/70 shrink-0">
          <div className="flex items-center space-x-3 truncate">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-display font-bold text-white truncate">
                  {title || defaultTitle}
                </h2>
                {mode === 'multiple' && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-700/50">
                    Multi-Select Enabled
                  </span>
                )}
                {mode === 'single' && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 font-mono text-[10px] border border-amber-700/50">
                    Single Thumbnail Mode
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5 truncate">
                Browse existing project interfaces, upload multiple screenshots from your computer, or insert external assets.
              </p>
            </div>
          </div>

          <button
            id="btn-close-file-manager"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
            title="Close File Manager (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Navigation Tabs & Search/Filter Toolbar */}
        <div className="px-6 py-3 border-b border-white/10 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Main Tabs */}
          <div className="flex items-center space-x-1.5 p-1 bg-slate-950 rounded-xl border border-white/10 text-xs">
            <button
              id="tab-library"
              onClick={() => setActiveTab('library')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Media Library ({mediaItems.length})</span>
            </button>

            <button
              id="tab-upload"
              onClick={() => setActiveTab('upload')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Batch Upload Multiple Files</span>
            </button>

            <button
              id="tab-url"
              onClick={() => setActiveTab('url')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Add Direct Image URL</span>
            </button>
          </div>

          {/* Search bar (active in library view) */}
          {activeTab === 'library' && (
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search filename, alt text, project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {mode === 'multiple' && (
                <div className="flex items-center space-x-1 text-xs">
                  <button
                    onClick={handleSelectAllFiltered}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
                    title="Select all visible files"
                  >
                    Select All
                  </button>
                  {selectedUrls.length > 0 && (
                    <button
                      onClick={handleClearSelection}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-red-950/50 text-slate-400 hover:text-red-300 text-[11px] border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Categories Bar (Library Tab) */}
        {activeTab === 'library' && (
          <div className="px-6 py-2 border-b border-white/5 bg-slate-950/40 flex items-center space-x-2 overflow-x-auto scrollbar-none shrink-0">
            <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3 h-3" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60 border border-white/5 hover:border-white/20'
                }`}
              >
                {cat.label} <span className="opacity-60 text-[10px]">({cat.count})</span>
              </button>
            ))}
          </div>
        )}

        {/* Central Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          {/* TAB 1: MEDIA LIBRARY */}
          {activeTab === 'library' && (
            <div>
              {filteredItems.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="text-base font-bold text-white">No images match your filter</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Try refining your search keyword, switching category, or use the "Batch Upload Multiple Files" tab to add screenshots from your local drive.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredItems.map((item) => {
                    const isSelected = selectedUrls.includes(item.url);
                    const selectionIndex = selectedUrls.indexOf(item.url);

                    return (
                      <div
                        key={item.id}
                        id={`file-item-${item.id}`}
                        onClick={() => handleToggleSelect(item.url)}
                        className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer bg-slate-900/80 flex flex-col ${
                          isSelected
                            ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-500/20 scale-[1.01]'
                            : 'border-white/10 hover:border-white/30 hover:bg-slate-900'
                        }`}
                      >
                        {/* Image Thumbnail Frame */}
                        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                          <img
                            src={item.url}
                            alt={item.altText}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />

                          {/* Selected Badge Indicator */}
                          {isSelected && (
                            <div className="absolute top-2 left-2 z-10 flex items-center space-x-1 px-2 py-0.5 rounded-md bg-cyan-500 text-slate-950 font-mono font-bold text-[11px] shadow-lg">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              {mode === 'multiple' && <span>#{selectionIndex + 1}</span>}
                            </div>
                          )}

                          {/* Quick Fullscreen Zoom Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewItem(item);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-cyan-300 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Preview Full Size"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Size Pill */}
                          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 text-slate-300 font-mono text-[9px] backdrop-blur-sm">
                            {item.size}
                          </div>
                        </div>

                        {/* Metadata Footer */}
                        <div className="p-3 flex-1 flex flex-col justify-between space-y-1 text-xs">
                          <div>
                            <p className="font-semibold text-white truncate text-[11px]" title={item.filename}>
                              {item.filename}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate" title={item.altText || item.caption}>
                              {item.altText || item.caption || 'Project visual asset'}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                            <span className="truncate max-w-[120px]">{item.usedIn}</span>
                            {mode === 'manage' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm(`Delete "${item.filename}" from media library?`)) {
                                    deleteMediaItem(item.id);
                                    setSelectedUrls((prev) => prev.filter((u) => u !== item.url));
                                  }
                                }}
                                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40 transition-colors"
                                title="Delete from Library"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BATCH MULTI-FILE UPLOAD */}
          {activeTab === 'upload' && (
            <div className="max-w-2xl mx-auto py-6 space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-display font-bold text-white">Batch Upload Multiple Screenshots</h3>
                <p className="text-xs text-slate-400">
                  Select or drag in multiple screenshots from your computer. Files are instantly processed and saved to your project library.
                </p>
              </div>

              {/* Drag & Drop Surface */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                    : 'border-white/20 hover:border-cyan-500/50 bg-slate-900/40 hover:bg-slate-900/60'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      processFiles(e.target.files);
                    }
                  }}
                />

                <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-inner">
                  <Upload className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">
                    Drag & drop multiple image files here, or <span className="text-cyan-400 underline">Browse Local Files</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Supports PNG, JPG, WebP, SVG. Select multiple files at once using Shift or Ctrl/Cmd.
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-300 bg-slate-950 px-3 py-1.5 rounded-full border border-white/10">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Files are automatically converted & pre-selected for insertion</span>
                </div>
              </div>

              {/* Progress Indicator */}
              {isUploading && (
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center space-x-3 text-xs text-cyan-300">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>{uploadProgress}</span>
                </div>
              )}

              {/* Upload Guidelines */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-xs text-slate-400 space-y-2">
                <div className="flex items-center space-x-2 font-bold text-white">
                  <Info className="w-4 h-4 text-cyan-400" />
                  <span>Recommended Image Specifications for Project Case Studies:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] pl-1 font-mono">
                  <li>Aspect Ratio: 16:9 widescreen (e.g. 1920×1080 or 1200×675) for optimal case study lightbox rendering.</li>
                  <li>Formats: Clean WebP, JPG, or PNG under 3MB per file for rapid browser paint times.</li>
                  <li>Screenshots: Capture key user flows like shopping cart recalculations, modal states, checkout sequences, and administrative analytics.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: ADD DIRECT IMAGE URL */}
          {activeTab === 'url' && (
            <div className="max-w-xl mx-auto py-6 space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-display font-bold text-white">Add External Image URL</h3>
                <p className="text-xs text-slate-400">
                  Paste a direct link to any hosted image asset (Unsplash, CDN, or production web server).
                </p>
              </div>

              <form onSubmit={handleAddCustomUrl} className="space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-white/10 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Direct Image URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/... or https://cdn.example.com/screenshot.png"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">Filename / Identifier</label>
                    <input
                      type="text"
                      placeholder="e.g. checkout-step-2.jpg"
                      value={urlTitle}
                      onChange={(e) => setUrlTitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">Caption / Alt Text</label>
                    <input
                      type="text"
                      placeholder="e.g. Shopping cart summary"
                      value={urlAlt}
                      onChange={(e) => setUrlAlt(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
                    />
                  </div>
                </div>

                {urlInput && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-mono text-slate-400 block mb-2">Live Preview:</span>
                    <div className="rounded-xl overflow-hidden border border-white/10 max-h-48 bg-slate-950">
                      <img
                        src={urlInput}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://placehold.co/600x400/0f172a/38bdf8?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center space-x-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save to Media Library & Select</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Control & Action Bar */}
        <footer className="px-6 py-4 border-t border-white/10 bg-slate-950/90 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Selected:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-[11px] border border-cyan-500/30">
                {selectedUrls.length} image{selectedUrls.length !== 1 ? 's' : ''}
              </span>
            </div>
            {selectedUrls.length > 0 && (
              <button
                onClick={handleClearSelection}
                className="text-slate-400 hover:text-white underline text-[11px]"
              >
                Deselect All
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {mode !== 'manage' && (
              <button
                id="btn-confirm-file-selection"
                onClick={handleConfirm}
                disabled={selectedUrls.length === 0}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  selectedUrls.length > 0
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 scale-100 hover:scale-102 active:scale-98'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>
                  {mode === 'single'
                    ? 'Use Selected Image as Thumbnail'
                    : `Add (${selectedUrls.length}) Selected Image${selectedUrls.length !== 1 ? 's' : ''} to Project`}
                </span>
              </button>
            )}
          </div>
        </footer>
      </div>

      {/* Fullscreen Single Image Zoom Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="max-w-4xl max-h-[85vh] bg-slate-950 rounded-2xl border border-white/20 p-4 shadow-2xl flex flex-col space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="font-bold text-white truncate max-w-md">{previewItem.filename}</span>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={previewItem.url}
              alt={previewItem.altText}
              className="max-h-[65vh] object-contain rounded-xl border border-white/5"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
              <span>{previewItem.caption || previewItem.altText}</span>
              <span className="text-cyan-400">{previewItem.size}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
