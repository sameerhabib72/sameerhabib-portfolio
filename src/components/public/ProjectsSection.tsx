import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  ArrowUpRight,
  ArrowLeft,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects, navigateTo, trackEvent } = useData();
  const [showAllWorksModal, setShowAllWorksModal] = useState(false);
  const [modalSearch, setModalSearch] = useState('');
  const [modalCategory, setModalCategory] = useState('All');

  // Track ref for horizontal scrolling
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse drag-to-scroll states
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const publishedProjects = projects
    .filter((p) => p.published)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.order - b.order);

  const checkScrollability = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < maxScroll - 15);
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100)));
    } else {
      setScrollProgress(100);
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    checkScrollability();
    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);

    // Support horizontal wheel scrolling directly over the track
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }
      if (Math.abs(e.deltaY) > 0 && el.scrollWidth > el.clientWidth) {
        const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth && e.deltaY > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          el.scrollBy({ left: e.deltaY * 1.2, behavior: 'auto' });
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('scroll', checkScrollability);
      el.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability, publishedProjects.length]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = 580; // exactly 1 work-box width
    el.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = trackRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleOpenProject = (slug: string) => {
    trackEvent('project_view', { slug });
    navigateTo('project-detail', slug);
  };

  const categories = ['All', 'Government / Enterprise', 'Financial / Banking', 'Automotive', 'E-Commerce'];

  const filteredModalProjects = publishedProjects
    .filter((p) => (modalCategory === 'All' ? true : p.category.toLowerCase().includes(modalCategory.toLowerCase())))
    .filter((p) => {
      if (!modalSearch.trim()) return true;
      const q = modalSearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    });

  return (
    <div id="projects" className="work-section">
      {/* Background ambient warm leather glows */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-[#c87a3e]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-[#d97706]/12 blur-[140px] pointer-events-none" />

      <div className="work-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-4">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
              <span>03 // FLAGSHIP CASE STUDIES &amp; ENTERPRISE SYSTEMS</span>
            </div>
            <h2>
              Selected <span>Works</span>
            </h2>
          </div>

          {/* Navigation Controls: Arrows & Progress Indicator */}
          <div className="flex items-center gap-3 self-start sm:self-auto mb-6 sm:mb-8">
            <div className="hidden sm:flex items-center text-xs font-mono text-[#d4a373] mr-2">
              <span>Drag or use arrows</span>
            </div>
            <button
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-[#15110d] hover:bg-[#231a14] border-[#c87a3e]/30 text-white hover:border-[#e59850]'
                  : 'bg-white/[0.02] border-white/[0.06] text-stone-600 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              aria-label="Next project"
              className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-[#15110d] hover:bg-[#231a14] border-[#c87a3e]/30 text-white hover:border-[#e59850]'
                  : 'bg-white/[0.02] border-white/[0.06] text-stone-600 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Continuous Horizontal Track matching redoyanulhaque.me in Black & Leather */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="work-flex overflow-x-auto cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {publishedProjects.slice(0, 8).map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={project.id}
                className={`work-box ${isEven ? 'work-box-even' : ''}`}
              >
                {/* Info Block */}
                <div className="work-info">
                  <div className="work-title">
                    <h3>{String(idx + 1).padStart(2, '0')}</h3>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>

                  <h4>Tools and features</h4>
                  <p>{project.technologies.join(', ')}</p>
                </div>

                {/* Image Block with circular floating arrow button */}
                <div className="work-image">
                  <div
                    className="work-image-in"
                    onClick={() => handleOpenProject(project.slug)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={project.thumbnail || (project.gallery && project.gallery[0])}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="work-link" title="Open Case Study">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End CTA Box */}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all of my enterprise projects and creations</p>
              <button
                onClick={() => setShowAllWorksModal(true)}
                className="see-all-btn"
              >
                See All Works →
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist Progress Indicator */}
        <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#d4a373]">
          <span>01 // START</span>
          <div className="flex-1 mx-4 h-1 rounded-full bg-[#15110d] border border-[#c87a3e]/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#c87a3e] via-[#e59850] to-[#d97706] transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(10, scrollProgress)}%` }}
            />
          </div>
          <span>{String(publishedProjects.length).padStart(2, '0')} // SYSTEMS</span>
        </div>
      </div>

      {/* Full "All Works" Modal Gallery */}
      <AnimatePresence>
        {showAllWorksModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#080706]/98 backdrop-blur-xl overflow-y-auto p-4 sm:p-8 lg:p-12 animate-in fade-in duration-200"
          >
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Modal Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c87a3e]/20 pb-6">
                <div className="text-left">
                  <button
                    onClick={() => setShowAllWorksModal(false)}
                    className="inline-flex items-center space-x-2 text-xs font-mono text-[#e59850] hover:text-[#f3d5b5] transition-colors mb-3 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Scroller</span>
                  </button>
                  <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
                    All Production Systems &amp; Architectures
                  </h1>
                  <p className="text-xs sm:text-sm text-[#d4a373] mt-1 font-mono">
                    {publishedProjects.length} enterprise solutions, SaaS platforms, and APIs
                  </p>
                </div>

                {/* Modal Search & Filter */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative w-64">
                    <Search className="w-4 h-4 text-[#d4a373] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={modalSearch}
                      onChange={(e) => setModalSearch(e.target.value)}
                      placeholder="Search projects..."
                      className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#15110d] border border-[#c87a3e]/20 text-xs text-white placeholder:text-[#a88264] focus:outline-none focus:border-[#e59850]"
                    />
                    {modalSearch && (
                      <button
                        onClick={() => setModalSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setShowAllWorksModal(false)}
                    className="p-2.5 rounded-full bg-[#15110d] border border-[#c87a3e]/20 text-[#f3d5b5] hover:text-white hover:bg-[#231a14] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 text-left">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setModalCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                      modalCategory === cat
                        ? 'bg-[#c87a3e] text-white font-bold shadow-[0_0_15px_-3px_rgba(200,122,62,0.6)]'
                        : 'bg-[#15110d] border border-[#c87a3e]/20 text-[#d4a373] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
                {filteredModalProjects.map((p, idx) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setShowAllWorksModal(false);
                      handleOpenProject(p.slug);
                    }}
                    className="group rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col text-left shadow-sm hover:shadow-[0_0_30px_-8px_rgba(200,122,62,0.35)] backdrop-blur-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                      <img
                        src={p.thumbnail || (p.gallery && p.gallery[0])}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-[#c87a3e]/30 text-[11px] font-mono text-[#f3d5b5] font-bold backdrop-blur-md">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <p className="text-xs font-mono text-[#e59850] uppercase tracking-wider font-semibold">
                          {p.category}
                        </p>
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-[#f3d5b5] transition-colors mt-1">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[#d4a373] mt-2 line-clamp-2 leading-relaxed">
                          {p.shortDescription}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#c87a3e]/15 flex items-center justify-between text-xs font-mono text-[#d4a373]">
                        <span className="truncate max-w-[70%]">
                          {p.technologies.slice(0, 3).join(', ')}
                        </span>
                        <span className="text-[#e59850] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                          View →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
