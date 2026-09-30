import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import {
  Search,
  Code2,
  FolderGit2,
  BookOpen,
  Briefcase,
  FileDown,
  Lock,
  ArrowRight,
  X,
  Sparkles
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    projects,
    skills,
    services,
    blogPosts,
    navigateTo,
    setCvModalOpen,
  } = useData();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  // Aggregate searchable items
  interface PaletteItem {
    id: string;
    title: string;
    subtitle: string;
    category: 'Navigation' | 'Project' | 'Skill' | 'Service' | 'Article' | 'Action';
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
  }

  const baseItems: PaletteItem[] = [
    {
      id: 'act-ai-assistant',
      title: 'Open AI Assistant Center',
      subtitle: 'Interactive technical Q&A, recruiter assessment & project scoping with Gemini AI',
      category: 'Action',
      icon: Sparkles,
      action: () => {
        setCommandPaletteOpen(false);
        navigateTo('ai-assistant');
      }
    },
    {
      id: 'act-cv',
      title: 'Download Resume / CV',
      subtitle: 'View active Curriculum Vitae in text/print format',
      category: 'Action',
      icon: FileDown,
      action: () => {
        setCommandPaletteOpen(false);
        setCvModalOpen(true);
      }
    },
    {
      id: 'act-admin',
      title: 'Open Admin CMS Portal',
      subtitle: 'Access dashboard, CRUD managers, SEO audit and settings',
      category: 'Action',
      icon: Lock,
      action: () => {
        setCommandPaletteOpen(false);
        navigateTo('admin');
      }
    },
    {
      id: 'nav-home',
      title: 'Go to Homepage / Hero',
      subtitle: 'Return to top of personal portfolio',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => {
        setCommandPaletteOpen(false);
        navigateTo('home');
      }
    },
    {
      id: 'nav-arch',
      title: 'Engineering Architecture & 6-Layer Topology',
      subtitle: 'Explore full-stack Next.js, Laravel, Redis, and MySQL layer breakdown',
      category: 'Navigation',
      icon: Code2,
      action: () => {
        setCommandPaletteOpen(false);
        navigateTo('home');
        setTimeout(() => {
          document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  ];

  // Dynamic projects
  const projectItems: PaletteItem[] = projects.map((p) => ({
    id: `proj-${p.id}`,
    title: p.title,
    subtitle: `${p.category} — ${p.subtitle}`,
    category: 'Project',
    icon: FolderGit2,
    action: () => {
      setCommandPaletteOpen(false);
      navigateTo('project-detail', p.slug);
    }
  }));

  // Dynamic skills
  const skillItems: PaletteItem[] = skills.slice(0, 8).map((s) => ({
    id: `skill-${s.id}`,
    title: s.name,
    subtitle: `${s.category} • ${s.proficiency}% proficiency • ${s.experienceYears}`,
    category: 'Skill',
    icon: Code2,
    action: () => {
      setCommandPaletteOpen(false);
      navigateTo('skill-detail', s.slug);
    }
  }));

  // Dynamic services
  const serviceItems: PaletteItem[] = services.map((srv) => ({
    id: `srv-${srv.id}`,
    title: srv.title,
    subtitle: srv.description,
    category: 'Service',
    icon: Briefcase,
    action: () => {
      setCommandPaletteOpen(false);
      navigateTo('service-detail', srv.slug);
    }
  }));

  const allItems: PaletteItem[] = [
    ...baseItems,
    ...projectItems,
    ...skillItems,
    ...serviceItems
  ];

  const filteredItems = query.trim()
    ? allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      id="command-palette-modal"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#120e0b] border border-[#c87a3e]/30 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden text-[#f3d5b5]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#c87a3e]/20 bg-[#1c140f]">
          <Search className="w-5 h-5 text-[#e59850] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type to search projects, skills, services, articles, or actions..."
            className="w-full bg-transparent text-sm text-white placeholder-[#8d6e52] focus:outline-hidden"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-md text-[#a88264] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#c87a3e]/10">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#a88264] text-sm">
              No results found for &ldquo;<span className="text-white">{query}</span>&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected ? 'bg-[#281b13] border border-[#c87a3e]/50 text-white shadow-sm' : 'hover:bg-[#1a130e] text-[#d4a373]'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#c87a3e]/30 text-[#e59850] border border-[#c87a3e]/50'
                          : 'bg-[#1c140f] text-[#a88264] border border-[#c87a3e]/15'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                      <p className="text-xs text-[#a88264] truncate">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1c140f] border border-[#c87a3e]/20 text-[#e59850]">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[#e59850]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#17100b] border-t border-[#c87a3e]/20 flex items-center justify-between text-[11px] font-mono text-[#a88264]">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-[#251a13] rounded mr-1 text-[#f3d5b5] border border-[#c87a3e]/20">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-[#251a13] rounded mr-1 text-[#f3d5b5] border border-[#c87a3e]/20">↓</kbd>
              navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-[#251a13] rounded mr-1 text-[#f3d5b5] border border-[#c87a3e]/20">↵</kbd>
              select
            </span>
          </div>
          <span>
            <kbd className="px-1.5 py-0.5 bg-[#251a13] rounded mr-1 text-[#f3d5b5] border border-[#c87a3e]/20">esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
};
