import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SubscriberItem } from '../../types';
import { Users, Trash2, Download, Search, Plus, Mail, ShieldCheck } from 'lucide-react';

export const AdminSubscribersManager: React.FC = () => {
  const { subscribers, deleteSubscriber, showToast } = useData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');

  const filtered = subscribers.filter((s) => {
    const matchesSearch = s.email.toLowerCase().includes(search.toLowerCase()) || s.source.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCsv = () => {
    const headers = 'ID,Email,SubscribedAt,Status,Source\n';
    const rows = subscribers.map((s) => `"${s.id}","${s.email}","${s.subscribedAt}","${s.status}","${s.source}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter_subscribers_${new Date().toISOString().substring(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Subscribers CSV downloaded', 'success');
  };

  const activeCount = subscribers.filter((s) => s.status === 'active').length;

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <Users className="w-5 h-5 text-cyan-400" />
            Newsletter Audience & Subscribers
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            View engineering readers, tech recruiters, and engineering leaders subscribed to Sameer's technical essays.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export CSV ({subscribers.length})</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#080c15] border border-white/10">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Total Readers</span>
          <div className="text-2xl font-bold text-white mt-1 font-mono">{subscribers.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#080c15] border border-white/10">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Active Subscribers</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{activeCount}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#080c15] border border-white/10">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Delivery Health</span>
          <div className="text-2xl font-bold text-cyan-300 mt-1 font-mono">
            {subscribers.length > 0 ? Math.round((activeCount / subscribers.length) * 100) : 100}%
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="input-subscribers-search"
            type="text"
            placeholder="Search email address or acquisition channel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#090d16] border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#080c15] border border-white/10 text-xs">
          {(['all', 'active', 'unsubscribed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                statusFilter === tab ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#080c15]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-mono text-[11px]">
              <th className="p-4 font-semibold">Subscriber Email</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Acquisition Source</th>
              <th className="p-4 font-semibold">Subscribed Date</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((sub) => (
              <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{sub.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      sub.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400 font-mono text-[11px]">{sub.source}</td>
                <td className="p-4 text-slate-400 font-mono text-[11px]">{sub.subscribedAt}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => {
                      if (window.confirm(`Remove ${sub.email} from subscriber audience?`)) {
                        deleteSubscriber(sub.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                    title="Remove Subscriber"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="py-10 text-center text-slate-500 text-xs border border-dashed border-white/10 rounded-2xl">
          No subscribers found matching your criteria.
        </div>
      )}
    </div>
  );
};
