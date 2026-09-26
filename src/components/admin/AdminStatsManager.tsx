import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatItem } from '../../types';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Briefcase,
  Layers,
  Cpu,
  Zap,
  Award,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

const ICON_OPTIONS = [
  { label: 'Briefcase', value: 'Briefcase', icon: Briefcase },
  { label: 'Layers', value: 'Layers', icon: Layers },
  { label: 'Cpu / Tech', value: 'Cpu', icon: Cpu },
  { label: 'Checkmark', value: 'CheckCircle2', icon: CheckCircle2 },
  { label: 'Zap / Speed', value: 'Zap', icon: Zap },
  { label: 'Award', value: 'Award', icon: Award },
  { label: 'Trending', value: 'TrendingUp', icon: TrendingUp }
];

export const AdminStatsManager: React.FC = () => {
  const { stats, saveStat, deleteStat, updateStats, showToast } = useData();

  const [editingStat, setEditingStat] = useState<Partial<StatItem> | null>(null);

  const sortedStats = [...stats].sort((a, b) => a.order - b.order);

  const handleOpenAdd = () => {
    setEditingStat({
      id: 'stat-' + Date.now(),
      number: '10+',
      label: 'New Production Metric',
      icon: 'Briefcase',
      order: stats.length + 1,
      published: true
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStat?.number || !editingStat?.label) {
      showToast('Number and label are required', 'error');
      return;
    }

    const item: StatItem = {
      id: editingStat.id || 'stat-' + Date.now(),
      number: editingStat.number.trim(),
      label: editingStat.label.trim(),
      icon: editingStat.icon || 'CheckCircle2',
      order: Number(editingStat.order) || 1,
      published: editingStat.published ?? true
    };

    saveStat(item);
    setEditingStat(null);
    showToast('Metric item saved successfully', 'success');
  };

  const handleResetDefaults = () => {
    const defaultStats: StatItem[] = [
      { id: 'stat-1', number: '3+ Years', label: 'Commercial Experience', icon: 'Briefcase', order: 1, published: true },
      { id: 'stat-2', number: '20+ Projects', label: 'Enterprise Systems Delivered', icon: 'Layers', order: 2, published: true },
      { id: 'stat-3', number: '45% Speedup', label: 'Database Latency Optimization', icon: 'Cpu', order: 3, published: true },
      { id: 'stat-4', number: '99.9%', label: 'Production Uptime Architecture', icon: 'CheckCircle2', order: 4, published: true }
    ];
    updateStats(defaultStats);
    showToast('Reset to default metrics', 'info');
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#c87a3e]/20">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>01 // PROVEN METRICS &amp; STATS</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Public Key Metrics &amp; KPIs</h2>
          <p className="text-xs text-[#d4a373] mt-1">
            Manage the numerical statistics bar prominently showcased below the hero section on the live website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-[#1e1510] hover:bg-[#281b14] border border-[#c87a3e]/25 text-xs text-[#d4a373] hover:text-[#f3d5b5] transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Metric</span>
          </button>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedStats.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-3xl bg-[#15110d]/90 border transition-all ${
              item.published
                ? 'border-[#c87a3e]/25 hover:border-[#c87a3e]/60 shadow-sm'
                : 'border-white/10 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl font-display font-extrabold text-white">
                {item.number}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setEditingStat(item)}
                  className="p-1.5 rounded-lg bg-[#201813] hover:bg-[#2e1f14] text-[#d4a373] hover:text-white transition-colors cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Delete this stat metric?')) {
                      deleteStat(item.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-[#201813] hover:bg-red-950/50 text-[#d4a373] hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs font-semibold text-[#f3d5b5] mb-2">{item.label}</p>

            <div className="flex items-center justify-between pt-3 border-t border-[#c87a3e]/15 text-[11px] font-mono">
              <span className="text-[#a88264]">Order: #{item.order}</span>
              <span
                className={`px-2 py-0.5 rounded-full ${
                  item.published
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-400'
                }`}
              >
                {item.published ? 'Published' : 'Hidden'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {editingStat && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#120e0b] border border-[#c87a3e]/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#c87a3e]/20">
              <h3 className="text-base font-bold text-white">
                {editingStat.id && stats.some((s) => s.id === editingStat.id)
                  ? 'Edit Metric'
                  : 'Add New Metric'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingStat(null)}
                className="text-[#a88264] hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                  Metric Number / Text *
                </label>
                <input
                  type="text"
                  required
                  value={editingStat.number || ''}
                  onChange={(e) => setEditingStat({ ...editingStat, number: e.target.value })}
                  placeholder="e.g. 20+, 45%, 3+ Years"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-sm text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                  Metric Label *
                </label>
                <input
                  type="text"
                  required
                  value={editingStat.label || ''}
                  onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                  placeholder="e.g. Enterprise Production Deliveries"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-sm text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                    Display Icon
                  </label>
                  <select
                    value={editingStat.icon || 'Briefcase'}
                    onChange={(e) => setEditingStat({ ...editingStat, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-xs text-white focus:outline-none focus:border-[#c87a3e]"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingStat.order ?? 1}
                    onChange={(e) =>
                      setEditingStat({ ...editingStat, order: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-xs text-white focus:outline-none focus:border-[#c87a3e]"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="published-stat-check"
                  checked={editingStat.published ?? true}
                  onChange={(e) =>
                    setEditingStat({ ...editingStat, published: e.target.checked })
                  }
                  className="rounded bg-[#0a0806] border-[#c87a3e]/30 text-[#c87a3e] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="published-stat-check" className="text-xs text-[#f3d5b5] cursor-pointer">
                  Visible on public website
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#c87a3e]/20">
                <button
                  type="button"
                  onClick={() => setEditingStat(null)}
                  className="px-4 py-2 rounded-xl bg-[#1e1510] text-xs text-[#d4a373] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Metric
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
