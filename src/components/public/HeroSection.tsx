import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  ArrowRight,
  Sparkles,
  Terminal as TerminalIcon,
  Code2,
  Cpu,
  Globe,
  Database,
  Layers,
  Server,
  FileDown,
  RotateCcw,
  CornerDownLeft,
  ChevronDown
} from 'lucide-react';

interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'success' | 'info';
  text: string;
}

export const HeroSection: React.FC = () => {
  const { heroData, siteSettings, navigateTo, setCvModalOpen, trackEvent, projects } = useData();

  // Active Tab in Code Window
  const [activeWindowTab, setActiveWindowTab] = useState<'code' | 'terminal'>('code');

  // Rotating roles state
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = (heroData?.rotatingRoles && heroData.rotatingRoles.length > 0)
    ? heroData.rotatingRoles
    : [
        'Senior Full Stack Developer',
        'Laravel & PHP Specialist',
        'React & Next.js Engineer',
        'E-Commerce & Systems Architect'
      ];

  const heroBadge = heroData?.badge || "00 // SAMEER HABIB — SENIOR FULL STACK ARCHITECT";
  const heroHeading = heroData?.heading || "Architecting Scalable Web Systems With Craftsmanship.";
  const heroDesc = heroData?.description || "Building modern, scalable web applications with thoughtful UX, clean architecture and reliable engineering. Proven track record across government certification portals, commercial e-commerce platforms, and banking-grade CMS solutions.";
  const primaryCta = heroData?.primaryCtaText || "View Selected Work";
  const secondaryCta = heroData?.secondaryCtaText || "Let's Work Together";

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Mouse Parallax for 3D card
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Interactive Terminal state & commands
  const defaultLogs: TerminalLog[] = [
    { id: '1', type: 'input', text: 'whoami' },
    { id: '2', type: 'output', text: 'sameer-habib — Senior Full Stack Developer (Laravel, PHP, React, Next.js)' },
    { id: '3', type: 'input', text: 'status' },
    { id: '4', type: 'success', text: 'available_for_opportunities = true • Location: Karachi / Remote' },
    { id: '5', type: 'input', text: 'build' },
    { id: '6', type: 'info', text: 'Architecting scalable web apps, e-commerce platforms, & high-throughput APIs.' },
  ];

  const [logs, setLogs] = useState<TerminalLog[]>(defaultLogs);
  const [cliInput, setCliInput] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    trackEvent('terminal_command', { command: cleanCmd });

    const newLogs: TerminalLog[] = [...logs, { id: String(Date.now()), type: 'input', text: cleanCmd }];

    if (cleanCmd === 'clear' || cleanCmd === 'cls') {
      setLogs([]);
      setCliInput('');
      return;
    } else if (cleanCmd === 'help') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'info',
        text: 'Available commands: whoami, status, build, projects, skills, contact, clear'
      });
    } else if (cleanCmd === 'whoami') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: 'Sameer Habib — Full Stack Developer specializing in robust backend architectures & responsive modern frontends.'
      });
    } else if (cleanCmd === 'status') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'success',
        text: `Open to selected full-stack opportunities • Response time < 24h`
      });
    } else if (cleanCmd === 'build') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: 'Flagship: LIVSHEM (E-Commerce Platform) • SBTE Portal (Gov Examination System) • Askari Bank CMS'
      });
    } else if (cleanCmd === 'projects' || cleanCmd === 'ls') {
      const topProjects = projects.slice(0, 4).map((p) => `• ${p.title} (${p.category})`).join('\n');
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: `Active Production Systems:\n${topProjects}`
      });
    } else if (cleanCmd === 'skills') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: 'Core Stack: Laravel 11, PHP 8.3, MySQL, Redis, React.js, Next.js, Docker, Linux (Ubuntu), Tailwind'
      });
    } else if (cleanCmd === 'contact') {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'success',
        text: 'Email: sameerhabib72@gmail.com • Direct Phone/WhatsApp: Available'
      });
    } else {
      newLogs.push({
        id: String(Date.now() + 1),
        type: 'info',
        text: `Command not recognized: '${cleanCmd}'. Type 'help' for valid options.`
      });
    }

    setLogs(newLogs);
    setCliInput('');
    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(cliInput);
  };

  // Tech Ecosystem Floating Badges in Leather accents
  const orbitTechs = [
    { name: 'Laravel 10/11', icon: Server },
    { name: 'PHP 8.2+', icon: Code2 },
    { name: 'React.js', icon: Cpu },
    { name: 'Next.js 14/15', icon: Globe },
    { name: 'MySQL 8', icon: Database },
    { name: 'Redis Cache', icon: Layers }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-12 overflow-hidden bg-[#080706]"
    >
      {/* Background ambient warm leather gradient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#c87a3e]/15 blur-[120px] animate-ambient-glow" />
        <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#d97706]/12 blur-[140px] animate-ambient-glow" style={{ animationDelay: '4s' }} />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-[#964e1c]/15 blur-[130px] animate-ambient-glow" style={{ animationDelay: '2s' }} />
        {/* Subtle dot matrix grid overlay with warm tone */}
        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#c87a3e_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Role, Value Proposition, Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Availability Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#15110d]/90 border border-[#c87a3e]/25 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(200,122,62,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono text-[#f3d5b5] font-medium tracking-wide">
                AVAILABLE FOR NEW OPPORTUNITIES • <span className="text-emerald-400 font-semibold">{siteSettings.availability}</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="text-xs sm:text-sm font-mono tracking-widest text-[#e59850] uppercase font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#c87a3e]" />
                <span>{heroBadge}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.06]">
                {heroHeading}
              </h1>

              {/* Dynamic Rotating Role */}
              <div className="flex items-center space-x-2.5 min-h-[44px]">
                <span className="text-base sm:text-lg font-mono text-[#d4a373] font-medium">Focus Area:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-base sm:text-lg font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#d97706]"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-[#e7bc91] leading-relaxed max-w-2xl font-normal">
              {heroDesc}
            </p>

            {/* Call to Actions in Leather Tone */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <motion.a
                whileHover={{ scale: 1.03, y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                data-cursor="cta"
                data-cursor-text="EXPLORE WORK"
                onClick={() => trackEvent('hero_cta_click', { button: 'projects' })}
                className="group relative inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white font-bold text-sm shadow-[0_0_30px_-5px_rgba(200,122,62,0.5)] hover:shadow-[0_0_40px_0px_rgba(217,119,6,0.6)] transition-all duration-300 cursor-pointer overflow-hidden border border-[#e59850]/40"
              >
                <span className="relative z-10">{primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform relative z-10" />
                <span className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.025, y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                data-cursor="contact"
                data-cursor-text="LET'S TALK"
                onClick={() => trackEvent('hero_cta_click', { button: 'contact' })}
                className="group inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#15110d]/90 hover:bg-[#231a14] border border-[#c87a3e]/30 hover:border-[#e59850] text-[#f3d5b5] hover:text-white font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_-5px_rgba(200,122,62,0.3)] cursor-pointer"
              >
                <span>{secondaryCta}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#e59850] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03, y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackEvent('cv_download', { source: 'hero' });
                  setCvModalOpen(true);
                }}
                data-cursor="cv"
                data-cursor-text="DOWNLOAD CV"
                className="group inline-flex items-center space-x-2 px-4 py-3.5 rounded-full bg-[#15110d]/80 hover:bg-[#231a14] border border-[#c87a3e]/25 hover:border-[#e59850] text-xs font-mono text-[#f3d5b5] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                title="Download Curriculum Vitae"
              >
                <FileDown className="w-4 h-4 text-[#e59850] group-hover:translate-y-0.5 transition-transform" />
                <span>CV</span>
              </motion.button>
            </div>

            {/* Tech Stack Badges */}
            <div className="pt-2">
              <p className="text-xs font-mono text-[#d4a373] uppercase tracking-widest mb-2.5 font-semibold">
                Core Production Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {orbitTechs.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#15110d] border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 text-xs font-mono text-[#f3d5b5] backdrop-blur-md shadow-xs transition-all cursor-default"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#e59850]" />
                      <span>{tech.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Code & CLI Window in Black & Leather Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative flex items-center justify-center perspective-[1000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Interactive 3D Card with Tilt */}
            <div
              className="w-full max-w-lg rounded-2xl bg-[#140f0c]/95 border border-[#c87a3e]/30 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/95 transition-transform duration-200 ease-out flex flex-col"
              style={{
                transform: `rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg) translateZ(10px)`,
              }}
            >
              {/* Window Header with Tabs */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#c87a3e]/20">
                {/* Window Dots & Tabs */}
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center space-x-1 bg-[#0a0705] p-0.5 rounded-lg border border-[#c87a3e]/20">
                    <button
                      onClick={() => setActiveWindowTab('code')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer flex items-center space-x-1 ${
                        activeWindowTab === 'code'
                          ? 'bg-[#281b13] text-[#f3d5b5] border border-[#c87a3e]/50 font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Code2 className="w-3 h-3 text-[#e59850]" />
                      <span>SameerHabib.tsx</span>
                    </button>
                    <button
                      onClick={() => setActiveWindowTab('terminal')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer flex items-center space-x-1 ${
                        activeWindowTab === 'terminal'
                          ? 'bg-[#281b13] text-[#f3d5b5] border border-[#c87a3e]/50 font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <TerminalIcon className="w-3 h-3 text-[#e59850]" />
                      <span>terminal ($)</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {activeWindowTab === 'terminal' && (
                    <button
                      onClick={() => setLogs(defaultLogs)}
                      className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                      title="Reset Terminal"
                      aria-label="Reset Terminal"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                  <div className="flex items-center space-x-1 text-[10px] font-mono text-emerald-300 bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-700/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>online</span>
                  </div>
                </div>
              </div>

              {/* Tab 1: Code Window */}
              {activeWindowTab === 'code' ? (
                <div className="space-y-1 font-mono text-xs text-left overflow-x-auto p-1 leading-relaxed">
                  <div className="text-[#a88264]">// TypeScript Architecture Blueprint</div>
                  <div>
                    <span className="text-[#e59850]">export interface </span>
                    <span className="text-[#f3d5b5] font-bold">SeniorFullStackEngineer </span>
                    <span className="text-slate-400">&#123;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-[#e59850]">name</span>: <span className="text-emerald-300">&apos;Sameer Habib&apos;</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-[#e59850]">role</span>: <span className="text-emerald-300">&apos;Senior Full Stack Developer&apos;</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-[#e59850]">coreStack</span>: [
                  </div>
                  <div className="pl-8 text-emerald-300">
                    &apos;Laravel 10+&apos;, &apos;PHP 8.2+&apos;, &apos;React 18&apos;, &apos;Next.js 14&apos;, &apos;MySQL&apos;
                  </div>
                  <div className="pl-4 text-slate-400">];</div>
                  <div className="pl-4">
                    <span className="text-[#e59850]">engineeringPrinciples</span>: [
                  </div>
                  <div className="pl-8 text-emerald-300 text-[11px]">
                    &apos;Clean MVC separation&apos;,<br />
                    &apos;ACID relational integrity&apos;,<br />
                    &apos;Sub-100ms Redis caching&apos;,<br />
                    &apos;Optimistic UI transitions&apos;
                  </div>
                  <div className="pl-4 text-slate-400">];</div>
                  <div className="pl-4">
                    <span className="text-[#e59850]">status</span>: <span className="text-teal-300">&apos;Open to selected high-impact roles&apos;</span>;
                  </div>
                  <div><span className="text-slate-400">&#125;</span></div>
                  <div className="pt-2 text-[#d4a373] flex items-center space-x-1">
                    <span className="text-[#e59850] font-bold">&gt;</span>
                    <span className="text-[11px] text-[#d4a373]">ready for production deployment</span>
                    <span className="w-2 h-3.5 bg-[#e59850] animate-pulse ml-1 inline-block" />
                  </div>
                </div>
              ) : (
                /* Tab 2: Terminal Window */
                <>
                  <div className="space-y-2.5 font-mono text-xs max-h-56 overflow-y-auto pr-1 text-left scrollbar-thin scrollbar-thumb-white/10">
                    {logs.map((log) => (
                      <div key={log.id} className="flex items-start space-x-2">
                        {log.type === 'input' ? (
                          <>
                            <span className="text-[#e59850] font-bold select-none">$</span>
                            <span className="text-white font-bold">{log.text}</span>
                          </>
                        ) : log.type === 'success' ? (
                          <>
                            <span className="text-emerald-400 font-bold select-none">✓</span>
                            <span className="text-emerald-300 whitespace-pre-line leading-relaxed">{log.text}</span>
                          </>
                        ) : log.type === 'info' ? (
                          <>
                            <span className="text-[#e59850] font-bold select-none">ℹ</span>
                            <span className="text-[#f3d5b5] whitespace-pre-line leading-relaxed">{log.text}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[#d4a373] font-bold select-none">›</span>
                            <span className="text-[#e7bc91] whitespace-pre-line leading-relaxed">{log.text}</span>
                          </>
                        )}
                      </div>
                    ))}
                    <div ref={terminalBottomRef} />
                  </div>

                  {/* Interactive CLI Input Line */}
                  <form onSubmit={handleCommandSubmit} className="mt-3 pt-3 border-t border-[#c87a3e]/20 flex items-center space-x-2">
                    <span className="text-[#e59850] font-mono text-xs font-bold">$</span>
                    <input
                      type="text"
                      value={cliInput}
                      onChange={(e) => setCliInput(e.target.value)}
                      placeholder="type 'whoami', 'status', 'build'..."
                      className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-[#a88264]"
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 rounded bg-[#c87a3e]/20 hover:bg-[#c87a3e]/30 text-[#f3d5b5] text-[10px] font-mono border border-[#c87a3e]/40 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Run</span>
                      <CornerDownLeft className="w-2.5 h-2.5" />
                    </button>
                  </form>

                  {/* Quick Suggestion Command Chips */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] font-mono text-[#d4a373] mr-1">Quick:</span>
                    {['whoami', 'status', 'build', 'projects', 'clear'].map((cmd) => (
                      <button
                        key={cmd}
                        type="button"
                        onClick={() => executeCommand(cmd)}
                        className="px-2 py-0.5 rounded bg-[#1f1712] hover:bg-[#2e221a] text-[#f3d5b5] hover:text-white border border-[#c87a3e]/25 text-[10px] font-mono transition-colors cursor-pointer"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Context Summary Footer */}
              <div className="mt-4 pt-3 border-t border-[#c87a3e]/20 grid grid-cols-2 gap-2.5 text-left">
                <div className="p-2.5 rounded-xl bg-[#1f1712] border border-[#c87a3e]/20">
                  <p className="text-[10px] font-mono uppercase text-[#d4a373]">Current Role</p>
                  <p className="text-xs font-semibold text-white mt-0.5">The Designs Firm</p>
                  <p className="text-[11px] text-[#e59850] font-mono">July 2026 – Present</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1f1712] border border-[#c87a3e]/20">
                  <p className="text-[10px] font-mono uppercase text-[#d4a373]">Flagship System</p>
                  <p className="text-xs font-semibold text-white mt-0.5">LIVSHEM Platform</p>
                  <p className="text-[11px] text-[#e59850] font-mono">Laravel 10 • MySQL</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Infinite Marquee Ticker in Black & Leather Theme */}
        <div className="mt-16 pt-8 border-t border-[#c87a3e]/20 relative overflow-hidden">
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#080706] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#080706] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee py-2 flex items-center gap-8">
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center gap-8 shrink-0">
                {[
                  { text: 'LARAVEL 11 & PHP 8.3', highlight: 'text-[#f3d5b5]' },
                  { text: '99.98% CONCURRENCY SLA', highlight: 'text-emerald-400' },
                  { text: 'REACT 19 & NEXT.JS 15', highlight: 'text-[#e59850]' },
                  { text: 'REDIS IN-MEMORY CACHE', highlight: 'text-[#c87a3e]' },
                  { text: '45% LATENCY REDUCTION', highlight: 'text-emerald-400' },
                  { text: 'MYSQL 8 REPLICATION', highlight: 'text-[#fde68a]' },
                  { text: 'DOCKER CONTAINERIZATION', highlight: 'text-[#d4a373]' },
                  { text: 'ENTERPRISE RBAC & SANCTUM', highlight: 'text-[#f3d5b5]' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    <span className="text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c87a3e]" />
                      <span className={item.highlight}>{item.text}</span>
                    </span>
                    <span className="text-[#c87a3e]/30 text-xs">/</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Scroll Down Prompt */}
        <div className="mt-10 flex flex-col items-center justify-center text-[#d4a373]">
          <a
            href="#what-i-build"
            className="flex flex-col items-center space-y-1.5 text-xs font-mono text-[#d4a373] hover:text-[#f3d5b5] transition-colors"
          >
            <span>Scroll to explore architecture &amp; projects</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#e59850]" />
          </a>
        </div>
      </div>
    </section>
  );
};
