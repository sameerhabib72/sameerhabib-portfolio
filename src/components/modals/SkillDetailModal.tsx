import React from 'react';
import { useData } from '../../context/DataContext';
import { Sparkles, CheckCircle2, Code2, ArrowRight, X } from 'lucide-react';

export const SkillDetailModal: React.FC = () => {
  const { skills, projects, currentSlug, navigateTo } = useData();

  const skill = skills.find((s) => s.slug === currentSlug) || skills[0];
  if (!skill) return null;

  // Find projects using this skill
  const relatedProjects = projects.filter((p) =>
    p.technologies.some((t) => t.toLowerCase().includes(skill.name.toLowerCase()) || skill.name.toLowerCase().includes(t.toLowerCase()))
  );

  return (
    <div
      id="skill-detail-view"
      className="min-h-screen bg-[#080706] text-[#f3d5b5] pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-in fade-in duration-300"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 rounded-full bg-[#c87a3e]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Breadcrumb Bar */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#c87a3e]/20">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#a88264]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#e59850] transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigateTo('home')} className="hover:text-[#e59850] transition-colors cursor-pointer">
              Skills
            </button>
            <span>/</span>
            <span className="text-[#e59850] font-semibold">{skill.name}</span>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1c1510] hover:bg-[#281d16] border border-[#c87a3e]/30 text-xs text-[#f3d5b5] hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4 text-[#e59850]" />
            <span>Close</span>
          </button>
        </div>

        {/* Skill Hero Header */}
        <div className="space-y-4 mb-10 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3d2011]/80 border border-[#c87a3e]/50 text-xs font-mono text-[#e59850] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>TECHNOLOGY PROFILE: {skill.category}</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
              {skill.name}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#3d2011] border border-[#c87a3e]/40 text-[#e59850] font-mono text-sm font-bold shadow-xs">
                {skill.proficiency}% Proficiency
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#1c1510] border border-[#c87a3e]/25 text-[#d4a373] font-mono text-xs">
                {skill.experienceYears}
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="space-y-8 text-left">
          <div className="p-7 rounded-2xl bg-[#120e0b] border border-[#c87a3e]/25 shadow-md space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-[#e59850]" />
              <span>Technology Definition & Practical Role</span>
            </h2>
            <p className="text-sm sm:text-base text-[#d4a373] leading-relaxed">
              {skill.description}
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#120e0b] border border-[#c87a3e]/25 shadow-md space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>How Sameer Uses {skill.name} in Production</span>
            </h2>
            <p className="text-sm sm:text-base text-[#d4a373] leading-relaxed">
              {skill.practicalExperience}
            </p>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Projects Powered by {skill.name}</span>
                <span className="text-xs font-mono text-[#e59850] px-2 py-0.5 rounded bg-[#3d2011] border border-[#c87a3e]/30">
                  {relatedProjects.length}
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigateTo('project-detail', p.slug)}
                    className="p-4 rounded-xl bg-[#120e0b] border border-[#c87a3e]/25 hover:border-[#e59850] hover:bg-[#1a130e] transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#e59850] transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-[#a88264]">{p.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#e59850] shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
