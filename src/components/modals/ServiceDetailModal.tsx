import React from 'react';
import { useData } from '../../context/DataContext';
import { Sparkles, CheckCircle2, X, Briefcase, Mail } from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const { services, currentSlug, navigateTo } = useData();

  const service = services.find((s) => s.slug === currentSlug) || services[0];
  if (!service) return null;

  return (
    <div
      id="service-detail-view"
      className="min-h-screen bg-[#080706] text-[#f3d5b5] pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-in fade-in duration-300"
    >
      {/* Background ambient leather glow */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 rounded-full bg-[#c87a3e]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#c87a3e]/20">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#a88264]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#e59850] transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigateTo('home')} className="hover:text-[#e59850] transition-colors cursor-pointer">
              Services
            </button>
            <span>/</span>
            <span className="text-[#e59850] font-semibold">{service.title}</span>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1c1510] hover:bg-[#281d16] border border-[#c87a3e]/30 text-xs text-[#f3d5b5] hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4 text-[#e59850]" />
            <span>Close</span>
          </button>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-10 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3d2011]/80 border border-[#c87a3e]/50 text-xs font-mono text-[#e59850] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>SPECIALIZED SERVICE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-[#d4a373] leading-relaxed max-w-3xl">
            {service.description}
          </p>
        </div>

        {/* Details & Deliverables */}
        <div className="space-y-8 text-left">
          <div className="p-7 rounded-2xl bg-[#120e0b] border border-[#c87a3e]/25 shadow-md space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-[#e59850]" />
              <span>Scope of Delivery & Architecture</span>
            </h2>
            <p className="text-sm sm:text-base text-[#f3d5b5]/90 leading-relaxed">
              {service.detailedContent}
            </p>
          </div>

          {/* Features Checkboxes */}
          <div className="p-7 rounded-2xl bg-[#120e0b] border border-[#c87a3e]/25 shadow-md space-y-4">
            <h3 className="text-base font-bold text-white">Included Capabilities & Guarantees</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#f3d5b5]">
                  <CheckCircle2 className="w-4 h-4 text-[#e59850] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="p-6 rounded-2xl bg-[#120e0b] border border-[#c87a3e]/25 flex flex-wrap items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-xs font-mono text-[#a88264] uppercase">Primary Stack</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {service.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[#241812] text-xs font-mono text-[#e59850] border border-[#c87a3e]/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              onClick={() => navigateTo('home')}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#b4652a] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white font-bold text-xs shadow-[0_4px_20px_rgba(200,122,62,0.35)] transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire About This Service</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
