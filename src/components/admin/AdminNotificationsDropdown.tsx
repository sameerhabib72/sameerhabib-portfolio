import React, { useState, useRef, useEffect } from 'react';
import { useData, deduplicateById } from '../../context/DataContext';
import { Bell, Check, Trash2, ExternalLink, Info, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export const AdminNotificationsDropdown: React.FC = () => {
  const { notifications, dismissNotification, clearAllNotifications } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'error':
        return <AlertTriangle className="w-3.5 h-3.5 text-red-400" />;
      default:
        return <Info className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div ref={containerRef} className="relative text-left">
      <button
        id="btn-admin-notifications-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
        title="Admin Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-mono font-bold text-[9px] flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0a0e19] border border-white/15 shadow-2xl p-4 z-50 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs">System Activity & Alerts</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
                  {unreadCount} new
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
            {deduplicateById(notifications).map((n) => (
              <div
                key={n.id}
                className={`p-2.5 rounded-xl border text-xs transition-colors relative group ${
                  n.read ? 'bg-white/[0.01] border-white/5 opacity-70' : 'bg-white/[0.04] border-cyan-500/30'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
                  <div className="flex-1 pr-4">
                    <div className="font-bold text-white text-[11px]">{n.title}</div>
                    <p className="text-slate-300 text-[11px] mt-0.5 leading-snug">{n.message}</p>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 block">{n.timestamp}</span>
                  </div>
                </div>

                {!n.read && (
                  <button
                    onClick={() => dismissNotification(n.id)}
                    className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
                    title="Mark as read"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="py-8 text-center text-slate-500 text-xs">
                No active notifications or alerts.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
