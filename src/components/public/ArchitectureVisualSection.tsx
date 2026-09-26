import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Database,
  Server,
  Monitor,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  Cpu,
  Lock,
  GitBranch
} from 'lucide-react';

interface ArchLayer {
  id: string;
  number: string;
  name: string;
  tech: string;
  shortDesc: string;
  role: string;
  tradeOffs: string;
  security: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ArchitectureVisualSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('backend');

  const engineeringPipeline = [
    { step: '01', title: 'Problem', desc: 'Identify core business constraints, user pain points & schema invariants.' },
    { step: '02', title: 'Architecture', desc: 'Design domain models, boundary contracts, and cache boundaries.' },
    { step: '03', title: 'API Contract', desc: 'Define predictable REST endpoints, auth guards, and status codes.' },
    { step: '04', title: 'Database', desc: 'Normalize schemas (3NF), composite indexing, and transactional locks.' },
    { step: '05', title: 'Frontend UI', desc: 'Reactive UI components with optimistic updates & accessible UX.' },
    { step: '06', title: 'Testing', desc: 'Automated Postman collections, validation checks, and regression tests.' },
    { step: '07', title: 'Deployment', desc: 'Containerization, environment configs, migration scripts, and monitoring.' }
  ];

  const archLayers: ArchLayer[] = [
    {
      id: 'client',
      number: '01',
      name: 'Client Presentation Layer',
      tech: 'Next.js 14 / React 18 / Tailwind CSS',
      shortDesc: 'Component-driven UI, state management, and optimistic client-side transitions.',
      role: 'Translates user intent into structured HTTP requests. Manages local UI states, client caching, and error boundaries so users never experience catastrophic white screens.',
      tradeOffs: 'Chose React/Next.js for component reusability and SEO pre-rendering capabilities, keeping complex business calculations strictly on the backend to avoid client bloat.',
      security: 'Input sanitization before dispatch, CSRF token attachment on mutated states, and safe HTML rendering.',
      icon: Monitor
    },
    {
      id: 'gateway',
      number: '02',
      name: 'API Gateway & Middleware',
      tech: 'RESTful API / Sanctum / Rate Limiters',
      shortDesc: 'Deterministic JSON contracts, rate throttling, and Bearer token verification.',
      role: 'Guards backend resources from unauthorized traffic, enforces rate limiting (e.g. 60 req/min for auth), parses JWT/Sanctum tokens, and strips malicious payload vectors.',
      tradeOffs: 'Opted for standardized REST conventions (GET, POST, PUT, DELETE) over GraphQL for high HTTP cacheability, predictable server load, and rapid developer onboarding.',
      security: 'CORS policy enforcement, HTTP-only secure cookie tokens, and strict request payload validation.',
      icon: ShieldCheck
    },
    {
      id: 'backend',
      number: '03',
      name: 'Core Application Engine',
      tech: 'Laravel 10 / PHP 8.2+ MVC',
      shortDesc: 'Domain service layers, business rule execution, and queue job dispatchers.',
      role: 'Contains all deterministic business logic, checkout workflows, shopping list synchronizations, and role-based policy gates. Separates controllers from service classes for testability.',
      tradeOffs: 'Why Laravel? Outstanding developer velocity, battle-tested security defaults (SQL injection prevention, mass-assignment guards), and a rock-solid Eloquent ORM.',
      security: 'Strict FormRequest validation, Policy & Gate authorization, and exception masking in production.',
      icon: Server
    },
    {
      id: 'cache',
      number: '04',
      name: 'In-Memory Cache Layer',
      tech: 'Redis 7 / Memory Store',
      shortDesc: 'Sub-millisecond query caching, user session states, and queue backpressure.',
      role: 'Caches frequently accessed verification tables, student credential lookups, and session tokens. Offloads 45% of read traffic away from relational disk storage.',
      tradeOffs: 'Trades slight memory overhead for instant API latencies during concurrent exam result announcements (e.g. SBTE Portal). Uses TTL invalidation on updates.',
      security: 'Password protected Redis socket, memory size caps, and non-sensitive key serialization.',
      icon: Cpu
    },
    {
      id: 'database',
      number: '05',
      name: 'Relational Persistence Layer',
      tech: 'MySQL 8.0 (InnoDB) / Composite Indexes',
      shortDesc: 'ACID-compliant storage, normalized entity schemas, and foreign key integrity.',
      role: 'Serves as the single source of truth. Features strict foreign key constraints, composite B-Tree indexes on query predicates, and transactional rollbacks during multi-step payments.',
      tradeOffs: 'Why MySQL? Proven relational reliability for financial ledgers (Bank Askari) and e-commerce inventory (Livshem). Avoided NoSQL where ACID transactions were essential.',
      security: 'Prepared parameter bindings via PDO, least-privilege DB users, and encrypted backups.',
      icon: Database
    },
    {
      id: 'deployment',
      number: '06',
      name: 'Production & Observability',
      tech: 'Git / CI/CD / Docker / Nginx / Cloud',
      shortDesc: 'Automated build pipeline, migration runners, error logging, and HTTPS termination.',
      role: 'Ensures zero-downtime releases through automated deployment scripts, asset compilation, health checks, and centralized telemetry tracking.',
      tradeOffs: 'Pre-compiles production assets during build time to minimize server CPU overhead during client requests.',
      security: 'TLS 1.3 certificates, strict CSP headers, environment secret separation, and automated audit logs.',
      icon: Cloud
    }
  ];

  const currentLayerData = archLayers.find((l) => l.id === activeLayer) || archLayers[2];

  return (
    <motion.section
      id="architecture"
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 bg-[#080706] border-t border-[#c87a3e]/15 overflow-hidden"
    >
      {/* Background ambient warm leather glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#c87a3e]/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#d97706]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14 text-left"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>02 // ENGINEERING THINKING &amp; ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            How I Think About Building Software
          </h2>
          <p className="mt-3 text-base text-[#e7bc91] leading-relaxed font-normal">
            A disciplined engineering lifecycle: moving deliberately from problem identification to multi-layer system architecture, hardened APIs, and production deployment.
          </p>
        </motion.div>

        {/* Engineering Lifecycle Pipeline */}
        <div className="mb-16">
          <h3 className="text-xs font-mono text-[#d4a373] uppercase tracking-widest mb-4 font-semibold text-left">
            Engineering Thought Process
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {engineeringPipeline.map((item, idx) => (
              <div
                key={item.step}
                className="p-4 rounded-2xl bg-[#15110d]/80 border border-[#c87a3e]/20 text-left hover:border-[#c87a3e]/60 transition-all group shadow-sm backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#e59850]">{item.step}</span>
                  {idx < engineeringPipeline.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-[#a88264] group-hover:text-[#f3d5b5] transition-colors hidden lg:block" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                <p className="text-[11px] text-[#d4a373] leading-snug font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Full Stack Architecture Visualizer in Black & Leather Theme */}
        <div className="rounded-3xl bg-[#15110d]/90 border border-[#c87a3e]/20 p-6 sm:p-8 lg:p-10 shadow-[0_0_50px_-15px_rgba(0,0,0,0.95)] backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#c87a3e]/15 mb-8">
            <div className="text-left">
              <span className="text-xs font-mono text-[#e59850] font-bold uppercase tracking-widest flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#f3d5b5]" />
                <span>Interactive Full Stack Topology</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                Select a System Layer to Inspect Architectural Decisions
              </h3>
            </div>
            <span className="text-xs font-mono text-[#f3d5b5] px-3.5 py-1.5 rounded-full bg-[#281b13] border border-[#c87a3e]/30 self-start md:self-auto font-medium">
              Click any layer below
            </span>
          </div>

          {/* Interactive Topology Stack Diagram */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {archLayers.map((layer) => {
              const Icon = layer.icon;
              const isSelected = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#281b13] border-[#c87a3e] text-white shadow-[0_0_25px_-5px_rgba(200,122,62,0.5)] scale-[1.02]'
                      : 'bg-[#18120e] border-[#c87a3e]/15 text-[#d4a373] hover:text-[#f3d5b5] hover:border-[#c87a3e]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#c87a3e] text-white' : 'bg-[#221812] text-[#d4a373]'
                      }`}>
                        {layer.number}
                      </span>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#f3d5b5]' : 'text-[#a88264]'}`} />
                    </div>
                    <h4 className={`text-xs sm:text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-[#e7bc91]'}`}>
                      {layer.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#e59850] mt-2 truncate block">
                    {layer.tech.split('/')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Layer Deep-Dive Drawer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLayerData.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#0e0b08] border border-[#c87a3e]/20 text-left space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c87a3e]/15">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-[#e59850] font-bold uppercase">
                      Layer {currentLayerData.number}
                    </span>
                    <span className="text-[#a88264]">•</span>
                    <span className="text-xs font-mono text-[#f3d5b5] font-semibold">{currentLayerData.tech}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {currentLayerData.name}
                  </h4>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#281b13] border border-[#c87a3e]/40 text-xs font-mono text-[#f3d5b5] self-start sm:self-auto">
                  Active Architectural Focus
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
                <div className="space-y-2 p-5 rounded-2xl bg-[#15110d] border border-[#c87a3e]/20">
                  <span className="font-mono uppercase text-[10px] text-[#e59850] font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e59850]" />
                    <span>System Role &amp; Function</span>
                  </span>
                  <p className="text-[#e7bc91] leading-relaxed font-normal">
                    {currentLayerData.role}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-[#15110d] border border-[#c87a3e]/20">
                  <span className="font-mono uppercase text-[10px] text-[#f3d5b5] font-bold flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-[#f3d5b5]" />
                    <span>Engineering Trade-Offs &amp; Why</span>
                  </span>
                  <p className="text-[#e7bc91] leading-relaxed font-normal">
                    {currentLayerData.tradeOffs}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-[#15110d] border border-[#c87a3e]/20">
                  <span className="font-mono uppercase text-[10px] text-emerald-400 font-bold flex items-center space-x-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Security &amp; Reliability Policy</span>
                  </span>
                  <p className="text-[#e7bc91] leading-relaxed font-normal">
                    {currentLayerData.security}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};
