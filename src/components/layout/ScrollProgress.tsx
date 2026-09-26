import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, MessageSquare, Sparkles } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
        setIsVisible(window.scrollY > 280);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Circular progress math
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* Top Fixed Warm Leather Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#080706]/40 z-50 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[#964e1c] via-[#c87a3e] to-[#e59850] shadow-[0_0_12px_rgba(200,122,62,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Bottom-Right Interactive Widget */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-2.5"
          >
            {/* Quick Contact Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={scrollToContact}
              className="p-3 rounded-full bg-[#15110d]/95 hover:bg-[#201813] text-[#f3d5b5] border border-[#c87a3e]/30 hover:border-[#c87a3e]/70 shadow-xl shadow-black/80 backdrop-blur-md transition-all cursor-pointer group relative"
              title="Quick Message / Inquiries"
              aria-label="Jump to Contact Form"
            >
              <MessageSquare className="w-4 h-4 text-[#e59850]" />
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#15110d]/95 text-[11px] font-mono font-medium text-[#f3d5b5] border border-[#c87a3e]/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                Let&apos;s Connect
              </span>
            </motion.button>

            {/* Back to Top Button with Circular Progress Ring */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={scrollToTop}
              className="relative p-3 rounded-full bg-[#15110d]/95 hover:bg-[#201813] text-[#f3d5b5] hover:text-white border border-[#c87a3e]/30 hover:border-[#c87a3e]/70 shadow-xl shadow-black/80 backdrop-blur-md transition-all cursor-pointer group"
              title={`Scroll to Top (${Math.round(scrollProgress)}%)`}
              aria-label="Scroll back to top"
            >
              {/* Circular SVG Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="text-white/5"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="text-[#e59850] transition-all duration-150 ease-out"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              <ArrowUp className="w-4 h-4 text-[#e59850] group-hover:-translate-y-0.5 transition-transform" />

              {/* Tooltip Percentage */}
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#15110d]/95 text-[10px] font-mono text-[#f3d5b5] border border-[#c87a3e]/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                {Math.round(scrollProgress)}% • Top
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
