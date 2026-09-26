import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { EducationItem } from '../../types';
import { GraduationCap, Plus, Trash2, Edit, CheckCircle, Search, Calendar, Award } from 'lucide-react';

export const AdminEducationManager: React.FC = () => {
  const { education, saveEducation, deleteEducation, showToast } = useData();
  const [editingItem, setEditingItem] = useState<Partial<EducationItem> | null>(null);
  const [search, setSearch] = useState('');

  const filtered = education.filter(
    (e) =>
      e.institution.toLowerCase().includes(search.toLowerCase()) ||
      e.degree.toLowerCase().includes(search.toLowerCase()) ||
      e.field.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.institution || !editingItem?.degree) {
      showToast('Please fill in institution and degree', 'error');
      return;
    }
    const itemToSave: EducationItem = {
      id: editingItem.id || 'edu-' + Date.now(),
      institution: editingItem.institution || '',
      degree: editingItem.degree || '',
      field: editingItem.field || '',
      startDate: editingItem.startDate || '',
      endDate: editingItem.endDate || '',
      grade: editingItem.grade || '',
      description: editingItem.description || '',
      order: editingItem.order ?? education.length + 1,
      published: editingItem.published ?? true
    };
    saveEducation(itemToSave);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            Education & Academic Credentials
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage degrees, university background, GPA/honors, and course certifications.</p>
        </div>
        <button
          id="btn-add-education"
          onClick={() =>
            setEditingItem({
              institution: '',
              degree: '',
              field: 'Computer Science',
              startDate: '2020',
              endDate: '2024',
              grade: '3.8 GPA',
              description: '',
              order: education.length + 1,
              published: true
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Academic Record</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          id="input-education-search"
          type="text"
          placeholder="Search institutions, degrees, or fields..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090d16] border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/50"
        />
      </div>

      {/* Education Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            id={`edu-card-${item.id}`}
            className="p-5 rounded-2xl bg-[#080c15] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-bold text-white text-base">{item.degree}</h3>
                  <p className="text-cyan-400 text-xs font-medium">{item.institution}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    item.published ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {item.startDate} — {item.endDate}
                </span>
                {item.grade && (
                  <span className="flex items-center gap-1 text-amber-300 font-mono">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {item.grade}
                  </span>
                )}
                <span className="text-slate-500 font-mono">Order: #{item.order}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">{item.description}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
              <button
                id={`btn-edit-edu-${item.id}`}
                onClick={() => setEditingItem(item)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Edit Record"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                id={`btn-del-edu-${item.id}`}
                onClick={() => {
                  if (window.confirm(`Delete education record at "${item.institution}"?`)) {
                    deleteEducation(item.id);
                  }
                }}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-slate-500 text-xs border border-dashed border-white/10 rounded-2xl">
          No academic records match your query.
        </div>
      )}

      {/* Edit/Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0a0e19] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 my-8 text-left">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              {editingItem.id ? 'Edit Academic Record' : 'Add Academic Record'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Institution Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.institution || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                    placeholder="e.g. Stanford University / FAST NUCES"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Degree Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.degree || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                    placeholder="e.g. Bachelor of Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Major / Field</label>
                  <input
                    type="text"
                    value={editingItem.field || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, field: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Start Year</label>
                  <input
                    type="text"
                    value={editingItem.startDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">End Year / Expected</label>
                  <input
                    type="text"
                    value={editingItem.endDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Grade / Distinction / GPA</label>
                  <input
                    type="text"
                    value={editingItem.grade || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                    placeholder="e.g. 3.82 CGPA / Magna Cum Laude"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingItem.order ?? 1}
                    onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Highlights & Coursework</label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-hidden focus:border-cyan-500"
                  placeholder="Key courses, thesis topics, dean's list, or student club leadership..."
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="edu-published-chk"
                  checked={editingItem.published ?? true}
                  onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                  className="rounded border-white/20 bg-slate-900 text-cyan-500"
                />
                <label htmlFor="edu-published-chk" className="text-xs text-slate-300">
                  Published on public portfolio
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
