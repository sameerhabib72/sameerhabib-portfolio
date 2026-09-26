import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  Code2,
  Server,
  FileCode,
  Layers,
  ShoppingCart,
  Network,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { smoothEase } from '../../utils/animationVariants';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Server,
  FileCode,
  Layers,
  ShoppingCart,
  Network,
};

export const ServicesSection: React.FC = () => {
  const { services } = useData();

  // Intersection Observer for section level entrance
  const [sectionRef, isSectionInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px',
    triggerOnce: true
  });

  const publishedServices = services
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);

  const handleInquire = (_serviceTitle: string) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 bg-[#080706] border-t border-[#c87a3e]/15 overflow-hidden"
    >
      {/* Background ambient warm leather glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isSectionInView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: smoothEase }}
        className="pointer-events-none"
      >
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#c87a3e]/12 blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[140px]" />
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
            <span>08 // SOLUTIONS &amp; EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Engineering <span className="bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="mt-3 text-base text-[#e7bc91] leading-relaxed font-normal">
            Specialized web application development tailored for startups, agencies, and enterprise systems.
          </p>
        </motion.div>

        {/* Services Grid with Intersection-driven staggered entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedServices.map((service, idx) => {
            const Icon = serviceIcons[service.iconName] || Code2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 32, filter: 'blur(4px)' }}
                animate={
                  isSectionInView
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 32, filter: 'blur(4px)' }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.15 + idx * 0.08,
                  ease: smoothEase
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative p-7 sm:p-8 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_0_30px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl text-left"
              >
                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-2xl bg-[#281b13] border border-[#c87a3e]/30 flex items-center justify-center text-[#e59850] group-hover:text-[#f3d5b5] group-hover:scale-110 transition-all mb-6 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#f3d5b5] transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  {/* High contrast readable description */}
                  <p className="text-sm text-[#e7bc91] leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Key Features List */}
                  <div className="space-y-2.5 mb-6">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#f3d5b5]">
                        <CheckCircle2 className="w-4 h-4 text-[#e59850] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#c87a3e]/15 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.04, x: 2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleInquire(service.title)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#e59850] hover:text-[#f3d5b5] transition-colors cursor-pointer group/link"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </motion.button>

                  <span className="text-[11px] font-mono text-[#d4a373] font-medium">
                    Production Grade
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
