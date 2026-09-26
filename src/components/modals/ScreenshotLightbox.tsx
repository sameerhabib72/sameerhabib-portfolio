import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';

export interface LightboxImage {
  url: string;
  title: string;
  caption?: string;
  category?: string;
}

export interface ScreenshotLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  projectTitle: string;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  projectTitle
}) => {
  const currentImage = images[currentIndex] || images[0];

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Home') {
        e.preventDefault();
        onIndexChange(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        onIndexChange(images.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext, onIndexChange, images.length]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <div
        id="project-screenshot-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`${projectTitle} Screenshot Lightbox`}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#080706]/95 backdrop-blur-xl p-3 sm:p-6 select-none animate-in fade-in duration-200"
      >
        {/* Top Header Bar */}
        <header
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 pb-3 border-b border-[#c87a3e]/20 text-xs font-mono text-[#a88264] z-20"
        >
          {/* Title & Counter */}
          <div className="flex items-center space-x-3 truncate">
            <div className="flex items-center space-x-2 text-[#e59850] font-semibold truncate">
              <ImageIcon className="w-4 h-4 shrink-0 text-[#e59850]" />
              <span className="truncate max-w-[220px] sm:max-w-md text-white font-display text-sm font-bold">
                {projectTitle}
              </span>
            </div>
            <span className="text-[#8d6e52]">•</span>
            <div className="px-2.5 py-0.5 rounded-full bg-[#3d2011]/80 border border-[#c87a3e]/40 text-[#e59850] font-bold text-[11px] shrink-0">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Desktop Keyboard Hints & Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-[11px] text-[#a88264]">
              <span className="px-1.5 py-0.5 rounded bg-[#1c1510] border border-[#c87a3e]/25 text-[#f3d5b5]">
                ← / →
              </span>
              <span>Navigate</span>
              <span className="text-[#8d6e52]">•</span>
              <span className="px-1.5 py-0.5 rounded bg-[#1c1510] border border-[#c87a3e]/25 text-[#f3d5b5]">
                ESC
              </span>
              <span>Close</span>
            </div>

            {/* Open Original in New Tab */}
            <a
              id="lightbox-open-original-btn"
              href={currentImage.url}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-[#1c1510] hover:bg-[#281d16] border border-[#c87a3e]/30 hover:border-[#e59850] text-[#f3d5b5] hover:text-[#e59850] transition-colors flex items-center space-x-1 text-[11px]"
              title="Open full resolution in new tab"
              aria-label="Open full resolution in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Original</span>
            </a>

            {/* Close Button */}
            <button
              id="lightbox-close-button"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1c1510] hover:bg-[#2e1510] border border-[#c87a3e]/30 hover:border-red-500/50 text-[#f3d5b5] hover:text-red-300 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md"
              title="Close Lightbox (Esc)"
              aria-label="Close fullscreen lightbox"
            >
              <X className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">Close</span>
            </button>
          </div>
        </header>

        {/* Center Stage: Previous Button + Main Image Viewport + Next Button */}
        <div
          onClick={onClose}
          className="flex-1 w-full max-w-7xl mx-auto flex items-center justify-between relative min-h-0 py-2 sm:py-4"
        >
          {/* Previous Arrow Button */}
          {images.length > 1 ? (
            <button
              id="lightbox-prev-button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full bg-[#120e0b]/90 hover:bg-[#241812] border border-[#c87a3e]/40 hover:border-[#e59850] text-[#f3d5b5] hover:text-[#e59850] transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              title="Previous Screenshot (Arrow Left)"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          ) : null}

          {/* Centered Image with Click-to-Dismiss on empty surrounding space */}
          <div
            className="flex-1 h-full w-full flex flex-col items-center justify-center p-2 sm:p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-full max-w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-[#c87a3e]/30 bg-[#0d0a08]"
            >
              <motion.img
                key={currentImage.url}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                src={currentImage.url}
                alt={currentImage.title}
                id="lightbox-current-image"
                className="max-h-[64vh] sm:max-h-[72vh] max-w-[94vw] sm:max-w-[82vw] object-contain rounded-xl select-none"
              />
            </div>

            {/* Image Caption & Title Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-3 text-center max-w-2xl px-4"
            >
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                {currentImage.title}
              </h3>
              {currentImage.caption && (
                <p className="text-xs text-[#d4a373] mt-0.5 leading-relaxed font-normal">
                  {currentImage.caption}
                </p>
              )}
            </div>
          </div>

          {/* Next Arrow Button */}
          {images.length > 1 ? (
            <button
              id="lightbox-next-button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full bg-[#120e0b]/90 hover:bg-[#241812] border border-[#c87a3e]/40 hover:border-[#e59850] text-[#f3d5b5] hover:text-[#e59850] transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              title="Next Screenshot (Arrow Right)"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          ) : null}
        </div>

        {/* Bottom Thumbnail Strip */}
        <footer
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl mx-auto z-20 pt-2 border-t border-[#c87a3e]/20"
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 overflow-x-auto py-1 px-2 scrollbar-none">
            {images.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  id={`lightbox-thumbnail-${idx}`}
                  onClick={() => onIndexChange(idx)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'border-[#e59850] scale-105 shadow-lg shadow-[#c87a3e]/30'
                      : 'border-[#c87a3e]/25 opacity-60 hover:opacity-100 hover:border-[#c87a3e]/50'
                  }`}
                  title={img.title}
                  aria-label={`View screenshot ${idx + 1}: ${img.title}`}
                >
                  <img
                    src={img.url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-14 h-10 sm:w-20 sm:h-12 object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#c87a3e]/20 pointer-events-none" />
                  )}
                  <span className="absolute bottom-0.5 right-1 text-[9px] font-mono font-bold text-white bg-[#080706]/85 px-1 rounded border border-[#c87a3e]/30">
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </footer>
      </div>
    </AnimatePresence>
  );
};
