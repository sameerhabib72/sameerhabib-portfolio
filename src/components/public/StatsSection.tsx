import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../../context/DataContext';
import { Briefcase, Layers, Cpu, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  Layers,
  Cpu,
  CheckCircle2,
};

export const StatsSection: React.FC = () => {
  const { stats } = useData();

  const publishedStats = stats
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);

  return (
    <motion.section
      id="stats"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-14 bg-[#080706] border-y border-[#c87a3e]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {publishedStats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || CheckCircle2;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white group-hover:bg-gradient-to-r group-hover:from-[#f3d5b5] group-hover:via-[#e59850] group-hover:to-[#c87a3e] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {stat.number}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-[#281b13] border border-[#c87a3e]/30 flex items-center justify-center text-[#e59850] group-hover:text-[#f3d5b5] group-hover:scale-110 group-hover:border-[#c87a3e]/60 transition-all shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#f3d5b5] leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
