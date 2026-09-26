import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../../context/DataContext';
import { Sparkles } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const { processSteps } = useData();

  const publishedSteps = processSteps
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);

  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 bg-[#080706] border-t border-[#c87a3e]/15 overflow-hidden"
    >
      {/* Subtle Background Warm Leather Glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-[#c87a3e]/12 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16 text-left"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>09 // EXECUTION METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Development <span className="bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] bg-clip-text text-transparent">Process</span>
          </h2>
          <p className="mt-3 text-base text-[#e7bc91] leading-relaxed font-normal">
            A structured 6-stage engineering workflow ensuring scalable backends, validated schemas, and seamless launches.
          </p>
        </motion.div>

        {/* Steps Grid with Animated Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {publishedSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative p-7 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 shadow-sm hover:shadow-[0_0_30px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl text-left"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#281b13] border border-[#c87a3e]/40 text-[#f3d5b5] shadow-xs">
                    {step.stepNumber}
                  </span>
                  <span className="text-[11px] font-mono text-[#d4a373] uppercase tracking-wider font-semibold">
                    Stage {step.order}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#f3d5b5] transition-colors mb-2.5">
                  {step.title}
                </h3>

                {/* High contrast readable description */}
                <p className="text-sm text-[#e7bc91] leading-relaxed mb-5 font-normal">
                  {step.description}
                </p>

                {/* Sub-deliverables */}
                <ul className="space-y-2 pt-4 border-t border-[#c87a3e]/15">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-[#f3d5b5]">
                      <span className="text-[#e59850] font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
