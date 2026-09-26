import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CustomPageItem } from '../../types';
import { FileCode, Plus, Trash2, Edit, ExternalLink, Globe, Search, CheckCircle, Copy } from 'lucide-react';

export const AdminCustomPagesManager: React.FC = () => {
  const { customPages, saveCustomPage, deleteCustomPage, showToast } = useData();
  const [editingPage, setEditingPage] = useState<Partial<CustomPageItem> | null>(null);
  const [search, setSearch] = useState('');

  const filtered = customPages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage?.title || !editingPage?.slug) {
      showToast('Title and URL slug are required', 'error');
      return;
    }

    const cleanSlug = editingPage.slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    const item: CustomPageItem = {
      id: editingPage.id || 'page-' + Date.now(),
      title: editingPage.title || '',
      slug: cleanSlug,
      description: editingPage.description || '',
      content: editingPage.content || '',
      status: editingPage.status || 'published',
      updatedAt: new Date().toISOString().substring(0, 10),
      seoTitle: editingPage.seoTitle || editingPage.title || '',
      seoDescription: editingPage.seoDescription || editingPage.description || ''
    };

    saveCustomPage(item);
    setEditingPage(null);
  };

  const copyPageUrl = (slug: string) => {
    const url = `${window.location.origin}/#${slug}`;
    navigator.clipboard.writeText(url);
    showToast(`Copied page URL: #${slug}`);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-cyan-400" />
            Custom Pages & Landing Pages
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build stand-alone subpages, privacy notices, client intake briefings, or terms without touching code.
          </p>
        </div>

        <button
          id="btn-add-custom-page"
          onClick={() =>
            setEditingPage({
              title: '',
              slug: '',
              description: '',
              content: `## Welcome\n\nWrite your markdown or text content here.\n\n- Feature 1\n- Feature 2\n\nContact: sameerhabib72@gmail.com`,
              status: 'published',
              seoTitle: '',
              seoDescription: ''
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          id="input-pages-search"
          type="text"
          placeholder="Filter pages by title or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090d16] border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/50"
        />
      </div>

      {/* Pages Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#080c15]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-400">
              <th className="p-4 font-semibold">Page Title & Slug</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Last Updated</th>
              <th className="p-4 font-semibold">Public Route</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((page) => (
              <tr key={page.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white text-sm">{page.title}</div>
                  <div className="text-slate-400 text-[11px] font-mono mt-0.5">/{page.slug}</div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                      page.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {page.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400 font-mono text-[11px]">{page.updatedAt}</td>
                <td className="p-4">
                  <button
                    onClick={() => copyPageUrl(page.slug)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                    title="Click to copy public anchor"
                  >
                    <Copy className="w-3 h-3 text-cyan-400" />
                    <span>#{page.slug}</span>
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingPage(page)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Edit Page"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete page "${page.title}"?`)) {
                          deleteCustomPage(page.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Delete Page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Create Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 my-8 text-left max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              {editingPage.id ? `Edit Page: ${editingPage.title}` : 'Create Custom Landing Page'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPage.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = !editingPage.id
                        ? title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
                        : editingPage.slug;
                      setEditingPage({ ...editingPage, title, slug });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                    placeholder="e.g. Terms of Collaboration"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">URL Path Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingPage.slug || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500 font-mono"
                    placeholder="terms-of-collaboration"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Status</label>
                  <select
                    value={editingPage.status || 'published'}
                    onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value as 'published' | 'draft' })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Brief Summary</label>
                  <input
                    type="text"
                    value={editingPage.description || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                    placeholder="Overview of terms, confidentiality, and deliverable commitments."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Markdown Body Content</label>
                <textarea
                  rows={8}
                  value={editingPage.content || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500 font-mono leading-relaxed"
                  placeholder="# Page Heading&#10;&#10;Write comprehensive markdown content..."
                />
              </div>

              {/* SEO Sub-section */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">Search Engine Meta Tags</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={editingPage.seoTitle || ''}
                      onChange={(e) => setEditingPage({ ...editingPage, seoTitle: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                      placeholder="Sameer Habib | Terms"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">SEO Description</label>
                    <input
                      type="text"
                      value={editingPage.seoDescription || ''}
                      onChange={(e) => setEditingPage({ ...editingPage, seoDescription: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                      placeholder="Direct engagement terms and NDA policy."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
