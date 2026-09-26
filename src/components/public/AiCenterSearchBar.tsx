import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Search, Code2, Database, Briefcase, Zap, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AiCenterSearchBar: React.FC = () => {
  const { navigateTo } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const quickPrompts = [
    { label: 'Recruiter Fit Check', icon: Briefcase, query: "Evaluate Sameer's match for a Senior Full Stack Developer role" },
    { label: 'Laravel & MySQL Scale', icon: Database, query: "Explain Sameer's experience with MySQL query optimization and Redis caching in Laravel" },
    { label: 'React 19 & Next.js', icon: Code2, query: "What is Sameer's experience with React 19, Next.js App Router, and TypeScript?" },
    { label: 'Availability & Rates', icon: Zap, query: "Is Sameer available for full-time roles or contract projects, and what are his rates?" },
    { label: 'Security & APIs', icon: ShieldCheck, query: "How does Sameer handle REST API security, authentication, and high concurrency?" }
  ];

  const handleExecuteSearch = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) {
      navigateTo('ai-assistant');
      return;
    }

    try {
      sessionStorage.setItem('ai_initial_query', trimmed);
    } catch {
      // Fallback
    }

    navigateTo('ai-assistant');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch(searchQuery);
  };

  return (
    <section className="relative z-30 py-8 px-4 sm:px-6 -mt-8 mb-4 max-w-5xl mx-auto">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[500px] h-[180px] bg-gradient-to-r from-[#c87a3e]/15 via-[#e59850]/20 to-[#c87a3e]/15 blur-3xl rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e140d]/80 border border-[#c87a3e]/30 text-xs font-mono uppercase tracking-wider text-[#e59850] shadow-sm mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#e59850] animate-pulse" />
          <span>Interactive AI Representative • Instant Answers</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f3d5b5]">
          Ask Anything About Sameer&apos;s Engineering & Experience
        </h2>
      </motion.div>

      {/* Center Search Bar with Hover & Focus Glow */}
      <motion.div
        className={`relative group rounded-2xl md:rounded-full p-[1.5px] transition-all duration-300 ${
          isFocused
            ? 'shadow-[0_0_35px_rgba(200,122,62,0.35)] scale-[1.01]'
            : 'hover:shadow-[0_0_25px_rgba(200,122,62,0.2)]'
        }`}
      >
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 rounded-2xl md:rounded-full bg-gradient-to-r from-[#c87a3e]/40 via-[#e59850]/60 to-[#c87a3e]/40 opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Input Bar Form */}
        <form
          onSubmit={onSubmit}
          className="relative flex flex-col md:flex-row items-center gap-2 bg-[#0c0a09]/95 backdrop-blur-xl rounded-2xl md:rounded-full px-4 py-2.5 sm:px-5 sm:py-3 border border-[#c87a3e]/20"
        >
          <div className="flex items-center gap-3 w-full flex-1">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1e140d] border border-[#c87a3e]/40 text-[#e59850] shrink-0">
              <Search className="w-4 h-4 text-[#e59850]" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask Sameer's AI: 'Senior role fit', 'Laravel 11 & MySQL scale', 'Availability'..."
              className="w-full bg-transparent text-[#f3d5b5] placeholder-[#9c8470] text-sm sm:text-base focus:outline-none selection:bg-[#c87a3e]/40"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#2a1c12]">
            <button
              type="button"
              onClick={() => handleExecuteSearch('')}
              className="text-xs font-mono text-[#9c8470] hover:text-[#e59850] px-2.5 py-1.5 rounded-lg hover:bg-[#1e140d] transition-colors"
            >
              Open Full AI
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl md:rounded-full bg-gradient-to-r from-[#c87a3e] to-[#b36329] hover:from-[#d98b4f] hover:to-[#c87a3e] text-[#080706] font-semibold text-sm shadow-md hover:shadow-[0_0_20px_rgba(200,122,62,0.4)] transition-all transform active:scale-95"
            >
              <span>Ask AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>

      {/* Quick Suggested Queries Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
        <span className="text-xs text-[#9c8470] font-mono mr-1">Popular questions:</span>
        {quickPrompts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleExecuteSearch(item.query)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#140e0a]/80 hover:bg-[#1e140d] border border-[#c87a3e]/20 hover:border-[#c87a3e]/50 text-xs text-[#d8c0aa] hover:text-[#f3d5b5] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Icon className="w-3 h-3 text-[#c87a3e]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
