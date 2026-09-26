import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  Sparkles,
  Send,
  Bot,
  User as UserIcon,
  RefreshCw,
  Copy,
  Check,
  ArrowLeft,
  Briefcase,
  Layers,
  Code2,
  Cpu,
  Mail,
  FileDown,
  Terminal,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Zap,
  History,
  PanelLeftClose,
  PanelLeftOpen,
  Plus
} from 'lucide-react';
import {
  AiHistorySidebar,
  ChatSession,
  ChatMessage,
  AssistantMode
} from './AiHistorySidebar';
import { recordAiQueryInFirestore } from '../../services/firebaseDb';

const SESSIONS_STORAGE_KEY = 'sh_ai_assistant_sessions_v2';

function generateDefaultSessions(): ChatSession[] {
  const now = new Date();
  const today = now.toISOString();
  const yesterday = new Date(now.getTime() - 86400000).toISOString();
  const threeDaysAgo = new Date(now.getTime() - 3 * 86400000).toISOString();
  const fiveDaysAgo = new Date(now.getTime() - 5 * 86400000).toISOString();
  const eightDaysAgo = new Date(now.getTime() - 8 * 86400000).toISOString();

  return [
    {
      id: 'session-recruiter-1',
      title: "Senior Full Stack Role Fit Evaluation",
      preview: "Strong fit across Laravel, React, Next.js, and high-load MySQL architecture...",
      mode: 'recruiter',
      createdAt: today,
      updatedAt: today,
      messages: [
        {
          id: 'm-1',
          role: 'user',
          content: "Evaluate Sameer's match for a Senior Full Stack Developer role",
          timestamp: '10:15 AM'
        },
        {
          id: 'm-2',
          role: 'assistant',
          content: `### Senior Full Stack Developer Qualification Analysis ⚡\n\n**Candidate:** Sameer Habib\n**Commercial Experience:** 3+ Years in Production Environments\n\n- **Backend Depth:** Advanced Laravel 10/11, custom RESTful APIs, Eloquent performance tuning, Redis caching layers, and robust MySQL indexing.\n- **Frontend Mastery:** React 19, Next.js (App Router), TypeScript, responsive Tailwind CSS architecture, and performant state management.\n- **Production Deliverables:** Proven track record leading enterprise portals including Askari Bank CMS and Livshem E-Commerce.\n- **Collaboration:** Experienced with Agile workflows, Git branch protection, peer code reviews, and CI/CD pipelines.\n\n**Verdict:** Strongly recommended for Senior Full Stack, Backend Specialist, or Technical Lead roles.`,
          timestamp: '10:15 AM',
          model: 'gemini-3.8-flash'
        }
      ]
    },
    {
      id: 'session-arch-1',
      title: "MySQL Indexing & Redis Caching Architecture",
      preview: "Strategic indexing, avoiding N+1 queries with eager loading, and multi-tier Redis cache...",
      mode: 'architect',
      createdAt: today,
      updatedAt: today,
      messages: [
        {
          id: 'm-3',
          role: 'user',
          content: "How does Sameer handle MySQL indexing and avoid N+1 query bottlenecks in Laravel?",
          timestamp: '09:30 AM'
        },
        {
          id: 'm-4',
          role: 'assistant',
          content: `### High-Throughput Database Optimization in Laravel 🛠️\n\n1. **Composite & Covering Indexes:** Indexing high-cardinality foreign keys and composite filters (e.g. \`status, created_at\`) to ensure zero-disk temporary table scans.\n2. **Eliminating N+1 Queries:** Enforcing strict eager loading via \`with()\` relations, using Laravel's \`Model::preventLazyLoading()\` in development environments.\n3. **Redis Caching Layer:** Caching frequently accessed read-heavy objects with tagged cache invalidation upon model mutation events.\n4. **Database Query Profiling:** Continuous monitoring using Laravel Telescope, MySQL Slow Query Logs, and EXPLAIN query execution plan inspections.`,
          timestamp: '09:31 AM',
          model: 'gemini-3.8-flash'
        }
      ]
    },
    {
      id: 'session-client-1',
      title: "Askari Bank CMS Multi-Role Architecture",
      preview: "Granular role-based access control (RBAC), audit trails, and bank-grade security...",
      mode: 'client',
      createdAt: yesterday,
      updatedAt: yesterday,
      messages: [
        {
          id: 'm-5',
          role: 'user',
          content: "Can you explain the architecture Sameer designed for the Askari Bank CMS portal?",
          timestamp: '04:20 PM'
        },
        {
          id: 'm-6',
          role: 'assistant',
          content: `### Askari Bank Administrative Portal Case Study 🏦\n\n- **Security & RBAC:** Implemented granular permissions matrix with role-based policies, audit trails for every mutation, and strict CSRF & session validation.\n- **Data Integrity:** Strict input sanitization, database transactions for multi-step updates, and automated schema migrations.\n- **Admin Experience:** Intuitive dashboard with dynamic metrics, exportable audit reports, and responsive access for branch managers.`,
          timestamp: '04:21 PM',
          model: 'gemini-3.8-flash'
        }
      ]
    },
    {
      id: 'session-arch-2',
      title: "Livshem E-Commerce Platform Architecture",
      preview: "Real-time stock synchronization, race condition prevention, and checkout conversion...",
      mode: 'architect',
      createdAt: threeDaysAgo,
      updatedAt: threeDaysAgo,
      messages: [
        {
          id: 'm-7',
          role: 'user',
          content: "What tech stack did Sameer propose and execute for Livshem E-Commerce?",
          timestamp: '02:10 PM'
        },
        {
          id: 'm-8',
          role: 'assistant',
          content: `### Livshem E-Commerce Platform Architecture 🛒\n\n- **Core Stack:** Laravel API backend paired with React frontend for fluid sub-second page transitions.\n- **Inventory Synchronization:** Pessimistic database locking during checkout transitions to prevent double-selling limited stock.\n- **Performance:** CDN edge caching for static catalog media, asynchronous invoice generation via Laravel Queues.`,
          timestamp: '02:11 PM',
          model: 'gemini-3.8-flash'
        }
      ]
    },
    {
      id: 'session-interview-1',
      title: "REST API Concurrency & Throttling",
      preview: "Token bucket rate limiting, Redis distributed locking, and idempotent endpoints...",
      mode: 'interview',
      createdAt: fiveDaysAgo,
      updatedAt: fiveDaysAgo,
      messages: [
        {
          id: 'm-9',
          role: 'user',
          content: "Walk me through how you design RESTful APIs for high concurrency and protect against abuse",
          timestamp: '11:00 AM'
        },
        {
          id: 'm-10',
          role: 'assistant',
          content: `### High-Concurrency REST API Architecture ⚡\n\n- **Rate Limiting:** IP and Token-based throttling using Redis-backed token bucket algorithms.\n- **Idempotency Keys:** Unique idempotency tokens for payment and creation endpoints to safeguard against duplicate requests.\n- **Stateless Authentication:** Secure JWT / Sanctum tokens with short TTLs and refresh rotation.\n- **Asynchronous Offloading:** CPU-intensive tasks (email, PDF generation, webhooks) queued via Redis workers.`,
          timestamp: '11:01 AM',
          model: 'gemini-3.8-flash'
        }
      ]
    },
    {
      id: 'session-stack-1',
      title: "React 19 Server Components Paradigm",
      preview: "Server vs Client Component boundaries, data-fetching streaming, and bundle reduction...",
      mode: 'architect',
      createdAt: eightDaysAgo,
      updatedAt: eightDaysAgo,
      messages: [
        {
          id: 'm-11',
          role: 'user',
          content: "Explain Sameer's approach to state management in React 19 vs Next.js App Router",
          timestamp: '03:45 PM'
        },
        {
          id: 'm-12',
          role: 'assistant',
          content: `### React 19 & Next.js App Router State Paradigm ⚛️\n\n- **Server-First Mindset:** Keep heavy computations and initial data queries on the server to minimize client-side JavaScript payloads.\n- **Granular Client Boundaries:** Only attach \`'use client'\` to interactive leaves (forms, animations, dropdowns).\n- **URL-Driven State:** Utilize URL query parameters for search, filtering, and pagination to ensure shareable, bookmarkable state without global state bloat.`,
          timestamp: '03:46 PM',
          model: 'gemini-3.8-flash'
        }
      ]
    }
  ];
}

export const AiAssistantCenter: React.FC = () => {
  const {
    siteSettings,
    skills,
    projects,
    experiences,
    navigateTo,
    setCvModalOpen,
    showToast
  } = useData();

  // Sessions and History state
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return generateDefaultSessions();
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    return sessions[0]?.id || 'default-session';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mode, setMode] = useState<AssistantMode>('general');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const active = sessions.find((s) => s.id === activeSessionId) || sessions[0];
    return active ? active.messages : [];
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const initialQueryCheckedRef = useRef(false);

  // Sync sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch {
      // Storage quota fallback
    }
  }, [sessions]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Prompt suggestions based on selected mode
  const quickPrompts: Record<AssistantMode, string[]> = {
    general: [
      "Give me a 60-second summary of Sameer's background and core stack",
      "What are Sameer's most impressive projects built with Laravel and React?",
      "Is Sameer available for full-time employment or contract projects?",
      "What sets Sameer apart from other Full Stack Developers?"
    ],
    recruiter: [
      "Evaluate Sameer's match for a Senior Full Stack Developer role",
      "Describe Sameer's experience with code reviews, testing, and team leadership",
      "What are Sameer's strongest competencies across backend and frontend?",
      "Where is Sameer located and what is his availability timeline?"
    ],
    client: [
      "What tech stack would Sameer propose for a high-traffic e-commerce platform?",
      "Can Sameer build an end-to-end custom CMS or business portal from scratch?",
      "How does Sameer manage project delivery, communication, and milestones?",
      "How can I get an estimate and timeline for my upcoming project?"
    ],
    architect: [
      "How does Sameer handle MySQL indexing and avoid N+1 query bottlenecks in Laravel?",
      "Explain Sameer's approach to state management in React 19 vs Next.js App Router",
      "When does Sameer recommend microservices vs a modular monolith?",
      "How does Sameer design RESTful APIs for high concurrency and caching?"
    ],
    interview: [
      "Tell me about a challenging technical bug you encountered in production and how you fixed it",
      "How do you design a database schema for an order processing system with high volume?",
      "How do you ensure web application security against SQL injection and CSRF?",
      "Walk me through your development workflow from feature branch to deployment"
    ]
  };

  // Switch to a chosen session
  const handleSelectSession = (session: ChatSession) => {
    setActiveSessionId(session.id);
    setMessages(session.messages);
    setMode(session.mode);
  };

  // Start a fresh consultation session
  const handleNewSession = useCallback(() => {
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const welcomeMessage: ChatMessage = {
      id: `welcome-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      role: 'assistant',
      content: `### New Consultation Started ⚡\n\nAsk anything about Sameer Habib's engineering stack, architecture, case studies, or availability.\n\nSelect a mode above or enter a question to begin.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'gemini-3.8-flash'
    };

    const newSession: ChatSession = {
      id: newSessionId,
      title: 'New Consultation',
      preview: 'Ask anything about Sameer Habib...',
      mode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [welcomeMessage]
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setMessages([welcomeMessage]);
    showToast('Started new consultation thread', 'info');
  }, [mode, showToast]);

  // Delete a specific session
  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      if (id === activeSessionId) {
        if (filtered.length > 0) {
          setActiveSessionId(filtered[0].id);
          setMessages(filtered[0].messages);
          setMode(filtered[0].mode);
        } else {
          // If all deleted, generate a new one
          setTimeout(handleNewSession, 0);
        }
      }
      return filtered;
    });
    showToast('Conversation deleted', 'info');
  };

  // Clear all history
  const handleClearAllSessions = () => {
    if (window.confirm('Are you sure you want to clear all consultation history?')) {
      localStorage.removeItem(SESSIONS_STORAGE_KEY);
      const defaults = generateDefaultSessions();
      setSessions(defaults);
      setActiveSessionId(defaults[0].id);
      setMessages(defaults[0].messages);
      showToast('Conversation history reset', 'info');
    }
  };

  // Send message and update active session
  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputMessage).trim();
    if (!message || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessagesList = [...messages, userMessage];
    setMessages(newMessagesList);
    setInputMessage('');
    setIsLoading(true);

    // Prepare context payload from real portfolio data
    const contextPayload = {
      ownerName: siteSettings.ownerName,
      roleTitle: siteSettings.roleTitle,
      location: siteSettings.location,
      email: siteSettings.email,
      phone: siteSettings.phone,
      availability: siteSettings.availability,
      githubUrl: siteSettings.githubUrl,
      linkedinUrl: siteSettings.linkedinUrl,
      skillsSummary: skills.map((s) => `${s.name} (${s.category}, ${s.proficiency}%)`).join(', '),
      projectsSummary: projects
        .map((p) => `${p.title} (${p.category}): ${p.subtitle}. Tech: ${p.technologies.join(', ')}`)
        .join('; '),
      experienceSummary: experiences
        .map((e) => `${e.position} at ${e.company} (${e.startDate} - ${e.endDate}): ${e.description}`)
        .join('; ')
    };

    let assistantReply = '';
    let replyModel = 'gemini-3.8-flash';

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          mode,
          context: contextPayload,
          history: messages.slice(-6).map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      assistantReply = data.reply || "I couldn't generate a response at this moment.";
      replyModel = data.model || 'gemini-3.8-flash';
    } catch {
      // Graceful fallback response
      let fallbackText = `### Insights from Sameer Habib's Engineering Portfolio ⚡\n\n`;
      const lower = message.toLowerCase();
      if (lower.includes('hire') || lower.includes('availab') || lower.includes('rate') || lower.includes('contact')) {
        fallbackText += `**Availability Status:** ${siteSettings.availability || 'Available for Full-Time & Contract Roles'}\n\n- **Email:** \`${siteSettings.email}\`\n- **Phone:** \`${siteSettings.phone}\`\n- **Location:** ${siteSettings.location}\n\nFeel free to send an email directly or schedule a discovery call!`;
      } else if (lower.includes('stack') || lower.includes('tech') || lower.includes('skill')) {
        fallbackText += `**Core Tech Stack:**\n- **Backend:** Laravel 10/11, PHP 8+, Eloquent ORM, REST APIs, Redis Caching\n- **Frontend:** React 19, Next.js (App Router), TypeScript, Tailwind CSS\n- **Data:** MySQL, PostgreSQL, Query Optimization, Indexing strategies\n- **DevOps:** Docker, CI/CD, Git, Linux VPS, Nginx`;
      } else if (lower.includes('project') || lower.includes('work') || lower.includes('case')) {
        fallbackText += `**Selected Production Systems:**\n1. **Livshem E-Commerce Platform:** High-conversion e-commerce engine with inventory synchronization and custom cart flows.\n2. **Askari Bank CMS Portal:** Mission-critical administrative portal with multi-role access control (RBAC).\n3. **SBTE Examination & Certification Portal:** High-throughput portal handling thousands of concurrent candidate records.`;
      } else {
        fallbackText += `Sameer Habib is a Senior Full Stack Developer with 3+ years of production experience across **Laravel, React, Next.js, and MySQL**. You can reach him directly at **${siteSettings.email}** or explore his case studies in the Projects section.`;
      }
      assistantReply = fallbackText;
      replyModel = 'portfolio-intelligence';
    } finally {
      setIsLoading(false);
    }

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      role: 'assistant',
      content: assistantReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: replyModel
    };

    const finalMessagesList = [...newMessagesList, assistantMessage];
    setMessages(finalMessagesList);

    // Update or create active session in history
    setSessions((prev) => {
      const existingIdx = prev.findIndex((s) => s.id === activeSessionId);
      const sessionTitle =
        existingIdx !== -1 && prev[existingIdx].title !== 'New Consultation'
          ? prev[existingIdx].title
          : message.length > 42
          ? message.slice(0, 42) + '...'
          : message;

      const previewText = assistantReply.replace(/###|\*\*|`/g, '').slice(0, 80) + '...';

      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          title: sessionTitle,
          preview: previewText,
          updatedAt: new Date().toISOString(),
          messages: finalMessagesList,
          mode
        };
        // Bring active session to top
        const item = updated.splice(existingIdx, 1)[0];
        return [item, ...updated];
      } else {
        const newSess: ChatSession = {
          id: activeSessionId,
          title: sessionTitle,
          preview: previewText,
          mode,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages: finalMessagesList
        };
        return [newSess, ...prev];
      }
    });
  };

  // Initial check for query passed from home page
  useEffect(() => {
    if (!initialQueryCheckedRef.current) {
      initialQueryCheckedRef.current = true;
      try {
        const pendingQuery = sessionStorage.getItem('ai_initial_query');
        if (pendingQuery && pendingQuery.trim()) {
          sessionStorage.removeItem('ai_initial_query');
          // Auto start a new session for search query
          const searchSessionId = `search-${Date.now()}`;
          setActiveSessionId(searchSessionId);
          setTimeout(() => {
            handleSendMessage(pendingQuery.trim());
          }, 350);
        }
      } catch {
        // Safe catch
      }
    }
  }, []);

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast('Response copied to clipboard', 'info');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return (
    <div
      id="ai-assistant-center-page"
      className="min-h-screen bg-[#080706] text-[#f3d5b5] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-in fade-in duration-300"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#c87a3e]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#964e1c]/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#c87a3e]/20">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#a88264]">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-[#e59850] transition-colors cursor-pointer flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>
            <span>/</span>
            <span className="text-[#e59850] font-semibold flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
              <span>AI Assistant Center</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Toggle History Sidebar Button */}
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs ${
                isSidebarOpen
                  ? 'bg-[#2a170d] border-[#c87a3e]/60 text-[#e59850]'
                  : 'bg-[#140e0a] border-[#c87a3e]/30 text-[#d4a373] hover:text-white'
              }`}
              title={isSidebarOpen ? 'Hide History Sidebar' : 'Show History Sidebar'}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-3.5 h-3.5" />
              ) : (
                <PanelLeftOpen className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {isSidebarOpen ? 'Hide History' : 'Search & History'}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1e1510] text-[#c87a3e] border border-[#c87a3e]/20">
                {sessions.length}
              </span>
            </button>

            {/* Quick New Chat */}
            <button
              onClick={handleNewSession}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#1c1510] hover:bg-[#281d16] border border-[#c87a3e]/30 text-xs text-[#f3d5b5] hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5 shadow-xs"
              title="Start New Thread"
            >
              <Plus className="w-3.5 h-3.5 text-[#e59850]" />
              <span className="hidden md:inline">New Thread</span>
            </button>

            <div className="hidden lg:inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#3d2011]/80 border border-[#c87a3e]/40 text-xs font-mono text-[#e59850]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gemini 3.8 Flash</span>
            </div>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="space-y-2 mb-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#3d2011]/80 border border-[#c87a3e]/50 text-xs font-mono text-[#e59850] shadow-sm">
            <Bot className="w-3.5 h-3.5 text-[#e59850]" />
            <span>SAMEER HABIB TECHNICAL INTELLIGENCE HUB</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
            Interactive AI Technical Representative
          </h1>

          <p className="text-xs sm:text-sm text-[#d4a373] max-w-3xl leading-relaxed">
            Search previous conversations, ask technical inquiries, or evaluate Sameer&apos;s verified
            experience across Laravel, React 19, Next.js, and high-concurrency MySQL architectures.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 p-2 rounded-2xl bg-[#120e0b] border border-[#c87a3e]/25">
          <div className="flex items-center space-x-1.5 px-3 py-1 text-xs font-mono uppercase tracking-wider text-[#a88264]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#e59850]" />
            <span className="hidden sm:inline">Mode:</span>
          </div>

          {[
            { id: 'general', label: 'General Q&A', icon: Bot },
            { id: 'recruiter', label: 'Recruiter & Role Fit', icon: Briefcase },
            { id: 'client', label: 'Client Scoping', icon: Layers },
            { id: 'architect', label: 'Architecture', icon: Code2 },
            { id: 'interview', label: 'Tech Interview', icon: Terminal }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id as AssistantMode)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white font-bold shadow-md shadow-[#c87a3e]/30'
                    : 'text-[#d4a373] hover:text-[#f3d5b5] hover:bg-[#1c1510]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Grid: Scrollable History Sidebar + Chat Workspace + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Scrollable & Searchable History Sidebar */}
          {isSidebarOpen && (
            <div className="lg:col-span-4 xl:col-span-4">
              <AiHistorySidebar
                sessions={sessions}
                activeSessionId={activeSessionId}
                onSelectSession={handleSelectSession}
                onNewSession={handleNewSession}
                onDeleteSession={handleDeleteSession}
                onClearAllSessions={handleClearAllSessions}
                isOpen={isSidebarOpen}
                onToggleOpen={() => setIsSidebarOpen((prev) => !prev)}
              />
            </div>
          )}

          {/* Main Chat Workspace */}
          <div
            className={`flex flex-col h-[720px] bg-[#120e0b] border border-[#c87a3e]/30 rounded-3xl shadow-2xl overflow-hidden ${
              isSidebarOpen ? 'lg:col-span-8 xl:col-span-8' : 'lg:col-span-12 xl:col-span-9'
            }`}
          >
            {/* Chat Workspace Header */}
            <div className="px-5 py-3.5 bg-[#17110d] border-b border-[#c87a3e]/20 flex items-center justify-between gap-3 text-left">
              <div className="min-w-0">
                <p className="text-xs font-mono text-[#a88264] uppercase tracking-wider">
                  Active Consultation:
                </p>
                <h3 className="text-sm font-bold text-white truncate">
                  {activeSession?.title || 'Consultation with Sameer AI'}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#241812] border border-[#c87a3e]/30 text-[#e59850] capitalize">
                  {mode} mode
                </span>
              </div>
            </div>

            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#c87a3e]/30">
              {messages.map((msg, mIdx) => (
                <div
                  key={msg.id ? `${msg.id}-${mIdx}` : `msg-${mIdx}`}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  } space-y-2`}
                >
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-[#a88264]">
                    {msg.role === 'assistant' ? (
                      <>
                        <div className="w-5 h-5 rounded-full bg-[#3d2011] border border-[#c87a3e]/40 flex items-center justify-center text-[#e59850]">
                          <Bot className="w-3 h-3" />
                        </div>
                        <span className="font-semibold text-[#e59850]">Sameer AI Agent</span>
                        {msg.model && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1c1510] text-[#a88264] border border-[#c87a3e]/20">
                            {msg.model}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="font-semibold text-[#f3d5b5]">You</span>
                        <div className="w-5 h-5 rounded-full bg-[#241812] border border-[#c87a3e]/40 flex items-center justify-center text-[#f3d5b5]">
                          <UserIcon className="w-3 h-3" />
                        </div>
                      </>
                    )}
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`relative p-5 rounded-2xl max-w-[92%] sm:max-w-[85%] text-left text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#271c14] border border-[#c87a3e]/40 text-[#f3d5b5] rounded-tr-xs'
                        : 'bg-[#17110d] border border-[#c87a3e]/25 text-[#f3d5b5] rounded-tl-xs shadow-md'
                    }`}
                  >
                    <div className="prose prose-invert prose-amber max-w-none text-sm space-y-3 font-sans">
                      {msg.content.split('\n\n').map((paragraph, pIdx) => {
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={pIdx} className="text-base font-bold text-white mt-2 mb-1">
                              {paragraph.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                          const items = paragraph.split('\n');
                          return (
                            <ul key={pIdx} className="list-disc pl-5 space-y-1 text-[#e7bc91]">
                              {items.map((it, itIdx) => (
                                <li key={itIdx}>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: it
                                        .replace(/^[-*]\s+/, '')
                                        .replace(
                                          /\*\*(.*?)\*\*/g,
                                          '<strong class="text-white font-semibold">$1</strong>'
                                        )
                                        .replace(
                                          /`([^`]+)`/g,
                                          '<code class="px-1.5 py-0.5 rounded bg-[#271c14] text-[#e59850] text-xs font-mono border border-[#c87a3e]/20">$1</code>'
                                        )
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p
                            key={pIdx}
                            className="text-[#e7bc91]"
                            dangerouslySetInnerHTML={{
                              __html: paragraph
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-white font-semibold">$1</strong>'
                                )
                                .replace(
                                  /`([^`]+)`/g,
                                  '<code class="px-1.5 py-0.5 rounded bg-[#271c14] text-[#e59850] text-xs font-mono border border-[#c87a3e]/20">$1</code>'
                                )
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Copy Response Button */}
                    {msg.role === 'assistant' && (
                      <div className="mt-4 pt-3 border-t border-[#c87a3e]/15 flex items-center justify-between text-xs font-mono text-[#a88264]">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Response</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setCvModalOpen(true)}
                            className="text-[10px] text-[#d4a373] hover:text-[#e59850] hover:underline cursor-pointer"
                          >
                            View CV
                          </button>
                          <span>•</span>
                          <button
                            onClick={() => navigateTo('home')}
                            className="text-[10px] text-[#d4a373] hover:text-[#e59850] hover:underline cursor-pointer"
                          >
                            Explore Projects
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start space-y-2">
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-[#a88264]">
                    <div className="w-5 h-5 rounded-full bg-[#3d2011] border border-[#c87a3e]/40 flex items-center justify-center text-[#e59850]">
                      <Bot className="w-3 h-3 animate-spin" />
                    </div>
                    <span className="font-semibold text-[#e59850]">Sameer AI Agent</span>
                    <span className="text-[10px]">analyzing query &amp; architecture...</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#17110d] border border-[#c87a3e]/25 text-left rounded-tl-xs flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-[#e59850] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#c87a3e] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#b4652a] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs font-mono text-[#a88264]">
                      Querying verified codebase knowledge...
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 py-2.5 bg-[#17110d] border-t border-[#c87a3e]/20 overflow-x-auto scrollbar-none flex items-center space-x-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[#a88264] shrink-0 flex items-center space-x-1">
                <Zap className="w-3 h-3 text-[#e59850]" />
                <span>Suggested:</span>
              </span>
              {quickPrompts[mode].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-3 py-1 rounded-full bg-[#241812] hover:bg-[#342419] border border-[#c87a3e]/30 hover:border-[#e59850] text-xs text-[#d4a373] hover:text-[#f3d5b5] transition-all cursor-pointer shrink-0 truncate max-w-[280px]"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Box Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 bg-[#120e0b] border-t border-[#c87a3e]/30 flex items-center space-x-3"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask anything about Sameer's experience, stack, architecture, or fit...`}
                disabled={isLoading}
                className="flex-1 bg-[#1a120c] border border-[#c87a3e]/30 focus:border-[#e59850] focus:ring-1 focus:ring-[#e59850] rounded-xl px-4 py-3 text-sm text-[#f3d5b5] placeholder-[#8d6e52] focus:outline-none transition-all"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs shadow-lg shadow-[#c87a3e]/30 transition-all flex items-center space-x-2 cursor-pointer shrink-0"
              >
                <span>Ask AI</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Collapsible Info Card when Sidebar is closed */}
          {!isSidebarOpen && (
            <div className="hidden xl:block xl:col-span-3 space-y-4 text-left">
              <div className="p-6 rounded-3xl bg-[#120e0b] border border-[#c87a3e]/30 shadow-xl space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-[#c87a3e]/20">
                  <div className="w-10 h-10 rounded-2xl bg-[#241812] border border-[#c87a3e]/40 flex items-center justify-center text-[#e59850] font-bold">
                    SH
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{siteSettings.ownerName}</h3>
                    <p className="text-[11px] text-[#e59850] font-mono">{siteSettings.roleTitle}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-[#d4a373]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#a88264]">Experience:</span>
                    <span className="text-white font-bold">3+ Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#a88264]">Status:</span>
                    <span className="text-emerald-400 font-bold">Open for Roles</span>
                  </div>
                </div>

                <button
                  onClick={() => setCvModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white font-bold text-xs shadow-md"
                >
                  Download Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
