import React from 'react';
import { motion } from 'motion/react';
import { initialWhyWorkWithMe } from '../../data/initialData';
import { Layers, CheckCircle2, Zap, MessageSquare, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  CheckCircle2,
  Zap,
  MessageSquare,
};

export const WhyWorkWithMe: React.FC = () => {
  return (
    <motion.section
      id="why-work-with-me"
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 bg-[#080706] border-t border-[#c87a3e]/15 overflow-hidden"
    >
      {/* Background ambient warm leather glow */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-[#c87a3e]/12 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16 text-left"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>10 // VALUE PROPOSITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Why Work With <span className="bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] bg-clip-text text-transparent">Sameer</span>
          </h2>
          <p className="mt-3 text-base text-[#e7bc91] leading-relaxed font-normal">
            Disciplined software engineering that delivers maintainable code, predictable timelines, and tangible business value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialWhyWorkWithMe.map((item, idx) => {
            const Icon = iconMap[item.icon] || CheckCircle2;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative p-7 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 shadow-sm hover:shadow-[0_0_30px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#281b13] border border-[#c87a3e]/30 flex items-center justify-center text-[#e59850] group-hover:text-[#f3d5b5] group-hover:scale-110 group-hover:border-[#c87a3e]/60 transition-all mb-5 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#f3d5b5] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#e7bc91] leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
