import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  Server,
  Database,
  Layers,
  Cpu,
  Sparkles,
  Search,
  Code2,
  Terminal,
  Activity,
  Wrench
} from 'lucide-react';

// Reliable Devicon SVG CDN mapping
const DEVICON_MAP: Record<string, string> = {
  laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  php: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  nginx: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  vite: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
  bash: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
  cplusplus: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  sqlite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
};

// 4 Architectural disciplines matching redoyanulhaque.me in Black & Leather theme
interface Discipline {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  metrics: { label: string; value: string }[];
  stackTags: string[];
}

const DISCIPLINES: Discipline[] = [
  {
    id: 'backend',
    tag: 'CORE ARCHITECTURE',
    title: 'Enterprise Backend & Microservices',
    subtitle: 'High-Concurrency Laravel, Reverb & Secure REST APIs',
    description:
      'Architecting resilient backend systems using the modern Laravel ecosystem (Reverb WebSockets, Sanctum, Passport). Designed for government compliance, Askari Bank standards, and zero data leakage under heavy concurrent loads.',
    icon: Server,
    accentColor: 'from-[#b4652a]/20 to-[#c87a3e]/10 border-[#c87a3e]/30 text-[#e59850]',
    metrics: [
      { label: 'Production REST APIs', value: '15+' },
      { label: 'P95 Latency Target', value: '<50ms' },
      { label: 'Auth Protocols', value: 'Sanctum / OAuth2' },
    ],
    stackTags: ['Laravel 11', 'PHP 8.3+', 'Reverb WebSockets', 'Sanctum', 'Passport', 'REST APIs'],
  },
  {
    id: 'database',
    tag: 'DATA LAYER OPTIMIZATION',
    title: 'Database Architecture & Query Tuning',
    subtitle: 'Schema Normalization, Composite Indexing & Redis Caching',
    description:
      'Eliminating database bottlenecks through 3NF schema normalization, composite B-Tree indexing, execution plan profiling, and in-memory Redis caching layers. Slashing database query latencies by 45% on enterprise workloads.',
    icon: Database,
    accentColor: 'from-[#d97706]/20 to-[#b45309]/10 border-[#d97706]/30 text-[#f59e0b]',
    metrics: [
      { label: 'Latency Cut', value: '45%' },
      { label: 'Normalization', value: '3NF ACID' },
      { label: 'Caching Tier', value: 'Redis In-Memory' },
    ],
    stackTags: ['MySQL 8.0', 'Redis Caching', 'PostgreSQL', 'Composite Indexing', 'EXPLAIN Profiling'],
  },
  {
    id: 'frontend',
    tag: 'CLIENT EXPERIENCE',
    title: 'Dynamic Reactive Web Applications',
    subtitle: 'React.js, Next.js & Utility-First Tailwind CSS',
    description:
      'Engineering high-fidelity user interfaces with React, Next.js, and TypeScript. Styled with utility-first Tailwind CSS and brought to life with 60 FPS micro-interactions, responsive cross-device fidelity, and accessible UI patterns.',
    icon: Layers,
    accentColor: 'from-[#c87a3e]/20 to-[#964e1c]/10 border-[#c87a3e]/30 text-[#f3d5b5]',
    metrics: [
      { label: 'Engagement Lift', value: '+30%' },
      { label: 'UI Frame Budget', value: '60 FPS' },
      { label: 'Framework Stack', value: 'React / Next.js' },
    ],
    stackTags: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    id: 'devops',
    tag: 'INFRASTRUCTURE & RELIABILITY',
    title: 'Cloud DevOps & Production Reliability',
    subtitle: 'Docker Containers, Linux Hardening & CI/CD Pipelines',
    description:
      'Hardening production Linux (Ubuntu) server environments, containerizing microservices with Docker, automating deployment test suites via GitHub Actions, and configuring high-throughput Nginx reverse proxies with SSL termination.',
    icon: Cpu,
    accentColor: 'from-amber-600/20 to-orange-600/10 border-amber-600/30 text-amber-400',
    metrics: [
      { label: 'Deployments', value: 'Zero-Downtime' },
      { label: 'Workflows', value: 'Automated CI/CD' },
      { label: 'Host Protection', value: 'Hardened Linux' },
    ],
    stackTags: ['Docker', 'Linux (Ubuntu)', 'Nginx Reverse Proxy', 'GitHub Actions', 'GitOps'],
  },
];

export const SkillsSection: React.FC = () => {
  const { navigateTo, skills } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Grouped tech categories matching redoyanulhaque.me in Black & Leather theme
  const categorizedGroups = useMemo(() => {
    const published = skills.filter((s) => s.published);
    return [
      {
        id: 'languages',
        title: 'Languages',
        description: 'Core programming and markup languages for scalable systems',
        icon: Code2,
        skills: published.filter(
          (s) =>
            s.name.toLowerCase().includes('php') ||
            s.name.toLowerCase().includes('javascript') ||
            s.name.toLowerCase().includes('typescript') ||
            s.name.toLowerCase().includes('python') ||
            s.name.toLowerCase().includes('html') ||
            s.name.toLowerCase().includes('css') ||
            s.name.toLowerCase().includes('bash') ||
            (s.category === 'Frontend' && (s.name.includes('HTML') || s.name.includes('JavaScript')))
        ),
      },
      {
        id: 'frameworks',
        title: 'Frameworks & Libraries',
        description: 'Modern full-stack application frameworks and frontend libraries',
        icon: Layers,
        skills: published.filter(
          (s) =>
            s.name.toLowerCase().includes('laravel') ||
            s.name.toLowerCase().includes('react') ||
            s.name.toLowerCase().includes('next') ||
            s.name.toLowerCase().includes('tailwind') ||
            s.name.toLowerCase().includes('ajax') ||
            s.category === 'Backend' ||
            (s.category === 'Frontend' && !s.name.includes('HTML') && !s.name.includes('JavaScript'))
        ),
      },
      {
        id: 'databases',
        title: 'Databases & In-Memory Caching',
        description: 'High-throughput relational stores and in-memory caches',
        icon: Database,
        skills: published.filter(
          (s) =>
            s.name.toLowerCase().includes('mysql') ||
            s.name.toLowerCase().includes('redis') ||
            s.name.toLowerCase().includes('postgresql') ||
            s.category === 'Database'
        ),
      },
      {
        id: 'tools',
        title: 'Tools, Platforms & DevOps',
        description: 'Containerization, version control, and production Linux environments',
        icon: Wrench,
        skills: published.filter(
          (s) =>
            s.name.toLowerCase().includes('docker') ||
            s.name.toLowerCase().includes('linux') ||
            s.name.toLowerCase().includes('git') ||
            s.name.toLowerCase().includes('postman') ||
            s.name.toLowerCase().includes('nginx') ||
            s.category === 'DevOps' ||
            (s.category === 'Tools' && !s.name.toLowerCase().includes('ai') && !s.name.toLowerCase().includes('prompt'))
        ),
      },
      {
        id: 'ai',
        title: 'AI-Powered Workflow & Tooling',
        description: 'Supercharging development velocity and precision via AI tools',
        icon: Sparkles,
        skills: published.filter(
          (s) =>
            s.name.toLowerCase().includes('ai') ||
            s.name.toLowerCase().includes('copilot') ||
            s.name.toLowerCase().includes('cursor') ||
            s.name.toLowerCase().includes('prompt') ||
            s.name.toLowerCase().includes('deepseek')
        ),
      },
    ];
  }, [skills]);

  const categoriesList = useMemo(() => {
    return [
      { label: 'All Stack', value: 'All' },
      { label: 'Languages', value: 'languages' },
      { label: 'Frameworks', value: 'frameworks' },
      { label: 'Databases', value: 'databases' },
      { label: 'DevOps & Tools', value: 'tools' },
      { label: 'AI Workflow', value: 'ai' },
    ];
  }, []);

  const getSkillIcon = (name: string, iconName: string) => {
    const key = name.toLowerCase();
    for (const [devKey, url] of Object.entries(DEVICON_MAP)) {
      if (key.includes(devKey)) {
        return (
          <img
            src={url}
            alt={name}
            className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        );
      }
    }
    return <Code2 className="w-6 h-6 text-[#e59850] group-hover:scale-110 transition-transform duration-300" />;
  };

  return (
    <div id="skills" className="techstack-section">
      {/* Background ambient warm leather glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#c87a3e]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#d97706]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ============================================================ */}
      {/* 1. WHAT I DO: ARCHITECTURAL DISCIPLINES                      */}
      {/* ============================================================ */}
      <section className="techstack-container mb-24">
        <div className="text-left mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>04 // WHAT I DO</span>
          </div>
          <div className="techstack-header">
            <h2>
              What I <span>Do</span>
            </h2>
          </div>
          <p className="text-base text-[#e7bc91] leading-relaxed font-normal max-w-3xl">
            Specialized in high-concurrency Laravel backends, Askari Bank compliant security modules, database query optimization cutting latency by 45%, and dynamic React/Next.js interfaces.
          </p>
        </div>

        {/* 4 Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {DISCIPLINES.map((discipline, idx) => {
            const Icon = discipline.icon;
            return (
              <motion.div
                key={discipline.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="tech-category-box flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#f3d5b5] bg-[#2a1d15] border border-[#c87a3e]/40 px-3 py-1 rounded-full shadow-xs">
                      {discipline.tag}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#1c1510] border border-[#c87a3e]/30 flex items-center justify-center text-[#e59850] group-hover:text-amber-300 transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#f3d5b5] transition-colors">
                    {discipline.title}
                  </h3>
                  <p className="text-xs font-mono text-[#e59850] mt-1 mb-4 font-medium">
                    {discipline.subtitle}
                  </p>

                  <p className="text-sm text-[#e7bc91] leading-relaxed font-normal">
                    {discipline.description}
                  </p>

                  {/* Quantitative Metrics */}
                  <div className="grid grid-cols-3 gap-2 my-6 pt-5 border-t border-[#c87a3e]/15">
                    {discipline.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="text-left">
                        <div className="text-base sm:text-lg font-mono font-bold text-white">
                          {m.value}
                        </div>
                        <div className="text-[11px] font-mono text-[#d4a373] leading-tight mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-[#c87a3e]/15 flex flex-wrap gap-1.5">
                  {discipline.stackTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-[#17110d] border border-[#c87a3e]/20 text-[11px] font-mono text-[#d4a373]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. TECH STACK: CATEGORIZED GRID (matching redoyanulhaque.me) */}
      {/* ============================================================ */}
      <section className="techstack-container">
        {/* Section Header matching redoyanulhaque.me in Black & Leather */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-3 shadow-xs">
              <Terminal className="w-3.5 h-3.5 text-[#e59850]" />
              <span>05 // TECH STACK &amp; TOOLS</span>
            </div>
            <div className="techstack-header">
              <h2>
                Tech <span>Stack</span>
              </h2>
            </div>
            <p className="text-base text-[#e7bc91] leading-relaxed font-normal max-w-2xl">
              Languages, frameworks, databases, and modern developer tooling powering enterprise solutions.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center space-x-2.5 bg-[#15110d] border border-[#c87a3e]/25 px-4 py-2.5 rounded-full text-xs font-mono text-[#f3d5b5] self-start md:self-auto backdrop-blur-md">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span><strong>{skills.filter((s) => s.published).length}</strong> Verified Technologies</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#c87a3e]/15">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categoriesList.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#c87a3e] text-white font-bold shadow-[0_0_18px_-3px_rgba(200,122,62,0.6)]'
                      : 'bg-[#15110d] border border-[#c87a3e]/20 text-[#d4a373] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#d4a373] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g. Laravel)..."
              className="w-full bg-[#15110d] border border-[#c87a3e]/25 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-[#a88264] focus:outline-none focus:border-[#e59850] transition-colors font-mono"
            />
          </div>
        </div>

        {/* Categorized Tech Groups Grid */}
        <div className="space-y-10 text-left">
          {categorizedGroups
            .filter((group) => {
              if (activeCategory === 'All') return true;
              return activeCategory === group.id;
            })
            .map((group) => {
              const GroupIcon = group.icon;

              const filteredGroupSkills = group.skills.filter((s) => {
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase();
                return (
                  s.name.toLowerCase().includes(q) ||
                  s.description.toLowerCase().includes(q) ||
                  s.category.toLowerCase().includes(q)
                );
              });

              if (filteredGroupSkills.length === 0) return null;

              return (
                <div
                  key={group.id}
                  className="tech-category-box"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#c87a3e]/15 gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-[#e59850]">
                        <GroupIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-white">
                          {group.title}
                        </h3>
                        <p className="text-xs text-[#d4a373] font-mono mt-0.5">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-[#f3d5b5] bg-[#281b13] border border-[#c87a3e]/40 px-3 py-1 rounded-full self-start sm:self-auto">
                      {filteredGroupSkills.length} Technologies
                    </span>
                  </div>

                  {/* Skills Pills / Cards Grid matching redoyanulhaque.me in Black & Leather */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                    {filteredGroupSkills.map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => navigateTo('skill-detail', skill.slug)}
                        className="tech-skill-card group"
                        title={skill.description}
                      >
                        <div className="shrink-0 flex items-center justify-center w-8 h-8">
                          {getSkillIcon(skill.name, skill.iconName)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-sm font-semibold text-white group-hover:text-[#f3d5b5] transition-colors truncate">
                              {skill.name}
                            </span>
                            {skill.featured && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#c87a3e]/20 text-[#f3d5b5] border border-[#c87a3e]/40 font-bold shrink-0">
                                CORE
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-[#d4a373]">
                            <span>{skill.experienceYears}</span>
                            <span className="text-[#e59850] font-bold">{skill.proficiency}%</span>
                          </div>

                          {/* Mini progress line */}
                          <div className="w-full h-1 rounded-full bg-white/[0.06] mt-1.5 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#c87a3e] via-[#e59850] to-[#d97706] rounded-full"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};
