import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { TestimonialItem } from '../../types';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit,
  Save,
  Star,
  Quote,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export const AdminTestimonialsManager: React.FC = () => {
  const { testimonials, saveTestimonial, deleteTestimonial, showToast } = useData();

  const [editingItem, setEditingItem] = useState<Partial<TestimonialItem> | null>(null);

  const sorted = [...testimonials].sort((a, b) => a.order - b.order);

  const handleOpenAdd = () => {
    setEditingItem({
      id: 'test-' + Date.now(),
      name: '',
      role: 'Engineering Lead / Client',
      company: 'Tech Enterprise',
      quote:
        'Sameer delivered exceptional results optimizing our backend infrastructure, meeting critical deadlines with pristine architecture.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      verified: true,
      order: testimonials.length + 1,
      published: true
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.quote) {
      showToast('Client name and recommendation quote are required', 'error');
      return;
    }

    const item: TestimonialItem = {
      id: editingItem.id || 'test-' + Date.now(),
      name: editingItem.name.trim(),
      role: editingItem.role?.trim() || 'Client',
      company: editingItem.company?.trim() || '',
      quote: editingItem.quote.trim(),
      avatar:
        editingItem.avatar?.trim() ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: Number(editingItem.rating) || 5,
      verified: editingItem.verified ?? true,
      order: Number(editingItem.order) || 1,
      published: editingItem.published ?? true
    };

    saveTestimonial(item);
    setEditingItem(null);
    showToast('Testimonial endorsement saved successfully', 'success');
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#c87a3e]/20">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>11 // SOCIAL PROOF &amp; REPUTATION</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Client &amp; Colleague Endorsements</h2>
          <p className="text-xs text-[#d4a373] mt-1">
            Manage verified client reviews, star ratings, and peer recommendations displayed on the public site.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Recommendation</span>
        </button>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-3xl bg-[#15110d]/90 border transition-all flex flex-col justify-between ${
              item.published
                ? 'border-[#c87a3e]/25 hover:border-[#c87a3e]/60 shadow-sm'
                : 'border-white/10 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1 text-[#e59850]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#e59850]" />
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setEditingItem(item)}
                    className="p-1.5 rounded-lg bg-[#201813] hover:bg-[#2e1f14] text-[#d4a373] hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Delete this endorsement?')) {
                        deleteTestimonial(item.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-[#201813] hover:bg-red-950/50 text-[#d4a373] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <blockquote className="text-xs text-[#e7bc91] leading-relaxed italic mb-4">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-[#c87a3e]/15 flex items-center space-x-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-[#c87a3e]/40"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                  {item.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-[#a88264] truncate">
                  {item.role} {item.company ? `• ${item.company}` : ''}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#120e0b] border border-[#c87a3e]/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#c87a3e]/20">
              <h3 className="text-base font-bold text-white">
                {editingItem.id && testimonials.some((t) => t.id === editingItem.id)
                  ? 'Edit Endorsement'
                  : 'Add New Endorsement'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-[#a88264] hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                    Client / Recommender Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={editingItem.role || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder="e.g. Head of Technology"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={editingItem.company || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    placeholder="e.g. SBTE / Askari"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                    Rating (Stars 1 - 5)
                  </label>
                  <select
                    value={editingItem.rating || 5}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, rating: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-xs text-white focus:outline-none focus:border-[#c87a3e]"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  value={editingItem.avatar || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#f3d5b5] mb-1">
                  Endorsement Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.quote || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  placeholder="Share the recommendation details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0806] border border-[#c87a3e]/25 text-xs text-white placeholder-[#8d6e52] focus:outline-none focus:border-[#c87a3e] resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center space-x-6 pt-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="verified-check"
                    checked={editingItem.verified ?? true}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, verified: e.target.checked })
                    }
                    className="rounded bg-[#0a0806] border-[#c87a3e]/30 text-[#c87a3e] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="verified-check" className="text-xs text-[#f3d5b5] cursor-pointer">
                    Verified Colleague Badge
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published-test-check"
                    checked={editingItem.published ?? true}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, published: e.target.checked })
                    }
                    className="rounded bg-[#0a0806] border-[#c87a3e]/30 text-[#c87a3e] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="published-test-check" className="text-xs text-[#f3d5b5] cursor-pointer">
                    Publish on Website
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#c87a3e]/20">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-[#1e1510] text-xs text-[#d4a373] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] to-[#d97706] text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Endorsement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
