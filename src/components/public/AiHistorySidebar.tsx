import React, { useState, useMemo } from 'react';
import {
  History,
  Search,
  Plus,
  Trash2,
  Calendar,
  MessageSquare,
  Sparkles,
  Briefcase,
  Layers,
  Code2,
  Terminal,
  Bot,
  X,
  Clock
} from 'lucide-react';

export type AssistantMode = 'general' | 'recruiter' | 'client' | 'architect' | 'interview';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
  suggestedActions?: { label: string; action: () => void }[];
}

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  mode: AssistantMode;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
  messages: ChatMessage[];
}

interface AiHistorySidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (session: ChatSession) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
  onClearAllSessions: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

const modeIcons: Record<AssistantMode, React.ComponentType<{ className?: string }>> = {
  general: Bot,
  recruiter: Briefcase,
  client: Layers,
  architect: Code2,
  interview: Terminal
};

const modeLabels: Record<AssistantMode, string> = {
  general: 'General',
  recruiter: 'Recruiter',
  client: 'Client',
  architect: 'Architecture',
  interview: 'Interview'
};

export const AiHistorySidebar: React.FC<AiHistorySidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onClearAllSessions,
  isOpen,
  onToggleOpen
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter sessions by search term
  const filteredSessions = useMemo(() => {
    if (!searchTerm.trim()) return sessions;
    const term = searchTerm.toLowerCase();
    return sessions.filter((s) => {
      const matchTitle = s.title.toLowerCase().includes(term);
      const matchPreview = s.preview.toLowerCase().includes(term);
      const matchMode = s.mode.toLowerCase().includes(term);
      const matchMessages = s.messages.some((m) => m.content.toLowerCase().includes(term));
      return matchTitle || matchPreview || matchMode || matchMessages;
    });
  }, [sessions, searchTerm]);

  // Group filtered sessions by date
  const groupedSessions = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterdayStart = todayStart - 86400000;
    const sevenDaysAgo = todayStart - 6 * 86400000;

    const groups: {
      today: ChatSession[];
      yesterday: ChatSession[];
      last7Days: ChatSession[];
      older: ChatSession[];
    } = {
      today: [],
      yesterday: [],
      last7Days: [],
      older: []
    };

    filteredSessions.forEach((s) => {
      const sessionTime = new Date(s.updatedAt || s.createdAt).getTime();
      if (sessionTime >= todayStart) {
        groups.today.push(s);
      } else if (sessionTime >= yesterdayStart) {
        groups.yesterday.push(s);
      } else if (sessionTime >= sevenDaysAgo) {
        groups.last7Days.push(s);
      } else {
        groups.older.push(s);
      }
    });

    return groups;
  }, [filteredSessions]);

  const renderGroup = (title: string, items: ChatSession[], icon: React.ReactNode) => {
    if (items.length === 0) return null;

    return (
      <div className="space-y-1.5 mb-5">
        <div className="flex items-center space-x-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#a88264]">
          {icon}
          <span>{title}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1e1510] text-[#c87a3e] border border-[#c87a3e]/20 ml-auto">
            {items.length}
          </span>
        </div>

        <div className="space-y-1">
          {items.map((session) => {
            const isActive = session.id === activeSessionId;
            const ModeIcon = modeIcons[session.mode] || Bot;
            const timeFormatted = new Date(session.updatedAt || session.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={session.id}
                onClick={() => onSelectSession(session)}
                className={`group relative flex items-start gap-2.5 p-2.5 rounded-xl transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2a1a10] to-[#1c130d] border-[#c87a3e]/60 shadow-[0_0_15px_rgba(200,122,62,0.15)] text-[#f3d5b5]'
                    : 'bg-[#140e0a]/70 hover:bg-[#1f150f] border-transparent hover:border-[#c87a3e]/30 text-[#d4a373] hover:text-[#f3d5b5]'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-[#e59850] to-[#c87a3e]" />
                )}

                <div
                  className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                    isActive
                      ? 'bg-[#3d2011] text-[#e59850] border border-[#c87a3e]/40'
                      : 'bg-[#1a120c] text-[#a88264] group-hover:text-[#e59850]'
                  }`}
                >
                  <ModeIcon className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1 min-w-0 pr-6 text-left">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-medium truncate font-sans text-white group-hover:text-[#f3d5b5]">
                      {session.title || 'Untitled Consultation'}
                    </p>
                  </div>

                  <p className="text-[11px] text-[#9c8470] line-clamp-1 mt-0.5 font-sans">
                    {session.preview || 'No messages'}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-[#a88264]">
                    <span className="text-[#c87a3e]/90">{modeLabels[session.mode]}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {timeFormatted}
                    </span>
                    <span>•</span>
                    <span>{session.messages.length} msgs</span>
                  </div>
                </div>

                {/* Delete button on hover */}
                <button
                  type="button"
                  onClick={(e) => onDeleteSession(session.id, e)}
                  className="absolute right-2 top-2.5 p-1 rounded-md text-[#9c8470] hover:text-red-400 hover:bg-[#2c1a15] opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete conversation"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <aside
      className={`flex flex-col bg-[#0f0b08] border border-[#c87a3e]/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isOpen ? 'h-[720px]' : 'h-auto'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[#c87a3e]/20 bg-[#140e0a]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2 text-left">
            <div className="w-7 h-7 rounded-xl bg-[#2a170d] border border-[#c87a3e]/40 flex items-center justify-center text-[#e59850]">
              <History className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold font-mono text-white tracking-wide uppercase">
                Search &amp; Chats
              </h3>
              <p className="text-[10px] font-mono text-[#a88264]">
                {sessions.length} recorded session{sessions.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          {/* New Chat Button */}
          <button
            onClick={onNewSession}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white text-xs font-semibold shadow-sm hover:shadow-[0_0_12px_rgba(200,122,62,0.3)] transition-all cursor-pointer shrink-0"
            title="Start New Consultation"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="text-xs">New Chat</span>
          </button>
        </div>

        {/* Search Filter Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#a88264]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search past conversations..."
            className="w-full pl-8.5 pr-7 py-1.5 rounded-xl bg-[#1c130d] border border-[#c87a3e]/25 focus:border-[#e59850] text-xs text-[#f3d5b5] placeholder-[#856b56] focus:outline-none transition-all font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#856b56] hover:text-[#f3d5b5]"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Grouped History List */}
      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-[#c87a3e]/30 space-y-2 text-left">
        {filteredSessions.length === 0 ? (
          <div className="p-6 text-center text-xs font-mono text-[#a88264] space-y-2">
            <MessageSquare className="w-6 h-6 mx-auto text-[#c87a3e]/40" />
            <p>
              {searchTerm
                ? `No conversations match "${searchTerm}"`
                : 'No previous conversations yet.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[11px] text-[#e59850] hover:underline"
              >
                Clear search filter
              </button>
            )}
          </div>
        ) : (
          <>
            {renderGroup(
              'Today',
              groupedSessions.today,
              <Calendar className="w-3 h-3 text-[#e59850]" />
            )}
            {renderGroup(
              'Yesterday',
              groupedSessions.yesterday,
              <Calendar className="w-3 h-3 text-[#c87a3e]" />
            )}
            {renderGroup(
              'Previous 7 Days',
              groupedSessions.last7Days,
              <Clock className="w-3 h-3 text-[#b4652a]" />
            )}
            {renderGroup(
              'Older',
              groupedSessions.older,
              <History className="w-3 h-3 text-[#8d6e52]" />
            )}
          </>
        )}
      </div>

      {/* Sidebar Footer with Clear and Stats */}
      <div className="p-3 border-t border-[#c87a3e]/20 bg-[#140e0a] flex items-center justify-between text-[11px] font-mono text-[#a88264]">
        <span className="flex items-center gap-1 text-[10px] text-[#8d6e52]">
          <Sparkles className="w-3 h-3 text-[#c87a3e]" />
          <span>Local storage saved</span>
        </span>

        {sessions.length > 0 && (
          <button
            type="button"
            onClick={onClearAllSessions}
            className="hover:text-red-400 transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
            title="Clear all conversation history"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear History</span>
          </button>
        )}
      </div>
    </aside>
  );
};
