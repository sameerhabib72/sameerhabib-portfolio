import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { generateProjectMeta, useSeoMeta } from '../../utils/seoMeta';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Calendar,
  User,
  Share2,
  X,
  Maximize2,
  ZoomIn
} from 'lucide-react';
import { ScreenshotLightbox, LightboxImage } from './ScreenshotLightbox';

export const ProjectCaseStudyModal: React.FC = () => {
  const { projects, currentSlug, siteSettings, navigateTo, showToast } = useData();

  const project = projects.find((p) => p.slug === currentSlug) || projects[0];

  const seoMeta = useMemo(() => {
    return project ? generateProjectMeta(project, siteSettings) : null;
  }, [project, siteSettings]);

  useSeoMeta(seoMeta);

  if (!project) return null;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  // Consolidate project screenshots for the lightbox
  const allScreenshots = useMemo<LightboxImage[]>(() => {
    if (!project) return [];
    const list: LightboxImage[] = [];
    if (project.thumbnail) {
      list.push({
        url: project.thumbnail,
        title: `${project.title} — Primary Architectural Overview`,
        caption: 'Main production environment interface & core viewport layout'
      });
    }
    if (project.gallery && project.gallery.length > 0) {
      project.gallery.forEach((imgUrl, idx) => {
        if (!list.some((item) => item.url === imgUrl)) {
          list.push({
            url: imgUrl,
            title: `${project.title} — Interface Screenshot 0${idx + 1}`,
            caption: `System module visual and functional user flow documentation (${idx + 1} of ${project.gallery.length})`
          });
        }
      });
    }
    return list;
  }, [project]);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Calculate Next & Prev projects
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Project link copied to clipboard!', 'success');
    }
  };

  return (
    <div
      id="project-case-study-view"
      className="min-h-screen bg-[#080706] text-[#f3d5b5] pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-in fade-in duration-300"
    >
      {/* Background ambient leather & amber glow */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 rounded-full bg-[#c87a3e]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-[#964e1c]/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Navigation & Breadcrumbs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#c87a3e]/20">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#a88264]">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-[#e59850] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-[#e59850] transition-colors cursor-pointer"
            >
              Projects
            </button>
            <span>/</span>
            <span className="text-[#e59850] font-semibold truncate max-w-[200px]">{project.title}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#1c1510] hover:bg-[#281d16] border border-[#c87a3e]/30 text-xs text-[#f3d5b5] hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#e59850]" />
              <span>Share</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#1c1510] hover:bg-[#281d16] border border-[#c87a3e]/30 text-xs text-[#f3d5b5] hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <X className="w-4 h-4 text-[#e59850]" />
              <span>Close Case Study</span>
            </button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 mb-10 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3d2011]/80 border border-[#c87a3e]/50 text-xs font-mono text-[#e59850] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>CASE STUDY: {project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] font-medium font-mono">
            {project.subtitle}
          </p>

          <p className="text-base sm:text-lg text-[#d4a373] leading-relaxed max-w-3xl font-normal">
            {project.shortDescription}
          </p>
        </div>

        {/* Project Metadata Overview Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#120e0b]/90 border border-[#c87a3e]/30 backdrop-blur-xl mb-12 text-xs shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          <div>
            <span className="font-mono text-[#a88264] uppercase text-[10px]">Client / Scope</span>
            <p className="font-semibold text-white mt-1 text-sm">{project.client}</p>
          </div>
          <div>
            <span className="font-mono text-[#a88264] uppercase text-[10px]">Role</span>
            <p className="font-semibold text-[#e59850] mt-1 text-sm">{project.role}</p>
          </div>
          <div>
            <span className="font-mono text-[#a88264] uppercase text-[10px]">Timeline / Year</span>
            <p className="font-semibold text-white mt-1 text-sm">{project.year}</p>
          </div>
          <div className="flex items-center space-x-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#b4652a] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white font-bold text-xs shadow-[0_4px_20px_rgba(200,122,62,0.4)] transition-all cursor-pointer"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-[#1c1510] hover:bg-[#281d16] border border-[#c87a3e]/30 text-[#f3d5b5] hover:text-white transition-all shadow-xs"
                title="GitHub Repo"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Main Hero Visual / Thumbnail with Fullscreen Lightbox Trigger */}
        <div
          id="hero-screenshot-container"
          role="button"
          tabIndex={0}
          onClick={() => openLightbox(0)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(0);
            }
          }}
          aria-label={`View ${project.title} hero screenshot in fullscreen lightbox`}
          className="group relative rounded-3xl overflow-hidden border border-[#c87a3e]/30 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#120e0b] max-h-[480px] cursor-zoom-in transition-all duration-300 hover:border-[#e59850] hover:shadow-[0_20px_50px_rgba(200,122,62,0.25)] focus:outline-hidden"
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />

          {/* Hover Overlay Affordance */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080706]/90 via-[#080706]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#e59850] bg-[#120e0b]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#c87a3e]/50">
              <ZoomIn className="w-4 h-4 text-[#e59850]" />
              <span>Click to view in fullscreen lightbox</span>
            </div>
            <div className="p-2.5 rounded-full bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white font-bold shadow-lg">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Core Case Study Sections */}
        <div className="space-y-16 text-left">
          {/* Detailed Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center space-x-3">
              <span className="text-sm font-mono text-[#e59850] px-2.5 py-1 rounded-lg bg-[#3d2011]/80 border border-[#c87a3e]/40">
                01
              </span>
              <span>Project Overview & Context</span>
            </h2>
            <p className="text-[#d4a373] leading-relaxed text-base sm:text-lg">
              {project.longDescription}
            </p>
          </section>

          {/* Problem vs Solution */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-7 rounded-2xl bg-[#2a110a]/50 border border-red-900/40 shadow-md">
              <div className="flex items-center space-x-2 text-red-400 font-mono text-xs uppercase font-bold mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>The Architectural Problem</span>
              </div>
              <p className="text-sm text-[#f3d5b5]/90 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#102416]/50 border border-emerald-900/40 shadow-md">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs uppercase font-bold mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Engineering Solution</span>
              </div>
              <p className="text-sm text-[#f3d5b5]/90 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Key Features Breakdown */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center space-x-3">
              <span className="text-sm font-mono text-[#e59850] px-2.5 py-1 rounded-lg bg-[#3d2011]/80 border border-[#c87a3e]/40">
                02
              </span>
              <span>Key Functional Capabilities</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-4 rounded-xl bg-[#120e0b] border border-[#c87a3e]/25 hover:border-[#c87a3e]/50 transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#e59850] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#f3d5b5]">{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Architecture Diagram */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center space-x-3">
                <span className="text-sm font-mono text-[#e59850] px-2.5 py-1 rounded-lg bg-[#3d2011]/80 border border-[#c87a3e]/40">
                  03
                </span>
                <span>System Architecture & Data Flow</span>
              </h2>
              <span className="text-xs font-mono text-[#e59850] px-2.5 py-1 rounded-md bg-[#3d2011]/60 border border-[#c87a3e]/30">Interactive Model</span>
            </div>

            <div className="p-8 rounded-3xl bg-[#100c09] border border-[#c87a3e]/30 relative overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10 items-center">
                {project.architectureNodes.map((node, idx) => (
                  <React.Fragment key={idx}>
                    <div className="p-5 rounded-2xl bg-[#17110d] border border-[#c87a3e]/30 text-center hover:border-[#e59850] transition-colors shadow-md">
                      <div className="w-8 h-8 rounded-full bg-[#3d2011] text-[#e59850] border border-[#c87a3e]/40 font-mono text-xs flex items-center justify-center mx-auto mb-2 font-bold">
                        0{idx + 1}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{node.title}</h4>
                      <p className="text-[11px] text-[#a88264] leading-tight mb-2">{node.description}</p>
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#241812] text-[#e59850] border border-[#c87a3e]/25">
                        {node.tech}
                      </span>
                    </div>

                    {idx < project.architectureNodes.length - 1 && (
                      <div className="hidden md:flex justify-center text-[#e59850] font-mono">
                        <ArrowRight className="w-5 h-5 animate-pulse" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* Development Challenges & Technical Solutions */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center space-x-3">
              <span className="text-sm font-mono text-[#e59850] px-2.5 py-1 rounded-lg bg-[#3d2011]/80 border border-[#c87a3e]/40">
                04
              </span>
              <span>Challenges & Engineering Trade-offs</span>
            </h2>
            <div className="p-6 rounded-2xl bg-[#120e0b] border border-[#c87a3e]/25 text-sm text-[#d4a373] leading-relaxed shadow-md">
              {project.challenges}
            </div>
          </section>

          {/* Screenshots Gallery if available with Fullscreen Lightbox Triggers */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center space-x-3">
                  <span className="text-sm font-mono text-[#e59850] px-2.5 py-1 rounded-lg bg-[#3d2011]/80 border border-[#c87a3e]/40">
                    05
                  </span>
                  <span>Interface Visuals</span>
                </h2>
                <span className="text-xs font-mono text-[#d4a373]">Click image to expand in lightbox</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.gallery.map((img, idx) => {
                  const targetIndex = allScreenshots.findIndex((s) => s.url === img);
                  const effectiveIndex = targetIndex >= 0 ? targetIndex : idx;

                  return (
                    <div
                      key={idx}
                      id={`gallery-screenshot-${idx}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => openLightbox(effectiveIndex)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openLightbox(effectiveIndex);
                        }
                      }}
                      aria-label={`View screenshot ${idx + 1} in fullscreen lightbox`}
                      className="group relative rounded-2xl overflow-hidden border border-[#c87a3e]/25 shadow-lg bg-[#120e0b] cursor-zoom-in hover:border-[#e59850] hover:shadow-[0_10px_30px_rgba(200,122,62,0.2)] transition-all duration-300 focus:outline-hidden"
                    >
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#080706]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
                        <div className="self-end p-2 rounded-lg bg-[#17110d]/90 border border-[#c87a3e]/30 text-[#e59850]">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                        <div className="flex items-center space-x-1.5 text-[11px] font-mono text-[#e59850] bg-[#17110d]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#c87a3e]/40 w-fit">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Fullscreen View</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Results & Business Outcomes */}
          <section className="p-8 rounded-3xl bg-gradient-to-br from-[#241812] via-[#1a120c] to-[#120e0b] border border-[#c87a3e]/40 shadow-xl space-y-3">
            <span className="text-xs font-mono uppercase text-[#e59850] font-bold">
              06. Business Result & Performance
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Measurable Project Impact
            </h3>
            <p className="text-sm sm:text-base text-[#f3d5b5] leading-relaxed">
              {project.result}
            </p>
          </section>

          {/* Prev / Next Project Navigation Bar */}
          <div className="pt-12 border-t border-[#c87a3e]/20 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={() => navigateTo('project-detail', prevProject.slug)}
              className="p-6 rounded-2xl bg-[#120e0b] border border-[#c87a3e]/20 hover:border-[#c87a3e]/50 hover:bg-[#1a130e] text-left transition-all group cursor-pointer shadow-xs"
            >
              <span className="text-[10px] font-mono uppercase text-[#a88264] flex items-center space-x-1 mb-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform text-[#e59850]" />
                <span>Previous Case Study</span>
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#e59850] transition-colors">
                {prevProject.title}
              </h4>
              <p className="text-xs text-[#a88264] mt-0.5">{prevProject.category}</p>
            </button>

            <button
              onClick={() => navigateTo('project-detail', nextProject.slug)}
              className="p-6 rounded-2xl bg-[#120e0b] border border-[#c87a3e]/20 hover:border-[#c87a3e]/50 hover:bg-[#1a130e] text-right transition-all group cursor-pointer shadow-xs"
            >
              <span className="text-[10px] font-mono uppercase text-[#a88264] flex items-center justify-end space-x-1 mb-1">
                <span>Next Case Study</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#e59850]" />
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#e59850] transition-colors">
                {nextProject.title}
              </h4>
              <p className="text-xs text-[#a88264] mt-0.5">{nextProject.category}</p>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Screenshot Lightbox */}
      <ScreenshotLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allScreenshots}
        currentIndex={activeLightboxIndex}
        onIndexChange={setActiveLightboxIndex}
        projectTitle={project.title}
      />
    </div>
  );
};
