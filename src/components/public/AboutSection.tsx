import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  CheckCircle2,
  MapPin,
  Mail,
  Calendar,
  Sparkles,
  ArrowRight,
  FileDown,
  Code2
} from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import {
  smoothEase,
  staggerContainer,
  fadeUpVariant,
  softFadeUpVariant,
  cardRevealVariant
} from '../../utils/animationVariants';

export const AboutSection: React.FC = () => {
  const { aboutData, siteSettings, setCvModalOpen } = useData();

  // Intersection Observer for section level entrance
  const [sectionRef, isSectionInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px',
    triggerOnce: true
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 bg-[#080706] border-t border-[#c87a3e]/15 overflow-hidden"
    >
      {/* Background ambient warm leather glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isSectionInView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: smoothEase }}
        className="pointer-events-none"
      >
        <div className="absolute top-1/4 -left-28 w-96 h-96 rounded-full bg-[#c87a3e]/12 blur-[140px]" />
        <div className="absolute bottom-1/3 -right-28 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[140px]" />
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
            <span>07 // ABOUT NARRATIVE &amp; SPECIALTY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Engineering Clean, Scalable <span className="bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] bg-clip-text text-transparent">Digital Architectures</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#e7bc91] leading-relaxed font-normal">
            {aboutData.subheading}
          </p>
        </motion.div>

        {/* 2-Column Staggered Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Narrative, Competencies, and Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-[#e7bc91] text-sm sm:text-base leading-relaxed text-left">
            {aboutData.paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 24, filter: 'blur(3px)' }}
                animate={
                  isSectionInView
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 24, filter: 'blur(3px)' }
                }
                transition={{
                  duration: 0.55,
                  delay: 0.15 + idx * 0.1,
                  ease: smoothEase
                }}
                className="text-[#e7bc91] leading-relaxed font-normal"
              >
                {p}
              </motion.p>
            ))}

            {/* Verified Highlight Points with Nested Stagger */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, delay: 0.35, ease: smoothEase }}
              className="pt-4 space-y-3"
            >
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#e59850] font-bold">
                Key Engineering Competencies
              </h3>
              <div className="space-y-3">
                {aboutData.highlightPoints.map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    animate={
                      isSectionInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -16 }
                    }
                    transition={{
                      duration: 0.45,
                      delay: 0.4 + idx * 0.08,
                      ease: smoothEase
                    }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    className="flex items-start space-x-3 text-sm text-[#f3d5b5] bg-[#15110d]/80 hover:bg-[#1f1712] p-3.5 rounded-2xl border border-[#c87a3e]/20 hover:border-[#c87a3e]/50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#e59850] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Code Philosophy Callout */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={
                isSectionInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 28, scale: 0.98 }
              }
              transition={{ duration: 0.6, delay: 0.55, ease: smoothEase }}
              className="mt-8 p-6 rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/30 relative overflow-hidden shadow-sm backdrop-blur-xl"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#c87a3e]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center space-x-2 text-[#e59850] text-xs font-mono mb-2.5 font-bold">
                <Code2 className="w-4 h-4" />
                <span>ENGINEERING PHILOSOPHY</span>
              </div>
              <blockquote className="text-base font-medium text-[#f3d5b5] italic leading-relaxed">
                &ldquo;{aboutData.codePhilosophy}&rdquo;
              </blockquote>
            </motion.div>
          </div>

          {/* Right: Profile Info Card & Quick Facts */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
              animate={
                isSectionInView
                  ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                  : { opacity: 0, x: 30, filter: 'blur(4px)' }
              }
              transition={{ duration: 0.65, delay: 0.25, ease: smoothEase }}
              className="p-7 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 backdrop-blur-xl space-y-5 shadow-sm hover:shadow-[0_0_30px_-8px_rgba(200,122,62,0.3)] transition-all duration-300"
            >
              <h3 className="text-sm font-mono uppercase tracking-widest text-[#f3d5b5] font-bold border-b border-[#c87a3e]/15 pb-3 flex items-center justify-between">
                <span>Professional Details</span>
                <span className="text-xs text-[#e59850] font-normal">Verified</span>
              </h3>

              {/* Profile Image & Verified Identity Header */}
              {siteSettings.profileImage && (
                <div className="flex items-center gap-3.5 pb-4 border-b border-[#c87a3e]/15">
                  <div className="relative shrink-0">
                    <img
                      src={siteSettings.profileImage}
                      alt={siteSettings.ownerName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#c87a3e]/60 shadow-lg shadow-[#c87a3e]/20"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#15110d] flex items-center justify-center" title="Active & Available">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    </span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-white text-sm tracking-tight">{siteSettings.ownerName}</h4>
                    <p className="text-xs text-[#e59850] font-mono">{siteSettings.roleTitle}</p>
                    <span className="inline-block mt-0.5 text-[10px] text-[#a88264] font-mono">Senior Engineer • Pakistan</span>
                  </div>
                </div>
              )}

              {/* Details List */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#d4a373] flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#e59850]" />
                    <span>Location:</span>
                  </span>
                  <span className="text-white font-semibold">{siteSettings.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#d4a373] flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[#e59850]" />
                    <span>Email:</span>
                  </span>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="text-[#f3d5b5] hover:underline font-mono text-xs font-medium"
                  >
                    {siteSettings.email}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#d4a373] flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#e59850]" />
                    <span>Experience:</span>
                  </span>
                  <span className="text-white font-semibold">3+ Years Commercial</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#d4a373]">Current Role:</span>
                  <span className="text-[#e59850] font-semibold">Senior Full Stack Developer</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#d4a373]">Availability:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-xs text-emerald-300 font-mono font-bold">
                    ● {siteSettings.availability}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#c87a3e]/15 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCvModalOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white font-bold text-xs tracking-wide transition-all duration-300 shadow-[0_0_25px_-5px_rgba(200,122,62,0.5)] cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Active CV</span>
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02, y: -1.5 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-full bg-[#201813] hover:bg-[#2a201a] text-[#f3d5b5] hover:text-white text-xs font-semibold border border-[#c87a3e]/30 hover:border-[#c87a3e]/70 transition-all duration-200 cursor-pointer"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#e59850]" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
