import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Check if reduced motion or already preloaded in this tab
    const hasPreloaded = sessionStorage.getItem('sh_preloaded');
    if (hasPreloaded === 'true') {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    const phaseTimer1 = setTimeout(() => setPhase(1), 350);
    const phaseTimer2 = setTimeout(() => setPhase(2), 700);
    const finishTimer = setTimeout(() => {
      sessionStorage.setItem('sh_preloaded', 'true');
      setIsVisible(false);
      setTimeout(() => onComplete?.(), 300);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="preloader-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070b] text-white select-none px-6"
      >
        {/* Subtle background glow */}
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
          {/* Logo Badge Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/10"
          >
            <span className="font-display font-black text-2xl tracking-tight text-cyan-300">SH</span>
          </motion.div>

          {/* Phase 0 -> Phase 1 -> Phase 2 text reveal */}
          <div className="h-14 flex flex-col items-center justify-center">
            {phase === 0 && (
              <motion.span
                key="phase-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-xs font-mono tracking-widest uppercase text-slate-400"
              >
                INITIALIZING PORTFOLIO
              </motion.span>
            )}

            {phase === 1 && (
              <motion.h1
                key="phase-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-display text-2xl font-bold tracking-tight text-white"
              >
                SAMEER HABIB
              </motion.h1>
            )}

            {phase === 2 && (
              <motion.div
                key="phase-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                  FULL STACK DEVELOPER
                </span>
              </motion.div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-56 mt-8">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1.5">
              <span>LOADING ENVIRONMENT</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
