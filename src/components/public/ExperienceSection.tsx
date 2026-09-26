import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Award
} from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import {
  smoothEase,
  staggerContainer,
  fadeUpVariant,
  softFadeUpVariant,
  cardRevealVariant
} from '../../utils/animationVariants';

export const ExperienceSection: React.FC = () => {
  const { experiences, education } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Intersection Observer for section level entrance
  const [sectionRef, isSectionInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px',
    triggerOnce: true
  });

  const publishedExp = experiences
    .filter((e) => e.published)
    .sort((a, b) => a.order - b.order);

  const publishedEdu = education
    .filter((e) => e.published)
    .sort((a, b) => a.order - b.order);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 bg-[#080706] border-t border-[#c87a3e]/15 overflow-hidden"
    >
      {/* Background ambient warm leather glow that transitions into view */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isSectionInView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: smoothEase }}
        className="pointer-events-none"
      >
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#c87a3e]/12 blur-[140px]" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[140px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Intersection-driven entrance */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(4px)' }}
          animate={
            isSectionInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 32, filter: 'blur(4px)' }
          }
          transition={{ duration: 0.65, ease: smoothEase }}
          className="max-w-3xl mb-16 text-left"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>06 // CAREER TIMELINE &amp; CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Work Experience &amp; <span className="bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="mt-3 text-base text-[#e7bc91] leading-relaxed font-normal">
            A verified trajectory of full-stack web application development and computer science foundations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Work Experience Column */}
          <div className="lg:col-span-8 space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.15, ease: smoothEase }}
              className="text-sm font-mono uppercase tracking-widest text-[#f3d5b5] font-bold flex items-center space-x-2"
            >
              <Briefcase className="w-4 h-4 text-[#e59850]" />
              <span>Professional Experience</span>
            </motion.h3>

            {/* Staggered Timeline Container */}
            <div className="relative border-l-2 border-[#c87a3e]/25 ml-3 space-y-10 pl-6 sm:pl-8">
              {publishedExp.map((exp, idx) => {
                const isExpanded = expandedId === exp.id || exp.current;
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 32, filter: 'blur(4px)' }}
                    animate={
                      isSectionInView
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : { opacity: 0, y: 32, filter: 'blur(4px)' }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + idx * 0.1,
                      ease: smoothEase
                    }}
                    className="relative group"
                  >
                    {/* Timeline Dot with leather accent */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        exp.current
                          ? 'bg-[#c87a3e] border-[#f3d5b5] shadow-[0_0_15px_rgba(200,122,62,0.8)] ring-4 ring-[#c87a3e]/30 animate-pulse'
                          : 'bg-[#15110d] border-[#a88264] group-hover:border-[#c87a3e] group-hover:scale-110'
                      }`}
                    />

                    {/* Experience Card */}
                    <motion.div
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="p-6 sm:p-7 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 group-hover:border-[#c87a3e]/60 transition-all duration-300 shadow-sm hover:shadow-[0_0_30px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl text-left"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-white group-hover:text-[#f3d5b5] transition-colors">
                            {exp.position}
                          </h4>
                          <div className="flex items-center space-x-2 text-sm text-[#e59850] font-semibold mt-0.5">
                            <span>{exp.company}</span>
                            <span className="text-[#a88264]">•</span>
                            <span className="text-xs text-[#d4a373] font-normal">{exp.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {exp.current && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-[10px] font-mono text-emerald-300 font-bold shadow-xs">
                              CURRENT ROLE
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded-full bg-[#281b13] text-xs font-mono text-[#f3d5b5] border border-[#c87a3e]/30 font-medium">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                      </div>

                      {/* Readable description */}
                      <p className="text-sm text-[#e7bc91] leading-relaxed mb-4 font-normal">
                        {exp.description}
                      </p>

                      {/* Responsibilities list */}
                      <div className="space-y-2 mb-5">
                        {exp.responsibilities.slice(0, isExpanded ? exp.responsibilities.length : 2).map((resp, rIdx) => (
                          <div key={rIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#d4a373]">
                            <CheckCircle2 className="w-4 h-4 text-[#e59850] shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>

                      {exp.responsibilities.length > 2 && (
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          className="text-xs font-mono text-[#e59850] hover:text-[#f3d5b5] flex items-center space-x-1 mb-4 font-medium cursor-pointer"
                        >
                          <span>{isExpanded ? 'Show fewer details' : `Show ${exp.responsibilities.length - 2} more deliverables`}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}

                      {/* Technologies Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#c87a3e]/15">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md bg-[#1f1712] text-xs font-mono text-[#f3d5b5] border border-[#c87a3e]/20 font-medium hover:border-[#c87a3e]/60 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Education & Academic Qualifications Column */}
          <div className="lg:col-span-4 space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.25, ease: smoothEase }}
              className="text-sm font-mono uppercase tracking-widest text-[#f3d5b5] font-bold flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4 text-[#e59850]" />
              <span>Academic Education</span>
            </motion.h3>

            <div className="space-y-6">
              {publishedEdu.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                  animate={
                    isSectionInView
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 28, filter: 'blur(4px)' }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.35 + idx * 0.12,
                    ease: smoothEase
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-6 sm:p-7 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 shadow-sm hover:shadow-[0_0_30px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl text-left"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#d4a373] mb-2">
                    <span>{edu.startDate} – {edu.endDate}</span>
                    {edu.grade && (
                      <span className="text-[#f3d5b5] font-bold px-2.5 py-0.5 rounded-full bg-[#281b13] border border-[#c87a3e]/40">
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#f3d5b5] transition-colors">
                    {edu.degree}
                  </h4>

                  <p className="text-sm font-medium text-[#e59850] mb-3">
                    {edu.institution}
                  </p>

                  <p className="text-xs sm:text-sm text-[#e7bc91] leading-relaxed mb-4 font-normal">
                    {edu.description}
                  </p>

                  {/* Academic Discipline */}
                  <div className="pt-3 border-t border-[#c87a3e]/15 flex items-center space-x-2 text-xs text-[#d4a373]">
                    <Award className="w-3.5 h-3.5 text-[#e59850] shrink-0" />
                    <span>Focus: <strong className="text-white font-medium">{edu.field}</strong></span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
