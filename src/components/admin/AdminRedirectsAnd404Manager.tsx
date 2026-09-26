import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { RedirectItem } from '../../types';
import { GitFork, Plus, Trash2, ArrowRight, ShieldAlert, CheckCircle2, RotateCw } from 'lucide-react';

export const AdminRedirectsAnd404Manager: React.FC = () => {
  const {
    redirects,
    addRedirect,
    deleteRedirect,
    toggleRedirect,
    notFoundLogs,
    deleteNotFoundLog,
    convert404ToRedirect,
    showToast
  } = useData();

  const [activeTab, setActiveTab] = useState<'rules' | 'logs'>('rules');
  const [newFrom, setNewFrom] = useState('');
  const [newTo, setNewTo] = useState('');
  const [newCode, setNewCode] = useState<301 | 302>(301);

  // Quick modal for converting 404
  const [convertingLogId, setConvertingLogId] = useState<string | null>(null);
  const [customTargetPath, setCustomTargetPath] = useState('');

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFrom || !newTo) {
      showToast('Both source and target paths are required', 'error');
      return;
    }

    const cleanFrom = newFrom.replace(/^\/+/, '');
    const cleanTo = newTo.startsWith('http') || newTo.startsWith('/') || newTo.startsWith('#') ? newTo : '/' + newTo;

    addRedirect({
      fromPath: cleanFrom,
      toPath: cleanTo,
      statusCode: newCode,
      active: true
    });

    setNewFrom('');
    setNewTo('');
    showToast(`Redirect rule created: /${cleanFrom} -> ${cleanTo}`);
  };

  const handleStartConvert = (id: string, suggested?: string) => {
    setConvertingLogId(id);
    setCustomTargetPath(suggested || '/#projects');
  };

  const handleConfirmConvert = (e: React.FormEvent) => {
    e.preventDefault();
    if (convertingLogId && customTargetPath) {
      convert404ToRedirect(convertingLogId, customTargetPath);
      setConvertingLogId(null);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <GitFork className="w-5 h-5 text-cyan-400" />
            URL Routing, 301 Redirects & 404 Interceptors
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Maintain SEO link equity, migrate legacy backlinks, and repair broken URLs detected in real-time.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#080c15] border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rules' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Redirect Rules ({redirects.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'logs' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>404 Error Log</span>
            {notFoundLogs.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-[10px]">
                {notFoundLogs.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'rules' && (
        <div className="space-y-6">
          {/* Create Rule Form */}
          <form onSubmit={handleAddRedirect} className="p-4 rounded-2xl bg-[#080c15] border border-white/10 space-y-3">
            <span className="text-xs font-bold text-white block">Create New Redirect Rule</span>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-4">
                <label className="block text-[11px] text-slate-400 mb-1 font-mono">From Path (e.g. cv, resume.pdf)</label>
                <input
                  type="text"
                  required
                  value={newFrom}
                  onChange={(e) => setNewFrom(e.target.value)}
                  placeholder="old-portfolio"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[11px] text-slate-400 mb-1 font-mono">To Destination Path / Anchor</label>
                <input
                  type="text"
                  required
                  value={newTo}
                  onChange={(e) => setNewTo(e.target.value)}
                  placeholder="#projects"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] text-slate-400 mb-1 font-mono">Status Code</label>
                <select
                  value={newCode}
                  onChange={(e) => setNewCode(Number(e.target.value) as 301 | 302)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500 font-mono"
                >
                  <option value={301}>301 Permanent</option>
                  <option value={302}>302 Temporary</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Rule</span>
                </button>
              </div>
            </div>
          </form>

          {/* Rules List */}
          <div className="rounded-2xl border border-white/10 bg-[#080c15] overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-mono text-[11px]">
                  <th className="p-4 font-semibold">Source Route</th>
                  <th className="p-4 font-semibold">Destination Route</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {redirects.map((rule) => (
                  <tr key={rule.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-cyan-300 font-medium">/{rule.fromPath}</td>
                    <td className="p-4 font-mono text-white flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                      <span>{rule.toPath}</span>
                    </td>
                    <td className="p-4 font-mono text-slate-400">{rule.statusCode}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleRedirect(rule.id)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono cursor-pointer transition-colors ${
                          rule.active
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {rule.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete redirect rule /${rule.fromPath}?`)) {
                            deleteRedirect(rule.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete Rule"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-300">Automatic 404 Telemetry</h4>
              <p className="text-xs text-amber-200/80 mt-0.5 leading-relaxed">
                When visitors or crawlers land on an unrecognized path, the system logs the incident. You can instantly map it to a valid page with a single click.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#080c15] overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-mono text-[11px]">
                  <th className="p-4 font-semibold">Missing Path</th>
                  <th className="p-4 font-semibold">Hit Count</th>
                  <th className="p-4 font-semibold">Last Attempt</th>
                  <th className="p-4 font-semibold">Suggested Fix</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {notFoundLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-red-400 font-semibold">{log.path}</td>
                    <td className="p-4 font-mono text-slate-300 font-bold">{log.hits} hits</td>
                    <td className="p-4 font-mono text-slate-400 text-[11px]">{log.lastSeen}</td>
                    <td className="p-4 font-mono text-slate-300 text-[11px]">
                      {log.suggestedRedirect ? `-> ${log.suggestedRedirect}` : '—'}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleStartConvert(log.id, log.suggestedRedirect)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Map to 301
                      </button>
                      <button
                        onClick={() => deleteNotFoundLog(log.id)}
                        className="p-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer inline-block"
                        title="Dismiss"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {notFoundLogs.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs border border-dashed border-white/10 rounded-2xl">
              Zero 404 errors detected. All public paths and anchors are operating nominally.
            </div>
          )}
        </div>
      )}

      {/* Convert Modal */}
      {convertingLogId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-cyan-400" />
              Convert 404 to Permanent 301 Redirect
            </h3>
            <p className="text-xs text-slate-400">
              Future visitors hitting this broken link will be automatically routed to your chosen destination.
            </p>

            <form onSubmit={handleConfirmConvert} className="space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1 font-mono">Target Destination Path / Anchor</label>
                <input
                  type="text"
                  required
                  value={customTargetPath}
                  onChange={(e) => setCustomTargetPath(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500 font-mono"
                  placeholder="#projects"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setConvertingLogId(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Create 301 Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
