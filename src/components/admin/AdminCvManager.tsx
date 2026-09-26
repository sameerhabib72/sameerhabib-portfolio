import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CVVersionItem } from '../../types';
import { FileText, Plus, Trash2, CheckCircle2, Download, Eye, Sparkles, AlertCircle } from 'lucide-react';

export const AdminCvManager: React.FC = () => {
  const { cvVersions, saveCvVersion, deleteCvVersion, setActiveCvVersion, siteSettings, showToast, setCvModalOpen } = useData();
  const [editingVersion, setEditingVersion] = useState<Partial<CVVersionItem> | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVersion?.version || !editingVersion?.filename) {
      showToast('Version number and filename are required', 'error');
      return;
    }

    const item: CVVersionItem = {
      id: editingVersion.id || 'cv-' + Date.now(),
      version: editingVersion.version || 'v1.0',
      title: editingVersion.title || `Resume ${editingVersion.version}`,
      filename: editingVersion.filename || 'resume.pdf',
      fileSize: editingVersion.fileSize || '140 KB',
      uploadDate: editingVersion.uploadDate || new Date().toISOString().substring(0, 10),
      type: (editingVersion.type as 'PDF' | 'DOCX' | 'TXT') || 'PDF',
      isActive: editingVersion.isActive ?? false,
      downloadEnabled: editingVersion.downloadEnabled ?? true,
      notes: editingVersion.notes || ''
    };

    saveCvVersion(item);
    if (item.isActive) {
      setActiveCvVersion(item.id);
    }
    setEditingVersion(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-cyan-400" />
            Resume / CV Release Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage versioned PDF and document releases. Set which release is served to recruiters and viewers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-preview-cv-modal"
            onClick={() => setCvModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preview CV Modal</span>
          </button>
          <button
            id="btn-add-cv-version"
            onClick={() =>
              setEditingVersion({
                version: `v${cvVersions.length + 1}.0`,
                title: `Sameer Habib - Full Stack Engineer ${new Date().getFullYear()}`,
                filename: `Sameer_Habib_Resume_v${cvVersions.length + 1}.pdf`,
                fileSize: '150 KB',
                uploadDate: new Date().toISOString().substring(0, 10),
                type: 'PDF',
                isActive: false,
                downloadEnabled: true,
                notes: 'Updated with latest tech stack and production metrics'
              })
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Version</span>
          </button>
        </div>
      </div>

      {/* Active Release Hero Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#0a1120] to-indigo-950/30 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Active Public Resume</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                LIVE
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">{siteSettings.cvFileName}</h3>
            <p className="text-xs text-slate-400">Default download target for hero, navigation, and contact bar</p>
          </div>
        </div>

        <button
          onClick={() => setCvModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer self-start md:self-auto"
        >
          View Live Modal Preview
        </button>
      </div>

      {/* Versions List */}
      <div className="space-y-3">
        {cvVersions.map((item) => (
          <div
            key={item.id}
            id={`cv-ver-row-${item.id}`}
            className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              item.isActive ? 'bg-cyan-950/10 border-cyan-500/40 shadow-sm' : 'bg-[#080c15] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                  item.isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {item.type}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white">{item.title}</h4>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{item.version}</span>
                  {item.isActive && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-semibold">
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                  <span>{item.filename}</span>
                  <span>•</span>
                  <span>{item.fileSize}</span>
                  <span>•</span>
                  <span>Uploaded {item.uploadDate}</span>
                </div>
                {item.notes && <p className="text-xs text-slate-400 mt-1 italic">Note: {item.notes}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {!item.isActive && (
                <button
                  id={`btn-activate-cv-${item.id}`}
                  onClick={() => setActiveCvVersion(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 text-xs font-medium transition-colors cursor-pointer"
                >
                  Set as Active
                </button>
              )}

              <button
                id={`btn-edit-cv-${item.id}`}
                onClick={() => setEditingVersion(item)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Edit Details"
              >
                Edit
              </button>

              <button
                id={`btn-del-cv-${item.id}`}
                onClick={() => {
                  if (item.isActive) {
                    showToast('Cannot delete the currently active CV version. Set another version as active first.', 'error');
                    return;
                  }
                  if (window.confirm(`Delete CV release ${item.version}?`)) {
                    deleteCvVersion(item.id);
                  }
                }}
                disabled={item.isActive}
                className={`p-2 rounded-lg transition-colors ${
                  item.isActive ? 'text-slate-600 cursor-not-allowed' : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer'
                }`}
                title="Delete Version"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingVersion && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 my-8 text-left">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              {editingVersion.id ? 'Edit Resume Release' : 'Upload Resume Release'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Version String *</label>
                  <input
                    type="text"
                    required
                    value={editingVersion.version || ''}
                    onChange={(e) => setEditingVersion({ ...editingVersion, version: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                    placeholder="e.g. v3.2-production"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">File Format</label>
                  <select
                    value={editingVersion.type || 'PDF'}
                    onChange={(e) => setEditingVersion({ ...editingVersion, type: e.target.value as 'PDF' | 'DOCX' | 'TXT' })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">Word Document (.docx)</option>
                    <option value="TXT">Plain Text / ATS Optimized</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Display Title *</label>
                <input
                  type="text"
                  required
                  value={editingVersion.title || ''}
                  onChange={(e) => setEditingVersion({ ...editingVersion, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  placeholder="Sameer Habib - Principal Full Stack Engineer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Filename *</label>
                  <input
                    type="text"
                    required
                    value={editingVersion.filename || ''}
                    onChange={(e) => setEditingVersion({ ...editingVersion, filename: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500 font-mono"
                    placeholder="Sameer_Habib_Resume_2026.pdf"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">File Size</label>
                  <input
                    type="text"
                    value={editingVersion.fileSize || ''}
                    onChange={(e) => setEditingVersion({ ...editingVersion, fileSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500 font-mono"
                    placeholder="145 KB"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Changelog / Release Notes</label>
                <textarea
                  rows={2}
                  value={editingVersion.notes || ''}
                  onChange={(e) => setEditingVersion({ ...editingVersion, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  placeholder="Included AWS Cloud Architect certifications and micro-frontend case study."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingVersion.isActive ?? false}
                    onChange={(e) => setEditingVersion({ ...editingVersion, isActive: e.target.checked })}
                    className="rounded border-white/20 bg-slate-900 text-cyan-500"
                  />
                  <span>Make this the Active live release immediately</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingVersion(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Release
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
